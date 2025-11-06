const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const axios = require('axios');

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    // Check if products exist in DB
    let products = await Product.find();
    
    // If no products, seed with mock data
    if (products.length === 0) {
      const mockProducts = [
        { name: 'Wireless Headphones', price: 79.99, description: 'Premium noise-cancelling headphones', category: 'electronics' },
        { name: 'Smart Watch', price: 199.99, description: 'Fitness tracking smartwatch', category: 'electronics' },
        { name: 'Laptop Stand', price: 29.99, description: 'Ergonomic aluminum laptop stand', category: 'accessories' },
        { name: 'Mechanical Keyboard', price: 89.99, description: 'RGB mechanical gaming keyboard', category: 'electronics' },
        { name: 'USB-C Hub', price: 39.99, description: '7-in-1 USB-C adapter hub', category: 'accessories' },
        { name: 'Wireless Mouse', price: 24.99, description: 'Ergonomic wireless mouse', category: 'accessories' },
        { name: 'Monitor Stand', price: 19.99, description: 'Adjustable dual monitor stand', category: 'accessories' },
        { name: 'Webcam HD', price: 49.99, description: '1080p HD webcam with microphone', category: 'electronics' },
        { name: 'Desk Mat', price: 15.99, description: 'Large gaming desk mat', category: 'accessories' },
        { name: 'Cable Organizer', price: 12.99, description: 'Cable management system', category: 'accessories' }
      ];
      
      products = await Product.insertMany(mockProducts);
    }
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products', message: error.message });
  }
});

// GET /api/products/fake-store - Fetch from Fake Store API (bonus feature)
router.get('/fake-store', async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products?limit=10');
    const fakeStoreProducts = response.data.map(product => ({
      name: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      externalId: product.id
    }));
    
    res.json(fakeStoreProducts);
  } catch (error) {
    console.error('Error fetching from Fake Store API:', error);
    res.status(500).json({ 
      error: 'Failed to fetch from Fake Store API', 
      message: error.message 
    });
  }
});

module.exports = router;

