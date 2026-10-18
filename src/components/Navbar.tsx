"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  TrendingUp,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Phone,
  Briefcase,
} from "lucide-react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#live-rates", label: "Live Rates" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#franchise", label: "Franchise" },
  { href: "#membership", label: "Membership" },
  { href: "#funding", label: "Funding" },
  { href: "#careers", label: "Careers" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ }: { onOpenCareers?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on hash click or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-navy-950/90 backdrop-blur-md border-b border-gold-500/20 py-3 shadow-navy-card"
            : "bg-gradient-to-b from-navy-950/80 to-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 bg-navy-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold-500/20 shadow-inner">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200",
                      isActive
                        ? "text-gold-200 bg-gold-500/20 shadow-sm border border-gold-400/30"
                        : "text-slate-300 hover:text-gold-300 hover:bg-gold-500/10"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Quick Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="#live-rates"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gold-300 bg-navy-800/80 border border-gold-500/30 hover:bg-gold-500/10 transition-colors"
                aria-label="View live market reference rates"
              >
                <TrendingUp className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
                <span>Live Rates</span>
              </Link>

              <Link
                href="#franchise"
                className="relative group overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-sm hover:shadow-gold-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span className="relative z-10">Explore Franchise</span>
                <ChevronRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              </Link>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <Link
                href="#live-rates"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gold-300 bg-navy-800/80 border border-gold-500/30"
              >
                <TrendingUp className="w-3.5 h-3.5 text-gold-400" />
                <span className="text-[11px]">Rates</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gold-300 hover:text-white bg-navy-850/80 border border-gold-500/30 hover:bg-gold-500/20 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Menu */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-navy-900 border-l border-gold-500/30 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-gold-500/20">
                <Logo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links list */}
              <nav className="mt-6 flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive
                          ? "text-gold-200 bg-gold-500/20 border border-gold-500/30 font-semibold"
                          : "text-slate-300 hover:text-gold-200 hover:bg-navy-800"
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-gold-500/60" />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions inside Drawer */}
            <div className="mt-8 pt-6 border-t border-gold-500/20 flex flex-col gap-3">
              <Link
                href="#franchise"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 shadow-gold-sm"
              >
                <span>Explore Franchise</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-xs text-gold-300 bg-navy-800/80 border border-gold-500/30"
              >
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>Contact Branch Network</span>
              </Link>

              <Link
                href="#careers"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-xs text-gold-300 bg-navy-800/80 border border-gold-500/30"
              >
                <Briefcase className="w-3.5 h-3.5 text-gold-400" />
                <span>Careers</span>
              </Link>

              <div className="text-center mt-2">
                <p className="text-[11px] text-slate-400 tracking-wider">
                  REAL GOLD • REAL VALUE • LOCAL SERVICE
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  Origins: Ananparthi | Hub: Kurnool, AP
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
