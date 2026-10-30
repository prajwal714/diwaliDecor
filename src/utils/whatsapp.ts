import { shopConfig } from '../config'
import type { CartItem } from '../context/CartContext'

export type PaymentMethod = 'COD' | 'UPI'

export type OrderDetails = {
  name: string
  mobile: string
  email?: string
  address1: string
  address2?: string
  city: string
  state: string
  pin: string
  payment: PaymentMethod
  items: CartItem[]
  subtotal: number
  orderId?: string
}

export function formatINR(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function buildOrderMessage(order: OrderDetails): string {
  const lines = [
    `New order — ${shopConfig.brandName}`,
    ...(order.orderId ? [`Order ID: ${order.orderId}`] : []),
    `Name: ${order.name}`,
    `Mobile: ${order.mobile}`,
    ...(order.email ? [`Email: ${order.email}`] : []),
    `Address: ${[order.address1, order.address2].filter(Boolean).join(', ')}`,
    `City: ${order.city}, ${order.state} - ${order.pin}`,
    `Payment: ${order.payment === 'UPI' ? 'UPI' : 'Cash on delivery'}`,
    '',
    'Items:',
    ...order.items.map(
      (i) =>
        `- ${i.product.name} x${i.qty} — ${formatINR(i.product.price * i.qty)}`,
    ),
    '',
    `Total: ${formatINR(order.subtotal)}`,
    ...(order.payment === 'UPI'
      ? ['', 'I have paid via UPI. Sending the payment screenshot / transaction ID next.']
      : []),
  ]
  return lines.join('\n')
}

export function orderUrl(text: string) {
  return `https://wa.me/${shopConfig.whatsappNumber}?text=${encodeURIComponent(text)}`
}

export function chatUrl() {
  return shopConfig.whatsappBusinessLink
}

export function openWhatsAppOrder(order: OrderDetails) {
  window.open(orderUrl(buildOrderMessage(order)), '_blank', 'noopener,noreferrer')
}

export function isUpiConfigured() {
  return shopConfig.upiId !== 'TODO' && shopConfig.upiId.includes('@')
}

export function buildUpiUri(amount: number) {
  const params = new URLSearchParams({
    pa: shopConfig.upiId,
    pn: shopConfig.upiName,
    am: amount.toFixed(2),
    cu: 'INR',
    tn: `${shopConfig.brandName} order`,
  })
  return `upi://pay?${params.toString()}`
}

export function isValidPin(pin: string) {
  return /^[1-9]\d{5}$/.test(pin.trim())
}

export function isValidIndianMobile(mobile: string) {
  return /^[6-9]\d{9}$/.test(mobile.trim())
}
