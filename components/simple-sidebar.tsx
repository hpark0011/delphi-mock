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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { icon: HomeIcon, href: "/", label: "Home" },
  { icon: NotificationIcon, href: "/notifications", label: "Notifications" },
  { icon: PlusLargeIcon, href: "#", label: "Add Content", isAddButton: true },
  { icon: MindIcon, href: "/mind", label: "Mind" },
  { icon: ProfileIcon, href: "/profile", label: "Profile" },
];

function NavButton({
  icon: Icon,
  href,
  isActive,
  label,
  isAddButton,
  onAddClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  isActive: boolean;
  label: string;
  isAddButton?: boolean;
  onAddClick?: () => void;
}) {
  const buttonClasses = cn(
    "flex items-center justify-center rounded-lg p-2.5 transition-colors",
    isAddButton
      ? "bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-200 dark:hover:bg-neutral-300"
      : isActive
        ? "text-foreground"
        : "text-muted-foreground hover:text-foreground"
  );

  const iconClasses = cn("size-6", isAddButton && "text-white dark:text-black");

  if (isAddButton) {
    return (
      <button onClick={onAddClick} className={buttonClasses} aria-label={label}>
        <Icon className={iconClasses} />
      </button>
    );
  }

  return (
    <Link href={href} className={buttonClasses} aria-label={label}>
      <Icon className={iconClasses} />
    </Link>
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

function AddContentSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side='bottom' className='h-[50vh] rounded-t-xl lg:hidden'>
        <SheetHeader>
          <SheetTitle>Create New Content</SheetTitle>
          <SheetDescription>
            Choose what type of content you want to create.
          </SheetDescription>
        </SheetHeader>
        <div className='p-4'>
          <p className='text-muted-foreground text-sm'>
            Content creation options will appear here.
          </p>
        </div>
      </SheetContent>
      <SheetContent side='right' className='hidden lg:flex'>
        <SheetHeader>
          <SheetTitle>Create New Content</SheetTitle>
          <SheetDescription>
            Choose what type of content you want to create.
          </SheetDescription>
        </SheetHeader>
        <div className='p-4'>
          <p className='text-muted-foreground text-sm'>
            Content creation options will appear here.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SimpleSidebar() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname.startsWith("/analytics");
    }
    return pathname === href || pathname.startsWith(href);
  };

  const handleAddClick = () => {
    setSheetOpen(true);
  };

  return (
    <>
      {/* Add Content Sheet */}
      <AddContentSheet open={sheetOpen} onOpenChange={setSheetOpen} />

      {/* Desktop Sidebar */}
      <aside className='bg-background fixed left-0 top-0 z-40 hidden h-screen w-[68px] flex-col border-r lg:flex'>
        {/* Logo */}
        <div className='flex h-16 items-center justify-center'>
          <Link href='/' aria-label='Home'>
            <DelphiLogo className='text-foreground' />
          </Link>
        </div>

        {/* Navigation - Vertically Centered */}
        <nav className='flex flex-1 flex-col items-center justify-center gap-1'>
          {navItems.map((item) => (
            <NavButton
              key={item.label}
              icon={item.icon}
              href={item.href}
              isActive={!item.isAddButton && isActive(item.href)}
              label={item.label}
              isAddButton={item.isAddButton}
              onAddClick={item.isAddButton ? handleAddClick : undefined}
            />
          ))}
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
        {navItems.map((item) => (
          <NavButton
            key={item.label}
            icon={item.icon}
            href={item.href}
            isActive={!item.isAddButton && isActive(item.href)}
            label={item.label}
            isAddButton={item.isAddButton}
            onAddClick={item.isAddButton ? handleAddClick : undefined}
          />
        ))}
      </nav>
    </>
  );
}
