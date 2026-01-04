"use client";

import {
  useMindDialog,
  useTrainingQueue,
  type OpenDialogOptions,
} from "@/features/mind-dialog";
import { MindProfileButton } from "./mind-profile-button";
import { useTrainingState } from "@/hooks/use-training-state";
import { AnimatePresence, motion } from "framer-motion";
import { TrainingStatusFinished } from "./training-status-finished";
import { TrainingStatusActive } from "./training-status-active";
import { CONTAINER_ANIMATION } from "../utils/animations";

function createBadgeHandlers(open: (options?: OpenDialogOptions) => void) {
  return {
    onCompletedClick: () =>
      open({ tab: "training-status", filter: "completed" }),
    onFailedClick: () => open({ tab: "training-status", filter: "failed" }),
  };
}

export function MindWidgetTrainingStatus() {
  const { open } = useMindDialog();
  const { markAsReviewed } = useTrainingQueue();

  const {
    status,
    recentlyAddedItem,
    active: activeCount,
    completed: completedCount,
    failed: failedCount,
  } = useTrainingState();

  const handleClick = () => open({ tab: "training-status" });
  const handleProfileClick = () => markAsReviewed();
  const badgeHandlers = createBadgeHandlers(open);

  return (
    <motion.div
      className='bg-sand-3 p-1 px-4 pr-1 rounded-2xl min-h-[38px]'
      initial={CONTAINER_ANIMATION.initial}
      animate={CONTAINER_ANIMATION.animate}
      exit={CONTAINER_ANIMATION.exit}
      transition={CONTAINER_ANIMATION.transition}
    >
      <div className='flex flex-row gap-3 justify-center items-center'>
        <div
          className='flex items-center justify-center gap-1 cursor-pointer'
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

        <MindProfileButton onClick={handleProfileClick} />
      </div>
    </motion.div>
  );
}
