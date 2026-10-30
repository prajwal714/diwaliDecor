import productImages from 'virtual:product-images'
import { seeds, type Category, type Review, type Product } from './products.seed'

export type { Category, Review, Product }

export const categories: Array<Category | 'All'> = ['All', 'Toran']


export const products: Product[] = seeds.map(({ imageKey, ...rest }) => {
  const images = productImages[imageKey] ?? []
  return { ...rest, image: images[0] ?? '', images }
})

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

export function getSimilarProducts(product: Product, limit = 3, products: Product[] = allProducts) {
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  )
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit)
  const rest = products.filter(
    (p) => p.id !== product.id && !sameCategory.some((s) => s.id === p.id),
  )
  return [...sameCategory, ...rest].slice(0, limit)
}

const allProducts = products

export function averageRating(reviews: Review[]) {
  if (reviews.length === 0) return 0
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
}
