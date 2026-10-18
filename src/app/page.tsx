"use client";

import Navbar from "@/components/Navbar";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import AmbientBackground from "@/components/AmbientBackground";
import Hero from "@/components/Hero";
import LiveMetalRates from "@/components/LiveMetalRates";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import FranchiseSection from "@/components/FranchiseSection";
import MembershipSection from "@/components/MembershipSection";
import FundingSection from "@/components/FundingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomerMandatories from "@/components/CustomerMandatories";
import FiveStepProcess from "@/components/FiveStepProcess";
import CareersSection from "@/components/CareersSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <AnnouncementBanner />
      <AmbientBackground />

      <main className="relative z-20 bg-transparent">
        <Hero />

        <LiveMetalRates />

        <AboutSection />

        <ServicesSection />

        <FranchiseSection />

        <MembershipSection />

        <FundingSection />

        <CareersSection />

        <ContactSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CustomerMandatories />
        </div>

        <FiveStepProcess />
      </main>

      <Footer />
    </>
  );
}