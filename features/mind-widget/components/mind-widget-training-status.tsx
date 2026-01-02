"use client";

import { useMindDialog } from "@/features/mind-dialog";
import { useTrainingState } from "@/hooks/use-training-state";
import { AnimatePresence, motion } from "framer-motion";
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
    status,
    recentlyAddedItem,
    active: activeCount,
    completed: completedCount,
    failed: failedCount,
  } = useTrainingState();

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
          {status === "finished" ? (
            <TrainingStatusFinished
              completedCount={completedCount}
              failedCount={failedCount}
              {...badgeHandlers}
            />
          ) : (
            <TrainingStatusActive
              recentlyAddedItem={recentlyAddedItem}
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
