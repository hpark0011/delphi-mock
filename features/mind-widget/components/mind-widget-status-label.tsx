"use client";

import { AnimatePresence, motion } from "framer-motion";

interface MindWidgetStatusLabelProps {
  state: "loading" | "newItem";
  activeCount: number;
  newItemName: string;
}

export function MindWidgetStatusLabel({
  state,
  activeCount,
  newItemName,
}: MindWidgetStatusLabelProps) {
  const labelText =
    state === "loading" ? `Learning ${activeCount}` : newItemName;

  const isNewItem = state === "newItem";

  return (
    <motion.span className='relative overflow-hidden'>
      <AnimatePresence mode='sync'>
        <motion.div
          key={state + labelText}
          className={`text-sm text-sand-10 ${isNewItem ? "max-w-[120px] truncate" : "whitespace-nowrap"}`}
          initial={{
            y: -20,
            opacity: 0,
            filter: "blur(10px)",
            position: "absolute",
          }}
          animate={{
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            position: "relative",
          }}
          exit={{
            y: 20,
            opacity: 0,
            filter: "blur(10px)",
            position: "absolute",
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {labelText}
        </motion.div>
      </AnimatePresence>
    </motion.span>
  );
}
