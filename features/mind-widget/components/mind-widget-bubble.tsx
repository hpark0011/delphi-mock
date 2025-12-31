import {
  generateDropShadow,
  generateSmallWidgetShadowString,
  getLevelShadowColors,
} from "../utils/level-shadows";
import { cn } from "@/lib/utils";
import React from "react";

interface MindWidgetBubbleProps {
  children: React.ReactNode;
  className?: string;
  level: string;
  onClick?: () => void;
}

// Base gradient overlay component
function BaseGradientOverlay() {
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
function GlassEffectHighlight() {
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
        "shadow-[inset_0px_-1px_1px_1px_rgba(255,255,255,0.1),inset_0px_2px_2px_2px_rgba(255,255,255,0.15),inset_0px_4px_4px_2px_rgba(255,255,255,0.2)]"
      )}
    />
  );
}

// Level accent shadow overlay component
interface LevelAccentShadowProps {
  shadowString: string;
}

function LevelAccentShadow({ shadowString }: LevelAccentShadowProps) {
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

// Level accent gradient overlay component
interface LevelAccentGradientProps {
  lightColor: string;
}

function LevelAccentGradient({ lightColor }: LevelAccentGradientProps) {
  return (
    <div
      className={cn(
        // Positioning
        "absolute top-0 right-0",
        // Sizing
        "w-full h-full"
      )}
      style={{
        background: `linear-gradient(to top, ${lightColor.replace("1)", "0.4)")}, transparent)`,
      }}
    />
  );
}

export function MindWidgetBubble({
  children,
  className,
  level,
  onClick,
}: MindWidgetBubbleProps) {
  // Get level-based colors
  const levelColors = getLevelShadowColors(level);
  const shadowString = generateSmallWidgetShadowString(levelColors);
  const levelDropShadow = generateDropShadow(levelColors);

  return (
    <div
      className={cn(
        // Layout
        "flex flex-col relative",
        // Sizing
        "min-w-[52px] min-h-[40px]",
        // Padding
        "p-0.5",
        // Alignment
        "items-center justify-center",
        // Overflow
        "overflow-hidden",
        // Shape
        "mind-widget-bubble",
        // Transitions
        "transition-transform duration-200 ease-out",
        // Hover effects
        "hover:scale-104 cursor-pointer",
        className
      )}
      style={{
        // Drop shadow
        boxShadow: levelDropShadow,
      }}
      onClick={onClick}
    >
      {children}

      <BaseGradientOverlay />
      <GlassEffectHighlight />
      <LevelAccentShadow shadowString={shadowString} />
      <LevelAccentGradient lightColor={levelColors.light} />
    </div>
  );
}
