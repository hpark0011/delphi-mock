import { MindIcon } from "@/delphi-ui/icons";
import { cn } from "@/lib/utils";
import React from "react";
import "./styles/mind-widget.styles.css";
import {
  getLevelShadowColors,
  type LevelColors,
} from "@/app/onboarding/_utils/widget-config";

interface MindWidgetWrapperProps {
  children: React.ReactNode;
  className?: string;
}

function MindWidgetWrapper({ children, className }: MindWidgetWrapperProps) {
  return (
    <div
      className={cn(
        // Layout
        "flex flex-col h-fit",
        // Background
        "bg-sand-1",
        // Shape
        "mind-widget-bubble",
        className
      )}
    >
      {children}
    </div>
  );
}

MindWidgetWrapper.displayName = "MindWidgetWrapper";

interface MindWidgetBubbleProps {
  children: React.ReactNode;
  className?: string;
  level: string;
}

function MindWidgetBubble({
  children,
  className,
  level,
}: MindWidgetBubbleProps) {
  // Get level-based colors
  const levelColors = getLevelShadowColors(level);

  // Generate dynamic shadow based on level colors
  const levelShadow = [
    `0 3px 6px ${levelColors.light.replace("1)", "0.4)")}`,
    `0 8px 8px -4px ${levelColors.medium.replace("0.5)", "0.3)")}`,
    `0 16px 16px -8px ${levelColors.dark.replace("1)", "0.2)")}`,
    `0 24px 24px -12px ${levelColors.dark.replace("1)", "0.3)")}`,
  ].join(", ");

  return (
    <div
      className={cn(
        // Layout
        "flex flex-col relative",
        // Sizing
        "min-w-[52px] min-h-[40px]",
        // Padding
        "p-0.5",
        // Alignment
        "items-center justify-center",
        // Overflow
        "overflow-hidden",
        // Shape
        "mind-widget-bubble",
        className
      )}
      style={{
        backgroundColor: levelColors.dark,
        boxShadow: levelShadow,
      }}
    >
      {children}

      {/* Base gradient overlay */}
      <div
        className={cn(
          // Positioning
          "absolute top-0 right-0",
          // Sizing
          "w-full h-full"
        )}
        style={{
          background: `linear-gradient(to top, ${levelColors.dark}, ${levelColors.medium})`,
        }}
      />

      {/* Glass effect with border and inner shadows */}
      <div
        className={cn(
          // Positioning
          "absolute top-0 right-0",
          // Sizing
          "w-full h-full",
          // Shape
          "rounded-full mind-widget-bubble",
          // Border
          "border-[1px] border-sand-1",
          // Effects
          "blur-[2px]",
          // Shadow
          "shadow-[inset_0px_-1px_1px_1px_rgba(255,255,255,0.1),inset_0px_2px_2px_2px_rgba(255,255,255,0.1),inset_0px_4px_4px_2px_rgba(255,255,255,0.3)]"
        )}
      />

      {/* Level accent gradient overlay */}
      <div
        className={cn(
          // Positioning
          "absolute top-0 right-0",
          // Sizing
          "w-full h-full"
        )}
        style={{
          background: `linear-gradient(to top, ${levelColors.light.replace("1)", "0.4)")}, transparent)`,
        }}
      />
    </div>
  );
}

MindWidgetBubble.displayName = "MindWidgetBubble";

interface MindWidgetScoreProps {
  score: number;
  className?: string;
  fontSize?: string;
}

function MindWidgetScore({ score, fontSize }: MindWidgetScoreProps) {
  return (
    <div
      className={cn(
        "text-white text-lg font-semibold tracking-[-0.04em]",
        fontSize,
        "leading-[100%]"
      )}
    >
      {score}
    </div>
  );
}

MindWidgetScore.displayName = "MindWidgetScore";

interface MindWidgetLevelProps {
  level: string;
  className?: string;
}
function MindWidgetLevel({ level, className }: MindWidgetLevelProps) {
  return (
    <div className='w-full flex items-center justify-center pb-0.5'>
      <div className='text-white text-sm font-[480] text-center leading-[100%] tracking-tight'>
        {level}
      </div>
    </div>
  );
}

MindWidgetLevel.displayName = "MindWidgetLevel";

interface MindWidgetProps {
  score?: number;
  level?: string;
}

export function MindWidget({
  score = 231,
  level = "Skilled",
}: MindWidgetProps = {}) {
  return (
    <MindWidgetWrapper>
      <MindWidgetBubble className='min-w-[112px]' level={level}>
        <div className='relative z-10 flex flex-col h-full gap-1 justify-center items-center p-1.5'>
          <div className='flex items-center justify-center gap-0.5 -ml-[4px]'>
            <MindIcon className='size-5 text-white' />
            <MindWidgetScore score={score} fontSize='text-2xl' />
          </div>
          <MindWidgetLevel level={level} />
        </div>
      </MindWidgetBubble>
    </MindWidgetWrapper>
  );
}
