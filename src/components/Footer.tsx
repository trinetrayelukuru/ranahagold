import React from "react";
import Link from "next/link";
import { ShieldCheck, Sparkles, Lock } from "lucide-react";
import { companyInfo } from "@/data/companyData";

export default function Footer() {
  return (
    <footer id="footer" className="relative bg-navy-950 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-gold-400" />
              <span className="font-serif text-xl font-bold text-white">Ranaha Gold</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {companyInfo.brandPromise}
            </p>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              {companyInfo.foundingStory.originLocation} — founded by Mr. Sai & Mr. Bharat Reddy. First branch at Kurnool, Andhra Pradesh. Key person Mr. Kirankumar Reddy.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400 mb-4">Sections</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#about" className="hover:text-gold-300 transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-gold-300 transition-colors">Services</a></li>
              <li><a href="#franchise" className="hover:text-gold-300 transition-colors">Franchise</a></li>
              <li><a href="#commission" className="hover:text-gold-300 transition-colors">Commission</a></li>
              <li><a href="#membership" className="hover:text-gold-300 transition-colors">Membership</a></li>
              <li><a href="#funding" className="hover:text-gold-300 transition-colors">Funding</a></li>
            </ul>
          </div>

          {/* Legal / Disclaimer */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400 mb-4">Disclaimers</h4>
            <div className="text-[10px] text-slate-500 leading-relaxed space-y-2">
              <p><strong className="text-slate-400">Rates:</strong> {companyInfo.disclaimers.rates}</p>
              <p><strong className="text-slate-400">General:</strong> {companyInfo.disclaimers.general}</p>
              <p><strong className="text-slate-400">Membership:</strong> {companyInfo.disclaimers.membership}</p>
              <p><strong className="text-slate-400">Funding:</strong> {companyInfo.disclaimers.funding}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold-500/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            <span>Ranaha Gold Company. Real Gold • Real Value. All rights reserved.</span>
          </div>
          <div className="flex gap-4 items-center">
            <a href="#" className="hover:text-gold-300">Privacy</a>
            <a href="#" className="hover:text-gold-300">Terms</a>
            <a href="#" className="hover:text-gold-300">Disclosures</a>
            <Link href="/admin/login" className="flex items-center gap-1 text-gold-400/70 hover:text-gold-300 transition-colors text-[10px]"><Lock className="w-3 h-3" />Admin Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
