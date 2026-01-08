"use client";

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

// Navigation items configuration
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

  const handleProfileClick = () => {
    if (hasNewTraining) {
      markAsReviewed();
    }
  };

  return (
    <>
      <SidebarNavLink
        icon={navItems[0].icon}
        href={navItems[0].href}
        isActive={isActive(navItems[0].href)}
        label={navItems[0].label}
      />
      <SidebarNavLink
        icon={navItems[1].icon}
        href={navItems[1].href}
        isActive={isActive(navItems[1].href)}
        label={navItems[1].label}
      />
      <SidebarAddButton onClick={onAddClick} />
      <SidebarNavLink
        icon={navItems[2].icon}
        href={navItems[2].href}
        isActive={isActive(navItems[2].href)}
        label={navItems[2].label}
        showNotification={hasNewTraining}
      />
      <SidebarNavLink
        icon={navItems[3].icon}
        href={navItems[3].href}
        isActive={isActive(navItems[3].href)}
        label={navItems[3].label}
        onClick={handleProfileClick}
      />
    </>
  );
}
