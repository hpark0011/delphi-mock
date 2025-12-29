import { cn } from "@/lib/utils";
import React from "react";

interface MindWidgetWrapperProps {
  children: React.ReactNode;
  className?: string;
}

function MindWidgetWrapper({ children, className }: MindWidgetWrapperProps) {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
}

export function MindWidget() {
  return (
    <MindWidgetWrapper>
      <div>mind-widget</div>
    </MindWidgetWrapper>
  );
}
