"use client";

import { Dashboard } from "@/components/layouts/dashboard";

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { value: "engagement", label: "Engagement", href: "/analytics/engagement" },
    { value: "audience", label: "Audience", href: "/analytics/audience" },
    { value: "highlights", label: "Highlights", href: "/analytics/highlights" },
    { value: "broadcasts", label: "Broadcasts", href: "/analytics/broadcasts" },
  ];

  return (
    <Dashboard>
      <Dashboard.Sidebar />
      <Dashboard.Content className='py-8'>
        <Dashboard.Header>
          <Dashboard.BackButton href='/studio'>Main</Dashboard.BackButton>
          <Dashboard.HeaderRow>
            <Dashboard.Title>Analytics</Dashboard.Title>
            <Dashboard.DatePicker />
          </Dashboard.HeaderRow>
        </Dashboard.Header>
        <Dashboard.Tabs items={navItems} />
        <Dashboard.Main className='mt-4'>{children}</Dashboard.Main>
      </Dashboard.Content>
    </Dashboard>
  );
}
