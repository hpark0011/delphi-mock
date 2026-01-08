"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { IconName } from "@/components/ui/icon";
import { Icon } from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMindScore } from "@/features/mind-score";
import { MindWidgetSmallV2 } from "@/features/mind-widget";
import { MindProfileButton } from "@/features/mind-widget/components/mind-profile-button";
import { useTrainingState } from "@/hooks/use-training-state";
import { cn } from "@/lib/utils";
import { type TrainingItemStatus } from "@/utils/training-status-helpers";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import React, { createContext, useContext, useMemo, useState } from "react";
import { useTrainingQueue } from "../context/training-queue-context";
import {
  DEFAULT_MIND_DIALOG_TAB,
  MIND_DIALOG_TABS,
  MindDialogTabId,
  getMindDialogWidthClass,
} from "../utils/mind-dialog-config";

// Re-export for convenience
export type { MindDialogTabId } from "../utils/mind-dialog-config";

export type OpenDialogOptions = {
  tab?: MindDialogTabId;
  filter?: TrainingItemStatus | "all";
};

interface MindDialogContextType {
  setActiveTab: (tab: MindDialogTabId) => void;
  open: (options?: OpenDialogOptions) => void;
  close: () => void;
  initialFilter: TrainingItemStatus | "all" | null;
  clearInitialFilter: () => void;
}

const MindDialogContext = createContext<MindDialogContextType | null>(null);

export function useMindDialog() {
  const context = useContext(MindDialogContext);
  if (!context) {
    throw new Error("useMindDialog must be used within MindDialogProvider");
  }
  return context;
}

interface MindDialogProps {
  children: React.ReactNode;
  defaultTab?: MindDialogTabId;
}

export function MindDialogHeader({
  score,
  level,
}: {
  score: number;
  level: string;
}) {
  const { clearQueue, markAsReviewed } = useTrainingQueue();
  const { status } = useTrainingState();
  const { close } = useMindDialog();

  const onProfileClick = () => {
    // Mark as reviewed to change status from "finished" to "idle"
    if (status === "finished") {
      markAsReviewed();
    }
    clearQueue();
    close();
  };

  return (
    <div className='flex flex-col justify-between items-center w-full relative'>
      <VisuallyHidden>
        <DialogTitle>Mind</DialogTitle>
      </VisuallyHidden>
      <div className='flex justify-end items-center z-10 pt-2 pr-2 w-full absolute top-2 right-2'>
        <MindProfileButton onClick={onProfileClick} />
      </div>
      <div className='mt-2 flex flex-col items-center justify-center gap-6'>
        <MindWidgetSmallV2 score={score} level={level} disableClick />
        {/* Mind level */}
        <div className='font-medium text-center text-sand-10'>{level}</div>
      </div>
      <div className='flex justify-center relative z-10 mt-8 mb-3 items-center'>
        {/* Training status & add knowledge tabs */}
        <TabsList className='gap-1'>
          {MIND_DIALOG_TABS.map((tab) => {
            const icon: IconName = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  // Base styles
                  "text-[14px] h-9 rounded-full px-2.5 pr-3 tracking-tight gap-1",
                  // Default state
                  "text-sand-9 dark:text-white/60 bg-sand-10/8",
                  // Hover state
                  "hover:bg-sand-10/20 dark:hover:bg-white/10",
                  // Active state
                  "data-[state=active]:bg-sand-1 data-[state=active]:text-sand-11 dark:data-[state=active]:bg-white/10 data-[state=active]:shadow-[inset_0_2px_1px_0px_rgba(255,255,255,1),inset_0_-1px_1px_0px_rgba(255,255,255,1)] dark:data-[state=active]:shadow-[inset_0_2px_1px_0px_rgba(0,0,0,0.1),inset_0_-1px_1px_0px_rgba(0,0,0,0.1)]",
                  // Conditional styles
                  tab.id === "training-status" && "gap-0.5"
                )}
              >
                <Icon
                  name={icon}
                  className='size-4 text-sand-8'
                  aria-hidden='true'
                />
                <span className='whitespace-nowrap'>{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>
    </div>
  );
}

export function MindDialogProvider({
  children,
  defaultTab = DEFAULT_MIND_DIALOG_TAB,
}: MindDialogProps) {
  const { current: score, level } = useMindScore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<MindDialogTabId>(defaultTab);
  const [initialFilter, setInitialFilter] = useState<
    TrainingItemStatus | "all" | null
  >(null);

  const handleOpenChange = (nextIsOpen: boolean) => {
    setIsOpen(nextIsOpen);
    // Clear initial filter when dialog closes
    if (!nextIsOpen) {
      setInitialFilter(null);
    }
  };

  const open = (options?: OpenDialogOptions) => {
    const { tab = DEFAULT_MIND_DIALOG_TAB, filter } = options ?? {};
    setActiveTab(tab);
    if (filter) {
      setInitialFilter(filter);
    }
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setInitialFilter(null);
  };

  const clearInitialFilter = () => {
    setInitialFilter(null);
  };

  // Get width class for current tab
  const dialogWidthClass = useMemo(
    () => getMindDialogWidthClass(activeTab),
    [activeTab]
  );

  return (
    <MindDialogContext.Provider
      value={{
        setActiveTab,
        open,
        close: closeDialog,
        initialFilter,
        clearInitialFilter,
      }}
    >
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        {children}
        <DialogContent
          // showCloseButton
          className={`p-0 sm:max-w-2xl ${dialogWidthClass} rounded-[36px] max-h-[87vh] h-full flex flex-col overflow-hidden bg-dialog`}
        >
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as MindDialogTabId)}
            className='w-full flex flex-col h-full min-h-0 gap-0'
          >
            {/* Fixed Header Section */}
            <MindDialogHeader score={score} level={level} />

            {/* Scrollable Content Section */}
            <div className='flex-1 overflow-y-auto min-h-0 p-4 pt-2'>
              {MIND_DIALOG_TABS.map((tab) => {
                const TabComponent = tab.component;
                return (
                  <TabsContent key={tab.id} value={tab.id} className='mt-0'>
                    <TabComponent />
                  </TabsContent>
                );
              })}
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
    </MindDialogContext.Provider>
  );
}
