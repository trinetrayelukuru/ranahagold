"use client";

import React from "react";
import Image from "next/image";
import { X, CheckCircle2, ShieldCheck, Sparkles, Calendar, Tag, CreditCard, Info } from "lucide-react";
import { MembershipProgram } from "@/types";
import { formatINR } from "@/lib/utils";

interface MembershipCardModalProps {
  program: MembershipProgram | null;
  onClose: () => void;
  onEnquire: (programName: string) => void;
}

export default function MembershipCardModal({
  program,
  onClose,
  onEnquire,
}: MembershipCardModalProps) {
  if (!program) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-card-title"
    >
      <div
        className="relative w-full max-w-4xl bg-gradient-to-b from-navy-900 via-navy-950 to-navy-900 border border-gold-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[92vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-navy-800 hover:bg-navy-700 border border-gold-500/20 focus:outline-none transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Card Artwork Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden border border-gold-500/40 shadow-2xl bg-navy-950 p-2">
              <Image
                src={program.imagePath}
                alt={`${program.name} Official Card Artwork`}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-contain p-1 rounded-xl"
                priority
              />
            </div>
            <p className="text-[11px] text-slate-400 text-center mt-3 italic">
              Official Ranaha Gold Company {program.name} Artwork
            </p>
          </div>

          {/* Right: Detailed Terms & Benefits */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>OFFICIAL PRIVILEGE CARD</span>
            </div>

            <h3 id="modal-card-title" className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1">
              {program.name}
            </h3>
            <p className="text-xs sm:text-sm text-gold-300/90 font-medium mb-5">
              {program.tagline}
            </p>

            {/* Fee & Benefit Highlight Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-navy-950 border border-gold-500/20">
                <div className="text-[10px] uppercase font-bold text-slate-400">
                  Enrollment Fee
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {program.feeFormatted}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {program.feeSubtext || "Stated Fee"}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gold-500/10 border border-gold-400/30">
                <div className="text-[10px] uppercase font-bold text-gold-400">
                  Total Service Benefits
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gold-200 mt-0.5">
                  {program.totalBenefitsFormatted}
                </div>
                <div className="text-[10px] text-gold-300/80 mt-0.5">
                  {program.split.totalUses} Uses @ {program.split.perUseFormatted} each
                </div>
              </div>
            </div>

            {/* Benefit Breakdown */}
            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Privilege Highlights
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {program.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Validity & Commission Info */}
            <div className="p-3.5 rounded-xl bg-navy-950/80 border border-gold-500/20 text-xs text-slate-400 space-y-1 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Program Validity:</span>
                <span className="font-bold text-white">{program.validity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Franchise Commission:</span>
                <span className="text-gold-400 font-medium">{program.commissionNote}</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEnquire(program.name);
                }}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-sm hover:shadow-gold-md transition-all text-center"
              >
                Apply for {program.name}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl text-xs font-semibold text-slate-300 bg-navy-800 hover:bg-navy-700 border border-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        {/* Conditions Footer */}
        <div className="mt-8 pt-6 border-t border-gold-500/20">
          <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase mb-2">
            <Info className="w-3.5 h-3.5" />
            <span>Important Terms & Redemption Conditions</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400">
            {program.conditions.map((cond, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="w-1 h-1 rounded-full bg-gold-400 mt-1.5 shrink-0" />
                <span>{cond}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
