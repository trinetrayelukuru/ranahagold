"use client";

import React from "react";
import {
  TrendingUp,
  Percent,
  Coins,
  Scale,
  CreditCard,
  ShieldAlert,
  Sparkles,
  Info,
} from "lucide-react";
import { coreCommissionRates, commissionPolicyNotes } from "@/data/commissionData";
import BenefitSharingChain from "./BenefitSharingChain";
import GoldMembershipCommission from "./GoldMembershipCommission";

export default function CommissionSection() {
  return (
    <section id="commission" className="relative py-24 bg-navy-950/3580 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-3">
            <Percent className="w-3.5 h-3.5 text-gold-400" />
            <span>COMMISSION & BENEFITS STRUCTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Transparent Commission Architecture
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Standard core business commission rates and structured ground-up benefit-sharing applicable to all eligible franchise levels.
          </p>
        </div>

        {/* 1. Core Business Commission Cards Grid */}
        <div className="mb-8">
          <div className="text-center sm:text-left mb-6">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-gold-400">
              Section 01
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              Core Business Commission Rates
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Applicable to all eligible franchise levels based on qualifying transaction value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreCommissionRates.map((item, idx) => (
              <div
                key={item.id}
                className="relative p-7 rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 border border-gold-500/30 hover:border-gold-400/60 shadow-navy-card transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                    {idx === 0 && <Coins className="w-5 h-5" />}
                    {idx === 1 && <Scale className="w-5 h-5" />}
                    {idx === 2 && <CreditCard className="w-5 h-5" />}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-2 py-0.5 rounded bg-navy-950 border border-slate-700">
                    Core Rate 0{idx + 1}
                  </span>
                </div>

                <h4 className="text-lg font-serif font-bold text-white mb-2">
                  {item.activity}
                </h4>

                <div className="my-4">
                  <div className="text-4xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-300 to-gold-500">
                    {item.rateFormatted}
                  </div>
                  <div className="text-xs font-semibold text-gold-300/90 mt-1">
                    {item.basis}
                  </div>
                </div>

                <p className="text-xs text-slate-400 pt-4 border-t border-gold-500/15 leading-relaxed">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Ground-Up Benefit-Sharing Chain */}
        <BenefitSharingChain />

        {/* 3. Gold Membership Card Commission */}
        <GoldMembershipCommission />

        {/* 4. Official Commission Policy Notes & Legal Disclaimers */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-navy-900/60 border border-gold-500/20">
          <div className="flex items-center gap-2 text-gold-400 font-serif font-bold text-base mb-4">
            <ShieldAlert className="w-5 h-5" />
            <span>Important Commission Policy Disclosures</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            {commissionPolicyNotes.map((note, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-navy-950/70 border border-gold-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{note}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gold-500/20 text-[11px] text-slate-400 text-center italic">
            *No earnings or returns are guaranteed. All terms are subject to company policy, signed agreements, and applicable regulatory laws.
          </div>
        </div>
      </div>
    </section>
  );
}
