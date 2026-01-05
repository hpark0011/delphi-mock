"use client";

import * as React from "react";

interface DashboardContextValue {
  fullWidth: boolean;
  setFullWidth: (value: boolean) => void;
}

const DashboardContext = React.createContext<DashboardContextValue | null>(
  null
);

export function useDashboard() {
  const context = React.useContext(DashboardContext);
  if (!context) {
    throw new Error("Dashboard components must be used within <Dashboard>");
  }
  return context;
}

interface DashboardRootProps {
  children: React.ReactNode;
}

export function DashboardRoot({ children }: DashboardRootProps) {
  const [fullWidth, setFullWidth] = React.useState(false);

  return (
    <DashboardContext.Provider value={{ fullWidth, setFullWidth }}>
      <div className='min-h-screen w-full'>{children}</div>
    </DashboardContext.Provider>
  );
}
