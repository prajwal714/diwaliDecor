export const shopConfig = {
  brandName: 'Devamkart',
  tagline: 'Festive wall & door decor for Bangalore homes',
  /** WhatsApp number with country code, digits only */
  whatsappNumber: '917838363629',
  /** WhatsApp Business short link (no prefilled text support) */
  whatsappBusinessLink: 'https://wa.me/message/C6WRCI6GUZ56M1',
  /** UPI ID (VPA). TODO: replace with the real one to enable the dynamic QR. */
  upiId: 'TODO' as string,
  /** Payee name shown in UPI apps */
  upiName: 'Devamkart',
  /** Static QR image in /public, used as fallback */
  upiQrPath: '/upi-qr.svg',
  deliveryNote: 'Delivery across Bangalore · Confirm on WhatsApp',
} as const
