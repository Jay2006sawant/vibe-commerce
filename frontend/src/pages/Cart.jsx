import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { checkout } from '../services/api'
import CartItem from '../components/CartItem'
import CheckoutForm from '../components/CheckoutForm'
import ReceiptModal from '../components/ReceiptModal'
import './Cart.css'

function Cart() {
  const { cart, loading, error, removeItem, updateItem } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)
  const [receipt, setReceipt] = useState(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const handleCheckout = async (customerName, customerEmail) => {
    try {
      setCheckoutLoading(true)
      const receiptData = await checkout(
        customerName,
        customerEmail,
        cart.items
      )
      setReceipt(receiptData)
      setShowCheckout(false)
    } catch (err) {
      alert(err.message)
    } finally {
      setCheckoutLoading(false)
    }
  }

  const closeReceipt = () => {
    setReceipt(null)
  }

  if (loading) {
    return (
      <div className="cart-container">
        <div className="loading">Loading cart...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="cart-container">
        <div className="error">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {cart.items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <a href="/">Continue Shopping</a>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeItem}
                onUpdate={updateItem}
              />
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              <span className="total-label">Total:</span>
              <span className="total-amount">${cart.total.toFixed(2)}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => setShowCheckout(true)}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      {showCheckout && (
        <CheckoutForm
          onCheckout={handleCheckout}
          onCancel={() => setShowCheckout(false)}
          loading={checkoutLoading}
        />
      )}

      {receipt && (
        <ReceiptModal receipt={receipt} onClose={closeReceipt} />
      )}
    </div>
  )
}

export default Cart

