"use client";

import * as React from "react";

interface DashboardHeaderProps {
  children: React.ReactNode;
}

export function DashboardHeader({ children }: DashboardHeaderProps) {
  return <div className='flex flex-col w-full'>{children}</div>;
}

interface DashboardHeaderRowProps {
  children: React.ReactNode;
}

export function DashboardHeaderRow({ children }: DashboardHeaderRowProps) {
  return (
    <div className='flex items-center justify-between mb-6 px-3'>
      {children}
    </div>
  );
}
