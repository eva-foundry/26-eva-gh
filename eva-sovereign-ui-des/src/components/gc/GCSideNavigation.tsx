import { cn } from '@/lib/utils';
import { useState } from 'react';
import { List, X } from '@phosphor-icons/react';

interface GCSideNavigationItem {
  label: string;
  href: string;
  active?: boolean;
  children?: GCSideNavigationItem[];
}

interface GCSideNavigationProps {
  items: GCSideNavigationItem[];
  title?: string;
  className?: string;
}

export function GCSideNavigation({ items, title, className }: GCSideNavigationProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  const renderNavItem = (item: GCSideNavigationItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.label);

    return (
      <li key={item.label}>
        <div className="flex items-center">
          <a
            href={item.href}
            className={cn(
              'flex-1 block px-4 py-2 text-sm rounded transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-ring',
              item.active 
                ? 'bg-primary text-primary-foreground font-semibold' 
                : 'text-foreground hover:bg-muted',
              level > 0 && 'ml-4'
            )}
          >
            {item.label}
          </a>
          {hasChildren && (
            <button
              onClick={() => toggleExpanded(item.label)}
              className="p-2 hover:bg-muted rounded transition-colors"
              aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label}`}
            >
              <span className={cn('transition-transform', isExpanded && 'rotate-90')}>
                ▶
              </span>
            </button>
          )}
        </div>
        {hasChildren && isExpanded && (
          <ul className="mt-1 space-y-1">
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Open navigation menu"
      >
        <List size={24} weight="bold" />
      </button>

      <aside
        className={cn(
          'fixed lg:relative inset-y-0 left-0 z-40',
          'w-64 bg-card border-r border-border',
          'transform transition-transform duration-300',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          className
        )}
      >
        <div className="h-full overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-4 lg:justify-start">
            {title && (
              <h2 className="text-lg font-bold text-foreground">{title}</h2>
            )}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 hover:bg-muted rounded transition-colors"
              aria-label="Close navigation menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav aria-label="Side navigation">
            <ul className="space-y-1">
              {items.map(item => renderNavItem(item))}
            </ul>
          </nav>
        </div>
      </aside>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
