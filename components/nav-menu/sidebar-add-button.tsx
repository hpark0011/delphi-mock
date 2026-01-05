"use client";

import { PlusLargeIcon } from "@/delphi-ui/icons";

interface SidebarAddButtonProps {
  onClick: () => void;
}

export function SidebarAddButton({ onClick }: SidebarAddButtonProps) {
  return (
    <button
      onClick={onClick}
      className='flex items-center justify-center rounded-lg p-2.5 transition-colors bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-200 dark:hover:bg-neutral-300'
      aria-label='Add Content'
    >
      <PlusLargeIcon className='size-6 text-white dark:text-black' />
    </button>
  );
}
