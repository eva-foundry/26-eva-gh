import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GCFieldsetProps {
  legend: string;
  children: ReactNode;
  required?: boolean;
  helperText?: string;
  className?: string;
}

export function GCFieldset({ legend, children, required, helperText, className }: GCFieldsetProps) {
  return (
    <fieldset className={cn('border border-border rounded p-4', className)}>
      <legend className="text-base font-bold text-foreground px-2 -ml-2">
        {legend}
        {required && <span className="text-destructive ml-1">*</span>}
      </legend>
      {helperText && (
        <p className="text-sm text-muted-foreground mb-4">{helperText}</p>
      )}
      <div className="space-y-3">
        {children}
      </div>
    </fieldset>
  );
}
