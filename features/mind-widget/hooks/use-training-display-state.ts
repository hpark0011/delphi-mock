import { useTrainingQueue } from "@/hooks/use-training-queue";
import { useTrainingStatus } from "@/hooks/use-training-status";
import { useEffect, useRef, useState } from "react";
import { type TrainingDocType } from "@/features/mind-dialog";

export type DisplayState = "learning" | "newItem" | "finished";

export interface NewItemInfo {
  name: string;
  docType: TrainingDocType;
}

interface UseTrainingDisplayStateOptions {
  newItemDuration?: number;
  finishedDuration?: number;
  onFinished?: () => void;
}

interface UseTrainingDisplayStateReturn {
  displayState: DisplayState;
  newItemInfo: NewItemInfo | null;
  activeCount: number;
  completedCount: number;
  failedCount: number;
}

export function useTrainingDisplayState({
  newItemDuration = 2000,
  finishedDuration = 2000,
  onFinished,
}: UseTrainingDisplayStateOptions = {}): UseTrainingDisplayStateReturn {
  const { queue } = useTrainingQueue();
  const { activeCount, queueStatus } = useTrainingStatus();

  const completedCount = queue.filter(
    (item) => item.status === "completed"
  ).length;
  const failedCount = queue.filter((item) => item.status === "failed").length;

  // New item override state - initialize with last item if exists
  const [newItemInfo, setNewItemInfo] = useState<NewItemInfo | null>(() => {
    const lastItem = queue[queue.length - 1];
    return lastItem ? { name: lastItem.name, docType: lastItem.docType } : null;
  });

  const prevQueueLengthRef = useRef(queue.length);
  const newItemTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const finishedTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialMountRef = useRef(true);

  // Handle initial mount - start timer to clear initial override
  useEffect(() => {
    if (initialMountRef.current && newItemInfo) {
      newItemTimeoutRef.current = setTimeout(() => {
        setNewItemInfo(null);
      }, newItemDuration);
      initialMountRef.current = false;
    }

    return () => {
      if (newItemTimeoutRef.current) clearTimeout(newItemTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Detect new items added after initial mount
  useEffect(() => {
    if (queue.length > prevQueueLengthRef.current) {
      const newestItem = queue[queue.length - 1];
      if (newestItem) {
        setNewItemInfo({
          name: newestItem.name,
          docType: newestItem.docType,
        });

        if (newItemTimeoutRef.current) clearTimeout(newItemTimeoutRef.current);
        newItemTimeoutRef.current = setTimeout(() => {
          setNewItemInfo(null);
        }, newItemDuration);
      }
    }
    prevQueueLengthRef.current = queue.length;
  }, [queue, newItemDuration]);

  // Auto-dismiss after finished state
  useEffect(() => {
    if (queueStatus === "finished" && completedCount + failedCount > 0) {
      if (finishedTimeoutRef.current) clearTimeout(finishedTimeoutRef.current);
      finishedTimeoutRef.current = setTimeout(() => {
        onFinished?.();
      }, finishedDuration);
    }

    if (queueStatus === "active" && finishedTimeoutRef.current) {
      clearTimeout(finishedTimeoutRef.current);
    }

    return () => {
      if (finishedTimeoutRef.current) clearTimeout(finishedTimeoutRef.current);
    };
  }, [queueStatus, completedCount, failedCount, finishedDuration, onFinished]);

  // Derive display state: newItem override takes priority
  const baseState = queueStatus === "active" ? "learning" : "finished";
  const displayState: DisplayState =
    newItemInfo !== null ? "newItem" : baseState;

  return {
    displayState,
    newItemInfo,
    activeCount,
    completedCount,
    failedCount,
  };
}
