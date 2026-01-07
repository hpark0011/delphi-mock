"use client";

import { useMindDialog } from "@/features/mind-dialog";
import { useTrainingState } from "@/hooks/use-training-state";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import {
  generateSmallWidgetShadowString,
  generateDropShadow,
  getLevelShadowColors,
} from "../utils/level-shadows";
import { MindWidgetScore } from "./mind-widget-score";
import { MindTrainingStatusMini } from "./mind-training-status-mini";

interface MindWidgetSmallProps {
  score?: number;
  level?: string;
  disableClick?: boolean;
}

export function MindWidgetSmall({
  score = 20,
  level = "Skilled",
  disableClick = false,
}: MindWidgetSmallProps) {
  const { open } = useMindDialog();
  const { status } = useTrainingState();

  // Local override for manual dismissal
  const [isDismissed, setIsDismissed] = useState(false);

  // Show widget when training is active or finished, unless dismissed
  const isWidgetVisible =
    (status === "active" || status === "finished") && !isDismissed;

  // Reset dismissed state when status changes to active (new training started)
  if (status === "active" && isDismissed) {
    setIsDismissed(false);
  }

  const handleClick = () => {
    if (disableClick) return;
    open({ tab: "add-knowledge" });
  };

  // Called after MindTrainingStatusMini finishes showing "Completed!" for 2 seconds
  const handleWidgetDismiss = useCallback(() => {
    setIsDismissed(true);
  }, []);

  // Get level-based shadow colors
  const levelColors = getLevelShadowColors(level);
  const shadowString = generateSmallWidgetShadowString(levelColors);
  const dropShadow = generateDropShadow(levelColors);

  return (
    <div className='flex gap-2 relative justify-start items-center rounded-full bg-sand-10/8 dark:bg-sand-2'>
      {/* Mindscore Trigger */}
      <div
        className={cn(
          "flex items-center bg-sand-10/8 rounded-full transition-all duration-200 w-fit relative",
          !disableClick && "hover:scale-108 cursor-pointer"
        )}
        onClick={handleClick}
        style={{ boxShadow: dropShadow }}
      >
        {/* Mindscore Wrapper */}
        <div
          onClick={handleClick}
          className={cn(
            "flex flex-col gap-2 rounded-full overflow-hidden bg-black/87 border-white/20 dark:border-white/3 dark:bg-black w-fit px-2.5 py-1.5 relative justify-center items-center min-w-[52px] h-[40px] z-0",
            !disableClick && "cursor-pointer hover:bg-black/84"
          )}
          style={{
            boxShadow: shadowString.replace(/_/g, " "),
          }}
        >
          {/* Mindscore Value */}
          <MindWidgetScore
            score={score}
            className='text-text-primary-inverse dark:text-text-primary'
            fontSize='text-[16px]'
          />
        </div>
      </div>
      <AnimatePresence>
        {isWidgetVisible && (
          <MindTrainingStatusMini
            onDismiss={handleWidgetDismiss}
            disableTooltips={disableClick}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
