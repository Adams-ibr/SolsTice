import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  pricePerTon: {
    type: String,
    required: [true, 'Price per ton is required'],
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, 'Product image is required']
  },
  category: {
    type: String,
    enum: ['nuts', 'spices', 'seeds', 'grains', 'herbs', 'other'],
    default: 'other'
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  specifications: {
    origin: String,
    harvestSeason: String,
    shelfLife: String,
    packaging: String,
    minimumOrder: String
  },
  nutritionalInfo: {
    protein: String,
    fat: String,
    carbohydrates: String,
    fiber: String,
    moisture: String
  },
  certifications: [{
    type: String,
    enum: ['organic', 'fair-trade', 'haccp', 'iso', 'halal', 'kosher']
  }],
  seoTitle: String,
  seoDescription: String,
  tags: [String],
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function() {
  return this.pricePerTon;
});

// Method to check if product is available
productSchema.methods.isAvailable = function() {
  return this.inStock;
};

// Static method to get featured products
productSchema.statics.getFeatured = function() {
  return this.find({ featured: true, inStock: true }).sort({ sortOrder: 1 });
};

// Static method to search products
productSchema.statics.searchProducts = function(query) {
  return this.find({
    $text: { $search: query },
    inStock: true
  }).sort({ score: { $meta: 'textScore' } });
};

export default mongoose.model('Product', productSchema);