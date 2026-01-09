"use client";

import { useMindDialog, type OpenDialogOptions } from "@/features/mind-dialog";
import { useTrainingState } from "@/hooks/use-training-state";
import { AnimatePresence, motion } from "framer-motion";
import { CONTAINER_ANIMATION } from "../utils/animations";
import { TrainingStatusActiveV2 } from "./training-status-active-v2";
import { TrainingStatusFinishedV2 } from "./training-status-finished-v2";
import { cn } from "@/lib/utils";

function createBadgeHandlers(open: (options?: OpenDialogOptions) => void) {
  return {
    onCompletedClick: () =>
      open({ tab: "training-status", filter: "completed" }),
    onFailedClick: () => open({ tab: "training-status", filter: "failed" }),
  };
}

const BASE_CONTAINER = cn("bg-sand-3", "min-h-7 h-7");
const SHADOW_STYLES = cn(
  "shadow-[inset_0_0.5px_1.5px_1px_rgba(255,255,255,0.8),_0_8px_16px_-4px_rgba(0,0,0,0.1)]",
  "dark:shadow-[inset_0_0.5px_1.5px_1px_rgba(255,255,255,0.1),_0_8px_16px_-4px_rgba(0,0,0,0.3)]"
);

const TRAINING_STATUS_VARIANTS = {
  default: { container: cn(BASE_CONTAINER, "px-3", SHADOW_STYLES) },
  vertical: { container: cn(BASE_CONTAINER, "px-3", SHADOW_STYLES) },
  small: { container: cn(BASE_CONTAINER, "px-4 pl-3") },
} as const;

type TrainingStatusVariant = keyof typeof TRAINING_STATUS_VARIANTS;

interface MindWidgetTrainingStatusProps {
  variant?: TrainingStatusVariant;
}

export function MindWidgetTrainingStatusV2({
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
            <TrainingStatusFinishedV2
              completedCount={completedCount}
              failedCount={failedCount}
              {...badgeHandlers}
            />
          ) : (
            <TrainingStatusActiveV2
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
