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
import { AddToMindButton } from "../components/add-to-mind-button";

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

export function MindWidgetCompactWithAdd({
  score,
  level,
  progress,
  disableClick,
  direction,
  status,
  shouldShowTrainingStatus,
  handleClick,
}: MindWidgetCompactInternalProps): React.JSX.Element {
  const config = DIRECTION_CONFIG[direction];

  return (
    <MindWidgetWrapper variant={config.wrapperVariant}>
      <div className='relative flex items-center justify-center z-10'>
        <AddToMindButton onClick={handleClick} variant='circular' />
        <MindWidgetBubble
          variant='compact'
          level={level}
          progress={progress}
          onClick={handleClick}
          queueStatus={status}
          disableClick={disableClick}
        >
          <div className='relative'>
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
      </div>

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
