import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { menuData } from "../data/menuData";
import GlassCard from "../components/ui/GlassCard";
import { formatPrice } from "../utils/helpers";
import { fadeIn, staggerContainer } from "../utils/animations";
import { Search, Flame, Star, Utensils, Info, Plus, Minus, UtensilsCrossed, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const COMBOS = [
  {
    id: "royal-feast",
    name: "Royal Feast",
    dishId: 404,
    drinkId: 501,
    sweetId: 301,
    discount: 100,
  },
  {
    id: "comfort-combo",
    name: "Comfort Combo",
    dishId: 406,
    drinkId: 509,
    sweetId: 309,
    discount: 80,
  },
  {
    id: "premium-pairing",
    name: "Premium Pairing",
    dishId: 405,
    drinkId: 502,
    sweetId: 303,
    discount: 120,
  },
];

const Menu = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const [showCombos, setShowCombos] = useState(false);
  const { cartItems, addItem, addItems, removeItem } = useCart();

  const categories = ["All", ...new Set(menuData.map((item) => item.category)), "Must Try"];

  useEffect(() => {
    if (searchParams.get("section") === "must-try") {
      setFilter("Must Try");
    }
  }, [searchParams]);

  const filteredMenu = menuData.filter(
    (item) =>
      (filter === "All" || item.category === filter || (filter === "Must Try" && item.mustTry)) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Only count individually-added (non-combo) quantities on the menu grid
  const getQuantity = (itemId) =>
    cartItems
      .filter((ci) => ci.id === itemId && !ci.comboId)
      .reduce((sum, ci) => sum + ci.quantity, 0);

  const getMenuItemById = (itemId) => menuData.find((item) => item.id === itemId);

  const addComboToCart = (combo) => {
    const items = [combo.dishId, combo.drinkId, combo.sweetId].map(getMenuItemById);
    addItems(items, combo.discount, `${combo.name} Discount`);
  };

  return (
    <div className="pt-32 pb-20 bg-bg-main min-h-screen relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-serif text-white mb-4">The Full Collection</h2>
          <p className="text-slate-500 tracking-[0.2em] uppercase text-xs font-bold">
            Explore 50+ Signature Delicacies
          </p>
        </motion.div>
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-20">
          {/* Categories with Layout Animation */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 w-full lg:w-auto">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className="relative px-6 py-2 group"
              >
                <span className={`relative z-10 text-xs uppercase tracking-widest transition-colors duration-300 ${
                  filter === cat ? 'text-white font-bold' : 'text-slate-500 group-hover:text-white'
                }`}>
                  {cat}
                </span>
                {filter === cat && (
                  <motion.div 
                    layoutId="activeTabMenu"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setShowCombos((current) => !current)}
              className={`relative px-6 py-2 group flex items-center gap-2 rounded-full border transition-colors ${showCombos ? "bg-primary border-primary text-white" : "bg-white/5 border-white/10 text-slate-500 hover:text-white hover:border-primary/30"}`}
            >
              <UtensilsCrossed size={14} />
              <span className="relative z-10 text-xs uppercase tracking-widest font-bold">Combo</span>
            </button>
          </div>
          
          {/* Search Input */}
          <div className="relative w-full lg:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by name..."
              value={search}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {showCombos && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-14 p-6 md:p-8 rounded-[2rem] border border-white/10 bg-white/[0.03]"
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-serif text-white">Combo Suggestions</h3>
                <p className="text-slate-500 text-sm">Each combo includes one dish, one drink, and one sweet. Tap to add all three.</p>
              </div>
              <span className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-full">
                <ShoppingCart size={14} /> Direct to Order
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {COMBOS.map((combo) => {
                const dish = getMenuItemById(combo.dishId);
                const drink = getMenuItemById(combo.drinkId);
                const sweet = getMenuItemById(combo.sweetId);

                if (!dish || !drink || !sweet) return null;

                const comboPrice = dish.price + drink.price + sweet.price - combo.discount;

                return (
                  <div key={combo.id} className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-1">Combo</p>
                        <h4 className="text-xl font-serif text-white">{combo.name}</h4>
                      </div>
                      <span className="text-primary font-bold text-sm bg-primary/10 border border-primary/20 rounded-full px-3 py-1">-{formatPrice(combo.discount)}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[dish, drink, sweet].map((item) => (
                        <div key={item.id} className="aspect-square rounded-2xl overflow-hidden border border-white/5 relative">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 text-sm">
                      <p className="text-white/80"><span className="text-slate-500 uppercase text-[10px] tracking-widest">Dish:</span> {dish.name}</p>
                      <p className="text-white/80"><span className="text-slate-500 uppercase text-[10px] tracking-widest">Drink:</span> {drink.name}</p>
                      <p className="text-white/80"><span className="text-slate-500 uppercase text-[10px] tracking-widest">Sweet:</span> {sweet.name}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div>
                        <p className="text-slate-500 text-[10px] uppercase tracking-widest">Combo price</p>
                        <p className="text-2xl text-white font-serif">{formatPrice(comboPrice)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => addComboToCart(combo)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-xs uppercase tracking-widest font-bold hover:bg-indigo-500 transition-colors"
                      >
                        <ShoppingCart size={14} /> Add Combo
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Menu Grid */}
        <motion.div 
          layout
          variants={staggerContainer} 
          initial="initial" 
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredMenu.length > 0 ? (
              filteredMenu.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <GlassCard className="group h-[540px] p-0 overflow-hidden flex flex-col border-white/5 hover:border-primary/20 transition-all duration-500 relative">
                    {/* Image Area */}
                    <div className="relative h-1/2 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      />
                      {/* Badge Overlays */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {item.tags.includes("Best Seller") && (
                          <span className="bg-primary/90 backdrop-blur-md text-[10px] text-white px-3 py-1 rounded-full font-bold flex items-center gap-1">
                            <Star size={10} fill="white" /> POPULAR
                          </span>
                        )}
                        {item.tags.includes("Spicy") && (
                          <span className="bg-orange-500/90 backdrop-blur-md text-[10px] text-white px-3 py-1 rounded-full font-bold flex items-center gap-1">
                            <Flame size={10} fill="white" /> SPICY
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-xl border border-white/10 px-3 py-1 rounded-lg">
                        <span className="text-primary text-[10px] font-bold">{item.calories}</span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-primary text-[10px] font-bold tracking-widest uppercase mb-1">
                            {item.category}
                          </p>
                          <h4 className="text-2xl text-white font-serif tracking-wide">{item.name}</h4>
                        </div>
                        <span className="text-xl text-white font-serif italic">
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      <div className="w-8 h-[1px] bg-primary mb-4 group-hover:w-full transition-all duration-500" />

                      <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {item.description}
                      </p>

                      {/* Nutritional info tag footer */}
                      <div className="mt-auto flex items-center gap-4 border-t border-white/5 pt-6">
                        <div className="flex items-center gap-1 text-slate-500 text-[10px] uppercase font-bold tracking-tighter">
                          <Info size={12} className="text-primary" /> Freshly Prepared
                        </div>
                        <div className="flex items-center gap-1 text-slate-500 text-[10px] uppercase font-bold tracking-tighter">
                          <Utensils size={12} className="text-primary" /> Premium Quality
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 p-1">
                      <button
                        type="button"
                        onClick={() => {
                          const cartItem = cartItems.find((ci) => ci.id === item.id && !ci.comboId);
                          if (cartItem) removeItem(cartItem.cartItemId);
                        }}
                        className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 text-white hover:bg-white/10 transition-colors"
                        aria-label={`Decrease ${item.name}`}
                      >
                        <Minus size={14} />
                      </button>
                      <div className="min-w-8 text-center text-sm font-bold text-white">{getQuantity(item.id)}</div>
                      <button
                        type="button"
                        onClick={() => addItem(item)}
                        className="w-9 h-9 rounded-full flex items-center justify-center bg-primary text-white hover:bg-indigo-500 transition-colors"
                        aria-label={`Add ${item.name}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))
            ) : (
              /* No Results State */
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="col-span-full py-20 text-center"
              >
                <div className="text-slate-600 mb-4 flex justify-center">
                  <Search size={48} />
                </div>
                <h3 className="text-white font-serif text-2xl">No delicacies found</h3>
                <p className="text-slate-500">Try adjusting your search or category filter.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;