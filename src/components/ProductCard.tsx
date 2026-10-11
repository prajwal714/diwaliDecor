import { Link } from 'react-router-dom'
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
            width={1000}
            height={1000}
          />
        </div>
        <div className="product-body">
          <h3>{product.name}</h3>
          <p className="price">{formatINR(product.price)}</p>
          <p className="product-desc">{product.description}</p>
        </div>
      </Link>
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
    </article>
  )
}
