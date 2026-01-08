"use client";

import { PlaceholderParagraphs } from "../components/placeholder-paragraphs";
import { VariantCard } from "../components/variants-card";
import { VariantsGrid } from "../components/variants-grid";
import {
  MindWidgetSmall,
  MindWidget,
  MindWidgetSmallVertical,
} from "@/features/mind-widget";
import { useMindScore } from "@/features/mind-score";

export default function MindView() {
  const { current, level, levelProgress } = useMindScore();
  return (
    <div className='h-full p-6 max-w-7xl mx-auto pl-[64px] space-y-6'>
      <VariantsGrid>
        <VariantCard>
          <div className='flex flex-col items-center justify-center pt-2'>
            <MindWidget score={current} level={level} />
          </div>
        </VariantCard>
        <VariantCard>
          <div className='flex flex-col items-center justify-center pt-2'>
            <MindWidgetSmall
              score={current}
              level={level}
              progress={levelProgress}
            />
          </div>
        </VariantCard>
      </VariantsGrid>

      <VariantsGrid>
        <VariantCard className='p-0 h-[480px]'>
          <div className='relative w-full h-full'>
            <div className='absolute top-0 inset-x-0 flex items-center justify-center pointer-events-none bg-gradient-to-b from-sand-1 to-transparent py-4'>
              <div className='pointer-events-auto'>
                <MindWidgetSmallVertical
                  score={current}
                  level={level}
                  progress={levelProgress}
                />
              </div>
            </div>
            <div className='w-full h-full overflow-y-auto px-12 py-[160px]'>
              <h2 className='text-2xl font-semibold mb-4'>Sample Content</h2>
              <PlaceholderParagraphs />
            </div>
          </div>
        </VariantCard>
      </VariantsGrid>
    </div>
  );
}
