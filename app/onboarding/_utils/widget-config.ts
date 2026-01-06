// Re-export shared level shadow utilities from features/mind-widget
export {
  getLevelShadowColors,
  generateShadowString,
  generateSmallWidgetShadowString,
  generateDropShadow,
  getLevelSvgShadowColors,
  NEUTRAL_COLORS,
  type LevelColors,
  type SvgShadowColors,
} from "@/features/mind-widget";

// Animation Config
export const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

// Shadow Presets
export const SHADOW_PRESETS = {
  largeNeutral: [
    "inset 0px 1px 1px 1px rgba(0,0,0,0.1)",
    "inset 0px -1px 1px 0px rgba(255,255,255,0.7)",
    "inset 0px 1px 1px 3px rgba(255,255,255,1)",
  ].join(", "),

  smallNeutral: [
    "0 0 0 0.5px rgba(0,0,0,0.05)",
    "0 10px 20px -5px rgba(0,0,0,0.4)",
    "0 1px 1px 0 rgba(0,0,0,0.15)",
  ].join(","),

  smallInner: [
    "inset 0px -2px 2px 0px rgba(255,255,255,0.9)",
    "inset 0px 5px 2px 0px rgba(255,255,255,0.5)",
    "inset 0px 4px 4px 0px rgba(255,255,255,0)",
    "inset 0px 1px 1px 0.5px rgba(255,255,255,0.7)",
  ].join(", "),
} as const;

// Types
export type MotionEase = "easeIn" | "easeOut" | "easeInOut" | "linear";
export type WidgetVariant = "large" | "small";

/**
 * Configuration for the onboarding mind widget.
 * Properties are grouped by the component they affect.
 */
export interface WidgetConfig {
  // General / Variant
  /** Widget variant type - determines overall size and behavior */
  variant: WidgetVariant;

  // Bubble Container
  // Affects: onboarding-mind-widget-bubble.tsx
  /** Width of the main bubble container */
  bubbleWidth: number;
  /** Height of the main bubble container */
  bubbleHeight: number;
  /** Horizontal padding for the bubble container */
  bubblePaddingX: number;
  /** Vertical padding for the bubble container */
  bubblePaddingY: number;
  /** Animation duration for bubble container transitions */
  motionDuration: number;
  /** Animation easing function for bubble container transitions */
  motionEase: MotionEase;

  // Bubble Highlight
  // Affects: onboarding-mind-widget-bubble-highlight.tsx
  /** Offset position for the highlight layer (top/left positioning) */
  highlightOffset: string;
  /** Size of the highlight layer (width/height) */
  highlightSize: string;
  /** Blur filter applied to the highlight layer */
  highlightBlur: string;
  /** Shadow applied to the highlight layer */
  innerShadow: string;
  /** Whether to show the hover layer (large widgets only) */
  showHoverLayer: boolean;

  // Content
  // Affects: onboarding-mind-widget-score.tsx, onboarding-mind-widget-plus-ten.tsx
  /** Font size for score and plus-ten content */
  contentFontSize: string;

  // Container
  // Affects: onboarding-mind-widget-container.tsx
  /** Vertical positioning of the widget container */
  top: string;

  // Shadows
  // Affects: use-onboarding-bubble-shadow.ts
  /** Default neutral shadow used when mindScore is 0 */
  neutralShadow: string;

  // Display Flags
  // Affects: onboarding-mind-widget.tsx
  /** Whether to display the level text */
  showLevel: boolean;

  // Width Behavior
  /** Use auto width with minWidth (small variant) vs fixed width (large variant) */
  autoWidth: boolean;
}

// Base Configurations
const BASE_DEFAULTS = {
  highlightOffset: "0px",
  motionDuration: 0.2,
  motionEase: "easeIn" as MotionEase,
} as const;

const LARGE_BASE = {
  bubbleWidth: 336,
  bubbleMinWidth: 336,
  bubbleHeight: 218,
  top: "17vh",
  bubblePaddingX: 0,
  bubblePaddingY: 0,
  contentFontSize: "80px",
  highlightSize: "calc(100% - 4px)",
  highlightBlur: "blur(6px)",
  showHoverLayer: true,
  showLevel: true,
  autoWidth: false,
} as const;

const SMALL_BASE = {
  bubbleWidth: 48,
  bubbleMinWidth: 48,
  bubbleHeight: 40,
  top: "10px",
  bubblePaddingX: 12,
  bubblePaddingY: 4,
  contentFontSize: "18px",
  highlightSize: "calc(100% - 2px)",
  highlightBlur: "blur(3px)",
  showHoverLayer: false,
  showLevel: false,
  autoWidth: true,
} as const;

// Variant Registry
const WIDGET_VARIANTS = {
  large: {
    base: LARGE_BASE,
    shadows: {
      neutralShadow: SHADOW_PRESETS.largeNeutral,
      innerShadow: SHADOW_PRESETS.largeNeutral,
    },
  },
  small: {
    base: SMALL_BASE,
    shadows: {
      neutralShadow: SHADOW_PRESETS.smallNeutral,
      innerShadow: SHADOW_PRESETS.smallInner,
    },
  },
} as const;

// Config Factory
export function createWidgetConfig(
  variant: WidgetVariant,
  overrides?: Partial<WidgetConfig>
): WidgetConfig {
  const { base, shadows } = WIDGET_VARIANTS[variant];
  return {
    variant,
    ...BASE_DEFAULTS,
    ...base,
    ...shadows,
    ...overrides,
  };
}

// Motion Helpers
export function getMotionProps(
  config: WidgetConfig,
  options?: {
    initialWidth?: number | string;
    animateWidth?: number | string;
  }
) {
  // Small variant: width adapts to content (e.g., "Hey 👋" vs "10") but maintains minimum width
  // Large variant: fixed width regardless of content
  // Note: minWidth is NOT included in animate prop - it's set via style prop and ref in the component
  // This ensures minWidth is always applied as static CSS and not animated/overridden by Framer Motion
  const animateWidth = config.autoWidth
    ? { width: "auto" }
    : { width: options?.animateWidth ?? config.bubbleWidth };

  const animate = {
    ...animateWidth,
    minWidth: config.bubbleWidth,
    height: config.bubbleHeight,
    paddingLeft: config.bubblePaddingX,
    paddingRight: config.bubblePaddingX,
    paddingTop: config.bubblePaddingY,
    paddingBottom: config.bubblePaddingY,
  };

  return {
    initial: {
      width: "12px",
      height: "12px",
      minWidth: "12px",
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    animate,
    transition: {
      duration: config.motionDuration,
      ease: config.motionEase,
    },
  };
}
