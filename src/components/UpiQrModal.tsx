import { useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { shopConfig } from '../config'
import { buildUpiUri, chatUrl, formatINR, isUpiConfigured } from '../utils/whatsapp'
import { QrIcon } from './Icons'

type Props = {
  open: boolean
  onClose: () => void
  /** When set and a UPI ID is configured, the QR carries this amount */
  amount?: number
}

export function UpiQrModal({ open, onClose, amount }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  const dynamic = isUpiConfigured() && amount && amount > 0

  return (
    <div
      className="qr-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Pay by UPI"
      onClick={onClose}
    >
      <div className="qr-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="icon-close qr-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2>
          <QrIcon size={26} /> Pay by UPI
        </h2>
        <p className="muted">
          Scan with any UPI app, then send us the payment screenshot on
          WhatsApp so we can confirm your order.
        </p>
        {dynamic ? (
          <div className="upi-qr">
            <QRCodeSVG value={buildUpiUri(amount)} size={280} />
          </div>
        ) : (
          <img
            src={shopConfig.upiQrPath}
            alt="UPI QR code"
            className="upi-qr upi-qr-img"
            width={840}
            height={838}
          />
        )}
        {dynamic && <p className="upi-id">Amount: <strong>{formatINR(amount)}</strong></p>}
        <a
          className="btn btn-cart btn-block"
          href={chatUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          Send payment screenshot on WhatsApp
        </a>
      </div>
    </div>
  )
}
