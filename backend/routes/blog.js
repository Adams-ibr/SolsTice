import express from 'express';
import { body, validationResult, query } from 'express-validator';
import BlogPost from '../models/BlogPost.js';

const router = express.Router();

// Validation middleware
const validateBlogPost = [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title must be 1-200 characters'),
  body('excerpt').trim().isLength({ min: 1, max: 300 }).withMessage('Excerpt must be 1-300 characters'),
  body('content').trim().isLength({ min: 1 }).withMessage('Content is required'),
  body('imageUrl').isURL().withMessage('Valid image URL is required'),
  body('author').trim().isLength({ min: 1, max: 100 }).withMessage('Author name is required'),
  body('category').optional().isIn(['market-trends', 'farming', 'logistics', 'sustainability', 'company-news', 'industry-insights']),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('published').optional().isBoolean()
];

// GET /api/blog - Get all published blog posts with filtering and pagination
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be 1-50'),
  query('category').optional().isIn(['market-trends', 'farming', 'logistics', 'sustainability', 'company-news', 'industry-insights']),
  query('featured').optional().isBoolean(),
  query('search').optional().isLength({ min: 1, max: 100 })
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

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = { published: true };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.featured !== undefined) filter.featured = req.query.featured === 'true';

    let query = BlogPost.find(filter);

    // Handle search
    if (req.query.search) {
      const searchResults = await BlogPost.searchPosts(req.query.search);
      const searchIds = searchResults.map(post => post._id);
      filter._id = { $in: searchIds };
      query = BlogPost.find(filter);
    }

    // Execute query with pagination
    const posts = await query
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content'); // Exclude full content for list view

    const total = await BlogPost.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          currentPage: page,
          totalPages,
          totalPosts: total,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts',
      error: error.message
    });
  }
});

// GET /api/blog/featured - Get featured blog posts
router.get('/featured', async (req, res) => {
  try {
    const posts = await BlogPost.getFeatured()
      .select('-content')
      .limit(3);
    
    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured posts',
      error: error.message
    });
  }
});

// GET /api/blog/categories - Get blog categories with counts
router.get('/categories', async (req, res) => {
  try {
    const categories = await BlogPost.aggregate([
      { $match: { published: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

// GET /api/blog/recent - Get recent blog posts
router.get('/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    
    const posts = await BlogPost.find({ published: true })
      .sort({ publishDate: -1 })
      .limit(limit)
      .select('title slug excerpt imageUrl author publishDate readTime');
    
    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recent posts',
      error: error.message
    });
  }
});

// GET /api/blog/:slug - Get single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ 
      slug: req.params.slug, 
      published: true 
    });
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment views
    await post.incrementViews();

    // Get related posts (same category, excluding current post)
    const relatedPosts = await BlogPost.find({
      category: post.category,
      published: true,
      _id: { $ne: post._id }
    })
    .select('title slug excerpt imageUrl author publishDate readTime')
    .limit(3)
    .sort({ publishDate: -1 });

    res.json({
      success: true,
      data: {
        post,
        relatedPosts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post',
      error: error.message
    });
  }
});

// POST /api/blog - Create new blog post (Admin only - will add auth later)
router.post('/', validateBlogPost, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const post = new BlogPost(req.body);
    await post.save();

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: post
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A blog post with this title already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating blog post',
      error: error.message
    });
  }
});

// PUT /api/blog/:id - Update blog post (Admin only - will add auth later)
router.put('/:id', validateBlogPost, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating blog post',
      error: error.message
    });
  }
});

// DELETE /api/blog/:id - Delete blog post (Admin only - will add auth later)
router.delete('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post',
      error: error.message
    });
  }
});

// PUT /api/blog/:id/publish - Toggle publish status
router.put('/:id/publish', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    post.published = !post.published;
    if (post.published && !post.publishDate) {
      post.publishDate = new Date();
    }
    
    await post.save();

    res.json({
      success: true,
      message: `Blog post ${post.published ? 'published' : 'unpublished'} successfully`,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating publish status',
      error: error.message
    });
  }
});

export default router;