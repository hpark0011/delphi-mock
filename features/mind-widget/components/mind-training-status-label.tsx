"use client";

import { AnimatePresence, motion, type Transition } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

type DisplayState = "learning" | "newItem" | "finished";

const SPRING_CONFIG: Transition = {
  type: "spring",
  stiffness: 600,
  damping: 30,
};

interface MindTrainingStatusLabelProps {
  state: DisplayState;
  activeCount: number;
  newItemName: string;
}

export function MindTrainingStatusLabel({
  state,
  activeCount,
  newItemName,
}: MindTrainingStatusLabelProps) {
  const [labelWidth, setLabelWidth] = useState<number | "auto">("auto");
  const measureRef = useRef<HTMLDivElement>(null);

  const labelText =
    state === "learning" ? `Learning ${activeCount}` : newItemName;

  const isNewItem = state === "newItem";

  useLayoutEffect(() => {
    if (measureRef.current) {
      const { width } = measureRef.current.getBoundingClientRect();
      setLabelWidth(isNewItem ? Math.min(width, 184) : width);
    }
  }, [labelText, isNewItem]);

  return (
    <>
      {/* Hidden copy to measure width */}
      <div
        ref={measureRef}
        className='absolute invisible whitespace-nowrap text-[13px]'
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
            className={`text-[13px] dark:text-white/90 ${isNewItem ? "max-w-[184px] truncate" : "whitespace-nowrap"}`}
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
