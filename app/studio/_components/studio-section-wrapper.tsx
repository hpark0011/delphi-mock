import { cn } from "@/lib/utils";

interface StudioSectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const StudioSectionWrapper = ({
  children,
  className,
  style,
}: StudioSectionWrapperProps) => {
  return (
    <div
      className={cn(
        "bg-[#F6F6F5] dark:bg-[#171715] rounded-[28px] p-1.5",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};
