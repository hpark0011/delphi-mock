"use client";

import React from "react";
import { MindWidget as UnifiedMindWidget } from "../mind-widget";
import type { MindWidgetContainerStyle } from "../types";

interface MindWidgetSmallLegacyProps {
  score?: number;
  level?: string;
  /** @deprecated Progress is now calculated internally from score */
  progress?: number;
  disableClick?: boolean;
  variant?: "default" | "profile";
}

/**
 * @deprecated Use `MindWidget` from `@/features/mind-widget` with `variant="compact"` instead.
 *
 * @example
 * // Before (deprecated)
 * import { MindWidgetSmall } from "@/features/mind-widget";
 * <MindWidgetSmall score={150} level="Skilled" progress={50} disableClick />
 *
 * // After (recommended)
 * import { MindWidget } from "@/features/mind-widget";
 * <MindWidget score={150} variant="compact" disableClick />
 */
export function MindWidgetSmall({
  score = 20,
  level,
  progress: _progress, // Ignored - calculated internally now
  disableClick = false,
  variant = "default",
}: MindWidgetSmallLegacyProps) {
  return (
    <UnifiedMindWidget
      score={score}
      level={level}
      variant="compact"
      containerStyle={variant as MindWidgetContainerStyle}
      disableClick={disableClick}
    />
  );
}
