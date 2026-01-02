"use client";

import { Icon } from "@/components/ui/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TrainingResultBadgeProps {
  count: number;
  iconName: "CheckedCircleFillIcon" | "ExclamationmarkTriangleFillIcon";
  iconSize?: string;
  color: "green" | "orange";
  label: string;
  onClick?: () => void;
}

function TrainingResultBadge({
  count,
  iconName,
  iconSize = "size-5",
  color,
  label,
  onClick,
}: TrainingResultBadgeProps) {
  const colorClasses = {
    green: "text-green-500",
    orange: "text-orange-500",
  };

  return (
    <div
      className={cn(
        colorClasses[color],
        "min-w-[18px] text-center flex items-center",
        onClick ? "cursor-pointer hover:opacity-80" : "cursor-default"
      )}
      onClick={onClick}
    >
      <Icon name={iconName} className={iconSize} />
      <span className='text-[14px] font-medium -ml-[1px]'>{count}</span>
    </div>
  );
}

interface TrainingResultBadgesProps {
  completedCount: number;
  failedCount: number;
  onCompletedClick?: () => void;
  onFailedClick?: () => void;
  disableTooltips?: boolean;
}

export function TrainingResultBadges({
  completedCount,
  failedCount,
  onCompletedClick,
  onFailedClick,
  disableTooltips = false,
}: TrainingResultBadgesProps) {
  const completedBadge = (
    <TrainingResultBadge
      count={completedCount}
      iconName='CheckedCircleFillIcon'
      iconSize='size-5'
      color='green'
      label='Completed'
      onClick={onCompletedClick}
    />
  );

  const failedBadge = (
    <TrainingResultBadge
      count={failedCount}
      iconName='ExclamationmarkTriangleFillIcon'
      iconSize='size-5'
      color='orange'
      label='Failed'
      onClick={onFailedClick}
    />
  );

  const renderBadgeWithTooltip = (badge: React.ReactNode, label: string) => {
    if (disableTooltips) return badge;

    return (
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent className='shadow-[0_0_0_1px_rgba(255,255,255,0.05)]'>
          {label}
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <div className={cn("flex items-center gap-0.5")}>
      {completedCount > 0 &&
        renderBadgeWithTooltip(completedBadge, "Completed")}
      {failedCount > 0 && renderBadgeWithTooltip(failedBadge, "Failed")}
    </div>
  );
}
