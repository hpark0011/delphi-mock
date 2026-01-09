import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { mockProfile } from "../_lib/mock-profile-data";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

interface ProfileAvatarMenuProps {
  href: string;
}

export function ProfileAvatarMenu({ href }: ProfileAvatarMenuProps) {
  const { name } = mockProfile;
  const initials = getInitials(name);

  return (
    <Link
      href={href}
      className='cursor-pointer rounded-full transition-opacity hover:opacity-80 focus:outline-none'
    >
      <Avatar className='size-10'>
        <AvatarFallback className='bg-[#C25D3B] text-white font-medium'>
          {initials}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}
