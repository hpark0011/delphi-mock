"use client";

import { motion } from "framer-motion";
import { TrainingResultBadges } from "./training-result-badges";
import { SLIDE_ANIMATION } from "../utils/animations";

interface TrainingStatusFinishedProps {
  completedCount: number;
  failedCount: number;
  onCompletedClick: () => void;
  onFailedClick: () => void;
}

export function TrainingStatusFinished({
  completedCount,
  failedCount,
  onCompletedClick,
  onFailedClick,
}: TrainingStatusFinishedProps) {
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
        Completed!
      </span>
      <TrainingResultBadges
        completedCount={completedCount}
        failedCount={failedCount}
        onCompletedClick={onCompletedClick}
        onFailedClick={onFailedClick}
        disableTooltips
      />
    </motion.div>
  );
}
