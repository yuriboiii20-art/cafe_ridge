import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Globe, Sparkles } from "lucide-react";
import GlassCard from "../components/ui/GlassCard";
import { fadeIn, staggerContainer } from "../utils/animations";

const Contact = () => {
  const contactInfo = [
    { icon: <Phone size={20} />, title: "Call Us", detail: "+91 96209 96689", sub: "Mon-Fri, 9am-10pm" },
    { icon: <Mail size={20} />, title: "Email Us", detail: "info@codeinnovativetechnologies.com", sub: "Response within 24hrs" },
    { icon: <MapPin size={20} />, title: "Visit Us", detail: "Sector 62, Noida", sub: "Uttar Pradesh, India" },
    { icon: <Clock size={20} />, title: "Hours", detail: "10:00 AM - 11:00 PM", sub: "Open 7 Days a week" },
  ];

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg-main text-white pt-32 pb-20 relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          variants={fadeIn("up", 0.1)}
          className="text-center mb-20"
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="text-primary" size={16} />
            <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold">Get In Touch</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">
            Let’s Start a <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">Conversation</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Whether you're looking to book a private event, inquire about our seasonal menu, 
            or just want to say hi, our team is ready to welcome you.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
          
          {/* 1. Quick Contact Cards */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 h-fit"
          >
            {contactInfo.map((info, index) => (
              <motion.div key={index} variants={fadeIn("right", 0.1 * index)}>
                <GlassCard className="p-6 flex items-center gap-6 group hover:border-primary/40 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-1 font-bold">{info.title}</h4>
                    <p className="text-lg font-medium text-white">{info.detail}</p>
                    <p className="text-[10px] text-slate-600 uppercase font-bold mt-1">{info.sub}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* 2. Interactive Contact Form */}
          <motion.div 
            variants={fadeIn("up", 0.3)}
            className="lg:col-span-2"
          >
            <GlassCard className="p-8 md:p-12 border-white/5">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 group">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold ml-1 group-focus-within:text-primary transition-colors">Full Name</label>
                  <input 
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold ml-1 group-focus-within:text-primary transition-colors">Email Address</label>
                  <input 
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all" 
                    placeholder="john@example.com" 
                  />
                </div>
                <div className="md:col-span-2 space-y-2 group">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold ml-1 group-focus-within:text-primary transition-colors">Subject</label>
                  <select className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all appearance-none">
                    <option className="bg-bg-main">General Inquiry</option>
                    <option className="bg-bg-main">Private Event</option>
                    <option className="bg-bg-main">Catering Services</option>
                    <option className="bg-bg-main">Feedback</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2 group">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold ml-1 group-focus-within:text-primary transition-colors">Your Message</label>
                  <textarea 
                    rows="5"
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all resize-none" 
                    placeholder="How can we help you today?" 
                  />
                </div>

                <div className="md:col-span-2">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-primary hover:bg-primary/80 text-white rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-primary/20 transition-all"
                  >
                    Send Message <Send size={18} />
                  </motion.button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </div>

        {/* 3. Extra Content: FAQ Section */}
        <motion.div 
          variants={fadeIn("up", 0.5)}
          className="mt-32 border-t border-white/5 pt-20"
        >
          <div className="flex items-center gap-4 mb-12">
            <MessageSquare className="text-primary" size={24} />
            <h2 className="text-3xl font-serif">Common Queries</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { q: "Do you offer valet parking?", a: "Yes, we provide complimentary valet parking for all our dinner guests." },
              { q: "Can I host a corporate event?", a: "Absolutely. We have a private lounge equipped for presentations and fine dining." },
              { q: "Is there a dress code?", a: "We recommend smart casual to match the Cafe Ridge atmosphere." }
            ].map((faq, i) => (
              <div key={i} className="space-y-3">
                <h4 className="text-white font-bold flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {faq.q}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;