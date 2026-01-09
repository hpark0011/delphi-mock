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
  /** Visual variant */
  variant?: MindWidgetVariant;
  /** Disable click interaction */
  disableClick?: boolean;
}

// Shared internal props for all variant components
interface MindWidgetInternalBaseProps {
  score: number;
  level: string;
  progress: number;
  status: TrainingStatus;
  shouldShowTrainingStatus: boolean;
  handleClick: () => void;
}

// Internal props passed to default variant
export interface MindWidgetDefaultInternalProps
  extends MindWidgetInternalBaseProps {}

// Internal props passed to compact variants
export interface MindWidgetCompactInternalProps
  extends MindWidgetInternalBaseProps {
  disableClick: boolean;
  direction: CompactDirection;
}
