import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { shopConfig } from '../config'
import { OptimizedImage } from './OptimizedImage'

export function Footer() {
  return (
    <footer className="footer">
      <OptimizedImage
        className="footer-logo"
        src="/logo.png"
        alt={shopConfig.brandName}
        sizes="200px"
        variant="logo"
        width={640}
        height={314}
        loading="lazy"
      />
      <p>
        <strong>{shopConfig.brandName}</strong> — {shopConfig.tagline}
      </p>
      <p className="muted">{shopConfig.deliveryNote}</p>
      <p>
        <Link to="/track">Track your order</Link>
      </p>
      <div style={{ margin: '16px auto', background: '#fff', padding: 8, width: 'fit-content', borderRadius: 8 }}>
        <QRCodeSVG
          value={`${shopConfig.siteUrl}/`}
          size={160}
          level="H"
          marginSize={2}
          imageSettings={{ src: '/favicon.png', height: 28, width: 28, excavate: true }}
        />
      </div>
      <p className="muted">Scan to open {shopConfig.siteUrl.replace('https://', '')}</p>
    </footer>
  )
}
