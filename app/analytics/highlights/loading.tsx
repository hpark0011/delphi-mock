import { StudioSectionWrapper } from "@/app/studio/_components/studio-section-wrapper";
import * as React from "react";

export default function HighlightsLoading() {
  return (
    <StudioSectionWrapper className='h-fit'>
      <div className='animate-pulse'>
        <div className='h-[536px] bg-light rounded-3xl flex items-center justify-center text-sm text-text-muted'>
          loading....
        </div>
      </div>
    </StudioSectionWrapper>
  );
}
