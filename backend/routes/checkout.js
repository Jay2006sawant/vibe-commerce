const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

const MOCK_USER_ID = 'mock-user-123';

// POST /api/checkout - Process checkout and generate receipt
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, cartItems } = req.body;
    
    // Validate input
    if (!customerName || !customerEmail) {
      return res.status(400).json({ 
        error: 'Customer name and email are required' 
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      });
    }
    
    let items = cartItems;
    let total = 0;
    
    // If cartItems not provided, fetch from database
    if (!items || items.length === 0) {
      const dbCartItems = await CartItem.find({ userId: MOCK_USER_ID }).populate('productId');
      
      if (dbCartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
      }
      
      items = dbCartItems.map(item => ({
        productId: item.productId._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      }));
    }
    
    // Calculate total
    items.forEach(item => {
      total += item.price * item.quantity;
    });
    
    // Create order
    const order = new Order({
      userId: MOCK_USER_ID,
      customerName,
      customerEmail,
      cartItems: items,
      total: parseFloat(total.toFixed(2)),
      timestamp: new Date()
    });
    
    await order.save();
    
    // Clear cart after successful checkout
    await CartItem.deleteMany({ userId: MOCK_USER_ID });
    
    // Generate receipt
    const receipt = {
      orderId: order._id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      items: order.cartItems,
      total: order.total,
      timestamp: order.timestamp,
      message: 'Thank you for your purchase!'
    };
    
    res.status(201).json(receipt);
  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({ 
      error: 'Failed to process checkout', 
      message: error.message 
    });
  }
});

module.exports = router;

