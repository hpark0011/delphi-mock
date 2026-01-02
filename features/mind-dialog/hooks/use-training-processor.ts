"use client";

import { useRef, useEffect, useCallback } from "react";
import { PROGRESS_UPDATE_INTERVAL } from "@/app/studio/_constants/training-queue";
import type { QueueItem } from "../context/training-queue-context";
import type { TrainingItemStatus } from "@/utils/training-status-helpers";

export interface ProcessorCallbacks {
  onItemProgress: (itemId: string, progress: number) => void;
  onItemStatusChange: (
    itemId: string,
    status: TrainingItemStatus,
    progress: number
  ) => void;
  onItemCompleted: (item: QueueItem) => void;
  onBatchComplete: () => void;
}

interface UseTrainingProcessorOptions {
  queue: QueueItem[];
  callbacks: ProcessorCallbacks;
}

interface UseTrainingProcessorReturn {
  clearProcessing: () => void;
}

/**
 * Hook that handles the training simulation/processing logic.
 * Watches the queue for "queued" items and processes them sequentially.
 * Uses callbacks to notify the parent of state changes.
 *
 * This is designed to be easily replaceable with a real API implementation.
 */
export function useTrainingProcessor({
  queue,
  callbacks,
}: UseTrainingProcessorOptions): UseTrainingProcessorReturn {
  const processingRef = useRef(false);
  const intervalRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  /**
   * Process a single item with progress tracking.
   * Returns a promise that resolves when processing completes.
   */
  const processItemProgress = useCallback(
    (itemId: string, duration: number): Promise<void> => {
      return new Promise((resolve) => {
        const startTime = Date.now();

        // Update progress every PROGRESS_UPDATE_INTERVAL
        const interval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min((elapsed / duration) * 100, 100);
          callbacks.onItemProgress(itemId, progress);
        }, PROGRESS_UPDATE_INTERVAL);

        intervalRefs.current.set(itemId, interval);

        // Wait for duration to complete
        const timeout = setTimeout(() => {
          const intervalToClear = intervalRefs.current.get(itemId);
          if (intervalToClear) {
            clearInterval(intervalToClear);
            intervalRefs.current.delete(itemId);
          }
          resolve();
        }, duration);

        timeoutRefs.current.push(timeout);
      });
    },
    [callbacks]
  );

  /**
   * Clear all timers and reset processing state.
   * Called when queue is cleared.
   */
  const clearProcessing = useCallback(() => {
    // Clear all intervals
    intervalRefs.current.forEach((interval) => clearInterval(interval));
    intervalRefs.current.clear();
    // Clear all timeouts
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current = [];
    // Reset processing flag
    processingRef.current = false;
  }, []);

  // Main processing effect - watches queue and processes items sequentially
  useEffect(() => {
    if (queue.length === 0 || processingRef.current) return;

    const processQueue = async () => {
      processingRef.current = true;

      // Find items to process
      const itemsToProcess = queue.filter((item) => item.status === "queued");

      // Process each item sequentially
      for (const item of itemsToProcess) {
        // Start training
        callbacks.onItemStatusChange(item.id, "training", 0);

        // Simulate progress over item duration
        await processItemProgress(item.id, item.duration);

        // Determine final status
        let finalStatus: TrainingItemStatus;
        if (item.shouldDelete) {
          finalStatus = "deleted";
        } else if (item.shouldFail) {
          finalStatus = "failed";
        } else {
          finalStatus = "completed";
        }

        // Update to final status
        callbacks.onItemStatusChange(item.id, finalStatus, 100);

        // Notify for successful completions (for score updates)
        if (finalStatus === "completed") {
          callbacks.onItemCompleted(item);
        }
      }

      // Notify when batch processing completes
      if (itemsToProcess.length > 0) {
        callbacks.onBatchComplete();
      }

      processingRef.current = false;
    };

    processQueue();
  }, [queue, callbacks, processItemProgress]);

  return { clearProcessing };
}
