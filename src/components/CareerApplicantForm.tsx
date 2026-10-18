"use client";

import React from "react";

interface Props {
  form: any;
  setForm: (f: any) => void;
}

export default function CareerApplicantForm({ form, setForm }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-gold-300 mb-1.5">Full Name</label>
        <input id="fullName" type="text" value={form.fullName || ""} onChange={e => setForm({ ...form, fullName: e.target.value })} className="w-full bg-navy-950 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-400" placeholder="Your full name" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gold-300 mb-1.5">Gmail / Email</label>
          <input id="email" type="email" value={form.email || ""} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full bg-navy-950 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-400" placeholder="you@gmail.com" />
        </div>
        <div>
          <label htmlFor="mobile" className="block text-xs font-bold uppercase tracking-wider text-gold-300 mb-1.5">Mobile Number</label>
          <input id="mobile" type="tel" value={form.mobile || ""} onChange={e => setForm({ ...form, mobile: e.target.value })} className="w-full bg-navy-950 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-400" placeholder="+91 98765 43210" />
        </div>
      </div>
      <div>
        <label htmlFor="address" className="block text-xs font-bold uppercase tracking-wider text-gold-300 mb-1.5">Address</label>
        <textarea id="address" rows={3} value={form.address || ""} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full bg-navy-950 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-400" placeholder="Your address" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-navy-900 border border-gold-500/20 rounded-xl px-3 py-2">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">State (auto-filled)</div>
          <div className="text-sm font-medium text-gold-200">{form.state || "—"}</div>
        </div>
        <div className="bg-navy-900 border border-gold-500/20 rounded-xl px-3 py-2">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">District (auto-filled)</div>
          <div className="text-sm font-medium text-gold-200">{form.district || "—"}</div>
        </div>
      </div>
    </div>
  );
}
