import { MindStatusIcon } from "@/components/mind-status-icon";
import "../styles/mind-widget.styles.css";

interface MindWidgetStatusLearningProps {
  activeCount: number;
  hasIcon?: boolean;
}

export function MindWidgetStatusLearning({
  activeCount,
  hasIcon = false,
}: MindWidgetStatusLearningProps) {
  return (
    <div className='flex items-center gap-[3px]'>
      {hasIcon && <MindStatusIcon status='active' />}
      <span className='text-sm learning-text-shimmer whitespace-nowrap'>
        Learning {activeCount}
      </span>
    </div>
  );
}
