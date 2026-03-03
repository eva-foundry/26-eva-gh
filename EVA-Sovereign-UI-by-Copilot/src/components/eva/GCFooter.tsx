import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GCFooterProps {
  profile?: 'canada_gc' | 'usa_gov' | 'uk_gov' | 'australia_gov' | 'nz_gov' | 'spain_gov' | 'italy_gov' | 'germany_gov';
  legalText?: string;
  links?: Array<{ label: string; url: string }>;
  className?: string;
}

export function GCFooter({ profile = 'canada_gc', legalText, links, className }: GCFooterProps) {
  const getDefaultConfig = () => {
    switch (profile) {
      case 'canada_gc':
        return {
          legal: '© His Majesty the King in Right of Canada',
          links: [
            { label: 'Privacy', url: 'https://www.canada.ca/en/transparency/privacy.html' },
            { label: 'Terms', url: 'https://www.canada.ca/en/transparency/terms.html' },
            { label: 'Accessibility', url: 'https://www.canada.ca/en/accessibility.html' },
            { label: 'Canada.ca', url: 'https://www.canada.ca' },
          ]
        };
      case 'usa_gov':
        return {
          legal: 'An official website of the United States government',
          links: [
            { label: 'Privacy', url: 'https://www.usa.gov/privacy' },
            { label: 'Accessibility', url: 'https://www.usa.gov/accessibility' },
            { label: 'USA.gov', url: 'https://www.usa.gov' },
          ]
        };
      case 'uk_gov':
        return {
          legal: '© Crown copyright',
          links: [
            { label: 'Privacy', url: 'https://www.gov.uk/privacy' },
            { label: 'Cookies', url: 'https://www.gov.uk/cookies' },
            { label: 'Accessibility', url: 'https://www.gov.uk/accessibility' },
          ]
        };
      case 'australia_gov':
        return {
          legal: '© Commonwealth of Australia',
          links: [
            { label: 'Privacy', url: 'https://www.australia.gov.au/privacy' },
            { label: 'Accessibility', url: 'https://www.australia.gov.au/accessibility' },
          ]
        };
      case 'nz_gov':
        return {
          legal: '© Crown Copyright',
          links: [
            { label: 'Privacy', url: 'https://www.govt.nz/privacy' },
            { label: 'Accessibility', url: 'https://www.govt.nz/accessibility' },
          ]
        };
      case 'spain_gov':
        return {
          legal: '© Gobierno de España',
          links: [
            { label: 'Privacidad', url: 'https://www.lamoncloa.gob.es/paginas/privacidad.aspx' },
            { label: 'Accesibilidad', url: 'https://www.lamoncloa.gob.es/paginas/accesibilidad.aspx' },
          ]
        };
      case 'italy_gov':
        return {
          legal: '© Repubblica Italiana',
          links: [
            { label: 'Privacy', url: 'https://www.governo.it/it/privacy-policy' },
            { label: 'Accessibilità', url: 'https://www.governo.it/it/accessibilita' },
          ]
        };
      case 'germany_gov':
        return {
          legal: '© Bundesrepublik Deutschland',
          links: [
            { label: 'Datenschutz', url: 'https://www.bundesregierung.de/breg-de/service/datenschutzhinweis' },
            { label: 'Barrierefreiheit', url: 'https://www.bundesregierung.de/breg-de/service/erklaerung-zur-barrierefreiheit' },
          ]
        };
      default:
        return {
          legal: '© His Majesty the King in Right of Canada',
          links: []
        };
    }
  };

  const config = getDefaultConfig();
  const displayLegal = legalText || config.legal;
  const displayLinks = links || config.links;

  return (
    <footer className={cn('border-t bg-muted/30 mt-auto', className)} role="contentinfo">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-sm text-muted-foreground">{displayLegal}</p>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-4">
              {displayLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded-sm px-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
