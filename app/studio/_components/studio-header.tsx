import React from "react";
import { MindWidget } from "@/features/mind-widget";
// import { MindWidgetSmall } from "@/components/mind-widget/mind-widget-small";
// import { MindWidgetLargeRect } from "./mindscore/widget/mind-widget-large-rect";
import { useMindScore } from "@/features/mind-score";

export function StudioHeader() {
  const { current, level } = useMindScore();
  return (
    <div className='sticky top-0 z-50 w-full px-4 py-4 left-0 bg-linear-to-b from-background via-background/80 to-transparent'>
      <div className='flex flex-col gap-2  items-center justify-center'>
        <MindWidget score={current} level={level} />
        {/* <MindWidgetSmall /> */}
        {/* <MindWidgetLargeRect /> */}
      </div>
    </div>
  );
}
