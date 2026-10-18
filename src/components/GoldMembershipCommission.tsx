"use client";

import React from "react";
import {
  CreditCard,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Info,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { goldMembershipCommissions } from "@/data/commissionData";
import { formatINR } from "@/lib/utils";

export default function GoldMembershipCommission() {
  return (
    <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-navy-950/90 border border-gold-500/30 shadow-navy-card">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-gold-500/20 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>MEMBERSHIP CARD COMMISSIONS</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
            Gold Membership Card Commission Structure
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Gold membership fee: <strong className="text-gold-300 font-semibold">₹5,000 + GST</strong>. Commission distribution per successfully enrolled card.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-navy-900 border border-gold-500/30 text-left md:text-right shrink-0">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Potential Distribution</div>
          <div className="text-2xl font-bold text-gold-300">Up to ₹2,500</div>
          <div className="text-[10px] text-slate-400">When all 4 tiers qualify</div>
        </div>
      </div>

      {/* Commission Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {goldMembershipCommissions.map((entry, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-navy-900/80 border border-gold-500/20 hover:border-gold-400/40 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
                {idx === 0 ? "Booking Point Lead" : `Upline Level 0${idx}`}
              </div>
              <h4 className="text-base font-serif font-bold text-white mb-2">
                {entry.role}
              </h4>
              <div className="text-2xl font-bold text-gold-300 mb-3">
                {entry.amountFormatted}
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed border-t border-gold-500/10 pt-3">
              {entry.rule}
            </p>
          </div>
        ))}
      </div>

      {/* Silver Card & Upline Policy Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 border-t border-gold-500/20 text-xs text-slate-300">
        <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-700 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-200">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <span>Silver Membership Card (₹0 Fee)</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            No commission is payable to any franchise level for Silver Membership Cards. Silver Cards are complimentary privilege passes offering ₹5,000 in service benefits across 4 uses with 1-year validity.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900/60 border border-gold-500/20 space-y-2">
          <div className="flex items-center gap-2 font-bold text-gold-300">
            <Info className="w-4 h-4 text-gold-400" />
            <span>Upline / Downline Distribution Rule</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            When a franchisee books a Gold Membership Card, only the booking point and eligible franchise levels above it may receive commission. Down-level franchisees do not receive commissions on bookings made by an upper-level franchisee.
          </p>
        </div>
      </div>
    </div>
  );
}
