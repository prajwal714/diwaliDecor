import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductsContext'
import {
  CHHATH_MIN_ORDER,
  chhathGroupInfo,
  chhathHeroImages,
} from '../data/chhath.seed'
import { formatINR, chatUrl } from '../utils/whatsapp'
import { BagIcon, CashIcon, CheckIcon, GiftIcon, SparkIcon, TruckIcon } from './Icons'

function ChhathImage({
  src,
  alt,
  sizes,
  className,
  eager,
}: {
  src: string
  alt: string
  sizes: string
  className?: string
  eager?: boolean
}) {
  const base = src.replace(/\.[^.]+$/, '')
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w`}
        sizes={sizes}
      />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  )
}

function ChhathHero() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = window.setInterval(
      () => setActive((i) => (i + 1) % chhathHeroImages.length),
      6500,
    )
    return () => window.clearInterval(t)
  }, [active])
  return (
    <section className="banner chhath-banner" aria-label="Chhath Pooja">
      {chhathHeroImages.map((src, i) => (
        <div key={src} className={i === active ? 'banner-slide active' : 'banner-slide'} aria-hidden={i !== active}>
          <ChhathImage src={src} alt="" sizes="100vw" className="banner-img" eager={i === 0} />
          {i === active && (
            <div className="banner-copy">
              <img className="banner-mark" src="/favicon.png" alt="" width={48} height={48} />
              <p className="banner-eyebrow">Happy Chhath Pooja</p>
              <h1 className="banner-title">Chath Pooja</h1>
              <p className="banner-text">
                Puja samagri, fresh fruits and prasad ingredients, all in one place.
              </p>
              <div className="banner-actions">
                <button
                  type="button"
                  className="banner-btn primary"
                  onClick={() =>
                    document.getElementById('chhath-shop')?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Explore Chath Pooja Offerings
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="banner-dots" role="tablist" aria-label="Choose banner">
        {chhathHeroImages.map((src, i) => (
          <button
            key={src}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Show banner ${i + 1}`}
            className={i === active ? 'dot active' : 'dot'}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  )
}

export function ChhathHome() {
  const { products } = useProducts()
  return (
    <>
      <ChhathHero />
      <div className="chhath-home" id="chhath-shop">
      <div className="chhath-tiles">
        {chhathGroupInfo.map((g) => {
          const count = products.filter((p) => p.group === g.group).length
          return (
            <Link key={g.slug} to={`/chhath/${g.slug}`} className={`chhath-tile t-${g.slug}`}>
              <ChhathImage src={g.image} alt="" sizes="(max-width: 800px) 100vw, 33vw" className="chhath-tile-img" />
              <div className="chhath-tile-text">
                <h2>{g.title}</h2>
                <span className="chhath-tile-hi">{g.hindi}</span>
                <p>{g.tagline}</p>
                <p>{count} items to choose from</p>
                <span className="chhath-tile-cta">Choose items →</span>
              </div>
            </Link>
          )
        })}
      </div>
      <p className="chhath-note">Authentic · Pure · Convenient — Better prices than online</p>
      </div>
    </>
  )
}

type Props = { onAdded: () => void; onBuyNow: () => void }

