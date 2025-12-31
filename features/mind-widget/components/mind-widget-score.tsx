import { cn } from "@/lib/utils";
import React from "react";

interface MindWidgetScoreProps {
  score: number;
  className?: string;
  fontSize?: string;
}

export function MindWidgetScore({
  score,
  className,
  fontSize,
}: MindWidgetScoreProps) {
  return (
    <div
      className={cn(
        "text-white text-lg font-semibold tracking-[-0.04em]",
        fontSize,
        "leading-[100%]",
        className
      )}
    >
      {score}
    </div>
  );
}
