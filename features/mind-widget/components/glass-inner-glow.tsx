"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

interface GlassInnerGlowProps {
  className?: string;
}

export function GlassInnerGlow({ className }: GlassInnerGlowProps) {
  return (
    <motion.div
      className={cn("rounded-full absolute", className)}
      initial={{
        top: "",
        left: "",
        width: "0px",
        height: "0px",
        filter: "blur(0px)",
        boxShadow:
          "inset 0px -2px 2px 0px rgba(255,255,255,0.9), inset 0px 5px 2px 0px rgba(255,255,255,0.5), inset 0px 4px 4px 0px rgba(255,255,255,0), inset 0px 1px 1px 0.5px rgba(255,255,255,0.7)",
      }}
      animate={{
        top: "1px",
        left: "1px",
        width: "calc(100% - 2px)",
        height: "calc(100% - 2px)",
        filter: "blur(3px)",
        boxShadow:
          "inset 0px -2px 2px 0px rgba(255,255,255,0.9), inset 0px 5px 2px 0px rgba(255,255,255,0.5), inset 0px 4px 4px 0px rgba(255,255,255,0), inset 0px 1px 1px 0.5px rgba(255,255,255,0.7)",
      }}
      transition={SPRING_CONFIG}
    />
  );
}
