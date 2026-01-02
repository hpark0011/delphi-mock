import { CircleInfoIcon } from "@/delphi-ui/icons";
import React from "react";

export function MindWidgetInfo() {
  return (
    <div className='text-sm text-sand-10 dark:text-sand-11 flex items-center gap-0.5 -ml-[2px] mt-1'>
      <CircleInfoIcon className='w-4 h-4 text-sand-8' /> Mind Score
    </div>
  );
}
