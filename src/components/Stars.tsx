type Props = {
  rating: number
  size?: 'sm' | 'md'
}

export function Stars({ rating, size = 'md' }: Props) {
  const full = Math.round(rating)
  return (
    <span
      className={size === 'sm' ? 'stars stars-sm' : 'stars'}
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? 'star on' : 'star'}>
          ★
        </span>
      ))}
    </span>
  )
}
