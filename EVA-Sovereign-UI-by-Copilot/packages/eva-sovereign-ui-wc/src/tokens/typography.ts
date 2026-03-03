/**
 * Government of Canada Design System Typography
 * Enhanced with modern font scales and responsive sizing
 * Reference: https://design-system.alpha.canada.ca/en/start-to-use/
 */

export const gcTypography = {
  // Font families (matching Spark implementation)
  fontHeading: '"Lato", sans-serif',
  fontBody: '"Noto Sans", system-ui, -apple-system, sans-serif',
  fontMono: '"JetBrains Mono", "Courier New", Courier, monospace',
  
  // Font sizes (GC Design System scale)
  sizeH1: '41px',
  sizeH2: '32px',
  sizeH3: '24px',  // Updated to match Spark
  sizeH4: '22px',
  sizeH5: '19px',
  sizeH6: '19px',
  sizeBody: '20px',
  sizeBodySmall: '17px',
  sizeBodyLarge: '24px',
  
  // Line heights (optimized for readability)
  lineHeight: 1.5,
  lineHeightH1: 1.2,  // New: Tighter for large headings
  lineHeightH2: 1.3,  // New: Slightly tighter
  lineHeightH3: 1.4,  // New: Moderate spacing
  lineHeightTight: 1.3,
  lineHeightLoose: 1.7,
  
  // Font weights
  weightNormal: 400,
  weightBold: 700,
  
  // Letter spacing
  letterSpacing: 'normal',
  letterSpacingWide: '0.02em',
  
  // Max line length (WCAG recommendation)
  maxLineLength: '65ch',
};

// Google Fonts import URLs
export const fontImports = {
  lato: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap',
  notoSans: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap',
  jetBrainsMono: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap',
};

// Typography CSS helper for Shadow DOM
export const typographyCSS = `
  body, :host {
    font-family: ${gcTypography.fontBody};
    font-size: ${gcTypography.sizeBody};
    line-height: ${gcTypography.lineHeight};
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${gcTypography.fontHeading};
    font-weight: ${gcTypography.weightBold};
  }
  
  h1 {
    font-size: ${gcTypography.sizeH1};
    line-height: ${gcTypography.lineHeightH1};
  }
  
  h2 {
    font-size: ${gcTypography.sizeH2};
    line-height: ${gcTypography.lineHeightH2};
  }
  
  h3 {
    font-size: ${gcTypography.sizeH3};
    line-height: ${gcTypography.lineHeightH3};
  }
  
  code, pre, .font-mono {
    font-family: ${gcTypography.fontMono};
  }
  
  .max-line-length {
    max-width: ${gcTypography.maxLineLength};
  }
`;
