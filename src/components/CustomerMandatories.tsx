"use client";

import React, { useState } from "react";
import { ShieldCheck, ShieldAlert, X, CheckCircle2 } from "lucide-react";

const mandatories = [
  {
    title: "Lawful ownership only",
    body: "The customer confirms that the gold or ornaments being sold are lawfully owned by them and are free of theft, dispute, or any third-party claim.",
  },
  {
    title: "If theft is found during verification (KYC stage)",
    body: "If, at any point during KYC or verification, the gold is found or reasonably suspected to be stolen property, the transaction is terminated immediately. The individual presenting the item is handed directly to the police, with no further processing, evaluation, or payment at that stage.",
  },
  {
    title: "If theft is discovered after the sale is complete",
    body: "If gold already sold to RANAHA is later found to have been stolen, the seller is legally liable for breach of trust under applicable law, and is required to compensate RANAHA Gold Company for any loss, damages, or legal costs arising from that breach.",
  },
  {
    title: "Original documentation required",
    body: "Valid, original identity documents must be presented for verification. Photocopies or digital copies alone are not accepted for final approval.",
  },
  {
    title: "Cooperation with authorities",
    body: "The seller agrees to cooperate fully with any police or regulatory inquiry connected to the transaction, both at the time of sale and afterward.",
  },
  {
    title: "No exceptions",
    body: "These mandatories apply uniformly to every branch, every transaction, and every customer, without exception.",
  },
];

export default function CustomerMandatories() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="text-center mb-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-sm transition-all"
          aria-label="Open Customer Mandatories"
        >
          <ShieldAlert className="w-4 h-4" />
          Customer Mandatories
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-navy-950/85 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Customer Mandatories"
        >
          <div className="relative w-full max-w-3xl bg-gradient-to-b from-navy-900 via-navy-950 to-navy-900 border border-gold-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[92vh]">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-navy-800 hover:bg-navy-700 border border-gold-500/20 transition-colors"
              aria-label="Close Customer Mandatories"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck className="w-6 h-6 text-gold-400" />
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">Customer Mandatories</h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              The following conditions apply uniformly to every branch, every transaction, and every customer, without exception.
            </p>

            <div className="grid gap-4">
              {mandatories.map((m, i) => (
                <div key={i} className="p-5 rounded-2xl bg-navy-950 border border-gold-500/15">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 font-serif font-bold text-sm shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{m.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{m.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-sm transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}