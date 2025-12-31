"use client";

import { useMindDialog } from "@/features/mind-dialog";
import { TrainingResultBadges } from "./training-result-badges";
import { AnimatePresence, motion } from "framer-motion";
import { useTrainingDisplayState } from "../hooks/use-training-display-state";
import { MindWidgetStatusIcon } from "./mind-widget-status-icon";
import { MindWidgetStatusLabel } from "./mind-widget-status-label";

const SLIDE_ANIMATION = {
  initial: { y: 20, opacity: 0, filter: "blur(10px)" },
  animate: { y: 0, opacity: 1, filter: "blur(0px)" },
  exit: { y: -20, opacity: 0, filter: "blur(10px)" },
  transition: { duration: 0.2, ease: "easeInOut" as const },
};

export function MindWidgetTrainingStatus() {
  const { openWithTab } = useMindDialog();

  const {
    displayState,
    newItemInfo,
    activeCount,
    completedCount,
    failedCount,
  } = useTrainingDisplayState();

  const handleClick = () => openWithTab("training-status");

  return (
    <motion.div
      className='overflow-hidden'
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <div
        className='flex items-center justify-center gap-1 pt-1.5 cursor-pointer'
        onClick={handleClick}
      >
        <AnimatePresence mode='wait'>
          {displayState === "finished" ? (
            <motion.div
              key='finished'
              {...SLIDE_ANIMATION}
              className='flex items-center gap-1'
            >
              <span className='text-sm font-medium text-sand-10'>
                Completed!
              </span>
              <TrainingResultBadges
                completedCount={completedCount}
                failedCount={failedCount}
                onCompletedClick={() =>
                  openWithTab("training-status", "completed")
                }
                onFailedClick={() => openWithTab("training-status", "failed")}
                disableTooltips
              />
            </motion.div>
          ) : (
            <motion.div
              key='status'
              {...SLIDE_ANIMATION}
              className='flex items-center gap-1'
            >
              <MindWidgetStatusIcon
                state={displayState}
                docType={newItemInfo?.docType}
              />
              <MindWidgetStatusLabel
                state={displayState}
                activeCount={activeCount}
                newItemName={newItemInfo?.name ?? ""}
              />
              {(completedCount > 0 || failedCount > 0) && (
                <div className='ml-0.5'>
                  <TrainingResultBadges
                    className='gap-0'
                    completedCount={completedCount}
                    failedCount={failedCount}
                    onCompletedClick={() =>
                      openWithTab("training-status", "completed")
                    }
                    onFailedClick={() =>
                      openWithTab("training-status", "failed")
                    }
                    disableTooltips
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
