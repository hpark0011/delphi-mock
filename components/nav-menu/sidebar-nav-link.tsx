import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarNavLinkProps {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  isActive: boolean;
  label: string;
  showNotification?: boolean;
  onClick?: () => void;
}

export function SidebarNavLink({
  icon: Icon,
  href,
  isActive,
  label,
  showNotification,
  onClick,
}: SidebarNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "sidebar-nav-link flex items-center justify-center rounded-lg p-2.5 py-2 transition-colors",
        isActive
          ? "text-foreground bg-sand-3 dark:bg-neutral-800"
          : "text-muted-foreground hover:text-foreground"
      )}
      aria-label={label}
    >
      <span className='relative'>
        <Icon className='size-6' />
        {showNotification && (
          <span className='absolute top-[0px] right-[0px] w-[9px] h-[9px] bg-red-600/80 rounded-full' />
        )}
      </span>
    </Link>
  );
}
