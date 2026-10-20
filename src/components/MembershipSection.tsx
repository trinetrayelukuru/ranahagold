"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  ChevronRight,
  Maximize2,
  Info,
} from "lucide-react";
import { membershipPrograms } from "@/data/membershipData";
import { MembershipProgram } from "@/types";
import MembershipCardModal from "./MembershipCardModal";

interface MembershipSectionProps {}

export default function MembershipSection(_props?: MembershipSectionProps) {
  const [selectedModalProgram, setSelectedModalProgram] = useState<MembershipProgram | null>(null);

  // 3D Card tilt states keyed by program id
  const [tilts, setTilts] = useState<Record<string, { rx: number; ry: number; shineX: number; shineY: number }>>({});

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -10;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 10;

    setTilts((prev) => ({ ...prev, [id]: { rx, ry, shineX: px, shineY: py } }));
  };

  const handleMouseLeave = (id: string) => {
    setTilts((prev) => ({ ...prev, [id]: { rx: 0, ry: 0, shineX: 50, shineY: 50 } }));
  };

  // Eligibility mapping per program ID
  const eligibilityMap: Record<string, string> = {
    "santhosam": "Men aged 18 years and above who wish to celebrate their birthdays or wedding anniversaries with exclusive gold and silver purchase benefits. Benefits are redeemable on the eligible occasion date, subject to verification and terms.",
    "annadata-jawan": "Eligible farmers and serving or retired defence personnel who wish to receive special jewellery purchase benefits as a token of appreciation for their contribution to the nation. Valid identification or occupation proof may be required.",
    "bhavitha": "Children below 18 years of age, boys and girls, can be enrolled by a parent or legal guardian. Special benefits apply to eligible gold purchases for birthdays, Panchela functions and Rajaswala ceremonies, as applicable.",
    "bhumi-loyalty": "Customers who register for the Ranaha Gold Company loyalty programme. Eligible purchases earn cashback credited to the member's card for future redemption under the programme rules.",
    "mahalakshmi": "Brides and families planning eligible wedding purchases through Ranaha Gold Company. Marriage package benefits are available subject to the selected package, purchase requirements and applicable terms.",
    "surya": "Customers who wish to enjoy eligible weekly jewellery shopping privileges at participating Ranaha Gold Company physical stores. Offers are subject to qualifying products, availability and applicable Saturday timings.",
    "bhagya-lakshmi": "Women who wish to celebrate their marriage, seemantham or birthday occasions with special gold and silver purchase privileges. Benefits are available for eligible event-related purchases under the card's terms.",
    "silver": "First-time customers who qualify for the free Silver Membership programme. Members can access the stated service benefits and eligible silver purchase offer according to the programme's redemption rules.",
    "gold": "Customers willing to enrol in the Gold Membership programme by paying the prescribed ₹5,000 membership fee. Eligible members can access the stated service benefits and gold purchase offers, subject to redemption limits and terms."
  };

  return (
    <section id="membership" className="relative py-24 bg-navy-950/40 border-t border-gold-500/20">
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
            Discover our comprehensive collection of nine official Ranaha Gold Membership and Privilege Cards designed to reward every life milestone, occasion, and loyal patronage.
          </p>
        </div>

        {/* 9 Cards Grid: Desktop 3 columns, Tablet 2 columns, Mobile 1 column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {membershipPrograms.map((program) => {
            const tilt = tilts[program.id] || { rx: 0, ry: 0, shineX: 50, shineY: 50 };
            const isGold = program.id === "gold";
            const eligibilityText = eligibilityMap[program.id] || program.conditions[0];

            return (
              <div
                key={program.id}
                className={`flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-navy-900/90 via-navy-950 to-navy-900 border ${
                  isGold ? "border-gold-500/50 shadow-gold-md" : "border-slate-500/30 hover:border-gold-500/30"
                } shadow-navy-card transition-all duration-300`}
              >
                <div>
                  {/* Header Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] uppercase font-mono font-bold tracking-widest px-3 py-1 rounded-full ${isGold ? "bg-amber-950/90 text-amber-300 border border-amber-500/50" : "bg-slate-800 text-slate-200 border border-slate-600"}`}>
                      {program.id === "gold" ? "Premier Gold" : program.id === "silver" ? "Silver Privilege" : "Privilege Pass"}
                    </span>
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gold-400" />
                      <span>{program.validity}</span>
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1">
                    {program.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-5 min-h-[32px]">
                    {program.tagline}
                  </p>

                  {/* 3D Interactive Card Image Asset */}
                  <div
                    className="relative cursor-pointer mb-6 group perspective-1000"
                    onClick={() => setSelectedModalProgram(program)}
                    onMouseMove={(e) => handleMouseMove(e, program.id)}
                    onMouseLeave={() => handleMouseLeave(program.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setSelectedModalProgram(program)}
                    aria-label={`Click to enlarge ${program.name} artwork and view full benefits`}
                  >
                    <div
                      className={`relative aspect-[1.586/1] w-full rounded-2xl overflow-hidden border ${isGold ? "border-gold-400/60" : "border-slate-500/40"} shadow-xl transition-transform duration-200 ease-out bg-navy-950`}
                      style={{
                        transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.01)`,
                      }}
                    >
                      <Image
                        src={program.imagePath}
                        alt={`Official Ranaha Gold Company ${program.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 380px"
                        className="object-contain p-1 rounded-xl"
                      />

                      {/* Metallic Light Sweep Effect */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity"
                        style={{
                          background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
                        }}
                      />

                      {/* Enlarge Hint Badge */}
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-navy-950/80 backdrop-blur-md border border-slate-500/40 text-[10px] text-slate-200 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3 h-3 text-slate-300" />
                        <span>View Card</span>
                      </div>
                    </div>
                  </div>

                  {/* Fee & Benefit Mini Badge */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    <div className="p-3 rounded-xl bg-navy-950 border border-slate-700/60">
                      <div className="text-[9px] uppercase font-bold text-slate-400">
                        Enrollment Fee
                      </div>
                      <div className="text-base font-bold text-white mt-0.5">
                        {program.feeFormatted}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-navy-950 border border-slate-700/60">
                      <div className="text-[9px] uppercase font-bold text-slate-400">
                        Total Benefits
                      </div>
                      <div className="text-base font-bold text-gold-300 mt-0.5">
                        {program.totalBenefitsFormatted}
                      </div>
                    </div>
                  </div>

                  {/* Eligibility Section (Required) */}
                  <div className="mb-6 p-3.5 rounded-xl bg-navy-950/80 border border-gold-500/20">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-1.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                      <span>Eligibility</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {eligibilityText}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-800 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedModalProgram(program)}
                    className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      isGold
                        ? "text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-sm"
                        : "text-white bg-slate-800 hover:bg-slate-700 border border-slate-600"
                    }`}
                  >
                    <span>View Benefits</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Common Eligibility Requirements Section */}
        <div className="p-8 sm:p-10 rounded-3xl bg-navy-900/70 border border-gold-500/30 shadow-2xl">
          <div className="flex items-center gap-2.5 text-gold-400 font-serif font-bold text-lg sm:text-xl mb-6">
            <Info className="w-6 h-6 text-gold-400" />
            <span>Common Eligibility Requirements</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-navy-950/80 border border-gold-500/15 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-gold-400 mt-2 shrink-0" />
              <p className="leading-relaxed">Membership registration and a valid mobile number are required.</p>
            </div>
            <div className="p-4 rounded-2xl bg-navy-950/80 border border-gold-500/15 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-gold-400 mt-2 shrink-0" />
              <p className="leading-relaxed">Valid identity and age proof may be requested for verification.</p>
            </div>
            <div className="p-4 rounded-2xl bg-navy-950/80 border border-gold-500/15 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-gold-400 mt-2 shrink-0" />
              <p className="leading-relaxed">Minors must be registered and represented by a parent or legal guardian.</p>
            </div>
            <div className="p-4 rounded-2xl bg-navy-950/80 border border-gold-500/15 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-gold-400 mt-2 shrink-0" />
              <p className="leading-relaxed">Certain cards require proof of occupation, service status or the relevant occasion.</p>
            </div>
            <div className="p-4 rounded-2xl bg-navy-950/80 border border-gold-500/15 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-gold-400 mt-2 shrink-0" />
              <p className="leading-relaxed">Benefits are non-transferable unless expressly permitted by the programme rules.</p>
            </div>
            <div className="p-4 rounded-2xl bg-navy-950/80 border border-gold-500/15 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-gold-400 mt-2 shrink-0" />
              <p className="leading-relaxed">Offers cannot be combined unless explicitly stated.</p>
            </div>
            <div className="p-4 rounded-2xl bg-navy-950/80 border border-gold-500/15 md:col-span-2 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-gold-400 mt-2 shrink-0" />
              <p className="leading-relaxed">All benefits are subject to the card-specific terms, exclusions and redemption limits.</p>
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
