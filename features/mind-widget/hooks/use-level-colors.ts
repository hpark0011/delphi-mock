"use client";

import { useMemo } from "react";
import {
  getLevelShadowColors,
  generateSmallWidgetShadowString,
  generateDropShadow,
  type LevelColors,
} from "../utils/level-shadows";

export interface LevelColorsResult {
  levelColors: LevelColors;
  shadowString: string;
  dropShadow: string;
}

/**
 * Hook to compute level-based shadow and color values.
 * Memoizes the computation to avoid recalculating on every render.
 */
export function useLevelColors(level: string): LevelColorsResult {
  return useMemo(() => {
    const levelColors = getLevelShadowColors(level);
    return {
      levelColors,
      shadowString: generateSmallWidgetShadowString(levelColors),
      dropShadow: generateDropShadow(levelColors),
    };
  }, [level]);
}
