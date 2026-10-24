import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')

function isStale(src, dest) {
  try {
    return fs.statSync(src).mtimeMs > fs.statSync(dest).mtimeMs
  } catch {
    return true
  }
}

async function writeWebp(src, dest, width) {
  if (!fs.existsSync(src)) return
  if (!isStale(src, dest)) return
  await fs.promises.mkdir(path.dirname(dest), { recursive: true })
  await sharp(src)
    .resize(width, null, { withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(dest)
  console.log(`optimized ${path.relative(root, dest)}`)
}

async function run() {
  for (const n of [1, 2]) {
    const src = path.join(publicDir, `banner-${n}.jpg`)
    for (const w of [800, 1600]) {
      await writeWebp(src, path.join(publicDir, `banner-${n}-${w}.webp`), w)
    }
  }

  const productsDir = path.join(publicDir, 'products')
  if (fs.existsSync(productsDir)) {
    for (const id of fs.readdirSync(productsDir)) {
      const sub = path.join(productsDir, id)
      if (!fs.statSync(sub).isDirectory()) continue
      for (const file of fs.readdirSync(sub)) {
        if (!file.endsWith('-close.jpg')) continue
        const src = path.join(sub, file)
        const base = file.replace(/\.jpg$/i, '')
        for (const w of [400, 800]) {
          await writeWebp(src, path.join(sub, `${base}-${w}.webp`), w)
        }
      }
    }
  }

  const logo = path.join(publicDir, 'logo.png')
  await writeWebp(logo, path.join(publicDir, 'logo-400.webp'), 400)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
