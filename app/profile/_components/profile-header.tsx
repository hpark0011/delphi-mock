"use client";

import { useMindDialog } from "@/features/mind-dialog";
import { useMindScore } from "@/features/mind-score";
import { useScrollAwareTrainingVisibility } from "@/features/mind-widget";
import { MindWidgetSubtle } from "@/features/mind-widget/mind-widget-subtle";

import { useScrollDirection } from "../_hooks";
import { ProfileHeaderActions } from "./profile-header-actions";
import { ProfileNavLogo } from "./profile-nav-logo";

export function ProfileHeader() {
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
            <MindWidgetSubtle score={current} variant='compact-vertical' />
          </div>
        </div>

        {/* Right column - Desktop add button + avatar */}
        <ProfileHeaderActions
          showAddButton={true}
          onAddClick={handleAddClick}
          profileLink="/profile-v2"
        />
      </nav>
    </header>
  );
}
