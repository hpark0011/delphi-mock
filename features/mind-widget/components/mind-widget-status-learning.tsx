import { MindStatusIcon } from "@/components/mind-status-icon";

interface MindWidgetStatusLearningProps {
  activeCount: number;
}

export function MindWidgetStatusLearning({
  activeCount,
}: MindWidgetStatusLearningProps) {
  return (
    <div className='flex items-center gap-[3px]'>
      <MindStatusIcon status='active' />
      <span className='text-sm text-sand-10 dark:text-sand-11 whitespace-nowrap hover:text-blue-500'>
        Learning {activeCount}
      </span>
    </div>
  );
}
