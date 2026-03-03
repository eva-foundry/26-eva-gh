import { cn } from '@/lib/utils';
import { useState } from 'react';
import { CaretDown, List } from '@phosphor-icons/react';

interface GCThemeTopicMenuItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface GCThemeTopicMenuProps {
  items: GCThemeTopicMenuItem[];
  title?: string;
  className?: string;
}

export function GCThemeTopicMenu({ items, title = 'Themes and topics', className }: GCThemeTopicMenuProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

  const MenuContent = () => (
    <nav aria-label={title} className="py-4">
      <h2 className="text-lg font-bold text-foreground mb-4 px-4">{title}</h2>
      <ul className="space-y-1">
        {items.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems.has(item.label);

          return (
            <li key={item.label}>
              {hasChildren ? (
                <>
                  <button
                    onClick={() => toggleExpanded(item.label)}
                    className="w-full flex items-center justify-between px-4 py-2 text-left text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <span>{item.label}</span>
                    <CaretDown
                      size={16}
                      weight="bold"
                      className={cn(
                        'transition-transform',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  </button>
                  {isExpanded && (
                    <ul className="bg-muted/50">
                      {item.children!.map((child) => (
                        <li key={child.label}>
                          <a
                            href={child.href}
                            className="block px-8 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-card border border-border rounded hover:bg-muted transition-colors"
      >
        <List size={20} weight="bold" />
        <span>{title}</span>
      </button>

      <div className={cn('hidden md:block bg-card border border-border rounded', className)}>
        <MenuContent />
      </div>

      {isMobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="md:hidden fixed inset-y-0 left-0 w-80 max-w-full bg-card border-r border-border z-50 overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">{title}</h2>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 hover:bg-muted rounded transition-colors"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <MenuContent />
          </div>
        </>
      )}
    </>
  );
}
