import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, CreditCard, Truck, ChevronRight, Trash2,
  Plus, Minus, ArrowLeft, ShoppingCart, UtensilsCrossed,
  Tag, User, Phone, Mail, CheckCircle2, Wifi, Building2,
  Lock, Eye, EyeOff, ChevronDown,
} from "lucide-react";
import { formatPrice } from "../utils/helpers";
import GlassCard from "../components/ui/GlassCard";
import { fadeIn, staggerContainer } from "../utils/animations";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ADD_ONS = {
  cheese: { label: "Extra Cheese", price: 25 },
  butter: { label: "Butter", price: 15 },
  sauce: { label: "Special Sauce", price: 20 },
  veggies: { label: "Veggies", price: 30 },
};

const RECOMMENDATIONS = [
  {
    id: "special-sauce-1",
    name: "Special Sauce",
    price: 120,
    image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: "special-sauce-2",
    name: "Special Sauce",
    price: 120,
    image: "https://plus.unsplash.com/premium_photo-1675676619780-ad4bba28ba62?w=600&auto=format&fit=crop&q=60",
  },
];

const BANKS = [
  { id: "sbi", name: "State Bank of India", abbr: "SBI", color: "#1d5e9e" },
  { id: "hdfc", name: "HDFC Bank", abbr: "HDFC", color: "#004c8b" },
  { id: "icici", name: "ICICI Bank", abbr: "ICICI", color: "#f07b00" },
  { id: "axis", name: "Axis Bank", abbr: "AXIS", color: "#97144D" },
  { id: "kotak", name: "Kotak Mahindra", abbr: "KOTAK", color: "#e31837" },
  { id: "pnb", name: "Punjab National Bank", abbr: "PNB", color: "#e60000" },
];

const ORDER_GST_RATE = 0.05;
const CONVENIENCE_FEE = 55;

/* ─── Shared Order Summary Panel ─────────────────────────────────── */
const OrderSummary = ({ totals, discounts }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-sm">
      <span className="text-slate-500 uppercase tracking-widest font-bold">Items Total</span>
      <span className="text-white font-medium">{formatPrice(totals.itemsTotal)}</span>
    </div>

    {discounts && discounts.length > 0 && (
      <div className="space-y-2 pt-1 pb-1">
        {discounts.map((d) => (
          <div key={d.id} className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Tag size={9} className="text-emerald-400" />
              </div>
              <span className="text-emerald-400 text-[10px] uppercase tracking-wider font-bold truncate">{d.label}</span>
            </div>
            <span className="text-emerald-400 font-serif font-bold text-sm shrink-0">−{formatPrice(d.amount)}</span>
          </div>
        ))}
      </div>
    )}

    {discounts && discounts.length > 0 && (
      <div className="flex justify-between text-sm pt-1">
        <span className="text-slate-400 uppercase tracking-widest font-bold">Subtotal</span>
        <span className="text-white font-medium">{formatPrice(totals.subtotal)}</span>
      </div>
    )}

    <div className="flex justify-between text-sm">
      <span className="text-slate-500 uppercase tracking-widest font-bold">Convenience Fee</span>
      <span className="text-white font-medium">{formatPrice(totals.convenienceFee)}</span>
    </div>
    <div className="flex justify-between text-sm">
      <span className="text-slate-500 uppercase tracking-widest font-bold">GST (5%)</span>
      <span className="text-white font-medium">{formatPrice(totals.gst)}</span>
    </div>

    <div className="h-px bg-white/10 my-5" />

    <div className="flex justify-between items-end">
      <span className="text-white font-serif text-lg">Total Amount</span>
      <span className="text-3xl text-primary font-serif italic">{formatPrice(totals.total)}</span>
    </div>
  </div>
);

