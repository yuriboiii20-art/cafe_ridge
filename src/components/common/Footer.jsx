import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { 
  MapPin, Phone, Send, ArrowUp, Mail, Globe, 
  ShieldCheck, Clock, ExternalLink, Sparkles 
} from "lucide-react";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import LogoIcon from "./LogoIcon";
import { cn } from "../../utils/utils"; // Assuming you have a cn utility

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Real-time clock update for the "Status Indicator"
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Reservation", path: "/reservation" },
    { name: "Order", path: "/order" },
    { name: "Contact", path: "/contact" }
  ];

  const socialLinks = [
    { Icon: FaInstagram, href: "https://www.instagram.com/yaqubbb?igsh=aWNrN3hvZnM3Zmxk", color: "hover:text-pink-500", label: "Instagram" },
    { Icon: FaFacebook, href: "https://www.facebook.com/share/18bLP7EB1a/", color: "hover:text-blue-600", label: "Facebook" },
    { Icon: FaTwitter, href: "#", color: "hover:text-sky-400", label: "Twitter" },
    { Icon: FaLinkedin, href: "https://www.linkedin.com/in/yakhoob-ahmed-086922277", color: "hover:text-blue-700", label: "LinkedIn" },
  ];

  return (
    <footer className="relative bg-[#020617] pt-32 pb-8 overflow-hidden border-t border-white/5">
      {/* --- Advanced Background FX --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-amber-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* 1. Holographic Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-24 group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-amber-500/30 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
          <div className="relative bg-slate-950/80 backdrop-blur-3xl rounded-[2.8rem] border border-white/10 p-8 md:p-16 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center lg:text-left space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                  <Sparkles size={12} /> The Inner Circle
                </div>
                <h3 className="text-4xl md:text-6xl font-serif text-white">
                  Experience the <span className="italic text-primary-light">Extraordinary</span>
                </h3>
                <p className="text-slate-400 text-lg">
                  Subscribe to receive secret tasting menus and private gallery invites.
                </p>
              </div>

              <form className="relative w-full max-w-lg group/input" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-6 text-white outline-none focus:ring-2 ring-primary/20 focus:border-primary/50 transition-all text-lg"
                />
                <button className="mt-4 md:mt-0 md:absolute md:right-2 md:top-2 md:bottom-2 bg-primary hover:bg-primary-dark text-white px-10 rounded-xl transition-all flex items-center justify-center gap-2 font-black uppercase text-xs tracking-widest shadow-2xl shadow-primary/40">
                  Join <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* 2. Main Footer Grid (Advanced Responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20 mb-20">
          
          {/* Brand & Socials */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 p-1.5 flex items-center justify-center">
                  <LogoIcon className="w-full h-full text-primary" />
                </div>
                <h2 className="text-4xl font-black tracking-tighter text-white">
                  CAFE<span className="text-primary italic">RIDGE</span>
                </h2>
              </div>
              <p className="text-primary/90 font-serif italic text-sm tracking-wider">
                Rise to the ridge
              </p>
              <p className="text-slate-400 leading-relaxed text-base">
                Synthesizing avant-garde culinary techniques with digital sophistication. A sanctuary for the modern connoisseur.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {socialLinks.map(({ Icon, href, color, label }) => (
                <MagneticButton key={label}>
                  <a
  href={href}
  target="_blank"
  rel="noopener noreferrer"
  className={cn(
    "w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center",
    color,
    "hover:bg-primary/10 hover:border-primary/30"
  )}
>
  <Icon size={20} />
</a>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Navigation with Animated Underlines */}
          <div className="lg:pl-10">
            <h4 className="text-white font-serif text-xl mb-10 flex items-center gap-3">
              <Globe size={20} className="text-primary" /> Navigation
            </h4>
            <ul className="grid grid-cols-1 gap-6">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => cn(
                      "relative text-base tracking-wide transition-colors duration-300 py-1 inline-block",
                      isActive ? "text-primary font-bold" : "text-slate-500 hover:text-white"
                    )}
                  >
                    {({ isActive }) => (
                      <>
                        {item.name}
                        {isActive && (
                          <motion.div layoutId="underline" className="absolute left-0 bottom-0 w-full h-[2px] bg-primary rounded-full" />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Contact (Interactive) */}
          <div className="lg:col-span-2 space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <h4 className="text-white font-serif text-xl flex items-center gap-3">
                <MapPin size={20} className="text-primary" /> The Venue
              </h4>
              <div className="text-xs font-mono text-primary/60 bg-primary/5 px-4 py-2 rounded-lg border border-primary/10">
                Lat: 12.7153° N | Long: 77.2838° E
              </div>
            </div>

            <div className="relative h-64 w-full rounded-[2.5rem] overflow-hidden group shadow-inner">
               <div className="absolute inset-0 bg-primary/20 mix-blend-color pointer-events-none z-10 opacity-40 group-hover:opacity-0 transition-opacity duration-700" />
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3893.355152341203!2d77.2816!3d12.7153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bfa353b3b3b3b3b%3A0x3b3b3b3b3b3b3b3b!2sB.M%20Road%2C%20Vijaya%20Nagar%2C%20Ramanagara%2C%20Karnataka%20562159!5e0!3m2!1sen!2sin!4v1753616000000!5m2!1sen!2sin"
                className="w-full h-full grayscale hover:grayscale-0 contrast-125 transition-all duration-1000 scale-105 group-hover:scale-100"
                loading="lazy"
              />
              <button className="absolute bottom-6 right-6 z-20 bg-white text-black p-4 rounded-full shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                <ExternalLink size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* 3. The "Meta" Bar (Live Status & Metrics) */}
        <div className="pt-12 border-t border-white/5 flex flex-col xl:flex-row justify-between items-center gap-10">
          
          {/* Live Status Engine */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-4 bg-slate-900/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/5 shadow-xl">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white">Live Service</span>
                <span className="text-[9px] text-slate-500 font-mono italic">
                  Kitchen Active • B.M Road, Ramanagara – 562159
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3 text-slate-400 font-mono text-xs">
              <Clock size={14} className="text-primary" />
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
          </div>

          {/* Core Links & Legal */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <Link to="/accessibility" className="hover:text-primary transition-colors">Accessibility</Link>
            </div>

            <motion.button 
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white transition-all group"
            >
              <span className="text-[10px] font-black uppercase tracking-widest">Back to Top</span>
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </div>
        </div>

        {/* Final Encrypted Brand Mark */}
        <div className="mt-16 text-center border-t border-white/[0.02] pt-8">
           <div className="flex items-center justify-center gap-3 text-slate-700">
              <ShieldCheck size={14} className="opacity-20" />
              <p className="text-[9px] uppercase font-black tracking-[0.5em] opacity-30">
                Secured Digital Environment <span className="text-primary mx-2">•</span> Design by Satyam
              </p>
           </div>
        </div>
      </div>
    </footer>
  );
};

/* --- Advanced Magnetic Interaction Component --- */
const MagneticButton = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const mouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  return (
    <motion.div
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

export default Footer;
