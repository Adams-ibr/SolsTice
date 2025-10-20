import express from 'express';
import { body, validationResult } from 'express-validator';
import Inquiry from '../models/Inquiry.js';
import { sendInquiryNotification } from '../utils/emailService.js';

const router = express.Router();

// Validation middleware
const validateInquiry = [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name must be 1-100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('product').trim().notEmpty().withMessage('Product selection is required'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be a positive number'),
  body('company').optional().trim().isLength({ max: 200 }).withMessage('Company name too long'),
  body('phone').optional().trim().isLength({ max: 20 }).withMessage('Phone number too long'),
  body('message').optional().trim().isLength({ max: 2000 }).withMessage('Message too long'),
  body('country').optional().trim().isLength({ max: 100 }).withMessage('Country name too long'),
  body('deliveryPort').optional().trim().isLength({ max: 100 }).withMessage('Delivery port name too long'),
  body('urgency').optional().isIn(['immediate', 'within-month', 'within-quarter', 'flexible']),
  body('budget').optional().isIn(['under-10k', '10k-50k', '50k-100k', 'over-100k', 'not-specified'])
];

// POST /api/inquiries - Submit bulk order inquiry
router.post('/', validateInquiry, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    // Create inquiry record
    const inquiryData = {
      ...req.body,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referer')
    };

    // Set priority based on quantity and urgency
    if (req.body.quantity >= 100 || req.body.urgency === 'immediate') {
      inquiryData.priority = 'high';
    } else if (req.body.quantity >= 50 || req.body.urgency === 'within-month') {
      inquiryData.priority = 'medium';
    }

    // Estimate value based on quantity (rough calculation)
    if (req.body.quantity) {
      inquiryData.estimatedValue = req.body.quantity * 1500; // Average $1500 per metric ton
    }

    const inquiry = new Inquiry(inquiryData);
    await inquiry.save();

    // Send email notification (async, don't wait for it)
    sendInquiryNotification(inquiry).catch(error => {
      console.error('Failed to send inquiry notification:', error);
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your inquiry! We will get back to you with a quote shortly.',
      data: {
        id: inquiry._id,
        submittedAt: inquiry.createdAt,
        referenceNumber: `INQ-${inquiry._id.toString().slice(-8).toUpperCase()}`
      }
    });
  } catch (error) {
    console.error('Inquiry form error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting inquiry. Please try again later.'
    });
  }
});

// GET /api/inquiries - Get all inquiries (Admin only - will add auth later)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status;
    const product = req.query.product;
    const priority = req.query.priority;

    // Build filter
    const filter = {};
    if (status && ['new', 'quoted', 'negotiating', 'confirmed', 'shipped', 'completed', 'cancelled'].includes(status)) {
      filter.status = status;
    }
    if (product) filter.product = product;
    if (priority && ['low', 'medium', 'high', 'urgent'].includes(priority)) {
      filter.priority = priority;
    }

    const inquiries = await Inquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('assignedTo', 'name email');

    const total = await Inquiry.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        inquiries,
        pagination: {
          currentPage: page,
          totalPages,
          totalInquiries: total,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching inquiries',
      error: error.message
    });
  }
});

// GET /api/inquiries/stats - Get inquiry statistics
router.get('/stats', async (req, res) => {
  try {
    const statusStats = await Inquiry.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const productStats = await Inquiry.aggregate([
      {
        $group: {
          _id: '$product',
          count: { $sum: 1 },
          totalQuantity: { $sum: '$quantity' },
          avgQuantity: { $avg: '$quantity' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const totalInquiries = await Inquiry.countDocuments();
    const recentInquiries = await Inquiry.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    const highPriorityInquiries = await Inquiry.countDocuments({
      priority: { $in: ['high', 'urgent'] },
      status: { $in: ['new', 'quoted', 'negotiating'] }
    });

    const totalEstimatedValue = await Inquiry.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$estimatedValue' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        statusBreakdown: statusStats,
        topProducts: productStats,
        totalInquiries,
        recentInquiries,
        highPriorityInquiries,
        totalEstimatedValue: totalEstimatedValue[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching inquiry statistics',
      error: error.message
    });
  }
});

// GET /api/inquiries/:id - Get single inquiry
router.get('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('notes.addedBy', 'name email');

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching inquiry',
      error: error.message
    });
  }
});

// PUT /api/inquiries/:id/status - Update inquiry status
router.put('/:id/status', [
  body('status').isIn(['new', 'quoted', 'negotiating', 'confirmed', 'shipped', 'completed', 'cancelled']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    // For now, we'll use a placeholder user ID. In production, get from auth token
    const userId = req.body.userId || null;
    await inquiry.updateStatus(req.body.status, userId);

    res.json({
      success: true,
      message: 'Inquiry status updated successfully',
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating inquiry status',
      error: error.message
    });
  }
});

// POST /api/inquiries/:id/quote - Add quote to inquiry
router.post('/:id/quote', [
  body('amount').isFloat({ min: 0 }).withMessage('Quote amount must be a positive number'),
  body('currency').optional().isIn(['USD', 'EUR', 'GBP', 'NGN']).withMessage('Invalid currency'),
  body('validDays').optional().isInt({ min: 1, max: 365 }).withMessage('Valid days must be 1-365')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    const { amount, currency = 'USD', validDays = 30 } = req.body;
    const userId = req.body.userId || null;

    await inquiry.addQuote(amount, currency, validDays, userId);

    res.json({
      success: true,
      message: 'Quote added successfully',
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding quote',
      error: error.message
    });
  }
});

// POST /api/inquiries/:id/notes - Add note to inquiry
router.post('/:id/notes', [
  body('content').trim().isLength({ min: 1, max: 1000 }).withMessage('Note content must be 1-1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    const userId = req.body.userId || null;
    await inquiry.addNote(req.body.content, userId);

    res.json({
      success: true,
      message: 'Note added successfully',
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding note',
      error: error.message
    });
  }
});

export default router;