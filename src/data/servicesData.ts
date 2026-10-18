import { ServiceItem } from "@/types";

export const companyServices: ServiceItem[] = [
  {
    id: "gold-pledging",
    title: "Gold Pledging",
    tagline: "Instant Liquidity Against Physical Gold",
    brief: "Gold-backed pledging services, subject to appraisal, eligibility, documentation and applicable terms.",
    description:
      "Ranaha Gold Company provides structured gold-backed pledging options designed to offer fast, transparent liquidity against your physical gold ornaments and assets. Every appraisal follows a clear, documented evaluation process with customer-first safety and transparency.",
    icon: "Coins",
    highlights: [
      "Rigorous and transparent purity assessment in front of the customer",
      "Subject to appraisal, eligibility, and regulatory documentation",
      "Safe and secure vault custody for all pledged gold assets",
      "Clear terms, repayment schedules, and documentation provided before processing",
    ],
    disclaimer: "Subject to appraisal, eligibility, documentation, and applicable credit/pledge terms.",
  },
  {
    id: "gold-buying",
    title: "Gold Buying",
    tagline: "Transparent Evaluation & Direct Purchase",
    brief: "Gold purchase services with assessment and transaction details explained to the customer.",
    description:
      "Sell your gold ornaments and items with complete peace of mind. Our local branches conduct precise evaluations, explaining purity metrics, weight deductions, and current transaction calculations transparently to the customer before completing any transaction.",
    icon: "Scale",
    highlights: [
      "Live market reference-based valuation methodology",
      "Comprehensive purity and karat breakdown explained step-by-step",
      "Instant settlement upon document verification and customer confirmation",
      "Full compliance with state and central trade guidelines",
    ],
    disclaimer: "Transaction details and valuations are explained to the customer prior to purchase completion.",
  },
  {
    id: "ornaments-making",
    title: "Ornaments Making",
    tagline: "Custom Jewellery Crafted to Your Vision",
    brief: "Create jewellery that reflects your personal style with custom ornament-making services.",
    description:
      "Create jewellery that reflects your personal style with custom ornament-making services. Discuss your preferred designs, jewellery styles, finishing and making requirements with our team. Our skilled artisans work closely with you to bring your unique vision to life, ensuring every piece is crafted with precision and care.",
    icon: "Sparkles",
    highlights: [
      "Custom designs tailored to your personal style and preferences",
      "Expert guidance on jewellery styles, materials, and finishes",
      "Transparent pricing and making-charge breakdowns",
      "Quality assurance with proper hallmarking and certification",
    ],
    disclaimer: "Subject to design consultation, material availability, and making timeline.",
  },
  {
    id: "membership-cards",
    title: "Membership Cards",
    tagline: "Exclusive Privilege Programs for Lasting Value",
    brief: "Silver and Gold membership options with stated fees, benefits and validity.",
    description:
      "Ranaha Gold Company offers dedicated Silver and Gold Membership Cards providing substantial service benefit vouchers across multiple service visits, helping members unlock significant cumulative value on gold transactions.",
    icon: "Sparkles",
    highlights: [
      "Silver Membership: ₹0 fee with ₹5,000 in service benefits across 4 uses (1 Year)",
      "Gold Membership: ₹5,000 + GST with ₹20,000 in service benefits across 4 uses (3 Years)",
      "Dedicated privilege card artwork with unique membership identifier",
      "Redeemable across authorized Ranaha Gold Company branch network",
    ],
    disclaimer: "Benefits, validity, redemption rules, and conditions provided in writing at enrolment.",
  },
];
