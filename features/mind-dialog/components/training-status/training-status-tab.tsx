"use client";

import { useMindScore } from "@/features/mind-score";
import { SCORE_PER_ITEM } from "@/app/studio/_constants/training-queue";
import { useTrainingQueue, type QueueItem } from "@/hooks/use-training-queue";
import { useTrainingStatus } from "@/hooks/use-training-status";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMindDialog } from "../mind-dialog";
import { ActiveTrainingQueue } from "./active-training-queue";
import { type TrainingItem } from "./training-history";
import { TrainingSummary } from "./training-summary";
// import { TrainingHistory } from "./training-history";

// Re-export for backward compatibility
export type { TrainingItemStatus as TrainingStatus } from "@/utils/training-status-helpers";
export type { TrainingItem };

export function TrainingStatusTab() {
  const { queue, markAsReviewed } = useTrainingQueue();
  const { current, nextLevelThreshold, lastTrainingDate } = useMindScore();
  const { initialFilter, clearInitialFilter } = useMindDialog();
  const [queueSnapshot, setQueueSnapshot] = useState<QueueItem[]>([]);
  const prevQueueStatus = useRef<string | null>(null);

  const {
    finishedCount,
    totalCount,
    queueStatus,
    completedCount,
    failedCount,
  } = useTrainingStatus();

  // Capture queue snapshot when transitioning to "finished" state
  useEffect(() => {
    if (queueStatus === "finished" && prevQueueStatus.current !== "finished") {
      setQueueSnapshot([...queue]);
    }
    if (queueStatus === "active" && prevQueueStatus.current === "finished") {
      setQueueSnapshot([]);
    }
    prevQueueStatus.current = queueStatus;
  }, [queueStatus, queue]);

  // Handler for "View summary" button click
  const handleViewSummary = () => {
    markAsReviewed();
  };

  // Calculate summary statistics using memoized values from hook
  const summaryStats = useMemo(() => {
    const deleted = finishedCount - completedCount - failedCount;
    const totalTrained = completedCount + failedCount + deleted;

    return {
      totalTrained,
      completed: completedCount,
      failed: failedCount,
    };
  }, [completedCount, failedCount, finishedCount]);

  // Calculate derived values for TrainingSummary
  const scoreIncrease = summaryStats.completed * SCORE_PER_ITEM;
  const remainingToNextLevel = nextLevelThreshold - current;

  return (
    <div className='flex flex-col gap-4'>
      {/* Active training queue - Show when queue is active or finished */}
      {(queueStatus === "active" || queueStatus === "finished") && (
        <ActiveTrainingQueue
          showCompletedStatus={queueStatus === "finished"}
          setShowCompletedStatus={handleViewSummary}
          finishedCount={finishedCount}
          totalCount={totalCount}
          queueSnapshot={queueSnapshot}
          initialFilter={initialFilter}
          onFilterApplied={clearInitialFilter}
        />
      )}

      {/* Training Summary - Only show when queue is idle (default state) */}
      {queueStatus === "idle" && (
        <TrainingSummary
          summaryStats={summaryStats}
          scoreIncrease={scoreIncrease}
          remainingToNextLevel={remainingToNextLevel}
          trainingDate={lastTrainingDate}
        />
      )}

      {/* Training History */}
      {/* <TrainingHistory /> */}
    </div>
  );
}
