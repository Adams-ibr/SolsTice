import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [200, 'Company name cannot exceed 200 characters']
  },
  phone: {
    type: String,
    trim: true
  },
  product: {
    type: String,
    required: [true, 'Product selection is required'],
    trim: true
  },
  quantity: {
    type: Number,
    min: [1, 'Quantity must be at least 1 metric ton']
  },
  quantityUnit: {
    type: String,
    enum: ['metric-tons', 'containers', 'kg'],
    default: 'metric-tons'
  },
  message: {
    type: String,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  country: {
    type: String,
    trim: true
  },
  deliveryPort: {
    type: String,
    trim: true
  },
  urgency: {
    type: String,
    enum: ['immediate', 'within-month', 'within-quarter', 'flexible'],
    default: 'flexible'
  },
  budget: {
    type: String,
    enum: ['under-10k', '10k-50k', '50k-100k', 'over-100k', 'not-specified'],
    default: 'not-specified'
  },
  status: {
    type: String,
    enum: ['new', 'quoted', 'negotiating', 'confirmed', 'shipped', 'completed', 'cancelled'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  source: {
    type: String,
    enum: ['website', 'referral', 'trade-show', 'email', 'phone', 'other'],
    default: 'website'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  quotedPrice: {
    amount: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    validUntil: Date
  },
  notes: [{
    content: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  followUpDate: Date,
  estimatedValue: Number, // in USD
  customerType: {
    type: String,
    enum: ['new', 'returning', 'vip'],
    default: 'new'
  },
  ipAddress: String,
  userAgent: String,
  referrer: String
}, {
  timestamps: true
});

// Index for search and filtering
inquirySchema.index({ status: 1, createdAt: -1 });
inquirySchema.index({ product: 1, status: 1 });
inquirySchema.index({ email: 1 });
inquirySchema.index({ assignedTo: 1, status: 1 });
inquirySchema.index({ name: 'text', company: 'text', product: 'text' });

// Virtual for days since inquiry
inquirySchema.virtual('daysSinceInquiry').get(function() {
  const now = new Date();
  const diffTime = Math.abs(now - this.createdAt);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for formatted quantity
inquirySchema.virtual('formattedQuantity').get(function() {
  if (!this.quantity) return 'Not specified';
  return `${this.quantity} ${this.quantityUnit.replace('-', ' ')}`;
});

// Method to update status
inquirySchema.methods.updateStatus = function(newStatus, userId) {
  const oldStatus = this.status;
  this.status = newStatus;
  
  // Add automatic note for status change
  this.notes.push({
    content: `Status changed from ${oldStatus} to ${newStatus}`,
    addedBy: userId,
    addedAt: new Date()
  });
  
  return this.save();
};

// Method to add quote
inquirySchema.methods.addQuote = function(amount, currency = 'USD', validDays = 30, userId) {
  this.quotedPrice = {
    amount,
    currency,
    validUntil: new Date(Date.now() + validDays * 24 * 60 * 60 * 1000)
  };
  
  this.status = 'quoted';
  
  this.notes.push({
    content: `Quote added: ${currency} ${amount} (valid for ${validDays} days)`,
    addedBy: userId,
    addedAt: new Date()
  });
  
  return this.save();
};

// Method to add note
inquirySchema.methods.addNote = function(content, userId) {
  this.notes.push({
    content,
    addedBy: userId,
    addedAt: new Date()
  });
  return this.save();
};

// Static method to get inquiries by status
inquirySchema.statics.getByStatus = function(status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

// Static method to get high priority inquiries
inquirySchema.statics.getHighPriority = function() {
  return this.find({ 
    priority: { $in: ['high', 'urgent'] },
    status: { $in: ['new', 'quoted', 'negotiating'] }
  }).sort({ createdAt: -1 });
};

// Static method to get inquiries by product
inquirySchema.statics.getByProduct = function(product) {
  return this.find({ product }).sort({ createdAt: -1 });
};

// Static method to get recent inquiries
inquirySchema.statics.getRecent = function(days = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return this.find({ 
    createdAt: { $gte: startDate }
  }).sort({ createdAt: -1 });
};

export default mongoose.model('Inquiry', inquirySchema);