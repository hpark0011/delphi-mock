"use client";

import { AddToMindButton } from "@/features/mind-widget";
import { ScrollRevealWrapper } from "@/components/ui/scroll-reveal-wrapper";

import { useScrollDirection } from "../_hooks";

interface ProfileAddButtonMobileProps {
  onClick: () => void;
}

export function ProfileAddButtonMobile({
  onClick,
}: ProfileAddButtonMobileProps) {
  const isScrollingDown = useScrollDirection();

  return (
    <ScrollRevealWrapper isScrollingDown={isScrollingDown} className="mt-1">
      <AddToMindButton variant="circular" onClick={onClick} />
    </ScrollRevealWrapper>
  );
}
