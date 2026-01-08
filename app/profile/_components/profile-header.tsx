"use client";

import { useMindDialog } from "@/features/mind-dialog";
import { useMindScore } from "@/features/mind-score";
import { MindWidgetSmallVertical } from "@/features/mind-widget";

import { useScrollDirection } from "../_hooks";
import { ProfileHeaderActions } from "./profile-header-actions";
import { ProfileNavLogo } from "./profile-nav-logo";

export function ProfileHeader() {
  const { open: openMindDialog } = useMindDialog();
  const { current, level, levelProgress } = useMindScore();
  const isScrollingDown = useScrollDirection();

  const handleAddClick = () => {
    openMindDialog({ tab: "add-knowledge" });
  };

  return (
    <header className='sticky top-0 z-50 w-full select-none pb-1 bg-gradient-to-b from-profile-bg to-transparent'>
      <nav className='pointer-events-none grid grid-cols-[1fr_auto_1fr] items-start px-4 lg:px-6 py-4 [&>*]:pointer-events-auto'>
        {/* Left column - Navigation logo */}
        <ProfileNavLogo />

        {/* Center column - MindWidget */}
        <div className='flex flex-col items-center'>
          <div className='relative z-10'>
            <MindWidgetSmallVertical
              score={current}
              level={level}
              progress={levelProgress}
              isScrollingDown={isScrollingDown}
            />
          </div>
        </div>

        {/* Right column - Desktop add button + avatar */}
        <ProfileHeaderActions
          showAddButton={true}
          onAddClick={handleAddClick}
        />
      </nav>
    </header>
  );
}
