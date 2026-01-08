"use client";

import { BrainIcon } from "@/delphi-ui/icons/Brain";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { LevelProgressFill } from "../components/mind-widget-bubble";
import { MindWidgetPill } from "../components/mind-widget-pill";
import { MindWidgetScore } from "../components/mind-widget-score";
import { MindWidgetTrainingStatus } from "../components/mind-widget-training-status";
import { useMindWidgetState } from "../hooks/use-mind-widget-state";
import {
  generateDropShadow,
  generateSmallWidgetShadowString,
  getLevelShadowColors,
} from "../utils/level-shadows";

// Spring animation for training status visibility transitions
const trainingStatusAnimation = {
  initial: { opacity: 1, y: -10, scale: 0.75 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 1, y: -10, scale: 0.75 },
  transition: {
    type: "spring" as const,
    stiffness: 300,
    damping: 25,
    mass: 1,
  },
};

interface MindWidgetSmallVerticalProps {
  score?: number;
  level?: string;
  progress?: number;
  disableClick?: boolean;
  isScrollingDown?: boolean;
}

export function MindWidgetSmallVertical({
  score = 20,
  level = "Skilled",
  progress = 0,
  disableClick = false,
  isScrollingDown = false,
}: MindWidgetSmallVerticalProps) {
  const { status, isTrainingVisible, setIsTrainingVisible, openAddKnowledge } =
    useMindWidgetState();

  // Control training status visibility based on scroll direction
  useEffect(() => {
    setIsTrainingVisible(!isScrollingDown);
  }, [isScrollingDown, setIsTrainingVisible]);

  const handleClick = () => {
    if (disableClick) return;
    openAddKnowledge();
  };

  // Get level-based shadow colors
  const levelColors = getLevelShadowColors(level);
  const shadowString = generateSmallWidgetShadowString(levelColors);
  const dropShadow = generateDropShadow(levelColors);

  // Only show training status when not idle and visibility is enabled
  const shouldShowTrainingStatus = status !== "idle" && isTrainingVisible;

  return (
    <div
      className={cn(
        "flex-col gap-0.5 relative justify-center items-center rounded-full flex"
      )}
    >
      {/* Mindscore Trigger */}
      <div
        className={cn(
          "flex items-center bg-sand-10/8 rounded-full transition-all duration-200 w-fit relative z-10",
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
          size='small'
        >
          {/* Mindscore Value */}
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
          {/* Progress fill */}
          <LevelProgressFill
            lightColor={levelColors.light}
            progress={progress}
          />
        </MindWidgetPill>
      </div>
      <AnimatePresence>
        {shouldShowTrainingStatus && (
          <motion.div {...trainingStatusAnimation}>
            <MindWidgetTrainingStatus size='default' variant='vertical' />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
