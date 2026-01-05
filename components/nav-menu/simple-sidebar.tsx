"use client";

import { DelphiLogo } from "@/components/delphi-logo";
import { useMindDialog } from "@/features/mind-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarHamburgerMenu } from "./sidebar-hamburger-menu";
import { SidebarNavItems } from "./sidebar-nav-items";

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
          <SidebarNavItems isActive={isActive} onAddClick={handleAddClick} />
        </nav>

        {/* Hamburger Menu */}
        <div className='flex h-16 items-center justify-center'>
          <SidebarHamburgerMenu />
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b px-4 backdrop-blur lg:hidden'>
        <Link href='/' aria-label='Home'>
          <DelphiLogo className='text-foreground' />
        </Link>
        <SidebarHamburgerMenu />
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className='bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed bottom-0 left-0 right-0 z-40 flex h-14 items-center justify-around border-t backdrop-blur lg:hidden'>
        <SidebarNavItems isActive={isActive} onAddClick={handleAddClick} />
      </nav>
    </>
  );
}
