import { franchiseTiers } from "@/data/franchiseData";
import { ReactNode } from "react";

export async function generateStaticParams() {
  return franchiseTiers.map((tier) => ({
    tier: tier.id,
  }));
}

export default function FranchiseLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
