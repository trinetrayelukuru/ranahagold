"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  Building,
  MapPin,
  ChevronRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { FranchiseTier } from "@/types";
import { cn } from "@/lib/utils";

interface FranchiseCardProps {
  tier: FranchiseTier;
  onEnquire: (tierName: string) => void;
}

export default function FranchiseCard({ tier, onEnquire }: FranchiseCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 transition-all duration-300 transform hover:-translate-y-1.5 shadow-navy-card",
        "bg-gradient-to-b from-navy-900/95 via-navy-950 to-navy-900 border"
      )}
      style={{
        borderColor: tier.theme.borderGlow,
        boxShadow: `0 10px 30px -5px rgba(3, 10, 23, 0.7), 0 0 20px ${tier.theme.borderGlow}`,
      }}
    >
      {/* Top Metallic Banner */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <span
          className={cn(
            "text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border",
            tier.theme.badgeStyle
          )}
        >
          {tier.tierNumber} • {tier.badge}
        </span>
        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
          <Calendar className="w-3 h-3 text-gold-400" />
          <span>{tier.validity}</span>
        </span>
      </div>

      {/* Main Title & Description */}
      <div className="mb-6">
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide mb-1">
          {tier.name}
        </h3>
        <p className="text-xs text-gold-300/90 font-medium mb-4">
          {tier.subtitle}
        </p>

        {/* Territory Highlight */}
        <div className="p-4 rounded-2xl bg-navy-950/90 border border-gold-500/20 mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
            <span>
              <strong className="text-white">Territory:</strong> {tier.territory}
            </span>
          </div>
        </div>

        {/* Brief Overview bullets */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Role & Scope</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
            {tier.role[0]}
          </p>
        </div>
      </div>

      {/* Action CTA: View Details */}
      <div className="pt-2 flex flex-col gap-2.5">
        <Link
          href={`/franchise/${tier.id}`}
          className="w-full relative group overflow-hidden flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-sm hover:shadow-gold-md transition-all duration-300 text-center"
        >
          <span className="relative z-10">View Details</span>
          <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        </Link>

        <button
          type="button"
          onClick={() => onEnquire(tier.name)}
          className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-gold-200 bg-navy-900/80 hover:bg-navy-800 border border-gold-500/30 hover:border-gold-400 transition-all duration-300 text-center"
        >Coming Soon</button>
      </div>
    </div>
  );
}
