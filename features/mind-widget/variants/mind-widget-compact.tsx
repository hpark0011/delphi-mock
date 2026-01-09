"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { BrainIcon } from "@/delphi-ui/icons/Brain";
import { LevelProgressFill } from "../components/mind-widget-bubble";
import { MindWidgetPill } from "../components/mind-widget-pill";
import { MindWidgetScore } from "../components/mind-widget-score";
import { MindWidgetTrainingStatus } from "../components/mind-widget-training-status";
import {
  horizontalExpandAnimation,
  verticalSpringAnimation,
} from "../animations";
import type { MindWidgetCompactInternalProps } from "../types";

const CONTAINER_STYLE_CLASSES = {
  default: "bg-sand-3",
  profile: "bg-sand-12/3 dark:bg-sand-3 backdrop-blur-lg",
} as const;

const DIRECTION_CONFIG = {
  horizontal: {
    containerClass: "flex gap-0 relative justify-start items-center rounded-full",
    triggerClass: "flex items-center bg-sand-10/8 rounded-full transition-all duration-200 w-fit relative",
    animation: horizontalExpandAnimation,
    trainingVariant: "small" as const,
    animationWrapper: "overflow-hidden",
  },
  vertical: {
    containerClass: "flex-col gap-0.5 relative justify-center items-center rounded-full flex",
    triggerClass: "flex items-center bg-sand-10/8 rounded-full transition-all duration-200 w-fit relative z-10",
    animation: verticalSpringAnimation,
    trainingVariant: "vertical" as const,
    animationWrapper: "",
  },
} as const;

export function MindWidgetCompact({
  score,
  progress,
  disableClick,
  className,
  containerStyle,
  direction,
  status,
  shouldShowTrainingStatus,
  handleClick,
  levelColors,
  shadowString,
  dropShadow,
}: MindWidgetCompactInternalProps) {
  const config = DIRECTION_CONFIG[direction];
  const isHorizontal = direction === "horizontal";

  const containerClassName = cn(
    config.containerClass,
    isHorizontal && containerStyle && CONTAINER_STYLE_CLASSES[containerStyle],
    className
  );

  const content = (
    <>
      {/* Mindscore Trigger */}
      <div
        className={cn(
          config.triggerClass,
          !disableClick && "hover:scale-108 cursor-pointer"
        )}
        onClick={handleClick}
        style={{ boxShadow: dropShadow }}
      >
        <MindWidgetPill
          onClick={handleClick}
          disableClick={disableClick}
          shadowString={shadowString}
          levelColors={levelColors}
          status={status}
          size="small"
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
          <LevelProgressFill lightColor={levelColors.light} progress={progress} />
        </MindWidgetPill>
      </div>

      <AnimatePresence>
        {shouldShowTrainingStatus && (
          <motion.div className={config.animationWrapper} {...config.animation}>
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
        className={containerClassName}
      >
        {content}
      </motion.div>
    );
  }

  return <div className={containerClassName}>{content}</div>;
}
