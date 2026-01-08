"use client";

import { useRouter } from "next/navigation";

import { DelphiCurrentIcon } from "@/delphi-ui/icons/DelphiCurrent";
import { useMindDialog } from "@/features/mind-dialog";
import { useMindScore } from "@/features/mind-score";
import { AddToMindButton, MindWidgetSmall } from "@/features/mind-widget";
import { cn } from "@/lib/utils";

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
      <nav className='pointer-events-none grid grid-cols-[1fr_auto_1fr] items-start lg:items-center px-4 lg:px-6 py-4 [&>*]:pointer-events-auto'>
        <button
          onClick={() => router.push("/studio")}
          className='flex items-center pr-2 pl-2 transition-colors text-sand-12/50 hover:text-sand-12 cursor-pointer size-10'
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

          {/* Mobile-only add button - visible by default, hides on scroll down */}
          {isMobile && (
            <div
              className={cn(
                "transition-all duration-300",
                !isScrollingDown
                  ? "opacity-100 translate-y-0 mt-1 max-h-12"
                  : "opacity-0 -translate-y-2 mt-0 max-h-0"
              )}
              style={{
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
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
