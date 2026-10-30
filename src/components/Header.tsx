import { Link, useLocation, useNavigate } from 'react-router-dom'
import { shopConfig } from '../config'
import { useCart } from '../context/CartContext'
import { OptimizedImage } from './OptimizedImage'

type Props = {
  onOpenCart: () => void
}

export function Header({ onOpenCart }: Props) {
  const { itemCount } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  function goShop() {
    if (location.pathname !== '/') {
      navigate('/#shop')
      return
    }
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="top-chrome">
      <div className="announce">
        Festive decor for homes across India · UPI or cash on delivery
      </div>
      <header className="header">
        <Link to="/" className="brand">
          <OptimizedImage
            src="/logo.png"
            alt={shopConfig.brandName}
            sizes="(max-width: 760px) 140px, 200px"
            variant="logo"
            width={640}
            height={314}
          />
        </Link>
        <nav className="header-nav">
          <button type="button" className="nav-link" onClick={goShop}>
            Shop
          </button>
          <Link to="/track" className="nav-link">
            Track
          </Link>
          <button
            type="button"
            className="cart-icon-btn"
            onClick={onOpenCart}
            aria-label={`Open cart${itemCount ? `, ${itemCount} items` : ''}`}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                d="M6 7h15l-1.5 9h-12z"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                d="M6 7 5 3H2"
              />
              <circle cx="9" cy="20" r="1.3" fill="currentColor" />
              <circle cx="17" cy="20" r="1.3" fill="currentColor" />
            </svg>
            <span className={itemCount > 0 ? 'cart-badge pulse' : 'cart-badge'}>
              {itemCount}
            </span>
          </button>
        </nav>
      </header>
    </div>
  )
}
