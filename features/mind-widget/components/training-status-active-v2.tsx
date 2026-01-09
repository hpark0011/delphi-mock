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
        <div className='ml-1 flex flex-col gap-0.5'>
          {completedCount > 0 && (
            <div className='size-1.5 bg-green-500/80 rounded-full' />
          )}
          {failedCount > 0 && (
            <div className='size-1.5 bg-orange-500/80 rounded-full' />
          )}
        </div>
      )}
    </motion.div>
  );
}
