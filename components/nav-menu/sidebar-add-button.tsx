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

interface SidebarAddButtonProps {
  onClick: () => void;
}

// Base gradient overlay component
function BaseGradientOverlay() {
  return (
    <div
      className={cn(
        "sidebar-add-button",
        // Positioning
        "absolute inset-0",
        // Shape
        "rounded-lg",
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
        "sidebar-add-button",
        // Positioning
        "absolute inset-0",
        // Shape
        "rounded-lg",
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
interface LevelAccentShadowProps {
  shadowString: string;
}

function LevelAccentShadow({ shadowString }: LevelAccentShadowProps) {
  return (
    <div
      className={cn(
        "sidebar-add-button",
        // Positioning
        "absolute inset-0",
        // Shape
        "rounded-lg"
      )}
      style={{
        boxShadow: shadowString.replace(/_/g, " "),
      }}
    />
  );
}

export function SidebarAddButton({ onClick }: SidebarAddButtonProps) {
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
        "sidebar-add-button cursor-pointer",
        // Layout & alignment
        "relative flex items-center justify-center",
        // Shape
        "rounded-lg",
        // Sizing
        "p-2.5 py-2",
        // Overflow
        "overflow-hidden",
        // Interactive states
        "transition-transform duration-200 ease-out",
        "hover:scale-104"
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
      aria-label='Add Content'
    >
      <BaseGradientOverlay />
      <GlassEffectHighlight />
      <LevelAccentShadow shadowString={shadowString} />

      {/* Content on top of overlays */}
      <PlusLargeIcon className='relative z-10 size-6 text-white' />
    </button>
  );
}
