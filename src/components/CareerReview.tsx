"use client";

import React from "react";

interface Props {
  form: any;
  onEdit: () => void;
  onBack: () => void;
  onSubmit?: () => void;
}

export default function CareerReview({ form, onEdit, onBack, onSubmit }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-navy-900/60 border border-gold-500/20 rounded-2xl p-5 space-y-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gold-300">Personal Details & Location</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-200">
          <div><span className="text-slate-400">Name:</span> <span className="font-medium text-white">{form.fullName || "—"}</span></div>
          <div><span className="text-slate-400">Email:</span> <span className="font-medium text-white">{form.email || "—"}</span></div>
          <div><span className="text-slate-400">Mobile:</span> <span className="font-medium text-white">{form.mobile || "—"}</span></div>
          <div><span className="text-slate-400">Address:</span> <span className="font-medium text-white">{form.address || "—"}</span></div>
          <div><span className="text-slate-400">State:</span> <span className="font-medium text-gold-200">{form.state || "—"}</span></div>
          <div><span className="text-slate-400">District:</span> <span className="font-medium text-gold-200">{form.district || "—"}</span></div>
        </div>
      </div>
      <div className="bg-navy-900/60 border border-gold-500/20 rounded-2xl p-5 space-y-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gold-300">Education</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-200">
          <div><span className="text-slate-400">Qualification:</span> <span className="font-medium text-white">{form.qualification || "—"}</span></div>
          <div><span className="text-slate-400">Degree / Course:</span> <span className="font-medium text-white">{form.degree || "—"}</span></div>
          <div><span className="text-slate-400">Specialisation:</span> <span className="font-medium text-white">{form.specialisation || "—"}</span></div>
          <div><span className="text-slate-400">College:</span> <span className="font-medium text-white">{form.college || "—"}</span></div>
          <div><span className="text-slate-400">Graduation Year:</span> <span className="font-medium text-white">{form.graduationYear || "—"}</span></div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <button onClick={onEdit} className="px-4 py-2.5 rounded-xl border border-gold-500/30 text-gold-300 text-xs font-bold uppercase tracking-wider hover:bg-gold-500/10 transition">Edit Details</button>
        <button onClick={onBack} className="px-4 py-2.5 rounded-xl border border-slate-600 text-slate-300 text-xs font-bold uppercase tracking-wider hover:bg-navy-800 transition">Back</button>
        <button onClick={onSubmit} className="ml-auto px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-300 to-gold-500 shadow-gold-sm hover:shadow-gold-md transition">Coming Soon</button>
      </div>
    </div>
  );
}
