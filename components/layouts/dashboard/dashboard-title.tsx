"use client";

import * as React from "react";

interface DashboardTitleProps {
  children: React.ReactNode;
}

export function DashboardTitle({ children }: DashboardTitleProps) {
  return <h1 className='text-2xl'>{children}</h1>;
}
