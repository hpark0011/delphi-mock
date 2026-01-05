import { cn } from "@/lib/utils";

export const DashboardMainWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("h-full dark:bg-black/50", className)}>{children}</div>
  );
};

export const Divider = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-[3px] h-12 bg-[#EBEBE9] dark:bg-[#171715] rounded-full min-w-[3px]",
        className
      )}
    />
  );
};
