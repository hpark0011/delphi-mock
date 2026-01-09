import React from "react";
import { ProfileViewV2 } from "@/app/profile-v2/_view/profile-view-v2";
import { ProfileBackgroundWrapper } from "@/app/profile/_components/profile-background-wrapper";
import {
  mockProfile,
  mockOrganizations,
} from "@/app/profile/_lib/mock-profile-data";

export default function ProfilePage() {
  return (
    <ProfileBackgroundWrapper>
      <ProfileViewV2
        profile={mockProfile}
        organizations={mockOrganizations}
        slug='hyunsol'
        canVoiceCall={true}
      />
    </ProfileBackgroundWrapper>
  );
}
