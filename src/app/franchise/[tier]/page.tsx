"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Sparkles, Building, MapPin, Calendar, BadgePercent, TrendingUp, FileText, CheckCircle2, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import AmbientBackground from "@/components/AmbientBackground";
import Footer from "@/components/Footer";
import { franchiseTiers, whyConsiderFranchise } from "@/data/franchiseData";
import { cn } from "@/lib/utils";
import { commissionPolicyNotes } from "@/data/commissionData";

const TABS = [
  { id: "overview", label: "Overview", icon: Sparkles },
  { id: "benefits", label: "Benefits", icon: TrendingUp },
  { id: "terms", label: "Terms & Conditions", icon: FileText },
];

export default function FranchiseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tierId = params?.tier as string;

  const [activeTab, setActiveTab] = useState("overview");

  const tier = franchiseTiers.find((t) => t.id === tierId);

  if (!tier) {
    return (
      <div className="min-h-screen bg-navy-950 text-slate-200 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-serif font-bold text-gold-300 mb-4">
          Franchise Tier Not Found
        </h1>
        <p className="text-slate-400 mb-6">
          The franchise level you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/#franchise"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-400 text-navy-950 font-bold uppercase text-xs tracking-wider hover:bg-gold-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Franchises
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200 flex flex-col selection:bg-gold-500/30 selection:text-gold-200">
      <Navbar />
      <AnnouncementBanner />
      <AmbientBackground />

      <main className="relative z-20 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 flex-wrap">
            <li>
              <Link href="/" className="hover:text-gold-300 transition-colors">Home</Link>
            </li>
            <li><span className="text-gold-500/40">/</span></li>
            <li>
              <Link href="/#franchise" className="hover:text-gold-300 transition-colors">Franchise</Link>
            </li>
            <li><span className="text-gold-500/40">/</span></li>
            <li className="text-gold-300 font-medium truncate max-w-[200px] sm:max-w-xs" aria-current="page">
              {tier?.name || tierId}
            </li>
          </ol>
        </nav>

        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/#franchise"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold text-gold-300 bg-navy-900/80 border border-gold-500/30 hover:border-gold-400 hover:text-white transition-all duration-300 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Franchises</span>
          </Link>
        </div>

        {/* Hero Header for Tier */}
        <div
          className="p-8 sm:p-12 rounded-3xl border mb-10 shadow-navy-card relative overflow-hidden"
          style={{
            borderColor: tier.theme.borderGlow,
            background: tier.theme.bgGradient,
          }}
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden sm:block">
            <Building className="w-48 h-48 text-gold-300" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={cn(
                  "text-xs font-mono font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border",
                  tier.theme.badgeStyle
                )}
              >
                {tier.tierNumber} • {tier.badge}
              </span>
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 bg-navy-900/60 px-3 py-1 rounded-full border border-gold-500/20">
                <Calendar className="w-3.5 h-3.5 text-gold-400" />
                <span>{tier.validity}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-3">
              {tier.name}
            </h1>
            <p className="text-base sm:text-lg text-gold-200/90 font-medium mb-6">
              {tier.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2 bg-navy-950/80 px-4 py-2.5 rounded-xl border border-gold-500/25">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                <span>
                  <strong className="text-white">Territory:</strong> {tier.territory}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-2 p-1.5 rounded-2xl bg-navy-900/90 border border-gold-500/20 mb-10 no-scrollbar">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-r from-gold-400 to-gold-500 text-navy-950 shadow-gold-sm font-bold"
                    : "text-slate-300 hover:text-white hover:bg-navy-800/60"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-navy-950" : "text-gold-400")} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="space-y-12">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="p-8 sm:p-10 rounded-3xl bg-navy-900/80 border border-gold-500/25 shadow-navy-card">
                <h2 className="text-2xl font-serif font-bold text-white mb-4 flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-gold-400" />
                  <span>Overview & Role Purpose</span>
                </h2>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-6">
                  As a <strong className="text-gold-300">{tier.name}</strong> ({tier.subtitle}), you play a vital leadership and operational role in the Ranaha Gold Company business network across your assigned territory ({tier.territory}).
                </p>

                <div className="space-y-4 mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gold-400">
                    Key Responsibilities & Scope
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {tier.role.map((roleText, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-xl bg-navy-950/70 border border-gold-500/15"
                      >
                        <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-200 leading-relaxed">{roleText}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-navy-950/80 border border-gold-500/20">
                    <h4 className="text-xs uppercase font-bold tracking-widest text-gold-400 mb-2">
                      Infrastructure & Setup
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {tier.infrastructure}
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-navy-950/80 border border-gold-500/20">
                    <h4 className="text-xs uppercase font-bold tracking-widest text-gold-400 mb-2">
                      Agreement Validity
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      All franchise appointments carry a proposed duration of{" "}
                      <strong className="text-white">3 years</strong>, subject to formal signed agreement and renewal terms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BENEFITS */}
          {activeTab === "benefits" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="p-8 sm:p-10 rounded-3xl bg-navy-900/80 border border-gold-500/25 shadow-navy-card">
                <h2 className="text-2xl font-serif font-bold text-white mb-4 flex items-center gap-2.5">
                  <TrendingUp className="w-5 h-5 text-gold-400" />
                  <span>Strategic Franchise Benefits</span>
                </h2>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-8">
                  Operating under the Ranaha Gold brand provides structured support, brand equity, marketing guidance, and multi-tier business growth opportunities.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {whyConsiderFranchise.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-navy-950/80 border border-gold-500/20 flex flex-col justify-start"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
                        <BadgePercent className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-serif font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TERMS & CONDITIONS */}
          {activeTab === "terms" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="p-8 sm:p-10 rounded-3xl bg-navy-900/80 border border-gold-500/25 shadow-navy-card">
                <h2 className="text-2xl font-serif font-bold text-white mb-4 flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-gold-400" />
                  <span>Terms, Policies & Disclosures</span>
                </h2>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-6">
                  Official policy notes and legal disclaimers governing franchise appointments, renewals, territory rights, and commission settlements.
                </p>

                <div className="space-y-4 mb-8">
                  {commissionPolicyNotes.map((note, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl bg-navy-950/80 border border-gold-500/20 text-xs sm:text-sm text-slate-300 leading-relaxed"
                    >
                      <Info className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>

                <div className="p-5 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-start gap-3 text-xs text-gold-200 leading-relaxed">
                  <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gold-300 font-semibold">Formal Agreement Governing Terms:</strong>{" "}
                    All franchise appointments, deposits, commissions, allocations, and operating conditions are subject to a formal signed agreement, applicable laws, and company policy. No earnings or financial returns are guaranteed.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
