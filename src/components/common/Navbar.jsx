import React, { createContext, useState } from "react";
import { Zap, MessageCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Frame, FutureButton } from "../ui/FutureNavbar";
import { getRestaurantStatus } from "../../utils/helpers";
import { useCart } from "../../context/CartContext";

export const MobileMenuContext = createContext({
  showMenu: false,
  setShowMenu: () => {},
});

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { status } = getRestaurantStatus();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const primaryStroke = "#fbbf24"; 
  const primaryFill = "rgba(251, 191, 36, 0.1)";

  const openWhatsApp = () => {
    const phoneNumber = "919620996689";
    const msg = "Hello CafeNova! I have an enquiry regarding my visit.";
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
      <nav className="fixed w-full top-0 inset-x-0 z-50 h-20">
        <div className="flex h-full relative w-full items-center">
          
          {/* Left Frame (Decorative) */}
          <div className="size-full relative -mr-[11px] hidden lg:block opacity-30">
            <Frame
              paths={[
                {
                  show: true,
                  style: { strokeWidth: "1", stroke: primaryStroke, fill: "rgba(251,191,36,0.05)" },
                  path: [["M","0","0"],["L","100% - 6","0"],["L","100% - 11","100% - 64"],["L","100% + 0","0% + 29"],["L","0","11"],["L","0","0"]]
                }
              ]}
            />
          </div>

          {/* Center Frame (Nav Links) */}
          <div className="flex-none h-full px-12 relative w-full lg:w-auto min-w-[580px]">
            <Frame
              enableBackdropBlur
              className="drop-shadow-[0_0_10px_rgba(251,191,36,0.1)]"
              paths={[
                {
                  show: true,
                  style: { strokeWidth: "1", stroke: primaryStroke, fill: primaryFill },
                  path: [["M","6","0"],["L","100% - 6.5","0"],["L","100% + 0","0% + 9"],["L","100% - 28","100% - 15"],["L","162","100% - 15"],["L","164","100% - 30"],["L","153","100% - 15"],["L","27","100% - 15"],["L","0","0% + 8"],["L","6","0"]]
                }
              ]}
            />
            
            <div className="flex items-center mt-3 relative z-20">
              <NavLink to="/" className="me-10 font-serif font-black text-xl tracking-tighter text-white">
                CAFE<span className="text-yellow-500 italic">NOVA</span>
              </NavLink>

              <div className="hidden lg:flex gap-6 font-bold text-[10px] uppercase tracking-[0.2em] items-center">
                {navLinks.map((link) => (
                  <NavLink 
                    key={link.path} 
                    to={link.path} 
                    className={({ isActive }) => isActive ? "text-yellow-500" : "text-white/50 hover:text-white transition-colors"}
                  >
                    {link.name}
                  </NavLink>
                ))}
                <NavLink
                  to="/order"
                  className={({ isActive }) =>
                    [
                      "relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors",
                      isActive ? "text-yellow-500 bg-white/5" : "text-white/50 hover:text-white hover:bg-white/5",
                    ].join(" ")
                  }
                >
                  Order
                  {cartCount > 0 && (
                    <span className="min-w-5 h-5 px-1 rounded-full bg-primary text-white text-[10px] leading-5 text-center font-black shadow-lg shadow-primary/30">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </div>

              <div className="ms-6 hidden xl:block">
                <span className="text-[8px] font-black px-2 py-0.5 rounded border border-yellow-500/20 text-yellow-500 animate-pulse uppercase">
                  {status}
                </span>
              </div>
            </div>
          </div>

          {/* Right Frame (Enquiry Button) */}
          <div className="w-full relative -ml-[25px] lg:flex justify-end pe-10 hidden">
            <Frame
              enableBackdropBlur
              paths={[
                {
                  show: true,
                  style: { strokeWidth: "1", stroke: primaryStroke, fill: "rgba(251,191,36,0.05)" },
                  path: [["M","19","0"],["L","100% - 5","0"],["L","100% + 0","0% + 7"],["L","100% - 36","100% - 20"],["L","0","100% - 20"],["L","25","8.9"],["L","19","1"]]
                }
              ]}
            />
            <div className="flex items-center -mt-4 relative z-20">
              <FutureButton
                onClick={openWhatsApp}
                shape="flat"
                className="font-black px-6 py-2 text-[10px] uppercase tracking-[0.2em] hover:brightness-125"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle size={14} className="text-yellow-500" />
                  Enquiry
                </div>
              </FutureButton>
            </div>
          </div>
        </div>
      </nav>
    </MobileMenuContext.Provider>
  );
};

export default Navbar;