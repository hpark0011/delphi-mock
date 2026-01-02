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
import { MindLevelInfoItem } from "./mind-level-info-item";

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
      <DialogContent className='sm:max-w-md '>
        <DialogHeader className='pb-0'>
          <DialogTitle className='text-xl font-medium'>
            Mind Score Levels
          </DialogTitle>
          <DialogDescription className='text-base leading-[1.4]'>
            Your Mind Score increases as you add more knowledge to your Delphi.
            Unlock new levels as you progress.
          </DialogDescription>
        </DialogHeader>

        <div className='py-2 px-2 pb-3'>
          {LEVEL_THRESHOLDS.map((level, index) => {
            const nextThreshold = LEVEL_THRESHOLDS[index + 1]?.min;

            return (
              <MindLevelInfoItem
                key={level.name}
                levelName={level.name}
                min={level.min}
                nextThreshold={nextThreshold}
              />
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
