import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you use react-router
import { fadeIn, staggerContainer } from "../../utils/animations";
import { ArrowRight, MessageSquare, UtensilsCrossed, ChevronRight } from "lucide-react";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b", // Cocktail/Atmosphere
  "https://images.unsplash.com/photo-1559339352-11d035aa65de", // Fine Dining Dish
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0", // Restaurant Interior
];

const Hero = () => {
  const [currentImg, setCurrentImg] = useState(0);

  // Automatic Background Switcher
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-bg-main">
      
      {/* Dynamic Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImg}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-bg-main/80 via-bg-main/40 to-bg-main z-10" />
            <img 
              src={HERO_IMAGES[currentImg]} 
              className="w-full h-full object-cover"
              alt="Cafe Ridge Ambiance"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-6 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
        
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            variants={fadeIn("down", 0.2)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest mb-8 mx-auto lg:mx-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            NOW OPEN IN SECTOR 62, NOIDA
          </motion.div>

          <motion.h1 
            variants={fadeIn("up", 0.4)}
            className="text-6xl md:text-8xl font-serif text-white mb-6 leading-[1.05]"
          >
            Taste the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-300 italic">Future</span> <br /> 
            of Fine Dining.
          </motion.h1>

          <motion.p 
            variants={fadeIn("up", 0.6)}
            className="text-lg text-slate-400 max-w-xl mb-12 mx-auto lg:mx-0 leading-relaxed"
          >
            Experience a symphony of molecular gastronomy and traditional flavors. 
            Designed for the modern palate, crafted for the soul.
          </motion.p>

          {/* Button Grid - 4 Buttons Total */}
          <motion.div 
            variants={fadeIn("up", 0.8)}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            {/* CTA 1: Must Try */}
            <Link to="/menu?section=must-try" className="group relative px-8 py-4 bg-primary rounded-2xl font-bold text-white overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(99,102,241,0.4)]">
              <span className="relative z-10 flex items-center gap-2">
                <UtensilsCrossed size={18} /> Must Try <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* CTA 2: Contact */}
            <Link to="/contact" className="group px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl font-bold text-white transition-all hover:bg-white/10 hover:border-primary/50 flex items-center gap-2">
              <MessageSquare size={18} /> Contact Us
            </Link>

            {/* Secondary Rows */}
            <div className="w-full flex gap-6 justify-center lg:justify-start mt-4 pt-6 border-t border-white/5">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-white font-serif text-xl font-bold italic">4.9/5</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Google Rating</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-white font-serif text-xl font-bold italic">Michelin</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Inspired Menu</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Decorative Side Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden lg:block relative"
        >
          <div className="glass-indigo p-8 rounded-[2.5rem] border border-white/10 relative z-20">
            <h3 className="text-white font-serif text-2xl mb-4 italic">Chef's Special</h3>
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c" 
              className="w-full h-64 object-cover rounded-2xl mb-6 grayscale hover:grayscale-0 transition-all duration-700"
              alt="Salmon Special"
            />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-bold">Wild Glazed Salmon</p>
                <p className="text-primary text-sm">Served with Truffle Mash</p>
              </div>
              <span className="text-white font-serif text-2xl">₹425</span>
            </div>
          </div>
          {/* Circular Text Animation could go here */}
        </motion.div>
      </div>

      {/* Elegant Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 12, 0] }} 
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/20 uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;