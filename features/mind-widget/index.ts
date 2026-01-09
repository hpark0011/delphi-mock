// Primary unified export
export { MindWidget } from "./mind-widget";
export type { MindWidgetProps, MindWidgetVariant } from "./types";

// Components
export { AddToMindButton } from "./components/add-to-mind-button";
export { MindProfileButton } from "./components/mind-profile-button";
export {
  BaseGradientOverlay,
  GlassEffectHighlight,
  LevelAccentShadow,
  LevelProgressFill,
  MindWidgetBubble,
} from "./components/mind-widget-bubble";
export { MindWidgetLevel } from "./components/mind-widget-level";
export { MindWidgetScore } from "./components/mind-widget-score";
export { MindWidgetWrapper } from "./components/mind-widget-wrapper";
export { TrainingResultBadges } from "./components/training-result-badges";

// Training Status Components (atomic)
export { MindTrainingStatusIcon } from "./components/mind-training-status-icon";
export { MindTrainingStatusLabel } from "./components/mind-training-status-label";

// Hooks
export { useMindWidgetState } from "./hooks/use-mind-widget-state";
export { useLevelColors } from "./hooks/use-level-colors";
export { useScrollAwareTrainingVisibility } from "./hooks/use-scroll-aware-training-visibility";

// Utils
export {
  generateDropShadow,
  generateShadowString,
  generateSmallWidgetShadowString,
  getLevelShadowColors,
  getLevelSvgShadowColors,
  NEUTRAL_COLORS,
  type LevelColors,
  type SvgShadowColors,
} from "./utils/level-shadows";

export { CONTAINER_ANIMATION, SLIDE_ANIMATION } from "./utils/animations";
export {
  horizontalExpandAnimation,
  infoFadeAnimation,
  verticalSpringAnimation,
} from "./animations";

// Additional Components
export { GlassInnerGlow } from "./components/glass-inner-glow";
