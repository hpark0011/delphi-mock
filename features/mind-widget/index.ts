// Components
export { MindWidget } from "./mind-widget";
export { MindWidgetWrapper } from "./components/mind-widget-wrapper";
export {
  MindWidgetBubble,
  BaseGradientOverlay,
  GlassEffectHighlight,
  LevelAccentShadow,
  LevelProgressFill,
} from "./components/mind-widget-bubble";
export { MindWidgetScore } from "./components/mind-widget-score";
export { MindWidgetLevel } from "./components/mind-widget-level";
export { TrainingResultBadges } from "./components/training-result-badges";
export { MindProfileButton } from "./components/mind-profile-button";
export { MindWidgetSmall } from "./components/mind-widget-small";

// Training Status Components (atomic)
export { MindTrainingStatusIcon } from "./components/mind-training-status-icon";
export { MindTrainingStatusLabel } from "./components/mind-training-status-label";

// Hooks
export { useMindWidgetState } from "./hooks/use-mind-widget-state";

// Utils
export {
  getLevelShadowColors,
  generateShadowString,
  generateSmallWidgetShadowString,
  generateDropShadow,
  getLevelSvgShadowColors,
  NEUTRAL_COLORS,
  type LevelColors,
  type SvgShadowColors,
} from "./utils/level-shadows";

export { SLIDE_ANIMATION, CONTAINER_ANIMATION } from "./utils/animations";

// Additional Components
export { GlassInnerGlow } from "./components/glass-inner-glow";
