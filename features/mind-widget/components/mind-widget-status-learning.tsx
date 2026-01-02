import { MindStatusIcon } from "@/components/mind-status-notification";

interface MindWidgetStatusLearningProps {
  activeCount: number;
}

export function MindWidgetStatusLearning({
  activeCount,
}: MindWidgetStatusLearningProps) {
  return (
    <div className='flex items-center gap-0.5'>
      <MindStatusIcon status='active' />
      <span className='text-sm text-sand-10 whitespace-nowrap'>
        Learning {activeCount}
      </span>
    </div>
  );
}
