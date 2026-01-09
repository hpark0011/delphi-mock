import {
  generateDropShadow,
  generateSmallWidgetShadowString,
  getLevelShadowColors,
} from "../utils/level-shadows";
import { cn } from "@/lib/utils";
import React from "react";

type BubbleVariant = "default" | "compact";

interface MindWidgetBubbleProps {
  children: React.ReactNode;
  level: string;
  progress?: number;
  onClick?: () => void;
  queueStatus?: "idle" | "active" | "finished";
  variant?: BubbleVariant;
  disableClick?: boolean;
}

// Shared positioning for overlay components
const OVERLAY_BASE = "absolute inset-0";

export function GlassEffectHighlight(): React.JSX.Element {
  return (
    <div
      className={cn(
        OVERLAY_BASE,
        "rounded-full mind-widget-bubble",
        "border border-sand-1",
        "blur-[3px]",
        "shadow-[inset_0px_-1px_1px_1px_rgba(255,255,255,0.1),inset_0px_2px_2px_2px_rgba(255,255,255,0.1),inset_0px_4px_4px_2px_rgba(255,255,255,0.1)]"
      )}
    />
  );
}

export interface LevelAccentShadowProps {
  shadowString: string;
}

export function LevelAccentShadow({
  shadowString,
}: LevelAccentShadowProps): React.JSX.Element {
  return (
    <div
      className={cn(OVERLAY_BASE, "rounded-full mind-widget-bubble")}
      style={{ boxShadow: shadowString.replace(/_/g, " ") }}
    />
  );
}

export interface LevelProgressFillProps {
  lightColor: string;
  progress: number;
}

export function LevelProgressFill({
  lightColor,
  progress,
}: LevelProgressFillProps): React.JSX.Element {
  const fillPercent = Math.min(Math.max(progress, 0), 100);

  return (
    <div
      className='absolute bottom-0 left-0 right-0 w-full transition-[height] duration-500 ease-out'
      style={{
        height: `${fillPercent}%`,
        background: `linear-gradient(to top, ${lightColor.replace("1)", "0.6)")} 0%, ${lightColor.replace("1)", "0.1)")} 100%)`,
      }}
    />
  );
}

export function MindWidgetBubble({
  children,
  level,
  progress = 0,
  onClick,
  queueStatus = "idle",
  variant = "default",
  disableClick = false,
}: MindWidgetBubbleProps): React.JSX.Element {
  const levelColors = getLevelShadowColors(level);
  const shadowString = generateSmallWidgetShadowString(levelColors);
  const isCompact = variant === "compact";

  const baseClassName = cn(
    "flex flex-col relative items-center justify-center overflow-hidden",
    "mind-widget-bubble transition-transform duration-200 ease-out",
    isCompact
      ? [
          "w-fit min-w-[52px] h-[40px] px-2.5 py-1.5",
          "bg-black border-white/20 dark:border-white/3",
          !disableClick && "cursor-pointer hover:scale-108",
        ]
      : [
          "min-w-[112px] min-h-[40px] p-0.5",
          "z-10 relative bg-black",
          "hover:scale-104 cursor-pointer",
        ]
  );

  const boxShadow = generateDropShadow(levelColors, isCompact);

  return (
    <div
      className={baseClassName}
      style={
        {
          boxShadow,
          "--pill-color-light": levelColors.light,
          "--pill-color-medium": levelColors.medium,
          "--pill-color-dark": levelColors.dark,
        } as React.CSSProperties
      }
      onClick={onClick}
      data-luminating={queueStatus === "active"}
      data-glowing={queueStatus === "finished"}
      data-size={isCompact ? "small" : undefined}
    >
      {children}
      <GlassEffectHighlight />
      <LevelAccentShadow shadowString={shadowString} />
      <LevelProgressFill lightColor={levelColors.light} progress={progress} />
    </div>
  );
}
