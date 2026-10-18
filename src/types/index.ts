export type FranchiseLevelId = 'platinum' | 'diamond' | 'gold' | 'silver';

export interface FranchiseAllocation {
  recipient: string;
  amount: number;
  amountFormatted: string;
  percentage?: number;
}

export interface FranchiseTier {
  id: FranchiseLevelId;
  name: string; // e.g. "Platinum Franchise" (formerly Master Franchise)
  badge: string;
  tierNumber: string;
  deposit: number;
  depositFormatted: string;
  nonRefundable: boolean;
  validity: string; // "3 Years (Proposed)"
  subtitle: string;
  role: string[];
  infrastructure: string;
  territory: string;
  allocations: FranchiseAllocation[];
  theme: {
    accentColor: string;
    borderGlow: string;
    bgGradient: string;
    badgeStyle: string;
    textGradient: string;
    pillBg: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  brief: string;
  description: string;
  icon: string;
  highlights: string[];
  disclaimer: string;
}

export interface MembershipBenefitSplit {
  totalUses: number;
  perUseAmount: number;
  perUseFormatted: string;
}

export interface MembershipProgram {
  id: string;
  name: string;
  tagline: string;
  fee: number;
  feeFormatted: string;
  feeSubtext?: string;
  totalBenefits: number;
  totalBenefitsFormatted: string;
  split: MembershipBenefitSplit;
  validity: string;
  commissionNote: string;
  imagePath: string;
  theme: {
    gradient: string;
    cardBg: string;
    badgeBg: string;
    textColor: string;
    glowColor: string;
  };
  features: string[];
  conditions: string[];
}

export interface CoreCommissionRate {
  id: string;
  activity: string;
  ratePercent: number;
  rateFormatted: string;
  basis: string;
  note: string;
}

export interface GroundUpChainLevel {
  levelNumber: number;
  tierId: FranchiseLevelId;
  title: string;
  share: string;
  calculationMethod: string;
  arrowText?: string;
  exampleBasis?: string;
}

export interface GoldCardCommissionEntry {
  role: string;
  tierId?: FranchiseLevelId | 'booking';
  amount: number;
  amountFormatted: string;
  rule: string;
}

export interface MetalRatesData {
  gold24k: number; // Price per gram in INR
  gold22k: number; // Price per gram in INR
  silver999: number; // Price per gram in INR
  currency: string; // "INR"
  unit: string; // "gram"
  updatedAt: string; // ISO String
  source: string;
  isIndicative: boolean;
  rates?: {
    gold24k_10g: number;
    gold22k_10g: number;
    silver999_1kg: number;
  };
}

export interface EnquirySubmission {
  type: 'franchise' | 'membership' | 'funding' | 'general';
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  city?: string;
  interestTier?: string;
  fundingInterest?: string;
  fundingRange?: string;
  message: string;
}
