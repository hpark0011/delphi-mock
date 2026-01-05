"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboardingAnimation, useOnboardingSteps } from "../../_context";
import { OnboardingPrivacyStatement } from "../onboarding-privacy-statement";

export function StartVerificationStep() {
  const { handleNext } = useOnboardingSteps();
  const { setAnimationState, setTrainingMessage } = useOnboardingAnimation();

  const handleVerifyLinkedIn = () => {
    setAnimationState("training");
    setTrainingMessage("Learning about you...");
    // Wait 1.5 seconds to show the training state before navigating
    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  return (
    <div className='flex flex-col items-center justify-center h-full relative w-full mb-20'>
      <div className='flex flex-col items-center justify-center gap-12 w-full'>
        {/* Heading and description */}
        <div className='flex flex-col gap-4 items-center justify-center max-w-md w-full'>
          <h1 className='text-4xl font-medium'>Let&apos;s get to know you</h1>
          <p className='text-text-muted font-[480] text-center leading-[140%]'>
            You can only make a Delphi of yourself.
          </p>
        </div>

        <div className='flex flex-col gap-0 items-center justify-center max-w-md w-full'>
          {/* LinkedIn Handle Input */}
          <div className='flex flex-col gap-2.5 w-full'>
            <div className='flex items-center justify-start w-full px-1'>
              <Label htmlFor='linkedin-handle'>LinkedIn Handle</Label>
            </div>
            <Input
              id='linkedin-handle'
              type='text'
              defaultValue='linkedin.com/in/hyunsolpark'
              className='w-full rounded-lg h-10'
            />
          </div>

          {/* Action Buttons */}
          <div className='flex gap-4 items-center justify-center flex-col w-full mt-4'>
            <Button
              size='lg'
              className='w-full rounded-full h-11'
              variant='primary'
              onClick={handleVerifyLinkedIn}
            >
              Verify Using LinkedIn
            </Button>
            <Button
              size='sm'
              variant='ghost'
              className='hover:bg-transparent text-text-muted text-sm'
            >
              Verify Using Government ID
            </Button>
          </div>
        </div>

        <div className='absolute bottom-0'>
          <OnboardingPrivacyStatement />
        </div>
      </div>
    </div>
  );
}
