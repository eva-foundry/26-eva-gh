/**
 * Responsive breakpoints
 * Mobile-first approach matching Spark implementation
 */

export const breakpoints = {
  // Standard screen sizes
  sm: '640px',   // Small tablets
  md: '768px',   // Tablets
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
  
  // Custom interaction-based breakpoints
  coarse: '(pointer: coarse)',  // Touch devices
  fine: '(pointer: fine)',      // Mouse/trackpad
  pwa: '(display-mode: standalone)', // PWA mode
};

// Media query helpers
export const media = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
  
  coarse: `@media ${breakpoints.coarse}`,
  fine: `@media ${breakpoints.fine}`,
  pwa: `@media ${breakpoints.pwa}`,
  
  // Accessibility preferences
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
  highContrast: '@media (prefers-contrast: high)',
  darkMode: '@media (prefers-color-scheme: dark)',
};

// Container widths
export const containers = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
};
