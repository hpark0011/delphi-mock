"use client";

import { useRouter } from "next/navigation";

import { DelphiCurrentIcon } from "@/delphi-ui/icons/DelphiCurrent";

interface ProfileNavLogoProps {
  href?: string;
}

export function ProfileNavLogo({ href = "/studio" }: ProfileNavLogoProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className="flex items-center pr-2 pl-2 transition-colors text-sand-12/50 hover:text-sand-12 cursor-pointer size-10"
    >
      <DelphiCurrentIcon className="h-3.5 text-icon-dark hover:text-sand-12" />
    </button>
  );
}
