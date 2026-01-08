"use client";

import { VariantCard } from "../components/variants-card";
import { VariantsGrid } from "../components/variants-grid";
import { MindWidgetSmallV2, MindWidget } from "@/features/mind-widget";
import { useMindScore } from "@/features/mind-score";

export default function MindView() {
  const { current, level } = useMindScore();
  return (
    <div className='h-full p-6 max-w-7xl mx-auto pl-[64px]'>
      <VariantsGrid>
        <VariantCard>
          <div className='flex flex-col items-center justify-center pt-2'>
            <MindWidget score={current} level={level} />
          </div>
        </VariantCard>
        <VariantCard>
          <div className='flex flex-col items-center justify-center pt-2'>
            <MindWidgetSmallV2 />
          </div>
        </VariantCard>
      </VariantsGrid>
    </div>
  );
}
