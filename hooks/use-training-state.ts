"use client";

import { useMemo, useRef, useEffect } from "react";
import { useTrainingQueue } from "@/features/mind-dialog";
import {
  useRecentlyAddedItem,
  type RecentlyAddedItem,
} from "@/features/mind-dialog/hooks/use-recently-added-item";

export type TrainingStatus = "idle" | "active" | "finished";

// Re-export for consumers
export type { RecentlyAddedItem };

/**
 * Unified hook for training state management
 *
 * Replaces both useTrainingStatus and useTrainingDisplayState with a simpler,
 * single-layer approach that separates status from UI overlays.
 *
 * @returns Training state with status, counts, and recently added item
 */
export function useTrainingState() {
  const { queue, hasUserReviewed } = useTrainingQueue();
  const { recentlyAddedItem, setRecentlyAdded, clearRecentlyAdded } =
    useRecentlyAddedItem();

  // Track previous queue length to detect additions
  const prevQueueLengthRef = useRef(queue.length);

  // Detect when items are added to queue and update recently added item
  useEffect(() => {
    const prevLength = prevQueueLengthRef.current;
    const currentLength = queue.length;

    // Queue grew - items were added
    if (currentLength > prevLength && currentLength > 0) {
      const lastItem = queue[currentLength - 1];
      if (lastItem) {
        setRecentlyAdded({
          name: lastItem.name,
          docType: lastItem.docType,
        });
      }
    }

    // Queue was cleared
    if (currentLength === 0 && prevLength > 0) {
      clearRecentlyAdded();
    }

    prevQueueLengthRef.current = currentLength;
  }, [queue, setRecentlyAdded, clearRecentlyAdded]);

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
