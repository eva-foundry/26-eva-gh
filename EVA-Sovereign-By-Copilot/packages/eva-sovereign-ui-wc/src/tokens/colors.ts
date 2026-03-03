/**
 * Government of Canada Design System Colors
 * Reference: https://design-system.alpha.canada.ca/en/start-to-use/
 */

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

export type SovereignProfile = keyof typeof sovereignColors;
