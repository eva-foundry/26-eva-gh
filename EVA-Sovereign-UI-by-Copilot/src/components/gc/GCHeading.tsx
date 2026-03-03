import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GCHeadingProps {
  children: ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export function GCHeading({ children, level, className }: GCHeadingProps) {
  const styles = {
    1: 'text-4xl font-bold text-foreground',
    2: 'text-3xl font-bold text-foreground',
    3: 'text-2xl font-bold text-foreground',
    4: 'text-xl font-semibold text-foreground',
    5: 'text-lg font-semibold text-foreground',
    6: 'text-base font-semibold text-foreground',
  };

  const props = {
    className: cn(styles[level], className)
  };

  switch (level) {
    case 1:
      return <h1 {...props}>{children}</h1>;
    case 2:
      return <h2 {...props}>{children}</h2>;
    case 3:
      return <h3 {...props}>{children}</h3>;
    case 4:
      return <h4 {...props}>{children}</h4>;
    case 5:
      return <h5 {...props}>{children}</h5>;
    case 6:
      return <h6 {...props}>{children}</h6>;
  }
}
