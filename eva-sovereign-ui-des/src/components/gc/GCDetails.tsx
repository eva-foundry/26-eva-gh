import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';
import { CaretDown, CaretRight } from '@phosphor-icons/react';

interface GCDetailsProps {
  summary: string;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export function GCDetails({ summary, children, className, defaultOpen = false }: GCDetailsProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <details 
      className={cn('border border-border rounded', className)}
      open={isOpen}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary 
        className="flex items-center gap-2 px-4 py-3 cursor-pointer bg-muted hover:bg-muted/80 transition-colors select-none"
      >
        {isOpen ? (
          <CaretDown size={20} weight="bold" className="text-primary flex-shrink-0" />
        ) : (
          <CaretRight size={20} weight="bold" className="text-primary flex-shrink-0" />
        )}
        <span className="font-semibold text-foreground">{summary}</span>
      </summary>
      <div className="px-4 py-4 border-t border-border">
        {children}
      </div>
    </details>
  );
}
