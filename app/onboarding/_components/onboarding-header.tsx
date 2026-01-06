"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@/delphi-ui/icons/ArrowLeft";
import {
  useOnboardingSteps,
  useOnboardingScore,
  useOnboardingAnimation,
} from "@/app/onboarding/_context";
import { ONBOARDING_STEPS_COUNT } from "@/app/onboarding/_utils/onboarding-steps-config";
import { OnboardingMindWidget } from "./onboarding-mind-widget/onboarding-mind-widget";
import { OnboardingProgress } from "./onboarding-progress";

export function OnboardingHeader() {
  const { handlePrevious, currentStep } = useOnboardingSteps();
  const { mindScore } = useOnboardingScore();
  const { animationState } = useOnboardingAnimation();

  const progressValue = ((currentStep + 1) / ONBOARDING_STEPS_COUNT) * 100;

  return (
    <header className='bg-gradient-to-b from-background via-background/80 to-transparent absolute top-0 left-0 right-0 z-10'>
      <OnboardingProgress
        value={progressValue}
        className='absolute top-0 left-0 right-0'
      />
      <div className='flex items-start justify-center px-3 h-13 relative w-full'>
        {/* Previous step button */}
        <Button
          size='sm'
          onClick={handlePrevious}
          className='gap-1 rounded-full h-10 w-10 has-[>svg]:px-3 hover:bg-light absolute left-2 mt-2.5 bg-light'
          variant='ghost'
        >
          <ArrowLeftIcon className='size-5 text-icon-medium' />
        </Button>

        {/* Desktop: Show "Interview" title */}
        <OnboardingMindWidget
          currentStep={currentStep}
          mindScore={mindScore}
          isLuminating={animationState === "training"}
          isGlowing={false}
        />
      </div>
    </header>
  );
}
