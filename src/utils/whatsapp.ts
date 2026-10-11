import { shopConfig } from '../config'
import type { CartItem } from '../context/CartContext'

export type PaymentMethod = 'COD' | 'UPI'

export type OrderDetails = {
  name: string
  mobile: string
  area: string
  payment: PaymentMethod
  items: CartItem[]
  subtotal: number
}

export function formatINR(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function buildOrderMessage(order: OrderDetails): string {
  const lines = [
    `New order — ${shopConfig.brandName}`,
    `Name: ${order.name}`,
    `Mobile: ${order.mobile}`,
    `Area: ${order.area}`,
    `Payment: ${order.payment === 'UPI' ? 'UPI' : 'Cash on delivery'}`,
    '',
    'Items:',
    ...order.items.map(
      (i) =>
        `- ${i.product.name} x${i.qty} — ${formatINR(i.product.price * i.qty)}`,
    ),
    '',
    `Total: ${formatINR(order.subtotal)}`,
  ]
  return lines.join('\n')
}

export function openWhatsAppOrder(order: OrderDetails) {
  const text = encodeURIComponent(buildOrderMessage(order))
  const url = `https://wa.me/${shopConfig.whatsappNumber}?text=${text}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function isValidIndianMobile(mobile: string) {
  return /^[6-9]\d{9}$/.test(mobile.trim())
}
