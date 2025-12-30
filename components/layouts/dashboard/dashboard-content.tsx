"use client";

import { DashboardMainWrapper } from "@/components/analytics/dashboard-ui";
import { SidebarInset } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import * as React from "react";

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
    <SidebarInset
      className={cn(
        "flex-1 overflow-auto md:peer-data-[variant=inset]:shadow-none border-light border dark:border-white/2",
        className
      )}
    >
      <DashboardMainWrapper
        className={fullWidth ? "px-0" : "px-8 w-full max-w-[1136px] mx-auto"}
      >
        {children}
      </DashboardMainWrapper>
    </SidebarInset>
  );
}
