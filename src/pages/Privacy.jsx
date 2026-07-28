import React from "react";
import { ShieldCheck, Lock, Eye, Database } from "lucide-react";

const Privacy = () => {
  return (
    <main className="pt-32 pb-24 bg-bg-main min-height-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Privacy <span className="italic text-primary">Protocol</span></h1>
          <p className="text-slate-400">Effective Date: April 8, 2026</p>
        </header>

        <section className="space-y-12 text-slate-300 leading-relaxed">
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-2xl text-white font-serif mb-4 flex items-center gap-3">
              <Eye className="text-primary" /> Data Collection
            </h2>
            <p>We collect information necessary to provide an elite dining experience. This includes:</p>
            <ul className="list-disc ml-6 mt-4 space-y-2 text-slate-400">
              <li>Identity Data: Name, contact details, and dietary preferences.</li>
              <li>Transaction Data: Reservation history and payment confirmations via encrypted gateways.</li>
              <li>Technical Data: IP address and browser type collected via our "Custom Cursor" and analytics.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl text-white font-serif mb-4 flex items-center gap-3">
              <Lock className="text-primary" /> Data Protection
            </h2>
            <p>Cafe Ridge employs AES-256 encryption for all data at rest. Your personal information is treated as a premium asset, stored securely within our "Encrypted Experience Design" framework.</p>
          </div>

          <div>
            <h2 className="text-2xl text-white font-serif mb-4 flex items-center gap-3">
              <Database className="text-primary" /> Third-Party Disclosure
            </h2>
            <p>We do not sell your data. We only share information with verified partners (e.g., Stripe for payments, Google Maps for location) to facilitate your visit.</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Privacy;