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

const TRAINING_STATUS_VARIANTS = {
  default: {
    container: "bg-sand-3",
  },
  profile: {
    container: "bg-transparent",
  },
  vertical: {
    container:
      "bg-sand-3 pl-4 shadow-[inset_0_0.5px_1.5px_1px_rgba(255,255,255,0.8),_0_8px_16px_-4px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0.5px_1.5px_1px_rgba(255,255,255,0.1),_0_8px_16px_-4px_rgba(0,0,0,0.9)]",
  },
  "vertical-profile": {
    container: "bg-sand-12/3 dark:bg-sand-3 backdrop-blur-lg shadow-xs",
  },
} as const;

type TrainingStatusVariant = keyof typeof TRAINING_STATUS_VARIANTS;

interface MindWidgetTrainingStatusProps {
  size?: "default" | "small";
  variant?: TrainingStatusVariant;
}

export function MindWidgetTrainingStatus({
  size = "default",
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

  const variantStyles = TRAINING_STATUS_VARIANTS[variant];

  return (
    <motion.div
      className={cn(
        "p-1 px-4 rounded-2xl min-h-[38px] flex items-center justify-center whitespace-nowrap",
        variantStyles.container,
        size === "small" && "p-1 pl-3 pr-4"
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
