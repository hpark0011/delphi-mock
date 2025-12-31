"use client";

import { AnimatePresence, motion, type Transition } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

const SPRING_CONFIG: Transition = {
  type: "spring",
  stiffness: 600,
  damping: 30,
};

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
  const [labelWidth, setLabelWidth] = useState<number | "auto">("auto");
  const measureRef = useRef<HTMLDivElement>(null);

  const labelText =
    state === "loading" ? `Learning ${activeCount}` : newItemName;

  const isNewItem = state === "newItem";

  useLayoutEffect(() => {
    if (measureRef.current) {
      const { width } = measureRef.current.getBoundingClientRect();
      setLabelWidth(isNewItem ? Math.min(width, 100) : width);
    }
  }, [labelText, isNewItem]);

  return (
    <>
      {/* Hidden copy to measure width */}
      <div
        ref={measureRef}
        className='absolute invisible whitespace-nowrap text-[12px]'
      >
        {labelText}
      </div>

      <motion.span
        className='relative overflow-hidden'
        initial={false}
        animate={{ width: labelWidth }}
        transition={SPRING_CONFIG}
      >
        <AnimatePresence mode='sync' initial={false}>
          <motion.div
            key={state + labelText}
            className={`text-[12px] text-white/70 ${isNewItem ? "max-w-[100px] truncate" : "whitespace-nowrap"}`}
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
    </>
  );
}
