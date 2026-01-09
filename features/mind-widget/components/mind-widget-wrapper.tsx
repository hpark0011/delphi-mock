import { cn } from "@/lib/utils";
import React from "react";

interface MindWidgetWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function MindWidgetWrapper({
  children,
  className,
}: MindWidgetWrapperProps) {
  return (
    <div
      className={cn(
        // Layout
        "flex flex-col items-center h-fit gap-0.5 min-w-[160px] p-4 pt-0 pb-3 ",
        // Background
        "bg-transparent",
        // Shape
        "mind-widget-bubble",
        className
      )}
    >
      {children}
    </div>
  );
}
