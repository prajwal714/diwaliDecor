import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { shopConfig } from '../config'
import { OptimizedImage } from './OptimizedImage'
import { useCart } from '../context/CartContext'
import {
  ArrowLeftIcon,
  BagIcon,
  CardIcon,
  CashIcon,
  CheckIcon,
  FeatherIcon,
  LockIcon,
  QrIcon,
  TruckIcon,
} from './Icons'
import { createOrder } from '../utils/orders'
import {
  buildOrderMessage,
  buildUpiUri,
  formatINR,
  isUpiConfigured,
  isValidIndianMobile,
  isValidPin,
  openWhatsAppOrder,
  orderUrl,
  type OrderDetails,
  type PaymentMethod,
} from '../utils/whatsapp'

type Step = 'cart' | 'shipping' | 'payment'

const STEPS: Array<{ id: Step; label: string; icon: ReactNode }> = [
  { id: 'cart', label: 'Cart', icon: <BagIcon size={20} /> },
  { id: 'shipping', label: 'Shipping', icon: <TruckIcon size={20} /> },
  { id: 'payment', label: 'Payment', icon: <CardIcon size={20} /> },
]

const STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
]

type Address = {
  name: string
  mobile: string
  email: string
  address1: string
  address2: string
  city: string
  state: string
  pin: string
}

const EMPTY: Address = {
  name: '',
  mobile: '',
  email: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  pin: '',
}

const ADDRESS_KEY = 'devamkart-address'

function loadAddress(): Address | null {
  try {
    const raw = localStorage.getItem(ADDRESS_KEY)
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<Address>) } : null
  } catch {
    return null
  }
}

type FieldProps = {
  label: string
  required?: boolean
  value: string
  onChange: (v: string) => void
  autoComplete?: string
  inputMode?: 'numeric' | 'email' | 'tel' | 'text'
  type?: string
  className?: string
}

function Field({
  label,
  required,
  value,
  onChange,
  autoComplete,
  inputMode,
  type = 'text',
  className = '',
}: FieldProps) {
  return (
    <label className={`field ${className}`}>
      <input
        type={type}
        value={value}
        placeholder=" "
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
      />
      <span>
        {label}
        {required && <b aria-hidden="true"> *</b>}
      </span>
    </label>
  )
}

