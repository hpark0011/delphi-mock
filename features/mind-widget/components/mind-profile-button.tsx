"use client";

import { Button } from "@/components/ui/button";
import { ProfileSolidIcon } from "@/delphi-ui/icons";
import { useTrainingState } from "@/hooks/use-training-state";

interface MindProfileButtonProps {
  onClick: () => void;
}

export function MindProfileButton({ onClick }: MindProfileButtonProps) {
  const { status } = useTrainingState();
  const hasNewTraining = status === "finished";

  return (
    <Button
      size='sm'
      className='h-8 relative gap-1 has-[>svg]:pl-1 pl-1 rounded-full cursor-pointer'
      variant='glossy'
      onClick={onClick}
    >
      <span className='relative'>
        <ProfileSolidIcon className='size-6' />
        {hasNewTraining && (
          <span className='absolute top-[1px] right-[1px] w-[8px] h-[8px] bg-red-600/80 rounded-full' />
        )}
      </span>
      <span className='text-[15px] font-medium'>Profile</span>
    </Button>
  );
}
