/**
 * Sovereign Profile System
 * GC Design System tokens as CSS custom properties
 * Allows runtime theming and profile switching
 */

export interface SovereignProfile {
  id: string;
  name: string;
  colors: Record<string, string>;
  typography: Record<string, string | number>;
  spacing: Record<string, string>;
  shadows: Record<string, string>;
  breakpoints: Record<string, string>;
  accessibility: Record<string, string | number>;
  layout: Record<string, string>;
}

/**
 * GC Design System profile (default)
 */
export const gcProfile: SovereignProfile = {
  id: 'canada-gc',
  name: 'Government of Canada',
  colors: {
    fipRed: '#af3c43',
    linkBlue: '#284162',
    errorRed: '#d3080c',
    accentBlue: '#26374A',
    textPrimary: '#333333',
    textSecondary: '#666666',
    textDisabled: '#999999',
    textInverse: '#ffffff',
    backgroundPrimary: '#ffffff',
    backgroundSecondary: '#f5f5f5',
    backgroundTertiary: '#e1e4e7',
    successGreen: '#278400',
    warningYellow: '#ff9900',
    infoCyan: '#269abc',
    dangerRed: '#d3080c',
    focusOutline: '#26374A',
    hoverBackground: '#e8e8e8',
    activeBackground: '#d9d9d9',
  },
  typography: {
    fontFamilyHeadings: 'Lato, sans-serif',
    fontFamilyBody: 'Noto Sans, sans-serif',
    fontFamilyMono: 'Courier New, monospace',
    fontWeightRegular: 400,
    fontWeightBold: 700,
    fontSizeXs: '0.75rem',
    fontSizeSm: '0.875rem',
    fontSizeBase: '1rem',
    fontSizeMd: '1.125rem',
    fontSizeLg: '1.25rem',
    fontSizeXl: '1.5rem',
    fontSize2xl: '2rem',
    fontSize3xl: '2.5rem',
    lineHeightTight: 1.2,
    lineHeightNormal: 1.5,
    lineHeightRelaxed: 1.75,
    letterSpacingNormal: '0',
    letterSpacingWide: '0.025em',
  },
  spacing: {
    space0: '0',
    space1: '0.25rem',
    space2: '0.5rem',
    space3: '0.75rem',
    space4: '1rem',
    space5: '1.25rem',
    space6: '1.5rem',
    space8: '2rem',
    space10: '2.5rem',
    space12: '3rem',
    space16: '4rem',
    space20: '5rem',
  },
  shadows: {
    shadowSm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    shadowBase: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    shadowXl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
  accessibility: {
    contrastRatioAAA: 7,
    contrastRatioAA: 4.5,
    touchTargetMin: '44px',
    focusOutlineWidth: '3px',
    focusOutlineStyle: 'solid',
    focusOutlineOffset: '2px',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-in-out',
  },
  layout: {
    maxLineLength: '65ch',
    containerSm: '640px',
    containerMd: '768px',
    containerLg: '1024px',
    containerXl: '1280px',
    radiusNone: '0',
    radiusSm: '0.125rem',
    radiusBase: '0.25rem',
    radiusMd: '0.375rem',
    radiusLg: '0.5rem',
    radiusFull: '9999px',
    borderWidth0: '0',
    borderWidth1: '1px',
    borderWidth2: '2px',
    borderWidth4: '4px',
  },
};

/**
 * Apply sovereign profile as CSS custom properties to document root
 * @param profile Sovereign profile to apply
 */
export function applySovereignProfile(profile: SovereignProfile): void {
  const root = document.documentElement;

  // Apply colors
  Object.entries(profile.colors).forEach(([key, value]) => {
    root.style.setProperty(`--gc-color-${kebabCase(key)}`, String(value));
  });

  // Apply typography
  Object.entries(profile.typography).forEach(([key, value]) => {
    root.style.setProperty(`--gc-typography-${kebabCase(key)}`, String(value));
  });

  // Apply spacing
  Object.entries(profile.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--gc-spacing-${kebabCase(key)}`, String(value));
  });

  // Apply shadows
  Object.entries(profile.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--gc-shadow-${kebabCase(key)}`, String(value));
  });

  // Apply breakpoints
  Object.entries(profile.breakpoints).forEach(([key, value]) => {
    root.style.setProperty(`--gc-breakpoint-${kebabCase(key)}`, String(value));
  });

  // Apply accessibility
  Object.entries(profile.accessibility).forEach(([key, value]) => {
    root.style.setProperty(`--gc-a11y-${kebabCase(key)}`, String(value));
  });

  // Apply layout
  Object.entries(profile.layout).forEach(([key, value]) => {
    root.style.setProperty(`--gc-layout-${kebabCase(key)}`, String(value));
  });
}

/**
 * Convert camelCase to kebab-case
 * @param str String to convert
 * @returns Kebab-case string
 */
function kebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Initialize GC Design System profile
 * Call this once on app load
 */
export function initGCProfile(): void {
  applySovereignProfile(gcProfile);
}

// Auto-initialize on module load
if (typeof document !== 'undefined') {
  initGCProfile();
}
