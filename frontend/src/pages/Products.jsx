import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { getProducts, getFakeStoreProducts } from '../services/api'
import ProductCard from '../components/ProductCard'
import './Products.css'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [useFakeStore, setUseFakeStore] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [useFakeStore])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = useFakeStore 
        ? await getFakeStoreProducts() 
        : await getProducts()
      setProducts(data)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async (productId) => {
    try {
      await addItem(productId, 1)
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) {
    return (
      <div className="products-container">
        <div className="loading">Loading products...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="products-container">
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={fetchProducts}>Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Products</h1>
        <label className="toggle-fake-store">
          <input
            type="checkbox"
            checked={useFakeStore}
            onChange={(e) => setUseFakeStore(e.target.checked)}
          />
          <span>Use Fake Store API (Bonus Feature)</span>
        </label>
      </div>
      
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id || product.externalId}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default Products

