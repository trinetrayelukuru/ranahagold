"use client";

import React, { useState } from "react";
import { franchiseTiers } from "@/data/franchiseData";
import { Check, X, Shield, Calendar, Building2, MapPin } from "lucide-react";

export default function FranchiseComparison() {
  const [selectedTierMobile, setSelectedTierMobile] = useState<string>("platinum");

  return (
    <div className="mt-16 pt-12 border-t border-gold-500/20">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
          Compare Franchise Levels
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">
          Side-by-side comparison of proposed deposits, responsibilities, infrastructure, and allocations.
        </p>
      </div>

      {/* Desktop Matrix View (Table) */}
      <div className="hidden lg:block overflow-x-auto rounded-3xl border border-gold-500/30 bg-navy-950/90 shadow-navy-card">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-gold-500/30 bg-navy-900/90">
              <th className="p-5 font-serif font-bold text-gold-200 text-sm w-1/5">
                Features & Terms
              </th>
              {franchiseTiers.map((tier) => (
                <th key={tier.id} className="p-5 text-center w-1/5">
                  <div className="font-serif font-bold text-base text-white">
                    {tier.name}
                  </div>
                  <div className="text-xs font-semibold text-gold-400 mt-0.5">
                    {tier.depositFormatted}
                  </div>
                  <div className="text-[10px] text-red-300/80 uppercase font-medium">
                    Non-refundable
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gold-500/10 text-slate-300">
            {/* Territory / Role */}
            <tr>
              <td className="p-5 font-semibold text-slate-200 bg-navy-900/40">
                Assigned Territory
              </td>
              {franchiseTiers.map((tier) => (
                <td key={tier.id} className="p-5 text-center text-xs">
                  {tier.territory}
                </td>
              ))}
            </tr>

            {/* Proposed Validity */}
            <tr>
              <td className="p-5 font-semibold text-slate-200 bg-navy-900/40">
                Proposed Validity
              </td>
              {franchiseTiers.map((tier) => (
                <td key={tier.id} className="p-5 text-center text-xs font-medium text-gold-300">
                  3 Years (Subject to agreement)
                </td>
              ))}
            </tr>

            {/* Infrastructure Requirements */}
            <tr>
              <td className="p-5 font-semibold text-slate-200 bg-navy-900/40">
                Office / Setup
              </td>
              <td className="p-5 text-center text-xs">
                Funds head-office & branch setup
              </td>
              <td className="p-5 text-center text-xs">
                Office setup cost is additional (up to 6 branches proposed)
              </td>
              <td className="p-5 text-center text-xs">
                Compact local setup (full office not required)
              </td>
              <td className="p-5 text-center text-xs">
                Basic premises, PC & accessories
              </td>
            </tr>

            {/* Deposit Allocation */}
            <tr>
              <td className="p-5 font-semibold text-slate-200 bg-navy-900/40">
                Deposit Allocation
              </td>
              <td className="p-5 text-center text-xs">
                Direct head-office & regional branch funding
              </td>
              <td className="p-5 text-center text-xs">
                ₹2,00,000 Platinum Franchise
                <br />
                ₹3,00,000 Head Office
              </td>
              <td className="p-5 text-center text-xs">
                ₹50,000 Platinum Franchise
                <br />
                ₹50,000 Gold Franchise
                <br />
                ₹1,00,000 Head Office
              </td>
              <td className="p-5 text-center text-xs">
                ₹10,000 Platinum | ₹10,000 Silver
                <br />
                ₹10,000 Gold | ₹20,000 HO
              </td>
            </tr>

            {/* Ground-up 5% Share */}
            <tr>
              <td className="p-5 font-semibold text-slate-200 bg-navy-900/40">
                Commission Benefit
              </td>
              <td className="p-5 text-center text-xs">
                5% of Diamond commission
              </td>
              <td className="p-5 text-center text-xs">
                5% of Gold commission
              </td>
              <td className="p-5 text-center text-xs">
                5% of Silver commission
              </td>
              <td className="p-5 text-center text-xs">
                Direct core commission (1.5% Buying, 1.0% Sales, 0.25% Pledging)
              </td>
            </tr>

            {/* Gold Card Booking Commission */}
            <tr>
              <td className="p-5 font-semibold text-slate-200 bg-navy-900/40">
                Gold Card Upline Share
              </td>
              <td className="p-5 text-center text-xs font-semibold text-gold-300">
                ₹750 (Upline)
              </td>
              <td className="p-5 text-center text-xs font-semibold text-gold-300">
                ₹500 (Upline)
              </td>
              <td className="p-5 text-center text-xs font-semibold text-gold-300">
                ₹250 (Upline)
              </td>
              <td className="p-5 text-center text-xs font-semibold text-gold-300">
                ₹1,000 (Booking Point)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View */}
      <div className="block lg:hidden">
        {/* Tier Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {franchiseTiers.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTierMobile(t.id)}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedTierMobile === t.id
                  ? "bg-gold-500 text-navy-950 shadow-gold-sm"
                  : "bg-navy-900 text-slate-300 border border-gold-500/20"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Selected Tier Mobile Card */}
        {(() => {
          const t = franchiseTiers.find((item) => item.id === selectedTierMobile) || franchiseTiers[0];
          return (
            <div className="p-6 rounded-2xl bg-navy-950 border border-gold-500/30 text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gold-500/20">
                <div>
                  <h4 className="text-lg font-serif font-bold text-white">{t.name}</h4>
                  <div className="text-gold-400 font-bold text-sm">{t.depositFormatted} (Non-refundable)</div>
                </div>
                <span className="text-[10px] bg-navy-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
                  {t.validity}
                </span>
              </div>

              <div>
                <strong className="text-slate-200 block mb-1">Territory / Role:</strong>
                <p className="text-slate-400">{t.territory} • {t.subtitle}</p>
              </div>

              <div>
                <strong className="text-slate-200 block mb-1">Infrastructure Setup:</strong>
                <p className="text-slate-400">{t.infrastructure}</p>
              </div>

              <div>
                <strong className="text-slate-200 block mb-1">Deposit Allocation:</strong>
                <ul className="text-slate-400 space-y-1 mt-1">
                  {t.allocations.map((a, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{a.recipient}:</span>
                      <span className="font-semibold text-slate-200">{a.amountFormatted}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
