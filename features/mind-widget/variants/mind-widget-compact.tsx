"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrainIcon } from "@/delphi-ui/icons/Brain";
import { MindWidgetBubble } from "../components/mind-widget-bubble";
import { MindWidgetScore } from "../components/mind-widget-score";
import { MindWidgetTrainingStatus } from "../components/mind-widget-training-status";
import {
  horizontalExpandAnimation,
  verticalSpringAnimation,
} from "../animations";
import type { MindWidgetCompactInternalProps } from "../types";

const DIRECTION_CONFIG = {
  horizontal: {
    containerClass:
      "flex gap-0 relative justify-start items-center rounded-full bg-sand-3",
    animation: horizontalExpandAnimation,
    trainingVariant: "small" as const,
  },
  vertical: {
    containerClass:
      "flex-col gap-0.5 relative justify-center items-center rounded-full flex",
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
  const isHorizontal = direction === "horizontal";

  const content = (
    <>
      <MindWidgetBubble
        level={level}
        progress={progress}
        onClick={handleClick}
        queueStatus={status}
        size="compact"
        disableClick={disableClick}
      >
        <div className='relative z-10'>
          <div className='flex items-center justify-center gap-0.5'>
            <BrainIcon className='size-4.5 text-sand-1/50 min-w-[16px] dark:text-sand-12/50' />
            <MindWidgetScore
              score={score}
              className='text-text-primary-inverse dark:text-text-primary'
              fontSize='text-[16px]'
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
    </>
  );

  if (isHorizontal) {
    return (
      <motion.div
        layout
        transition={{
          layout: { type: "spring", stiffness: 300, damping: 30 },
        }}
        className={config.containerClass}
      >
        {content}
      </motion.div>
    );
  }

  return <div className={config.containerClass}>{content}</div>;
}
