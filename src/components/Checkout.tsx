import { useEffect, useState, type FormEvent } from 'react'
import { shopConfig } from '../config'
import { useCart } from '../context/CartContext'
import {
  formatINR,
  isValidIndianMobile,
  openWhatsAppOrder,
  type PaymentMethod,
} from '../utils/whatsapp'

type Props = {
  open: boolean
  onClose: () => void
}

export function Checkout({ open, onClose }: Props) {
  const { items, subtotal, clear } = useCart()
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [area, setArea] = useState('')
  const [payment, setPayment] = useState<PaymentMethod>('UPI')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (items.length === 0) {
      setError('Your cart is empty.')
      return
    }
    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (!isValidIndianMobile(mobile)) {
      setError('Enter a valid 10-digit Indian mobile number.')
      return
    }
    if (!area.trim()) {
      setError('Please enter your Bangalore area / address.')
      return
    }

    openWhatsAppOrder({
      name: name.trim(),
      mobile: mobile.trim(),
      area: area.trim(),
      payment,
      items,
      subtotal,
    })
    setSent(true)
    clear()
  }

  return (
    <div
      className={open ? 'drawer-root open' : 'drawer-root'}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="drawer-backdrop"
        aria-label="Close checkout"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <aside
        className="drawer drawer-wide"
        role="dialog"
        aria-modal="true"
        aria-label="Checkout"
        aria-hidden={!open}
      >
        <div className="drawer-head">
          <h2>Checkout</h2>
          <button type="button" className="icon-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {sent ? (
          <div className="checkout-done">
            <p>
              Opening WhatsApp with your order. If it didn’t open, check your
              popup blocker.
            </p>
            <button
              type="button"
              className="btn btn-cart"
              onClick={() => {
                setSent(false)
                onClose()
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <form className="checkout-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </label>
            <label>
              Mobile number
              <input
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))
                }
                inputMode="numeric"
                autoComplete="tel"
                placeholder="98XXXXXXXX"
                required
              />
            </label>
            <label>
              Bangalore area / address
              <textarea
                value={area}
                onChange={(e) => setArea(e.target.value)}
                rows={3}
                placeholder="e.g. Indiranagar, near 100 Feet Road"
                required
              />
            </label>

            <fieldset className="payment-fieldset">
              <legend>Payment</legend>
              <label className="radio">
                <input
                  type="radio"
                  name="payment"
                  checked={payment === 'UPI'}
                  onChange={() => setPayment('UPI')}
                />
                UPI (scan QR)
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="payment"
                  checked={payment === 'COD'}
                  onChange={() => setPayment('COD')}
                />
                Cash on delivery
              </label>
            </fieldset>

            {payment === 'UPI' && (
              <div className="upi-box">
                <p>Pay via UPI, then send the order on WhatsApp so we can confirm.</p>
                <img
                  src={shopConfig.upiQrPath}
                  alt="UPI QR code"
                  className="upi-qr"
                  width={200}
                  height={200}
                />
                <p className="upi-id">
                  UPI ID: <strong>{shopConfig.upiId}</strong>
                </p>
              </div>
            )}

            <div className="subtotal">
              <span>Order total</span>
              <strong>{formatINR(subtotal)}</strong>
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="btn btn-cart btn-block">
              Send order on WhatsApp
            </button>
            <p className="muted tiny">{shopConfig.deliveryNote}</p>
          </form>
        )}
      </aside>
    </div>
  )
}
