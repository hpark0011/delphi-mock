// Components
export { MindWidget } from "./mind-widget";
export { MindWidgetWrapper } from "./components/mind-widget-wrapper";
export { MindWidgetBubble } from "./components/mind-widget-bubble";
export { MindWidgetScore } from "./components/mind-widget-score";
export { MindWidgetLevel } from "./components/mind-widget-level";
export { TrainingResultBadges } from "./components/training-result-badges";

// Utils
export {
  getLevelShadowColors,
  generateShadowString,
  generateSmallWidgetShadowString,
  getLevelSvgShadowColors,
  type LevelColors,
  type SvgShadowColors,
} from "./utils/level-shadows";

// Hooks
export {
  useTrainingDisplayState,
  type DisplayState,
  type NewItemInfo,
} from "./hooks/use-training-display-state";
