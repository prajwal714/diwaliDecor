import { useEffect, useState, type FormEvent } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { AdminProducts } from './AdminProducts'
import type { Session } from '@supabase/supabase-js'
import { shopConfig } from '../config'
import { supabase } from '../lib/supabase'
import { OptimizedImage } from './OptimizedImage'
import {
  listOrders,
  ORDER_STATUSES,
  STATUS_LABEL,
  updateOrderStatus,
  type OrderStatus,
  type StoredOrder,
} from '../utils/orders'
import { formatINR } from '../utils/whatsapp'

export function AdminPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [ready, setReady] = useState(!supabase)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [signingIn, setSigningIn] = useState(false)
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setReady(true)
    })
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  async function signIn(e: FormEvent) {
    e.preventDefault()
    if (!supabase) return
    setAuthError('')
    setSigningIn(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    setSigningIn(false)
    if (error) setAuthError('Those details did not match. Try again.')
  }

  return (
    <div className="checkout-page admin-page">
      <header className="co-header">
        <Link to="/" className="brand">
          <OptimizedImage
            src="/logo.png"
            alt={shopConfig.brandName}
            sizes="180px"
            variant="logo"
            width={640}
            height={314}
          />
        </Link>
        <h1 className="admin-title">Admin</h1>
        {session && supabase && (
          <button
            type="button"
            className="link-btn"
            onClick={() => void supabase?.auth.signOut()}
          >
            Sign out
          </button>
        )}
      </header>

      {!supabase && (
        <section className="co-card">
          <p>Add the Supabase URL and anon key before using admin.</p>
        </section>
      )}

      {supabase && ready && !session && (
        <section className="co-card track-card">
          <h2>Admin sign in</h2>
          <form className="track-form" onSubmit={signIn}>
            <label className="track-label">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </label>
            <label className="track-label">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </label>
            {authError && (
              <p className="form-error" role="alert">
                {authError}
              </p>
            )}
            <button type="submit" className="btn btn-cart btn-block" disabled={signingIn}>
              {signingIn ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </section>
      )}

      {session && (
        <>
          <nav className="admin-tabs">
            <NavLink to="/admin" end>Orders</NavLink>
            <NavLink to="/admin/products">Products</NavLink>
          </nav>
          <Routes>
            <Route index element={<AdminOrders session={session} />} />
            <Route path="products" element={<AdminProducts />} />
          </Routes>
        </>
      )}
    </div>
  )
}

function AdminOrders({ session }: { session: Session }) {
  const [orders, setOrders] = useState<StoredOrder[]>([])
  const [loadError, setLoadError] = useState('')
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')
  const [selected, setSelected] = useState<string | null>(null)
  const [status, setStatus] = useState<OrderStatus>('placed')
  const [trackingUrl, setTrackingUrl] = useState('')
  const [note, setNote] = useState('')
  const [saveError, setSaveError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!session) return
    let cancelled = false
    listOrders()
      .then((rows) => {
        if (!cancelled) setOrders(rows)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : 'Could not load orders.')
        }
      })
    return () => {
      cancelled = true
    }
  }, [session])

  function openOrder(order: StoredOrder) {
    setSelected(order.id)
    setStatus(order.status)
    setTrackingUrl(order.tracking_url ?? '')
    setNote(order.tracking_note ?? '')
    setSaveError('')
  }

  async function save(e: FormEvent) {
    e.preventDefault()
    if (!selected) return
    const url = trackingUrl.trim()
    if (url && !/^https?:\/\//i.test(url)) {
      setSaveError('Tracking link must start with http:// or https://')
      return
    }
    setSaving(true)
    setSaveError('')
    try {
      await updateOrderStatus(selected, {
        status,
        tracking_url: url,
        tracking_note: note,
      })
      setOrders((rows) =>
        rows.map((row) =>
          row.id === selected
            ? {
                ...row,
                status,
                tracking_url: url || null,
                tracking_note: note.trim() || null,
                updated_at: new Date().toISOString(),
              }
            : row,
        ),
      )
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Could not update that order.')
    } finally {
      setSaving(false)
    }
  }

  const visible = orders.filter((order) => filter === 'all' || order.status === filter)
  const active = orders.find((order) => order.id === selected) ?? null

  return (
      <div className="admin-layout">
          <section className="co-card">
            <label className="track-label">
              Status
              <select value={filter} onChange={(e) => setFilter(e.target.value as OrderStatus | 'all')}>
                <option value="all">All</option>
                {ORDER_STATUSES.map((value) => (
                  <option key={value} value={value}>
                    {STATUS_LABEL[value]}
                  </option>
                ))}
              </select>
            </label>
            {loadError && (
              <p className="form-error" role="alert">
                {loadError}
              </p>
            )}
            {visible.length === 0 && !loadError && <p className="muted">No orders yet.</p>}
            <ul className="admin-list">
              {visible.map((order) => (
                <li key={order.id}>
                  <button
                    type="button"
                    className={order.id === selected ? 'admin-row current' : 'admin-row'}
                    onClick={() => openOrder(order)}
                  >
                    <strong>{order.public_id}</strong>
                    <span>{order.name}</span>
                    <span>{STATUS_LABEL[order.status]}</span>
                    <span>{formatINR(order.subtotal)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {active && (
            <section className="co-card">
              <h2>{active.public_id}</h2>
              <p>
                {active.name} · {active.mobile}
                {active.email ? ` · ${active.email}` : ''}
              </p>
              <p>
                {[active.address1, active.address2, active.city, active.state]
                  .filter(Boolean)
                  .join(', ')}{' '}
                - {active.pin}
              </p>
              <p>
                {active.payment === 'UPI' ? 'UPI' : 'Cash on delivery'} · {formatINR(active.subtotal)}
              </p>
              <ul className="track-items">
                {active.items.map((item) => (
                  <li key={`${item.name}-${item.qty}`}>
                    {item.name} × {item.qty} — {formatINR(item.price * item.qty)}
                  </li>
                ))}
              </ul>
              <form className="track-form" onSubmit={save}>
                <label className="track-label">
                  Status
                  <select value={status} onChange={(e) => setStatus(e.target.value as OrderStatus)}>
                    {ORDER_STATUSES.map((value) => (
                      <option key={value} value={value}>
                        {STATUS_LABEL[value]}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="track-label">
                  Tracking link
                  <input
                    value={trackingUrl}
                    onChange={(e) => setTrackingUrl(e.target.value)}
                    placeholder="https://"
                    inputMode="url"
                  />
                </label>
                <label className="track-label">
                  Note for the customer
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} />
                </label>
                {saveError && (
                  <p className="form-error" role="alert">
                    {saveError}
                  </p>
                )}
                <button type="submit" className="btn btn-cart btn-block" disabled={saving}>
                  {saving ? 'Saving…' : 'Save update'}
                </button>
              </form>
            </section>
          )}
        </div>
  )
}
