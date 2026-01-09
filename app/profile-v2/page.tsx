import React from "react";
import { ProfileView } from "@/app/profile/_view/profile-view";
import { ProfileBackgroundWrapper } from "@/app/profile/_components/profile-background-wrapper";
import {
  mockProfile,
  mockOrganizations,
} from "@/app/profile/_lib/mock-profile-data";

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
