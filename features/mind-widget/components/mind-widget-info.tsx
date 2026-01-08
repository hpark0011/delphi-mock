import { CircleInfoIcon } from "@/delphi-ui/icons";
import React from "react";

interface MindWidgetInfoProps {
  onClick?: () => void;
}

export function MindWidgetInfo({ onClick }: MindWidgetInfoProps) {
  return (
    <div
      className='text-sm text-sand-10 dark:text-sand-11 flex items-center gap-[3px] -ml-[2px] group cursor-pointer h-10'
      onClick={onClick}
    >
      <CircleInfoIcon className='w-4.5 h-4.5 text-sand-8 group-hover:text-blue-500' />{" "}
      <span className='group-hover:text-blue-500'>Mind Score</span>
    </div>
  );
}
