"use client";

import { useRef } from "react";
import { PlaceholderParagraphs } from "../components/placeholder-paragraphs";
import { VariantCard } from "../components/variants-card";
import { VariantsCardTitle } from "../components/variants-card-title";
import { VariantsGrid } from "../components/variants-grid";
import {
  MindWidget,
  useScrollAwareTrainingVisibility,
} from "@/features/mind-widget";
import { useMindScore } from "@/features/mind-score";
import { useContainerScrollDirection } from "@/hooks/use-container-scroll-direction";
import { MindWidgetWithAdd } from "@/features/mind-widget/mind-widget-with-add";

export default function MindView() {
  const { current } = useMindScore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingDown = useContainerScrollDirection(scrollContainerRef);

  // Control training visibility based on scroll direction
  useScrollAwareTrainingVisibility(isScrollingDown);

  return (
    <div className='h-full p-6 max-w-7xl mx-auto pl-[64px] space-y-2 pb-[320px]'>
      <VariantsGrid>
        <VariantCard>
          <VariantsCardTitle>Default: Studio home</VariantsCardTitle>
          <div className='flex flex-col items-center justify-center pt-2'>
            <MindWidget score={current} />
          </div>
        </VariantCard>
        <VariantCard className='p-0'>
          <VariantsCardTitle>
            Compact Vertical: Profile, IM, Onboarding
          </VariantsCardTitle>
          <div className='relative w-full h-full'>
            <div className='absolute top-0 inset-x-0 flex items-center justify-center pointer-events-none bg-gradient-to-b from-sand-1 to-transparent dark:from-black py-16'>
              <div className='pointer-events-auto'>
                <MindWidget score={current} variant='compact-vertical' />
              </div>
            </div>
            <div
              ref={scrollContainerRef}
              className='w-full h-full overflow-y-auto px-12 py-[160px]'
            >
              <h2 className='text-2xl font-semibold mb-4'>Sample Content</h2>
              <PlaceholderParagraphs />
            </div>
          </div>
        </VariantCard>
      </VariantsGrid>

      <VariantsGrid>
        <VariantCard>
          <VariantsCardTitle>Compact: Mind dialog</VariantsCardTitle>
          <div className='flex flex-col items-center justify-center pt-2'>
            <MindWidget score={current} variant='compact' />
          </div>
        </VariantCard>
      </VariantsGrid>

      <VariantsGrid className='mt-20'>
        <VariantCard>
          <VariantsCardTitle>Default: Studio home</VariantsCardTitle>
          <div className='flex flex-col items-center justify-center pt-2'>
            <MindWidgetWithAdd score={current} />
          </div>
        </VariantCard>
        <VariantCard className='p-0'>
          <VariantsCardTitle>Compact: Mind dialog</VariantsCardTitle>
          <div className='relative w-full h-full'>
            <div className='absolute top-0 inset-x-0 flex items-center justify-center pointer-events-none bg-gradient-to-b from-sand-1 to-transparent dark:from-black py-16'>
              <div className='pointer-events-auto'>
                <MindWidgetWithAdd score={current} variant='compact-vertical' />
              </div>
            </div>
            <div
              ref={scrollContainerRef}
              className='w-full h-full overflow-y-auto px-12 py-[160px]'
            >
              <h2 className='text-2xl font-semibold mb-4'>Sample Content</h2>
              <PlaceholderParagraphs />
            </div>
          </div>
        </VariantCard>
      </VariantsGrid>

      <VariantsGrid>
        <VariantCard>
          <VariantsCardTitle>Default: Studio home</VariantsCardTitle>
          <div className='flex flex-col items-center justify-center pt-2'>
            <MindWidgetWithAdd score={current} variant='compact' />
          </div>
        </VariantCard>
      </VariantsGrid>
    </div>
  );
}
