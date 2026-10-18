"use client";

import React from "react";

interface Props {
  form: any;
  setForm: (f: any) => void;
}

export default function CareerEducationForm({ form, setForm }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="qualification" className="block text-xs font-bold uppercase tracking-wider text-gold-300 mb-1.5">Highest Qualification</label>
        <select id="qualification" value={form.qualification || ""} onChange={e => setForm({ ...form, qualification: e.target.value })} className="w-full bg-navy-950 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-400">
          <option value="">Select</option><option>10th / SSLC</option><option>12th / Intermediate</option><option>Diploma</option><option>Bachelor's Degree</option><option>Master's Degree</option><option>PhD</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="degree" className="block text-xs font-bold uppercase tracking-wider text-gold-300 mb-1.5">Degree / Course</label>
          <input id="degree" value={form.degree || ""} onChange={e => setForm({ ...form, degree: e.target.value })} className="w-full bg-navy-950 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-400" placeholder="e.g. B.Com, B.Tech" />
        </div>
        <div>
          <label htmlFor="specialisation" className="block text-xs font-bold uppercase tracking-wider text-gold-300 mb-1.5">Specialisation / Branch</label>
          <input id="specialisation" value={form.specialisation || ""} onChange={e => setForm({ ...form, specialisation: e.target.value })} className="w-full bg-navy-950 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-400" placeholder="e.g. Finance, CS" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="college" className="block text-xs font-bold uppercase tracking-wider text-gold-300 mb-1.5">College / University</label>
          <input id="college" value={form.college || ""} onChange={e => setForm({ ...form, college: e.target.value })} className="w-full bg-navy-950 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-400" placeholder="Institution name" />
        </div>
        <div>
          <label htmlFor="year" className="block text-xs font-bold uppercase tracking-wider text-gold-300 mb-1.5">Graduation Year</label>
          <input id="year" type="number" min="1950" max="2030" value={form.graduationYear || ""} onChange={e => setForm({ ...form, graduationYear: e.target.value })} className="w-full bg-navy-950 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-400" placeholder="YYYY" />
        </div>
      </div>
    </div>
  );
}
