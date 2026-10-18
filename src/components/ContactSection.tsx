"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Layers,
  CreditCard,
  Building2,
  HelpCircle,
} from "lucide-react";
import { stateOptions, districtOptions } from "@/data/locationData";

const enquiryTypes = [
  {
    value: "franchise",
    label: "Franchise Enquiry",
    description: "Interested in Platinum, Diamond, Gold, or Silver Franchise",
    icon: Layers,
  },
  {
    value: "membership",
    label: "Membership Enquiry",
    description: "Silver or Gold Membership Card Application",
    icon: CreditCard,
  },
  {
    value: "funding",
    label: "Funding / Partnership",
    description: "Strategic investment or partnership dialogue",
    icon: Building2,
  },
  {
    value: "general",
    label: "General Enquiry",
    description: "Any other questions or service inquiry",
    icon: HelpCircle,
  },
];

export default function ContactSection() {
  const [enquiryType, setEnquiryType] = useState("franchise");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    investmentBudget: "",
    applicantState: "",
    applicantDistrict: "",
    preferredState: "",
    preferredDistrict: "",
    preferredTier: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "coming-soon">("idle");
  const [responseMsg, setResponseMsg] = useState("");
  const [referenceId, setReferenceId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("coming-soon");
  };

  return (
    <section id="contact" className="relative py-24 bg-navy-950/3580 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-gold-400" />
            <span>CONTACT RANAHA GOLD COMPANY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Get In Touch With Our Network
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            For franchise inquiries, membership applications, funding discussions, or general questions — connect with an authorised Ranaha Gold Company representative.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Enquiry Guidance */}
          <div className="lg:col-span-4 space-y-5">
            {/* Quick Enquiry Type Info */}
            <div className="p-5 rounded-2xl bg-navy-900/60 border border-gold-500/20 text-xs text-slate-400 space-y-2">
              <div className="font-bold text-slate-200 mb-2">Quick Navigation</div>
              <div className="space-y-1">
                <p>• <strong className="text-slate-300">Franchise:</strong> Platinum, Diamond, Gold, or Silver tiers</p>
                <p>• <strong className="text-slate-300">Membership:</strong> Silver or Gold Card enrollment</p>
                <p>• <strong className="text-slate-300">Funding:</strong> Strategic or institutional partnership</p>
                <p>• <strong className="text-slate-300">General:</strong> Services, branches, or other queries</p>
              </div>
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="lg:col-span-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-navy-900 via-navy-950 to-navy-900 border border-gold-500/40 shadow-gold-sm">
              {/* Enquiry Type Selector */}
              <div className="mb-7">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  Select Enquiry Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {enquiryTypes.map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setEnquiryType(t.value)}
                        className={`p-3 rounded-xl border text-left transition-all text-xs ${
                          enquiryType === t.value
                            ? "bg-gold-500/20 border-gold-400 text-gold-200 shadow-gold-sm"
                            : "bg-navy-950/80 border-gold-500/20 text-slate-300 hover:border-gold-500/40"
                        }`}
                        aria-pressed={enquiryType === t.value}
                      >
                        <Icon className="w-4 h-4 mb-1.5 text-gold-400" />
                        <span className="font-semibold block">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Success State */}
              {status === "coming-soon" && (
                <div className="p-5 rounded-2xl bg-amber-950/60 border border-gold-400/40 text-gold-200 mb-6 text-center shadow-gold-sm">
                  <h4 className="text-lg font-serif font-bold text-white">Coming Soon!</h4>
                  <p className="text-xs sm:text-sm mt-1">We're preparing this feature for you. Online submissions will be available soon. Please check back later.</p>
                  <button type="button" onClick={() => setStatus("idle")} className="mt-3 px-4 py-2 rounded-xl bg-gold-500/20 border border-gold-400/40 text-xs font-bold text-gold-200 hover:bg-gold-500/30 transition-colors">Dismiss</button>
                </div>
              )}

              {status === "success" && (
                <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 mb-6 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                  <h4 className="text-lg font-serif font-bold text-white">Enquiry Received</h4>
                  <p className="text-xs sm:text-sm mt-1 text-emerald-300">{responseMsg}</p>
                  {referenceId && (
                    <div className="mt-3 inline-block px-3 py-1.5 rounded bg-emerald-900/80 text-xs font-mono font-bold text-emerald-200 border border-emerald-500/40">
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

              {/* Error State */}
              {status === "error" && (
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs mb-6 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{responseMsg}</span>
                </div>
              )}

              {status !== "success" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Section 1: Contact Information */}
                  <div className="p-5 rounded-2xl bg-navy-950/70 border border-gold-500/20 mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-3">1. Contact Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Full Name *</label>
                        <input type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Your full name" className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-gold-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Phone Number *</label>
                        <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-gold-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Email Address</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your.email@example.com" className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-gold-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Investment Budget */}
                  <div className="p-5 rounded-2xl bg-navy-950/70 border border-gold-500/20 mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-3">2. Investment Budget</h4>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Investment Range *</label>
                      <select required value={formData.investmentBudget} onChange={(e) => setFormData({ ...formData, investmentBudget: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-gold-500/30 text-gold-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors">
                        <option value="">Select investment range...</option>
                        <option value="35-75-lakh">Investment Range — ₹35 – 75 Lakh</option>
                      </select>
                    </div>
                  </div>

                  {/* Section 3: Applicant Location */}
                  <div className="p-5 rounded-2xl bg-navy-950/70 border border-gold-500/20 mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-3">3. Applicant Location</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Applicant State *</label>
                        <select required value={formData.applicantState} onChange={(e) => setFormData({ ...formData, applicantState: e.target.value, applicantDistrict: "" })} className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-gold-500/30 text-gold-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors">
                          <option value="">Select state...</option>
                          {stateOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Applicant District *</label>
                        <select required value={formData.applicantDistrict} onChange={(e) => setFormData({ ...formData, applicantDistrict: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-gold-500/30 text-gold-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors" disabled={!formData.applicantState || formData.applicantState === "others"}>
                          <option value="">Select district...</option>
                          {(districtOptions[formData.applicantState] || []).map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Preferred Franchise Location */}
                  <div className="p-5 rounded-2xl bg-navy-950/70 border border-gold-500/20 mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-3">4. Preferred Franchise Location</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Preferred Franchise State *</label>
                        <select required value={formData.preferredState} onChange={(e) => setFormData({ ...formData, preferredState: e.target.value, preferredDistrict: "" })} className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-gold-500/30 text-gold-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors">
                          <option value="">Select state...</option>
                          {stateOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Preferred Franchise District *</label>
                        <select required value={formData.preferredDistrict} onChange={(e) => setFormData({ ...formData, preferredDistrict: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-gold-500/30 text-gold-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors" disabled={!formData.preferredState || formData.preferredState === "others"}>
                          <option value="">Select district...</option>
                          {(districtOptions[formData.preferredState] || []).map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Franchise Level */}
                  <div className="p-5 rounded-2xl bg-navy-950/70 border border-gold-500/20 mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-3">5. Franchise Level</h4>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Preferred Franchise Level *</label>
                      <select required value={formData.preferredTier} onChange={(e) => setFormData({ ...formData, preferredTier: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-gold-500/30 text-gold-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors">
                        <option value="">Select franchise level...</option>
                        <option value="platinum">Platinum Franchise</option>
                        <option value="diamond">Diamond Franchise</option>
                        <option value="gold">Gold Franchise</option>
                        <option value="silver">Silver Franchise</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Message</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Provide additional context, questions, or your specific interest..."
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-gold-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "coming-soon"}
                    className="w-full relative group overflow-hidden flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-sm hover:shadow-gold-md transition-all duration-300 disabled:opacity-60"
                  >
                    <span className="relative z-10">Coming Soon</span>
                    <Send className="w-4 h-4 relative z-10" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
