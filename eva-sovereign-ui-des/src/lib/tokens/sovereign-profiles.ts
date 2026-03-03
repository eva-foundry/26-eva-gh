import { gcColors, usaColors, ukColors, australiaColors, nzColors, spainColors, italyColors, germanyColors } from './colors';

export interface SovereignProfile {
  id: string;
  name: string;
  nameShort: string;
  flag: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  legalText: string;
  links: {
    label: string;
    url: string;
  }[];
  defaultLocale: string;
  availableLocales: string[];
}

export const sovereignProfiles: Record<string, SovereignProfile> = {
  canada_gc: {
    id: 'canada_gc',
    name: 'Government of Canada',
    nameShort: 'Canada',
    flag: '🇨🇦',
    colors: {
      primary: gcColors.accent,
      secondary: gcColors.linkBlue,
      accent: gcColors.h1Bar,
      background: gcColors.background,
      text: gcColors.text,
    },
    legalText: '© His Majesty the King in Right of Canada',
    links: [
      { label: 'Privacy', url: 'https://www.canada.ca/en/transparency/privacy.html' },
      { label: 'Terms and conditions', url: 'https://www.canada.ca/en/transparency/terms.html' },
      { label: 'Accessibility', url: 'https://www.canada.ca/en/accessibility.html' },
      { label: 'Canada.ca', url: 'https://www.canada.ca' },
    ],
    defaultLocale: 'en-CA',
    availableLocales: ['en-CA', 'fr-CA'],
  },
  
  usa_gov: {
    id: 'usa_gov',
    name: 'United States Government',
    nameShort: 'USA',
    flag: '🇺🇸',
    colors: {
      primary: usaColors.primary,
      secondary: usaColors.secondary,
      accent: usaColors.accent,
      background: usaColors.background,
      text: usaColors.text,
    },
    legalText: 'An official website of the United States government',
    links: [
      { label: 'Privacy Policy', url: 'https://www.usa.gov/privacy' },
      { label: 'Accessibility', url: 'https://www.usa.gov/accessibility' },
      { label: 'USA.gov', url: 'https://www.usa.gov' },
    ],
    defaultLocale: 'en-US',
    availableLocales: ['en-US', 'es-US'],
  },
  
  uk_gov: {
    id: 'uk_gov',
    name: 'United Kingdom Government',
    nameShort: 'UK',
    flag: '🇬🇧',
    colors: {
      primary: ukColors.primary,
      secondary: ukColors.secondary,
      accent: ukColors.accent,
      background: ukColors.background,
      text: ukColors.text,
    },
    legalText: '© Crown copyright',
    links: [
      { label: 'Privacy', url: 'https://www.gov.uk/privacy' },
      { label: 'Cookies', url: 'https://www.gov.uk/cookies' },
      { label: 'Accessibility', url: 'https://www.gov.uk/accessibility' },
      { label: 'GOV.UK', url: 'https://www.gov.uk' },
    ],
    defaultLocale: 'en-GB',
    availableLocales: ['en-GB'],
  },
  
  australia_gov: {
    id: 'australia_gov',
    name: 'Australian Government',
    nameShort: 'Australia',
    flag: '🇦🇺',
    colors: {
      primary: australiaColors.primary,
      secondary: australiaColors.secondary,
      accent: australiaColors.accent,
      background: australiaColors.background,
      text: australiaColors.text,
    },
    legalText: '© Commonwealth of Australia',
    links: [
      { label: 'Privacy', url: 'https://www.australia.gov.au/privacy' },
      { label: 'Accessibility', url: 'https://www.australia.gov.au/accessibility' },
      { label: 'Australia.gov.au', url: 'https://www.australia.gov.au' },
    ],
    defaultLocale: 'en-AU',
    availableLocales: ['en-AU'],
  },
  
  nz_gov: {
    id: 'nz_gov',
    name: 'New Zealand Government',
    nameShort: 'New Zealand',
    flag: '🇳🇿',
    colors: {
      primary: nzColors.primary,
      secondary: nzColors.secondary,
      accent: nzColors.accent,
      background: nzColors.background,
      text: nzColors.text,
    },
    legalText: '© Crown Copyright',
    links: [
      { label: 'Privacy', url: 'https://www.govt.nz/privacy' },
      { label: 'Accessibility', url: 'https://www.govt.nz/accessibility' },
      { label: 'Govt.nz', url: 'https://www.govt.nz' },
    ],
    defaultLocale: 'en-NZ',
    availableLocales: ['en-NZ'],
  },
  
  spain_gov: {
    id: 'spain_gov',
    name: 'Gobierno de España',
    nameShort: 'España',
    flag: '🇪🇸',
    colors: {
      primary: spainColors.primary,
      secondary: spainColors.secondary,
      accent: spainColors.accent,
      background: spainColors.background,
      text: spainColors.text,
    },
    legalText: '© Gobierno de España',
    links: [
      { label: 'Privacidad', url: 'https://www.lamoncloa.gob.es/paginas/privacidad.aspx' },
      { label: 'Accesibilidad', url: 'https://www.lamoncloa.gob.es/paginas/accesibilidad.aspx' },
      { label: 'Administración.es', url: 'https://administracion.gob.es' },
    ],
    defaultLocale: 'es-ES',
    availableLocales: ['es-ES', 'en-CA'],
  },
  
  italy_gov: {
    id: 'italy_gov',
    name: 'Governo Italiano',
    nameShort: 'Italia',
    flag: '🇮🇹',
    colors: {
      primary: italyColors.primary,
      secondary: italyColors.secondary,
      accent: italyColors.accent,
      background: italyColors.background,
      text: italyColors.text,
    },
    legalText: '© Repubblica Italiana',
    links: [
      { label: 'Privacy', url: 'https://www.governo.it/it/privacy-policy' },
      { label: 'Accessibilità', url: 'https://www.governo.it/it/accessibilita' },
      { label: 'Governo.it', url: 'https://www.governo.it' },
    ],
    defaultLocale: 'it-IT',
    availableLocales: ['it-IT', 'en-CA'],
  },
  
  germany_gov: {
    id: 'germany_gov',
    name: 'Bundesregierung Deutschland',
    nameShort: 'Deutschland',
    flag: '🇩🇪',
    colors: {
      primary: germanyColors.primary,
      secondary: germanyColors.secondary,
      accent: germanyColors.accent,
      background: germanyColors.background,
      text: germanyColors.text,
    },
    legalText: '© Bundesrepublik Deutschland',
    links: [
      { label: 'Datenschutz', url: 'https://www.bundesregierung.de/breg-de/service/datenschutzhinweis' },
      { label: 'Barrierefreiheit', url: 'https://www.bundesregierung.de/breg-de/service/erklaerung-zur-barrierefreiheit' },
      { label: 'Bundesregierung.de', url: 'https://www.bundesregierung.de' },
    ],
    defaultLocale: 'de-DE',
    availableLocales: ['de-DE', 'en-CA'],
  },
};
