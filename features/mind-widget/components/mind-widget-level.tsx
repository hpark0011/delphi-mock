import { BrainIcon } from "@/delphi-ui/icons/Brain";
import { cn } from "@/lib/utils";
import React from "react";

interface MindWidgetLevelProps {
  level: string;
}

export function MindWidgetLevel({ level }: MindWidgetLevelProps) {
  return (
    <div className='text-sand-4 dark:text-sand-11 text-[13px] font-[480] text-center leading-[100%] tracking-tight'>
      {level}
    </div>
  );
}
