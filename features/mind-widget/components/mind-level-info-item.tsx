import React from "react";
import { getLevelShadowColors } from "../utils/level-shadows";

interface MindLevelInfoItemProps {
  levelName: string;
  min: number;
  nextThreshold?: number;
}

export function MindLevelInfoItem({
  levelName,
  min,
  nextThreshold,
}: MindLevelInfoItemProps) {
  const levelColors = getLevelShadowColors(levelName);
  const thresholdText = nextThreshold
    ? `${min.toLocaleString()} - ${(nextThreshold - 1).toLocaleString()}`
    : `${min.toLocaleString()}+`;

  return (
    <div className='flex items-center gap-2 p-2.5 rounded-lg'>
      {/* Color indicator */}
      <div
        className='w-2.5 h-2.5 rounded-full shrink-0'
        style={{
          backgroundColor: levelColors.dark,
        }}
      />

      {/* Level name */}
      <span className='font-medium flex-1' style={{ color: levelColors.dark }}>
        {levelName}
      </span>

      {/* Threshold */}
      <span className='text-[15px] text-sand-11 tabular-nums'>
        {thresholdText}
      </span>
    </div>
  );
}
