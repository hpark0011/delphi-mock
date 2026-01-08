"use client";

import { AddToMindButton } from "@/features/mind-widget";

import { ProfileAvatarMenu } from "./profile-avatar-menu";

interface ProfileHeaderActionsProps {
  showAddButton: boolean;
  onAddClick: () => void;
}

export function ProfileHeaderActions({
  showAddButton,
  onAddClick,
}: ProfileHeaderActionsProps) {
  return (
    <div className="flex justify-end items-center gap-2">
      {showAddButton && (
        <AddToMindButton variant="circular" onClick={onAddClick} />
      )}
      <ProfileAvatarMenu />
    </div>
  );
}
