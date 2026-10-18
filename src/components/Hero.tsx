"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Sparkles, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-14 overflow-hidden"
    >
      {/* Warm golden ambient illumination behind the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[-120px] h-[620px] w-[1000px] max-w-[150vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,206,112,0.18),rgba(255,176,48,0.06)_55%,transparent_78%)]" />
        <div className="animate-aura absolute left-1/2 top-10 h-[340px] w-[620px] max-w-[130vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,222,150,0.16),transparent_76%)]" />
        <div className="absolute right-[8%] top-[38%] h-[260px] w-[260px] bg-[radial-gradient(closest-side,rgba(217,169,40,0.12),transparent_72%)]" />
      </div>

      {/* Elegant gold sparkles — decorative only, behind all content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span
          className="sparkle-star"
          style={{ left: "9%", top: "26%", width: 12, height: 12, animationDelay: "0.4s" }}
        />
        <span
          className="sparkle-star"
          style={{ left: "17%", top: "64%", width: 8, height: 8, animationDelay: "2.1s", animationDuration: "6.5s" }}
        />
        <span
          className="sparkle-star"
          style={{ right: "12%", top: "30%", width: 10, height: 10, animationDelay: "1.2s", animationDuration: "6s" }}
        />
        <span
          className="sparkle-star"
          style={{ right: "20%", top: "70%", width: 7, height: 7, animationDelay: "3.4s", animationDuration: "7s" }}
        />
        <span
          className="sparkle-star hidden sm:block"
          style={{ left: "31%", top: "14%", width: 6, height: 6, animationDelay: "2.8s", animationDuration: "6.8s" }}
        />
        <span
          className="sparkle-star hidden sm:block"
          style={{ right: "30%", top: "12%", width: 6, height: 6, animationDelay: "0.9s", animationDuration: "7.2s" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Trust & Origin Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy-900/90 border border-gold-500/30 text-gold-300 text-xs font-medium mb-5 shadow-gold-sm backdrop-blur-md animate-float">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>A Growing Gold-Services Brand from Andhra Pradesh</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400/80" />
          <span className="text-slate-300 hidden sm:inline">Ranaha Gold — Real Gold • Real Value</span>
        </div>

        {/* Main Company Heading */}
        <h1 className="relative text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight leading-[1.1] mb-4">
          <span className="hero-wordmark block">RANAHA GOLD COMPANY</span>
          <span className="relative block mt-2">
            {/* Soft halo copy — keeps the crisp gradient text below perfectly sharp */}
            <span aria-hidden="true" className="hero-gold-halo absolute inset-0 block">
              REAL GOLD • REAL VALUE
            </span>
            <span className="hero-gold-text relative block">
              REAL GOLD • REAL VALUE
            </span>
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-200/90 font-normal leading-relaxed mt-6 mb-8">
          Built on trust, professional service, and local entrepreneurship. Providing gold pledging, transparent gold buying, convenient gold EMI options, exclusive membership programs, and a structured multi-tier franchise network across Andhra Pradesh.
        </p>

        {/* Brand Promise Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-10 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-navy-900/60 border border-gold-500/20 text-gold-200">
            <span className="w-2 h-2 rounded-full bg-gold-400" />
            <span>REAL GOLD</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-navy-900/60 border border-gold-500/20 text-gold-200">
            <span className="w-2 h-2 rounded-full bg-gold-400" />
            <span>REAL VALUE</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-navy-900/60 border border-gold-500/20 text-gold-200">
            <span className="w-2 h-2 rounded-full bg-gold-400" />
            <span>LOCAL SERVICE</span>
          </div>
        </div>

        {/* CTA Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-10">
          {/* Primary CTA */}
          <Link
            href="#franchise"
            className="w-full sm:w-auto relative group overflow-hidden inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-md hover:shadow-gold-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span className="relative z-10">EXPLORE FRANCHISE</span>
            <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="#services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-gold-200 bg-navy-900/80 hover:bg-navy-800 border border-gold-500/40 hover:border-gold-400 shadow-sm hover:shadow-gold-sm transition-all duration-300"
          >
            <span>OUR SERVICES</span>
          </Link>

          {/* Third CTA */}
          <Link
            href="#membership"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-navy-950/60 hover:bg-navy-900/60 border border-slate-700/60 hover:border-gold-500/30 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>BECOME A MEMBER</span>
          </Link>
        </div>

        {/* Scroll down indicator */}
        <div className="flex justify-center">
          <Link
            href="#live-rates"
            className="inline-flex flex-col items-center text-slate-400 hover:text-gold-300 transition-colors text-[11px] uppercase tracking-widest gap-1"
            aria-label="Scroll down to live market rates"
          >
            <span>Live Market Rates</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-gold-400 mt-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
