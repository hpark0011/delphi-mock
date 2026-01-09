import { ProfileHeaderV2 } from "@/app/profile-v2/_components/profile-header-v2";
import { ProfileBio } from "../_components/profile-bio";
import { ProfileChatInput } from "../_components/profile-chat-input";
import { ProfileFooter } from "../_components/profile-footer";
import { ProfileHeadline } from "../_components/profile-headline";
import { ProfileImage } from "../_components/profile-image";
import { ProfileName } from "../_components/profile-name";
import { ProfileQuestions } from "../_components/profile-questions";
import { ProfileSocials } from "../_components/profile-socials";

import type { Organization, Profile } from "@/app/profile/_lib/types";

interface ProfileViewProps {
  profile: Profile;
  organizations: Organization[];
  slug: string;
  canVoiceCall: boolean;
}

export function ProfileView({
  profile,
  organizations,
  slug,
  canVoiceCall,
}: ProfileViewProps) {
  return (
    <div className='min-h-screen flex flex-col bg-[var(--profile-bg)]'>
      <ProfileHeaderV2 />
      <div className='tracking-[-0.015em] p-6 pt-8 pb-32 flex-1'>
        <div className='mx-auto max-w-2xl'>
          <ProfileImage imageUrl={profile.imageUrl} alt={`${slug} profile`} />
          <ProfileName name={profile.name} />
          <ProfileHeadline
            headline={profile.headline}
            organizations={organizations}
          />
          <ProfileBio bio={profile.bio} />
          <ProfileQuestions questions={profile.questions} slug={slug} />
          <ProfileSocials socials={profile.socials} name={profile.name} />
          <ProfileFooter name={profile.name} />
        </div>
        <div className='flex flex-col items-center justify-center '>
          <ProfileChatInput
            slug={slug}
            questions={profile.questions}
            name={profile.name}
            canVoiceCall={canVoiceCall}
          />
        </div>
      </div>
    </div>
  );
}
