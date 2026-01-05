"use client";

import React, { useState } from "react";
import { useMindDialog } from "@/features/mind-dialog";
import { calculateLevelProgress } from "@/features/mind-score";
import { useTrainingState } from "@/hooks/use-training-state";
import { AnimatePresence } from "framer-motion";
import { MindLevelInfoDialog } from "./components/mind-level-info-dialog";
import { MindWidgetBubble } from "./components/mind-widget-bubble";
import { MindWidgetInfo } from "./components/mind-widget-info";
import { MindWidgetLevel } from "./components/mind-widget-level";
import { MindWidgetScore } from "./components/mind-widget-score";
import { MindWidgetTrainingStatus } from "./components/mind-widget-training-status";
import { MindWidgetWrapper } from "./components/mind-widget-wrapper";
import "./styles/mind-widget.styles.css";

interface MindWidgetProps {
  score?: number;
  level?: string;
}

export function MindWidget({
  score = 20,
  level = "Skilled",
}: MindWidgetProps = {}) {
  const { open } = useMindDialog();
  const { status } = useTrainingState();

  // Calculate progress toward next level
  const progress = calculateLevelProgress(score);

  // Derive visibility from status (no state sync needed)
  const isStatusVisible = status === "active" || status === "finished";

  // Dialog state for mind level info
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

  const handleMindWidgetClick = () => {
    open({ tab: "add-knowledge" });
  };

  return (
    <MindWidgetWrapper className='gap-1.5'>
      <MindWidgetBubble
        className='min-w-[112px] z-10 relative'
        level={level}
        progress={progress}
        onClick={handleMindWidgetClick}
        queueStatus={status}
      >
        <div className='relative z-10 flex flex-col h-full gap-1 justify-center items-center p-1.5'>
          <div className='flex items-center justify-center gap-0.5'>
            <MindWidgetScore score={score} fontSize='text-2xl' />
          </div>
          <MindWidgetLevel level={level} />
        </div>
      </MindWidgetBubble>

      {/* Training Status - below bubble */}
      <AnimatePresence>
        {isStatusVisible ? (
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
