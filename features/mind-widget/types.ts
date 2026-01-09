import type { LevelColors } from "./utils/level-shadows";

// Widget variants
export type MindWidgetVariant = "default" | "compact" | "compact-vertical";

// Container style options (only applies to 'compact' variant)
export type MindWidgetContainerStyle = "default" | "profile";

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
  /** Container background style (only applies to 'compact' variant) */
  containerStyle?: MindWidgetContainerStyle;
  /** Disable click interaction */
  disableClick?: boolean;
  /** Additional class names */
  className?: string;
}

// Internal props passed to default variant
export interface MindWidgetDefaultInternalProps {
  score: number;
  level: string;
  progress: number;
  disableClick: boolean;
  className?: string;
  status: TrainingStatus;
  shouldShowTrainingStatus: boolean;
  handleClick: () => void;
}

// Internal props passed to compact variants
export interface MindWidgetCompactInternalProps {
  score: number;
  progress: number;
  disableClick: boolean;
  className?: string;
  containerStyle?: MindWidgetContainerStyle;
  direction: CompactDirection;
  status: TrainingStatus;
  shouldShowTrainingStatus: boolean;
  handleClick: () => void;
  levelColors: LevelColors;
  shadowString: string;
  dropShadow: string;
}
