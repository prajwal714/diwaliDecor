import { Link, useNavigate } from 'react-router-dom'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/whatsapp'
import { OptimizedImage } from './OptimizedImage'

const THUMB_WIDTH = 1200
const THUMB_HEIGHT = 799

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
          <OptimizedImage
            src={product.image}
            alt={product.name}
            sizes="(max-width: 520px) 50vw, 33vw"
            variant="productThumb"
            width={THUMB_WIDTH}
            height={THUMB_HEIGHT}
            loading="lazy"
          />
          {product.badge && <span className="badge badge-card">{product.badge}</span>}
        </div>
        <div className="product-body">
          <h3>{product.name}</h3>
          <p className="price">
            {formatINR(product.price)}
            {product.mrp && product.mrp > product.price && (
              <>
                <s className="mrp">{formatINR(product.mrp)}</s>
                <span className="save-tag">
                  {Math.round((1 - product.price / product.mrp) * 100)}% off
                </span>
              </>
            )}
          </p>
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
