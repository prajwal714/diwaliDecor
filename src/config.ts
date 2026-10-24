export const shopConfig = {
  brandName: 'Devamkart',
  tagline: 'Handcrafted festive torans for homes across India',
  /** WhatsApp number with country code, digits only */
  whatsappNumber: '917838363629',
  /** WhatsApp Business short link (no prefilled text support) */
  whatsappBusinessLink: 'https://wa.me/message/C6WRCI6GUZ56M1',
  /** UPI ID (VPA). Set to 'TODO' to fall back to the static QR image. */
  upiId: '7087777812@upi' as string,
  /** Payee name shown in UPI apps */
  upiName: 'Devamkart',
  /** Static QR image in /public, used as fallback */
  upiQrPath: '/upi-qr.jpg',
  deliveryNote: 'Delivery across India · Confirm on WhatsApp',
} as const
