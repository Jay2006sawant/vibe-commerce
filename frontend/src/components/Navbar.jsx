import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Navbar.css'

function Navbar() {
  const { itemCount } = useCart()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🛍️ Vibe Commerce
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Products
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            Cart
            {itemCount > 0 && (
              <span className="cart-badge">{itemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

