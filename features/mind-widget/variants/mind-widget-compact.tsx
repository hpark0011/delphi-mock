"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrainIcon } from "@/delphi-ui/icons/Brain";
import { MindWidgetBubble } from "../components/mind-widget-bubble";
import { MindWidgetScore } from "../components/mind-widget-score";
import { MindWidgetTrainingStatus } from "../components/mind-widget-training-status";
import { MindWidgetWrapper } from "../components/mind-widget-wrapper";
import {
  horizontalExpandAnimation,
  verticalSpringAnimation,
} from "../animations";
import type { MindWidgetCompactInternalProps } from "../types";

const DIRECTION_CONFIG = {
  horizontal: {
    wrapperVariant: "compact-horizontal" as const,
    animation: horizontalExpandAnimation,
    trainingVariant: "small" as const,
  },
  vertical: {
    wrapperVariant: "compact-vertical" as const,
    animation: verticalSpringAnimation,
    trainingVariant: "vertical" as const,
  },
} as const;

export function MindWidgetCompact({
  score,
  level,
  progress,
  disableClick,
  direction,
  status,
  shouldShowTrainingStatus,
  handleClick,
}: MindWidgetCompactInternalProps) {
  const config = DIRECTION_CONFIG[direction];

  return (
    <MindWidgetWrapper variant={config.wrapperVariant}>
      <MindWidgetBubble
        level={level}
        progress={progress}
        onClick={handleClick}
        queueStatus={status}
        size="compact"
        disableClick={disableClick}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-0.5">
            <BrainIcon className="size-4.5 text-sand-1/50 min-w-[16px] dark:text-sand-12/50" />
            <MindWidgetScore
              score={score}
              className="text-text-primary-inverse dark:text-text-primary"
              fontSize="text-[16px]"
            />
          </div>
        </div>
      </MindWidgetBubble>

      <AnimatePresence>
        {shouldShowTrainingStatus && (
          <motion.div {...config.animation}>
            <MindWidgetTrainingStatus variant={config.trainingVariant} />
          </motion.div>
        )}
      </AnimatePresence>
    </MindWidgetWrapper>
  );
}
