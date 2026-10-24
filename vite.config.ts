import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const VIRTUAL_ID = 'virtual:product-images'
const RESOLVED_ID = '\0' + VIRTUAL_ID
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i

/**
 * Scans public/products/<id>/ and exposes { [id]: string[] } of image URLs.
 * Order: `<id>-close.*` (main), `<id>.*`, then other `<id>-*` files by name.
 * Drop in e.g. 10003-side.jpg and it appears with no code change.
 */
function productImages(): Plugin {
  const dir = path.resolve(__dirname, 'public/products')

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
        .filter((f) => IMAGE_EXT.test(f) && !f.includes('-original'))
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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), productImages()],
})
