"use client";

import { Dashboard } from "@/components/layouts/dashboard";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dashboard>
      <Dashboard.Sidebar />
      <Dashboard.Content>
        <Dashboard.Main>{children}</Dashboard.Main>
      </Dashboard.Content>
    </Dashboard>
  );
}
