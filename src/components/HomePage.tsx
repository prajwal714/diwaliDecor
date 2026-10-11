import { Hero } from './Hero'
import { ProductGrid } from './ProductGrid'

type Props = {
  onAdded: () => void
  onShop: () => void
}

export function HomePage({ onAdded, onShop }: Props) {
  return (
    <>
      <Hero onShop={onShop} />
      <ProductGrid onAdded={onAdded} />
    </>
  )
}
