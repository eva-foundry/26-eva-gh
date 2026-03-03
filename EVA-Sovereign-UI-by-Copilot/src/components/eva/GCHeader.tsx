import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GCHeaderProps {
  appName: string;
  profile?: 'canada_gc' | 'usa_gov' | 'uk_gov' | 'australia_gov' | 'nz_gov' | 'spain_gov' | 'italy_gov' | 'germany_gov';
  children?: ReactNode;
  className?: string;
}

export function GCHeader({ appName, profile = 'canada_gc', children, className }: GCHeaderProps) {
  const getProfileConfig = () => {
    switch (profile) {
      case 'canada_gc':
        return { flag: '🇨🇦', name: 'Government of Canada' };
      case 'usa_gov':
        return { flag: '🇺🇸', name: 'United States Government' };
      case 'uk_gov':
        return { flag: '🇬🇧', name: 'UK Government' };
      case 'australia_gov':
        return { flag: '🇦🇺', name: 'Australian Government' };
      case 'nz_gov':
        return { flag: '🇳🇿', name: 'New Zealand Government' };
      case 'spain_gov':
        return { flag: '🇪🇸', name: 'Gobierno de España' };
      case 'italy_gov':
        return { flag: '🇮🇹', name: 'Governo Italiano' };
      case 'germany_gov':
        return { flag: '🇩🇪', name: 'Bundesregierung Deutschland' };
      default:
        return { flag: '🇨🇦', name: 'Government of Canada' };
    }
  };

  const config = getProfileConfig();

  return (
    <header className={cn('border-b bg-card', className)} role="banner">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl" aria-hidden="true">{config.flag}</div>
            <div>
              <div className="text-sm text-muted-foreground font-medium">{config.name}</div>
              <h1 className="text-2xl font-bold tracking-tight">{appName}</h1>
            </div>
          </div>
          {children && (
            <div className="flex items-center gap-3">
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
