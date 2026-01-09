"use client";

import { Fragment } from "react";
import {
  HomeIcon,
  MindIcon,
  NotificationIcon,
  ProfileIcon,
} from "@/delphi-ui/icons";
import { useTrainingQueue } from "@/features/mind-dialog";
import { useTrainingState } from "@/hooks/use-training-state";
import { SidebarAddButton } from "./sidebar-add-button";
import { SidebarNavLink } from "./sidebar-nav-link";

const navItems = [
  { icon: HomeIcon, href: "/studio", label: "Home" },
  { icon: NotificationIcon, href: "/notifications", label: "Notifications" },
  { icon: MindIcon, href: "/mind", label: "Mind" },
  { icon: ProfileIcon, href: "/profile", label: "Profile" },
] as const;

interface SidebarNavItemsProps {
  isActive: (href: string) => boolean;
  onAddClick: () => void;
}

export function SidebarNavItems({
  isActive,
  onAddClick,
}: SidebarNavItemsProps) {
  const { status } = useTrainingState();
  const { markAsReviewed } = useTrainingQueue();
  const hasNewTraining = status === "finished";

  const handleMindClick = () => {
    if (hasNewTraining) markAsReviewed();
  };

  return (
    <>
      {navItems.map((item, index) => (
        <Fragment key={item.href}>
          {index === 2 && <SidebarAddButton onClick={onAddClick} />}
          <SidebarNavLink
            icon={item.icon}
            href={item.href}
            isActive={isActive(item.href)}
            label={item.label}
            showNotification={item.href === "/mind" && hasNewTraining}
            onClick={
              item.href === "/mind" || item.href === "/profile"
                ? handleMindClick
                : undefined
            }
          />
        </Fragment>
      ))}
    </>
  );
}
