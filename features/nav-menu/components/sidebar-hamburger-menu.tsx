"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bars2Icon,
  ExitIcon,
  SettingsIcon,
  SupportIcon,
} from "@/delphi-ui/icons";
import Link from "next/link";

export function SidebarHamburgerMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className='flex items-center justify-center rounded-lg p-2.5 text-muted-foreground transition-colors hover:text-foreground'
          aria-label='Menu'
        >
          <Bars2Icon className='size-6' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' side='top' sideOffset={8}>
        <DropdownMenuItem asChild>
          <Link href='#' className='flex items-center gap-2'>
            <SettingsIcon className='size-4' />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='#' className='flex items-center gap-2'>
            <SupportIcon className='size-4' />
            Support
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild variant='destructive'>
          <Link href='#' className='flex items-center gap-2'>
            <ExitIcon className='size-4' />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
