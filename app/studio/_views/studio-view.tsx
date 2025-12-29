"use client";

import { HomeAnalytics } from "@/components/analytics/home/home-analytics";
import { HomeHighlights } from "@/components/analytics/home/home-highlights";
import { StudioGreeting } from "../_components/studio-greeting";
import { StudioTasks } from "../_components/studio-tasks";
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
    <div className='space-y-4 px-13 max-w-3xl mx-auto pt-20 pb-20'>
      <StudioGreeting />

      <div className='flex gap-2'>
        <div className='w-full flex flex-col gap-2'>
          <StudioTasks trainingCards={trainingCards} />

          <HomeAnalytics engagements={engagements} />

          <HomeHighlights highlights={highlights} />
        </div>
      </div>
    </div>
  );
}
