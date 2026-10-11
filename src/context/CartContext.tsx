import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react'
import type { Product } from '../data/products'

export type CartItem = {
  product: Product
  qty: number
}

type CartState = {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD'; product: Product; qty?: number }
  | { type: 'REMOVE'; productId: string }
  | { type: 'SET_QTY'; productId: string; qty: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; items: CartItem[] }

const STORAGE_KEY = 'aarambh-cart'

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { items: action.items }
    case 'ADD': {
      const qty = action.qty ?? 1
      const existing = state.items.find((i) => i.product.id === action.product.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id ? { ...i, qty: i.qty + qty } : i,
          ),
        }
      }
      return { items: [...state.items, { product: action.product, qty }] }
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.product.id !== action.productId) }
    case 'SET_QTY': {
      if (action.qty <= 0) {
        return { items: state.items.filter((i) => i.product.id !== action.productId) }
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, qty: action.qty } : i,
        ),
      }
    }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  add: (product: Product, qty?: number) => void
  remove: (productId: string) => void
  setQty: (productId: string, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as CartItem[]
      if (Array.isArray(parsed)) {
        dispatch({ type: 'HYDRATE', items: parsed })
      }
    } catch {
      // ignore corrupt storage
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  }, [state.items])

  const itemCount = state.items.reduce((n, i) => n + i.qty, 0)
  const subtotal = state.items.reduce((n, i) => n + i.product.price * i.qty, 0)

  const value: CartContextValue = {
    items: state.items,
    itemCount,
    subtotal,
    add: (product, qty) => dispatch({ type: 'ADD', product, qty }),
    remove: (productId) => dispatch({ type: 'REMOVE', productId }),
    setQty: (productId, qty) => dispatch({ type: 'SET_QTY', productId, qty }),
    clear: () => dispatch({ type: 'CLEAR' }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
