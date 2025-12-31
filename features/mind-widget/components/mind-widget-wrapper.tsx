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
