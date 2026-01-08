"use client";

import { PlusLargeIcon } from "@/delphi-ui/icons";
import { useMindScore } from "@/features/mind-score";
import {
  generateDropShadow,
  generateSmallWidgetShadowString,
  getLevelShadowColors,
} from "@/features/mind-widget/utils/level-shadows";
import { cn } from "@/lib/utils";
import React from "react";

interface AddToMindButtonProps {
  onClick?: () => void;
  variant?: "rounded" | "circular";
  className?: string;
}

interface OverlayProps {
  variant: "rounded" | "circular";
  className?: string;
}

// Base gradient overlay component
function BaseGradientOverlay({ variant, className }: OverlayProps) {
  return (
    <div
      className={cn(
        // Positioning
        "absolute inset-0",
        // Shape
        variant === "circular" ? "rounded-full" : "rounded-lg",
        // Background
        "bg-black",
        className
      )}
    />
  );
}

// Glass effect highlight component
function GlassEffectHighlight({ variant, className }: OverlayProps) {
  return (
    <div
      className={cn(
        // Positioning
        "absolute inset-0",
        // Shape
        variant === "circular" ? "rounded-full" : "rounded-lg",
        // Border
        "border-[1px] border-sand-1",
        // Effects
        "blur-[3px]",
        // Shadow
        "shadow-[inset_0px_-1px_1px_1px_rgba(255,255,255,0.1),inset_0px_2px_2px_2px_rgba(255,255,255,0.1),inset_0px_4px_4px_2px_rgba(255,255,255,0.1)]",
        className
      )}
    />
  );
}

// Level accent shadow overlay component
interface LevelAccentShadowProps extends OverlayProps {
  shadowString: string;
}

function LevelAccentShadow({ shadowString, variant, className }: LevelAccentShadowProps) {
  return (
    <div
      className={cn(
        // Positioning
        "absolute inset-0",
        // Shape
        variant === "circular" ? "rounded-full" : "rounded-lg",
        className
      )}
      style={{
        boxShadow: shadowString.replace(/_/g, " "),
      }}
    />
  );
}

export function AddToMindButton({
  onClick,
  variant = "rounded",
  className,
}: AddToMindButtonProps) {
  // Get level from context for reactive updates
  const { level } = useMindScore();

  // Get level-based colors
  const levelColors = getLevelShadowColors(level);
  const shadowString = generateSmallWidgetShadowString(levelColors);
  const levelDropShadow = generateDropShadow(levelColors);

  return (
    <button
      onClick={onClick}
      className={cn(
        // Custom identifier
        "add-to-mind-button cursor-pointer",
        // Layout & alignment
        "relative flex items-center justify-center",
        // Shape - varies by variant
        variant === "circular" ? "rounded-full" : "rounded-lg",
        // Sizing - varies by variant
        variant === "circular" ? "size-10" : "p-2.5 py-2",
        // Overflow
        "overflow-hidden",
        // Interactive states
        "transition-transform duration-200 ease-out",
        "hover:scale-104",
        className
      )}
      style={
        {
          boxShadow: levelDropShadow,
          // CSS variables for animations
          "--pill-color-light": levelColors.light,
          "--pill-color-medium": levelColors.medium,
          "--pill-color-dark": levelColors.dark,
        } as React.CSSProperties
      }
      aria-label="Add Content"
    >
      <BaseGradientOverlay variant={variant} className={className} />
      <GlassEffectHighlight variant={variant} className={className} />
      <LevelAccentShadow shadowString={shadowString} variant={variant} className={className} />

      {/* Content on top of overlays */}
      <PlusLargeIcon className="relative z-10 size-6 text-white" />
    </button>
  );
}
