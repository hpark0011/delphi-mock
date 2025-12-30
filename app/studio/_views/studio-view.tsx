"use client";

import { StudioAnalytics } from "@/app/studio/_components/studio-analytics";
import { StudioHighlights } from "@/app/studio/_components/studio-highlights";
import { StudioGreeting } from "@/app/studio/_components/studio-greeting";
import { StudioHeader } from "@/app/studio/_components/studio-header";
import { StudioTasks } from "@/app/studio/_components/studio-tasks";
import type {
  Engagements,
  Highlights,
  TrainingCard,
} from "../_libs/mock-studio-data";

interface StudioViewProps {
  engagements: Engagements;
  highlights: Highlights;
  trainingCards: TrainingCard[];
}

export function StudioView({
  engagements,
  highlights,
  trainingCards,
}: StudioViewProps) {
  return (
    <div className='px-4 max-w-2xl relative mx-auto'>
      <StudioHeader />

      <div className='relative z-10 py-20'>
        <StudioGreeting />

        <div className='flex gap-2'>
          <div className='w-full flex flex-col gap-2'>
            <StudioTasks trainingCards={trainingCards} />

            <div className='flex gap-2'>
              <StudioAnalytics engagements={engagements} />

              <StudioHighlights highlights={highlights} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
