"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface OnboardingProgressProps {
  value: number;
  className?: string;
}

export function OnboardingProgress({
  value,
  className,
}: OnboardingProgressProps) {
  return (
    <ProgressPrimitive.Root
      value={value}
      className={cn(
        "relative h-[3px] w-full overflow-hidden bg-primary/10",
        className
      )}
    >
      <ProgressPrimitive.Indicator
        className='h-full bg-brand-primary transition-transform duration-300 ease-out rounded-r-full'
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
