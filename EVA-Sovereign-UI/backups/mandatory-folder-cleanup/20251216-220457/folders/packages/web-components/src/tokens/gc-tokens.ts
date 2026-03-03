/**
 * GC Design System Tokens
 * Official Government of Canada Design System tokens
 * Source: https://design.canada.ca/
 * 
 * @module gc-tokens
 */

/**
 * GC Design System color, typography, spacing, and other design tokens
 */
export const gcTokens = {
  colors: {
    // Primary Colors
    'gc-link-blue': '#284162',        // Link text (WCAG AAA on white)
    'gc-fip-red': '#af3c43',          // Flag & Canada wordmark
    'gc-error-red': '#d3080c',        // Error messages
    'gc-accent-navy': '#26374a',      // Accent/secondary elements
    'gc-text-default': '#333',        // Body text
    'gc-text-secondary': '#666',      // Secondary text
    'gc-background-white': '#fff',    // Primary background
    'gc-background-light': '#f5f5f5', // Light grey background
    'gc-background-dark': '#333',     // Dark backgrounds
    'gc-border-default': '#ccc',      // Default borders
    'gc-border-light': '#e1e4e7',     // Light borders
    
    // Status Colors
    'gc-success': '#278400',          // Success messages (WCAG AAA)
    'gc-warning': '#ff9900',          // Warning messages
    'gc-info': '#269abc',             // Info messages
    
    // Interactive States
    'gc-focus-outline': '#284162',    // Focus indicator
    'gc-hover-blue': '#0535d2',       // Hover state for links
    'gc-visited-purple': '#7834bc'    // Visited links
  },

  typography: {
    // Font Families
    'font-family-headings': '"Lato", sans-serif',
    'font-family-body': '"Noto Sans", sans-serif',
    
    // Font Weights
    'font-weight-regular': '400',
    'font-weight-bold': '700',
    
    // Font Sizes (responsive, rem-based)
    'font-size-h1': 'clamp(2rem, 5vw, 2.5rem)',    // 32-40px
    'font-size-h2': 'clamp(1.5rem, 4vw, 2rem)',    // 24-32px
    'font-size-h3': 'clamp(1.25rem, 3vw, 1.5rem)', // 20-24px
    'font-size-h4': '1.125rem',                     // 18px
    'font-size-h5': '1rem',                         // 16px
    'font-size-h6': '0.875rem',                     // 14px
    'font-size-body': '1rem',                       // 16px (base)
    'font-size-small': '0.875rem',                  // 14px
    'font-size-tiny': '0.75rem',                    // 12px
    
    // Line Heights
    'line-height-tight': '1.2',
    'line-height-normal': '1.5',
    'line-height-relaxed': '1.7'
  },

  spacing: {
    // 8px grid system
    'spacing-0': '0',
    'spacing-1': '0.25rem',  // 4px
    'spacing-2': '0.5rem',   // 8px
    'spacing-3': '0.75rem',  // 12px
    'spacing-4': '1rem',     // 16px
    'spacing-5': '1.5rem',   // 24px
    'spacing-6': '2rem',     // 32px
    'spacing-7': '2.5rem',   // 40px
    'spacing-8': '3rem',     // 48px
    'spacing-9': '4rem',     // 64px
    'spacing-10': '5rem'     // 80px
  },

  shadows: {
    'shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    'shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  },

  borderRadius: {
    'radius-none': '0',
    'radius-sm': '0.125rem',  // 2px
    'radius-md': '0.25rem',   // 4px
    'radius-lg': '0.5rem',    // 8px
    'radius-full': '9999px'   // Fully rounded
  },

  breakpoints: {
    'mobile': '375px',   // Small phones
    'tablet': '768px',   // Tablets
    'desktop': '1024px', // Small desktops
    'wide': '1440px'     // Large desktops
  },

  a11y: {
    // WCAG 2.2 AAA Requirements
    'contrast-ratio-aaa': '7:1',        // Text contrast
    'touch-target-min': '44px',         // Minimum touch target
    'focus-outline-width': '3px',       // Focus indicator
    'animation-duration-max': '500ms'   // Max animation time
  }
} as const;

/**
 * Type for token categories
 */
export type TokenCategory = keyof typeof gcTokens;

/**
 * Type for color tokens
 */
export type ColorToken = keyof typeof gcTokens.colors;

/**
 * Type for typography tokens
 */
export type TypographyToken = keyof typeof gcTokens.typography;

/**
 * Type for spacing tokens
 */
export type SpacingToken = keyof typeof gcTokens.spacing;

/**
 * Convert tokens to CSS custom properties
 * @returns CSS string with all custom properties defined in :root
 */
export function generateCSSVariables(): string {
  const css: string[] = [':root {'];
  
  Object.entries(gcTokens).forEach(([category, tokens]) => {
    Object.entries(tokens).forEach(([key, value]) => {
      css.push(`  --eva-${category}-${key}: ${value};`);
    });
  });
  
  css.push('}');
  return css.join('\n');
}

/**
 * Get a specific token value
 * @param category Token category (colors, typography, spacing, etc.)
 * @param key Token key within category
 * @returns Token value or undefined if not found
 */
export function getToken(category: TokenCategory, key: string): string | undefined {
  const categoryTokens = gcTokens[category] as Record<string, string>;
  return categoryTokens[key];
}
