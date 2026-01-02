import { cn } from "@/lib/utils";
import React from "react";

interface MindWidgetLevelProps {
  level: string;
  className?: string;
}

export function MindWidgetLevel({ level, className }: MindWidgetLevelProps) {
  return (
    <div
      className={cn(
        "w-full flex items-center justify-center pb-0.5",
        className
      )}
    >
      <div className='text-sand-4 dark:text-sand-11 text-[13px] font-[480] text-center leading-[100%] tracking-tight'>
        {level}
      </div>
    </div>
  );
}
