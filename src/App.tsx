import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { Header } from './components/Header'
import { HomePage } from './components/HomePage'
import { ProductPage } from './components/ProductPage'
import { CartDrawer } from './components/CartDrawer'
import { CheckoutPage } from './components/CheckoutPage'
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
    }
  }, [location])
  return null
}

function AppShell() {
  const [cartOpen, setCartOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isCheckout = pathname === '/checkout'
  const openCart = () => setCartOpen(true)

  return (
    <>
      <HashScroll />
      {!isCheckout && <Header onOpenCart={openCart} />}
      <main>
        <Routes>
          <Route
            path="/"
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
          <Route path="/checkout" element={<CheckoutPage />} />
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
      <CartProvider>
        <AppShell />
      </CartProvider>
    </BrowserRouter>
  )
}
