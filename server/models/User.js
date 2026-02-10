const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Info
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password by default in queries
  },
  phone: { 
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^(\+?254|0)[17]\d{8}$/, 'Please enter a valid Kenyan phone number']
  },
  
  // Subscription Info
  subscriptionTier: { 
    type: String, 
    enum: ['essential', 'premium', 'none'],
    default: 'none'
  },
  subscriptionStatus: {
    type: String,
    enum: ['active', 'paused', 'cancelled', 'none'],
    default: 'none'
  },
  
  // Payment IDs
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  mpesaPhoneNumber: String,
  
  // Quiz/Personalization
  cycleInfo: {
    averageLength: { type: Number, default: 28 },
    lastPeriodStart: Date,
    flowIntensity: { 
      type: String, 
      enum: ['light', 'medium', 'heavy'],
      default: 'medium'
    },
    painLevel: { 
      type: Number, 
      min: 0, 
      max: 10,
      default: 5
    },
  },
  
  preferences: {
    selfCareStyle: [String],
    dietaryRestrictions: [String],
    productPreferences: [String],
  },
  
  // Shipping Address
  shippingAddress: {
    street: String,
    apartment: String,
    city: String,
    county: String,
    postalCode: String,
    country: { type: String, default: 'Kenya' },
  },
  
  // Account Status
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Metadata
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  lastLogin: Date,
});

// Hash password before saving (Mongoose 6+ async middleware: no next callback)
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Method to generate auth token (we'll use this later)
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);