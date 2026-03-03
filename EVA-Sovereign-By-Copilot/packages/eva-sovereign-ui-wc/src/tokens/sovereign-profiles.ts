/**
 * Five Eyes Sovereign Profiles
 * Official branding for Canada, USA, UK, Australia, New Zealand
 */

export interface SovereignProfile {
  id: string;
  name: string;
  nameFr?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
  assets: {
    wordmark?: string;
    logo: string;
    flag: string;
    seal?: string;
  };
  footer: {
    copyright: string;
    links: Array<{ label: string; url: string }>;
  };
  locale: {
    primary: string;
    secondary?: string;
  };
}

export const sovereignProfiles: Record<string, SovereignProfile> = {
  canada_gc: {
    id: 'canada_gc',
    name: 'Government of Canada',
    nameFr: 'Gouvernement du Canada',
    colors: {
      primary: '#26374A',
      secondary: '#284162',
      accent: '#A62A1E',
      text: '#333',
    },
    assets: {
      wordmark: '/assets/canada-wordmark.svg',
      logo: '/assets/canada-logo.svg',
      flag: '/assets/canada-flag.svg',
    },
    footer: {
      copyright: '© His Majesty the King in Right of Canada',
      links: [
        { label: 'Privacy', url: 'https://canada.ca/en/transparency/privacy' },
        { label: 'Terms and conditions', url: 'https://canada.ca/en/transparency/terms' },
        { label: 'Accessibility', url: 'https://canada.ca/en/accessibility' },
        { label: 'Canada.ca', url: 'https://canada.ca' },
      ],
    },
    locale: {
      primary: 'en-CA',
      secondary: 'fr-CA',
    },
  },
  
  usa_gov: {
    id: 'usa_gov',
    name: 'U.S. Government',
    colors: {
      primary: '#002868',
      secondary: '#BF0A30',
      accent: '#FFFFFF',
      text: '#1b1b1b',
    },
    assets: {
      logo: '/assets/usa-seal.svg',
      flag: '/assets/usa-flag.svg',
      seal: '/assets/usa-seal.svg',
    },
    footer: {
      copyright: 'An official website of the United States government',
      links: [
        { label: 'Privacy Policy', url: 'https://www.usa.gov/privacy' },
        { label: 'Accessibility', url: 'https://www.usa.gov/accessibility' },
        { label: 'USA.gov', url: 'https://www.usa.gov' },
      ],
    },
    locale: {
      primary: 'en-US',
    },
  },
  
  uk_gov: {
    id: 'uk_gov',
    name: 'UK Government',
    colors: {
      primary: '#012169',
      secondary: '#C8102E',
      accent: '#FFFFFF',
      text: '#0b0c0c',
    },
    assets: {
      logo: '/assets/uk-crown.svg',
      flag: '/assets/uk-flag.svg',
    },
    footer: {
      copyright: '© Crown copyright',
      links: [
        { label: 'Privacy', url: 'https://www.gov.uk/help/privacy-notice' },
        { label: 'Cookies', url: 'https://www.gov.uk/help/cookies' },
        { label: 'Accessibility', url: 'https://www.gov.uk/help/accessibility-statement' },
        { label: 'GOV.UK', url: 'https://www.gov.uk' },
      ],
    },
    locale: {
      primary: 'en-GB',
    },
  },
  
  australia_gov: {
    id: 'australia_gov',
    name: 'Australian Government',
    colors: {
      primary: '#00008B',
      secondary: '#FFCD00',
      accent: '#FF0000',
      text: '#313131',
    },
    assets: {
      logo: '/assets/australia-coat-of-arms.svg',
      flag: '/assets/australia-flag.svg',
    },
    footer: {
      copyright: '© Commonwealth of Australia',
      links: [
        { label: 'Privacy', url: 'https://www.australia.gov.au/privacy' },
        { label: 'Accessibility', url: 'https://www.australia.gov.au/accessibility' },
        { label: 'Australia.gov.au', url: 'https://www.australia.gov.au' },
      ],
    },
    locale: {
      primary: 'en-AU',
    },
  },
  
  nz_gov: {
    id: 'nz_gov',
    name: 'New Zealand Government',
    colors: {
      primary: '#00247D',
      secondary: '#CC142B',
      accent: '#FFFFFF',
      text: '#212121',
    },
    assets: {
      logo: '/assets/nz-fern.svg',
      flag: '/assets/nz-flag.svg',
    },
    footer: {
      copyright: '© New Zealand Government',
      links: [
        { label: 'Privacy', url: 'https://www.govt.nz/privacy' },
        { label: 'Accessibility', url: 'https://www.govt.nz/accessibility' },
        { label: 'Govt.nz', url: 'https://www.govt.nz' },
      ],
    },
    locale: {
      primary: 'en-NZ',
    },
  },
};

export function getProfile(profileId: string): SovereignProfile {
  return sovereignProfiles[profileId] || sovereignProfiles.canada_gc;
}

export function getAllProfiles(): SovereignProfile[] {
  return Object.values(sovereignProfiles);
}
