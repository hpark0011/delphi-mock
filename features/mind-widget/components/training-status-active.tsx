"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TrainingResultBadges } from "./training-result-badges";
import { MindWidgetStatusLearning } from "./mind-widget-status-learning";
import { MindWidgetStatusNewItem } from "./mind-widget-status-new-item";
import { SLIDE_ANIMATION } from "../utils/animations";
import type { RecentlyAddedItem } from "@/hooks/use-training-state";

interface TrainingStatusActiveProps {
  recentlyAddedItem: RecentlyAddedItem | null;
  activeCount: number;
  completedCount: number;
  failedCount: number;
  onCompletedClick: () => void;
  onFailedClick: () => void;
}

export function TrainingStatusActive({
  recentlyAddedItem,
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
        {recentlyAddedItem ? (
          <motion.div
            key='newItem'
            initial={SLIDE_ANIMATION.initial}
            animate={SLIDE_ANIMATION.animate}
            exit={SLIDE_ANIMATION.exit}
            transition={SLIDE_ANIMATION.transition}
          >
            <MindWidgetStatusNewItem
              name={recentlyAddedItem.name}
              docType={recentlyAddedItem.docType}
            />
          </motion.div>
        ) : (
          <motion.div
            key='learning'
            initial={SLIDE_ANIMATION.initial}
            animate={SLIDE_ANIMATION.animate}
            exit={SLIDE_ANIMATION.exit}
            transition={SLIDE_ANIMATION.transition}
          >
            <MindWidgetStatusLearning activeCount={activeCount} />
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
