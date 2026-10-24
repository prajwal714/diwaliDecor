import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/whatsapp'
import { UpiQrModal } from './UpiQrModal'
import { QrIcon } from './Icons'

type Props = {
  open: boolean
  onClose: () => void
  onCheckout: () => void
}

export function CartDrawer({ open, onClose, onCheckout }: Props) {
  const { items, subtotal, setQty, remove } = useCart()
  const [qrOpen, setQrOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <div
      className={open ? 'drawer-root open' : 'drawer-root'}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="drawer-backdrop"
        aria-label="Close cart"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        aria-hidden={!open}
      >
        <div className="drawer-head">
          <h2>Cart</h2>
          <button type="button" className="icon-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <p className="muted cart-empty">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-list">
              {items.map((item) => (
                <li key={item.product.id} className="cart-item">
                  <img src={item.product.image} alt="" width={72} height={72} />
                  <div className="cart-item-info">
                    <strong>{item.product.name}</strong>
                    <span className="cart-price">{formatINR(item.product.price)}</span>
                    <div className="qty-row">
                      <button
                        type="button"
                        onClick={() => setQty(item.product.id, item.qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(item.product.id, item.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
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
            <div className="drawer-foot">
              <button
                type="button"
                className="btn btn-cart btn-block"
                onClick={onCheckout}
              >
                Place Order {formatINR(subtotal)}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-block qr-trigger"
                onClick={() => setQrOpen(true)}
              >
                <QrIcon size={20} /> Pay by UPI QR
              </button>
              <p className="secure-note">Pay later by UPI QR or cash on delivery</p>
            </div>
          </>
        )}
      </aside>
      <UpiQrModal open={qrOpen} onClose={() => setQrOpen(false)} amount={subtotal} />
    </div>
  )
}
