import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { playfair, dm_sans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ranaha Gold Company | Real Gold • Real Value",
  description:
    "Official website of Ranaha Gold Company — a growing gold-services brand from Andhra Pradesh. Explore live gold & silver rates, franchise tiers (Platinum, Diamond, Gold, Silver), gold pledging, buying, EMI services, membership privilege cards, and funding opportunities.",
  keywords: [
    "Ranaha Gold Company",
    "gold rates India",
    "22K gold rate",
    "24K gold rate",
    "silver rate",
    "gold franchise",
    "gold pledging",
    "gold buying",
    "gold EMI",
    "membership card",
    "Andhra Pradesh",
    "Kurnool",
  ].join(", "),
  authors: [{ name: "Ranaha Gold Company" }],
  creator: "Ranaha Gold Company",
  publisher: "Ranaha Gold Company",
  openGraph: {
    title: "Ranaha Gold Company | Real Gold • Real Value",
    description:
      "Explore live gold & silver rates, franchise tiers, gold services, and membership privilege cards from Ranaha Gold Company.",
    url: "https://www.ranahagold.com",
    siteName: "Ranaha Gold Company",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ranaha Gold Company | Real Gold • Real Value",
    description: "Live gold & silver rates, franchise tiers, and membership privilege cards.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.className} ${dm_sans.className}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-navy-950 text-slate-200 antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}