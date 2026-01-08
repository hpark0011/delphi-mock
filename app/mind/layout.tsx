"use client";

import { Dashboard } from "@/components/layouts/dashboard";

export default function MindLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dashboard>
      <Dashboard.Sidebar />
      <Dashboard.Content fullWidth>
        <Dashboard.Main>{children}</Dashboard.Main>
      </Dashboard.Content>
    </Dashboard>
  );
}
