"use client";

import { cn } from "@/lib/utils";

interface VariantsGridProps {
  children: React.ReactNode;
  className?: string;
}

export function VariantsGrid({ children, className }: VariantsGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-2 gap-y-12", className)}>
      {children}
    </div>
  );
}
