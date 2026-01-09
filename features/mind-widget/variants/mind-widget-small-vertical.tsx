"use client";

import React from "react";
import { MindWidget as UnifiedMindWidget } from "../mind-widget";

interface MindWidgetSmallVerticalLegacyProps {
  score?: number;
  level?: string;
  /** @deprecated Progress is now calculated internally from score */
  progress?: number;
  disableClick?: boolean;
}

/**
 * @deprecated Use `MindWidget` from `@/features/mind-widget` with `variant="compact-vertical"` instead.
 *
 * @example
 * // Before (deprecated)
 * import { MindWidgetSmallVertical } from "@/features/mind-widget";
 * <MindWidgetSmallVertical score={150} level="Skilled" progress={50} />
 *
 * // After (recommended)
 * import { MindWidget } from "@/features/mind-widget";
 * <MindWidget score={150} variant="compact-vertical" />
 */
export function MindWidgetSmallVertical({
  score = 20,
  level,
  progress: _progress, // Ignored - calculated internally now
  disableClick = false,
}: MindWidgetSmallVerticalLegacyProps) {
  return (
    <UnifiedMindWidget
      score={score}
      level={level}
      variant="compact-vertical"
      disableClick={disableClick}
    />
  );
}
