"use client";

import { StudioAnalytics } from "@/app/studio/_components/studio-analytics";
import { StudioGreeting } from "@/app/studio/_components/studio-greeting";
import { StudioHeader } from "@/app/studio/_components/studio-header";
import { StudioHighlights } from "@/app/studio/_components/studio-highlights";
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
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/3defb6de-43b2-4f94-a176-53fbf2c88ac0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'studio/_views/studio-view.tsx:20',message:'StudioView client component rendering',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B,D'})}).catch(()=>{});
  // #endregion
  return (
    <div className='px-4 max-w-2xl relative mx-auto'>
      <StudioHeader />

      <div className='relative z-10 py-20'>
        <StudioGreeting />

        <div className='flex gap-2'>
          <div className='w-full flex flex-col gap-2'>
            <StudioTasks trainingCards={trainingCards} />

            <div className='flex lg:flex-row gap-2 flex-col'>
              <StudioAnalytics engagements={engagements} />

              <StudioHighlights highlights={highlights} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
