export const SLIDE_ANIMATION = {
  initial: { y: 20, opacity: 0, filter: "blur(10px)" },
  animate: { y: 0, opacity: 1, filter: "blur(0px)" },
  exit: { y: -20, opacity: 0, filter: "blur(10px)" },
  transition: { duration: 0.2, ease: "easeInOut" as const },
} as const;

export const CONTAINER_ANIMATION = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.25, ease: "easeInOut" as const },
} as const;
