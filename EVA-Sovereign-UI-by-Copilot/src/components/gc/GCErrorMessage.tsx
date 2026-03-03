import { cn } from '@/lib/utils';
import { WarningCircle } from '@phosphor-icons/react';

interface GCErrorMessageProps {
  message: string;
  className?: string;
}

export function GCErrorMessage({ message, className }: GCErrorMessageProps) {
  return (
    <div 
      className={cn(
        'flex items-start gap-2 text-sm text-destructive font-medium',
        className
      )}
      role="alert"
    >
      <WarningCircle size={16} weight="fill" className="flex-shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );
}
