import './ReceiptModal.css'

function ReceiptModal({ receipt, onClose }) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="receipt-overlay" onClick={onClose}>
      <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="receipt-header">
          <h2>Order Receipt</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="receipt-content">
          <div className="receipt-section">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> {receipt.orderId}</p>
            <p><strong>Date:</strong> {formatDate(receipt.timestamp)}</p>
          </div>

          <div className="receipt-section">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> {receipt.customerName}</p>
            <p><strong>Email:</strong> {receipt.customerEmail}</p>
          </div>

          <div className="receipt-section">
            <h3>Items</h3>
            <div className="receipt-items">
              {receipt.items.map((item, index) => (
                <div key={index} className="receipt-item">
                  <div className="receipt-item-info">
                    <span className="receipt-item-name">{item.name}</span>
                    <span className="receipt-item-qty">Qty: {item.quantity}</span>
                  </div>
                  <span className="receipt-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="receipt-total">
            <span className="total-label">Total:</span>
            <span className="total-amount">${receipt.total.toFixed(2)}</span>
          </div>

          <div className="receipt-message">
            <p>✅ {receipt.message}</p>
          </div>
        </div>

        <div className="receipt-footer">
          <button className="close-receipt-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReceiptModal

