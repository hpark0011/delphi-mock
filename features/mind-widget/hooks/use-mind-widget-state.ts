"use client";

import { useMindDialog, useTrainingQueue } from "@/features/mind-dialog";
import { useTrainingState } from "@/hooks/use-training-state";
import { useCallback, useMemo } from "react";

export function useMindWidgetState() {
  const { open } = useMindDialog();
  const { status } = useTrainingState();
  const { isTrainingVisible, setIsTrainingVisible } = useTrainingQueue();

  const openAddKnowledge = useCallback(() => {
    open({ tab: "add-knowledge" });
  }, [open]);

  // Compute whether training status should be shown
  // Only show when actively training and visibility is enabled
  const shouldShowTrainingStatus = useMemo(
    () => status !== "idle" && isTrainingVisible,
    [status, isTrainingVisible]
  );

  return {
    status,
    isTrainingVisible,
    setIsTrainingVisible,
    shouldShowTrainingStatus,
    openAddKnowledge,
  };
}
