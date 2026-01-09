"use client";

import React from "react";
import { MindWidget as UnifiedMindWidget } from "../mind-widget";

interface MindWidgetLegacyProps {
  score?: number;
  level?: string;
}

/**
 * @deprecated Use `MindWidget` from `@/features/mind-widget` with `variant="default"` instead.
 *
 * @example
 * // Before (deprecated)
 * import { MindWidget } from "@/features/mind-widget/variants/mind-widget";
 * <MindWidget score={150} level="Skilled" />
 *
 * // After (recommended)
 * import { MindWidget } from "@/features/mind-widget";
 * <MindWidget score={150} />
 */
export function MindWidget({ score = 20, level }: MindWidgetLegacyProps) {
  return <UnifiedMindWidget score={score} level={level} variant="default" />;
}
