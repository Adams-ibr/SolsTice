import express from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import { sendContactNotification } from '../utils/emailService.js';

const router = express.Router();

// Validation middleware
const validateContact = [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name must be 1-100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('subject').trim().isLength({ min: 1, max: 200 }).withMessage('Subject must be 1-200 characters'),
  body('message').trim().isLength({ min: 1, max: 2000 }).withMessage('Message must be 1-2000 characters'),
  body('phone').optional().trim().isLength({ max: 20 }).withMessage('Phone number too long'),
  body('company').optional().trim().isLength({ max: 200 }).withMessage('Company name too long'),
  body('country').optional().trim().isLength({ max: 100 }).withMessage('Country name too long')
];

// POST /api/contact - Submit contact form
router.post('/', validateContact, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    // Create contact record
    const contactData = {
      ...req.body,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    };

    const contact = new Contact(contactData);
    await contact.save();

    // Send email notification (async, don't wait for it)
    sendContactNotification(contact).catch(error => {
      console.error('Failed to send contact notification:', error);
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you shortly.',
      data: {
        id: contact._id,
        submittedAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form. Please try again later.'
    });
  }
});

// GET /api/contact - Get all contacts (Admin only - will add auth later)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status;

    // Build filter
    const filter = {};
    if (status && ['new', 'in-progress', 'resolved', 'closed'].includes(status)) {
      filter.status = status;
    }

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('assignedTo', 'name email');

    const total = await Contact.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          currentPage: page,
          totalPages,
          totalContacts: total,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
});

// GET /api/contact/stats - Get contact statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalContacts = await Contact.countDocuments();
    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    res.json({
      success: true,
      data: {
        statusBreakdown: stats,
        totalContacts,
        recentContacts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact statistics',
      error: error.message
    });
  }
});

// GET /api/contact/:id - Get single contact
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('notes.addedBy', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact',
      error: error.message
    });
  }
});

// PUT /api/contact/:id/status - Update contact status
router.put('/:id/status', [
  body('status').isIn(['new', 'in-progress', 'resolved', 'closed']).withMessage('Invalid status')
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

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    contact.status = req.body.status;
    if (req.body.status === 'resolved') {
      contact.resolved = true;
      contact.resolvedAt = new Date();
    }

    await contact.save();

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating contact status',
      error: error.message
    });
  }
});

// POST /api/contact/:id/notes - Add note to contact
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

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // For now, we'll use a placeholder user ID. In production, get from auth token
    const userId = req.body.userId || null;
    await contact.addNote(req.body.content, userId);

    res.json({
      success: true,
      message: 'Note added successfully',
      data: contact
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