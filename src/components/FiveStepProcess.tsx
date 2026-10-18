"use client";

import React, { useState } from "react";
import { CheckCircle2, FileCheck, Scale, ShieldCheck, Coins } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Verification",
    subtitle: "Documents required are provided",
    icon: FileCheck,
    desc: "Government-issued photo ID (Aadhaar / PAN / Passport / Voter ID) is required. Proof of ownership is provided if requested. A recent photograph is taken for records.",
  },
  {
    id: 2,
    title: "Evaluation & Valuation",
    subtitle: "Your gold is tested and valued",
    icon: Scale,
    desc: "XRF purity testing is performed in the customer's presence. Weight is measured on calibrated scales. The estimated value is calculated live using today's purchase rate.",
  },
  {
    id: 3,
    title: "Approval",
    subtitle: "You decide on the sale",
    icon: ShieldCheck,
    desc: "After evaluation and valuation, the customer decides whether to proceed with the sale. No obligation to sell is imposed.",
  },
  {
    id: 4,
    title: "Melting",
    subtitle: "Final testing and correction",
    icon: Coins,
    desc: "Approved gold is melted for final testing. Final weight and purity are re-confirmed. Any correction to the earlier estimate is shared and applied.",
  },
  {
    id: 5,
    title: "Payment",
    subtitle: "Transaction with all formalities",
    icon: CheckCircle2,
    desc: "Payment via IMPS / NEFT / RTGS. A digital receipt is issued. All documentation and formalities are completed.",
  },
];

export default function FiveStepProcess() {
  const [active, setActive] = useState(1);
  const current = steps.find((s) => s.id === active) || steps[0];
  const IconComp = current.icon;

  return (
    <section id="process" className="relative py-24 bg-navy-950/3580 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-mono font-bold tracking-[0.2em] text-gold-400">Our Process</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mt-3">
            From Gold to Payment
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">Five clear steps. No surprises.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Step Selector */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step) => {
              const StepIcon = step.icon;
              const isActive = step.id === active;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActive(step.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 group ${
                    isActive
                      ? "bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 border-gold-400 shadow-gold-md"
                      : "bg-navy-950/60 border-gold-500/15 hover:border-gold-500/40"
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? "bg-gold-500/20 text-gold-300 border border-gold-400" : "bg-navy-900 text-slate-400 border border-slate-700"
                      }`}
                    >
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`text-xs font-mono font-bold uppercase tracking-wider ${isActive ? "text-gold-300" : "text-slate-500"}`}>
                        Step {step.id}
                      </div>
                      <h3 className={`text-base font-serif font-bold ${isActive ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                        {step.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">{step.subtitle}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Detail Panel */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-navy-900 via-navy-950 to-navy-900 border border-gold-500/30 shadow-gold-md transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-300 shadow-gold-sm">
                  <IconComp className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400">Step {current.id}</div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">{current.title}</h3>
                  <p className="text-xs text-gold-300/90">{current.subtitle}</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{current.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}