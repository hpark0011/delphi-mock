"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { LevelColors } from "../utils/level-shadows";
import type { TrainingStatus } from "../types";

type MindWidgetSize = "small" | "default";

interface MindWidgetPillProps {
  onClick?: () => void;
  disableClick?: boolean;
  shadowString: string;
  levelColors: LevelColors;
  status: TrainingStatus;
  size?: MindWidgetSize;
  children: React.ReactNode;
}

export function MindWidgetPill({
  onClick,
  disableClick = false,
  shadowString,
  levelColors,
  status,
  size = "small",
  children,
}: MindWidgetPillProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        // Layout
        "flex flex-col gap-2",
        // Shape
        "rounded-full overflow-hidden mind-widget-bubble",
        // Background
        "bg-black",
        // Border
        "border-white/20 dark:border-white/3",
        // Sizing
        "w-fit min-w-[52px] h-[40px] px-2.5 py-1.5",
        // Positioning
        "relative z-0",
        // Alignment
        "justify-center items-center",
        // Interactive states
        !disableClick && "cursor-pointer hover:bg-black/84"
      )}
      style={
        {
          boxShadow: shadowString.replace(/_/g, " "),
          "--pill-color-light": levelColors.light,
          "--pill-color-medium": levelColors.medium,
          "--pill-color-dark": levelColors.dark,
        } as React.CSSProperties
      }
      data-luminating={status === "active"}
      data-glowing={status === "finished"}
      data-size={size}
    >
      {children}
    </div>
  );
}
