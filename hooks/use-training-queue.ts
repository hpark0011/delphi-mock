"use client";

import {
  useTrainingQueueContext,
  type QueueItem,
  type TrainingDocType,
} from "@/features/mind-dialog";

// Re-export types for backward compatibility
export type { QueueItem, TrainingDocType };

interface UseTrainingQueueOptions {
  onItemCompleted?: (points?: number) => void;
}

/**
 * Hook to access the training queue context.
 * This is a thin wrapper around TrainingQueueContext for backward compatibility.
 * The onItemCompleted option is deprecated - score increment is handled automatically in the context.
 */
export function useTrainingQueue(options?: UseTrainingQueueOptions) {
  // Note: onItemCompleted is ignored - score increment is handled in TrainingQueueContext
  // This parameter is kept for backward compatibility but does nothing
  const context = useTrainingQueueContext();

  return {
    queue: context.queue,
    addToQueue: context.addToQueue,
    clearQueue: context.clearQueue,
    removeItem: context.removeItem,
    retryItem: context.retryItem,
  };
}
