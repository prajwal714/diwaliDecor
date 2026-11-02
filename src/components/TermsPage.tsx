import { Link } from 'react-router-dom'
import { shopConfig } from '../config'
import { CHHATH_MIN_ORDER } from '../data/chhath.seed'
import { formatINR } from '../utils/whatsapp'
import { OptimizedImage } from './OptimizedImage'

const TERMS = [
  {
    title: 'Order Booking',
    body: 'Orders for Chhath Puja packages will be accepted until 9th November only.',
  },
  {
    title: 'Minimum Order Value',
    body: `A minimum order of ${formatINR(CHHATH_MIN_ORDER)} is required to place an order for Chhath items.`,
  },
  {
    title: 'Booking Amount',
    body: 'Customers can confirm their orders by paying a booking amount of up to 50% of the total order value. The remaining balance can be paid as per the agreed payment arrangement.',
  },
  {
    title: 'Cancellation Policy',
    body: 'Once an order is confirmed, customers have 24 hours to cancel it in case of any change of plans. Cancellation requests received after 24 hours will not be accepted.',
  },
  {
    title: 'Complimentary Offer',
    body: 'Ganga Jal and Chhath Puja mitti, sourced directly from Patna, Bihar, will be provided complimentary by Devamkart.',
  },
  {
    title: 'Product Quality',
    body: 'Devamkart deals exclusively in A1-quality products to ensure the best experience for our customers.',
  },
  {
    title: 'Product Availability',
    body: 'All products are subject to availability.',
  },
  {
    title: 'Delivery',
    body: 'Delivery timelines will be communicated at the time of order confirmation. Customers must provide accurate delivery addresses and contact details.',
  },
  {
    title: 'Damaged or Missing Items',
    body: 'Any damaged or missing items must be reported to a Devamkart representative immediately at the time of delivery. Claims raised after delivery confirmation may not be considered.',
  },
  {
    title: 'Unforeseen Delays',
    body: 'Any unexpected delays due to transportation, weather or other circumstances will be communicated to customers.',
  },
] as const

export function TermsPage() {
  return (
    <div className="terms-page">
      <article className="co-card terms-card">
        <Link to="/" className="brand track-brand">
          <OptimizedImage
            src="/logo.png"
            alt={shopConfig.brandName}
            sizes="180px"
            variant="logo"
            width={640}
            height={314}
            loading="eager"
          />
        </Link>
        <p className="terms-eyebrow">Devamkart · Chhath Puja Packages</p>
        <h1>Terms &amp; Conditions</h1>
        <p className="co-sub">
          Celebrate Chhath Puja with authenticity and devotion. Please read these terms before
          placing your order.
        </p>

        <ol className="terms-list">
          {TERMS.map((t, i) => (
            <li key={t.title}>
              <strong>
                {i + 1}. {t.title}
              </strong>
              <p>{t.body}</p>
            </li>
          ))}
        </ol>

        <p className="terms-thanks">Thank you for choosing {shopConfig.brandName}!</p>
        <p>
          <Link to="/" className="link-btn">
            ← Back to shop
          </Link>
        </p>
      </article>
    </div>
  )
}
