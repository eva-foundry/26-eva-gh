import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { ArrowRight, ArrowSquareOut } from '@phosphor-icons/react';

interface GCLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  showIcon?: boolean;
  variant?: 'default' | 'button';
  className?: string;
}

export function GCLink({ 
  href, 
  children, 
  external = false, 
  showIcon = false,
  variant = 'default',
  className 
}: GCLinkProps) {
  const baseStyles = 'inline-flex items-center gap-1 focus:outline-none focus:ring-3 focus:ring-ring rounded';
  
  const variants = {
    default: 'text-primary hover:underline',
    button: 'px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 font-medium'
  };

  return (
    <a
      href={href}
      className={cn(baseStyles, variants[variant], className)}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
      {showIcon && (
        external ? (
          <ArrowSquareOut size={16} weight="bold" />
        ) : (
          <ArrowRight size={16} weight="bold" />
        )
      )}
    </a>
  );
}
