"use client";

import { cn } from "@/lib/utils";

// Spring easing for smooth reveal animation
const SPRING_EASING =
  "linear(0, 0.0694, 0.237, 0.4486, 0.6622, 0.8494, 0.9944, 1.0924, 1.146, 1.163, 1.1531, 1.1266, 1.0924, 1.0574, 1.0265, 1.0023, 0.9858, 0.9766, 0.9735, 0.9748, 0.979, 0.9845, 0.9903, 0.9954, 0.9994, 1.0022, 1.0037, 1, 1.0041, 1.0035, 1.0026, 1.0017, 1.0008, 1.0001, 0.9997, 1, 1)";

interface ScrollRevealWrapperProps {
  isScrollingDown: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * A wrapper component that reveals/hides content based on scroll direction.
 * - Shows content when scrolling up (isScrollingDown = false)
 * - Hides content when scrolling down (isScrollingDown = true)
 *
 * Uses CSS transitions with spring easing for smooth animations.
 */
export function ScrollRevealWrapper({
  isScrollingDown,
  children,
  className,
}: ScrollRevealWrapperProps) {
  const isVisible = !isScrollingDown;

  return (
    <div
      className={cn(
        "transition-all",
        isVisible
          ? "opacity-100 translate-y-0 max-h-12 scale-100"
          : "opacity-0 -translate-y-10 max-h-0 scale-75",
        className
      )}
      style={{
        transitionDuration: isVisible ? "600ms" : "300ms",
        transitionTimingFunction: isVisible ? SPRING_EASING : "ease-out",
      }}
    >
      {children}
    </div>
  );
}
