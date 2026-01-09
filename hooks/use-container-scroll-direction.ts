"use client";

import { useEffect, useState, RefObject } from "react";

/**
 * Tracks scroll direction within a specific container element.
 * Returns true when scrolling down, false when scrolling up.
 *
 * @param containerRef - Ref to the scrollable container element
 * @param threshold - Minimum scroll delta to trigger direction change (default: 5px)
 * @param resetThreshold - Scroll position below which state resets to false (default: 50px)
 */
export function useContainerScrollDirection(
  containerRef: RefObject<HTMLElement | null>,
  threshold = 5,
  resetThreshold = 50
): boolean {
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTop = container.scrollTop;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const currentScrollTop = container.scrollTop;
        const scrollDelta = currentScrollTop - lastScrollTop;

        if (
          Math.abs(scrollDelta) > threshold &&
          currentScrollTop > resetThreshold
        ) {
          setIsScrollingDown(scrollDelta > 0);
        } else if (currentScrollTop <= resetThreshold) {
          setIsScrollingDown(false);
        }

        lastScrollTop = currentScrollTop;
        ticking = false;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [threshold, resetThreshold]);

  return isScrollingDown;
}
