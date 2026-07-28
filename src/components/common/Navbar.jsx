import React, { createContext, useState } from "react";
import { MessageCircle, ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { getRestaurantStatus } from "../../utils/helpers";
import { useCart } from "../../context/CartContext";
import ThemeToggle from "./ThemeToggle";

export const MobileMenuContext = createContext({
  showMenu: false,
  setShowMenu: () => {},
});

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { status } = getRestaurantStatus();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const openWhatsApp = () => {
    const phoneNumber = "919620996689";
    const msg = "Hello Cafe Ridge! I have an enquiry regarding my visit.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Reservation", path: "/reservation" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <MobileMenuContext.Provider value={{ showMenu, setShowMenu }}>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4">
        <nav className="max-w-7xl mx-auto backdrop-blur-xl bg-bg-soft/80 border border-white/10 dark:border-white/10 light:border-black/10 rounded-full px-6 py-3 shadow-2xl shadow-black/40 flex items-center justify-between transition-all duration-300">
          
          <NavLink to="/" className="flex items-center gap-2 group">
            <span className="font-serif font-black text-2xl tracking-tight text-text-base">
              CAFE<span className="text-primary italic group-hover:brightness-110 transition-all">RIDGE</span>
            </span>
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-[0.18em]">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full"
                    : "text-text-muted hover:text-text-base transition-colors py-1"
                }
              >
                {link.name}
              </NavLink>
            ))}

            <NavLink
              to="/order"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                    : "border-white/10 hover:border-primary/50 text-text-base hover:bg-white/5"
                }`
              }
            >
              <ShoppingBag size={14} />
              <span>Order</span>
              {cartCount > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </div>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center gap-4">
            <span className="text-[10px] font-black px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {status}
            </span>

            <button
              onClick={openWhatsApp}
              className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-primary/25 flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <MessageCircle size={14} />
              <span>Enquiry</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-2 rounded-full text-text-base hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {showMenu ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {showMenu && (
          <div className="md:hidden mt-3 max-w-7xl mx-auto backdrop-blur-2xl bg-bg-soft/95 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4 flex flex-col items-center text-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-bold text-sm uppercase tracking-widest"
                    : "text-text-muted hover:text-text-base text-sm uppercase tracking-widest"
                }
              >
                {link.name}
              </NavLink>
            ))}
            <NavLink
              to="/order"
              onClick={() => setShowMenu(false)}
              className="w-full py-3 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest text-center shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              <ShoppingBag size={14} /> Order ({cartCount})
            </NavLink>
            <button
              onClick={() => {
                openWhatsApp();
                setShowMenu(false);
              }}
              className="w-full py-3 rounded-full border border-white/20 text-text-base text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <MessageCircle size={14} className="text-primary" /> Enquiry
            </button>
          </div>
        )}
      </header>
    </MobileMenuContext.Provider>
  );
};

export default Navbar;
