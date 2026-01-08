import React from "react";
import { MindWidget } from "@/features/mind-widget";
import { useMindScore } from "@/features/mind-score";

export function StudioHeader() {
  const { current, level } = useMindScore();
  return (
    <div className='hidden lg:block sticky top-0 z-50 w-full px-4 py-4 left-0 bg-linear-to-b from-background via-background/80 to-transparent dark:from-black dark:via-black/30'>
      <div className='flex flex-col gap-2 items-center justify-center'>
        <MindWidget score={current} level={level} />
      </div>
    </div>
  );
}
