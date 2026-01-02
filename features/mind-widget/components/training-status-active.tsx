"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TrainingResultBadges } from "./training-result-badges";
import { MindWidgetStatusLearning } from "./mind-widget-status-learning";
import { MindWidgetStatusNewItem } from "./mind-widget-status-new-item";
import { SLIDE_ANIMATION } from "../utils/animations";
import type { NewItemInfo } from "../hooks/use-training-display-state";

interface TrainingStatusActiveProps {
  displayState: "learning" | "newItem";
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
      <AnimatePresence mode='wait'>
        {displayState === "learning" ? (
          <motion.div
            key='learning'
            initial={SLIDE_ANIMATION.initial}
            animate={SLIDE_ANIMATION.animate}
            exit={SLIDE_ANIMATION.exit}
            transition={SLIDE_ANIMATION.transition}
          >
            <MindWidgetStatusLearning activeCount={activeCount} />
          </motion.div>
        ) : (
          <motion.div
            key='newItem'
            initial={SLIDE_ANIMATION.initial}
            animate={SLIDE_ANIMATION.animate}
            exit={SLIDE_ANIMATION.exit}
            transition={SLIDE_ANIMATION.transition}
          >
            <MindWidgetStatusNewItem
              name={newItemInfo?.name ?? ""}
              docType={newItemInfo?.docType}
            />
          </motion.div>
        )}
      </AnimatePresence>
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
