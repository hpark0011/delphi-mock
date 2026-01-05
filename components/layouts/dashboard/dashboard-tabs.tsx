"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

interface TabItem {
  value: string;
  label: string;
  href: string;
}

interface DashboardTabsProps {
  items: TabItem[];
}

export function DashboardTabs({ items }: DashboardTabsProps) {
  const pathname = usePathname();
  const currentTab = pathname.split("/").pop() || "";

  return (
    <nav className='flex-row items-center gap-0.5 p-1 bg-extra-light box-content h-fit rounded-full mx-0.5 inline-flex'>
      {items.map((item) => (
        <Link
          key={item.value}
          href={item.href}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm transition-all",
            currentTab !== item.value &&
              "hover:bg-[#EBEBE9] dark:hover:bg-[#262626]",
            currentTab === item.value &&
              "bg-white shadow-card-primary dark:bg-[#262626]"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
