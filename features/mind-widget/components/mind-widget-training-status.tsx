"use client";

import { useMindDialog } from "@/features/mind-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useTrainingDisplayState } from "../hooks/use-training-display-state";
import { TrainingStatusFinished } from "./training-status-finished";
import { TrainingStatusActive } from "./training-status-active";
import { CONTAINER_ANIMATION } from "../utils/animations";
import type { TrainingItemStatus } from "@/utils/training-status-helpers";
import type { MindDialogTabId } from "@/features/mind-dialog";

function createBadgeHandlers(
  openWithTab: (
    tab: MindDialogTabId,
    initialFilter?: TrainingItemStatus | "all"
  ) => void
) {
  return {
    onCompletedClick: () => openWithTab("training-status", "completed"),
    onFailedClick: () => openWithTab("training-status", "failed"),
  };
}

export function MindWidgetTrainingStatus() {
  const { openWithTab } = useMindDialog();

  const {
    displayState,
    newItemInfo,
    activeCount,
    completedCount,
    failedCount,
  } = useTrainingDisplayState();

  const handleClick = () => openWithTab("training-status");
  const badgeHandlers = createBadgeHandlers(openWithTab);

  return (
    <motion.div
      className='overflow-hidden'
      initial={CONTAINER_ANIMATION.initial}
      animate={CONTAINER_ANIMATION.animate}
      exit={CONTAINER_ANIMATION.exit}
      transition={CONTAINER_ANIMATION.transition}
    >
      <div
        className='flex items-center justify-center gap-1 pt-1.5 cursor-pointer'
        onClick={handleClick}
      >
        <AnimatePresence mode='wait'>
          {displayState === "finished" ? (
            <TrainingStatusFinished
              completedCount={completedCount}
              failedCount={failedCount}
              {...badgeHandlers}
            />
          ) : (
            <TrainingStatusActive
              displayState={displayState}
              newItemInfo={newItemInfo}
              activeCount={activeCount}
              completedCount={completedCount}
              failedCount={failedCount}
              {...badgeHandlers}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
