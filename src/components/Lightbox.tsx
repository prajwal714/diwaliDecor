import { useCallback, useEffect, useState } from 'react'

type Props = {
  images: string[]
  alt: string
  startIndex: number
  onClose: () => void
}

export function Lightbox({ images, alt, startIndex, onClose }: Props) {
  const [index, setIndex] = useState(startIndex)
  const [zoomed, setZoomed] = useState(false)
  const [origin, setOrigin] = useState('50% 50%')

  const go = useCallback(
    (dir: number) => {
      setZoomed(false)
      setIndex((i) => (i + dir + images.length) % images.length)
    },
    [images.length],
  )

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [go, onClose])

  function track(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    setOrigin(
      `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`,
    )
  }

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
      {images.length > 1 && (
        <>
          <button
            type="button"
            className="lightbox-nav prev"
            onClick={() => go(-1)}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            className="lightbox-nav next"
            onClick={() => go(1)}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}
      <div
        className={zoomed ? 'lightbox-stage zoomed' : 'lightbox-stage'}
        onMouseMove={zoomed ? track : undefined}
        onClick={(e) => {
          track(e)
          setZoomed((z) => !z)
        }}
      >
        <img
          src={images[index]}
          alt={alt}
          style={{ transformOrigin: origin }}
          draggable={false}
        />
      </div>
      <p className="lightbox-hint">
        {index + 1} / {images.length} · Click image to {zoomed ? 'zoom out' : 'zoom in'}
      </p>
    </div>
  )
}
