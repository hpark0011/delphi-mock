"use client";

import * as React from "react";

interface DashboardMainProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardMain({ children, className }: DashboardMainProps) {
  return <div className={className}>{children}</div>;
}
