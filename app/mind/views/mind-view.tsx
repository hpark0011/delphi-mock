"use client";

import { VariantCard } from "../components/variants-card";
import { VariantsGrid } from "../components/variants-grid";
import { MindWidget } from "@/features/mind-widget";
import { useMindScore } from "@/features/mind-score";

export default function MindView() {
  const { current, level } = useMindScore();
  return (
    <div className='h-full p-6 max-w-7xl mx-auto pl-[64px]'>
      <VariantsGrid>
        <VariantCard>
          <div className='flex flex-col items-center justify-center pt-4'>
            <MindWidget score={current} level={level} />
          </div>
        </VariantCard>
        <VariantCard>Item 2</VariantCard>
        <VariantCard>Item 3</VariantCard>
      </VariantsGrid>
    </div>
  );
}
