import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import { CartProvider } from './context/cart-context';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { ScrollToTop } from './components/scroll-to-top';
import { HomePage } from './pages/home';
import { ShopPage } from './pages/shop';
import { ProductDetailsPage } from './pages/product-details';
import { CartPage } from './pages/cart';
import { AboutPage } from './pages/about';
import { NotFoundPage } from './pages/not-found';

export default function App() {
  return (
    // `attribute="class"` is what switches the `.dark` token block in
    // theme.css; `defaultTheme="system"` respects the visitor's OS preference
    // on arrival, and next-themes persists any manual choice.
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <BrowserRouter>
        <CartProvider>
          <ScrollToTop />

          {/* `flex-col` + `flex-1` on main keeps the footer at the bottom of
              the viewport on short pages instead of floating mid-screen. */}
          <div className="flex min-h-screen flex-col bg-background">
            <Header />

            <main id="main-content" className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/about" element={<AboutPage />} />
                {/* Any unknown URL gets a real page, not a blank screen. */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            <Footer />
          </div>

          <Toaster position="bottom-right" />
        </CartProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
