import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  averageRating,
  getProduct,
  getSimilarProducts,
} from '../data/products'
import { useCart } from '../context/CartContext'
import { chatUrl, formatINR } from '../utils/whatsapp'
import { Stars } from './Stars'
import { ProductCard } from './ProductCard'
import { Lightbox } from './Lightbox'
import { UpiQrModal } from './UpiQrModal'
import {
  BagIcon,
  QrIcon,
  CashIcon,
  CheckIcon,
  GiftIcon,
  SparkIcon,
  TruckIcon,
  WhatsAppIcon,
  ZoomIcon,
} from './Icons'

type Props = {
  onAdded: () => void
  onBuyNow: () => void
}

export function ProductPage({ onAdded, onBuyNow }: Props) {
  const { id } = useParams<{ id: string }>()
  const product = id ? getProduct(id) : undefined
  const { add } = useCart()
  const [qrOpen, setQrOpen] = useState(false)
  const [zoomIndex, setZoomIndex] = useState<number | null>(null)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setZoomIndex(null)
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

  function handleBuyNow() {
    add(product!, qty)
    onBuyNow()
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
          {product.images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={i === 0 ? 'pdp-img pdp-img-main' : 'pdp-img'}
              onClick={() => setZoomIndex(i)}
              aria-label={`Zoom image ${i + 1}`}
            >
              <img src={src} alt={`${product.name} — view ${i + 1}`} />
              <span className="pdp-zoom-hint">
                <ZoomIcon /> Zoom
              </span>
            </button>
          ))}
        </div>

        <div className="pdp-info">
          <h1>{product.name}</h1>
          {product.badge && <span className="badge">{product.badge}</span>}
          {product.reviews.length > 0 && (
            <div className="pdp-rating-row">
              <Stars rating={avg} />
              <span>
                {avg.toFixed(1)} · {product.reviews.length} review
                {product.reviews.length === 1 ? '' : 's'}
              </span>
            </div>
          )}
          <p className="pdp-price">{formatINR(product.price)}</p>
          <p className="pdp-size-note">
            Standard size 40 inches. Need a different length? Custom sizes are
            ₹50 per inch —{' '}
            <a href={chatUrl()} target="_blank" rel="noopener noreferrer">
              message us on WhatsApp
            </a>
            .
          </p>

          <div className="pdp-love">
            <span className="pdp-love-tag">Why you’ll love it</span>
            <ul>
              {product.features.slice(0, 4).map((f) => (
                <li key={f}>
                  <SparkIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="pdp-delivery">
            <TruckIcon size={22} />
            <span>
              Delivery across <strong>India</strong> · Confirm on WhatsApp
            </span>
          </p>

          <div className="pdp-buy-row">
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
            <button
              type="button"
              className="btn btn-cart btn-swipe pdp-add"
              onClick={handleAdd}
            >
              <span className="btn-swipe-label">
                <BagIcon /> Add to cart
              </span>
            </button>
          </div>
          <button type="button" className="btn pdp-buy-now" onClick={handleBuyNow}>
            Buy it now
          </button>
          <button
            type="button"
            className="btn pdp-buy-now qr-trigger"
            onClick={() => setQrOpen(true)}
          >
            <QrIcon size={20} /> Pay by UPI QR
          </button>
          <a
            className="btn pdp-wa"
            href={chatUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon /> Chat on WhatsApp
          </a>

          <div className="pdp-perks">
            <div>
              <TruckIcon />
              <strong>Pan-India delivery</strong>
              <span>Doorstep</span>
            </div>
            <div>
              <CashIcon />
              <strong>UPI or COD</strong>
              <span>Pay your way</span>
            </div>
            <div>
              <GiftIcon />
              <strong>Gift-ready</strong>
              <span>Festive packing</span>
            </div>
          </div>

          <ul className="pdp-trust">
            <li>
              <CheckIcon /> 100% handcrafted in India
            </li>
            <li>
              <CheckIcon /> Reusable — keeps its colours year after year
            </li>
            <li>
              <CheckIcon /> Securely packed in protective festive packaging
            </li>
            <li>
              <CheckIcon /> Custom lengths available for any door
            </li>
          </ul>

          <details className="pdp-accordion" open>
            <summary>Product details</summary>
            <p>{product.details}</p>
          </details>
          <details className="pdp-accordion" open>
            <summary>Highlights</summary>
            <ul className="pdp-features">
              {product.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </details>
          <details className="pdp-accordion">
            <summary>Delivery &amp; payment</summary>
            <p>
              Delivery across India. Pay by UPI QR at checkout or cash on
              delivery. Orders are confirmed on WhatsApp.
            </p>
          </details>
        </div>
      </section>

      <UpiQrModal
        open={qrOpen}
        onClose={() => setQrOpen(false)}
        amount={product.price * qty}
      />

      {zoomIndex !== null && (
        <Lightbox
          images={product.images}
          alt={product.name}
          startIndex={zoomIndex}
          onClose={() => setZoomIndex(null)}
        />
      )}

      {product.reviews.length > 0 && (
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
      )}

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
