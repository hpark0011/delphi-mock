"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LEVEL_THRESHOLDS } from "@/features/mind-score";
import { getLevelShadowColors } from "../utils/level-shadows";

interface MindLevelInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MindLevelInfoDialog({
  open,
  onOpenChange,
}: MindLevelInfoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader className='pb-4'>
          <DialogTitle className='text-xl'>Mind Score Levels</DialogTitle>
          <DialogDescription className='text-sm'>
            Your Mind Score reflects how well your AI assistant understands you.
            As you train it with more knowledge, your score increases and you
            unlock new levels.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-2 py-2 px-2'>
          {LEVEL_THRESHOLDS.map((level, index) => {
            const levelColors = getLevelShadowColors(level.name);
            const nextThreshold = LEVEL_THRESHOLDS[index + 1]?.min;
            const thresholdText = nextThreshold
              ? `${level.min.toLocaleString()} - ${(nextThreshold - 1).toLocaleString()}`
              : `${level.min.toLocaleString()}+`;

            return (
              <div
                key={level.name}
                className='flex items-center gap-3 p-2.5 rounded-lg bg-sand-2 dark:bg-sand-3'
              >
                {/* Color indicator */}
                <div
                  className='w-3 h-3 rounded-full shrink-0'
                  style={{
                    backgroundColor: levelColors.light,
                    boxShadow: `0 0 8px ${levelColors.light}`,
                  }}
                />

                {/* Level name */}
                <span
                  className='font-medium flex-1'
                  style={{ color: levelColors.light }}
                >
                  {level.name}
                </span>

                {/* Threshold */}
                <span className='text-sm text-sand-11 tabular-nums'>
                  {thresholdText}
                </span>
              </div>
            );
          })}
        </div>

        <p className='text-xs text-sand-10 pt-2'>
          Train your AI by adding knowledge about yourself, your preferences,
          and your goals to increase your Mind Score.
        </p>
      </DialogContent>
    </Dialog>
  );
}
