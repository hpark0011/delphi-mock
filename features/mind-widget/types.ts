import type { LevelColors } from "./utils/level-shadows";

// Widget variants
export type MindWidgetVariant = "default" | "compact" | "compact-vertical";

// Training status types
export type TrainingStatus = "idle" | "active" | "finished";

// Compact direction
export type CompactDirection = "horizontal" | "vertical";

// Public props for the unified MindWidget component
export interface MindWidgetProps {
  /** Mind score value */
  score?: number;
  /** Current level name (optional - will derive from score if not provided) */
  level?: string;
  /** Visual variant */
  variant?: MindWidgetVariant;
  /** Disable click interaction */
  disableClick?: boolean;
}

// Internal props passed to default variant
export interface MindWidgetDefaultInternalProps {
  score: number;
  level: string;
  progress: number;
  status: TrainingStatus;
  shouldShowTrainingStatus: boolean;
  handleClick: () => void;
}

// Internal props passed to compact variants
export interface MindWidgetCompactInternalProps {
  score: number;
  progress: number;
  disableClick: boolean;
  direction: CompactDirection;
  status: TrainingStatus;
  shouldShowTrainingStatus: boolean;
  handleClick: () => void;
  levelColors: LevelColors;
  shadowString: string;
  dropShadow: string;
}
