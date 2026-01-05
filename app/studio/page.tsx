import { StudioView } from "./_views/studio-view";
import {
  mockEngagements,
  mockHighlights,
  mockTrainingCards,
} from "./_libs/mock-studio-data";

export default async function StudioPage() {
  return (
    <StudioView
      engagements={mockEngagements}
      highlights={mockHighlights}
      trainingCards={mockTrainingCards}
    />
  );
}
