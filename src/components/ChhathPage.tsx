import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductsContext'
import {
  CHHATH_MIN_ORDER,
  chhathGroupInfo,
  chhathHeroImages,
  type ChhathGroupInfo,
} from '../data/chhath.seed'
import { shopConfig } from '../config'
import { chatUrl, formatINR } from '../utils/whatsapp'
import {
  BagIcon,
  CashIcon,
  CheckIcon,
  GiftIcon,
  LockIcon,
  ShareIcon,
  SparkIcon,
  TruckIcon,
} from './Icons'

async function shareChhathPackage(pkg: Pick<ChhathGroupInfo, 'slug' | 'title'>) {
  const url = `${shopConfig.siteUrl}/chhath/${pkg.slug}`
  const title = `${pkg.title} — Chhath Puja`
  if (navigator.share) {
    try {
      await navigator.share({ title, text: title, url })
    } catch {
      /* cancelled */
    }
    return false
  }
  await navigator.clipboard?.writeText(url)
  return true
}

function ChhathPackageShareButton({
  pkg,
  className,
}: {
  pkg: Pick<ChhathGroupInfo, 'slug' | 'title'>
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className={className ?? 'pdp-quick-btn'}
      title="Share this package"
      aria-label={`Share ${pkg.title}`}
      onClick={async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const didCopy = await shareChhathPackage(pkg)
        if (didCopy) {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }
      }}
    >
      <ShareIcon size={18} /> <span>{copied ? 'Copied!' : 'Share'}</span>
    </button>
  )
}

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
        srcSet={`${base}-480.webp 480w, ${base}-800.webp 800w, ${base}-1600.webp 1600w`}
        sizes={sizes}
      />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        decoding="async"
      />
    </picture>
  )
}

