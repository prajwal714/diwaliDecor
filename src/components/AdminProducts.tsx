import { useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'
import { useProducts, type ProductOverride } from '../context/ProductsContext'
import type { Product } from '../data/products'
import { products as seedProducts } from '../data/products'
import { OptimizedImage } from './OptimizedImage'

function Tile({ product, override }: { product: Product; override?: ProductOverride }) {
  const { refresh } = useProducts()
  const seed = seedProducts.find((p) => p.id === product.id)!
  const [price, setPrice] = useState(override?.price?.toString() ?? '')
  const [mrp, setMrp] = useState(override?.mrp?.toString() ?? '')
  const [badge, setBadge] = useState(override?.badge ?? '')
  const [soldOut, setSoldOut] = useState(override?.sold_out ?? false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [saving, setSaving] = useState(false)

  async function save(e: FormEvent) {
    e.preventDefault()
    if (!supabase) return
    const p = price.trim() ? Number(price) : null
    const m = mrp.trim() ? Number(mrp) : null
    if (p !== null && (!Number.isInteger(p) || p <= 0)) {
      setMsg({ ok: false, text: 'Price must be a whole number above 0.' })
      return
    }
    if (m !== null && (!Number.isInteger(m) || m <= 0)) {
      setMsg({ ok: false, text: 'MRP must be a whole number above 0.' })
      return
    }
    if ((m ?? seed.mrp ?? 0) > 0 && m !== null && m < (p ?? seed.price)) {
      setMsg({ ok: false, text: 'MRP must be at least the price.' })
      return
    }
    setSaving(true)
    setMsg(null)
    const { error } = await supabase.from('product_overrides').upsert({
      product_id: product.id,
      price: p,
      mrp: m,
      badge: badge.trim() || null,
      sold_out: soldOut,
      updated_at: new Date().toISOString(),
    })
    setSaving(false)
    if (error) {
      setMsg({ ok: false, text: error.message })
      return
    }
    await refresh()
    setMsg({ ok: true, text: 'Saved.' })
  }

  return (
    <form className="co-card admin-tile" onSubmit={save}>
      <div className="admin-tile-img">
        {product.image && (
          <OptimizedImage
            src={product.image}
            alt={product.name}
            sizes="200px"
            variant="productThumb"
            width={1200}
            height={799}
            loading="lazy"
          />
        )}
      </div>
      <h3>{product.name}</h3>
      <label className="track-label">
        Price (seed {seed.price})
        <input
          inputMode="numeric"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder={String(seed.price)}
        />
      </label>
      <label className="track-label">
        MRP (seed {seed.mrp ?? 'none'})
        <input
          inputMode="numeric"
          value={mrp}
          onChange={(e) => setMrp(e.target.value)}
          placeholder={seed.mrp ? String(seed.mrp) : ''}
        />
      </label>
      <label className="track-label">
        Badge
        <input
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          placeholder={seed.badge ?? ''}
        />
      </label>
      <label className="admin-check">
        <input
          type="checkbox"
          checked={soldOut}
          onChange={(e) => setSoldOut(e.target.checked)}
        />
        Sold out
      </label>
      <p className="muted">Leave a field blank to use the seed value.</p>
      {msg && (
        <p className={msg.ok ? 'form-ok' : 'form-error'} role="alert">
          {msg.text}
        </p>
      )}
      <button type="submit" className="btn btn-cart btn-block" disabled={saving}>
        {saving ? 'Saving…' : 'Save'}
      </button>
    </form>
  )
}

export function AdminProducts() {
  const { products, overrides } = useProducts()
  return (
    <div className="admin-products">
      {products.map((p) => (
        <Tile
          key={p.id}
          product={p}
          override={overrides.find((o) => o.product_id === p.id)}
        />
      ))}
    </div>
  )
}
