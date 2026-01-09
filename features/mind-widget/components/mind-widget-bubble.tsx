import {
  generateDropShadow,
  generateSmallWidgetShadowString,
  getLevelShadowColors,
} from "../utils/level-shadows";
import { cn } from "@/lib/utils";
import React from "react";

type BubbleSize = "default" | "compact";

interface MindWidgetBubbleProps {
  children: React.ReactNode;
  className?: string;
  level: string;
  progress?: number; // 0-100, percentage toward next level
  onClick?: () => void;
  queueStatus?: "idle" | "active" | "finished";
  size?: BubbleSize;
  disableClick?: boolean;
}

// Base gradient overlay component
export function BaseGradientOverlay() {
  return (
    <div
      className={cn(
        // Positioning
        "absolute top-0 right-0",
        // Sizing
        "w-full h-full",
        // Background
        "bg-black"
      )}
    />
  );
}

// Glass effect highlight component
export function GlassEffectHighlight() {
  return (
    <div
      className={cn(
        // Positioning
        "absolute top-0 right-0",
        // Sizing
        "w-full h-full",
        // Shape
        "rounded-full mind-widget-bubble",
        // Border
        "border-[1px] border-sand-1",
        // Effects
        "blur-[3px]",
        // Shadow
        "shadow-[inset_0px_-1px_1px_1px_rgba(255,255,255,0.1),inset_0px_2px_2px_2px_rgba(255,255,255,0.1),inset_0px_4px_4px_2px_rgba(255,255,255,0.1)]"
      )}
    />
  );
}

// Level accent shadow overlay component
export interface LevelAccentShadowProps {
  shadowString: string;
}

export function LevelAccentShadow({ shadowString }: LevelAccentShadowProps) {
  return (
    <div
      className={cn(
        // Shape,
        "rounded-full mind-widget-bubble",
        // Positioning
        "absolute top-0 right-0",
        // Sizing
        "w-full h-full"
      )}
      style={{
        boxShadow: shadowString.replace(/_/g, " "),
      }}
    />
  );
}

// Level progress fill - fills bubble from bottom based on progress toward next level
export interface LevelProgressFillProps {
  lightColor: string;
  progress: number; // 0-100, percentage toward next level
}

export function LevelProgressFill({
  lightColor,
  progress,
}: LevelProgressFillProps) {
  // Clamp progress between 0 and 100
  const fillPercent = Math.min(Math.max(progress, 0), 100);

  return (
    <div
      className={cn(
        // Positioning - anchor to bottom
        "absolute bottom-0 left-0 right-0",
        // Sizing
        "w-full",
        // Transition - animate height
        "transition-[height] duration-500 ease-out"
      )}
      style={{
        height: `${fillPercent}%`,
        background: `linear-gradient(to top, ${lightColor.replace("1)", "0.6)")} 0%, ${lightColor.replace("1)", "0.1)")} 100%)`,
      }}
    />
  );
}

// Glow animation overlay - renders on top of other layers for visible inset shadows
export interface GlowAnimationOverlayProps {
  queueStatus: "idle" | "active" | "finished";
}

export function GlowAnimationOverlay({ queueStatus }: GlowAnimationOverlayProps) {
  return (
    <div
      className={cn(
        // Positioning
        "absolute inset-0",
        // Shape
        "rounded-full mind-widget-bubble",
        // Interaction
        "pointer-events-none"
      )}
      data-luminating={queueStatus === "active"}
      data-glowing={queueStatus === "finished"}
    />
  );
}

export function MindWidgetBubble({
  children,
  className,
  level,
  progress = 0,
  onClick,
  queueStatus = "idle",
  size = "default",
  disableClick = false,
}: MindWidgetBubbleProps) {
  // Get level-based colors
  const levelColors = getLevelShadowColors(level);
  const shadowString = generateSmallWidgetShadowString(levelColors);
  const levelDropShadow = generateDropShadow(levelColors);

  const isCompact = size === "compact";

  return (
    <div
      className={cn(
        // Layout
        "flex flex-col relative",
        // Alignment
        "items-center justify-center",
        // Overflow
        "overflow-hidden",
        // Shape
        "mind-widget-bubble",
        // Transitions
        "transition-transform duration-200 ease-out",
        // Size-specific styles
        isCompact
          ? [
              // Compact sizing
              "w-fit min-w-[52px] h-[40px] px-2.5 py-1.5",
              // Compact background
              "bg-black",
              // Compact border
              "border-white/20 dark:border-white/3",
              // Compact hover
              !disableClick && "cursor-pointer hover:bg-black/84",
            ]
          : [
              // Default sizing
              "min-w-[52px] min-h-[40px] p-0.5",
              // Default hover
              "hover:scale-104 cursor-pointer",
            ],
        className
      )}
      style={
        {
          // Use shadowString for compact, levelDropShadow for default
          boxShadow: isCompact
            ? shadowString.replace(/_/g, " ")
            : levelDropShadow,
          // CSS variables for animations
          "--pill-color-light": levelColors.light,
          "--pill-color-medium": levelColors.medium,
          "--pill-color-dark": levelColors.dark,
        } as React.CSSProperties
      }
      onClick={onClick}
      // Data attributes for compact (applied directly on container)
      data-luminating={isCompact ? queueStatus === "active" : undefined}
      data-glowing={isCompact ? queueStatus === "finished" : undefined}
      data-size={isCompact ? "small" : undefined}
    >
      {children}

      {/* Overlay layers only for default size */}
      {!isCompact && (
        <>
          <BaseGradientOverlay />
          <GlassEffectHighlight />
          <LevelAccentShadow shadowString={shadowString} />
        </>
      )}
      <LevelProgressFill lightColor={levelColors.light} progress={progress} />
      {!isCompact && <GlowAnimationOverlay queueStatus={queueStatus} />}
    </div>
  );
}
