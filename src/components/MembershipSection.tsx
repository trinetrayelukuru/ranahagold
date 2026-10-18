"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  Maximize2,
  Info,
  Layers,
} from "lucide-react";
import { membershipPrograms } from "@/data/membershipData";
import { MembershipProgram } from "@/types";
import MembershipCardModal from "./MembershipCardModal";

interface MembershipSectionProps {}

export default function MembershipSection(_props?: MembershipSectionProps) {
  const [selectedModalProgram, setSelectedModalProgram] = useState<MembershipProgram | null>(null);

  // 3D Card tilt state
  const [silverTilt, setSilverTilt] = useState({ rx: 0, ry: 0, shineX: 50, shineY: 50 });
  const [goldTilt, setGoldTilt] = useState({ rx: 0, ry: 0, shineX: 50, shineY: 50 });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    setTilt: React.Dispatch<React.SetStateAction<{ rx: number; ry: number; shineX: number; shineY: number }>>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -10;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 10;

    setTilt({ rx, ry, shineX: px, shineY: py });
  };

  const handleMouseLeave = (
    setTilt: React.Dispatch<React.SetStateAction<{ rx: number; ry: number; shineX: number; shineY: number }>>
  ) => {
    setTilt({ rx: 0, ry: 0, shineX: 50, shineY: 50 });
  };

  const silverProgram = membershipPrograms.find((p) => p.id === "silver") || membershipPrograms[0];
  const goldProgram = membershipPrograms.find((p) => p.id === "gold") || membershipPrograms[1];

  return (
    <section id="membership" className="relative py-24 bg-navy-950/3580 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>MEMBERSHIP PROGRAMMES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            More Value in Every Service
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Unlock tiered service vouchers, priority appraisal counters, and substantial cumulative savings on gold transactions with official Ranaha Gold Membership Cards.
          </p>
        </div>

        {/* 2 Main Membership Cards Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* 1. SILVER MEMBERSHIP CARD */}
          <div className="flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-navy-900/90 via-navy-950 to-navy-900 border border-slate-500/40 shadow-navy-card">
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase font-mono font-bold tracking-widest px-3.5 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-600">
                  Silver Privilege Pass
                </span>
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-300" />
                  <span>Validity: {silverProgram.validity}</span>
                </span>
              </div>

              {/* Title & Fee */}
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                {silverProgram.name}
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                {silverProgram.tagline}
              </p>

              {/* 3D Interactive Card Image Asset */}
              <div
                className="relative cursor-pointer mb-8 group perspective-1000"
                onClick={() => setSelectedModalProgram(silverProgram)}
                onMouseMove={(e) => handleMouseMove(e, setSilverTilt)}
                onMouseLeave={() => handleMouseLeave(setSilverTilt)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedModalProgram(silverProgram)}
                aria-label="Click to enlarge Silver Membership Card artwork and view full benefits"
              >
                <div
                  className="relative aspect-[1.586/1] w-full rounded-2xl overflow-hidden border border-slate-500/50 shadow-2xl transition-transform duration-200 ease-out bg-navy-950"
                  style={{
                    transform: `rotateX(${silverTilt.rx}deg) rotateY(${silverTilt.ry}deg) scale(1.01)`,
                  }}
                >
                  <Image
                    src={silverProgram.imagePath}
                    alt="Official Ranaha Gold Company Silver Membership Card"
                    fill
                    sizes="(max-width: 768px) 100vw, 550px"
                    className="object-contain p-1 rounded-xl"
                  />

                  {/* Metallic Light Sweep Effect */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at ${silverTilt.shineX}% ${silverTilt.shineY}%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
                    }}
                  />

                  {/* Enlarge Hint Badge */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-navy-950/80 backdrop-blur-md border border-slate-500/40 text-[10px] text-slate-200 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3 h-3 text-slate-300" />
                    <span>View Card</span>
                  </div>
                </div>
              </div>

              {/* Value Specs Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-4 rounded-2xl bg-navy-950 border border-slate-700/60">
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    Membership Fee
                  </div>
                  <div className="text-2xl font-bold text-white mt-1">
                    {silverProgram.feeFormatted}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                    No Charge / Complimentary
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-navy-950 border border-slate-700/60">
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    Total Service Benefits
                  </div>
                  <div className="text-2xl font-bold text-slate-200 mt-1">
                    {silverProgram.totalBenefitsFormatted}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    4 Uses @ {silverProgram.split.perUseFormatted} each
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 mb-8">
                {silverProgram.features.slice(0, 3).map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setSelectedModalProgram(silverProgram)}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-all flex items-center justify-center gap-2"
              >
                <span>View Full Benefits</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {}}
                className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-navy-950 bg-slate-200 hover:bg-white transition-all shadow-sm"
              >
                Enroll Free
              </button>
            </div>
          </div>

          {/* 2. GOLD MEMBERSHIP CARD (Premier High-Value Program) */}
          <div className="relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-navy-900/95 via-navy-950 to-navy-900 border border-gold-500/50 shadow-gold-md">
            {/* Top Glow Accent */}
            <div className="absolute top-0 right-10 w-48 h-48 bg-gold-500/15 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase font-mono font-bold tracking-widest px-3.5 py-1 rounded-full bg-amber-950/90 text-amber-300 border border-amber-500/50 shadow-gold-sm">
                  Premier Gold Privilege
                </span>
                <span className="text-xs font-semibold text-gold-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-400" />
                  <span>Validity: {goldProgram.validity}</span>
                </span>
              </div>

              {/* Title & Fee */}
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                {goldProgram.name}
              </h3>
              <p className="text-xs text-gold-300/90 mb-6">
                {goldProgram.tagline}
              </p>

              {/* 3D Interactive Card Image Asset */}
              <div
                className="relative cursor-pointer mb-8 group perspective-1000"
                onClick={() => setSelectedModalProgram(goldProgram)}
                onMouseMove={(e) => handleMouseMove(e, setGoldTilt)}
                onMouseLeave={() => handleMouseLeave(setGoldTilt)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedModalProgram(goldProgram)}
                aria-label="Click to enlarge Gold Membership Card artwork and view full benefits"
              >
                <div
                  className="relative aspect-[1.586/1] w-full rounded-2xl overflow-hidden border border-gold-400/60 shadow-2xl transition-transform duration-200 ease-out bg-navy-950"
                  style={{
                    transform: `rotateX(${goldTilt.rx}deg) rotateY(${goldTilt.ry}deg) scale(1.01)`,
                  }}
                >
                  <Image
                    src={goldProgram.imagePath}
                    alt="Official Ranaha Gold Company Gold Membership Card"
                    fill
                    sizes="(max-width: 768px) 100vw, 550px"
                    className="object-contain p-1 rounded-xl"
                  />

                  {/* Golden Shimmer Reflection */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at ${goldTilt.shineX}% ${goldTilt.shineY}%, rgba(246, 229, 167, 0.45) 0%, transparent 60%)`,
                    }}
                  />

                  {/* Enlarge Hint Badge */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-navy-950/80 backdrop-blur-md border border-gold-500/40 text-[10px] text-gold-200 font-semibold opacity-0 group-hover:opacity-100 transition-opacity shadow-gold-sm">
                    <Maximize2 className="w-3 h-3 text-gold-400" />
                    <span>View Card</span>
                  </div>
                </div>
              </div>

              {/* Value Specs Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-4 rounded-2xl bg-navy-950 border border-gold-500/30">
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    Membership Fee
                  </div>
                  <div className="text-2xl font-bold text-white mt-1">
                    {goldProgram.feeFormatted}
                  </div>
                  <div className="text-[11px] text-gold-400 font-medium mt-0.5">
                    One-Time + Applicable GST
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/40">
                  <div className="text-[10px] uppercase font-bold text-gold-400">
                    Total Service Benefits
                  </div>
                  <div className="text-2xl font-bold text-gold-200 mt-1">
                    {goldProgram.totalBenefitsFormatted}
                  </div>
                  <div className="text-[11px] text-gold-300 mt-0.5">
                    4 Uses @ {goldProgram.split.perUseFormatted} each
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 mb-8">
                {goldProgram.features.slice(0, 3).map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gold-500/20 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setSelectedModalProgram(goldProgram)}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-gold-200 bg-navy-900 hover:bg-navy-800 border border-gold-500/40 transition-all flex items-center justify-center gap-2"
              >
                <span>View Full Benefits</span>
                <ChevronRight className="w-4 h-4 text-gold-400" />
              </button>

              <button
                type="button"
                onClick={() => {}}
                className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-sm hover:shadow-gold-md transition-all"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>

        {/* Official Membership Conditions Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-navy-900/60 border border-gold-500/20">
          <div className="flex items-center gap-2 text-gold-400 font-serif font-bold text-base mb-4">
            <Info className="w-5 h-5" />
            <span>Official Membership Conditions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-navy-950/70 border border-gold-500/10">
              <p className="leading-relaxed">
                • <strong>Non-Cash Redemption:</strong> Service benefits are not cash unless written terms expressly state otherwise.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-navy-950/70 border border-gold-500/10">
              <p className="leading-relaxed">
                • <strong>Written Terms:</strong> Redemption, eligible services, transferability, expiry, and other conditions are provided in writing before payment.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-navy-950/70 border border-gold-500/10">
              <p className="leading-relaxed">
                • <strong>Commission Policy:</strong> Gold membership commission is governed by the separate commission structure and final company policy.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-navy-950/70 border border-gold-500/10">
              <p className="leading-relaxed">
                • <strong>Tax Treatment:</strong> GST and tax treatment are applied as required by prevailing Indian tax laws.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal for Selected Membership Card */}
      <MembershipCardModal
        program={selectedModalProgram}
        onClose={() => setSelectedModalProgram(null)}
        onEnquire={() => {}}
      />
    </section>
  );
}
