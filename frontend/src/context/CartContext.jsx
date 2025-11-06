import { createContext, useContext, useState, useEffect } from 'react'
import { getCart, addToCart, removeFromCart, updateCartItem } from '../services/api'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total: 0, itemCount: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCart = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getCart()
      setCart(data)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching cart:', err)
    } finally {
      setLoading(false)
    }
  }

  const addItem = async (productId, quantity = 1) => {
    try {
      setError(null)
      await addToCart(productId, quantity)
      await fetchCart()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const removeItem = async (itemId) => {
    try {
      setError(null)
      await removeFromCart(itemId)
      await fetchCart()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateItem = async (itemId, quantity) => {
    try {
      setError(null)
      await updateCartItem(itemId, quantity)
      await fetchCart()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount: cart.itemCount,
        loading,
        error,
        addItem,
        removeItem,
        updateItem,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

