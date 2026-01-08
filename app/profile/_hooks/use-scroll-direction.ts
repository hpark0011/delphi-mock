"use client";

import { useEffect, useState } from "react";

export function useScrollDirection(threshold = 5, resetThreshold = 50) {
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;

        if (
          Math.abs(scrollDelta) > threshold &&
          currentScrollY > resetThreshold
        ) {
          setIsScrollingDown(scrollDelta > 0);
        } else if (currentScrollY <= resetThreshold) {
          setIsScrollingDown(false);
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, resetThreshold]);

  return isScrollingDown;
}
