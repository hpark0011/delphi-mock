"use client";

import { Link } from "next-view-transitions";

import { useMindScore } from "@/features/mind-score";
import { Button } from "@/components/ui/button";
import { DelphiCurrentIcon } from "@/delphi-ui/icons/DelphiCurrent";
import { ProfileMindWidget } from "./mind-widget/profile-mind-widget";
import { MindWidgetSmallV2 } from "@/features/mind-widget";

interface ProfileHeaderProps {
  slug: string;
  customWarning?: string | null;
  name: string;
  headline: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ProfileHeader(_props: ProfileHeaderProps) {
  const { current, level } = useMindScore();
  return (
    <>
      <header className='pointer-events-none sticky top-0 z-50 w-full select-none pb-1 bg-gradient-to-b from-profile-bg to-transparent'>
        <nav className='pointer-events-none flex items-center justify-between px-6 py-6 [&>*]:pointer-events-auto relative'>
          <div className='flex items-center gap-3'>
            <Link
              href='/explore'
              className='flex items-center gap-3 group pr-2 pl-2 transition-colors  transform text-sand-12/50 hover:text-sand-12'
            >
              <DelphiCurrentIcon className='h-3.5 text-icon-dark' />
            </Link>
          </div>
          <div className='absolute top-[22px] left-1/2 -translate-x-1/2 w-full flex justify-center items-center'>
            <MindWidgetSmallV2 score={current} level={level} variant="profile" />
          </div>
          <div className='flex items-center gap-5'>
            <Button
              variant='secondary'
              size='sm'
              className='transition-colors  bg-[#ECE6E3] rounded-full text-text-muted shadow-none h-10 text-[16px]'
            >
              <span className='text-[16px] font-medium'>Share</span>
            </Button>
          </div>
        </nav>
      </header>
    </>
  );
}
