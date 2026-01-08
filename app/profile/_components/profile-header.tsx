"use client";

import { useRouter } from "next/navigation";

import { DelphiCurrentIcon } from "@/delphi-ui/icons/DelphiCurrent";
import { useMindDialog } from "@/features/mind-dialog";
import { useMindScore } from "@/features/mind-score";
import { AddToMindButton, MindWidgetSmall } from "@/features/mind-widget";

import { useMediaQuery, useScrollDirection } from "../_hooks";
import { ProfileAvatarMenu } from "./profile-avatar-menu";

export function ProfileHeader() {
  const router = useRouter();
  const { open: openMindDialog } = useMindDialog();
  const { current, level, levelProgress } = useMindScore();

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isScrollingDown = useScrollDirection();

  const handleAddClick = () => {
    openMindDialog({ tab: "add-knowledge" });
  };

  return (
    <header className='sticky top-0 z-50 w-full select-none pb-1 bg-gradient-to-b from-profile-bg to-transparent'>
      <nav className='pointer-events-none grid grid-cols-[1fr_auto_1fr] items-center px-4 lg:px-6 py-4 [&>*]:pointer-events-auto'>
        <button
          onClick={() => router.push("/studio")}
          className='flex items-center pr-2 pl-2 transition-colors text-sand-12/50 hover:text-sand-12 cursor-pointer'
        >
          <DelphiCurrentIcon className='h-3.5 text-icon-dark hover:text-sand-12' />
        </button>

        {/* Center column - MindWidget with mobile add button below */}
        <div className='flex flex-col items-center'>
          <MindWidgetSmall
            score={current}
            level={level}
            progress={levelProgress}
            variant='profile'
          />

          {/* Mobile-only add button - slides in/out based on scroll */}
          {isMobile && (
            <div
              className='overflow-hidden transition-all duration-300 ease-out'
              style={{
                maxHeight: isScrollingDown ? "48px" : "0px",
                opacity: isScrollingDown ? 1 : 0,
                marginTop: isScrollingDown ? "8px" : "0px",
                transform: isScrollingDown
                  ? "translateY(0)"
                  : "translateY(-8px)",
              }}
            >
              <AddToMindButton variant='circular' onClick={handleAddClick} />
            </div>
          )}
        </div>

        {/* Right column - Desktop: add button + avatar, Mobile: avatar only */}
        <div className='flex justify-end items-center gap-2'>
          {!isMobile && (
            <AddToMindButton variant='circular' onClick={handleAddClick} />
          )}
          <ProfileAvatarMenu />
        </div>
      </nav>
    </header>
  );
}
