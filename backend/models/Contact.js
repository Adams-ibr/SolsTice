import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
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
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved', 'closed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  source: {
    type: String,
    enum: ['website', 'email', 'phone', 'whatsapp', 'other'],
    default: 'website'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
  resolved: {
    type: Boolean,
    default: false
  },
  resolvedAt: Date,
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true
});

// Index for search and filtering
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1 });
contactSchema.index({ name: 'text', subject: 'text', message: 'text' });

// Virtual for days since submission
contactSchema.virtual('daysSinceSubmission').get(function() {
  const now = new Date();
  const diffTime = Math.abs(now - this.createdAt);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Method to mark as resolved
contactSchema.methods.markResolved = function() {
  this.status = 'resolved';
  this.resolved = true;
  this.resolvedAt = new Date();
  return this.save();
};

// Method to add note
contactSchema.methods.addNote = function(content, userId) {
  this.notes.push({
    content,
    addedBy: userId,
    addedAt: new Date()
  });
  return this.save();
};

// Static method to get unresolved contacts
contactSchema.statics.getUnresolved = function() {
  return this.find({ resolved: false }).sort({ createdAt: -1 });
};

// Static method to get contacts by status
contactSchema.statics.getByStatus = function(status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

export default mongoose.model('Contact', contactSchema);