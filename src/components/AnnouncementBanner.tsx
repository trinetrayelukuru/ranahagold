"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Sparkles, Calendar, Clock } from "lucide-react";

const TARGET = new Date("2026-11-11T11:11:00+05:30").getTime();

function fmt(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

export default function AnnouncementBanner() {
  const [now, setNow] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tick = () => {
      const t = Date.now();
      setNow(t);
      if (t >= TARGET) setDone(true);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const diff = now !== null && !done ? Math.max(0, TARGET - now) : 0;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const units = [
    { v: d, l: "Days" },
    { v: h, l: "Hours" },
    { v: m, l: "Minutes" },
    { v: s, l: "Seconds" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0a0e16] via-[#0d1220] to-[#0b0f18] border-b border-gold-500/20" style={{ marginTop: "6.75rem" }}>
      {/* Warm radial illumination behind the countdown */}
      <div className="pointer-events-none absolute -top-28 left-1/2 h-[440px] w-[900px] max-w-[160vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,199,88,0.20),rgba(255,170,40,0.06)_55%,transparent_78%)]" />
      <div className="animate-aura-slow pointer-events-none absolute top-1/3 left-1/2 h-[280px] w-[520px] max-w-[120vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(246,229,167,0.14),transparent_75%)]" />

      {/* Subtle animated shimmer lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent animate-shimmer" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      {/* Floating sparkle particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="sparkle-star" style={{ left: "8%", top: "24%", width: 11, height: 11, animationDelay: "0.3s" }} />
        <span className="sparkle-star" style={{ left: "23%", top: "68%", width: 7, height: 7, animationDelay: "1.4s", animationDuration: "6.5s" }} />
        <span className="sparkle-star" style={{ left: "44%", top: "16%", width: 6, height: 6, animationDelay: "2.2s", animationDuration: "7.2s" }} />
        <span className="sparkle-star" style={{ left: "62%", top: "74%", width: 8, height: 8, animationDelay: "0.8s", animationDuration: "6.2s" }} />
        <span className="sparkle-star" style={{ left: "77%", top: "28%", width: 10, height: 10, animationDelay: "3.1s" }} />
        <span className="sparkle-star" style={{ left: "91%", top: "62%", width: 6, height: 6, animationDelay: "1.9s", animationDuration: "6.8s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 md:pt-9 pb-5 sm:pb-6 md:pb-7">
        <div className="flex flex-col items-center justify-center text-center space-y-5">

          {/* Main Heading with premium styling */}
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-300 to-gold-400 tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(217,169,40,0.4)]">
              New Branch Opening in KURNOOL!
            </h2>

            {/* Location and date details */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-900/60 border border-gold-400/30 backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-gold-300" />
                <span className="text-gold-100 font-medium">Kurnool, Andhra Pradesh</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-900/60 border border-gold-400/30 backdrop-blur-sm">
                <Calendar className="w-4 h-4 text-gold-300" />
                <span className="text-gold-100 font-medium">11 November 2026</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-900/60 border border-gold-400/30 backdrop-blur-sm">
                <Clock className="w-4 h-4 text-gold-300" />
                <span className="text-gold-100 font-medium">11:11 AM IST</span>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          {!done && now !== null && (
            <div className="space-y-3 w-full max-w-3xl">
              <p className="text-base sm:text-lg text-slate-300 font-medium tracking-wide">
                Opening in:
              </p>
              <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6" aria-label="Countdown to opening">
                {units.map((item) => (
                  <div
                    key={item.l}
                    className="relative group"
                  >
                    {/* Glow effect behind timer */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-400/20 to-gold-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />

                    {/* Timer unit */}
                    <div className="relative flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 rounded-2xl bg-gradient-to-br from-[#1a2332] to-[#0f1520] border-2 border-gold-400/30 shadow-[0_0_20px_rgba(217,169,40,0.15)] backdrop-blur-sm">
                      <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-b from-gold-200 via-gold-300 to-gold-400 leading-none tracking-tight drop-shadow-[0_2px_6px_rgba(217,169,40,0.5)]">
                        {fmt(item.v)}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-[0.15em] font-bold mt-2">
                        {item.l}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Opened Message */}
          {done && (
            <div className="py-4">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-300 to-gold-500 tracking-tight drop-shadow-[0_2px_10px_rgba(217,169,40,0.6)] animate-pulse-slow">
                KURNOOL BRANCH FINALLY OPENED!
              </h3>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.3; transform: translateX(-100%); }
          50% { opacity: 1; transform: translateX(100%); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-shimmer,
          .animate-pulse-slow {
            animation: none !important;
          }
          * {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
