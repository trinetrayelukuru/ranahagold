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
  MessageCircle,
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

        {/* WhatsApp Contact Button for Franchise Enquiries */}
        <div className="flex justify-center mb-12">
          <a
            href="https://wa.me/919063807799?text=Hello%20Ranaha%20Gold%20Company%2C%20I%20am%20interested%20in%20your%20franchise%20opportunities.%20Please%20share%20more%20information."
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54] text-white font-bold text-base shadow-[0_8px_24px_rgba(37,211,102,0.3)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.4)] transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* WhatsApp Icon */}
            <div className="w-7 h-7 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <span className="relative z-10">Contact Us on WhatsApp</span>
            <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          </a>
        </div>

        {/* Additional text hint */}
        <p className="text-center text-sm text-slate-400 mb-12">
          Have questions about our franchise opportunities? Chat with us directly on WhatsApp for quick assistance.
        </p>

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
