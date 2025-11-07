import { useState } from 'react'
import './CartItem.css'

function CartItem({ item, onRemove, onUpdate }) {
  const [quantity, setQuantity] = useState(item.quantity)
  const [updating, setUpdating] = useState(false)

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return
    
    try {
      setUpdating(true)
      setQuantity(newQuantity)
      await onUpdate(item.id, newQuantity)
    } catch (err) {
      setQuantity(item.quantity)
      alert(err.message)
    } finally {
      setUpdating(false)
    }
  }

  const handleRemove = async () => {
    if (window.confirm('Remove this item from cart?')) {
      try {
        await onRemove(item.id)
      } catch (err) {
        alert(err.message)
      }
    }
  }

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)} each</p>
      </div>
      
      <div className="cart-item-controls">
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1 || updating}
          >
            −
          </button>
          <span className="quantity-value">{quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={updating}
          >
            +
          </button>
        </div>
        
        <div className="cart-item-subtotal">
          ${item.subtotal.toFixed(2)}
        </div>
        
        <button
          className="remove-btn"
          onClick={handleRemove}
          disabled={updating}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default CartItem

