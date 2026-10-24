export type ImageVariant = 'banner' | 'productThumb' | 'logo'

/** WebP srcset paths derived from committed optimize-images.mjs output. */
export function webpSrcSet(src: string, variant: ImageVariant): string | undefined {
  if (variant === 'banner' && /\/banner-\d+\.jpe?g$/i.test(src)) {
    const base = src.replace(/\.jpe?g$/i, '')
    return `${base}-800.webp 800w, ${base}-1600.webp 1600w`
  }
  if (variant === 'productThumb' && /-close\.jpe?g$/i.test(src)) {
    const base = src.replace(/\.jpe?g$/i, '')
    return `${base}-400.webp 400w, ${base}-800.webp 800w`
  }
  if (variant === 'logo' && src.endsWith('/logo.png')) {
    return '/logo-400.webp 400w'
  }
  return undefined
}
