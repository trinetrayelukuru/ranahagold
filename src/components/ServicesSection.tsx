"use client";

import React, { useState } from "react";
import {
  Coins,
  Scale,
  CreditCard,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  X,
  Info,
  ShieldCheck,
} from "lucide-react";
import { companyServices } from "@/data/servicesData";
import { ServiceItem } from "@/types";

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Coins":
        return <Coins className="w-6 h-6 text-gold-400" />;
      case "Scale":
        return <Scale className="w-6 h-6 text-gold-400" />;
      case "CreditCard":
        return <CreditCard className="w-6 h-6 text-gold-400" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-gold-400" />;
      default:
        return <Coins className="w-6 h-6 text-gold-400" />;
    }
  };

  return (
    <section id="services" className="relative py-16 bg-navy-950/3550 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-3">
            <Coins className="w-3.5 h-3.5 text-gold-400" />
            <span>CORE GOLD SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            What We Do
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Essential, transparent, and structured gold services delivered locally with customer-first integrity and clear documentation.
          </p>
        </div>

        {/* 4 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyServices.map((service, index) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between p-7 rounded-3xl bg-gradient-to-br from-navy-900/90 via-navy-950 to-navy-900 border border-gold-500/30 hover:border-gold-400 shadow-navy-card hover:shadow-gold-md transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent group-hover:via-gold-400 transition-all duration-300" />

              <div>
                {/* Icon & Number Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-500/20 to-navy-900 border border-gold-500/40 flex items-center justify-center shadow-gold-sm group-hover:scale-105 transition-transform duration-300">
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-gold-400/80 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold-200 transition-colors mb-2">
                  {service.title}
                </h3>

                {/* Tagline */}
                <div className="text-xs font-semibold text-gold-400 mb-3">
                  {service.tagline}
                </div>

                {/* Brief from brochure */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {service.brief}
                </p>
              </div>

              {/* Action Button & Disclaimer */}
              <div>
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-gold-300 bg-navy-850/80 hover:bg-gold-500/20 border border-gold-500/30 hover:border-gold-400 transition-all duration-200"
                  aria-label={`View details about ${service.title}`}
                >
                  <span>Learn Details</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[10px] text-slate-300/90 italic mt-3 line-clamp-1">
                  *{service.disclaimer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal / Expanded Details */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-fadeIn">
            <div
              className="relative w-full max-w-2xl bg-gradient-to-b from-navy-900 via-navy-950 to-navy-900 border border-gold-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-service-title"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-navy-800 hover:bg-navy-700 border border-gold-500/20 focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
                  {getServiceIcon(selectedService.icon)}
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gold-400">
                    Ranaha Gold Core Service
                  </span>
                  <h3 id="modal-service-title" className="text-2xl font-serif font-bold text-white">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-gold-200 font-medium mb-4">
                {selectedService.tagline}
              </p>

              <div className="p-4 rounded-xl bg-navy-950/80 border border-gold-500/20 mb-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
                <p>{selectedService.description}</p>
              </div>

              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                Key Service Highlights
              </h4>
              <ul className="space-y-2.5 mb-6">
                {selectedService.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-start gap-2.5 text-xs text-gold-200/90 mb-6">
                <Info className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Official Condition:</strong> {selectedService.disclaimer}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="flex-1 text-center py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 shadow-gold-sm hover:shadow-gold-md"
                >
                  Enquire About {selectedService.title}
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-3 rounded-xl text-xs font-semibold text-slate-300 bg-navy-800 hover:bg-navy-700 border border-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
