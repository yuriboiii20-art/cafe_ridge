import React, { createContext, useState, useEffect } from "react";
import { MessageCircle, ShoppingBag, Menu as MenuIcon, X, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import { getRestaurantStatus } from "../../utils/helpers";
import { useCart } from "../../context/CartContext";

export const MobileMenuContext = createContext({
  showMenu: false,
  setShowMenu: () => {},
});

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { status } = getRestaurantStatus();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openWhatsApp = () => {
    const phoneNumber = "917892724453";
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
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-10 py-5 transition-all duration-500">
        <div
          className={`max-w-7xl mx-auto rounded-3xl transition-all duration-500 flex items-center justify-between px-6 py-3.5 border ${
            scrolled
              ? "backdrop-blur-2xl bg-bg-main/80 border-primary/20 shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
              : "backdrop-blur-md bg-bg-soft/40 border-white/10 shadow-lg"
          }`}
        >
          {/* Brand Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary via-amber-400 to-amber-600 p-[1px] shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-bg-main rounded-[15px] flex items-center justify-center">
                <Sparkles size={18} className="text-primary group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-2xl tracking-wider text-text-base leading-none">
                CAFE<span className="text-primary italic font-serif">RIDGE</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold mt-1">
                Fine Dining & Craft
              </span>
            </div>
          </NavLink>

          {/* Nav Items Container */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-5 py-2 rounded-full font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-slate-950 shadow-md shadow-primary/30 font-black scale-105"
                      : "text-text-muted hover:text-text-base hover:bg-white/5"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <NavLink
              to="/order"
              className={({ isActive }) =>
                `px-5 py-2 rounded-full font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-primary text-slate-950 shadow-md shadow-primary/30 font-black scale-105"
                    : "text-text-muted hover:text-text-base hover:bg-white/5"
                }`
              }
            >
              <ShoppingBag size={14} />
              <span>Order</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-slate-950 text-primary text-[10px] font-black flex items-center justify-center border border-primary/40">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </div>

          {/* Right Action Area */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{status}</span>
            </div>

            <button
              onClick={openWhatsApp}
              className="group relative px-6 py-2.5 rounded-2xl bg-gradient-to-r from-primary via-amber-400 to-amber-500 text-slate-950 text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden flex items-center gap-2"
            >
              <MessageCircle size={15} className="group-hover:rotate-12 transition-transform" />
              <span>Enquiry</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-3 rounded-2xl bg-white/5 border border-white/10 text-text-base hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {showMenu ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>

        {/* Mobile Drawer Menu */}
        {showMenu && (
          <div className="md:hidden mt-3 max-w-7xl mx-auto backdrop-blur-3xl bg-bg-main/95 border border-primary/20 rounded-3xl p-6 shadow-2xl space-y-4 flex flex-col items-center text-center animate-in fade-in slide-in-from-top-4 duration-300">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-black text-sm uppercase tracking-widest py-2 border-b border-primary/30 w-full"
                    : "text-text-muted hover:text-text-base text-sm uppercase tracking-widest py-2 w-full"
                }
              >
                {link.name}
              </NavLink>
            ))}
            <NavLink
              to="/order"
              onClick={() => setShowMenu(false)}
              className="w-full py-3.5 rounded-2xl bg-primary text-slate-950 text-xs font-black uppercase tracking-widest text-center shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
            >
              <ShoppingBag size={15} /> Order ({cartCount})
            </NavLink>
            <button
              onClick={() => {
                openWhatsApp();
                setShowMenu(false);
              }}
              className="w-full py-3.5 rounded-2xl border border-white/20 text-text-base text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <MessageCircle size={15} className="text-primary" /> Enquiry
            </button>
          </div>
        )}
      </header>
    </MobileMenuContext.Provider>
  );
};

export default Navbar;
