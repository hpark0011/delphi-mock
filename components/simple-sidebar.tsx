"use client";

import { DelphiLogo } from "@/components/delphi-logo";
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
  HomeIcon,
  MindIcon,
  NotificationIcon,
  PlusLargeIcon,
  ProfileIcon,
  SettingsIcon,
  SupportIcon,
} from "@/delphi-ui/icons";
import { useMindDialog } from "@/features/mind-dialog";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Navigation items - these are actual route links
const navItems = [
  { icon: HomeIcon, href: "/studio", label: "Home" },
  { icon: NotificationIcon, href: "/notifications", label: "Notifications" },
  { icon: MindIcon, href: "/mind", label: "Mind" },
  { icon: ProfileIcon, href: "/profile", label: "Profile" },
];

function NavLink({
  icon: Icon,
  href,
  isActive,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  isActive: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-center rounded-lg p-2.5 transition-colors",
        isActive
          ? "text-foreground bg-neutral-100 dark:bg-neutral-800"
          : "text-muted-foreground hover:text-foreground"
      )}
      aria-label={label}
    >
      <Icon className='size-6' />
    </Link>
  );
}

function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className='flex items-center justify-center rounded-lg p-2.5 transition-colors bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-200 dark:hover:bg-neutral-300'
      aria-label='Add Content'
    >
      <PlusLargeIcon className='size-6 text-white dark:text-black' />
    </button>
  );
}

function HamburgerMenu() {
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

// Shared navigation component used by both desktop and mobile layouts
function NavItems({
  isActive,
  onAddClick,
}: {
  isActive: (href: string) => boolean;
  onAddClick: () => void;
}) {
  return (
    <>
      <NavLink
        icon={navItems[0].icon}
        href={navItems[0].href}
        isActive={isActive(navItems[0].href)}
        label={navItems[0].label}
      />
      <NavLink
        icon={navItems[1].icon}
        href={navItems[1].href}
        isActive={isActive(navItems[1].href)}
        label={navItems[1].label}
      />
      <AddButton onClick={onAddClick} />
      <NavLink
        icon={navItems[2].icon}
        href={navItems[2].href}
        isActive={isActive(navItems[2].href)}
        label={navItems[2].label}
      />
      <NavLink
        icon={navItems[3].icon}
        href={navItems[3].href}
        isActive={isActive(navItems[3].href)}
        label={navItems[3].label}
      />
    </>
  );
}

export function SimpleSidebar() {
  const pathname = usePathname();
  const { open: openMindDialog } = useMindDialog();

  // Home is active for root and analytics routes (analytics is the main dashboard view)
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname.startsWith("/analytics");
    }
    return pathname === href || pathname.startsWith(href);
  };

  const handleAddClick = () => {
    openMindDialog({ tab: "add-knowledge" });
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className='bg-background fixed left-0 top-0 z-40 hidden h-screen w-[68px] flex-col lg:flex'>
        {/* Logo */}
        <div className='flex h-16 items-center justify-center'>
          <Link href='/' aria-label='Home'>
            <DelphiLogo className='text-foreground size-6' />
          </Link>
        </div>

        {/* Navigation - Vertically Centered */}
        <nav className='flex flex-1 flex-col items-center justify-center gap-1'>
          <NavItems isActive={isActive} onAddClick={handleAddClick} />
        </nav>

        {/* Hamburger Menu */}
        <div className='flex h-16 items-center justify-center'>
          <HamburgerMenu />
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b px-4 backdrop-blur lg:hidden'>
        <Link href='/' aria-label='Home'>
          <DelphiLogo className='text-foreground' />
        </Link>
        <HamburgerMenu />
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className='bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed bottom-0 left-0 right-0 z-40 flex h-14 items-center justify-around border-t backdrop-blur lg:hidden'>
        <NavItems isActive={isActive} onAddClick={handleAddClick} />
      </nav>
    </>
  );
}
