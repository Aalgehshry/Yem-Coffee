import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { CartProvider } from './context/cart-context';
import { Header } from './components/header';
import { HomePage } from './pages/home';
import { ShopPage } from './pages/shop';
import { ProductDetailsPage } from './pages/product-details';
import { CartPage } from './pages/cart';
import { AboutPage } from './pages/about';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Toaster position="bottom-right" />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
