"use client";

import { useMemo } from "react";
import { useTrainingQueue, type TrainingDocType } from "@/features/mind-dialog";

export type TrainingStatus = "idle" | "active" | "finished";

export interface RecentlyAddedItem {
  name: string;
  docType: TrainingDocType;
}

/**
 * Unified hook for training state management
 *
 * Replaces both useTrainingStatus and useTrainingDisplayState with a simpler,
 * single-layer approach that separates status from UI overlays.
 *
 * @returns Training state with status, counts, and recently added item
 */
export function useTrainingState() {
  const { queue, hasUserReviewed, recentlyAddedItem } = useTrainingQueue();

  // Derive status (single source of truth)
  const status: TrainingStatus = useMemo(() => {
    if (queue.length === 0) return "idle";
    const hasActive = queue.some(
      (item) => item.status === "queued" || item.status === "training"
    );
    if (hasActive) return "active";
    return hasUserReviewed ? "idle" : "finished";
  }, [queue, hasUserReviewed]);

  // Derive counts (computed once, memoized)
  const counts = useMemo(() => {
    const active = queue.filter(
      (i) => i.status === "queued" || i.status === "training"
    ).length;
    const completed = queue.filter((i) => i.status === "completed").length;
    const failed = queue.filter((i) => i.status === "failed").length;

    return {
      total: queue.length,
      active,
      completed,
      failed,
      finished: completed + failed,
    };
  }, [queue]);

  return {
    status,
    ...counts,
    recentlyAddedItem, // Separate concern - UI overlay (doesn't affect status)
  };
}
