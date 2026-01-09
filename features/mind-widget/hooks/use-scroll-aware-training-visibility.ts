"use client";

import { useEffect } from "react";
import { useTrainingQueue } from "@/features/mind-dialog";

/**
 * Hook to control training status visibility based on scroll direction.
 * Use this in parent components that need scroll-aware behavior.
 *
 * @param isScrollingDown - Whether the user is scrolling down
 *
 * @example
 * ```tsx
 * function ProfilePage() {
 *   const { isScrollingDown } = useScrollDirection();
 *   useScrollAwareTrainingVisibility(isScrollingDown);
 *
 *   return <MindWidgetSmallVertical ... />;
 * }
 * ```
 */
export function useScrollAwareTrainingVisibility(isScrollingDown: boolean) {
  const { setIsTrainingVisible } = useTrainingQueue();

  useEffect(() => {
    setIsTrainingVisible(!isScrollingDown);
  }, [isScrollingDown, setIsTrainingVisible]);
}
