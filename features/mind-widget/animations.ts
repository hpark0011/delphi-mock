/**
 * Shared animation configurations for mind widget variants
 */

// Vertical spring animation - used by mind-widget.tsx and mind-widget-small-vertical.tsx
export const verticalSpringAnimation = {
  initial: { opacity: 1, y: -10, scale: 0.75 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 1, y: -10, scale: 0.75 },
  transition: {
    type: "spring" as const,
    stiffness: 300,
    damping: 25,
    mass: 1,
  },
};

// Horizontal width expansion animation - used by mind-widget-small.tsx
export const horizontalExpandAnimation = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
  transition: { duration: 0.25, ease: "easeInOut" as const },
};

// Info component animation - used by mind-widget.tsx
export const infoFadeAnimation = {
  initial: { opacity: 0, y: -10, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.95 },
  transition: {
    type: "spring" as const,
    stiffness: 300,
    damping: 25,
    mass: 1,
  },
};
