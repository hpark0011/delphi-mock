"use client";

import { useMindDialog } from "@/features/mind-dialog";
import { useMindScore } from "@/features/mind-score";
import {
  MindWidgetWithAdd,
  useScrollAwareTrainingVisibility,
} from "@/features/mind-widget";

import { useScrollDirection } from "@/app/profile/_hooks";
import { ProfileHeaderActions } from "@/app/profile/_components/profile-header-actions";
import { ProfileNavLogo } from "@/app/profile/_components/profile-nav-logo";

export function ProfileHeaderV2() {
  const { open: openMindDialog } = useMindDialog();
  const { current } = useMindScore();
  const isScrollingDown = useScrollDirection();

  // Control training visibility based on scroll direction
  useScrollAwareTrainingVisibility(isScrollingDown);

  const handleAddClick = () => {
    openMindDialog({ tab: "add-knowledge" });
  };

  return (
    <header className='sticky top-0 z-50 w-full select-none pb-1 bg-gradient-to-b from-profile-bg to-transparent'>
      <nav className='pointer-events-none grid grid-cols-3 items-start px-4 lg:px-6 py-4 [&>*]:pointer-events-auto'>
        {/* Left column - Navigation logo */}
        <ProfileNavLogo />

        {/* Center column - MindWidget */}
        <div className='flex flex-col items-center justify-start overflow-visible'>
          <div className='relative z-10'>
            <MindWidgetWithAdd score={current} variant='compact-vertical' />
          </div>
        </div>

        {/* Right column - Desktop add button + avatar */}
        <ProfileHeaderActions
          showAddButton={false}
          onAddClick={handleAddClick}
          profileLink="/profile"
        />
      </nav>
    </header>
  );
}
