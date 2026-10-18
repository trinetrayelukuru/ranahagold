"use client";

import React, { useState } from "react";
import {
  Layers,
  PieChart,
  ArrowRight,
  ShieldCheck,
  Building,
  CheckCircle2,
  Info,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export default function DepositAllocation() {
  const [activeTier, setActiveTier] = useState<"diamond" | "gold" | "silver">("diamond");

  return (
    <section className="relative py-20 bg-navy-950/60 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5 text-gold-400" />
            <span>TRANSPARENT CAPITAL DISTRIBUTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Franchise Structure & Deposit Allocation
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Clear and documented distribution of non-refundable franchise deposits across regional leadership and head office operations.
          </p>
        </div>

        {/* Platinum Franchise Setup Note Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-950 to-navy-900 border border-slate-400/30 shadow-navy-card mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-200 text-xs font-bold border border-slate-500/40 mb-2">
                <span>Tier 01 Anchor • Platinum Franchise</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Platinum Franchise Deposit — ₹25,00,000 (Non-refundable)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                The Platinum Franchise funds head-office and branch-office setup, coordinates the assigned district / parliamentary territory, and may receive upline benefits and deposit allocations from under-franchisees as set out in the signed agreement.
              </p>
            </div>
            <div className="shrink-0 p-4 rounded-2xl bg-navy-950 border border-gold-500/20 text-center min-w-[200px]">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Proposed Term</span>
              <span className="text-xl font-bold text-gold-300">3 Years</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Subject to agreement</span>
            </div>
          </div>
        </div>

        {/* Interactive Allocation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Diamond Franchise Allocation */}
          <div className="relative p-6 sm:p-7 rounded-3xl bg-navy-900/90 border border-sky-400/40 shadow-navy-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-950/80 text-sky-200 border border-sky-400/40">
                  Diamond Franchise
                </span>
                <span className="text-lg font-bold text-sky-300">₹5,00,000</span>
              </div>

              <h4 className="text-base font-serif font-bold text-white mb-4">
                Deposit Allocation Split
              </h4>

              {/* Breakdown Bars */}
              <div className="space-y-3 mb-6">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-300">Platinum Franchise:</span>
                    <span className="font-bold text-slate-100">₹2,00,000 (40%)</span>
                  </div>
                  <div className="w-full bg-navy-950 rounded-full h-2.5 overflow-hidden border border-gold-500/20">
                    <div className="bg-gradient-to-r from-slate-200 to-slate-400 h-full rounded-full" style={{ width: "40%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-300">Head Office:</span>
                    <span className="font-bold text-slate-100">₹3,00,000 (60%)</span>
                  </div>
                  <div className="w-full bg-navy-950 rounded-full h-2.5 overflow-hidden border border-gold-500/20">
                    <div className="bg-gradient-to-r from-gold-400 to-amber-500 h-full rounded-full" style={{ width: "60%" }} />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gold-500/20 text-xs text-slate-400 space-y-1">
                <p>• Office setup cost is additional.</p>
                <p>• Up to 6 regional branches proposed.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-sky-400/20 flex justify-between items-center text-xs">
              <span className="text-slate-400">Total Allocated:</span>
              <span className="font-bold text-white text-sm">₹5,00,000</span>
            </div>
          </div>

          {/* Gold Franchise Allocation */}
          <div className="relative p-6 sm:p-7 rounded-3xl bg-navy-900/90 border border-gold-500/40 shadow-gold-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-950/80 text-amber-200 border border-amber-400/40">
                  Gold Franchise
                </span>
                <span className="text-lg font-bold text-gold-300">₹2,00,000</span>
              </div>

              <h4 className="text-base font-serif font-bold text-white mb-4">
                Deposit Allocation Split
              </h4>

              {/* Breakdown Bars */}
              <div className="space-y-3 mb-6">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-300">Platinum Franchise:</span>
                    <span className="font-bold text-slate-100">₹50,000 (25%)</span>
                  </div>
                  <div className="w-full bg-navy-950 rounded-full h-2.5 overflow-hidden border border-gold-500/20">
                    <div className="bg-gradient-to-r from-slate-200 to-slate-400 h-full rounded-full" style={{ width: "25%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-300">Gold Franchise:</span>
                    <span className="font-bold text-slate-100">₹50,000 (25%)</span>
                  </div>
                  <div className="w-full bg-navy-950 rounded-full h-2.5 overflow-hidden border border-gold-500/20">
                    <div className="bg-gradient-to-r from-gold-300 to-gold-500 h-full rounded-full" style={{ width: "25%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-300">Head Office:</span>
                    <span className="font-bold text-slate-100">₹1,00,000 (50%)</span>
                  </div>
                  <div className="w-full bg-navy-950 rounded-full h-2.5 overflow-hidden border border-gold-500/20">
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-600 h-full rounded-full" style={{ width: "50%" }} />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gold-500/20 text-xs text-slate-400 space-y-1">
                <p>• Compact local setup.</p>
                <p>• Full-scale office not required.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gold-500/20 flex justify-between items-center text-xs">
              <span className="text-slate-400">Total Allocated:</span>
              <span className="font-bold text-white text-sm">₹2,00,000</span>
            </div>
          </div>

          {/* Silver Franchise Allocation */}
          <div className="relative p-6 sm:p-7 rounded-3xl bg-navy-900/90 border border-slate-500/40 shadow-navy-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900 text-slate-200 border border-slate-600">
                  Silver Franchise
                </span>
                <span className="text-lg font-bold text-slate-200">₹50,000</span>
              </div>

              <h4 className="text-base font-serif font-bold text-white mb-4">
                Deposit Allocation Split
              </h4>

              {/* Breakdown Bars */}
              <div className="space-y-3 mb-6">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-300">Platinum Franchise:</span>
                    <span className="font-bold text-slate-100">₹10,000 (20%)</span>
                  </div>
                  <div className="w-full bg-navy-950 rounded-full h-2.5 overflow-hidden border border-gold-500/20">
                    <div className="bg-slate-300 h-full rounded-full" style={{ width: "20%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-300">Silver Franchise:</span>
                    <span className="font-bold text-slate-100">₹10,000 (20%)</span>
                  </div>
                  <div className="w-full bg-navy-950 rounded-full h-2.5 overflow-hidden border border-gold-500/20">
                    <div className="bg-slate-400 h-full rounded-full" style={{ width: "20%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-300">Gold Franchise:</span>
                    <span className="font-bold text-slate-100">₹10,000 (20%)</span>
                  </div>
                  <div className="w-full bg-navy-950 rounded-full h-2.5 overflow-hidden border border-gold-500/20">
                    <div className="bg-gold-500 h-full rounded-full" style={{ width: "20%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-300">Head Office:</span>
                    <span className="font-bold text-slate-100">₹20,000 (40%)</span>
                  </div>
                  <div className="w-full bg-navy-950 rounded-full h-2.5 overflow-hidden border border-gold-500/20">
                    <div className="bg-amber-600 h-full rounded-full" style={{ width: "40%" }} />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700/60 text-xs text-slate-400 space-y-1">
                <p>• Basic premises & computer.</p>
                <p>• Low-infrastructure village model.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/60 flex justify-between items-center text-xs">
              <span className="text-slate-400">Total Allocated:</span>
              <span className="font-bold text-white text-sm">₹50,000</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400 italic">
            *All franchise deposits are non-refundable and subject to the formal terms outlined in the signed franchise agreement.
          </p>
        </div>
      </div>
    </section>
  );
}
