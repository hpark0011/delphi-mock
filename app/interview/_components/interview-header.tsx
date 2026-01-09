"use client";

import { Button } from "@/components/ui/button";
import { ExitIcon } from "@/delphi-ui/icons/Exit";
import { useMindScore } from "@/features/mind-score";
import { useScrollAwareTrainingVisibility } from "@/features/mind-widget";
import { MindWidgetSubtle } from "@/features/mind-widget/mind-widget-subtle";
import { useInterviewContext } from "../_context/interview-context";

interface InterviewHeaderProps {
  onExit?: () => void;
  hasResponses?: boolean;
}

export function InterviewHeader({
  onExit,
  hasResponses = false,
}: InterviewHeaderProps) {
  const { current } = useMindScore();
  const { isScrollingDown } = useInterviewContext();

  // Control training visibility based on scroll direction
  useScrollAwareTrainingVisibility(isScrollingDown);

  return (
    <header className='bg-gradient-to-b from-background via-background/80 to-transparent absolute top-0 left-0 right-0 z-10'>
      <div className='flex items-start justify-between px-3 py-4'>
        <div className='flex-1' />

        {/* Desktop: Show "Interview" title */}
        <MindWidgetSubtle score={current} variant='compact-vertical' />

        {/* Save & Exit button - right aligned */}
        <div className='flex-1 flex justify-end mt-1'>
          <Button
            size='sm'
            onClick={onExit}
            className='gap-1 rounded-full h-8 has-[>svg]:px-3 hover:opacity-70'
            variant='secondary'
          >
            <ExitIcon className='size-4 text-icon-dark' />
            <span className='hidden lg:inline'>
              {hasResponses ? "Save & Exit" : "Exit"}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
