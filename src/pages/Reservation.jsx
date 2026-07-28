import { motion, useScroll, useTransform } from "framer-motion";
import ReservationForm from "../components/sections/ReservationForm";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Star } from "lucide-react";

const Reservation = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const contactInfo = [
    { icon: <MapPin size={24} />, title: "Visit Us", detail: "B.M Road, Vijaya Nagar", sub: "Ramanagara, Karnataka 562159" },
    { icon: <Phone size={24} />, title: "Call Us", detail: "+91 78927 24453", sub: "Mon - Sun, 10am - 11pm" },
    { icon: <Mail size={24} />, title: "Email Us", detail: "yakhyaqub789@gmail.com", sub: "Response within 24hrs" }
  ];

  const policies = [
    { icon: <Clock size={20} />, text: "15-minute grace period for arrivals" },
    { icon: <ShieldCheck size={20} />, text: "Smart casual dress code required" },
    { icon: <Star size={20} />, text: "VIP lounge available for 8+ guests" }
  ];

  return (
    <div className="pt-40 pb-24 bg-[#020617] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <motion.div style={{ y: y1 }} className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />
      <motion.div style={{ y: y2 }} className="absolute bottom-40 left-[-5%] w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full" />

      {/* 1. Hero Header Section */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24 space-y-6"
        >
          <motion.span 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.4em]"
          >
            Exclusive Dining
          </motion.span>
          <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tight">
            The <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-300 to-white/80">Experience</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-lg font-light leading-relaxed">
            From intimate dinners to grand celebrations, every seat at Cafe Ridge is a journey through flavor and elegance.
          </p>
        </motion.div>

        {/* 2. The Form (Main Action) */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 to-transparent blur-3xl opacity-50 pointer-events-none" />
          <ReservationForm />
        </div>

        {/* 3. Reservation Guidelines */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex flex-wrap justify-center gap-8 border-y border-white/5 py-12"
        >
          {policies.map((p, index) => (
            <div key={index} className="flex items-center gap-3 text-slate-500 hover:text-primary transition-colors cursor-default">
              <span className="p-2 rounded-lg bg-white/5">{p.icon}</span>
              <span className="text-sm font-medium tracking-wide">{p.text}</span>
            </div>
          ))}
        </motion.div>

        {/* 4. Glassmorphic Contact Cards */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          {contactInfo.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-10 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-[2rem] overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <h4 className="text-white font-serif text-xl mb-3">{item.title}</h4>
                <p className="text-white/80 font-medium mb-1">{item.detail}</p>
                <p className="text-slate-500 text-xs uppercase tracking-widest">{item.sub}</p>
              </div>

              {/* Decorative Corner Glow */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary/10 blur-2xl group-hover:bg-primary/30 transition-all" />
            </motion.div>
          ))}
        </div>

        {/* 5. Footer CTA - Operating Hours */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 p-12 rounded-[3rem] bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-2">
            <h3 className="text-2xl font-serif text-white">Opening Hours</h3>
            <p className="text-slate-400">Join us for lunch or dinner, seven days a week.</p>
          </div>
          <div className="flex gap-12">
            <div className="text-center md:text-left">
              <p className="text-primary font-bold text-xs uppercase tracking-tighter mb-1">Weekday</p>
              <p className="text-white text-lg">11:00 — 22:00</p>
            </div>
            <div className="text-center md:text-left border-l border-white/10 pl-12">
              <p className="text-primary font-bold text-xs uppercase tracking-tighter mb-1">Weekend</p>
              <p className="text-white text-lg">10:00 — 23:30</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reservation;