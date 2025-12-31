// Context & Provider
export { MindScoreProvider, useMindScore } from "./context/mind-score-context";

// Utils
export {
  calculateLevel,
  getCurrentLevelThreshold,
  getNextLevelThreshold,
  getProgressToNextLevel,
  getProgressCap,
  LEVEL_THRESHOLDS,
  type LevelName,
} from "./utils/mind-level";
