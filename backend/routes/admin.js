import express from 'express';
import Product from '../models/Product.js';
import BlogPost from '../models/BlogPost.js';
import Contact from '../models/Contact.js';
import Inquiry from '../models/Inquiry.js';

const router = express.Router();

// GET /api/admin/dashboard - Get dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    // Get counts
    const totalProducts = await Product.countDocuments();
    const totalBlogPosts = await BlogPost.countDocuments();
    const totalContacts = await Contact.countDocuments();
    const totalInquiries = await Inquiry.countDocuments();

    // Get recent activity
    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    const recentInquiries = await Inquiry.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    // Get pending items
    const pendingContacts = await Contact.countDocuments({ status: 'new' });
    const pendingInquiries = await Inquiry.countDocuments({ status: 'new' });

    // Get high priority inquiries
    const highPriorityInquiries = await Inquiry.countDocuments({
      priority: { $in: ['high', 'urgent'] },
      status: { $in: ['new', 'quoted', 'negotiating'] }
    });

    // Get product statistics
    const productStats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get inquiry statistics by product
    const inquiryByProduct = await Inquiry.aggregate([
      {
        $group: {
          _id: '$product',
          count: { $sum: 1 },
          totalQuantity: { $sum: '$quantity' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Get monthly trends (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyContacts = await Contact.aggregate([
      {
        $match: { createdAt: { $gte: sixMonthsAgo } }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    const monthlyInquiries = await Inquiry.aggregate([
      {
        $match: { createdAt: { $gte: sixMonthsAgo } }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          totalValue: { $sum: '$estimatedValue' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalProducts,
          totalBlogPosts,
          totalContacts,
          totalInquiries,
          recentContacts,
          recentInquiries,
          pendingContacts,
          pendingInquiries,
          highPriorityInquiries
        },
        productStats,
        inquiryByProduct,
        trends: {
          monthlyContacts,
          monthlyInquiries
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
});

// GET /api/admin/recent-activity - Get recent activity feed
router.get('/recent-activity', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;

    // Get recent contacts
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(limit / 2)
      .select('name email subject status createdAt')
      .lean();

    // Get recent inquiries
    const recentInquiries = await Inquiry.find()
      .sort({ createdAt: -1 })
      .limit(limit / 2)
      .select('name email product quantity status priority createdAt')
      .lean();

    // Combine and sort by date
    const activities = [
      ...recentContacts.map(contact => ({
        type: 'contact',
        id: contact._id,
        title: `New contact from ${contact.name}`,
        description: contact.subject,
        status: contact.status,
        createdAt: contact.createdAt,
        email: contact.email
      })),
      ...recentInquiries.map(inquiry => ({
        type: 'inquiry',
        id: inquiry._id,
        title: `Bulk order inquiry from ${inquiry.name}`,
        description: `${inquiry.product} - ${inquiry.quantity || 'Quantity TBD'}`,
        status: inquiry.status,
        priority: inquiry.priority,
        createdAt: inquiry.createdAt,
        email: inquiry.email
      }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      data: activities.slice(0, limit)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recent activity',
      error: error.message
    });
  }
});

// GET /api/admin/analytics - Get detailed analytics
router.get('/analytics', async (req, res) => {
  try {
    const { period = '30' } = req.query; // days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Contact analytics
    const contactAnalytics = await Contact.aggregate([
      {
        $match: { createdAt: { $gte: startDate } }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.date': 1 } }
    ]);

    // Inquiry analytics
    const inquiryAnalytics = await Inquiry.aggregate([
      {
        $match: { createdAt: { $gte: startDate } }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }
          },
          count: { $sum: 1 },
          totalValue: { $sum: '$estimatedValue' }
        }
      },
      { $sort: { '_id.date': 1 } }
    ]);

    // Blog post views
    const blogAnalytics = await BlogPost.aggregate([
      {
        $match: { published: true }
      },
      {
        $group: {
          _id: null,
          totalViews: { $sum: '$views' },
          avgViews: { $avg: '$views' }
        }
      }
    ]);

    // Top performing content
    const topBlogPosts = await BlogPost.find({ published: true })
      .sort({ views: -1 })
      .limit(5)
      .select('title slug views publishDate');

    res.json({
      success: true,
      data: {
        contactAnalytics,
        inquiryAnalytics,
        blogAnalytics: blogAnalytics[0] || { totalViews: 0, avgViews: 0 },
        topBlogPosts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics',
      error: error.message
    });
  }
});

export default router;