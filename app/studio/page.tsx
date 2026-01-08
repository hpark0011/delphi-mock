import { StudioView } from "./_views/studio-view";
import {
  mockEngagements,
  mockHighlights,
  mockTrainingCards,
} from "./_libs/mock-studio-data";

export default async function StudioPage() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/3defb6de-43b2-4f94-a176-53fbf2c88ac0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'studio/page.tsx:8',message:'StudioPage server component rendering - will suspend',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix-3',hypothesisId:'B,D'})}).catch(()=>{});
  // #endregion
  // Add a small delay to ensure loading.tsx shows during navigation
  // This makes the route actually suspend, triggering Next.js loading state
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  return (
    <StudioView
      engagements={mockEngagements}
      highlights={mockHighlights}
      trainingCards={mockTrainingCards}
    />
  );
}
