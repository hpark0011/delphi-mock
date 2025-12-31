"use client";

import { useMindDialog, type TrainingDocType } from "@/features/mind-dialog";
import { useTrainingQueue } from "@/hooks/use-training-queue";
import { useTrainingStatus } from "@/hooks/use-training-status";
import { TrainingResultBadges } from "@/components/mind-widget/training-result-badges";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MindWidgetStatusIcon } from "./mind-widget-status-icon";
import { MindWidgetStatusLabel } from "./mind-widget-status-label";

type BadgeState = "loading" | "newItem" | "finished";

const NEW_ITEM_DISPLAY_DURATION = 2000;
const FINISHED_DISPLAY_DURATION = 2000;

// Shared animation props for vertical slide transitions
const SLIDE_ANIMATION = {
  initial: { y: 20, opacity: 0, filter: "blur(10px)" },
  animate: { y: 0, opacity: 1, filter: "blur(0px)" },
  exit: { y: -20, opacity: 0, filter: "blur(10px)" },
  transition: { duration: 0.2, ease: "easeInOut" as const },
};

interface MindWidgetTrainingStatusProps {
  onDismiss?: () => void;
}

export function MindWidgetTrainingStatus({
  onDismiss,
}: MindWidgetTrainingStatusProps) {
  const { queue } = useTrainingQueue();
  const { openWithTab } = useMindDialog();

  const { activeCount, queueStatus } = useTrainingStatus();

  // Calculate completed and failed counts from queue
  const completedCount = queue.filter(
    (item) => item.status === "completed"
  ).length;
  const failedCount = queue.filter((item) => item.status === "failed").length;

  // When the training queue is actively processing, show loading spinner.
  // Otherwise (empty, paused, or done), show completed state.
  const baseState = queueStatus === "active" ? "loading" : "finished";

  // Single override state for temporary "newItem" display
  // Tracks both name and docType to show correct icon
  const [newItemOverride, setNewItemOverride] = useState<{
    name: string;
    docType: TrainingDocType;
  } | null>(() => {
    const lastItem = queue[queue.length - 1];
    return lastItem ? { name: lastItem.name, docType: lastItem.docType } : null;
  });

  const prevQueueLengthRef = useRef(queue.length);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const finishedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle initial mount - start timer to clear override
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setNewItemOverride(null);
    }, NEW_ITEM_DISPLAY_DURATION);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Detect new items added after initial mount
  useEffect(() => {
    if (queue.length > prevQueueLengthRef.current) {
      const newestItem = queue[queue.length - 1];
      if (newestItem) {
        setNewItemOverride({
          name: newestItem.name,
          docType: newestItem.docType,
        });

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setNewItemOverride(null);
        }, NEW_ITEM_DISPLAY_DURATION);
      }
    }
    prevQueueLengthRef.current = queue.length;
  }, [queue]);

  // When training finishes, show badges for 2 seconds then dismiss
  useEffect(() => {
    if (queueStatus === "finished" && completedCount + failedCount > 0) {
      if (finishedTimeoutRef.current) clearTimeout(finishedTimeoutRef.current);
      finishedTimeoutRef.current = setTimeout(() => {
        onDismiss?.();
      }, FINISHED_DISPLAY_DURATION);
    }

    if (queueStatus === "active" && finishedTimeoutRef.current) {
      clearTimeout(finishedTimeoutRef.current);
    }

    return () => {
      if (finishedTimeoutRef.current) clearTimeout(finishedTimeoutRef.current);
    };
  }, [queueStatus, completedCount, failedCount, onDismiss]);

  // Display state: override takes priority over base state
  const displayState: BadgeState =
    newItemOverride !== null ? "newItem" : baseState;

  const handleClick = () => {
    openWithTab("training-status");
  };

  // Height-based animation for vertical layout
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
              key='finished-badges'
              {...SLIDE_ANIMATION}
              className='flex items-center gap-1'
            >
              <span className='text-[12px] font-medium text-white/70'>
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
                countTextSize='text-[11px]'
              />
            </motion.div>
          ) : (
            <motion.div
              key='status-content'
              {...SLIDE_ANIMATION}
              className='flex items-center gap-1'
            >
              <MindWidgetStatusIcon
                state={displayState}
                docType={newItemOverride?.docType}
              />
              <MindWidgetStatusLabel
                state={displayState}
                activeCount={activeCount}
                newItemName={newItemOverride?.name ?? ""}
              />
              {(completedCount > 0 || failedCount > 0) && (
                <div className='ml-0.5'>
                  <TrainingResultBadges
                    className='gap-0.5'
                    countTextSize='text-[11px]'
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
