"use client";

import { HomeAnalytics } from "@/components/analytics/home/home-analytics";
import { HomeHighlights } from "@/components/analytics/home/home-highlights";
import { StudioGreeting } from "./_components/studio-greeting";
import { StudioTasks } from "./_components/studio-tasks";
import {
  mockEngagements,
  mockHighlights,
  mockTrainingCards,
} from "./_lib/mock-studio-data";

export default function StudioPage() {
  return (
    <div className='space-y-4 px-13 max-w-3xl mx-auto pt-20 pb-20'>
      <StudioGreeting />

      <div className='flex gap-2'>
        <div className='w-full flex flex-col gap-2'>
          <StudioTasks trainingCards={mockTrainingCards} />

          <HomeAnalytics engagements={mockEngagements} />

          <HomeHighlights highlights={mockHighlights} />
        </div>
      </div>
    </div>
  );
}
