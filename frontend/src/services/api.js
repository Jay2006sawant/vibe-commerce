import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Products API
export const getProducts = async () => {
  try {
    const response = await api.get('/products')
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch products')
  }
}

export const getFakeStoreProducts = async () => {
  try {
    const response = await api.get('/products/fake-store')
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch from Fake Store API')
  }
}

// Cart API
export const getCart = async () => {
  try {
    const response = await api.get('/cart')
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch cart')
  }
}

export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await api.post('/cart', {
      productId,
      qty: quantity
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to add item to cart')
  }
}

export const removeFromCart = async (itemId) => {
  try {
    const response = await api.delete(`/cart/${itemId}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to remove item from cart')
  }
}

export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await api.put(`/cart/${itemId}`, { quantity })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update cart item')
  }
}

// Checkout API
export const checkout = async (customerName, customerEmail, cartItems) => {
  try {
    const response = await api.post('/checkout', {
      customerName,
      customerEmail,
      cartItems
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to process checkout')
  }
}

