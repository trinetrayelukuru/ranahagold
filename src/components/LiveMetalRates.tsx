"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  TrendingUp,
  RefreshCw,
  Clock,
  AlertCircle,
  Sparkles,
  Calculator,
  ChevronDown,
  Info,
} from "lucide-react";
import { MetalRatesData } from "@/types";
import { formatINR, formatTimeAgo } from "@/lib/utils";

type UnitMultiplier = {
  key: string;
  label: string;
  grams: number;
};

const UNIT_OPTIONS: UnitMultiplier[] = [
  { key: "1g", label: "1 Gram", grams: 1 },
  { key: "8g", label: "8 Grams (1 Pavan)", grams: 8 },
  { key: "10g", label: "10 Grams (1 Tola)", grams: 10 },
  { key: "100g", label: "100 Grams", grams: 100 },
  { key: "1kg", label: "1 Kilogram (1000g)", grams: 1000 },
];

export default function LiveMetalRates() {
  const [ratesData, setRatesData] = useState<MetalRatesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<UnitMultiplier>(UNIT_OPTIONS[0]);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  // Calculator State
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calcGrams, setCalcGrams] = useState<number>(10);
  const [calcPurity, setCalcPurity] = useState<"24k" | "22k" | "silver">("22k");

  const fetchRates = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    setError(null);

    try {
      const res = await fetch("/api/metals", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Market rates temporarily unavailable.");
      }

      const data: MetalRatesData = await res.json();
      setRatesData(data);
      setLastFetched(new Date(data.updatedAt || Date.now()));
    } catch (err: any) {
      console.error("Failed to load metal rates:", err);
      setError("Market rates temporarily unavailable.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();

    // Auto-refresh every 3 minutes (180,000 ms)
    const interval = setInterval(() => {
      fetchRates();
    }, 180000);

    return () => clearInterval(interval);
  }, [fetchRates]);

  // Calculations for cards
  const gold24kRate = ratesData ? ratesData.gold24k * selectedUnit.grams : 0;
  const gold22kRate = ratesData ? ratesData.gold22k * selectedUnit.grams : 0;
  const silver999Rate = ratesData ? ratesData.silver999 * selectedUnit.grams : 0;

  // Custom calculator result
  const calculateEstimate = () => {
    if (!ratesData || !calcGrams || calcGrams <= 0) return 0;
    if (calcPurity === "24k") return ratesData.gold24k * calcGrams;
    if (calcPurity === "22k") return ratesData.gold22k * calcGrams;
    return ratesData.silver999 * calcGrams;
  };

  return (
    <section id="live-rates" className="relative py-12 bg-navy-950/3550 border-y border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE BULLION REFERENCE FEED</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-wide">
              Live Market Reference Rates
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Indicative market benchmarks updated in real time. Refreshes automatically.
            </p>
          </div>

          {/* Unit Switcher & Refresh Controls */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Unit Dropdown / Selector */}
            <div className="flex items-center rounded-lg bg-navy-900 border border-gold-500/30 p-1">
              {UNIT_OPTIONS.map((unit) => (
                <button
                  key={unit.key}
                  onClick={() => setSelectedUnit(unit)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                    selectedUnit.key === unit.key
                      ? "bg-gold-500 text-navy-950 font-bold shadow-sm"
                      : "text-slate-300 hover:text-white"
                  }`}
                  aria-label={`View rates for ${unit.label}`}
                >
                  {unit.key}
                </button>
              ))}
            </div>

            {/* Manual Refresh Button */}
            <button
              onClick={() => fetchRates(true)}
              disabled={refreshing || loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-850 border border-gold-500/30 text-gold-300 text-xs font-medium disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400"
              aria-label="Refresh live metal rates"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-gold-400" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Calculator Toggle */}
            <button
              onClick={() => setCalculatorOpen(!calculatorOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-850 border border-gold-500/30 text-gold-300 text-xs font-medium transition-colors"
              aria-expanded={calculatorOpen}
              aria-label="Toggle rate calculator"
            >
              <Calculator className="w-3.5 h-3.5 text-gold-400" />
              <span>Calculator</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-44 rounded-2xl bg-navy-900/60 border border-gold-500/20 p-6 flex flex-col justify-between"
              >
                <div className="h-6 w-32 bg-navy-800 rounded" />
                <div className="h-10 w-48 bg-navy-800 rounded my-2" />
                <div className="h-4 w-24 bg-navy-800 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && !ratesData && (
          <div className="p-6 rounded-2xl bg-red-950/40 border border-red-500/30 text-center text-red-200">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="font-medium text-sm sm:text-base">{error}</p>
            <p className="text-xs text-red-300/80 mt-1">
              Please check your network connection or try refreshing.
            </p>
            <button
              onClick={() => fetchRates(true)}
              className="mt-4 px-4 py-2 rounded-lg bg-red-900/80 hover:bg-red-800 text-xs font-semibold text-white transition-colors"
            >
              Retry Live Rate Feed
            </button>
          </div>
        )}

        {/* Rates Display Cards */}
        {!loading && ratesData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 24K Gold Card */}
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900/90 via-navy-950 to-navy-900 border border-gold-500/40 p-6 shadow-gold-sm hover:border-gold-400 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl pointer-events-none group-hover:bg-gold-400/20 transition-all" />

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gold-400 shadow-gold-sm" />
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
                    24K GOLD (99.9% Pure)
                  </h3>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 border border-gold-500/30">
                  Fine Gold
                </span>
              </div>

              <div className="my-3">
                <div className="text-3xl sm:text-4xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-300 to-gold-400 tracking-tight">
                  {formatINR(gold24kRate, selectedUnit.grams < 1)}
                </div>
                <div className="text-xs font-medium text-slate-400 mt-1">
                  Indicative reference for {selectedUnit.label}
                </div>
              </div>

              <div className="pt-3 border-t border-gold-500/20 flex items-center justify-between text-[11px] text-slate-400">
                <span>Base: {formatINR(ratesData.gold24k)} / g</span>
                <span className="text-gold-400/80">999 Purity Bullion</span>
              </div>
            </div>

            {/* 22K Gold Card (Standard Jewellery Gold) */}
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900/90 via-navy-950 to-navy-900 border border-gold-500/40 p-6 shadow-gold-sm hover:border-gold-400 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-gold-500/20 transition-all" />

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gold-500 shadow-gold-sm" />
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
                    22K GOLD (91.6% Pure)
                  </h3>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 border border-gold-500/30">
                  Jewellery Standard
                </span>
              </div>

              <div className="my-3">
                <div className="text-3xl sm:text-4xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-amber-400 tracking-tight">
                  {formatINR(gold22kRate, selectedUnit.grams < 1)}
                </div>
                <div className="text-xs font-medium text-slate-400 mt-1">
                  Indicative reference for {selectedUnit.label}
                </div>
              </div>

              <div className="pt-3 border-t border-gold-500/20 flex items-center justify-between text-[11px] text-slate-400">
                <span>Base: {formatINR(ratesData.gold22k)} / g</span>
                <span className="text-gold-400/80">916 BIS Hallmark Basis</span>
              </div>
            </div>

            {/* 999 Silver Card */}
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900/90 via-navy-950 to-navy-900 border border-slate-500/40 p-6 shadow-sm hover:border-slate-300 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-300/10 rounded-full blur-2xl pointer-events-none group-hover:bg-slate-300/20 transition-all" />

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-300 shadow-sm" />
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
                    999 SILVER (Pure Silver)
                  </h3>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-600">
                  Fine Silver
                </span>
              </div>

              <div className="my-3">
                <div className="text-3xl sm:text-4xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
                  {formatINR(silver999Rate, selectedUnit.grams <= 10)}
                </div>
                <div className="text-xs font-medium text-slate-400 mt-1">
                  Indicative reference for {selectedUnit.label}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>Base: {formatINR(ratesData.silver999, true)} / g</span>
                <span className="text-slate-300">₹{Math.round(ratesData.silver999 * 1000).toLocaleString('en-IN')} / kg</span>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Custom Weight Calculator Expandable Drawer */}
        {calculatorOpen && ratesData && (
          <div className="mt-6 p-6 rounded-2xl bg-navy-900/95 border border-gold-500/40 shadow-navy-card backdrop-blur-md transition-all duration-300">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-gold-400 mb-1">
                  <Calculator className="w-4 h-4" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gold-300">
                    Indicative Valuation Calculator
                  </h4>
                </div>
                <p className="text-xs text-slate-300 max-w-xl">
                  Quickly estimate the indicative gross benchmark value for your gold or silver weight based on current market reference rates.
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                <div className="flex flex-col">
                  <label className="text-[11px] text-slate-400 uppercase font-medium mb-1">Metal & Karat</label>
                  <select
                    value={calcPurity}
                    onChange={(e) => setCalcPurity(e.target.value as any)}
                    className="bg-navy-950 border border-gold-500/30 text-gold-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gold-400"
                  >
                    <option value="22k">22K Gold (916 Jewellery)</option>
                    <option value="24k">24K Gold (999 Bullion)</option>
                    <option value="silver">999 Pure Silver</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-[11px] text-slate-400 uppercase font-medium mb-1">Weight (Grams)</label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={calcGrams}
                    onChange={(e) => setCalcGrams(parseFloat(e.target.value) || 0)}
                    className="w-32 bg-navy-950 border border-gold-500/30 text-gold-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gold-400"
                    placeholder="e.g. 10"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="text-[11px] text-slate-400 uppercase font-medium mb-1">Estimated Reference Value</label>
                  <div className="px-4 py-2 rounded-lg bg-gold-500/20 border border-gold-400/40 text-sm font-bold text-gold-200 min-w-[150px] text-center">
                    {formatINR(calculateEstimate())}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer info and Mandatory Disclaimer */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-gold-400" />
            <span>
              Last Updated:{" "}
              <strong className="text-slate-200">
                {lastFetched ? formatTimeAgo(lastFetched.toISOString()) : "Fetching..."}
              </strong>
            </span>
            <span className="text-slate-600">•</span>
           <span className="text-[11px] text-slate-400">
  Source: {ratesData?.source ?? "Live market reference"}
</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-gold-400/90 italic bg-navy-900/60 px-3 py-1 rounded-md border border-gold-500/20">
            <Info className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>
              Market/reference rates are indicative and may differ from Ranaha Gold Company&apos;s actual transaction rates.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
