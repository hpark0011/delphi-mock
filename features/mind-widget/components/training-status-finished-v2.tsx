"use client";

import { motion } from "framer-motion";
import { TrainingResultBadges } from "./training-result-badges";
import { SLIDE_ANIMATION } from "../utils/animations";

interface TrainingStatusFinishedV2Props {
  completedCount: number;
  failedCount: number;
}

export function TrainingStatusFinishedV2({
  completedCount,
  failedCount,
}: TrainingStatusFinishedV2Props) {
  return (
    <motion.div
      key='finished'
      initial={SLIDE_ANIMATION.initial}
      animate={SLIDE_ANIMATION.animate}
      exit={SLIDE_ANIMATION.exit}
      transition={SLIDE_ANIMATION.transition}
      className='flex items-center gap-1'
    >
      <span className='text-[15px] font-medium text-sand-10 dark:text-sand-11 hover:text-blue-500'>
        Done!
      </span>
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
