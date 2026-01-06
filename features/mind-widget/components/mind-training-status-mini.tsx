"use client";

import { useMindDialog } from "@/features/mind-dialog";
import { useTrainingState } from "@/hooks/use-training-state";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { SLIDE_ANIMATION } from "../utils/animations";
import { TrainingResultBadges } from "./training-result-badges";
import { MindTrainingStatusIcon } from "./mind-training-status-icon";
import { MindTrainingStatusLabel } from "./mind-training-status-label";

type DisplayState = "learning" | "newItem" | "finished";

interface MindTrainingStatusMiniProps {
  onDismiss?: () => void;
  disableTooltips?: boolean;
}

export function MindTrainingStatusMini({
  onDismiss,
  disableTooltips = false,
}: MindTrainingStatusMiniProps) {
  const { open } = useMindDialog();

  const {
    status,
    recentlyAddedItem,
    active: activeCount,
    completed: completedCount,
    failed: failedCount,
  } = useTrainingState();

  // Derive display state from status and recentlyAddedItem
  const displayState: DisplayState =
    status === "finished"
      ? "finished"
      : recentlyAddedItem
        ? "newItem"
        : "learning";

  // Auto-dismiss after 2 seconds in finished state
  useEffect(() => {
    if (status === "finished" && onDismiss) {
      const timeout = setTimeout(onDismiss, 2000);
      return () => clearTimeout(timeout);
    }
  }, [status, onDismiss]);

  const handleClick = () => open({ tab: "training-status" });

  return (
    <motion.div
      className='overflow-hidden'
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "auto", opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <div
        className='flex items-center gap-1 text-text-muted cursor-pointer hover:text-blue-500 whitespace-nowrap pl-0.5 pr-4.5'
        onClick={handleClick}
      >
        <AnimatePresence mode='wait'>
          {displayState === "finished" ? (
            <motion.div
              key='finished'
              {...SLIDE_ANIMATION}
              className='flex items-center gap-1'
            >
              <span className='text-sm font-medium'>Completed!</span>
              <TrainingResultBadges
                completedCount={completedCount}
                failedCount={failedCount}
                onCompletedClick={() =>
                  open({ tab: "training-status", filter: "completed" })
                }
                onFailedClick={() =>
                  open({ tab: "training-status", filter: "failed" })
                }
                disableTooltips={disableTooltips}
              />
            </motion.div>
          ) : (
            <motion.div
              key='status'
              {...SLIDE_ANIMATION}
              className='flex items-center gap-1'
            >
              <MindTrainingStatusIcon
                state={displayState}
                docType={recentlyAddedItem?.docType}
              />
              <MindTrainingStatusLabel
                state={displayState}
                activeCount={activeCount}
                newItemName={recentlyAddedItem?.name ?? ""}
              />
              {(completedCount > 0 || failedCount > 0) && (
                <div className='ml-1'>
                  <TrainingResultBadges
                    completedCount={completedCount}
                    failedCount={failedCount}
                    onCompletedClick={() =>
                      open({ tab: "training-status", filter: "completed" })
                    }
                    onFailedClick={() =>
                      open({ tab: "training-status", filter: "failed" })
                    }
                    disableTooltips={disableTooltips}
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
