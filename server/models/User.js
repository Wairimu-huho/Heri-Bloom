const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic Info
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String,
    required: true 
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
  
  // M-Pesa
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
    selfCareStyle: [String], // ['spa', 'active', 'cozy', 'creative']
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
  
  // Metadata
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  lastLogin: Date,
});

module.exports = mongoose.model('User', userSchema);