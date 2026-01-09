"use client";

import { useScrollDirection } from "@/app/profile/_hooks";
import { useMindScore } from "@/features/mind-score";
import { useScrollAwareTrainingVisibility } from "@/features/mind-widget";
import { MindWidgetSubtle } from "@/features/mind-widget/mind-widget-subtle";
import { cn } from "@/lib/utils";

export function StudioHeader() {
  const { current } = useMindScore();
  const isScrollingDown = useScrollDirection();

  useScrollAwareTrainingVisibility(isScrollingDown);

  return (
    <div
      className={cn(
        "hidden lg:flex items-center justify-center",
        "sticky top-0 z-50 w-full px-4 py-4 left-0",
        "bg-linear-to-b from-background via-background/80 to-transparent dark:from-black dark:via-black/30"
      )}
    >
      <MindWidgetSubtle score={current} />
    </div>
  );
}
