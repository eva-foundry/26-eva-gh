import { cn } from '@/lib/utils';
import { useState } from 'react';
import { List, X } from '@phosphor-icons/react';

interface GCTopNavigationItem {
  label: string;
  href: string;
  active?: boolean;
}

interface GCTopNavigationProps {
  items: GCTopNavigationItem[];
  className?: string;
}

export function GCTopNavigation({ items, className }: GCTopNavigationProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <nav
        className={cn('bg-muted border-b border-border', className)}
        aria-label="Main navigation"
      >
        <div className="hidden md:flex items-center justify-center">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                'px-6 py-3 text-sm font-medium transition-colors',
                'hover:bg-background focus:outline-none focus:ring-2 focus:ring-ring',
                item.active
                  ? 'bg-background text-primary border-b-2 border-primary'
                  : 'text-foreground'
              )}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="md:hidden flex items-center justify-between px-4 py-3">
          <span className="text-sm font-medium text-foreground">Menu</span>
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 hover:bg-muted-foreground/10 rounded transition-colors"
            aria-label="Open navigation menu"
          >
            <List size={24} weight="bold" />
          </button>
        </div>
      </nav>

      {isMobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="md:hidden fixed inset-y-0 right-0 w-80 max-w-full bg-card border-l border-border z-50 overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-lg font-bold text-foreground">Menu</span>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 hover:bg-muted rounded transition-colors"
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="py-4">
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={cn(
                        'block px-6 py-3 text-sm font-medium transition-colors',
                        'hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring',
                        item.active
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground'
                      )}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
