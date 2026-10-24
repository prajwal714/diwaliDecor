# Devamkart — agent index

Static React storefront (Diwali torans). **No backend, DB, or auth.** Orders via WhatsApp; UPI/COD at checkout. Canonical URL: `https://www.devamkart.com`.

## Stack

| Layer | Choice |
|-------|--------|
| UI | React 19, React Router 7 |
| Build | Vite 8, TypeScript |
| Host | Vercel (`vercel.json` SPA rewrite) |
| Analytics | `@vercel/analytics/react` in `App.tsx` |
| Fonts | `@fontsource/dm-sans`, `@fontsource/playfair-display` in `main.tsx` |
| Lint | oxlint |
| Node | ≥20 via `scripts/with-node.sh` |

## Routes (`App.tsx`)

| Path | Component | Notes |
|------|-----------|--------|
| `/` | `HomePage` → `Hero`, `ProductGrid` | `#shop` hash scroll |
| `/product/:id` | `ProductPage` | `id` = seed id e.g. `toran-10001` |
| `/checkout` | `CheckoutPage` | Hides header/footer/WhatsApp float |

## Directory map

```
src/
  config.ts              Shop constants (WhatsApp, UPI, siteUrl)
  main.tsx               Entry + font imports
  index.css              Global + all component styles (single file)
  App.tsx                Router, cart shell, analytics
  context/CartContext.tsx  Cart state + localStorage `devamkart-cart`
  data/
    products.seed.ts     Product copy, prices, reviews (edit here)
    products.ts          Maps seeds → Product[] + virtual images
  components/            UI (see table below)
  utils/
    whatsapp.ts          Order message, UPI URI, validation, wa.me links
    imageVariants.ts     WebP srcset paths for OptimizedImage
public/
  banner-{1,2}.jpg       Hero sources (+ generated *-800/1600.webp)
  products/<imageKey>/   Per-SKU images; *-close.jpg = card/PDP main
  logo.png, favicon.png, upi-qr.jpg
scripts/
  optimize-images.mjs    sharp WebP variants (runs in `npm run build`)
  with-node.sh           Ensures Node 20+ for npm scripts
vite.config.ts           productImages + productPages build plugins
```

## Components (what to open)

| File | Role |
|------|------|
| `Hero.tsx` | Banner carousel; active slide only; `OptimizedImage` |
| `ProductGrid.tsx` / `ProductCard.tsx` | Catalog, filters, lazy WebP thumbs |
| `ProductPage.tsx` | PDP gallery, related, share, add/buy |
| `CartDrawer.tsx` | Side cart |
| `CheckoutPage.tsx` | 3-step checkout; address in `devamkart-address` localStorage |
| `Header.tsx` / `Footer.tsx` | Chrome, logo, QR in footer |
| `WhatsAppFloat.tsx` | Floating chat |
| `OptimizedImage.tsx` | `<picture>` WebP + fallback |
| `Lightbox.tsx` / `UpiQrModal.tsx` | Zoom, UPI modal |
| `Icons.tsx` | SVG icons |

## Product & image data

1. **Add/edit product:** `src/data/products.seed.ts` — set `id`, `imageKey` (folder name), pricing, copy.
2. **Images:** Drop files in `public/products/<imageKey>/`. Naming:
   - `<imageKey>-close.jpg` — primary (grid + first PDP image)
   - `<imageKey>.jpg`, `<imageKey>-door.jpg`, etc. — gallery order
3. **Scanning:** Vite plugin `productImages()` exposes `virtual:product-images`; `products.ts` attaches `image` + `images[]`. Ignores `*-400.webp`, `*-800.webp`, `*-original`.
4. **Build:** `productPages()` writes `dist/product/<id>/index.html` with per-product SEO from `shopConfig.siteUrl`.

## Checkout / orders (no server)

- Cart: `localStorage` only.
- Submit: `openWhatsAppOrder()` builds text → `wa.me/{whatsappNumber}`.
- UPI: `buildUpiUri()` + QR from `config.upiId` or static `upiQrPath`.
- Validate mobile/PIN: `isValidIndianMobile`, `isValidPin` in `whatsapp.ts`.

## Config (`src/config.ts`)

Public in client bundle: `whatsappNumber`, `upiId`, `siteUrl`, `upiQrPath`. No secrets file in repo.

## Common tasks → files

| Task | Where |
|------|--------|
| New product | `products.seed.ts` + `public/products/<key>/` |
| Prices / MRP / badge | `products.seed.ts` |
| WhatsApp / UPI | `config.ts` |
| Styling / theme | `index.css` (`:root` CSS variables) |
| New page/route | `App.tsx` + new component |
| SEO (home) | `index.html` |
| SEO (products) | `vite.config.ts` `productPages()` template replacements |
| Performance images | `scripts/optimize-images.mjs`, `OptimizedImage.tsx` |
| Deploy | Push `main` → Vercel; `npm run build` locally |

## Scripts

```bash
npm run dev      # Vite dev
npm run build    # optimize-images → tsc → vite build
npm run images   # WebP only
npm run lint     # oxlint
```

## Conventions

- **Styles:** Prefer `index.css`; no CSS modules.
- **Scope:** Static site — don’t add API routes unless user asks.
- **Images:** Use `OptimizedImage` with `variant`: `banner` | `productThumb` | `logo`.
- **Commits:** User asks before git commit; PRs via `gh` when requested.
- **Primary domain:** `www`; apex should redirect in Vercel/DNS.

## Out of scope / don’t load for features

- `public/**/*.webp` (generated duplicates of jpg/png)
- `package-lock.json` unless dependency work
- `dist/` (build output)

## Product IDs (current)

`toran-10001` … `toran-10009` — image folders `10001` … `10009`.
