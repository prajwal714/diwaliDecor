import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { shopConfig } from '../config'
import { OptimizedImage } from './OptimizedImage'
import {
  STATUS_LABEL,
  trackOrder,
  type OrderStatus,
  type TrackedOrder,
} from '../utils/orders'
import { isValidIndianMobile } from '../utils/whatsapp'

const FLOW: OrderStatus[] = ['placed', 'confirmed', 'packed', 'shipped', 'delivered']

function timeline(status: OrderStatus): OrderStatus[] {
  if (status === 'cancelled') return ['placed', 'cancelled']
  return FLOW
}

export function TrackPage() {
  const [orderId, setOrderId] = useState('')
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TrackedOrder | null | undefined>(undefined)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setResult(undefined)
    const id = orderId.trim().toUpperCase()
    if (!/^DK-[A-Z2-9]{6}$/.test(id)) {
      setError('Enter an order id like DK-AB23CD.')
      return
    }
    if (!isValidIndianMobile(mobile)) {
      setError('Enter the 10-digit mobile number used at checkout.')
      return
    }
    setLoading(true)
    try {
      setResult(await trackOrder(id, mobile.trim()))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not look up that order.')
    } finally {
      setLoading(false)
    }
  }

  const steps = result ? timeline(result.status) : []
  const current = result ? steps.indexOf(result.status) : -1

  return (
    <div className="track-page">
      <section className="co-card track-card">
        <Link to="/" className="brand track-brand">
          <OptimizedImage
            src="/logo.png"
            alt={shopConfig.brandName}
            sizes="180px"
            variant="logo"
            width={640}
            height={314}
          />
        </Link>
        <h1>Track your order</h1>
        <p className="co-sub">
          Use the order id from your WhatsApp message and the mobile number from checkout.
        </p>
        <form className="track-form" onSubmit={onSubmit}>
          <label className="track-label">
            Order ID
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value.toUpperCase())}
              placeholder="DK-AB23CD"
              autoComplete="off"
              required
            />
          </label>
          <label className="track-label">
            Mobile number
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              inputMode="numeric"
              autoComplete="tel"
              placeholder="10-digit mobile"
              required
            />
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn btn-cart btn-block" disabled={loading}>
            {loading ? 'Looking up…' : 'Track order'}
          </button>
        </form>

        {result === null && (
          <p className="form-error" role="status">
            No order found for that id and mobile number.
          </p>
        )}

        {result && (
          <div className="track-result">
            <p className="order-id-banner">
              {result.public_id} · {result.city}
            </p>
            <ol className="status-timeline">
              {steps.map((step, i) => (
                <li
                  key={step}
                  className={
                    step === 'cancelled'
                      ? 'cancelled'
                      : i < current
                        ? 'done'
                        : i === current
                          ? 'current'
                          : ''
                  }
                >
                  {STATUS_LABEL[step]}
                </li>
              ))}
            </ol>
            {result.tracking_url && (
              <a className="btn btn-secondary btn-block" href={result.tracking_url} target="_blank" rel="noopener noreferrer">
                Open tracking link
              </a>
            )}
            {result.tracking_note && <p>{result.tracking_note}</p>}
            <ul className="track-items">
              {result.items.map((item) => (
                <li key={`${item.name}-${item.qty}`}>
                  {item.name} × {item.qty}
                </li>
              ))}
            </ul>
            <p className="muted">
              Updated {new Date(result.updated_at).toLocaleString('en-IN')}
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
