"use client";

import React, { useCallback } from "react";
import { calculateLevel, calculateLevelProgress } from "@/features/mind-score";
import { useMindWidgetState } from "./hooks/use-mind-widget-state";
import { useLevelColors } from "./hooks/use-level-colors";
import { MindWidgetDefault } from "./variants/mind-widget-default";
import { MindWidgetCompact } from "./variants/mind-widget-compact";
import type { MindWidgetProps } from "./types";

/**
 * Unified MindWidget component with variant support.
 *
 * @example
 * // Default (large bubble) variant
 * <MindWidget score={150} />
 *
 * @example
 * // Compact horizontal variant
 * <MindWidget score={150} variant="compact" />
 *
 * @example
 * // Compact vertical variant
 * <MindWidget score={150} variant="compact-vertical" />
 *
 * @example
 * // With profile container style (only for compact variant)
 * <MindWidget score={150} variant="compact" containerStyle="profile" />
 *
 * @example
 * // Disabled click (display only)
 * <MindWidget score={150} variant="compact" disableClick />
 */
export function MindWidget({
  score = 20,
  level,
  variant = "default",
  containerStyle = "default",
  disableClick = false,
  className,
}: MindWidgetProps) {
  // Derive level from score if not provided
  const derivedLevel = level ?? calculateLevel(score);

  // Always calculate progress internally
  const progress = calculateLevelProgress(score);

  // Shared state and handlers
  const { status, shouldShowTrainingStatus, openAddKnowledge } =
    useMindWidgetState();

  // Level-based colors and shadows
  const levelColors = useLevelColors(derivedLevel);

  // Shared click handler
  const handleClick = useCallback(() => {
    if (disableClick) return;
    openAddKnowledge();
  }, [disableClick, openAddKnowledge]);

  // Common props for all variants
  const commonProps = {
    score,
    progress,
    disableClick,
    className,
    status,
    shouldShowTrainingStatus,
    handleClick,
  };

  // Render appropriate variant
  switch (variant) {
    case "compact":
      return (
        <MindWidgetCompact
          {...commonProps}
          {...levelColors}
          direction="horizontal"
          containerStyle={containerStyle}
        />
      );
    case "compact-vertical":
      return (
        <MindWidgetCompact
          {...commonProps}
          {...levelColors}
          direction="vertical"
        />
      );
    default:
      return <MindWidgetDefault {...commonProps} level={derivedLevel} />;
  }
}
