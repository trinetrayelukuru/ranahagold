"use client";

import React from "react";
import {
  TrendingUp,
  Store,
  BadgePercent,
  Network,
  CalendarCheck,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { franchiseTiers, whyConsiderFranchise } from "@/data/franchiseData";
import FranchiseCard from "./FranchiseCard";

interface FranchiseSectionProps {}

export default function FranchiseSection(_props?: FranchiseSectionProps) {
  return (
    <section id="franchise" className="relative py-16 bg-navy-950/3570 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>GROW WITH RANAHA GOLD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Choose Your Level. Grow with Ranaha Gold.
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Ranaha Gold Company invites entrepreneurs to explore a tiered franchise network. All franchise appointments carry a proposed validity of{" "}
            <strong className="text-gold-300 font-semibold">3 years</strong>, subject to a signed agreement and renewal terms.
          </p>
        </div>

        {/* 4 Franchise Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
          {franchiseTiers.map((tier) => (
            <FranchiseCard
              key={tier.id}
              tier={tier}
              onEnquire={() => {}}
            />
          ))}
        </div>

        {/* Why Consider a Franchise Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 border border-gold-500/30 shadow-navy-card mb-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Why Consider a Franchise?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Strategic advantages of operating under the Ranaha Gold brand and its multi-tiered business structure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyConsiderFranchise.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-navy-950/70 border border-gold-500/15 flex flex-col justify-start"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
                  {idx === 0 && <BadgePercent className="w-5 h-5" />}
                  {idx === 1 && <Store className="w-5 h-5" />}
                  {idx === 2 && <Network className="w-5 h-5" />}
                  {idx === 3 && <CalendarCheck className="w-5 h-5" />}
                </div>
                <h4 className="text-sm font-serif font-bold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Important Franchise Disclosure Banner */}
          <div className="mt-8 p-4 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-start gap-3 text-xs text-gold-200/90 leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-gold-200 font-semibold">Important Policy Notice:</strong>{" "}
              Deposits, setup costs, territorial rights, renewal, revenue ratios, and other obligations must be recorded in a formal signed agreement. The brochure/website does not guarantee earnings or return on investment.
            </div>
          </div>
        </div>

        {/* Detailed Side-by-Side Comparison removed per simplification request */}
      </div>
    </section>
  );
}
