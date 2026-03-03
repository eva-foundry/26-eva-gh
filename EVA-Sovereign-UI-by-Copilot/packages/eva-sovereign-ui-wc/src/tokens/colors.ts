/**
 * Government of Canada Design System Colors
 * Modern oklch() color space for smooth transitions and accessibility
 * Reference: https://design-system.alpha.canada.ca/en/start-to-use/
 */

// Base semantic colors using oklch() for better color manipulation
export const modernColors = {
  // Background & foreground
  background: 'oklch(1 0 0)',
  foreground: 'oklch(0.25 0 0)',
  
  // Card & popover surfaces
  card: 'oklch(1 0 0)',
  cardForeground: 'oklch(0.25 0 0)',
  popover: 'oklch(1 0 0)',
  popoverForeground: 'oklch(0.25 0 0)',
  
  // Primary brand color (GC dark blue)
  primary: 'oklch(0.30 0.04 250)',
  primaryForeground: 'oklch(0.98 0 0)',
  
  // Secondary brand color
  secondary: 'oklch(0.32 0.04 245)',
  secondaryForeground: 'oklch(0.98 0 0)',
  
  // Accent color (for highlights)
  accent: 'oklch(0.45 0.08 10)',
  accentForeground: 'oklch(0.98 0 0)',
  
  // Destructive/error state
  destructive: 'oklch(0.55 0.22 25)',
  destructiveForeground: 'oklch(0.98 0 0)',
  
  // Muted backgrounds
  muted: 'oklch(0.96 0.005 250)',
  mutedForeground: 'oklch(0.50 0.01 250)',
  
  // Borders & inputs
  border: 'oklch(0.90 0.005 250)',
  input: 'oklch(0.90 0.005 250)',
  
  // Focus ring
  ring: 'oklch(0.35 0.06 250)',
};

// Legacy hex colors for fallback (kept for backward compatibility)
export const gcColors = {
  // Text colors
  text: '#333',
  textLight: '#666',
  textWhite: '#fff',
  
  // Link colors
  linkBlue: '#284162',
  linkHover: '#0535d2',
  linkVisited: '#7834bc',
  linkFocus: '#0535d2',
  
  // Brand colors
  accent: '#26374A',
  accentLight: '#335075',
  
  // Status colors
  errorRed: '#d3080c',
  errorLight: '#f3e9e8',
  successGreen: '#278400',
  successLight: '#d8eeca',
  warningYellow: '#ff9900',
  warningLight: '#f9f4d4',
  infoBlue: '#269abc',
  infoLight: '#d7faff',
  
  // UI colors
  h1Bar: '#A62A1E',
  background: '#fff',
  backgroundGrey: '#f5f5f5',
  border: '#ccc',
  borderLight: '#e0e0e0',
  borderDark: '#999',
  
  // Focus colors (WCAG 2.2 AAA)
  focusOutline: '#0535d2',
  focusOutlineContrast: '#000',
  
  // Disabled states
  disabled: '#999',
  disabledBackground: '#e0e0e0',
};

// Five Eyes sovereign profiles
export const sovereignColors = {
  canada: {
    primary: '#26374A',
    secondary: '#284162',
    accent: '#A62A1E',
    flag: '#FF0000',
  },
  usa: {
    primary: '#002868',
    secondary: '#BF0A30',
    accent: '#FFFFFF',
    flag: '#3C3B6E',
  },
  uk: {
    primary: '#012169',
    secondary: '#C8102E',
    accent: '#FFFFFF',
    flag: '#012169',
  },
  australia: {
    primary: '#00008B',
    secondary: '#FFCD00',
    accent: '#FF0000',
    flag: '#00008B',
  },
  newZealand: {
    primary: '#00247D',
    secondary: '#CC142B',
    accent: '#FFFFFF',
    flag: '#00247D',
  },
};

export type SovereignColorKey = keyof typeof sovereignColors;

// Helper function to generate hover states using color-mix
export const generateHoverColor = (baseColor: string, mixAmount: number = 10): string => {
  return `color-mix(in srgb, ${baseColor} ${100 - mixAmount}%, black ${mixAmount}%)`;
};

// Helper function to generate disabled states
export const generateDisabledColor = (baseColor: string): string => {
  return `color-mix(in srgb, ${baseColor} 50%, transparent)`;
};
