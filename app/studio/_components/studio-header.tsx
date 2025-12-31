import React from "react";
import { MindWidget } from "@/features/mind-widget";
import { MindWidgetSmall } from "@/components/mind-widget/mind-widget-small";
import { useMindScore } from "@/features/mind-score";

export function StudioHeader() {
  const { current, level } = useMindScore();
  return (
    <div className='sticky top-0 z-50 w-full px-4 py-4 left-0'>
      <div className='flex items-center justify-center'>
        <MindWidget score={current} level={level} />
        <MindWidgetSmall />
      </div>
    </div>
  );
}
