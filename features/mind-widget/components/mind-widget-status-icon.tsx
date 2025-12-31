"use client";

import { type TrainingDocType } from "@/features/mind-dialog";
import { MindStatusIcon } from "@/components/mind-status-notification";
import { Icon } from "@/components/ui/icon";
import { getDocTypeIcon } from "@/utils/doc-type-helpers";
import { AnimatePresence, motion } from "framer-motion";

interface MindWidgetStatusIconProps {
  state: "loading" | "newItem";
  docType?: TrainingDocType;
}

export function MindWidgetStatusIcon({
  state,
  docType,
}: MindWidgetStatusIconProps) {
  return (
    <span className='relative flex items-center justify-center size-4'>
      <AnimatePresence mode='sync'>
        <motion.span
          key={state}
          className='absolute left-0 top-0'
          initial={{ y: -20, scale: 0.5, filter: "blur(6px)" }}
          animate={{ y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ y: 20, scale: 0.5, filter: "blur(6px)" }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
        >
          {state === "loading" && <MindStatusIcon status='active' />}
          {state === "newItem" && (
            <Icon
              name={docType ? getDocTypeIcon(docType) : "DocFillIcon"}
              className='size-4.5'
            />
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
