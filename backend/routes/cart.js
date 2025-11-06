const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

const MOCK_USER_ID = 'mock-user-123';

// GET /api/cart - Get cart items with total
router.get('/', async (req, res) => {
  try {
    const cartItems = await CartItem.find({ userId: MOCK_USER_ID }).populate('productId');
    
    let total = 0;
    const items = cartItems.map(item => {
      const itemTotal = item.product.price * item.quantity;
      total += itemTotal;
      return {
        id: item._id,
        productId: item.productId._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: itemTotal
      };
    });
    
    res.json({
      items,
      total: parseFloat(total.toFixed(2)),
      itemCount: items.length
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart', message: error.message });
  }
});

// POST /api/cart - Add item to cart
router.post('/', async (req, res) => {
  try {
    const { productId, qty } = req.body;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
    
    const quantity = qty || 1;
    
    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Check if item already exists in cart
    let cartItem = await CartItem.findOne({ 
      userId: MOCK_USER_ID, 
      productId: productId 
    });
    
    if (cartItem) {
      // Update quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Create new cart item
      cartItem = new CartItem({
        userId: MOCK_USER_ID,
        productId: productId,
        quantity: quantity,
        product: {
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image
        }
      });
      await cartItem.save();
    }
    
    res.status(201).json({
      message: 'Item added to cart',
      cartItem: {
        id: cartItem._id,
        productId: cartItem.productId,
        quantity: cartItem.quantity
      }
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart', message: error.message });
  }
});

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const cartItem = await CartItem.findOne({ 
      _id: id, 
      userId: MOCK_USER_ID 
    });
    
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    await CartItem.findByIdAndDelete(id);
    
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart', message: error.message });
  }
});

// PUT /api/cart/:id - Update cart item quantity
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Valid quantity is required' });
    }
    
    const cartItem = await CartItem.findOne({ 
      _id: id, 
      userId: MOCK_USER_ID 
    });
    
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    cartItem.quantity = quantity;
    await cartItem.save();
    
    res.json({
      message: 'Cart item updated',
      cartItem: {
        id: cartItem._id,
        productId: cartItem.productId,
        quantity: cartItem.quantity
      }
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart item', message: error.message });
  }
});

module.exports = router;

