import React from "react";
import { Scale, Clock, AlertCircle } from "lucide-react";

const Terms = () => {
  return (
    <main className="pt-32 pb-24 bg-bg-main min-height-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Service <span className="italic text-primary">Agreement</span></h1>
          <p className="text-slate-400">Last Updated: April 2026</p>
        </header>

        <section className="space-y-12 text-slate-300 leading-relaxed">
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-2xl text-white font-serif mb-4 flex items-center gap-3">
              <Clock className="text-primary" /> Reservation Policy
            </h2>
            <p>Reservations at Cafe Ridge are held for a maximum of 15 minutes past the scheduled time. Late arrivals may result in a forfeited table or a shift to our waitlist.</p>
          </div>

          <div>
            <h2 className="text-2xl text-white font-serif mb-4 flex items-center gap-3">
              <Scale className="text-primary" /> Intellectual Property
            </h2>
            <p>All digital assets, code (including the "Boxes" background and "Magnetic" interaction scripts), and culinary designs are the exclusive property of Cafe Ridge. Unauthorized replication is prohibited.</p>
          </div>

          <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
             <h2 className="text-xl text-white font-bold mb-2 flex items-center gap-2">
               <AlertCircle size={18} className="text-primary" /> Limitation of Liability
             </h2>
             <p className="text-sm text-slate-400 italic">Cafe Ridge provides this digital platform "as is." We are not liable for any digital interruptions or inaccuracies in real-time kitchen status displays.</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Terms;