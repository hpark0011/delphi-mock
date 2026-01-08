import React from "react";
import { ProfileBackgroundWrapper } from "./_components/profile-background-wrapper";
import { ProfileView } from "@/app/profile/_view/profile-view";
import { mockProfile, mockOrganizations } from "./_lib/mock-profile-data";

export default function ProfilePage() {
  return (
    <ProfileBackgroundWrapper>
      <ProfileView
        profile={mockProfile}
        organizations={mockOrganizations}
        slug='hyunsol'
        canVoiceCall={true}
      />
    </ProfileBackgroundWrapper>
  );
}
