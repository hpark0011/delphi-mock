"use client";

import { AddToMindButton } from "@/features/mind-widget";

import { ProfileAvatarMenu } from "./profile-avatar-menu";

interface ProfileHeaderActionsProps {
  showAddButton: boolean;
  onAddClick: () => void;
  profileLink: string;
}

export function ProfileHeaderActions({
  showAddButton,
  onAddClick,
  profileLink,
}: ProfileHeaderActionsProps) {
  return (
    <div className="flex justify-end items-center gap-2">
      {showAddButton && (
        <AddToMindButton variant="circular" onClick={onAddClick} />
      )}
      <ProfileAvatarMenu href={profileLink} />
    </div>
  );
}
