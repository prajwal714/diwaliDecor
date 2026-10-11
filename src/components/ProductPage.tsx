import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  averageRating,
  getProduct,
  getSimilarProducts,
} from '../data/products'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/whatsapp'
import { Stars } from './Stars'
import { ProductCard } from './ProductCard'

type Props = {
  onAdded: () => void
}

export function ProductPage({ onAdded }: Props) {
  const { id } = useParams<{ id: string }>()
  const product = id ? getProduct(id) : undefined
  const { add } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setActiveImage(0)
    setQty(1)
  }, [id])

  const similar = useMemo(
    () => (product ? getSimilarProducts(product, 3) : []),
    [product],
  )

  if (!product) {
    return <Navigate to="/" replace />
  }

  const avg = averageRating(product.reviews)
  const ratingCounts = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: product.reviews.filter((r) => r.rating === stars).length,
  }))
  const maxCount = Math.max(1, ...ratingCounts.map((r) => r.count))

  function handleAdd() {
    add(product!, qty)
    onAdded()
  }

  return (
    <div className="product-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/#shop">{product.category}</Link>
        <span>/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <section className="pdp">
        <div className="pdp-gallery">
          <div className="pdp-main-image">
            <img
              src={product.images[activeImage] ?? product.image}
              alt={product.name}
              width={1200}
              height={1200}
            />
          </div>
          <div className="pdp-thumbs" role="list">
            {product.images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                role="listitem"
                className={i === activeImage ? 'thumb active' : 'thumb'}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
              >
                <img src={src} alt="" width={120} height={120} />
              </button>
            ))}
          </div>
        </div>

        <div className="pdp-info">
          <h1>{product.name}</h1>
          <div className="pdp-rating-row">
            <Stars rating={avg} />
            <span>
              {avg.toFixed(1)} · {product.reviews.length} review
              {product.reviews.length === 1 ? '' : 's'}
            </span>
          </div>
          <p className="pdp-price">{formatINR(product.price)}</p>
          <p className="pdp-lead">{product.description}</p>

          <div className="pdp-qty">
            <span>Quantity</span>
            <div className="qty-control">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="pdp-actions">
            <button
              type="button"
              className="btn btn-cart btn-swipe btn-block"
              onClick={handleAdd}
            >
              <span className="btn-swipe-label">Add to cart</span>
            </button>
          </div>

          <ul className="pdp-features">
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <details className="pdp-accordion" open>
            <summary>Product details</summary>
            <p>{product.details}</p>
          </details>
          <details className="pdp-accordion">
            <summary>Delivery &amp; payment</summary>
            <p>
              Delivery across Bangalore. Pay by UPI QR at checkout or cash on
              delivery. Orders are confirmed on WhatsApp.
            </p>
          </details>
        </div>
      </section>

      <section className="reviews" id="reviews">
        <div className="reviews-head">
          <h2>Customer reviews</h2>
          <div className="reviews-summary">
            <div className="reviews-score">
              <strong>{avg.toFixed(1)}</strong>
              <Stars rating={avg} />
              <span>Based on {product.reviews.length} reviews</span>
            </div>
            <div className="reviews-bars">
              {ratingCounts.map(({ stars, count }) => (
                <div key={stars} className="bar-row">
                  <span>{stars}★</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ul className="review-list">
          {product.reviews.map((review) => (
            <li key={review.id} className="review-card">
              <div className="review-meta">
                <Stars rating={review.rating} size="sm" />
                <strong>{review.name}</strong>
                {review.verified && <span className="verified">Verified</span>}
                <span className="review-date">{review.date}</span>
              </div>
              <h3>{review.title}</h3>
              <p>{review.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="related">
        <h2>You may also like</h2>
        <div className="product-grid related-grid">
          {similar.map((item, index) => (
            <ProductCard
              key={item.id}
              product={item}
              onAdded={onAdded}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
