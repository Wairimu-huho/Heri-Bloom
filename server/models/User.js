const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  
  // Subscription info
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
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  
  // Quiz/Personalization data
  cycleInfo: {
    averageLength: Number,
    lastPeriodStart: Date,
    flowIntensity: String,
    painLevel: Number,
  },
  
  preferences: {
    selfCareStyle: [String],
    dietaryRestrictions: [String],
    productPreferences: [String],
  },
  
  // Shipping
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);