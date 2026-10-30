import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { shopConfig } from '../config'
import { getProduct } from '../data/products'
import { CheckIcon, CopyIcon, PinIcon } from './Icons'
import { OptimizedImage } from './OptimizedImage'
import {
  STATUS_LABEL,
  trackOrder,
  type OrderStatus,
  type TrackedOrder,
} from '../utils/orders'
import { formatINR, isValidIndianMobile } from '../utils/whatsapp'

const FLOW: OrderStatus[] = ['placed', 'confirmed', 'packed', 'shipped', 'delivered']

function timeline(status: OrderStatus): OrderStatus[] {
  if (status === 'cancelled') return ['placed', 'cancelled']
  return FLOW
}

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function CopyId({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      className="copy-id"
      onClick={copy}
      aria-label={copied ? 'Order id copied' : `Copy order id ${value}`}
    >
      <span className="copy-id-text">{value}</span>
      <span className="copy-id-icon" aria-hidden="true">
        {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
      </span>
      <span className="copy-id-tip" role="status">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  )
}

function Milestones({ order }: { order: TrackedOrder }) {
  const steps = timeline(order.status)
  const current = steps.indexOf(order.status)
  const progress = steps.length > 1 ? current / (steps.length - 1) : 1

  return (
    <ol
      className="milestones"
      style={{ ['--steps' as string]: steps.length, ['--progress' as string]: progress }}
    >
      <span className="milestone-rail" aria-hidden="true">
        <span className="milestone-fill" />
      </span>
      {steps.map((step, i) => {
        const state =
          step === 'cancelled'
            ? 'cancelled'
            : i < current
              ? 'done'
              : i === current
                ? 'current'
                : ''
        const when =
          i === 0 ? order.created_at : i === current ? order.updated_at : null
        return (
          <li
            key={step}
            className={`milestone ${state}`}
            style={{ ['--i' as string]: i }}
            aria-current={i === current ? 'step' : undefined}
          >
            <span className="milestone-dot" aria-hidden="true">
              {state === 'done' && <CheckIcon size={18} />}
            </span>
            <span className="milestone-copy">
              <strong>{STATUS_LABEL[step]}</strong>
              {when && <small>{formatWhen(when)}</small>}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

function Details({ order }: { order: TrackedOrder }) {
  return (
    <div className="track-details">
      <div className="track-id-row">
        <span className="track-kicker">Order ID</span>
        <CopyId value={order.public_id} />
      </div>

      <div className="track-block">
        <h3>Delivering to</h3>
        <p className="track-address">
          <PinIcon size={20} />
          <span>
            <strong>{order.name}</strong> · {order.mobile}
            <br />
            {[order.address1, order.address2, order.city, order.state]
              .filter(Boolean)
              .join(', ')}{' '}
            - {order.pin}
          </span>
        </p>
      </div>

      <div className="track-block">
        <h3>Items</h3>
        <ul className="track-products">
          {order.items.map((item) => {
            const product = getProduct(item.id)
            return (
              <li key={item.id}>
                {product?.image ? (
                  <OptimizedImage
                    src={product.image}
                    alt={item.name}
                    sizes="72px"
                    variant="productThumb"
                    width={72}
                    height={72}
                  />
                ) : (
                  <span className="track-product-empty" aria-hidden="true" />
                )}
                <span className="track-product-info">
                  <strong>{item.name}</strong>
                  <small>
                    Qty {item.qty} · {formatINR(item.price * item.qty)}
                  </small>
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="track-total">
        <span>{order.payment === 'UPI' ? 'Paid by UPI' : 'Cash on delivery'}</span>
        <strong>{formatINR(order.subtotal)}</strong>
      </div>

      {order.tracking_url && (
        <a
          className="btn btn-secondary btn-block"
          href={order.tracking_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open tracking link
        </a>
      )}
      {order.tracking_note && <p className="track-note">{order.tracking_note}</p>}
    </div>
  )
}

export function TrackPage() {
  const [orderId, setOrderId] = useState('')
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TrackedOrder | null | undefined>(undefined)
  const [runKey, setRunKey] = useState(0)

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
      setRunKey((k) => k + 1)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not look up that order.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="track-page">
      <section className={result ? 'co-card track-card track-card-wide' : 'co-card track-card'}>
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
          <div className="track-result" key={runKey}>
            <div className="track-grid">
              <Milestones order={result} />
              <Details order={result} />
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
