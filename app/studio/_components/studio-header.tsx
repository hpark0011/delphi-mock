import React from "react";
import { MindWidget } from "@/components/mind-widget/mind-widget";
import { MindWidgetSmall } from "@/components/mind-widget/mind-widget-small";

export function StudioHeader() {
  return (
    <div className='sticky top-0 z-50 w-full px-4 py-4 left-0'>
      <div className='flex items-center justify-center'>
        <MindWidget />
        <MindWidgetSmall />
      </div>
    </div>
  );
}
