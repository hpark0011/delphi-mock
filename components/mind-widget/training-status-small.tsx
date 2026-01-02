"use client";

import { useMindDialog, type TrainingDocType } from "@/features/mind-dialog";
import { MindStatusIcon } from "@/components/mind-status-notification";
import { Icon } from "@/components/ui/icon";
import { getDocTypeIcon } from "@/utils/doc-type-helpers";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { TrainingResultBadges } from "@/features/mind-widget/components/training-result-badges";
import {
  useTrainingDisplayState,
  type DisplayState,
} from "@/features/mind-widget/hooks/use-training-display-state";

const SPRING_CONFIG: Transition = {
  type: "spring",
  stiffness: 600,
  damping: 30,
};

const SLIDE_ANIMATION = {
  initial: { y: 20, opacity: 0, filter: "blur(10px)" },
  animate: { y: 0, opacity: 1, filter: "blur(0px)" },
  exit: { y: -20, opacity: 0, filter: "blur(10px)" },
  transition: { duration: 0.2, ease: "easeInOut" as const },
};

function StatusIcon({
  state,
  docType,
}: {
  state: "learning" | "newItem";
  docType?: TrainingDocType;
}) {
  return (
    <span className='relative flex items-center justify-center size-4'>
      <AnimatePresence mode='sync'>
        <motion.span
          key={state}
          className='absolute left-0 top-0'
          initial={{ y: -20, scale: 0.5, filter: "blur(6px)" }}
          animate={{ y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ y: 20, scale: 0.5, filter: "blur(6px)" }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
        >
          {state === "learning" && <MindStatusIcon status='active' />}
          {state === "newItem" && (
            <Icon
              name={docType ? getDocTypeIcon(docType) : "DocFillIcon"}
              className='size-4.5'
            />
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

interface StatusLabelProps {
  state: DisplayState;
  activeCount: number;
  newItemName: string;
}

function StatusLabel({ state, activeCount, newItemName }: StatusLabelProps) {
  const [labelWidth, setLabelWidth] = useState<number | "auto">("auto");
  const measureRef = useRef<HTMLDivElement>(null);

  const labelText =
    state === "learning" ? `Learning ${activeCount}` : newItemName;

  const isNewItem = state === "newItem";

  useLayoutEffect(() => {
    if (measureRef.current) {
      const { width } = measureRef.current.getBoundingClientRect();
      setLabelWidth(isNewItem ? Math.min(width, 184) : width);
    }
  }, [labelText, isNewItem]);

  return (
    <>
      {/* Hidden copy to measure width */}
      <div
        ref={measureRef}
        className='absolute invisible whitespace-nowrap text-[13px]'
      >
        {labelText}
      </div>

      <motion.span
        className='relative overflow-hidden'
        initial={false}
        animate={{ width: labelWidth }}
        transition={SPRING_CONFIG}
      >
        <AnimatePresence mode='sync' initial={false}>
          <motion.div
            key={state + labelText}
            className={`text-[13px] dark:text-white/90 ${isNewItem ? "max-w-[184px] truncate" : "whitespace-nowrap"}`}
            initial={{
              y: -20,
              opacity: 0,
              filter: "blur(10px)",
              position: "absolute",
            }}
            animate={{
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              position: "relative",
            }}
            exit={{
              y: 20,
              opacity: 0,
              filter: "blur(10px)",
              position: "absolute",
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {labelText}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    </>
  );
}

interface MiniTrainingStatusProps {
  onDismiss?: () => void;
  disableTooltips?: boolean;
}

export function MiniTrainingStatus({
  onDismiss,
  disableTooltips = false,
}: MiniTrainingStatusProps) {
  const { openWithTab } = useMindDialog();

  const {
    displayState,
    newItemInfo,
    activeCount,
    completedCount,
    failedCount,
  } = useTrainingDisplayState({ onFinished: onDismiss });

  const handleClick = () => openWithTab("training-status");

  // Width-based animation for horizontal layout
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
              <span className='text-[13px] font-medium'>Completed!</span>
              <TrainingResultBadges
                completedCount={completedCount}
                failedCount={failedCount}
                onCompletedClick={() =>
                  openWithTab("training-status", "completed")
                }
                onFailedClick={() => openWithTab("training-status", "failed")}
                disableTooltips={disableTooltips}
              />
            </motion.div>
          ) : (
            <motion.div
              key='status'
              {...SLIDE_ANIMATION}
              className='flex items-center gap-1'
            >
              <StatusIcon state={displayState} docType={newItemInfo?.docType} />
              <StatusLabel
                state={displayState}
                activeCount={activeCount}
                newItemName={newItemInfo?.name ?? ""}
              />
              {(completedCount > 0 || failedCount > 0) && (
                <div className='ml-1'>
                  <TrainingResultBadges
                    completedCount={completedCount}
                    failedCount={failedCount}
                    onCompletedClick={() =>
                      openWithTab("training-status", "completed")
                    }
                    onFailedClick={() =>
                      openWithTab("training-status", "failed")
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
