import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  products as baseProducts,
  getSimilarProducts as similarFrom,
  type Product,
} from '../data/products'
import { supabase } from '../lib/supabase'

export type ProductOverride = {
  product_id: string
  price: number | null
  mrp: number | null
  badge: string | null
  sold_out: boolean
}

const CACHE_KEY = 'devamkart-overrides'

function loadCache(): ProductOverride[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(CACHE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function applyOverrides(base: Product[], overrides: ProductOverride[]): Product[] {
  const map = new Map(overrides.map((o) => [o.product_id, o]))
  return base.map((p) => {
    const o = map.get(p.id)
    if (!o) return p
    return {
      ...p,
      price: o.price ?? p.price,
      mrp: o.mrp ?? p.mrp,
      badge: o.badge ? o.badge : p.badge,
      soldOut: o.sold_out,
    }
  })
}

type Value = {
  products: Product[]
  overrides: ProductOverride[]
  getProduct: (id: string) => Product | undefined
  getSimilarProducts: (product: Product, limit?: number) => Product[]
  refresh: () => Promise<void>
}

const ProductsContext = createContext<Value | null>(null)

export async function fetchOverrides(): Promise<ProductOverride[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('product_overrides')
    .select('product_id, price, mrp, badge, sold_out')
  if (error) throw error
  return (data ?? []) as ProductOverride[]
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<ProductOverride[]>(loadCache)

  const refresh = useCallback(async () => {
    try {
      const rows = await fetchOverrides()
      setOverrides(rows)
      localStorage.setItem(CACHE_KEY, JSON.stringify(rows))
    } catch {
      /* keep cached or seed values */
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const value = useMemo<Value>(() => {
    const list = applyOverrides(baseProducts, overrides)
    return {
      products: list,
      overrides,
      getProduct: (id) => list.find((p) => p.id === id),
      getSimilarProducts: (product, limit) => similarFrom(product, limit, list),
      refresh,
    }
  }, [overrides, refresh])

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider')
  return ctx
}
