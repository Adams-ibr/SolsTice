import express from 'express';
import { body, validationResult, query } from 'express-validator';
import Product from '../models/Product.js';

const router = express.Router();

// Validation middleware
const validateProduct = [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name must be 1-100 characters'),
  body('description').trim().isLength({ min: 1, max: 500 }).withMessage('Description must be 1-500 characters'),
  body('pricePerTon').trim().notEmpty().withMessage('Price per ton is required'),
  body('imageUrl').isURL().withMessage('Valid image URL is required'),
  body('category').optional().isIn(['nuts', 'spices', 'seeds', 'grains', 'herbs', 'other']),
];

// GET /api/products - Get all products with filtering and pagination
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be 1-100'),
  query('category').optional().isIn(['nuts', 'spices', 'seeds', 'grains', 'herbs', 'other']),
  query('featured').optional().isBoolean(),
  query('inStock').optional().isBoolean(),
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
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.featured !== undefined) filter.featured = req.query.featured === 'true';
    if (req.query.inStock !== undefined) filter.inStock = req.query.inStock === 'true';

    let query = Product.find(filter);

    // Handle search
    if (req.query.search) {
      const searchResults = await Product.searchProducts(req.query.search);
      const searchIds = searchResults.map(product => product._id);
      filter._id = { $in: searchIds };
      query = Product.find(filter);
    }

    // Execute query with pagination
    const products = await query
      .sort({ sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: page,
          totalPages,
          totalProducts: total,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

// GET /api/products/featured - Get featured products
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.getFeatured();
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured products',
      error: error.message
    });
  }
});

// GET /api/products/categories - Get product categories with counts
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $match: { inStock: true } },
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

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
});

// POST /api/products - Create new product (Admin only - will add auth later)
router.post('/', validateProduct, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
});

// PUT /api/products/:id - Update product (Admin only - will add auth later)
router.put('/:id', validateProduct, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
});

// DELETE /api/products/:id - Delete product (Admin only - will add auth later)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
});

export default router;