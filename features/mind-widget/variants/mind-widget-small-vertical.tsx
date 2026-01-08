"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { useMindWidgetState } from "../hooks/use-mind-widget-state";
import {
  generateSmallWidgetShadowString,
  generateDropShadow,
  getLevelShadowColors,
} from "../utils/level-shadows";
import { LevelProgressFill } from "../components/mind-widget-bubble";
import { MindWidgetPill } from "../components/mind-widget-pill";
import { MindWidgetScore } from "../components/mind-widget-score";
import { MindWidgetTrainingStatus } from "../components/mind-widget-training-status";
import { BrainIcon } from "@/delphi-ui/icons/Brain";
import { ScrollRevealWrapper } from "@/components/ui/scroll-reveal-wrapper";

const SMALL_WIDGET_VARIANTS = {
  default: {
    container: "bg-sand-3",
  },
  profile: {
    container: "bg-sand-12/3 dark:bg-sand-3 backdrop-blur-lg",
  },
} as const;

type SmallWidgetVariant = keyof typeof SMALL_WIDGET_VARIANTS;

interface MindWidgetSmallVerticalProps {
  score?: number;
  level?: string;
  progress?: number;
  disableClick?: boolean;
  variant?: SmallWidgetVariant;
  isScrollingDown?: boolean;
}

export function MindWidgetSmallVertical({
  score = 20,
  level = "Skilled",
  progress = 0,
  disableClick = false,
  variant = "default",
  isScrollingDown = false,
}: MindWidgetSmallVerticalProps) {
  const { status, isTrainingVisible, openAddKnowledge } = useMindWidgetState();

  const handleClick = () => {
    if (disableClick) return;
    openAddKnowledge();
  };

  // Get level-based shadow colors
  const levelColors = getLevelShadowColors(level);
  const shadowString = generateSmallWidgetShadowString(levelColors);
  const dropShadow = generateDropShadow(levelColors);

  const variantStyles = SMALL_WIDGET_VARIANTS[variant];

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
      <ScrollRevealWrapper isScrollingDown={isScrollingDown}>
        <AnimatePresence>
          {isTrainingVisible && (
            <MindWidgetTrainingStatus size='small' variant='vertical' />
          )}
        </AnimatePresence>
      </ScrollRevealWrapper>
    </div>
  );
}
