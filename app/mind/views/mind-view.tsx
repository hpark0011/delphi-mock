"use client";

import { VariantCard } from "../components/variants-card";
import { VariantsGrid } from "../components/variants-grid";
import { MindWidget } from "@/features/mind-widget";

export default function MindView() {
  return (
    <div className='h-full p-6 max-w-7xl mx-auto pl-[64px]'>
      <VariantsGrid>
        <VariantCard>
          <div className='flex flex-col items-center justify-center pt-4'>
            <MindWidget />
          </div>
        </VariantCard>
        <VariantCard>Item 2</VariantCard>
        <VariantCard>Item 3</VariantCard>
        <VariantCard>Item 4</VariantCard>
      </VariantsGrid>
    </div>
  );
}