export function ChhathCategoryPage({ onAdded, onBuyNow }: Props) {
  const { slug } = useParams()
  const info = chhathGroupInfo.find((g) => g.slug === slug)
  const { products } = useProducts()
  const { items, add } = useCart()
  const [qty, setQty] = useState<Record<string, number>>({})

  const list = useMemo(
    () => products.filter((p) => p.category === 'Chhath' && p.group === info?.group),
    [products, info],
  )
  if (!info) return <Navigate to="/chhath" replace />

  const selected = list.filter((p) => (qty[p.id] ?? 0) > 0)
  const selectionTotal = selected.reduce((n, p) => n + p.price * qty[p.id], 0)
  const inCartTotal = items
    .filter((i) => i.product.category === 'Chhath')
    .reduce((n, i) => n + i.product.price * i.qty, 0)
  const total = selectionTotal + inCartTotal
  const remaining = Math.max(0, CHHATH_MIN_ORDER - total)
  const pct = Math.min(100, Math.round((total / CHHATH_MIN_ORDER) * 100))

  function change(id: string, delta: number) {
    setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) + delta) }))
  }
  function addAll() {
    selected.forEach((p) => add(p, qty[p.id]))
    setQty({})
  }

  return (
    <div className="product-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/chhath">Chhath Puja</Link>
        <span>/</span>
        <span aria-current="page">{info.title}</span>
      </nav>

      <section className="pdp">
        <div className="chhath-cat">
          <div className="chhath-cat-art">
            <ChhathImage src={info.image} alt={info.title} sizes="(max-width: 900px) 100vw, 30vw" className="chhath-cat-banner" eager />
          </div>
          <div className="chhath-items">
          {list.map((p) => {
            const q = qty[p.id] ?? 0
            return (
              <div key={p.id} className={q > 0 ? 'chhath-item on' : 'chhath-item'}>
                <div className="chhath-item-info">
                  <strong>{p.name}</strong>
                  <span className="chhath-item-hi">{p.hindiName}</span>
                  <span className="chhath-item-meta">{p.unit} · {formatINR(p.price)}</span>
                </div>
                {p.soldOut ? (
                  <span className="chhath-sold">Sold out</span>
                ) : (
                  <div className="chhath-stepper">
                    <button type="button" aria-label={`Decrease ${p.name}`} disabled={q === 0} onClick={() => change(p.id, -1)}>−</button>
                    <span>{q}</span>
                    <button type="button" aria-label={`Increase ${p.name}`} onClick={() => change(p.id, 1)}>+</button>
                  </div>
                )}
              </div>
            )
          })}
          </div>
        </div>

        <div className="pdp-info">
          <h1>{info.title}</h1>
          <p className="chhath-hindi">{info.hindi}</p>
          <p className="pdp-size-note">{info.tagline}</p>

          <div className="chhath-minbox">
            <strong>{formatINR(total)}</strong>
            <span>
              {remaining > 0
                ? `Add ${formatINR(remaining)} more to reach the ${formatINR(CHHATH_MIN_ORDER)} minimum`
                : 'Minimum order reached'}
            </span>
            <div className="chhath-progress"><div style={{ width: `${pct}%` }} /></div>
            <span>{selected.length} item{selected.length === 1 ? '' : 's'} selected</span>
          </div>

          <button
            type="button"
            className="btn btn-cart btn-swipe pdp-add"
            disabled={selected.length === 0}
            onClick={() => { addAll(); onAdded() }}
          >
            <span className="btn-swipe-label"><BagIcon /> Add selection to cart</span>
          </button>
          <button
            type="button"
            className="btn pdp-buy-now"
            disabled={(selected.length === 0 && inCartTotal === 0) || total < CHHATH_MIN_ORDER}
            onClick={() => { addAll(); onBuyNow() }}
          >
            Buy it now
          </button>
          {total < CHHATH_MIN_ORDER && (
            <p className="chhath-buy-hint">
              Buy it now unlocks at {formatINR(CHHATH_MIN_ORDER)}
            </p>
          )}

          <div className="pdp-love">
            <span className="pdp-love-tag">Highlights</span>
            <ul>
              {info.highlights.map((f) => (
                <li key={f}><SparkIcon /><span>{f}</span></li>
              ))}
            </ul>
          </div>

          <div className="pdp-perks">
            <div><TruckIcon /><strong>Pan-India delivery</strong><span>Doorstep</span></div>
            <div><CashIcon /><strong>UPI or COD</strong><span>Pay your way</span></div>
            <div><GiftIcon /><strong>Pure and fresh</strong><span>Authentic</span></div>
          </div>

          <ul className="pdp-trust">
            <li><CheckIcon /> Quality products, authentic and pure</li>
            <li><CheckIcon /> Better prices than online</li>
            <li><CheckIcon /> Convenient and reliable service</li>
          </ul>

          <details className="pdp-accordion" open>
            <summary>Package details</summary>
            <p>{info.details}</p>
          </details>
          <details className="pdp-accordion">
            <summary>Delivery &amp; payment</summary>
            <p>
              Delivery across India. Pay by UPI QR at checkout or cash on delivery. Orders are
              confirmed on{' '}
              <a href={chatUrl()} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
              Minimum order for Chhath items is {formatINR(CHHATH_MIN_ORDER)}.
            </p>
          </details>

          <div className="chhath-others">
            {chhathGroupInfo.filter((g) => g.slug !== info.slug).map((g) => (
              <Link key={g.slug} to={`/chhath/${g.slug}`}>{g.title}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
