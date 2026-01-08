"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { toast } from "sonner";
import { type TrainingItemStatus } from "@/utils/training-status-helpers";
import { useMindScore } from "@/features/mind-score";
import { SCORE_PER_ITEM } from "@/app/studio/_constants/training-queue";
import {
  getDurationByDocType,
  updateScoreSafely,
} from "@/app/studio/_utils/training-queue-helpers";
import {
  useTrainingProcessor,
  type ProcessorCallbacks,
} from "../hooks/use-training-processor";

export type TrainingDocType =
  | "interview"
  | "youtube"
  | "x"
  | "website"
  | "podcast"
  | "file"
  | "generic";

export interface QueueItem {
  id: string;
  name: string;
  docType: TrainingDocType;
  status: TrainingItemStatus;
  progress: number; // 0-100
  duration: number; // Training duration in milliseconds
  shouldFail?: boolean; // If true, item will fail after training completes
  shouldDelete?: boolean; // If true, item will enter deleted state after training completes
}

type QueueItemInput = Omit<
  QueueItem,
  "id" | "status" | "progress" | "duration"
> & {
  duration?: number; // Optional duration, will be calculated from docType if not provided
};

interface TrainingQueueContextType {
  queue: QueueItem[];
  addToQueue: (items: QueueItemInput[]) => QueueItem[];
  clearQueue: () => void;
  removeItem: (itemId: string) => void;
  retryItem: (itemId: string) => void;
  hasUserReviewed: boolean;
  markAsReviewed: () => void;
  isTrainingVisible: boolean;
  setIsTrainingVisible: (visible: boolean) => void;
}

const TrainingQueueContext = createContext<TrainingQueueContextType | null>(
  null
);

interface TrainingQueueProviderProps {
  children: React.ReactNode;
}

export function TrainingQueueProvider({
  children,
}: TrainingQueueProviderProps) {
  const { incrementScore, setLastTrainingDate } = useMindScore();
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [hasUserReviewed, setHasUserReviewed] = useState(true);
  const [isTrainingVisible, setIsTrainingVisible] = useState(true);

  /**
   * Helper: Updates a specific queue item's properties
   */
  const updateItemStatus = useCallback(
    (itemId: string, updates: Partial<QueueItem>) => {
      setQueue((prev) =>
        prev.map((q) => (q.id === itemId ? { ...q, ...updates } : q))
      );
    },
    []
  );

  // Callbacks for the training processor
  const processorCallbacks = useMemo<ProcessorCallbacks>(
    () => ({
      onItemProgress: (itemId, progress) => {
        updateItemStatus(itemId, { progress });
      },
      onItemStatusChange: (itemId, status, progress) => {
        updateItemStatus(itemId, { status, progress });
      },
      onItemCompleted: () => {
        // Award points for successful completion
        updateScoreSafely(incrementScore, SCORE_PER_ITEM, "increment");
      },
      onBatchComplete: () => {
        setLastTrainingDate(new Date());
        setHasUserReviewed(false); // Show "finished" state
      },
    }),
    [updateItemStatus, incrementScore, setLastTrainingDate]
  );

  // Use the training processor hook for simulation logic
  const { clearProcessing } = useTrainingProcessor({
    queue,
    callbacks: processorCallbacks,
  });

  const markAsReviewed = useCallback(() => {
    setHasUserReviewed(true);
  }, []);

  const addToQueue = useCallback((items: QueueItemInput[]) => {
    setHasUserReviewed(true);
    setIsTrainingVisible(true);
    const newItems: QueueItem[] = items.map((item) => {
      // Calculate duration: use provided duration or default based on docType
      const duration = item.duration ?? getDurationByDocType(item.docType);

      return {
        ...item,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        docType: item.docType,
        status: "queued" as TrainingItemStatus,
        progress: 0,
        duration,
        shouldFail: item.shouldFail ?? false,
        shouldDelete: item.shouldDelete ?? false,
      };
    });

    setQueue((prev) => [...prev, ...newItems]);

    return newItems;
  }, []);

  const clearQueue = useCallback(() => {
    // Clear processing timers
    clearProcessing();
    // Clear queue
    setQueue([]);
    // Reset review state when cleared
    setHasUserReviewed(true);
  }, [clearProcessing]);

  const removeItem = useCallback((itemId: string) => {
    // Remove item from queue
    setQueue((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const retryItem = useCallback(
    (itemId: string) => {
      // Reset item status to queued and progress to 0
      updateItemStatus(itemId, {
        status: "queued" as TrainingItemStatus,
        progress: 0,
        shouldFail: false,
      });
    },
    [updateItemStatus]
  );

  // Dismiss toast when queue is empty
  useEffect(() => {
    if (queue.length === 0) {
      toast.dismiss("training-queue");
    }
  }, [queue.length]);

  const value = useMemo(
    () => ({
      queue,
      addToQueue,
      clearQueue,
      removeItem,
      retryItem,
      hasUserReviewed,
      markAsReviewed,
      isTrainingVisible,
      setIsTrainingVisible,
    }),
    [
      queue,
      addToQueue,
      clearQueue,
      removeItem,
      retryItem,
      hasUserReviewed,
      markAsReviewed,
      isTrainingVisible,
    ]
  );

  return (
    <TrainingQueueContext.Provider value={value}>
      {children}
    </TrainingQueueContext.Provider>
  );
}

export function useTrainingQueue() {
  const context = useContext(TrainingQueueContext);
  if (!context) {
    throw new Error(
      "useTrainingQueue must be used within TrainingQueueProvider"
    );
  }
  return context;
}
