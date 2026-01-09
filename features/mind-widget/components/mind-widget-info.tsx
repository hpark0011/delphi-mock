import { CircleInfoIcon } from "@/delphi-ui/icons";
import { cn } from "@/lib/utils";

interface MindWidgetInfoProps {
  onClick?: () => void;
}

export function MindWidgetInfo({ onClick }: MindWidgetInfoProps) {
  return (
    <div
      className={cn(
        "flex",
        "min-h-7 h-7",
        "-ml-[2px]",
        "items-center gap-[3px]",
        "text-sm text-sand-10 dark:text-sand-11",
        "group cursor-pointer"
      )}
      onClick={onClick}
    >
      <CircleInfoIcon className='w-4.5 h-4.5 text-sand-8 group-hover:text-blue-500' />{" "}
      <span className='group-hover:text-blue-500'>Mind Score</span>
    </div>
  );
}
