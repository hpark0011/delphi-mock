"use client";

import { cn } from "@/lib/utils";

interface VariantCardProps {
  children: React.ReactNode;
  className?: string;
}

export function VariantCard({ children, className }: VariantCardProps) {
  return (
    <div
      className={cn(
        "relative border border-sand-3 rounded-xl p-4 h-[280px] flex flex-col items-center justify-center overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
