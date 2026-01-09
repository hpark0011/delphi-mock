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

type Variant = "rounded" | "circular" | "pill";

const VARIANT_CONFIG = {
  rounded: {
    shape: "rounded-lg",
    sizing: "p-2.5 py-2",
    iconSize: "size-6",
    showLabel: false,
  },
  circular: {
    shape: "rounded-full",
    sizing: "size-10",
    iconSize: "size-6",
    showLabel: false,
  },
  pill: {
    shape: "rounded-full",
    sizing: "px-3 py-1.5 gap-1.5",
    iconSize: "size-4",
    showLabel: true,
  },
} as const;

interface AddToMindButtonProps {
  onClick?: () => void;
  variant?: Variant;
  className?: string;
}

interface OverlayProps {
  shape: string;
  className?: string;
}

function BaseGradientOverlay({ shape, className }: OverlayProps) {
  return <div className={cn("absolute inset-0 bg-black", shape, className)} />;
}

function GlassEffectHighlight({ shape, className }: OverlayProps) {
  return (
    <div
      className={cn(
        "absolute inset-0",
        "border-[1px] border-sand-1 blur-[3px]",
        "shadow-[inset_0px_-1px_1px_1px_rgba(255,255,255,0.1),inset_0px_2px_2px_2px_rgba(255,255,255,0.1),inset_0px_4px_4px_2px_rgba(255,255,255,0.1)]",
        shape,
        className
      )}
    />
  );
}

interface LevelAccentShadowProps extends OverlayProps {
  shadowString: string;
}

function LevelAccentShadow({
  shadowString,
  shape,
  className,
}: LevelAccentShadowProps) {
  return (
    <div
      className={cn("absolute inset-0", shape, className)}
      style={{ boxShadow: shadowString.replace(/_/g, " ") }}
    />
  );
}

export function AddToMindButton({
  onClick,
  variant = "rounded",
  className,
}: AddToMindButtonProps) {
  const { level } = useMindScore();
  const levelColors = getLevelShadowColors(level);
  const shadowString = generateSmallWidgetShadowString(levelColors);
  const levelDropShadow = generateDropShadow(levelColors);

  const config = VARIANT_CONFIG[variant];

  return (
    <button
      onClick={onClick}
      className={cn(
        "add-to-mind-button cursor-pointer",
        "relative flex items-center justify-center overflow-hidden",
        "transition-transform duration-200 ease-out hover:scale-104",
        config.shape,
        config.sizing,
        className
      )}
      style={
        {
          boxShadow: levelDropShadow,
          "--pill-color-light": levelColors.light,
          "--pill-color-medium": levelColors.medium,
          "--pill-color-dark": levelColors.dark,
        } as React.CSSProperties
      }
      aria-label='Add Content'
    >
      <BaseGradientOverlay shape={config.shape} className={className} />
      <GlassEffectHighlight shape={config.shape} className={className} />
      <LevelAccentShadow
        shadowString={shadowString}
        shape={config.shape}
        className={className}
      />

      <PlusLargeIcon
        className={cn("relative z-10 text-white", config.iconSize)}
      />
      {config.showLabel && (
        <span className='relative z-10 text-white text-sm font-medium'>
          Add
        </span>
      )}
    </button>
  );
}
