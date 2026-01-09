import type { LevelColors } from "./utils/level-shadows";

// Widget variants
export type MindWidgetVariant = "default" | "compact" | "compact-vertical";

// Container style options (only applies to 'compact' variant)
export type MindWidgetContainerStyle = "default" | "profile";

// Training status types
export type TrainingStatus = "idle" | "active" | "finished";

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

// Internal props passed to variant components
export interface MindWidgetInternalProps {
  score: number;
  level: string;
  progress: number;
  disableClick: boolean;
  className?: string;
  // State from useMindWidgetState
  status: TrainingStatus;
  shouldShowTrainingStatus: boolean;
  openAddKnowledge: () => void;
  // Colors from useLevelColors
  levelColors: LevelColors;
  shadowString: string;
  dropShadow: string;
}

// Props for the compact variant with container style option
export interface MindWidgetCompactInternalProps extends MindWidgetInternalProps {
  containerStyle: MindWidgetContainerStyle;
}
