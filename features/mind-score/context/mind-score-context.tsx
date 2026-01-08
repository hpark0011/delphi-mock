"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import {
  calculateLevel,
  LEVEL_THRESHOLDS,
  getNextLevelThreshold,
  getProgressToNextLevel,
  getProgressCap,
  calculateLevelProgress,
} from "../utils/mind-level";

interface MindScoreContextType {
  current: number;
  level: string;
  progressToNextLevel: number;
  levelProgress: number;
  nextLevelThreshold: number;
  progressCap: number;
  lastIncrement: number | null;
  lastDecrement: number | null;
  lastTrainingDate: Date | null;
  incrementScore: (points: number) => void;
  decrementScore: (points: number) => void;
  setLastTrainingDate: (date: Date) => void;
}

const MindScoreContext = createContext<MindScoreContextType | null>(null);

interface MindScoreProviderProps {
  children: React.ReactNode;
  initialScore?: number;
}

export function MindScoreProvider({
  children,
  initialScore = 200,
}: MindScoreProviderProps) {
  const [current, setCurrent] = useState(initialScore);
  const [lastIncrement, setLastIncrement] = useState<number | null>(null);
  const [lastDecrement, setLastDecrement] = useState<number | null>(null);
  const [lastTrainingDate, setLastTrainingDate] = useState<Date | null>(null);

  const incrementScore = useCallback((points: number) => {
    setCurrent((prev) => prev + points);
    setLastIncrement(points);
  }, []);

  const decrementScore = useCallback((points: number) => {
    setCurrent((prev) => Math.max(0, prev - points));
    setLastDecrement(points);
  }, []);

  // Clear increment indicator after 3 seconds
  useEffect(() => {
    if (lastIncrement !== null) {
      const timer = setTimeout(() => {
        setLastIncrement(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lastIncrement]);

  // Clear decrement indicator after 3 seconds
  useEffect(() => {
    if (lastDecrement !== null) {
      const timer = setTimeout(() => {
        setLastDecrement(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lastDecrement]);

  const level = useMemo(() => calculateLevel(current), [current]);
  const nextLevelThreshold = useMemo(
    () => getNextLevelThreshold(current),
    [current]
  );
  const progressToNextLevel = useMemo(
    () => getProgressToNextLevel(current),
    [current]
  );
  const progressCap = useMemo(() => getProgressCap(current), [current]);
  const levelProgress = useMemo(
    () => calculateLevelProgress(current),
    [current]
  );

  const value = useMemo(
    () => ({
      current,
      level,
      progressToNextLevel,
      levelProgress,
      nextLevelThreshold,
      progressCap,
      lastIncrement,
      lastDecrement,
      lastTrainingDate,
      incrementScore,
      decrementScore,
      setLastTrainingDate,
    }),
    [
      current,
      level,
      progressToNextLevel,
      levelProgress,
      nextLevelThreshold,
      progressCap,
      lastIncrement,
      lastDecrement,
      lastTrainingDate,
      incrementScore,
      decrementScore,
    ]
  );

  return (
    <MindScoreContext.Provider value={value}>
      {children}
    </MindScoreContext.Provider>
  );
}

export function useMindScore() {
  const context = useContext(MindScoreContext);
  if (!context) {
    throw new Error("useMindScore must be used within MindScoreProvider");
  }
  return context;
}
