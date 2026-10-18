import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className, size = "md" }: LogoProps) {
  const sizeMap = {
    sm: { w: 100, h: 40 },
    md: { w: 200, h: 65 },
    lg: { w: 260, h: 85 },
  };
  const dims = sizeMap[size];
  return (
    <Link
      href="#home"
      className={cn("group inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-lg transition-transform", className)}
      aria-label="Ranaha Gold Company - Home"
    >
      <div className="relative flex items-center" style={{ width: dims.w, height: dims.h }}>
        <Image
          src="/images/logo-ranaha-gold.png"
          alt="Ranaha Gold Company Logo"
          fill
          sizes="(max-width: 768px) 120px, 200px"
          className="object-contain"
          priority
          style={{ objectFit: "contain", objectPosition: "left center" }}
        />
      </div>
    </Link>
  );
}