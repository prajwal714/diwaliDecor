import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { ProductsProvider } from './context/ProductsContext'
import { CartProvider } from './context/CartContext'
import { Header } from './components/Header'
import { HomePage } from './components/HomePage'
import { ProductPage } from './components/ProductPage'
import { ChhathHome, ChhathCategoryPage } from './components/ChhathPage'
import { CartDrawer } from './components/CartDrawer'
import { CheckoutPage } from './components/CheckoutPage'
import { TrackPage } from './components/TrackPage'
import { AdminPage } from './components/AdminPage'
import { Footer } from './components/Footer'
import { WhatsAppFloat } from './components/WhatsAppFloat'

function scrollToShop() {
  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
}

function HashScroll() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash === '#shop') {
      requestAnimationFrame(() => scrollToShop())
    } else if (location.hash === '#chhath-shop') {
      requestAnimationFrame(() =>
        document.getElementById('chhath-shop')?.scrollIntoView({ behavior: 'smooth' }),
      )
    }
  }, [location])
  return null
}

function AppShell() {
  const [cartOpen, setCartOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isCheckout = pathname === '/checkout' || pathname.startsWith('/admin')
  const openCart = () => setCartOpen(true)

  useEffect(() => {
    const root = document.documentElement
    if (pathname === '/' || pathname.startsWith('/chhath')) root.dataset.theme = 'chhath'
    else delete root.dataset.theme
  }, [pathname])

  return (
    <>
      <HashScroll />
      {!isCheckout && <Header onOpenCart={openCart} />}
      <main>
        <Routes>
          <Route path="/" element={<ChhathHome />} />
          <Route
            path="/diwali"
            element={<HomePage onAdded={openCart} onShop={scrollToShop} />}
          />
          <Route
            path="/product/:id"
            element={
              <ProductPage
                onAdded={openCart}
                onBuyNow={() => navigate('/checkout')}
              />
            }
          />
          <Route path="/chhath" element={<Navigate to="/" replace />} />
          <Route
            path="/chhath/:slug"
            element={
              <ChhathCategoryPage
                onAdded={openCart}
                onBuyNow={() => navigate('/checkout')}
              />
            }
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </main>
      {!isCheckout && <Footer />}
      {!isCheckout && <WhatsAppFloat />}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false)
          navigate('/checkout')
        }}
      />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <CartProvider>
          <AppShell />
          <Analytics />
        </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  )
}
