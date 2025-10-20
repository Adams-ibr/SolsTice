import mongoose from 'mongoose';
import slugify from 'slugify';

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog post title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: [true, 'Blog post excerpt is required'],
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Blog post content is required']
  },
  imageUrl: {
    type: String,
    required: [true, 'Blog post image is required']
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  published: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['market-trends', 'farming', 'logistics', 'sustainability', 'company-news', 'industry-insights'],
    default: 'company-news'
  },
  tags: [String],
  readTime: {
    type: Number, // in minutes
    default: 5
  },
  views: {
    type: Number,
    default: 0
  },
  seoTitle: String,
  seoDescription: String,
  metaKeywords: [String]
}, {
  timestamps: true
});

// Index for search and performance
blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ published: 1, publishDate: -1 });
blogPostSchema.index({ title: 'text', excerpt: 'text', content: 'text' });

// Pre-save middleware to generate slug
blogPostSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }
  
  // Calculate read time based on content length
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }
  
  next();
});

// Virtual for formatted publish date
blogPostSchema.virtual('formattedDate').get(function() {
  return this.publishDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Method to increment views
blogPostSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Static method to get published posts
blogPostSchema.statics.getPublished = function() {
  return this.find({ published: true }).sort({ publishDate: -1 });
};

// Static method to get featured posts
blogPostSchema.statics.getFeatured = function() {
  return this.find({ published: true, featured: true }).sort({ publishDate: -1 });
};

// Static method to search posts
blogPostSchema.statics.searchPosts = function(query) {
  return this.find({
    $text: { $search: query },
    published: true
  }).sort({ score: { $meta: 'textScore' } });
};

export default mongoose.model('BlogPost', blogPostSchema);