export function CheckoutPage() {
  const { items, subtotal, itemCount, setQty, remove, clear } = useCart()
  const navigate = useNavigate()
  const saved = loadAddress()

  const [step, setStep] = useState<Step>('cart')
  const [addr, setAddr] = useState<Address>(saved ?? EMPTY)
  const [saveAddr, setSaveAddr] = useState(Boolean(saved))
  const [payment, setPayment] = useState<PaymentMethod>('UPI')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [step])

  useEffect(() => {
    if (items.length === 0 && !lastOrder) navigate('/', { replace: true })
  }, [items.length, lastOrder, navigate])

  const set = (key: keyof Address) => (v: string) =>
    setAddr((a) => ({ ...a, [key]: v }))

  function validateShipping(): string {
    if (!addr.name.trim()) return 'Please enter your full name.'
    if (!isValidIndianMobile(addr.mobile))
      return 'Enter a valid 10-digit Indian mobile number.'
    if (addr.email.trim() && !/^\S+@\S+\.\S+$/.test(addr.email.trim()))
      return 'Enter a valid email address or leave it blank.'
    if (!addr.address1.trim()) return 'Please enter your address.'
    if (!addr.city.trim()) return 'Please enter your city.'
    if (!addr.state) return 'Please select your state.'
    if (!isValidPin(addr.pin)) return 'Enter a valid 6-digit PIN code.'
    return ''
  }

  function goShipping() {
    setError('')
    if (items.length === 0) return
    const gone = items.find((i) => i.product.soldOut)
    if (gone) {
      setError(`${gone.product.name} is sold out. Please remove it from your cart.`)
      return
    }
    setStep('shipping')
  }

  function submitShipping(e: FormEvent) {
    e.preventDefault()
    const msg = validateShipping()
    setError(msg)
    if (msg) return
    if (saveAddr) localStorage.setItem(ADDRESS_KEY, JSON.stringify(addr))
    else localStorage.removeItem(ADDRESS_KEY)
    setStep('payment')
  }

  async function placeOrder() {
    setError('')
    const gone = items.find((i) => i.product.soldOut)
    if (gone) {
      setError(`${gone.product.name} is sold out. Please remove it from your cart.`)
      return
    }
    setSaving(true)
    const order: OrderDetails = {
      name: addr.name.trim(),
      mobile: addr.mobile.trim(),
      email: addr.email.trim() || undefined,
      address1: addr.address1.trim(),
      address2: addr.address2.trim() || undefined,
      city: addr.city.trim(),
      state: addr.state,
      pin: addr.pin.trim(),
      payment,
      items,
      subtotal,
    }
    try {
      const orderId = await createOrder(order)
      const saved = { ...order, orderId }
      setLastOrder(saved)
      openWhatsAppOrder(saved)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save your order. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const stepIndex = STEPS.findIndex((s) => s.id === step)

  return (
    <div className="checkout-page">
      <span className="feather feather-left">
        <FeatherIcon size={70} />
      </span>
      <span className="feather feather-right">
        <FeatherIcon size={70} />
      </span>

      <header className="co-header">
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
        {!lastOrder && (
          <ol className="stepper" aria-label="Checkout progress">
            {STEPS.map((s, i) => (
              <li
                key={s.id}
                className={
                  i < stepIndex ? 'done' : i === stepIndex ? 'current' : ''
                }
                aria-current={i === stepIndex ? 'step' : undefined}
              >
                <span className="step-dot">
                  {i < stepIndex ? <CheckIcon size={20} /> : s.icon}
                </span>
                <span className="step-label">{s.label}</span>
              </li>
            ))}
          </ol>
        )}
        <span className="co-secure">
          <LockIcon /> Secure checkout
        </span>
      </header>

      {lastOrder ? (
        <section className="co-card co-done">
          <span className="done-badge">
            <CheckIcon size={44} />
          </span>
          <h1>Opening WhatsApp with your order</h1>
          {lastOrder.orderId && (
            <p className="order-id-banner">
              Order ID <strong>{lastOrder.orderId}</strong>
            </p>
          )}
          <p>
            Keep this id. Track it anytime with the mobile number used at checkout.
            If WhatsApp didn’t open, check your popup blocker.
          </p>
          {lastOrder.orderId && (
            <Link to="/track" className="btn btn-secondary btn-block">
              Track this order
            </Link>
          )}
          <a
            className="btn btn-secondary btn-block"
            href={orderUrl(buildOrderMessage(lastOrder))}
            target="_blank"
            rel="noopener noreferrer"
          >
            Reopen WhatsApp
          </a>
          <button
            type="button"
            className="btn btn-cart btn-block"
            onClick={() => {
              clear()
              navigate('/')
            }}
          >
            I've sent the order
          </button>
        </section>
      ) : (
        <div className="co-grid">
          <section className="co-card">
            {step === 'cart' && (
              <>
                <h1>Your Cart</h1>
                <p className="co-sub">Review your items before you continue</p>
                <ul className="co-items">
                  {items.map((item) => (
                    <li key={item.product.id}>
                      <img src={item.product.image} alt={item.product.name} />
                      <div className="co-item-info">
                        <strong>{item.product.name}</strong>
                        <span className="co-price">
                          {formatINR(item.product.price)}
                        </span>
                        <div className="co-qty-row">
                          <div className="qty-control">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                setQty(item.product.id, item.qty - 1)
                              }
                            >
                              −
                            </button>
                            <span>{item.qty}</span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() =>
                                setQty(item.product.id, item.qty + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            className="link-btn"
                            onClick={() => remove(item.product.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="btn btn-cart btn-block co-cta"
                  onClick={goShipping}
                >
                  Continue to Shipping
                </button>
              </>
            )}

            {step === 'shipping' && (
              <form onSubmit={submitShipping} noValidate>
                <h1>Shipping Address</h1>
                <p className="co-sub">Enter your delivery details</p>
                <div className="co-fields">
                  <Field
                    label="Full Name"
                    required
                    value={addr.name}
                    onChange={set('name')}
                    autoComplete="name"
                  />
                  <Field
                    label="Mobile Number"
                    required
                    value={addr.mobile}
                    onChange={(v) =>
                      set('mobile')(v.replace(/\D/g, '').slice(0, 10))
                    }
                    autoComplete="tel-national"
                    inputMode="numeric"
                  />
                  <Field
                    label="Email Address (optional)"
                    value={addr.email}
                    onChange={set('email')}
                    autoComplete="email"
                    inputMode="email"
                    type="email"
                    className="span-2"
                  />
                  <Field
                    label="Address Line 1"
                    required
                    value={addr.address1}
                    onChange={set('address1')}
                    autoComplete="address-line1"
                    className="span-2"
                  />
                  <Field
                    label="Address Line 2 (optional)"
                    value={addr.address2}
                    onChange={set('address2')}
                    autoComplete="address-line2"
                    className="span-2"
                  />
                  <Field
                    label="City"
                    required
                    value={addr.city}
                    onChange={set('city')}
                    autoComplete="address-level2"
                  />
                  <label className="field field-select">
                    <select
                      value={addr.state}
                      required
                      autoComplete="address-level1"
                      onChange={(e) => set('state')(e.target.value)}
                    >
                      <option value="" disabled />
                      {STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    <span>
                      State<b aria-hidden="true"> *</b>
                    </span>
                  </label>
                  <Field
                    label="PIN Code"
                    required
                    value={addr.pin}
                    onChange={(v) => set('pin')(v.replace(/\D/g, '').slice(0, 6))}
                    autoComplete="postal-code"
                    inputMode="numeric"
                  />
                </div>
                <label className="co-check">
                  <input
                    type="checkbox"
                    checked={saveAddr}
                    onChange={(e) => setSaveAddr(e.target.checked)}
                  />
                  Use this address for future orders
                </label>
                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}
                <button type="submit" className="btn btn-cart btn-block co-cta">
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 'payment' && (
              <>
                <h1>Payment</h1>
                <p className="co-sub">Choose how you’d like to pay</p>

                <div className="pay-options" role="radiogroup" aria-label="Payment method">
                  <label className={payment === 'UPI' ? 'pay-card selected' : 'pay-card'}>
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === 'UPI'}
                      onChange={() => setPayment('UPI')}
                    />
                    <QrIcon />
                    <span>
                      <strong>UPI (scan QR)</strong>
                      <small>Pay with any UPI app</small>
                    </span>
                  </label>
                  <label className={payment === 'COD' ? 'pay-card selected' : 'pay-card'}>
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === 'COD'}
                      onChange={() => setPayment('COD')}
                    />
                    <CashIcon />
                    <span>
                      <strong>Cash on delivery</strong>
                      <small>Pay when it arrives</small>
                    </span>
                  </label>
                </div>

                {payment === 'UPI' && (
                  <div className="upi-box">
                    <p>
                      Pay via UPI, then send the order on WhatsApp so we can
                      confirm.
                    </p>
                    {isUpiConfigured() ? (
                      <>
                        <div className="upi-qr">
                          <QRCodeSVG value={buildUpiUri(subtotal)} size={280} />
                        </div>
                        <a className="btn btn-secondary btn-block" href={buildUpiUri(subtotal)}>
                          Pay {formatINR(subtotal)} with UPI app
                        </a>
                      </>
                    ) : (
                      <img
                        src={shopConfig.upiQrPath}
                        alt="UPI QR code"
                        className="upi-qr upi-qr-img"
                        width={840}
                        height={838}
                      />
                    )}
                  </div>
                )}

                <div className="co-ship-to">
                  <TruckIcon size={22} />
                  <span>
                    <strong>{addr.name}</strong> · {addr.mobile}
                    <br />
                    {[addr.address1, addr.address2, addr.city, addr.state]
                      .filter(Boolean)
                      .join(', ')}{' '}
                    - {addr.pin}
                  </span>
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => setStep('shipping')}
                  >
                    Edit
                  </button>
                </div>

                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="button"
                  className="btn btn-cart btn-block co-cta"
                  onClick={placeOrder}
                  disabled={saving}
                >
                  {saving ? 'Saving order…' : 'Send order on WhatsApp'}
                </button>
              </>
            )}

            <div className="co-foot">
              {step !== 'cart' ? (
                <button
                  type="button"
                  className="link-btn co-back"
                  onClick={() => setStep(step === 'payment' ? 'shipping' : 'cart')}
                >
                  <ArrowLeftIcon /> Back to {step === 'payment' ? 'Shipping' : 'Cart'}
                </button>
              ) : (
                <Link to="/#shop" className="link-btn co-back">
                  <ArrowLeftIcon /> Continue shopping
                </Link>
              )}
              <p className="co-safe">
                <LockIcon /> Secure Checkout · Pay by UPI or cash on delivery
              </p>
            </div>
          </section>

          <aside className="co-card co-summary" aria-label="Order summary">
            <div className="co-summary-head">
              <h2>Order Summary</h2>
              <span>
                {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
              </span>
            </div>
            <ul className="co-sum-items">
              {items.map((item) => (
                <li key={item.product.id}>
                  <img src={item.product.image} alt="" />
                  <div>
                    <strong>{item.product.name}</strong>
                    <span>
                      {formatINR(item.product.price)} × {item.qty}
                    </span>
                  </div>
                  <b>{formatINR(item.product.price * item.qty)}</b>
                </li>
              ))}
            </ul>
            <dl className="co-totals">
              <div>
                <dt>Subtotal</dt>
                <dd>{formatINR(subtotal)}</dd>
              </div>
              <div className="total">
                <dt>Total</dt>
                <dd>{formatINR(subtotal)}</dd>
              </div>
            </dl>
            <p className="co-note">
              <TruckIcon size={20} /> {shopConfig.deliveryNote}
            </p>
          </aside>
        </div>
      )}
    </div>
  )
}
