import { shopConfig } from '../config'

type Props = {
  onShop: () => void
}

export function Hero({ onShop }: Props) {
  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <p className="hero-brand">{shopConfig.brandName}</p>
        <h1>Decor that welcomes Diwali home</h1>
        <p className="hero-sub">
          Torans, wall hangings &amp; door pieces for Bangalore families — order on
          WhatsApp, pay by UPI or cash on delivery.
        </p>
        <button type="button" className="btn btn-primary" onClick={onShop}>
          Shop decor
        </button>
      </div>
    </section>
  )
}