/* ─── Input Field Component ───────────────────────────────────────── */
const Field = ({ icon: Icon, label, type = "text", value, onChange, placeholder, error }) => {
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-2">{label}</label>
      <div className={`flex items-center gap-3 bg-white/5 border rounded-2xl px-4 py-3.5 transition-all ${error ? "border-red-500/50" : "border-white/10 focus-within:border-primary/50 focus-within:bg-white/8"}`}>
        <Icon size={16} className="text-slate-500 shrink-0" />
        <input
          type={isPassword ? (showPass ? "text" : "password") : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-slate-600"
        />
        {isPassword && (
          <button type="button" onClick={() => setShowPass((v) => !v)} className="text-slate-500 hover:text-slate-300 transition-colors">
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-[10px] text-red-400 font-bold uppercase tracking-wider">{error}</p>}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════ */
const Order = () => {
  const {
    cartItems, discounts,
    addItem, removeItem, removeCombo,
    updateItemQuantity, setItemAddons,
  } = useCart();

  const [currentStep, setCurrentStep] = useState(1);
  const [details, setDetails] = useState({ name: "", phone: "", email: "" });
  const [detailErrors, setDetailErrors] = useState({});
  const [payMethod, setPayMethod] = useState("upi");
  const [selectedBank, setSelectedBank] = useState(null);
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [cardErrors, setCardErrors] = useState({});
  const [paid, setPaid] = useState(false);
  const [processing, setProcessing] = useState(false);

  /* — Derived state — */
  const regularItems = useMemo(() => cartItems.filter((ci) => !ci.comboId), [cartItems]);
  const comboGroups = useMemo(() => {
    const groups = {};
    cartItems.forEach((ci) => {
      if (ci.comboId) {
        if (!groups[ci.comboId]) groups[ci.comboId] = [];
        groups[ci.comboId].push(ci);
      }
    });
    return groups;
  }, [cartItems]);
  const isEmpty = cartItems.length === 0;

  const totals = useMemo(() => {
    const itemsTotal = cartItems.reduce((sum, ci) => {
      const addonTotal = (ci.addons || []).reduce((s, key) => s + (ADD_ONS[key]?.price || 0), 0);
      return sum + (ci.price + addonTotal) * ci.quantity;
    }, 0);
    const totalDiscounts = (discounts || []).reduce((s, d) => s + d.amount, 0);
    const subtotal = itemsTotal - totalDiscounts;
    const convenienceFee = isEmpty ? 0 : CONVENIENCE_FEE;
    const gst = isEmpty ? 0 : (subtotal + convenienceFee) * ORDER_GST_RATE;
    const total = subtotal + convenienceFee + gst;
    return { itemsTotal, totalDiscounts, subtotal, convenienceFee, gst, total };
  }, [cartItems, discounts, isEmpty]);

  const toggleAddon = (cartItemId, key) => {
    const item = cartItems.find((ci) => ci.cartItemId === cartItemId);
    if (!item) return;
    const cur = item.addons || [];
    const next = cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key];
    setItemAddons(cartItemId, next);
  };

  /* — Stepper — */
  const STEPS = [
    { id: 1, name: "Cart", Icon: ShoppingBag },
    { id: 2, name: "Details", Icon: Truck },
    { id: 3, name: "Payment", Icon: CreditCard },
  ];

  /* — Validation — */
  const validateDetails = () => {
    const err = {};
    if (!details.name.trim()) err.name = "Name is required";
    if (!/^\d{10}$/.test(details.phone)) err.phone = "Enter a valid 10-digit number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) err.email = "Enter a valid email";
    setDetailErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateCard = () => {
    const err = {};
    const clean = card.number.replace(/\s/g, "");
    if (clean.length !== 16) err.number = "Enter 16-digit card number";
    if (!card.name.trim()) err.name = "Cardholder name required";
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) err.expiry = "Format: MM/YY";
    if (!/^\d{3,4}$/.test(card.cvv)) err.cvv = "Invalid CVV";
    setCardErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleDetailsNext = () => {
    if (validateDetails()) setCurrentStep(3);
  };

  const handlePay = () => {
    if (payMethod === "card" && !validateCard()) return;
    if (payMethod === "netbanking" && !selectedBank) return;
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setPaid(true); }, 2200);
  };

  const formatCardNumber = (v) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  /* ── UPI QR code URL (uses free qrserver API) ── */
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi%3A%2F%2Fpay%3Fpa%3Dcafenova%40upi%26pn%3DCafeNova%26am%3D${Math.round(totals.total)}%26cu%3DINR&bgcolor=0f1117&color=ffffff&margin=10`;

  /* ═══════════════════════════ RENDER ═══════════════════════════ */

  /* — Success Screen — */
  if (paid) {
    return (
      <div className="pt-32 pb-20 bg-bg-main min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 size={48} className="text-emerald-400" />
          </motion.div>
          <h2 className="text-4xl font-serif text-white mb-3">Order Confirmed!</h2>
          <p className="text-slate-400 mb-2">Thank you, <span className="text-white font-bold">{details.name}</span>!</p>
          <p className="text-slate-500 text-sm mb-8">A confirmation will be sent to <span className="text-primary">{details.email}</span></p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left space-y-2">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-3">Order Summary</p>
            <div className="flex justify-between text-sm"><span className="text-slate-400">Total Paid</span><span className="text-primary font-serif text-lg">{formatPrice(totals.total)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-400">Method</span><span className="text-white capitalize">{payMethod === "upi" ? "UPI" : payMethod === "netbanking" ? "Net Banking" : "Card"}</span></div>
          </div>
          <Link to="/menu">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20">
              Back to Menu
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-bg-main min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* ── Stepper ── */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-full">
            {STEPS.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-3">
                <div className={`flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest transition-colors ${currentStep >= step.id ? "text-primary" : "text-slate-600"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${currentStep >= step.id ? "border-primary bg-primary/10" : "border-slate-800"}`}>
                    {step.id}
                  </span>
                  {step.name}
                </div>
                {idx !== STEPS.length - 1 && <ChevronRight size={14} className="text-slate-800" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">

          {/* ═══════════ LEFT PANEL ═══════════ */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">

              {/* ── STEP 1: Cart ── */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  exit={{ opacity: 0, x: -30, transition: { duration: 0.25 } }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-end border-b border-white/5 pb-6">
                    <h2 className="text-4xl font-serif text-white">Your Selection</h2>
                    <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                      {cartItems.reduce((s, ci) => s + ci.quantity, 0)} Items
                    </span>
                  </div>

                  <AnimatePresence mode="popLayout">
                    {isEmpty ? (
                      <motion.div variants={fadeIn("up", 0.2)} className="py-20 text-center">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5 text-slate-700">
                          <ShoppingBag size={40} />
                        </div>
                        <h3 className="text-xl text-white font-serif mb-4">Your gallery is empty</h3>
                        <p className="text-slate-500 mb-8 max-w-xs mx-auto">Looks like you haven't added any delicacies yet.</p>
                        <Link to="/menu">
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20">
                            Return to Menu
                          </motion.button>
                        </Link>
                      </motion.div>
                    ) : (
                      <>
                        {/* Combo groups */}
                        {Object.entries(comboGroups).map(([comboId, items]) => {
                          const discount = discounts.find((d) => d.id === comboId);
                          const comboLabel = discount?.label?.replace(" Discount", "") ?? "Combo";
                          const rawTotal = items.reduce((s, ci) => s + ci.price, 0);
                          const discountedTotal = rawTotal - (discount?.amount ?? 0);
                          return (
                            <motion.div key={comboId} layout variants={fadeIn("up", 0.1)}>
                              <GlassCard className="overflow-hidden border-primary/20">
                                <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/5">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                                      <UtensilsCrossed size={13} className="text-primary" />
                                    </div>
                                    <div>
                                      <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold">Combo</p>
                                      <h3 className="text-lg text-white font-serif leading-tight">{comboLabel}</h3>
                                    </div>
                                    {discount && (
                                      <span className="ml-1 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full">
                                        <Tag size={9} /> −{formatPrice(discount.amount)} saved
                                      </span>
                                    )}
                                  </div>
                                  <button type="button" onClick={() => removeCombo(comboId)} className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-red-400 transition-colors">
                                    <Trash2 size={13} /> Remove Combo
                                  </button>
                                </div>
                                <div className="divide-y divide-white/[0.04]">
                                  {items.map((item) => (
                                    <div key={item.cartItemId} className="flex items-center gap-4 px-5 py-4">
                                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">{item.category}</p>
                                        <p className="text-white font-serif text-base truncate">{item.name}</p>
                                      </div>
                                      <p className="text-white/70 font-serif text-sm shrink-0">{formatPrice(item.price)}</p>
                                    </div>
                                  ))}
                                </div>
                                <div className="flex items-center justify-between px-5 py-4 bg-white/[0.02] border-t border-white/5">
                                  <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Combo Price</span>
                                  <div className="flex items-center gap-3">
                                    {discount && <span className="text-slate-600 line-through text-sm font-serif">{formatPrice(rawTotal)}</span>}
                                    <span className="text-white font-serif text-xl">{formatPrice(discountedTotal)}</span>
                                  </div>
                                </div>
                              </GlassCard>
                            </motion.div>
                          );
                        })}

                        {/* Regular items */}
                        {regularItems.map((item) => {
                          const itemAddonTotal = (item.addons || []).reduce((s, key) => s + (ADD_ONS[key]?.price || 0), 0);
                          return (
                            <motion.div key={item.cartItemId} layout variants={fadeIn("up", 0.1)}>
                              <GlassCard className="p-5 flex flex-col gap-5 group border-white/5">
                                <div className="flex gap-5 items-start">
                                  <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover border border-white/10" />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex justify-between gap-4">
                                      <div>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">{item.category}</p>
                                        <h3 className="text-xl text-white font-serif truncate">{item.name}</h3>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-white font-serif text-xl">{formatPrice((item.price + itemAddonTotal) * item.quantity)}</p>
                                        <p className="text-slate-500 text-[10px] uppercase tracking-widest">Qty {item.quantity}</p>
                                      </div>
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                      {Object.entries(ADD_ONS).map(([key, addon]) => {
                                        const active = (item.addons || []).includes(key);
                                        return (
                                          <button key={key} type="button" onClick={() => toggleAddon(item.cartItemId, key)}
                                            className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest border transition-colors ${active ? "bg-primary text-white border-primary" : "bg-white/5 text-slate-300 border-white/10 hover:border-primary/40 hover:text-white"}`}>
                                            {addon.label} +{formatPrice(addon.price)}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-4">
                                  <div className="flex items-center gap-2">
                                    <button type="button" onClick={() => removeItem(item.cartItemId)} className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-white hover:bg-white/10 transition-colors"><Minus size={14} /></button>
                                    <div className="w-12 text-center text-sm font-bold text-white">{item.quantity}</div>
                                    <button type="button" onClick={() => updateItemQuantity(item.cartItemId, item.quantity + 1)} className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white hover:bg-indigo-500 transition-colors"><Plus size={14} /></button>
                                  </div>
                                  <button type="button" onClick={() => updateItemQuantity(item.cartItemId, 0)} className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500 hover:text-red-400 transition-colors">
                                    <Trash2 size={14} /> Remove
                                  </button>
                                </div>
                              </GlassCard>
                            </motion.div>
                          );
                        })}
                      </>
                    )}
                  </AnimatePresence>

                  {/* Recommendations */}
                  <div className="mt-12 p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
                    <h4 className="text-white font-serif mb-6 text-lg">Chef's Recommendations</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {RECOMMENDATIONS.map((rec) => (
                        <div key={rec.id} className="group">
                          <div className="aspect-square bg-white/5 rounded-2xl mb-3 overflow-hidden border border-white/5 relative">
                            <img src={rec.image} alt={rec.name} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" />
                            <button type="button" onClick={() => addItem(rec)} className="absolute bottom-3 left-3 right-3 rounded-full bg-primary/90 text-white text-[10px] font-bold uppercase tracking-widest py-2 shadow-lg shadow-primary/20 hover:bg-primary transition-colors flex items-center justify-center gap-2">
                              <ShoppingCart size={12} /> Add
                            </button>
                          </div>
                          <p className="text-xs text-white/60 font-bold group-hover:text-primary transition-colors">{rec.name}</p>
                          <p className="text-[10px] text-primary">{formatPrice(rec.price)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2: Details ── */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="border-b border-white/5 pb-6">
                    <button onClick={() => setCurrentStep(1)} className="flex items-center gap-2 text-slate-500 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors mb-6 group">
                      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Cart
                    </button>
                    <h2 className="text-4xl font-serif text-white">Your Details</h2>
                    <p className="text-slate-500 text-sm mt-2">We need a few details to confirm your order.</p>
                  </div>

                  <GlassCard className="p-8 space-y-6 border-white/5">
                    <Field icon={User} label="Full Name" placeholder="e.g. Aryan Mehta" value={details.name} onChange={(v) => setDetails((d) => ({ ...d, name: v }))} error={detailErrors.name} />
                    <Field icon={Phone} label="Contact Number" type="tel" placeholder="10-digit mobile number" value={details.phone}
                      onChange={(v) => setDetails((d) => ({ ...d, phone: v.replace(/\D/g, "").slice(0, 10) }))} error={detailErrors.phone} />
                    <Field icon={Mail} label="Email Address" type="email" placeholder="you@example.com" value={details.email} onChange={(v) => setDetails((d) => ({ ...d, email: v }))} error={detailErrors.email} />

                    <motion.button
                      type="button"
                      onClick={handleDetailsNext}
                      whileHover={{ scale: 1.02, backgroundColor: "#6366f1" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 mt-2 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 transition-colors"
                    >
                      Continue to Payment <ChevronRight size={18} />
                    </motion.button>
                  </GlassCard>
                </motion.div>
              )}

              {/* ── STEP 3: Payment ── */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="border-b border-white/5 pb-6">
                    <button onClick={() => setCurrentStep(2)} className="flex items-center gap-2 text-slate-500 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors mb-6 group">
                      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Details
                    </button>
                    <h2 className="text-4xl font-serif text-white">Payment</h2>
                    <p className="text-slate-500 text-sm mt-2">Choose how you'd like to pay <span className="text-primary font-bold">{formatPrice(totals.total)}</span></p>
                  </div>

                  {/* Method Tabs */}
                  <div className="flex gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl">
                    {[
                      { id: "upi", label: "UPI", Icon: Wifi },
                      { id: "netbanking", label: "Net Banking", Icon: Building2 },
                      { id: "card", label: "Card", Icon: CreditCard },
                    ].map(({ id, label, Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPayMethod(id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${payMethod === id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:text-white"}`}
                      >
                        <Icon size={13} /> {label}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {/* UPI */}
                    {payMethod === "upi" && (
                      <motion.div key="upi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <GlassCard className="p-8 border-white/5 flex flex-col items-center gap-6">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold">Scan & Pay</p>
                          {/* QR Code */}
                          <div className="relative">
                            <div className="w-52 h-52 rounded-2xl overflow-hidden border-2 border-primary/30 p-2 bg-white">
                              <img
                                src={qrUrl}
                                alt="UPI QR Code"
                                className="w-full h-full object-cover rounded-xl"
                              />
                            </div>
                            {/* Corner accents */}
                            <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-primary rounded-tl-lg" />
                            <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-primary rounded-tr-lg" />
                            <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-primary rounded-bl-lg" />
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-primary rounded-br-lg" />
                          </div>

                          <div className="text-center space-y-1">
                            <p className="text-slate-400 text-sm">UPI ID</p>
                            <p className="text-white font-mono font-bold text-base tracking-widest bg-white/5 border border-white/10 px-4 py-2 rounded-xl">cafenova@upi</p>
                          </div>

                          <div className="w-full border-t border-white/5 pt-5 space-y-2 text-sm text-center">
                            <p className="text-slate-500 text-xs">Open any UPI app (GPay, PhonePe, Paytm) and scan the code above</p>
                            <p className="text-primary font-serif text-xl">{formatPrice(totals.total)}</p>
                          </div>

                          <motion.button
                            type="button"
                            onClick={handlePay}
                            disabled={processing}
                            whileHover={!processing ? { scale: 1.02 } : {}}
                            whileTap={!processing ? { scale: 0.98 } : {}}
                            className="w-full py-4 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 disabled:opacity-60"
                          >
                            {processing ? (
                              <><span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Confirming...</>
                            ) : (
                              <><CheckCircle2 size={16} /> I've Paid via UPI</>
                            )}
                          </motion.button>
                        </GlassCard>
                      </motion.div>
                    )}

                    {/* Net Banking */}
                    {payMethod === "netbanking" && (
                      <motion.div key="netbanking" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <GlassCard className="p-8 border-white/5 space-y-6">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold">Select Your Bank</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {BANKS.map((bank) => (
                              <button
                                key={bank.id}
                                type="button"
                                onClick={() => setSelectedBank(bank.id)}
                                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${selectedBank === bank.id ? "border-primary bg-primary/10" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"}`}
                              >
                                <div
                                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[10px] font-black tracking-wider"
                                  style={{ backgroundColor: bank.color + "33", border: `1px solid ${bank.color}55` }}
                                >
                                  <span style={{ color: bank.color }}>{bank.abbr.slice(0, 3)}</span>
                                </div>
                                <span className="text-white text-[10px] font-bold text-center leading-tight">{bank.name}</span>
                                {selectedBank === bank.id && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                              </button>
                            ))}
                          </div>

                          {!selectedBank && (
                            <p className="text-center text-slate-600 text-xs font-bold uppercase tracking-wider">Please select a bank to proceed</p>
                          )}

                          <motion.button
                            type="button"
                            onClick={handlePay}
                            disabled={!selectedBank || processing}
                            whileHover={selectedBank && !processing ? { scale: 1.02 } : {}}
                            whileTap={selectedBank && !processing ? { scale: 0.98 } : {}}
                            className="w-full py-4 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                          >
                            {processing ? (
                              <><span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Redirecting...</>
                            ) : (
                              <><Lock size={14} /> Pay {formatPrice(totals.total)}</>
                            )}
                          </motion.button>
                        </GlassCard>
                      </motion.div>
                    )}

                    {/* Card */}
                    {payMethod === "card" && (
                      <motion.div key="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <GlassCard className="p-8 border-white/5 space-y-5">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold">Card Details</p>

                          {/* Card Preview */}
                          <div className="relative w-full h-44 rounded-2xl p-6 overflow-hidden"
                            style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)" }}>
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 50%)" }} />
                            <div className="flex justify-between items-start mb-8">
                              <div className="w-10 h-7 bg-amber-400/80 rounded-md" />
                              <div className="text-white/40 text-xs font-bold uppercase tracking-widest">CafeNova Pay</div>
                            </div>
                            <p className="text-white font-mono text-lg tracking-[0.2em] mb-4">
                              {card.number || "•••• •••• •••• ••••"}
                            </p>
                            <div className="flex justify-between items-end">
                              <div>
                                <p className="text-white/40 text-[9px] uppercase tracking-widest mb-0.5">Card Holder</p>
                                <p className="text-white text-sm font-bold uppercase tracking-wider">{card.name || "Your Name"}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-white/40 text-[9px] uppercase tracking-widest mb-0.5">Expires</p>
                                <p className="text-white text-sm font-bold">{card.expiry || "MM/YY"}</p>
                              </div>
                            </div>
                          </div>

                          <Field icon={CreditCard} label="Card Number" placeholder="1234 5678 9012 3456"
                            value={card.number}
                            onChange={(v) => setCard((c) => ({ ...c, number: formatCardNumber(v) }))}
                            error={cardErrors.number} />
                          <Field icon={User} label="Cardholder Name" placeholder="Name on card"
                            value={card.name}
                            onChange={(v) => setCard((c) => ({ ...c, name: v }))}
                            error={cardErrors.name} />
                          <div className="grid grid-cols-2 gap-4">
                            <Field icon={CreditCard} label="Expiry (MM/YY)" placeholder="MM/YY"
                              value={card.expiry}
                              onChange={(v) => setCard((c) => ({ ...c, expiry: formatExpiry(v) }))}
                              error={cardErrors.expiry} />
                            <Field icon={Lock} label="CVV" type="password" placeholder="•••"
                              value={card.cvv}
                              onChange={(v) => setCard((c) => ({ ...c, cvv: v.replace(/\D/g, "").slice(0, 4) }))}
                              error={cardErrors.cvv} />
                          </div>

                          <motion.button
                            type="button"
                            onClick={handlePay}
                            disabled={processing}
                            whileHover={!processing ? { scale: 1.02 } : {}}
                            whileTap={!processing ? { scale: 0.98 } : {}}
                            className="w-full py-4 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 disabled:opacity-60"
                          >
                            {processing ? (
                              <><span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Processing...</>
                            ) : (
                              <><Lock size={14} /> Pay {formatPrice(totals.total)}</>
                            )}
                          </motion.button>
                          <p className="text-center text-[10px] text-slate-600 uppercase tracking-widest font-bold flex items-center justify-center gap-1.5">
                            <Lock size={10} /> 256-bit SSL Encrypted
                          </p>
                        </GlassCard>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* ═══════════ RIGHT PANEL — Summary ═══════════ */}
          <motion.div variants={fadeIn("left", 0.3)} initial="initial" animate="animate" className="h-fit">
            <GlassCard className="p-8 border-primary/10">
              <div className="space-y-4 mb-8">
                <h3 className="text-white font-serif text-2xl tracking-wide">Summary</h3>
                <div className="w-12 h-1 bg-primary rounded-full" />
              </div>

              <OrderSummary totals={totals} discounts={discounts} />

              {/* Step 1 CTA */}
              {currentStep === 1 && (
                <div className="space-y-4 pt-8">
                  <motion.button
                    disabled={isEmpty}
                    onClick={() => !isEmpty && setCurrentStep(2)}
                    whileHover={!isEmpty ? { scale: 1.02, backgroundColor: "#6366f1" } : {}}
                    whileTap={!isEmpty ? { scale: 0.98 } : {}}
                    className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/10 ${isEmpty ? "bg-white/5 text-slate-700 cursor-not-allowed" : "bg-primary text-white"}`}
                  >
                    Proceed to Payment <ChevronRight size={18} />
                  </motion.button>
                  <p className="text-[10px] text-center text-slate-600 uppercase tracking-[0.2em] font-bold">Secure 256-bit SSL Payment</p>
                </div>
              )}

              {/* Details on summary during step 2 & 3 */}
              {currentStep >= 2 && (details.name || details.phone || details.email) && (
                <div className="mt-6 pt-6 border-t border-white/5 space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-3">Delivery To</p>
                  {details.name && <p className="text-white text-sm font-bold">{details.name}</p>}
                  {details.phone && <p className="text-slate-400 text-xs">{details.phone}</p>}
                  {details.email && <p className="text-slate-400 text-xs">{details.email}</p>}
                </div>
              )}
            </GlassCard>

            <Link to="/menu" className="flex items-center justify-center gap-2 mt-8 text-slate-500 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Continue Browsing
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Order;
