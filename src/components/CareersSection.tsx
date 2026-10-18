"use client";

import React, { useState } from "react";
import CareersModal from "./CareersModal";

export default function CareersSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="careers" className="relative py-24 bg-navy-950/35 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
            Join Our Team
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Build your journey with <span className="text-gold-300 font-medium">RANAHA Gold Company</span>. We are always looking for motivated people who want to grow with a trusted gold-services brand.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 border border-gold-500/30 shadow-navy-card text-center space-y-6">
            <h3 className="font-serif font-bold text-2xl text-gold-200">Start Your Application</h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Select your state and district, complete your details, and submit your profile. Our team will reach out to discuss the next steps.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-300 to-gold-500 shadow-gold-sm hover:shadow-gold-md transition-all duration-300 transform hover:-translate-y-0.5"
              aria-label="Apply Now for Careers"
            >Coming Soon</button>
          </div>
        </div>
      </div>

      <CareersModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
