import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GCTextProps {
  children: ReactNode;
  variant?: 'body' | 'small' | 'lead' | 'caption';
  className?: string;
  as?: 'p' | 'span' | 'div';
}

export function GCText({ children, variant = 'body', className, as: Component = 'p' }: GCTextProps) {
  const variants = {
    lead: 'text-xl text-foreground leading-relaxed',
    body: 'text-base text-foreground leading-normal',
    small: 'text-sm text-foreground leading-normal',
    caption: 'text-xs text-muted-foreground leading-tight'
  };

  return (
    <Component className={cn(variants[variant], className)}>
      {children}
    </Component>
  );
}
