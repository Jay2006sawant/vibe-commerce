const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'mock-user-123',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  product: {
    type: Object,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CartItem', cartItemSchema);

