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
    container: cn(
      // Background
      "bg-sand-3",
      // Sizing
      "min-h-7 h-7",
      // Spacing
      "px-3",
      // Shadow / Effects
      "shadow-[inset_0_0.5px_1.5px_1px_rgba(255,255,255,0.8),_0_8px_16px_-4px_rgba(0,0,0,0.1)]",
      "dark:shadow-[inset_0_0.5px_1.5px_1px_rgba(255,255,255,0.1),_0_8px_16px_-4px_rgba(0,0,0,0.3)]"
    ),
  },
  vertical: {
    container: cn(
      // Background
      "bg-sand-3",
      // Sizing
      "min-h-7 h-7",
      // Spacing
      "px-3",
      // Shadow / Effects
      "shadow-[inset_0_0.5px_1.5px_1px_rgba(255,255,255,0.8),_0_8px_16px_-4px_rgba(0,0,0,0.1)]",
      "dark:shadow-[inset_0_0.5px_1.5px_1px_rgba(255,255,255,0.1),_0_8px_16px_-4px_rgba(0,0,0,0.3)]"
    ),
  },
  small: {
    container: cn(
      // Background
      "bg-sand-3",
      // Sizing
      "min-h-7 h-7",
      // Spacing
      "px-4 pl-3"
    ),
  },
} as const;

type TrainingStatusVariant = keyof typeof TRAINING_STATUS_VARIANTS;

interface MindWidgetTrainingStatusProps {
  variant?: TrainingStatusVariant;
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

  const variantStyles = TRAINING_STATUS_VARIANTS[variant];

  return (
    <motion.div
      className={cn(
        "rounded-2xl flex items-center justify-center whitespace-nowrap h-10",
        variantStyles.container
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
