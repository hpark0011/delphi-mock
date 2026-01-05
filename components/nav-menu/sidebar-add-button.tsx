"use client";

import { PlusLargeIcon } from "@/delphi-ui/icons";

interface SidebarAddButtonProps {
  onClick: () => void;
}

export function SidebarAddButton({ onClick }: SidebarAddButtonProps) {
  return (
    <button
      onClick={onClick}
      className={[
        // Custom identifier
        "sidebar-add-button",
        // Layout & alignment
        "flex items-center justify-center",
        // Shape
        "rounded-lg",
        // Sizing
        "p-2.5 py-2",
        // Background
        "bg-neutral-800 dark:bg-neutral-200",
        // Interactive states
        "transition-colors",
        "hover:bg-neutral-700 dark:hover:bg-neutral-300",
      ].join(" ")}
      aria-label='Add Content'
    >
      <PlusLargeIcon className='size-6 text-white dark:text-black' />
    </button>
  );
}
