import type { ImgHTMLAttributes } from 'react'
import { webpSrcSet, type ImageVariant } from '../utils/imageVariants'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
  sizes: string
  variant?: ImageVariant
  priority?: boolean
}

export function OptimizedImage({
  src,
  alt,
  sizes,
  variant,
  priority = false,
  width,
  height,
  className,
  loading,
  ...rest
}: Props) {
  const webp = variant ? webpSrcSet(src, variant) : undefined
  const imgLoading = loading ?? (priority ? 'eager' : 'lazy')
  const fetchPriority = priority ? ('high' as const) : undefined

  if (!webp) {
    return (
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        width={width}
        height={height}
        className={className}
        loading={imgLoading}
        fetchPriority={fetchPriority}
        decoding="async"
        {...rest}
      />
    )
  }

  return (
    <picture className={className}>
      <source type="image/webp" srcSet={webp} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        width={width}
        height={height}
        className={className}
        loading={imgLoading}
        fetchPriority={fetchPriority}
        decoding="async"
        {...rest}
      />
    </picture>
  )
}
