# Aarambh Decor

Static Diwali decor storefront for Bangalore. Browse items, add to cart, checkout with COD or UPI QR, then send the order via WhatsApp.

## Setup

```bash
npm install
npm run dev
```

## Configure before go-live

Edit [`src/config.ts`](src/config.ts):

- `whatsappNumber` — your number with country code, digits only (e.g. `9198XXXXXXXX`)
- `upiId` — your UPI ID
- Replace [`public/upi-qr.svg`](public/upi-qr.svg) with your real UPI QR image (PNG/JPG is fine; update `upiQrPath`)

Edit products in [`src/data/products.ts`](src/data/products.ts).

## Scripts

- `npm run dev` — local server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build
