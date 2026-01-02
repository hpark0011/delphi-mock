"use client";

import { useState, useRef, useCallback } from "react";
import type { TrainingDocType } from "../context/training-queue-context";

export interface RecentlyAddedItem {
  name: string;
  docType: TrainingDocType;
}

const RECENTLY_ADDED_TIMEOUT_MS = 2000;

/**
 * Hook for managing the "recently added item" UI overlay.
 * Shows a temporary notification when items are added to the queue.
 * Auto-clears after 2 seconds.
 */
export function useRecentlyAddedItem() {
  const [recentlyAddedItem, setRecentlyAddedItem] =
    useState<RecentlyAddedItem | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearRecentlyAdded = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setRecentlyAddedItem(null);
  }, []);

  const setRecentlyAdded = useCallback((item: RecentlyAddedItem) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setRecentlyAddedItem(item);

    // Auto-clear after timeout
    timeoutRef.current = setTimeout(() => {
      setRecentlyAddedItem(null);
      timeoutRef.current = null;
    }, RECENTLY_ADDED_TIMEOUT_MS);
  }, []);

  return {
    recentlyAddedItem,
    setRecentlyAdded,
    clearRecentlyAdded,
  };
}
