import { cn } from '@/lib/utils';
import { GCContainer } from './GCContainer';

interface GCFooterLink {
  label: string;
  href: string;
}

interface GCFooterProps {
  links?: GCFooterLink[];
  className?: string;
}

const defaultLinks: GCFooterLink[] = [
  { label: 'Social media', href: '#' },
  { label: 'Mobile applications', href: '#' },
  { label: 'About Canada.ca', href: '#' },
  { label: 'Terms and conditions', href: '#' },
  { label: 'Privacy', href: '#' },
];

export function GCFooter({ links = defaultLinks, className }: GCFooterProps) {
  return (
    <footer className={cn('bg-muted border-t border-border mt-auto', className)}>
      <GCContainer>
        <div className="py-8">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-foreground hover:underline focus:outline-none focus:ring-3 focus:ring-ring rounded px-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <img
                src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms-blk.svg"
                alt="Symbol of the Government of Canada"
                className="h-8"
              />
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Government of Canada
              </p>
            </div>
          </div>
        </div>
      </GCContainer>
    </footer>
  );
}
