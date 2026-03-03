import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GCGridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function GCGrid({ children, cols = 12, gap = 'md', className }: GCGridProps) {
  const colsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6',
    12: 'grid-cols-12'
  };

  const gapMap = {
    sm: 'gap-3',
    md: 'gap-6',
    lg: 'gap-8'
  };

  return (
    <div className={cn('grid', colsMap[cols], gapMap[gap], className)}>
      {children}
    </div>
  );
}

interface GCGridItemProps {
  children: ReactNode;
  span?: 1 | 2 | 3 | 4 | 6 | 12;
  className?: string;
}

export function GCGridItem({ children, span = 1, className }: GCGridItemProps) {
  const spanMap = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    6: 'col-span-6',
    12: 'col-span-12'
  };

  return (
    <div className={cn(spanMap[span], className)}>
      {children}
    </div>
  );
}
