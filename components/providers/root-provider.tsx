"use client";

import React, { useState, useEffect } from "react";

// all the providers go here
import { ThemeProvider } from "@/components/providers/theme-provider";

import { Toaster } from "sonner";
import { ReactQueryProvider } from "./react-query-provider";
import { useThemeToggle } from "@/hooks/use-theme-toggle";
import {
  MindScoreProvider,
  useMindScore,
} from "@/app/studio/_components/mindscore/mind-score-context";
import { TrainingQueueProvider } from "@/components/mind-dialog/training-queue-context";
import { LevelUpDialog } from "@/components/mind-dialog/level-up-dialog";
import { MindDialog } from "@/components/mind-dialog/mind-dialog";

// ThemeWrapper is used to toggle the theme when the user presses the command + k key. This is only for development purposes.
function ThemeWrapper({ children }: { children: React.ReactNode }) {
  useThemeToggle();
  return children;
}

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='light'
        enableSystem
        disableTransitionOnChange
        storageKey='theme'
        themes={["light", "dark"]}
      >
        <MindScoreProvider>
          <TrainingQueueProvider>
            <MindDialog>
              <ThemeWrapper>
                {children}
                <Toaster />
              </ThemeWrapper>
            </MindDialog>
          </TrainingQueueProvider>
        </MindScoreProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
