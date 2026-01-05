import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarNavLinkProps {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  isActive: boolean;
  label: string;
}

export function SidebarNavLink({
  icon: Icon,
  href,
  isActive,
  label,
}: SidebarNavLinkProps) {
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
