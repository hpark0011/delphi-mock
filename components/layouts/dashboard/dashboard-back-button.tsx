"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import * as React from "react";

interface DashboardBackButtonProps {
  href: string;
  children: React.ReactNode;
}

export function DashboardBackButton({
  href,
  children,
}: DashboardBackButtonProps) {
  return (
    <Link
      href={href}
      className='flex group w-fit items-center gap-1.5 text-sm mx-3 text-[#8D8D86]'
    >
      <ArrowLeft className='size-3.5 group-hover:-translate-x-0.5 transition-transform' />
      {children}
    </Link>
  );
}
