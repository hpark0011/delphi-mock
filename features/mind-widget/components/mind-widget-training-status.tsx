"use client";

import { useMindDialog, type OpenDialogOptions } from "@/features/mind-dialog";
import { useTrainingState } from "@/hooks/use-training-state";
import { AnimatePresence, motion } from "framer-motion";
import { CONTAINER_ANIMATION } from "../utils/animations";
import { TrainingStatusActive } from "./training-status-active";
import { TrainingStatusFinished } from "./training-status-finished";
import { cn } from "@/lib/utils";

function createBadgeHandlers(open: (options?: OpenDialogOptions) => void) {
  return {
    onCompletedClick: () =>
      open({ tab: "training-status", filter: "completed" }),
    onFailedClick: () => open({ tab: "training-status", filter: "failed" }),
  };
}

interface MindWidgetTrainingStatusProps {
  variant?: "default" | "small";
}

export function MindWidgetTrainingStatus({
  variant = "default",
}: MindWidgetTrainingStatusProps) {
  const { open } = useMindDialog();

  const {
    status,
    recentlyAddedItem,
    active: activeCount,
    completed: completedCount,
    failed: failedCount,
  } = useTrainingState();

  const handleClick = () => open({ tab: "training-status" });
  // const handleProfileClick = () => markAsReviewed();
  const badgeHandlers = createBadgeHandlers(open);

  return (
    <motion.div
      className={cn(
        "bg-sand-3 p-1 px-3.5 rounded-2xl min-h-[38px] flex items-center justify-center",
        variant === "small" && "p-1 pl-3 pr-4"
      )}
      initial={CONTAINER_ANIMATION.initial}
      animate={CONTAINER_ANIMATION.animate}
      exit={CONTAINER_ANIMATION.exit}
      transition={CONTAINER_ANIMATION.transition}
    >
      <div
        className='flex items-center justify-center gap-1 cursor-pointer h-full w-full'
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
