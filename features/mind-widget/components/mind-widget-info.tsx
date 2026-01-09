import { CircleInfoIcon } from "@/delphi-ui/icons";
import React from "react";

interface MindWidgetInfoProps {
  onClick?: () => void;
}

export function MindWidgetInfo({ onClick }: MindWidgetInfoProps) {
  return (
    <div
      className={[
        // Layout
        "flex",
        // Sizing
        "min-h-7 h-7",
        // Positioning
        "-ml-[2px]",
        // Alignment
        "items-center gap-[3px]",
        // Typography
        "text-sm text-sand-10 dark:text-sand-11",
        // Interactive states
        "group cursor-pointer",
      ].join(" ")}
      onClick={onClick}
    >
      <CircleInfoIcon className='w-4.5 h-4.5 text-sand-8 group-hover:text-blue-500' />{" "}
      <span className='group-hover:text-blue-500'>Mind Score</span>
    </div>
  );
}
