import { cn } from "@/lib/utils";

interface MindWidgetScoreProps {
  score: number;
  className?: string;
  fontSize?: string;
}

function formatScore(score: number): string {
  if (score < 1000) return score.toString();
  const k = score / 1000;
  return `${Math.floor(k * 10) / 10}k`;
}

export function MindWidgetScore({
  score,
  className,
  fontSize,
}: MindWidgetScoreProps) {
  return (
    <div
      className={cn(
        "text-white text-lg font-semibold tracking-[-0.04em]",
        fontSize,
        "leading-[100%]",
        className
      )}
    >
      {formatScore(score)}
    </div>
  );
}
