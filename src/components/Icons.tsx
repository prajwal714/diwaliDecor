type P = { size?: number }

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
})

export const TruckIcon = ({ size = 26 }: P) => (
  <svg {...base(size)}>
    <path d="M2 6h11v10H2zM13 10h4l3 3v3h-7" />
    <circle cx="7" cy="18" r="1.8" />
    <circle cx="17" cy="18" r="1.8" />
  </svg>
)

export const CashIcon = ({ size = 26 }: P) => (
  <svg {...base(size)}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M6 9v.01M18 15v.01" />
  </svg>
)

export const GiftIcon = ({ size = 26 }: P) => (
  <svg {...base(size)}>
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13M5 12v9h14v-9M12 8C10 3 6 4 7.5 6.5 8.5 8 12 8 12 8zM12 8c2-5 6-4 4.5-1.5C15.5 8 12 8 12 8z" />
  </svg>
)

export const CheckIcon = ({ size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={2.4}>
    <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" />
    <path d="m7.5 12.5 3 3 6-6.5" stroke="#fff" />
  </svg>
)

export const SparkIcon = ({ size = 18 }: P) => (
  <svg {...base(size)} fill="currentColor" stroke="none">
    <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />
  </svg>
)

export const WhatsAppIcon = ({ size = 22 }: P) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1.1.1-1.8-.1a14 14 0 0 1-5.6-4.9c-.5-.7-1.3-1.9-1.3-3s.6-1.6.8-1.9c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.4.6c-.1.2-.3.3-.1.6a8 8 0 0 0 3.6 3c.3.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.4.3.1.2.1.8-.1 1.4z" />
  </svg>
)

export const BagIcon = ({ size = 20 }: P) => (
  <svg {...base(size)}>
    <path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
)

export const ZoomIcon = ({ size = 18 }: P) => (
  <svg {...base(size)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4M11 8v6M8 11h6" />
  </svg>
)

export const LockIcon = ({ size = 18 }: P) => (
  <svg {...base(size)}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
)

export const QrIcon = ({ size = 24 }: P) => (
  <svg {...base(size)}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3h-3zM20 14v.01M14 20h3M20 17v4" />
  </svg>
)

export const CardIcon = ({ size = 24 }: P) => (
  <svg {...base(size)}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20M6 15h4" />
  </svg>
)

export const PinIcon = ({ size = 24 }: P) => (
  <svg {...base(size)}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.800 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)

export const ArrowLeftIcon = ({ size = 18 }: P) => (
  <svg {...base(size)}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
)

/** Peacock feather line art for page edges (decorative) */
export const FeatherIcon = ({ size = 160 }: P) => (
  <svg
    width={size}
    height={size * 2}
    viewBox="0 0 80 160"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M40 158C40 120 38 90 40 52" strokeWidth="1.4" />
    <ellipse cx="40" cy="38" rx="9" ry="14" />
    <ellipse cx="40" cy="38" rx="4.500" ry="8" />
    <path d="M40 24C18 28 6 52 14 84 22 112 36 124 40 136M40 24c22 4 34 28 26 60-8 28-22 40-26 52" />
    <path d="M40 60C28 64 20 76 22 92M40 60c12 4 20 16 18 32M40 84C32 88 28 98 30 108M40 84c8 4 12 14 10 24" />
  </svg>
)

export const ShareIcon = ({ size = 18 }: P) => (
  <svg {...base(size)}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4" />
  </svg>
)
