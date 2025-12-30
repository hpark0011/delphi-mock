"use client";

import { DashboardBackButton } from "./dashboard-back-button";
import { DashboardContent } from "./dashboard-content";
import { DashboardDatePicker } from "./dashboard-date-picker";
import { DashboardHeader, DashboardHeaderRow } from "./dashboard-header";
import { DashboardMain } from "./dashboard-main";
import { DashboardRoot } from "./dashboard-root";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTabs } from "./dashboard-tabs";
import { DashboardTitle } from "./dashboard-title";

export const Dashboard = Object.assign(DashboardRoot, {
  Sidebar: DashboardSidebar,
  Content: DashboardContent,
  Header: DashboardHeader,
  HeaderRow: DashboardHeaderRow,
  BackButton: DashboardBackButton,
  Title: DashboardTitle,
  DatePicker: DashboardDatePicker,
  Tabs: DashboardTabs,
  Main: DashboardMain,
});

export { useDashboard } from "./dashboard-root";
