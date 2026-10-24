import { useEffect, useState } from 'react'

type Props = {
  onShop: () => void
}

type Slide = {
  image: string
  copyClass?: string
  eyebrow: string
  title: string
  text: string
  actions: Array<{ label: string; primary?: boolean }>
}

const slides: Slide[] = [
  {
    image: '/banner-1.jpg',
    eyebrow: 'Happy Diwali',
    title: 'Diwali Décor, Made to Glow',
    text: 'Handcrafted accents for a home full of warmth, light, and celebration.',
    actions: [{ label: 'Explore the Diwali Collection', primary: true }],
  },
  {
    image: '/banner-2.jpg',
    copyClass: 'banner-copy-shift',
    eyebrow: 'Festive entrances',
    title: 'A Grand Welcome Begins Here',
    text: 'Discover handcrafted torans for festive entrances and joyful homes.',
    actions: [
      { label: 'Shop Torans', primary: true },
      { label: 'View All Décor' },
    ],
  },
]

const INTERVAL_MS = 6500

export function Hero({ onShop }: Props) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = window.setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      INTERVAL_MS,
    )
    return () => window.clearInterval(t)
  }, [paused, active])

  return (
    <section
      className="banner"
      id="top"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          className={i === active ? 'banner-slide active' : 'banner-slide'}
          aria-hidden={i !== active}
        >
          <img
            className="banner-img"
            src={slide.image}
            alt=""
            fetchPriority={i === 0 ? 'high' : undefined}
          />
          <div
            className={
              slide.copyClass ? `banner-copy ${slide.copyClass}` : 'banner-copy'
            }
          >
            <img className="banner-mark" src="/favicon.png" alt="" />
            <p className="banner-eyebrow">{slide.eyebrow}</p>
            <h1 className="banner-title">{slide.title}</h1>
            <p className="banner-text">{slide.text}</p>
            <div className="banner-actions">
              {slide.actions.map((a) => (
                <button
                  key={a.label}
                  type="button"
                  tabIndex={i === active ? 0 : -1}
                  className={a.primary ? 'banner-btn primary' : 'banner-btn'}
                  onClick={onShop}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="banner-dots" role="tablist" aria-label="Choose banner">
        {slides.map((s, i) => (
          <button
            key={s.image}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Show banner ${i + 1}`}
            className={i === active ? 'dot active' : 'dot'}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  )
}
