import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GCScreenReaderOnlyProps {
  children: ReactNode;
  className?: string;
}

export function GCScreenReaderOnly({ children, className }: GCScreenReaderOnlyProps) {
  return (
    <span
      className={cn(
        'sr-only',
        className
      )}
    >
      {children}
    </span>
  );
}
