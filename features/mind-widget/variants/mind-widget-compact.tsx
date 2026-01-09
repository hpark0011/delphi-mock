"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { BrainIcon } from "@/delphi-ui/icons/Brain";
import { LevelProgressFill } from "../components/mind-widget-bubble";
import { MindWidgetPill } from "../components/mind-widget-pill";
import { MindWidgetScore } from "../components/mind-widget-score";
import { MindWidgetTrainingStatus } from "../components/mind-widget-training-status";
import { horizontalExpandAnimation } from "../animations";
import type { MindWidgetCompactInternalProps } from "../types";

const CONTAINER_STYLE_CLASSES = {
  default: "bg-sand-3",
  profile: "bg-sand-12/3 dark:bg-sand-3 backdrop-blur-lg",
} as const;

export function MindWidgetCompact({
  score,
  level,
  progress,
  disableClick,
  className,
  containerStyle,
  status,
  shouldShowTrainingStatus,
  openAddKnowledge,
  levelColors,
  shadowString,
  dropShadow,
}: MindWidgetCompactInternalProps) {
  const handleClick = () => {
    if (disableClick) return;
    openAddKnowledge();
  };

  return (
    <motion.div
      layout
      transition={{
        layout: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
      }}
      className={cn(
        "flex gap-0 relative justify-start items-center rounded-full",
        CONTAINER_STYLE_CLASSES[containerStyle],
        className
      )}
    >
      {/* Mindscore Trigger */}
      <div
        className={cn(
          "flex items-center bg-sand-10/8 rounded-full transition-all duration-200 w-fit relative",
          !disableClick && "hover:scale-108 cursor-pointer"
        )}
        onClick={handleClick}
        style={{ boxShadow: dropShadow }}
      >
        {/* Mindscore Wrapper */}
        <MindWidgetPill
          onClick={handleClick}
          disableClick={disableClick}
          shadowString={shadowString}
          levelColors={levelColors}
          status={status}
          size="small"
        >
          {/* Mindscore Value */}
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
          {/* Progress fill */}
          <LevelProgressFill lightColor={levelColors.light} progress={progress} />
        </MindWidgetPill>
      </div>
      <AnimatePresence>
        {shouldShowTrainingStatus && (
          <motion.div className="overflow-hidden" {...horizontalExpandAnimation}>
            <MindWidgetTrainingStatus variant="small" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
