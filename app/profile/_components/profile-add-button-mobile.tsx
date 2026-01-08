"use client";

import { AddToMindButton } from "@/features/mind-widget";
import { cn } from "@/lib/utils";

import { useScrollDirection } from "../_hooks";

// Spring easing for smooth reveal animation
const SPRING_EASING =
  "linear(0, 0.0694, 0.237, 0.4486, 0.6622, 0.8494, 0.9944, 1.0924, 1.146, 1.163, 1.1531, 1.1266, 1.0924, 1.0574, 1.0265, 1.0023, 0.9858, 0.9766, 0.9735, 0.9748, 0.979, 0.9845, 0.9903, 0.9954, 0.9994, 1.0022, 1.0037, 1, 1.0041, 1.0035, 1.0026, 1.0017, 1.0008, 1.0001, 0.9997, 1, 1)";

interface ProfileAddButtonMobileProps {
  onClick: () => void;
}

export function ProfileAddButtonMobile({
  onClick,
}: ProfileAddButtonMobileProps) {
  const isScrollingDown = useScrollDirection();

  return (
    <div
      className={cn(
        "transition-all mt-1",
        !isScrollingDown
          ? "opacity-100 translate-y-0 max-h-12 scale-100"
          : "opacity-0 -translate-y-10 max-h-0 scale-75"
      )}
      style={{
        transitionDuration: !isScrollingDown ? "600ms" : "300ms",
        transitionTimingFunction: !isScrollingDown ? SPRING_EASING : "ease-out",
      }}
    >
      <AddToMindButton variant='circular' onClick={onClick} />
    </div>
  );
}
