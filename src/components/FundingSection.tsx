"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Building2,
  ShieldCheck,
  Network,
  FileCheck2,
  Coins,
  MapPin,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { fundingSectionData } from "@/data/fundingData";

export default function FundingSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    email: "",
    phone: "",
    fundingInterest: "business_funding",
    fundingRange: "prefer_discuss",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "coming-soon">("idle");
  const [responseMsg, setResponseMsg] = useState("");
  const [referenceId, setReferenceId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("coming-soon");
    setResponseMsg("We're preparing this feature for you. Online submissions will be available soon.");
  };

  return (
    <section id="funding" className="relative py-24 bg-navy-950/35 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-3">
            <Building2 className="w-3.5 h-3.5 text-gold-400" />
            <span>INSTITUTIONAL & STRATEGIC COLLABORATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Interested in Funding Our Growth?
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            {fundingSectionData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Strategic Pillars & Governance */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 border border-gold-500/30 shadow-navy-card">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-gold-400">
                Partner With Ranaha Gold
              </span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1 mb-4">
                Structured Growth & Regional Presence
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Our vision connects essential gold-backed liquidity and customer privilege programs with a disciplined, multi-tiered franchise infrastructure across regional and local markets.
              </p>

              <div className="space-y-4">
                {fundingSectionData.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-navy-950/70 border border-gold-500/10">
                    <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0 mt-0.5">
                      {i === 0 && <Network className="w-4 h-4" />}
                      {i === 1 && <Coins className="w-4 h-4" />}
                      {i === 2 && <FileCheck2 className="w-4 h-4" />}
                      {i === 3 && <MapPin className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">{h.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{h.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formal Due Diligence Notice */}
            <div className="p-6 rounded-2xl bg-navy-900/60 border border-gold-500/20 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-gold-300">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Regulatory & Due Diligence Standards</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                {fundingSectionData.disclaimer}
              </p>
            </div>
          </div>

          {/* Right Column: Funding Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-navy-900 via-navy-950 to-navy-900 border border-gold-500/40 shadow-gold-sm">
              <div className="flex items-center justify-between pb-6 border-b border-gold-500/20 mb-6">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-400">
                    Direct Representative Connect
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white mt-0.5">
                    Funding Enquiry Form
                  </h3>
                </div>
                <div className="p-2.5 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-400">
                  <Coins className="w-6 h-6" />
                </div>
              </div>

              {/* Form Success State */}
              {status === "success" && (
                <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 mb-6 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                  <h4 className="text-lg font-serif font-bold text-white">Enquiry Transmitted</h4>
                  <p className="text-xs sm:text-sm mt-1 text-emerald-300/90">{responseMsg}</p>
                  {referenceId && (
                    <div className="mt-3 inline-block px-3 py-1 rounded bg-emerald-900/80 text-xs font-mono font-bold text-emerald-200 border border-emerald-500/40">
                      Reference ID: {referenceId}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-5 block w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-xs font-bold text-white transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              )}

              {/* Form Error State */}
              {status === "error" && (
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs mb-6 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{responseMsg}</span>
                </div>
              )}

              {status !== "success" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-gold-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Company / Organisation
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. Apex Capital / Family Office"
                        className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-gold-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-gold-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Official Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rajesh@organization.com"
                        className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-gold-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Funding Interest
                      </label>
                      <select
                        value={formData.fundingInterest}
                        onChange={(e) => setFormData({ ...formData, fundingInterest: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-gold-500/30 text-gold-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors"
                      >
                        {fundingSectionData.fundingInterestOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Approximate Funding Range
                      </label>
                      <select
                        value={formData.fundingRange}
                        onChange={(e) => setFormData({ ...formData, fundingRange: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-gold-500/30 text-gold-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors"
                      >
                        {fundingSectionData.fundingRangeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Message / Partnership Focus
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly state your strategic focus, regional alignment, or discussion objectives..."
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-gold-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full relative group overflow-hidden flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-sm hover:shadow-gold-md transition-all duration-300 disabled:opacity-50"
                  >
                    <span className="relative z-10">
                      "Coming Soon"
                    </span>
                    <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                  </button>

                  <p className="text-[10px] text-slate-300/90 text-center pt-2">
                    *All discussions are kept strictly confidential. No financial returns or yields are guaranteed.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
