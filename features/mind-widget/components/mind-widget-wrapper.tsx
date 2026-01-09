"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export type WrapperVariant = "default" | "compact-horizontal" | "compact-vertical";

const VARIANT_STYLES: Record<WrapperVariant, string> = {
  default: cn(
    "flex flex-col items-center h-fit gap-0.5 min-w-[160px] p-4 pt-0 pb-3",
    "bg-transparent"
  ),
  "compact-horizontal":
    "flex gap-0 relative justify-start items-center rounded-full bg-sand-3",
  "compact-vertical":
    "flex flex-col gap-0.5 relative justify-center items-center rounded-full",
};

const MOTION_TRANSITION = {
  layout: { type: "spring", stiffness: 300, damping: 30 },
} as const;

interface MindWidgetWrapperProps {
  children: React.ReactNode;
  className?: string;
  variant?: WrapperVariant;
}

export function MindWidgetWrapper({
  children,
  className,
  variant = "default",
}: MindWidgetWrapperProps): React.JSX.Element {
  const variantClassName = cn(VARIANT_STYLES[variant], className);

  // Only compact-horizontal uses motion for layout animations
  if (variant === "compact-horizontal") {
    return (
      <motion.div
        layout
        transition={MOTION_TRANSITION}
        className={variantClassName}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={variantClassName}>{children}</div>;
}
