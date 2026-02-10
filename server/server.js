const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Order = require('./models/Order');
const Product = require('./models/Product');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully!');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Heri-Bloom Backend is running!',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Test creating a user
app.post('/api/test-user', async (req, res) => {
  try {
    const testUser = new User({
      name: 'Test User',
      email: 'test@heribloom.com',
      password: 'test123', // In real app, this will be hashed
      phone: '0712345678',
    });
    
    await testUser.save();
    
    res.json({ 
      message: 'User created successfully!',
      user: testUser 
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error creating user',
      error: error.message 
    });
  }
});

// Get all users (just for testing)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});