const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  orderType: {
    type: String,
    enum: ['subscription', 'one-time'],
    required: true
  },
  
  tier: {
    type: String,
    enum: ['essential', 'premium'],
    required: true
  },
  
  items: [{
    name: String,
    category: String, // 'product', 'self-care', 'surprise'
    quantity: Number,
  }],
  
  shippingDate: Date,
  deliveryDate: Date,
  trackingNumber: String,
  
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending'
  },
  
  amount: Number,
  
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);