"use client";

import { useRouter } from "next/navigation";

import { DelphiCurrentIcon } from "@/delphi-ui/icons/DelphiCurrent";
import { useMindScore } from "@/features/mind-score";
import { MindWidgetSmall } from "@/features/mind-widget";

import { ProfileAvatarMenu } from "./profile-avatar-menu";

export function ProfileHeader() {
  const router = useRouter();
  const { current, level, progressToNextLevel } = useMindScore();

  return (
    <header className='sticky top-0 z-50 w-full select-none pb-1 bg-gradient-to-b from-profile-bg to-transparent'>
      <nav className='pointer-events-none grid grid-cols-[1fr_auto_1fr] items-center px-6 py-4 [&>*]:pointer-events-auto'>
        <button
          onClick={() => router.push("/studio")}
          className='flex items-center pr-2 pl-2 transition-colors text-sand-12/50 hover:text-sand-12 cursor-pointer'
        >
          <DelphiCurrentIcon className='h-3.5 text-icon-dark hover:text-sand-12' />
        </button>
        <MindWidgetSmall
          score={current}
          level={level}
          progress={progressToNextLevel}
          variant='profile'
        />
        <div className='flex justify-end'>
          <ProfileAvatarMenu />
        </div>
      </nav>
    </header>
  );
}
