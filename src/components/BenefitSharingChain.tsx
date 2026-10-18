"use client";

import React, { useState } from "react";
import {
  ArrowUp,
  Percent,
  Sparkles,
  Calculator,
  Info,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { groundUpBenefitChain } from "@/data/commissionData";
import { formatINR } from "@/lib/utils";

export default function BenefitSharingChain() {
  // Interactive Simulation Input
  const [sampleBaseCommission, setSampleBaseCommission] = useState<number>(10000);

  // Calculate ground-up cascade
  const silverComm = sampleBaseCommission; // Silver gets base
  const goldComm = silverComm * 0.05; // Gold gets 5% of Silver
  const diamondComm = goldComm * 0.05; // Diamond gets 5% of Gold
  const platinumComm = diamondComm * 0.05; // Platinum gets 5% of Diamond

  return (
    <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-navy-900/90 via-navy-950 to-navy-900 border border-gold-500/30 shadow-navy-card">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-2">
          <ArrowUp className="w-3.5 h-3.5 text-gold-400" />
          <span>GROUND-UP BENEFIT-SHARING HIERARCHY</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
          Multi-Tier Ground-Up Benefit Sharing Chain
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">
          For business generated at the Silver Franchise (village) level, each higher level receives 5% of the commission amount earned by the immediately lower level (not 5% of the gross transaction value).
        </p>
      </div>

      {/* Visual Hierarchy Diagram */}
      <div className="max-w-4xl mx-auto space-y-4 mb-12">
        {/* Tier 4: Platinum Franchise */}
        <div className="relative p-5 rounded-2xl bg-navy-900 border border-slate-400/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="w-8 h-8 rounded-full bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center border border-slate-500">
              04
            </span>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Top District Level
              </div>
              <h4 className="text-base sm:text-lg font-serif font-bold text-white">
                Platinum Franchise
              </h4>
            </div>
          </div>
          <div className="text-left md:text-right">
            <div className="text-xs font-bold text-gold-300">
              5% of Diamond Franchise Commission
            </div>
            <div className="text-[11px] text-slate-400">
              Calculated on the commission earned by the Diamond Franchise
            </div>
          </div>
        </div>

        {/* Upward Arrow */}
        <div className="flex justify-center my-1">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-950 border border-gold-500/30 text-gold-400 text-[11px] font-semibold">
            <ArrowUp className="w-3 h-3 text-gold-400" />
            <span>5% of Diamond Commission flows to Platinum</span>
          </div>
        </div>

        {/* Tier 3: Diamond Franchise */}
        <div className="relative p-5 rounded-2xl bg-navy-900 border border-sky-400/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="w-8 h-8 rounded-full bg-sky-900 text-sky-200 font-bold text-xs flex items-center justify-center border border-sky-500">
              03
            </span>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-sky-400">
                Regional Level
              </div>
              <h4 className="text-base sm:text-lg font-serif font-bold text-white">
                Diamond Franchise
              </h4>
            </div>
          </div>
          <div className="text-left md:text-right">
            <div className="text-xs font-bold text-sky-300">
              5% of Gold Franchise Commission
            </div>
            <div className="text-[11px] text-slate-400">
              Calculated on the commission earned by the Gold Franchise
            </div>
          </div>
        </div>

        {/* Upward Arrow */}
        <div className="flex justify-center my-1">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-950 border border-gold-500/30 text-gold-400 text-[11px] font-semibold">
            <ArrowUp className="w-3 h-3 text-gold-400" />
            <span>5% of Gold Commission flows to Diamond</span>
          </div>
        </div>

        {/* Tier 2: Gold Franchise */}
        <div className="relative p-5 rounded-2xl bg-navy-900 border border-gold-500/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="w-8 h-8 rounded-full bg-amber-900 text-amber-200 font-bold text-xs flex items-center justify-center border border-amber-500">
              02
            </span>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-gold-400">
                Mandal Level
              </div>
              <h4 className="text-base sm:text-lg font-serif font-bold text-white">
                Gold Franchise
              </h4>
            </div>
          </div>
          <div className="text-left md:text-right">
            <div className="text-xs font-bold text-gold-300">
              5% of Silver Franchise Commission
            </div>
            <div className="text-[11px] text-slate-400">
              Calculated on the village-level commission amount
            </div>
          </div>
        </div>

        {/* Upward Arrow */}
        <div className="flex justify-center my-1">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-950 border border-gold-500/30 text-gold-400 text-[11px] font-semibold">
            <ArrowUp className="w-3 h-3 text-gold-400" />
            <span>5% of Silver Commission flows to Gold</span>
          </div>
        </div>

        {/* Tier 1: Silver Franchise */}
        <div className="relative p-5 rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border border-slate-500/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="w-8 h-8 rounded-full bg-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center border border-slate-600">
              01
            </span>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Ground / Village Level
              </div>
              <h4 className="text-base sm:text-lg font-serif font-bold text-white">
                Silver Franchise
              </h4>
            </div>
          </div>
          <div className="text-left md:text-right">
            <div className="text-xs font-bold text-slate-200">
              Base / Ground-Level Commission
            </div>
            <div className="text-[11px] text-slate-400">
              Receives core commission (1.50% Buying, 1.00% Sales, 0.25% Pledging)
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Flow Simulator */}
      <div className="p-6 sm:p-8 rounded-2xl bg-navy-950 border border-gold-500/30 shadow-inner">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-gold-500/20 mb-6">
          <div className="flex items-center gap-2 text-gold-400">
            <Calculator className="w-5 h-5" />
            <h4 className="text-base font-bold text-white">
              Interactive 5% Cascade Calculation Simulator
            </h4>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Sample Village Commission:</span>
            <div className="flex items-center gap-1">
              {[5000, 10000, 25000].map((val) => (
                <button
                  key={val}
                  onClick={() => setSampleBaseCommission(val)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                    sampleBaseCommission === val
                      ? "bg-gold-500 text-navy-950"
                      : "bg-navy-900 text-slate-300 hover:bg-navy-800 border border-gold-500/20"
                  }`}
                >
                  ₹{val.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculated Results Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-navy-900/90 border border-slate-600">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
              Silver Franchise (Base)
            </div>
            <div className="text-xl font-bold text-white">{formatINR(silverComm)}</div>
            <div className="text-[10px] text-slate-400 mt-1">Direct Village Commission</div>
          </div>

          <div className="p-4 rounded-xl bg-navy-900/90 border border-gold-500/30">
            <div className="text-[10px] uppercase font-bold text-gold-400 mb-1">
              Gold Franchise (5%)
            </div>
            <div className="text-xl font-bold text-gold-300">{formatINR(goldComm, true)}</div>
            <div className="text-[10px] text-slate-400 mt-1">5% of ₹{silverComm.toLocaleString("en-IN")}</div>
          </div>

          <div className="p-4 rounded-xl bg-navy-900/90 border border-sky-400/30">
            <div className="text-[10px] uppercase font-bold text-sky-400 mb-1">
              Diamond Franchise (5%)
            </div>
            <div className="text-xl font-bold text-sky-300">{formatINR(diamondComm, true)}</div>
            <div className="text-[10px] text-slate-400 mt-1">5% of ₹{goldComm.toLocaleString("en-IN")}</div>
          </div>

          <div className="p-4 rounded-xl bg-navy-900/90 border border-slate-400/30">
            <div className="text-[10px] uppercase font-bold text-slate-300 mb-1">
              Platinum Franchise (5%)
            </div>
            <div className="text-xl font-bold text-slate-200">{formatINR(platinumComm, true)}</div>
            <div className="text-[10px] text-slate-400 mt-1">5% of ₹{diamondComm.toLocaleString("en-IN")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
