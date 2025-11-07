import './ProductCard.css'

function ProductCard({ product, onAddToCart }) {
  const productId = product._id || product.externalId
  const imageUrl = product.image || 'https://via.placeholder.com/300x300?text=No+Image'

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={imageUrl} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        {product.description && (
          <p className="product-description">
            {product.description.length > 100
              ? `${product.description.substring(0, 100)}...`
              : product.description}
          </p>
        )}
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className="add-to-cart-btn"
            onClick={() => onAddToCart(productId)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

