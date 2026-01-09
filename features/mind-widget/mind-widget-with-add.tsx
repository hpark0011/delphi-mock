"use client";

import { calculateLevel, calculateLevelProgress } from "@/features/mind-score";
import React, { useCallback } from "react";
import { useMindWidgetState } from "./hooks/use-mind-widget-state";

import type { CompactDirection, MindWidgetProps } from "./types";
import { MindWidgetCompactWithAdd } from "./variants/mind-widget-compact-with-add";
import { MindWidgetDefaultWithAdd } from "./variants/mind-widget-default-with-add";

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
export function MindWidgetWithAdd({
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
      <MindWidgetDefaultWithAdd
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
    <MindWidgetCompactWithAdd
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
