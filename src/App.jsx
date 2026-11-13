// App shell: providers, persistent chrome, animated routes.
import { useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext.jsx';
import SmoothScroll from './components/motion/SmoothScroll.jsx';
import ScrollProgress from './components/motion/ScrollProgress.jsx';
import Header from './components/layout/Header.jsx';
import Intro from './components/layout/Intro.jsx';
import Footer from './components/layout/Footer.jsx';
import WhatsAppButton from './components/layout/WhatsAppButton.jsx';
import CartDrawer from './components/cart/CartDrawer.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Category from './pages/Category.jsx';
import Product from './pages/Product.jsx';
import TeamKits from './pages/TeamKits.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import NotFound from './pages/NotFound.jsx';

function AnimatedRoutes() {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/cricket" element={<Navigate to="/category/cricket" replace />} />
          <Route path="/team-kits" element={<TeamKits />} />
          <Route path="/about" element={<Navigate to="/contact" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      <CartProvider>
        <SmoothScroll>
          <Intro />
          <ScrollProgress />
          <Header />
          <AnimatedRoutes />
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </SmoothScroll>
      </CartProvider>
    </HashRouter>
  );
}
