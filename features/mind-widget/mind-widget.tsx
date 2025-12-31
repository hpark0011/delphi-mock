"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useMindDialog } from "@/features/mind-dialog";
import { useTrainingStatus } from "@/hooks/use-training-status";
import { AnimatePresence } from "framer-motion";
import { MindWidgetBubble } from "./components/mind-widget-bubble";
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
  const { openWithTab } = useMindDialog();
  const { queueStatus } = useTrainingStatus();

  // Local visibility for training status
  const [isStatusVisible, setIsStatusVisible] = useState(false);

  // Show when training is active or finished
  useEffect(() => {
    if (queueStatus === "active" || queueStatus === "finished") {
      setIsStatusVisible(true);
    }
  }, [queueStatus]);

  const handleClick = () => {
    openWithTab("add-knowledge");
  };

  return (
    <MindWidgetWrapper>
      <MindWidgetBubble
        className='min-w-[112px]'
        level={level}
        onClick={handleClick}
        queueStatus={queueStatus}
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
        {isStatusVisible && <MindWidgetTrainingStatus />}
      </AnimatePresence>
    </MindWidgetWrapper>
  );
}
