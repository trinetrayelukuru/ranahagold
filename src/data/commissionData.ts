import {
  CoreCommissionRate,
  GroundUpChainLevel,
  GoldCardCommissionEntry,
} from "@/types";

export const coreCommissionRates: CoreCommissionRate[] = [
  {
    id: "gold-buying",
    activity: "Gold Buying",
    ratePercent: 1.5,
    rateFormatted: "1.50%",
    basis: "Eligible Gold-Buying Business Value",
    note: "Calculated on the eligible gold-buying transaction/business value as defined in company policy.",
  },
  {
    id: "gold-sales",
    activity: "Gold Sales",
    ratePercent: 1.0,
    rateFormatted: "1.00%",
    basis: "Eligible Gold-Sales Business Value",
    note: "Calculated on the eligible gold-sales transaction/business value as defined in company policy.",
  },
  {
    id: "pawn-broking",
    activity: "Pawn Broking / Gold Pledging",
    ratePercent: 0.25,
    rateFormatted: "0.25%",
    basis: "Eligible Pawn-Broking Transaction Value",
    note: "Calculated on the eligible pawn-broking transaction value as defined in company policy.",
  },
];

export const groundUpBenefitChain: GroundUpChainLevel[] = [
  {
    levelNumber: 1,
    tierId: "silver",
    title: "Silver Franchise",
    share: "Base / Ground-Level Commission",
    calculationMethod:
      "Receives the direct core business commission (1.50% Buying, 1.00% Sales, 0.25% Pledging) for eligible business booked at village level.",
    arrowText: "5% of Silver Commission Amount",
    exampleBasis: "Example: On ₹10,000 Silver commission → earns ₹10,000",
  },
  {
    levelNumber: 2,
    tierId: "gold",
    title: "Gold Franchise",
    share: "5% of Silver Commission",
    calculationMethod:
      "Calculated as 5% on the direct commission amount earned by the Silver Franchise immediately below.",
    arrowText: "5% of Gold Commission Amount",
    exampleBasis: "Example: 5% of ₹10,000 Silver commission = ₹500",
  },
  {
    levelNumber: 3,
    tierId: "diamond",
    title: "Diamond Franchise",
    share: "5% of Gold Commission",
    calculationMethod:
      "Calculated as 5% on the commission amount earned by the Gold Franchise immediately below.",
    arrowText: "5% of Diamond Commission Amount",
    exampleBasis: "Example: 5% of ₹500 Gold commission = ₹25",
  },
  {
    levelNumber: 4,
    tierId: "platinum",
    title: "Platinum Franchise",
    share: "5% of Diamond Commission",
    calculationMethod:
      "Calculated as 5% on the commission amount earned by the Diamond Franchise immediately below.",
    exampleBasis: "Example: 5% of ₹25 Diamond commission = ₹1.25",
  },
];

export const goldMembershipCommissions: GoldCardCommissionEntry[] = [
  {
    role: "Booking Point (Card Booker)",
    tierId: "booking",
    amount: 1000,
    amountFormatted: "₹1,000",
    rule: "Paid directly to whichever franchise level books the card. If a Silver Franchise books it, the Silver Franchise receives the full ₹1,000 booking commission.",
  },
  {
    role: "Platinum Franchise",
    tierId: "platinum",
    amount: 750,
    amountFormatted: "₹750",
    rule: "Paid when eligible under the approved upline commission structure for qualifying bookings in the region.",
  },
  {
    role: "Diamond Franchise",
    tierId: "diamond",
    amount: 500,
    amountFormatted: "₹500",
    rule: "Paid when eligible under the approved upline commission structure for qualifying regional bookings.",
  },
  {
    role: "Gold Franchise",
    tierId: "gold",
    amount: 250,
    amountFormatted: "₹250",
    rule: "Paid when eligible under the approved upline commission structure for qualifying mandal bookings.",
  },
];

export const commissionPolicyNotes = [
  "Rates and allocations are a proposed summary based on company documentation and are subject to the signed franchise agreement and final written company policy.",
  "Ground-up benefit sharing is calculated as 5% of the commission earned by the tier immediately below, NOT 5% of the gross transaction value.",
  "Down-level franchisees do NOT receive commissions on bookings or transactions made at an upper franchise level.",
  "Commissions on Gold Membership Card bookings may total up to ₹2,500 across all four levels if all levels qualify for the same booking.",
  "Silver Membership Card generates Nil / zero commission for all franchise tiers.",
  "Before final settlement, written confirmation is required regarding tax deductions (TDS/GST), reversal policies, cancellation handling, and settlement schedules.",
];
