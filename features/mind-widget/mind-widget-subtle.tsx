"use client";

import { calculateLevel, calculateLevelProgress } from "@/features/mind-score";
import React, { useCallback } from "react";
import { useMindWidgetState } from "./hooks/use-mind-widget-state";

import type { CompactDirection, MindWidgetProps } from "./types";
import { MindWidgetDefaultSubtle } from "./variants/mind-widget-default-subtle";
import { MindWidgetCompactSubtle } from "./variants/mind-widget-compact-subtle";

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
export function MindWidgetSubtle({
  score = 20,
  variant = "default",
  disableClick = false,
}: MindWidgetProps): React.JSX.Element {
  const level = calculateLevel(score);
  const progress = calculateLevelProgress(score);
  const { status, shouldShowTrainingStatus, openAddKnowledge } =
    useMindWidgetState();

  const handleClick = useCallback(() => {
    if (disableClick) return;
    openAddKnowledge();
  }, [disableClick, openAddKnowledge]);

  if (variant === "default") {
    return (
      <MindWidgetDefaultSubtle
        score={score}
        level={level}
        progress={progress}
        status={status}
        shouldShowTrainingStatus={shouldShowTrainingStatus}
        handleClick={handleClick}
      />
    );
  }

  const direction: CompactDirection =
    variant === "compact-vertical" ? "vertical" : "horizontal";

  return (
    <MindWidgetCompactSubtle
      score={score}
      level={level}
      progress={progress}
      disableClick={disableClick}
      status={status}
      shouldShowTrainingStatus={shouldShowTrainingStatus}
      handleClick={handleClick}
      direction={direction}
    />
  );
}
