"use client";

import { AddToMindButton } from "@/features/mind-widget";

interface SidebarAddButtonProps {
  onClick: () => void;
}

export function SidebarAddButton({ onClick }: SidebarAddButtonProps) {
  return (
    <AddToMindButton
      onClick={onClick}
      variant="rounded"
      className="sidebar-add-button"
    />
  );
}
