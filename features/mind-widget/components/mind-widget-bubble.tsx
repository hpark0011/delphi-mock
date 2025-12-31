import { getLevelShadowColors } from "@/app/onboarding/_utils/widget-config";
import { cn } from "@/lib/utils";
import React from "react";

interface MindWidgetBubbleProps {
  children: React.ReactNode;
  className?: string;
  level: string;
}

export function MindWidgetBubble({
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
