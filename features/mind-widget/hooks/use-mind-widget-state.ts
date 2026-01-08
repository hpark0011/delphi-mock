"use client";

import { useMindDialog, useTrainingQueue } from "@/features/mind-dialog";
import { useTrainingState } from "@/hooks/use-training-state";
import { useCallback } from "react";

export function useMindWidgetState() {
  const { open } = useMindDialog();
  const { status } = useTrainingState();
  const { isTrainingVisible, setIsTrainingVisible } = useTrainingQueue();

  const openAddKnowledge = useCallback(() => {
    open({ tab: "add-knowledge" });
  }, [open]);

  return {
    status,
    isTrainingVisible,
    setIsTrainingVisible,
    openAddKnowledge,
  };
}
