import { shopConfig } from '../config'

export function Footer() {
  return (
    <footer className="footer">
      <p>
        <strong>{shopConfig.brandName}</strong> — {shopConfig.tagline}
      </p>
      <p className="muted">{shopConfig.deliveryNote}</p>
    </footer>
  )
}
