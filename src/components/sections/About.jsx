import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeIn, staggerContainer } from "../../utils/animations";
import { Utensils, Award, Leaf, Zap } from "lucide-react";

// Custom Counter remains for stability
const StatCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  const coreValues = [
    { icon: <Leaf size={20} />, title: "Organic Only", desc: "Sourced from local Vedic farms." },
    { icon: <Zap size={20} />, title: "Modern Tech", desc: "Precision sous-vide techniques." },
    { icon: <Award size={20} />, title: "Elite Chefs", desc: "Mentored by Michelin stars." },
    { icon: <Utensils size={20} />, title: "Pure Taste", desc: "No artificial enhancers, ever." },
  ];

  return (
    <section id="about" className="py-32 bg-bg-main relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          
          {/* LEFT: Visual Composition */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf"
                alt="Chef at Work"
                className="w-full h-[650px] object-cover hover:scale-105 transition-transform duration-1000"
              />
              {/* Glass Overlay Card */}
              <div className="absolute bottom-8 left-8 right-8 glass-indigo p-6 rounded-2xl border border-white/10">
                <p className="text-white font-serif italic text-lg text-center">
                  "Cooking is not just a skill, it's a language of the soul."
                </p>
              </div>
            </div>
            
            {/* Floating Achievement Badge */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-primary rounded-full flex flex-col items-center justify-center border-4 border-bg-main shadow-xl z-20"
            >
              <span className="text-white font-bold text-3xl">TOP 1</span>
              <span className="text-white/80 text-[10px] uppercase tracking-tighter">Bistro in Noida</span>
            </motion.div>
          </motion.div>

          {/* RIGHT: Content Narrative */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.span variants={fadeIn("up", 0.1)} className="text-primary font-bold tracking-[0.4em] text-xs uppercase mb-4 block">
              The Cafe Ridge Legacy
            </motion.span>

            <motion.h2 variants={fadeIn("up", 0.2)} className="text-5xl md:text-6xl font-serif text-white mb-8 leading-[1.1]">
              Redefining the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-300">Dining Protocol.</span>
            </motion.h2>

            <motion.div variants={fadeIn("up", 0.3)} className="space-y-6 text-slate-400 mb-12">
              <p className="text-lg">
                Born in the heart of Noida's tech hub, Cafe Ridge was built for the dreamers, the coders, and the creators. We realized that elite minds require elite fuel.
              </p>
              <p>
                Our kitchen functions like a high-performance engine. We analyze flavor profiles using molecular Gastronomy to ensure every bite triggers the perfect sensory response. We aren't just serving food; we are serving inspiration.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 border-y border-white/5 py-10 mb-12">
              <div>
                <h4 className="text-white text-3xl font-serif mb-1"><StatCounter end={12} suffix="+" /></h4>
                <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Years Exp</p>
              </div>
              <div>
                <h4 className="text-white text-3xl font-serif mb-1"><StatCounter end={85} suffix="+" /></h4>
                <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Chef Artists</p>
              </div>
              <div>
                <h4 className="text-white text-3xl font-serif mb-1"><StatCounter end={150} suffix="k" /></h4>
                <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Guests</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM: Values Grid (New Content) */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8"
        >
          {coreValues.map((value, i) => (
            <motion.div 
              key={i}
              variants={fadeIn("up", 0.1 * i)}
              className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-primary/40 transition-all group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                {value.icon}
              </div>
              <h5 className="text-white font-bold mb-3">{value.title}</h5>
              <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;