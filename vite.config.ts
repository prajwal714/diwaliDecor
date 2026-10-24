import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { seeds } from './src/data/products.seed.ts'
import { shopConfig } from './src/config.ts'

const VIRTUAL_ID = 'virtual:product-images'
const RESOLVED_ID = '\0' + VIRTUAL_ID
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i
/** Responsive variants from scripts/optimize-images.mjs — not gallery images. */
const isOptimizedVariant = (file: string) => /-\d+\.webp$/i.test(file)

/**
 * Scans public/products/<id>/ and exposes { [id]: string[] } of image URLs.
 * Order: `<id>-close.*` (main), `<id>.*`, then other `<id>-*` files by name.
 * Drop in e.g. 10003-side.jpg and it appears with no code change.
 */
const PRODUCTS_DIR = path.resolve(__dirname, 'public/products')

function scanImages(): Record<string, string[]> {
  const dir = PRODUCTS_DIR
  const rank = (id: string, file: string) => {
    const base = file.replace(/\.[^.]+$/, '')
    return base === `${id}-close` ? 0 : base === id ? 1 : 2
  }
  const out: Record<string, string[]> = {}
  if (!fs.existsSync(dir)) return out
  for (const id of fs.readdirSync(dir)) {
    const sub = path.join(dir, id)
    if (!fs.statSync(sub).isDirectory()) continue
    out[id] = fs
      .readdirSync(sub)
      .filter(
        (f) =>
          IMAGE_EXT.test(f) && !f.includes('-original') && !isOptimizedVariant(f),
      )
      .sort((a, b) => rank(id, a) - rank(id, b) || a.localeCompare(b))
      .map((f) => `/products/${id}/${f}`)
  }
  return out
}

function productImages(): Plugin {
  const dir = PRODUCTS_DIR

  function rank(id: string, file: string) {
    const base = file.replace(/\.[^.]+$/, '')
    if (base === `${id}-close`) return 0
    if (base === id) return 1
    return 2
  }

  function build() {
    const out: Record<string, string[]> = {}
    if (!fs.existsSync(dir)) return out
    for (const id of fs.readdirSync(dir)) {
      const sub = path.join(dir, id)
      if (!fs.statSync(sub).isDirectory()) continue
      out[id] = fs
        .readdirSync(sub)
        .filter(
        (f) =>
          IMAGE_EXT.test(f) && !f.includes('-original') && !isOptimizedVariant(f),
      )
        .sort((a, b) => rank(id, a) - rank(id, b) || a.localeCompare(b))
        .map((f) => `/products/${id}/${f}`)
    }
    return out
  }

  return {
    name: 'product-images',
    resolveId: (id) => (id === VIRTUAL_ID ? RESOLVED_ID : undefined),
    load: (id) =>
      id === RESOLVED_ID
        ? `export default ${JSON.stringify(build())}`
        : undefined,
    configureServer(server) {
      const reload = (file: string) => {
        if (!file.startsWith(dir)) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.add(dir)
      server.watcher.on('add', reload)
      server.watcher.on('unlink', reload)
    },
  }
}

const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** After build, write dist/product/<id>/index.html with per-product meta + JSON-LD. */
function productPages(): Plugin {
  let outDir = 'dist'
  return {
    name: 'product-pages',
    apply: 'build',
    configResolved(c) {
      outDir = path.resolve(c.root, c.build.outDir)
    },
    closeBundle() {
      const tplPath = path.join(outDir, 'index.html')
      if (!fs.existsSync(tplPath)) return
      const tpl = fs.readFileSync(tplPath, 'utf8')
      const site = shopConfig.siteUrl
      const images = scanImages()
      for (const seed of seeds) {
        const imgs = (images[seed.imageKey] ?? []).map((i) => site + i)
        const url = `${site}/product/${seed.id}`
        const title = `${seed.name} | ${shopConfig.brandName}`
        const desc = seed.description.slice(0, 200)
        const ld = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: seed.name,
          image: imgs,
          description: seed.description,
          sku: seed.id,
          brand: { '@type': 'Brand', name: shopConfig.brandName },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: String(seed.price),
            availability: 'https://schema.org/InStock',
            url,
          },
        }
        const set = (html: string, re: RegExp, val: string) =>
          html.replace(re, val)
        let html = tpl
        html = set(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
        html = set(html, /(<meta\s+name="description"\s+content=")[^"]*"/, `$1${esc(desc)}"`)
        html = set(html, /(<link rel="canonical" href=")[^"]*"/, `$1${url}"`)
        html = set(html, /(<meta property="og:type" content=")[^"]*"/, `$1product"`)
        html = set(html, /(<meta property="og:title" content=")[^"]*"/, `$1${esc(title)}"`)
        html = set(html, /(<meta\s+property="og:description"\s+content=")[^"]*"/, `$1${esc(desc)}"`)
        html = set(html, /(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
        html = set(html, /(<meta property="og:image" content=")[^"]*"/, `$1${imgs[0] ?? ''}"`)
        html = set(html, /<meta property="og:image:(width|height)" content="[^"]*" \/>\s*/g, '')
        html = set(html, /(<meta name="twitter:title" content=")[^"]*"/, `$1${esc(title)}"`)
        html = set(html, /(<meta\s+name="twitter:description"\s+content=")[^"]*"/, `$1${esc(desc)}"`)
        html = set(html, /(<meta name="twitter:image" content=")[^"]*"/, `$1${imgs[0] ?? ''}"`)
        html = set(
          html,
          /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
          `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`,
        )
        const dest = path.join(outDir, 'product', seed.id)
        fs.mkdirSync(dest, { recursive: true })
        fs.writeFileSync(path.join(dest, 'index.html'), html)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), productImages(), productPages()],
})
