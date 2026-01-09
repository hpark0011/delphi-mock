"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MindWidgetStatusLearning } from "./mind-widget-status-learning";
import { MindWidgetStatusNewItem } from "./mind-widget-status-new-item";
import { SLIDE_ANIMATION } from "../utils/animations";
import type { RecentlyAddedItem } from "@/hooks/use-training-state";

interface TrainingStatusActiveV2Props {
  recentlyAddedItem: RecentlyAddedItem | null;
  activeCount: number;
  completedCount: number;
  failedCount: number;
}

export function TrainingStatusActiveV2({
  recentlyAddedItem,
  activeCount,
  completedCount,
  failedCount,
}: TrainingStatusActiveV2Props) {
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
        <div className='ml-[5px] flex flex-row items-center gap-1.5'>
          <div
            className={`size-2 rounded-full ${
              failedCount > 0 ? "bg-orange-500/80" : "bg-green-500/80"
            }`}
          />
        </div>
      )}
    </motion.div>
  );
}
