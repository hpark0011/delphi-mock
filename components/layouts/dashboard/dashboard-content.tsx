"use client";

import { DashboardMainWrapper } from "@/components/analytics/dashboard-ui";
import { cn } from "@/lib/utils";

interface DashboardContentProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export function DashboardContent({
  children,
  fullWidth = false,
  className,
}: DashboardContentProps) {
  return (
    <main
      className={cn(
        "min-h-screen overflow-auto",
        // Sidebar spacing: desktop left padding, mobile top/bottom padding
        "pt-14 pb-14 lg:pt-0 lg:pb-0",
        className
      )}
    >
      <DashboardMainWrapper
        className={fullWidth ? "px-0" : "px-8 w-full max-w-[1136px] mx-auto"}
      >
        {children}
      </DashboardMainWrapper>
    </main>
  );
}