function ChhathHero() {
  const [active, setActive] = useState(0)
  // Only mount slides once they have been shown, so hidden slides don't download up front.
  const [seen, setSeen] = useState<number[]>([0])
  useEffect(() => {
    const t = window.setInterval(
      () => setActive((i) => (i + 1) % chhathHeroImages.length),
      6500,
    )
    return () => window.clearInterval(t)
  }, [active])
  useEffect(() => {
    setSeen((s) => (s.includes(active) ? s : [...s, active]))
  }, [active])
  return (
    <section className="banner chhath-banner" aria-label="Chhath Puja">
      {chhathHeroImages.map((src, i) => (
        <div key={src} className={i === active ? 'banner-slide active' : 'banner-slide'} aria-hidden={i !== active}>
          {seen.includes(i) && (
            <ChhathImage src={src} alt="" sizes="100vw" className="banner-img" eager={i === 0} />
          )}
          {i === active && (
            <div className="banner-copy">
              <img className="banner-mark" src="/favicon.png" alt="" width={48} height={48} />
              <p className="banner-eyebrow">Happy Chhath Puja</p>
              <h1 className="banner-title">Chhath Puja</h1>
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
                  Explore Chhath Puja Offerings
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
      <div className="section-head">
        <h2>Shop the Chhath collection</h2>
        <p>Puja samagri, fresh fruits and prasad ingredients, made for Chhath Puja homes across India.</p>
        <p className="chhath-hi" lang="hi">छठ पूजा के लिए पूजा सामग्री, फल और प्रसाद की सामग्री</p>
      </div>
      <div className="catalog-toolbar">
        <p className="product-count">{chhathGroupInfo.length} packages · choose your own quantities</p>
        <p className="product-count">Minimum order {formatINR(CHHATH_MIN_ORDER)}</p>
      </div>
      <div className="chhath-tiles">
        {chhathGroupInfo.map((g) => {
          const count = products.filter((p) => p.group === g.group).length
          return (
            <Link key={g.slug} to={`/chhath/${g.slug}`} className={`chhath-tile t-${g.slug}`}>
              <ChhathImage src={g.image} alt="" sizes="(max-width: 800px) 100vw, 33vw" className="chhath-tile-img" />
              <div className="chhath-tile-text">
                <span className="chhath-badge">{g.badge}</span>
                <h2>{g.title}</h2>
                <span className="chhath-tile-hi" lang="hi">{g.hindi}</span>
                <p>{g.tagline}</p>
                <p>{count} items to choose from</p>
                <span className="chhath-tile-cta">Choose items →</span>              </div>
            </Link>
          )
        })}
      </div>
      <ul className="chhath-values">
        <li><CheckIcon /> Fresh &amp; Authentic</li>
        <li><TruckIcon size={20} /> Pan-India Delivery</li>
        <li><CashIcon size={20} /> UPI / Cash on Delivery</li>
      </ul>
      </div>
    </>
  )
}

type Props = { onAdded: () => void; onBuyNow: () => void }

function Thumb({ name, src }: { name: string; src?: string }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <span className="chhath-thumb chhath-thumb-ph" aria-hidden="true">
        {name.charAt(0)}
      </span>
    )
  }
  return (
    <img
      className="chhath-thumb"
      src={src}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

function pluralise(n: number, word: string) {
  return `${n} ${word}${n === 1 ? '' : 's'}`
}

/** "3 items" when each product has qty 1, otherwise "1 item · 3 units". */
function selectionLabel(products: number, units: number) {
  if (products === units) return pluralise(units, 'item')
  return `${pluralise(products, 'item')} · ${pluralise(units, 'unit')}`
}

export function ChhathCategoryPage({ onAdded, onBuyNow }: Props) {
  const { slug } = useParams()
  const info = chhathGroupInfo.find((g) => g.slug === slug)
  const { products } = useProducts()
  const { items, add } = useCart()
  const [qty, setQty] = useState<Record<string, number>>({})
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [sheetOpen, setSheetOpen] = useState(false)

  const list = useMemo(
    () => products.filter((p) => p.category === 'Chhath' && p.group === info?.group),
    [products, info],
  )
  if (!info) return <Navigate to="/" replace />

  const selected = list.filter((p) => (qty[p.id] ?? 0) > 0)
  const selectedCount = selected.reduce((n, p) => n + qty[p.id], 0)
  const selectionTotal = selected.reduce((n, p) => n + p.price * qty[p.id], 0)
  const inCartTotal = items
    .filter((i) => i.product.category === 'Chhath')
    .reduce((n, i) => n + i.product.price * i.qty, 0)
  const total = selectionTotal + inCartTotal
  const remaining = Math.max(0, CHHATH_MIN_ORDER - total)
  const pct = Math.min(100, Math.round((total / CHHATH_MIN_ORDER) * 100))
  const canCheckout = total >= CHHATH_MIN_ORDER && (selected.length > 0 || inCartTotal > 0)

  function change(id: string, delta: number) {
    setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) + delta) }))
  }
  function addAll() {
    selected.forEach((p) => add(p, qty[p.id]))
    setQty({})
  }

  return (
    <div className="chhath-builder-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span aria-current="page">{info.title}</span>
      </nav>

      <div className="chhath-builder">
        <aside className="chhath-art" aria-label="Package">
          <ChhathImage src={info.image} alt={info.title} sizes="(max-width: 900px) 100vw, 340px" eager />
          <div className="chhath-art-text">
            <span className="chhath-badge">{info.badge}</span>
            <h1>{info.title}</h1>
            <p className="chhath-hi" lang="hi">{info.hindi}</p>
            <p className="chhath-art-tag">{info.tagline}</p>
          </div>
        </aside>

        <section className="chhath-select" aria-label="Choose items">
          <div className="chhath-select-head">
            <h2>Choose your items</h2>
            <div className="chhath-view" role="group" aria-label="View">
              <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')}>List</button>
              <button type="button" aria-pressed={view === 'grid'} onClick={() => setView('grid')}>Grid</button>
            </div>
          </div>
          <ul className={view === 'grid' ? 'chhath-items grid' : 'chhath-items'}>
            {list.map((p) => {
              const q = qty[p.id] ?? 0
              return (
                <li key={p.id} className={q > 0 ? 'chhath-item on' : 'chhath-item'}>
                  <Thumb name={p.name} src={p.images[0]} />
                  <div className="chhath-item-info">
                    <strong>{p.name}</strong>
                    <span className="chhath-hi" lang="hi">{p.hindiName}</span>
                    <span className="chhath-item-meta">{p.unit} · {formatINR(p.price)}</span>
                  </div>
                  {p.soldOut ? (
                    <span className="chhath-sold">Sold out</span>
                  ) : (
                    <div className="chhath-stepper-wrap">
                      {q > 0 && <span className="chhath-added"><CheckIcon size={14} /> Added</span>}
                      <div className="chhath-stepper">
                        <button type="button" aria-label={`Decrease ${p.name}`} disabled={q === 0} onClick={() => change(p.id, -1)}>−</button>
                        <output aria-live="polite">{q}</output>
                        <button type="button" aria-label={`Increase ${p.name}`} onClick={() => change(p.id, 1)}>+</button>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <div
          className={sheetOpen ? 'chhath-sheet-backdrop open' : 'chhath-sheet-backdrop'}
          onClick={() => setSheetOpen(false)}
          aria-hidden="true"
        />
        <aside
          className={sheetOpen ? 'chhath-summary open' : 'chhath-summary'}
          aria-label="Order summary"
        >
          <div className="chhath-summary-head">
            <h2>Your basket</h2>
            <button type="button" className="chhath-sheet-close" onClick={() => setSheetOpen(false)} aria-label="Close basket">×</button>
          </div>
          <div className="chhath-summary-body">
            <p className="chhath-total">{formatINR(total)}</p>
            <p className="chhath-count">
              {selectedCount === 0 ? 'Nothing selected yet' : `${selectionLabel(selected.length, selectedCount)} selected`}
              {inCartTotal > 0 && ` · ${formatINR(inCartTotal)} already in cart`}
            </p>
            <div
              className="chhath-progress"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={CHHATH_MIN_ORDER}
              aria-valuenow={Math.min(total, CHHATH_MIN_ORDER)}
              aria-label="Minimum order progress"
            >
              <div style={{ width: `${pct}%` }} />
            </div>
            <p className={remaining > 0 ? 'chhath-min' : 'chhath-min ok'}>
              {remaining > 0
                ? `Add ${formatINR(remaining)} more to reach the ${formatINR(CHHATH_MIN_ORDER)} minimum.`
                : 'Minimum order reached. Checkout unlocked.'}
            </p>
            {selected.length > 0 && (
              <ul className="chhath-sel-list">
                {selected.map((p) => (
                  <li key={p.id}>
                    <span>{p.name} × {qty[p.id]}</span>
                    <b>{formatINR(p.price * qty[p.id])}</b>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="chhath-summary-cta">
            <button
              type="button"
              className="chhath-btn primary"
              disabled={selected.length === 0}
              onClick={() => { addAll(); setSheetOpen(false); onAdded() }}
            >
              <BagIcon />{' '}
              {selected.length === 0
                ? 'Add items to cart'
                : `Add ${selectionLabel(selected.length, selectedCount)} · ${formatINR(selectionTotal)} to cart`}
            </button>
            <button
              type="button"
              className="chhath-btn outline"
              disabled={!canCheckout}
              onClick={() => { addAll(); onBuyNow() }}
            >
              {!canCheckout && <LockIcon size={16} />} Checkout
            </button>
            <div className="pdp-quick">
              <ChhathPackageShareButton pkg={info} className="pdp-quick-btn" />
            </div>
          </div>

          <div className="chhath-more">
            <details>
              <summary>Highlights</summary>
              <ul>
                {info.highlights.map((f) => (
                  <li key={f}><SparkIcon size={16} /><span>{f}</span></li>
                ))}
              </ul>
            </details>
            <details>
              <summary>Package details</summary>
              <p>{info.details}</p>
            </details>
            <details>
              <summary>Delivery &amp; payment</summary>
              <p>
                Delivery across India. Pay by UPI QR at checkout or cash on delivery. Orders are
                confirmed on{' '}
                <a href={chatUrl()} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
                Minimum order for Chhath items is {formatINR(CHHATH_MIN_ORDER)}.
              </p>
            </details>
            <ul className="chhath-trust">
              <li><CheckIcon size={16} /> Quality products, authentic and pure</li>
              <li><GiftIcon size={16} /> Better prices than online</li>
              <li><TruckIcon size={16} /> Pan-India delivery</li>
            </ul>
            <div className="chhath-others">
              {chhathGroupInfo.filter((g) => g.slug !== info.slug).map((g) => (
                <Link key={g.slug} to={`/chhath/${g.slug}`}>{g.title}</Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="chhath-bottombar">
        <div>
          <strong>{formatINR(total)}</strong>
          <span>{selectedCount === 0 ? 'Nothing selected' : selectionLabel(selected.length, selectedCount)}</span>
        </div>
        <button type="button" className="chhath-btn primary" onClick={() => setSheetOpen(true)}>
          View Basket
        </button>
      </div>
    </div>
  )
}
