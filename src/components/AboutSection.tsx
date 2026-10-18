"use client";

import React from "react";
import {
  ShieldCheck,
  Users,
  FileCheck,
  Building2,
  MapPin,
  Sparkles,
  ChevronRight,
  Award,
} from "lucide-react";
import { companyInfo } from "@/data/companyData";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-16 bg-navy-950/3540">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>OUR STORY & PURPOSE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Rooted in Trust, Driven by Local Service
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Ranaha Gold Company is an Andhra Pradesh gold-services brand dedicated to making gold liquidity, acquisition, and privileges accessible, transparent, and rewarding for local communities.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left: Origin Story Card */}
          <div className="lg:col-span-7 relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-navy-900/90 via-navy-950 to-navy-900 border border-gold-500/30 shadow-navy-card overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-gold-400">
                Company Origins & Foundation
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-2 mb-4">
                The Journey of Ranaha Gold Company
              </h3>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Ranaha Gold Company began at{" "}
                  <strong className="text-gold-200 font-semibold">Ananparthi, Andhra Pradesh</strong>, with two founding members,{" "}
                  <strong className="text-white font-semibold">Mr. Bharathreddy B</strong> and{" "}
                  <strong className="text-white font-semibold">Mr. Saireddy T</strong>.
                </p>
                <p>
                  The first main branch was established at{" "}
                  <strong className="text-gold-200 font-semibold">Kurnool</strong>, with{" "}
                  <strong className="text-white font-semibold">Mr. Kirankumar Reddy</strong> playing a key role in the branch&apos;s establishment and local leadership.
                </p>
                <p className="pt-2 border-t border-gold-500/20 text-slate-300 italic">
                  &ldquo;{companyInfo.purpose}&rdquo;
                </p>
              </div>

              {/* Founders & Key Milestones Badges */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-navy-950/80 border border-gold-500/20">
                  <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Origins: Ananparthi, AP</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Founded by <strong className="text-white">Mr. Bharathreddy B</strong> & <strong className="text-white">Mr. Saireddy T</strong>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-navy-950/80 border border-gold-500/20">
                  <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>First Main Branch: Kurnool</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Established with key leadership from <strong className="text-white">Mr. Kirankumar Reddy</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Brand Promise Showcase */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="p-7 rounded-3xl bg-gradient-to-br from-gold-500/15 via-navy-900/90 to-navy-950 border border-gold-500/40 shadow-gold-sm">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-400">
                Official Brand Promise
              </span>
              <h4 className="text-2xl font-serif font-bold text-white mt-1 mb-3">
                REAL GOLD • REAL VALUE • LOCAL SERVICE
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every customer interaction is guided by fair appraisals, documented terms, prompt settlement, and personal community-level service.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-navy-900/70 border border-gold-500/20">
              <h5 className="text-sm font-bold uppercase tracking-wider text-gold-300 mb-2">
                Our Core Purpose
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                To make gold-related services accessible through a customer-focused network, clear processes and locally managed branches. We aim to build long-term relationships through professional service and responsible operations.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Operation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyInfo.coreValues.map((value, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-navy-900/60 border border-gold-500/20 hover:border-gold-400/50 hover:bg-navy-900/90 transition-all duration-300 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
                {idx === 0 && <ShieldCheck className="w-5 h-5" />}
                {idx === 1 && <Users className="w-5 h-5" />}
                {idx === 2 && <FileCheck className="w-5 h-5" />}
                {idx === 3 && <Building2 className="w-5 h-5" />}
              </div>
              <h4 className="text-base font-serif font-bold text-white mb-2">
                {value.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
