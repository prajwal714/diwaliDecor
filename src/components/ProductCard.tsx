import { Link, useNavigate } from 'react-router-dom'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/whatsapp'

type Props = {
  product: Product
  onAdded: () => void
  index?: number
}

export function ProductCard({ product, onAdded, index = 0 }: Props) {
  const { add } = useCart()
  const navigate = useNavigate()

  return (
    <article
      className="product"
      style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
    >
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-wrap">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
          {product.badge && <span className="badge badge-card">{product.badge}</span>}
        </div>
        <div className="product-body">
          <h3>{product.name}</h3>
          <p className="price">{formatINR(product.price)}</p>
          <p className="product-desc">{product.description}</p>
        </div>
      </Link>
      <div className="card-actions">
        <button
          type="button"
          className="btn btn-cart btn-swipe"
          onClick={() => {
            add(product)
            onAdded()
          }}
        >
          <span className="btn-swipe-label">Add to cart</span>
        </button>
        <button
          type="button"
          className="btn btn-buy-now"
          onClick={() => {
            add(product)
            navigate('/checkout')
          }}
        >
          Buy now
        </button>
      </div>
    </article>
  )
}
