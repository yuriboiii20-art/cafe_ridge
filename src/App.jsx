import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import CustomCursor from "./components/common/CustomCursor";
import ThemeToggle from "./components/common/ThemeToggle";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Accessibility from "./pages/Accessibility";
import { CartProvider } from "./context/CartContext";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="bg-bg-dark min-h-screen">
          
          <CustomCursor />
          <ThemeToggle />

          <Toaster position="bottom-right" />

          <Navbar />
          <ScrollToTop />

          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/order" element={<Order />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>

          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;