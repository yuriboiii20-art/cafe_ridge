import React from "react";
import { Accessibility as AccessibleIcon, Globe, UserCheck } from "lucide-react";

const Accessibility = () => {
  return (
    <main className="pt-32 pb-24 bg-bg-main min-height-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-16 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Inclusive <span className="italic text-primary">Design</span></h1>
          <p className="text-slate-400">Our commitment to an equitable experience for everyone.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8">
            <AccessibleIcon className="text-primary mb-4" size={32} />
            <h3 className="text-xl text-white font-serif mb-2">Digital Access</h3>
            <p className="text-slate-400 text-sm">Our website is designed following WCAG 2.1 Level AA standards. We use semantic HTML, ARIA labels, and high-contrast modes to ensure usability for screen readers.</p>
          </div>
          <div className="glass-card p-8">
            <Globe className="text-primary mb-4" size={32} />
            <h3 className="text-xl text-white font-serif mb-2">Physical Venue</h3>
            <p className="text-slate-400 text-sm">Our Noida location features ramp access, braille menus upon request, and adjustable lighting zones for guests with sensory sensitivities.</p>
          </div>
        </div>

        <section className="text-slate-300">
          <h2 className="text-2xl text-white font-serif mb-4 flex items-center gap-3">
            <UserCheck className="text-primary" /> Continuous Improvement
          </h2>
          <p>If you encounter any barriers on our platform, please reach out to our experience designers at <span className="text-primary">accessibility@Cafe Ridge.com</span>. We treat accessibility feedback as a priority bug.</p>
        </section>
      </div>
    </main>
  );
};

export default Accessibility;