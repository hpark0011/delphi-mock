// Level Shadow Colors
export interface LevelColors {
  light: string;
  medium: string;
  dark: string;
}

// Neutral grayscale colors for when there's no level (mindScore === 0)
export const NEUTRAL_COLORS: LevelColors = {
  light: "rgba(200,200,200,1)",
  medium: "rgba(150,150,150,0.5)",
  dark: "rgba(100,100,100,1)",
};

const LEVEL_COLORS: Record<string, LevelColors> = {
  Novice: {
    light: "rgba(255,220,100,1)",
    medium: "rgba(255,200,80,0.5)",
    dark: "rgba(200,150,50,1)",
  },
  Skilled: {
    light: "rgba(255,164,102,1)",
    medium: "rgba(255,167,109,0.5)",
    dark: "rgba(205,93,19,1)",
  },
  Expert: {
    light: "rgba(200,150,255,1)",
    medium: "rgba(180,130,240,0.5)",
    dark: "rgba(120,80,180,1)",
  },
  Master: {
    light: "rgba(100,150,255,1)",
    medium: "rgba(80,130,240,0.5)",
    dark: "rgba(50,100,200,1)",
  },
  Sage: {
    light: "rgba(100,220,150,1)",
    medium: "rgba(80,200,130,0.5)",
    dark: "rgba(50,150,100,1)",
  },
  Legendary: {
    light: "rgba(255,215,0,1)",
    medium: "rgba(255,200,50,0.5)",
    dark: "rgba(200,150,0,1)",
  },
  Eternal: {
    light: "rgba(50,80,150,1)",
    medium: "rgba(40,70,130,0.5)",
    dark: "rgba(30,50,100,1)",
  },
};

export function getLevelShadowColors(level: string): LevelColors {
  return LEVEL_COLORS[level] ?? LEVEL_COLORS.Skilled;
}

// Color manipulation helpers
export function adjustRgbaOpacity(
  rgbaString: string,
  newOpacity: number
): string {
  const parsed = parseRgba(rgbaString);
  return `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${newOpacity})`;
}

// Shadow Generators
export function generateShadowString(
  colors: LevelColors,
  isHover = false
): string {
  if (isHover) {
    return `inset_0px_0px_10px_-0px_${colors.light},inset_0px_-10px_40px_-7px_${colors.medium},inset_0px_-15px_70px_-30px_${colors.dark},inset_0px_1px_1px_1px_rgba(255,255,255,0.1),_0_0_0_0.5px_rgba(0,0,0,0.05),0_5px_10px_-5px_rgba(0,0,0,0.4)`;
  }
  return `inset_0px_0px_20px_-8px_${colors.light},inset_0px_-10px_60px_-7px_${colors.medium},inset_0px_-30px_90px_-30px_${colors.dark},inset_0px_1px_1px_1px_rgba(255,255,255,0.1),_0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.4)`;
}

export function generateSmallWidgetShadowString(colors: LevelColors): string {
  return `inset_0_1px_8px_-2px_${colors.light},inset_0_-4px_6px_-2px_${colors.medium},inset_0_-13px_24px_-14px_${colors.dark},_0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.3),0_1px_1px_0_rgba(0,0,0,0.15),_inset_0_0_6px_0_rgba(255,255,255,0.1)`;
}

/**
 * DropShadowConfig is a configuration object for the drop shadow.
 * @param offset - The offset of the shadow.
 * @param blur - The blur of the shadow.
 * @param spread - The spread of the shadow.
 * @param colorKey - The key of the color in the LevelColors object.
 * @param opacity - The opacity of the shadow.
 */
interface DropShadowConfig {
  offset: number;
  blur: number;
  spread: number;
  colorKey: keyof LevelColors;
  opacity: number;
}

const SMALL_DROP_SHADOW_LAYERS: DropShadowConfig[] = [
  { offset: 2, blur: 4, spread: 0, colorKey: "light", opacity: 0.3 },
  { offset: 4, blur: 6, spread: -2, colorKey: "medium", opacity: 0.25 },
  { offset: 8, blur: 10, spread: -4, colorKey: "dark", opacity: 0.15 },
  { offset: 12, blur: 14, spread: -6, colorKey: "dark", opacity: 0.2 },
];

const DEFAULT_DROP_SHADOW_LAYERS: DropShadowConfig[] = [
  { offset: 3, blur: 6, spread: 0, colorKey: "light", opacity: 0.4 },
  { offset: 8, blur: 8, spread: -4, colorKey: "medium", opacity: 0.3 },
  { offset: 16, blur: 16, spread: -8, colorKey: "dark", opacity: 0.2 },
  { offset: 24, blur: 24, spread: -12, colorKey: "dark", opacity: 0.3 },
];

function buildDropShadowString(
  colors: LevelColors,
  layers: DropShadowConfig[]
): string {
  return layers
    .map(({ offset, blur, spread, colorKey, opacity }) => {
      const color = adjustRgbaOpacity(colors[colorKey], opacity);
      return `0 ${offset}px ${blur}px ${spread}px ${color}`;
    })
    .join(", ");
}

export function generateDropShadow(
  colors: LevelColors,
  isSmall = false
): string {
  const layers = isSmall
    ? SMALL_DROP_SHADOW_LAYERS
    : DEFAULT_DROP_SHADOW_LAYERS;
  return buildDropShadowString(colors, layers);
}

// SVG Shadow Colors (for SVG filters)
export interface SvgShadowColors {
  outerShadow: { r: number; g: number; b: number; a: number };
  midShadow: { r: number; g: number; b: number; a: number };
  highlight: { r: number; g: number; b: number; a: number };
  accent: { r: number; g: number; b: number; a: number };
}

function parseRgba(rgbaString: string): {
  r: number;
  g: number;
  b: number;
  a: number;
} {
  const match = rgbaString.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
  );
  if (!match) {
    throw new Error(`Invalid rgba string: ${rgbaString}`);
  }
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
    a: match[4] ? parseFloat(match[4]) : 1,
  };
}

export function getLevelSvgShadowColors(level: string): SvgShadowColors {
  const colors = getLevelShadowColors(level);
  const darkRgba = parseRgba(colors.dark);
  const mediumRgba = parseRgba(colors.medium);
  const lightRgba = parseRgba(colors.light);

  return {
    outerShadow: { r: darkRgba.r, g: darkRgba.g, b: darkRgba.b, a: 1.0 },
    midShadow: { r: mediumRgba.r, g: mediumRgba.g, b: mediumRgba.b, a: 0.3 },
    highlight: { r: 255, g: 255, b: 255, a: 0.3 },
    accent: { r: lightRgba.r, g: lightRgba.g, b: lightRgba.b, a: 0.15 },
  };
}
