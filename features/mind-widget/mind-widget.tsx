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
 * // Disabled click (display only)
 * <MindWidget score={150} variant="compact" disableClick />
 */
export function MindWidget({
  score = 20,
  level,
  variant = "default",
  disableClick = false,
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

  // Render appropriate variant
  switch (variant) {
    case "compact":
      return (
        <MindWidgetCompact
          score={score}
          progress={progress}
          disableClick={disableClick}
          status={status}
          shouldShowTrainingStatus={shouldShowTrainingStatus}
          handleClick={handleClick}
          {...levelColors}
          direction="horizontal"
        />
      );
    case "compact-vertical":
      return (
        <MindWidgetCompact
          score={score}
          progress={progress}
          disableClick={disableClick}
          status={status}
          shouldShowTrainingStatus={shouldShowTrainingStatus}
          handleClick={handleClick}
          {...levelColors}
          direction="vertical"
        />
      );
    default:
      return (
        <MindWidgetDefault
          score={score}
          level={derivedLevel}
          progress={progress}
          status={status}
          shouldShowTrainingStatus={shouldShowTrainingStatus}
          handleClick={handleClick}
        />
      );
  }
}
