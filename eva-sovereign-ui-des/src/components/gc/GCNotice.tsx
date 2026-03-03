import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Info, CheckCircle, WarningCircle, XCircle } from '@phosphor-icons/react';

interface GCNoticeProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: ReactNode;
  className?: string;
}

export function GCNotice({ variant = 'info', title, children, className }: GCNoticeProps) {
  const variants = {
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
      textColor: 'text-blue-900',
      iconColor: 'text-blue-600'
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      textColor: 'text-green-900',
      iconColor: 'text-green-600'
    },
    warning: {
      icon: WarningCircle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-300',
      textColor: 'text-yellow-900',
      iconColor: 'text-yellow-600'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-300',
      textColor: 'text-red-900',
      iconColor: 'text-red-600'
    }
  };

  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div 
      className={cn(
        'border-l-4 p-4 rounded',
        config.bgColor,
        config.borderColor,
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex gap-3">
        <Icon size={24} weight="fill" className={cn('flex-shrink-0 mt-0.5', config.iconColor)} />
        <div className="flex-1">
          {title && (
            <h3 className={cn('font-bold mb-2', config.textColor)}>
              {title}
            </h3>
          )}
          <div className={cn('text-sm', config.textColor)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
