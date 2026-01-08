"use client";

import React, { useState } from "react";
import { calculateLevelProgress } from "@/features/mind-score";
import { AnimatePresence } from "framer-motion";
import { MindLevelInfoDialog } from "../components/mind-level-info-dialog";
import { MindWidgetBubble } from "../components/mind-widget-bubble";
import { MindWidgetInfo } from "../components/mind-widget-info";
import { MindWidgetLevel } from "../components/mind-widget-level";
import { MindWidgetScore } from "../components/mind-widget-score";
import { MindWidgetTrainingStatus } from "../components/mind-widget-training-status";
import { MindWidgetWrapper } from "../components/mind-widget-wrapper";
import { useMindWidgetState } from "../hooks/use-mind-widget-state";
import "../styles/mind-widget.styles.css";
import { BrainIcon } from "@/delphi-ui/icons/Brain";
import { cn } from "@/lib/utils";

interface MindWidgetProps {
  score?: number;
  level?: string;
}

export function MindWidget({
  score = 20,
  level = "Skilled",
}: MindWidgetProps = {}) {
  const { status, isTrainingVisible, openAddKnowledge } = useMindWidgetState();

  // Calculate progress toward next level
  const progress = calculateLevelProgress(score);

  // Dialog state for mind level info
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

  return (
    <MindWidgetWrapper className='gap-0.5'>
      <MindWidgetBubble
        className='min-w-[112px] z-10 relative'
        level={level}
        progress={progress}
        onClick={openAddKnowledge}
        queueStatus={status}
      >
        <div className='relative z-10 flex flex-col h-full gap-1 justify-center items-center p-1.5'>
          <div className='flex items-center justify-center gap-0.5'>
            <MindWidgetScore score={score} fontSize='text-2xl' />
          </div>
          <div
            className={cn(
              "w-full flex items-center justify-center pb-0.5 gap-0.5 ml-[-4px]"
            )}
          >
            <BrainIcon className='size-4 text-sand-1/50 min-w-[16px] dark:text-sand-12/50' />
            <MindWidgetLevel level={level} />
          </div>
        </div>
      </MindWidgetBubble>

      {/* Training Status - below bubble */}
      <AnimatePresence>
        {isTrainingVisible ? (
          <MindWidgetTrainingStatus />
        ) : (
          <MindWidgetInfo onClick={() => setIsInfoDialogOpen(true)} />
        )}
      </AnimatePresence>

      {/* Mind Level Info Dialog */}
      <MindLevelInfoDialog
        open={isInfoDialogOpen}
        onOpenChange={setIsInfoDialogOpen}
      />
    </MindWidgetWrapper>
  );
}
