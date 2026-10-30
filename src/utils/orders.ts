import { supabase } from '../lib/supabase'
import type { OrderDetails } from './whatsapp'

export const ORDER_STATUSES = [
  'placed',
  'confirmed',
  'packed',
  'shipped',
  'delivered',
  'cancelled',
] as const

export type OrderStatus = (typeof ORDER_STATUSES)[number]

export const STATUS_LABEL: Record<OrderStatus, string> = {
  placed: 'Order placed',
  confirmed: 'Confirmed',
  packed: 'Packed',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

export type TrackedOrder = {
  public_id: string
  status: OrderStatus
  city: string
  created_at: string
  updated_at: string
  tracking_url: string | null
  tracking_note: string | null
  items: Array<{ name: string; qty: number }>
}

export type StoredOrder = {
  id: string
  public_id: string
  name: string
  mobile: string
  email: string | null
  address1: string
  address2: string | null
  city: string
  state: string
  pin: string
  payment: 'COD' | 'UPI'
  items: Array<{ name: string; qty: number; price: number }>
  subtotal: number
  status: OrderStatus
  tracking_url: string | null
  tracking_note: string | null
  created_at: string
  updated_at: string
}

function requireClient() {
  if (!supabase) {
    throw new Error(
      'Order tracking is not configured yet. Please message us on WhatsApp.',
    )
  }
  return supabase
}

export async function createOrder(order: OrderDetails): Promise<string> {
  const client = requireClient()
  const { data, error } = await client.rpc('create_order', {
    p_name: order.name,
    p_mobile: order.mobile,
    p_email: order.email ?? '',
    p_address1: order.address1,
    p_address2: order.address2 ?? '',
    p_city: order.city,
    p_state: order.state,
    p_pin: order.pin,
    p_payment: order.payment,
    p_items: order.items.map((item) => ({
      name: item.product.name,
      qty: item.qty,
      price: item.product.price,
    })),
    p_subtotal: order.subtotal,
  })
  if (error) throw new Error('Could not save your order. Please try again.')
  if (typeof data !== 'string' || !data) {
    throw new Error('Could not save your order. Please try again.')
  }
  return data
}

export async function trackOrder(
  publicId: string,
  mobile: string,
): Promise<TrackedOrder | null> {
  const client = requireClient()
  const { data, error } = await client.rpc('track_order', {
    p_public_id: publicId,
    p_mobile: mobile,
  })
  if (error) throw new Error('Could not look up that order. Please try again.')
  const row = Array.isArray(data) ? data[0] : null
  return (row as TrackedOrder | undefined) ?? null
}

export async function listOrders(): Promise<StoredOrder[]> {
  const client = requireClient()
  const { data, error } = await client
    .from('orders')
    .select(
      'id, public_id, name, mobile, email, address1, address2, city, state, pin, payment, items, subtotal, status, tracking_url, tracking_note, created_at, updated_at',
    )
    .order('created_at', { ascending: false })
  if (error) throw new Error('Could not load orders.')
  return (data ?? []) as StoredOrder[]
}

export async function updateOrderStatus(
  id: string,
  patch: { status: OrderStatus; tracking_url: string; tracking_note: string },
) {
  const client = requireClient()
  const trackingUrl = patch.tracking_url.trim()
  const note = patch.tracking_note.trim()
  const { error } = await client
    .from('orders')
    .update({
      status: patch.status,
      tracking_url: trackingUrl || null,
      tracking_note: note || null,
    })
    .eq('id', id)
  if (error) throw new Error('Could not update that order.')
}
