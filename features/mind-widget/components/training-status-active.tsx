"use client";

import { motion } from "framer-motion";
import { TrainingResultBadges } from "./training-result-badges";
import { MindWidgetStatusIcon } from "./mind-widget-status-icon";
import { MindWidgetStatusLabel } from "./mind-widget-status-label";
import { SLIDE_ANIMATION } from "../utils/animations";
import type { NewItemInfo } from "../hooks/use-training-display-state";

interface TrainingStatusActiveProps {
  displayState: "loading" | "newItem";
  newItemInfo: NewItemInfo | null;
  activeCount: number;
  completedCount: number;
  failedCount: number;
  onCompletedClick: () => void;
  onFailedClick: () => void;
}

export function TrainingStatusActive({
  displayState,
  newItemInfo,
  activeCount,
  completedCount,
  failedCount,
  onCompletedClick,
  onFailedClick,
}: TrainingStatusActiveProps) {
  return (
    <motion.div
      key='status'
      initial={SLIDE_ANIMATION.initial}
      animate={SLIDE_ANIMATION.animate}
      exit={SLIDE_ANIMATION.exit}
      transition={SLIDE_ANIMATION.transition}
      className='flex items-center gap-0.5'
    >
      <MindWidgetStatusIcon
        state={displayState}
        docType={newItemInfo?.docType}
      />
      <MindWidgetStatusLabel
        state={displayState}
        activeCount={activeCount}
        newItemName={newItemInfo?.name ?? ""}
      />
      {(completedCount > 0 || failedCount > 0) && (
        <div className='ml-1'>
          <TrainingResultBadges
            completedCount={completedCount}
            failedCount={failedCount}
            onCompletedClick={onCompletedClick}
            onFailedClick={onFailedClick}
            disableTooltips
          />
        </div>
      )}
    </motion.div>
  );
}
