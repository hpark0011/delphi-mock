"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

type WrapperVariant = "default" | "compact-horizontal" | "compact-vertical";

const VARIANT_CONFIG = {
  default: {
    className: cn(
      // Layout
      "flex flex-col items-center h-fit gap-0.5 min-w-[160px] p-4 pt-0 pb-3",
      // Background
      "bg-transparent"
    ),
    useMotion: false,
  },
  "compact-horizontal": {
    className: "flex gap-0 relative justify-start items-center rounded-full bg-sand-3",
    useMotion: true,
  },
  "compact-vertical": {
    className: "flex-col gap-0.5 relative justify-center items-center rounded-full flex",
    useMotion: false,
  },
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
}: MindWidgetWrapperProps) {
  const config = VARIANT_CONFIG[variant];

  if (config.useMotion) {
    return (
      <motion.div
        layout
        transition={{
          layout: { type: "spring", stiffness: 300, damping: 30 },
        }}
        className={cn(config.className, className)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cn(config.className, className)}>
      {children}
    </div>
  );
}
