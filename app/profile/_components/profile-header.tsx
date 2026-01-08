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
          <div className='relative z-10'>
            <MindWidgetSmall
              score={current}
              level={level}
              progress={levelProgress}
              variant='profile'
            />
          </div>

          {/* Mobile-only add button - visible by default, hides on scroll down */}
          {isMobile && (
            <div
              className={cn(
                "transition-all mt-1",
                !isScrollingDown
                  ? "opacity-100 translate-y-0 max-h-12 scale-100"
                  : "opacity-0 -translate-y-10 max-h-0 scale-75"
              )}
              style={{
                transitionDuration: !isScrollingDown ? "600ms" : "300ms",
                transitionTimingFunction: !isScrollingDown
                  ? "linear(0, 0.0694, 0.237, 0.4486, 0.6622, 0.8494, 0.9944, 1.0924, 1.146, 1.163, 1.1531, 1.1266, 1.0924, 1.0574, 1.0265, 1.0023, 0.9858, 0.9766, 0.9735, 0.9748, 0.979, 0.9845, 0.9903, 0.9954, 0.9994, 1.0022, 1.0037, 1, 1.0041, 1.0035, 1.0026, 1.0017, 1.0008, 1.0001, 0.9997, 1, 1)"
                  : "ease-out",
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
