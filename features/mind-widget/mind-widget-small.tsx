"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { useMindScore } from "@/features/mind-score";
import { useMindWidgetState } from "./hooks/use-mind-widget-state";
import {
  generateSmallWidgetShadowString,
  generateDropShadow,
  getLevelShadowColors,
} from "./utils/level-shadows";
import { LevelProgressFill } from "./components/mind-widget-bubble";
import { MindWidgetScore } from "./components/mind-widget-score";
import { MindWidgetTrainingStatus } from "./components/mind-widget-training-status";

interface MindWidgetSmallProps {
  disableClick?: boolean;
}

export function MindWidgetSmall({
  disableClick = false,
}: MindWidgetSmallProps) {
  const { current: score, level, progressToNextLevel } = useMindScore();
  const { status, isTrainingVisible, openAddKnowledge } = useMindWidgetState();

  const handleClick = () => {
    if (disableClick) return;
    openAddKnowledge();
  };

  // Get level-based shadow colors
  const levelColors = getLevelShadowColors(level);
  const shadowString = generateSmallWidgetShadowString(levelColors);
  const dropShadow = generateDropShadow(levelColors);

  // Progress toward next level (from context)
  const progress = progressToNextLevel;

  return (
    <div className='flex gap-0 relative justify-start items-center rounded-full bg-sand-3'>
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
        <div
          onClick={handleClick}
          className={cn(
            // Layout
            "flex flex-col gap-2",
            // Shape
            "rounded-full overflow-hidden mind-widget-bubble",
            // Background
            "bg-black/87 dark:bg-black",
            // Border
            "border-white/20 dark:border-white/3",
            // Sizing
            "w-fit min-w-[52px] h-[40px] px-2.5 py-1.5",
            // Positioning
            "relative z-0",
            // Alignment
            "justify-center items-center",
            // Interactive states
            !disableClick && "cursor-pointer hover:bg-black/84"
          )}
          style={
            {
              boxShadow: shadowString.replace(/_/g, " "),
              "--pill-color-light": levelColors.light,
              "--pill-color-medium": levelColors.medium,
              "--pill-color-dark": levelColors.dark,
            } as React.CSSProperties
          }
          data-luminating={status === "active"}
          data-glowing={status === "finished"}
          data-size='small'
        >
          {/* Mindscore Value */}
          <div className='relative z-10'>
            <MindWidgetScore
              score={score}
              className='text-text-primary-inverse dark:text-text-primary'
              fontSize='text-[16px]'
            />
          </div>
          {/* Progress fill */}
          <LevelProgressFill
            lightColor={levelColors.light}
            progress={progress}
          />
        </div>
      </div>
      <AnimatePresence>
        {isTrainingVisible && <MindWidgetTrainingStatus size='small' />}
      </AnimatePresence>
    </div>
  );
}
