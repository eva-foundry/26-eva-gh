/**
 * Government of Canada Design System Spacing
 * Enhanced 8px grid system with Tailwind-inspired scale
 */

export const gcSpacing = {
  // Base unit
  unit: 8,
  
  // Fine-grained spacing scale (matching Spark/Tailwind)
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  
  // Legacy aliases (kept for backward compatibility)
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
  containerPadding: '2rem',  // Updated to match Spark
  
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

// Border radius (updated to match Spark values)
export const gcBorderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  md: '0.375rem',   // 6px (updated)
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
};

// Spacing helper for CSS
export const spacingCSS = (scale: keyof typeof gcSpacing): string => {
  const result = gcSpacing[scale] || gcSpacing['4'];
  return typeof result === 'number' ? `${result}px` : result;
};
