import { LockIcon } from "@/delphi-ui/icons/Lock";

export function OnboardingPrivacyStatement() {
  return (
    <div className='flex items-center gap-1.5 text-text-muted text-sm mt-2'>
      <LockIcon className='size-4' />
      <span className='text-sm'>Your Delphi is private until you share</span>
    </div>
  );
}
