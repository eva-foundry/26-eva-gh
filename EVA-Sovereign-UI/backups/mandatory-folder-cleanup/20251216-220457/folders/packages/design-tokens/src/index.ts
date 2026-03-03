/**
 * GC Design System Tokens
 * Source: https://design.canada.ca/
 * Government of Canada official design tokens
 */

export const gcColors = {
  // Official FIP colors
  fipRed: '#af3c43',
  linkBlue: '#284162',
  errorRed: '#d3080c',
  accentBlue: '#26374A',
  
  // Text colors
  textPrimary: '#333333',
  textSecondary: '#666666',
  textDisabled: '#999999',
  textInverse: '#ffffff',
  
  // Background colors
  backgroundPrimary: '#ffffff',
  backgroundSecondary: '#f5f5f5',
  backgroundTertiary: '#e1e4e7',
  
  // Status colors (WCAG 2.2 AAA compliant)
  successGreen: '#278400',
  warningYellow: '#ff9900',
  infoCyan: '#269abc',
  dangerRed: '#d3080c',
  
  // Focus and interaction
  focusOutline: '#26374A',
  hoverBackground: '#e8e8e8',
  activeBackground: '#d9d9d9',
} as const;

export const gcTypography = {
  // Font families (self-hosted, not CDN)
  fontFamilyHeadings: 'Lato, sans-serif',
  fontFamilyBody: 'Noto Sans, sans-serif',
  fontFamilyMono: 'Courier New, monospace',
  
  // Font weights
  fontWeightRegular: 400,
  fontWeightBold: 700,
  
  // Font sizes (rem units)
  fontSizeXs: '0.75rem',    // 12px
  fontSizeSm: '0.875rem',   // 14px
  fontSizeBase: '1rem',     // 16px
  fontSizeMd: '1.125rem',   // 18px
  fontSizeLg: '1.25rem',    // 20px
  fontSizeXl: '1.5rem',     // 24px
  fontSize2xl: '2rem',      // 32px
  fontSize3xl: '2.5rem',    // 40px
  
  // Line heights
  lineHeightTight: 1.2,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.75,
  
  // Letter spacing
  letterSpacingNormal: '0',
  letterSpacingWide: '0.025em',
} as const;

export const gcSpacing = {
  // 8px grid system
  space0: '0',
  space1: '0.25rem',  // 4px
  space2: '0.5rem',   // 8px
  space3: '0.75rem',  // 12px
  space4: '1rem',     // 16px
  space5: '1.25rem',  // 20px
  space6: '1.5rem',   // 24px
  space8: '2rem',     // 32px
  space10: '2.5rem',  // 40px
  space12: '3rem',    // 48px
  space16: '4rem',    // 64px
  space20: '5rem',    // 80px
} as const;

export const gcShadows = {
  shadowSm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  shadowBase: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  shadowXl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
} as const;

export const gcBreakpoints = {
  xs: '320px',   // Mobile small
  sm: '576px',   // Mobile
  md: '768px',   // Tablet
  lg: '992px',   // Desktop
  xl: '1200px',  // Desktop large
  xxl: '1400px', // Desktop extra large
} as const;

export const gcAccessibility = {
  // WCAG 2.2 AAA requirements
  contrastRatioAAA: 7,
  contrastRatioAA: 4.5,
  
  // Touch targets (44px minimum)
  touchTargetMin: '44px',
  
  // Focus outline
  focusOutlineWidth: '3px',
  focusOutlineStyle: 'solid',
  focusOutlineOffset: '2px',
  
  // Animation (respect prefers-reduced-motion)
  transitionDuration: '200ms',
  transitionTimingFunction: 'ease-in-out',
} as const;

export const gcLayout = {
  // Max line length (65 characters)
  maxLineLength: '65ch',
  
  // Container widths
  containerSm: '640px',
  containerMd: '768px',
  containerLg: '1024px',
  containerXl: '1280px',
  
  // Border radius
  radiusNone: '0',
  radiusSm: '0.125rem',  // 2px
  radiusBase: '0.25rem', // 4px
  radiusMd: '0.375rem',  // 6px
  radiusLg: '0.5rem',    // 8px
  radiusFull: '9999px',
  
  // Border widths
  borderWidth0: '0',
  borderWidth1: '1px',
  borderWidth2: '2px',
  borderWidth4: '4px',
} as const;

// Export all tokens as a single object
export const gcDesignTokens = {
  colors: gcColors,
  typography: gcTypography,
  spacing: gcSpacing,
  shadows: gcShadows,
  breakpoints: gcBreakpoints,
  accessibility: gcAccessibility,
  layout: gcLayout,
} as const;

// Type exports
export type GCColors = typeof gcColors;
export type GCTypography = typeof gcTypography;
export type GCSpacing = typeof gcSpacing;
export type GCShadows = typeof gcShadows;
export type GCBreakpoints = typeof gcBreakpoints;
export type GCAccessibility = typeof gcAccessibility;
export type GCLayout = typeof gcLayout;
export type GCDesignTokens = typeof gcDesignTokens;
