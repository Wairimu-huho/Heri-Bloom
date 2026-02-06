const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: {
    type: String,
    enum: ['period-product', 'self-care', 'medical', 'surprise'],
    required: true
  },
  
  tags: [String], // ['organic', 'eco-friendly', 'vegan', etc.]
  
  inventory: {
    inStock: { type: Boolean, default: true },
    quantity: Number,
  },
  
  supplier: String,
  cost: Number, // Your cost
  
  images: [String],
  
  preferences: {
    flowIntensity: [String], // ['light', 'medium', 'heavy']
    ageGroups: [String], // ['teen', 'adult']
  },
  
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);