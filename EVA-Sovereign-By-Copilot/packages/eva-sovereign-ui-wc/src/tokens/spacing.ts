/**
 * Government of Canada Design System Spacing
 * 8px grid system
 */

export const gcSpacing = {
  // Base unit
  unit: 8,
  
  // Spacing scale
  xs: '8px',   // 1x
  sm: '16px',  // 2x
  md: '24px',  // 3x
  lg: '32px',  // 4x
  xl: '48px',  // 6x
  xxl: '64px', // 8x
  
  // Component-specific spacing
  buttonPadding: '12px 24px',
  inputPadding: '8px 12px',
  cardPadding: '24px',
  containerPadding: '16px',
  
  // Touch targets (WCAG 2.2 AAA)
  touchTarget: '44px',
  touchTargetSmall: '32px',
};

// Layout spacing
export const gcLayout = {
  maxWidth: '1200px',
  contentMaxWidth: '65ch', // GC requirement: 65 character max line length
  sidebarWidth: '300px',
  headerHeight: '64px',
  footerMinHeight: '200px',
};

// Border radius
export const gcBorderRadius = {
  none: '0',
  sm: '2px',
  md: '4px',
  lg: '8px',
  full: '9999px',
};
