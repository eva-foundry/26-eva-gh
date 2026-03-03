import { cn } from '@/lib/utils';
import { Check } from '@phosphor-icons/react';

interface GCStepperStep {
  label: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface GCStepperProps {
  steps: GCStepperStep[];
  className?: string;
}

export function GCStepper({ steps, className }: GCStepperProps) {
  return (
    <nav aria-label="Progress" className={cn('w-full', className)}>
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.status === 'completed';
          const isCurrent = step.status === 'current';
          const isLast = index === steps.length - 1;

          return (
            <li key={step.label} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className="relative flex items-center">
                  <div
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors',
                      isCompleted && 'bg-primary border-primary',
                      isCurrent && 'border-primary bg-background',
                      step.status === 'upcoming' && 'border-border bg-muted'
                    )}
                  >
                    {isCompleted ? (
                      <Check size={20} weight="bold" className="text-primary-foreground" />
                    ) : (
                      <span
                        className={cn(
                          'text-sm font-semibold',
                          isCurrent && 'text-primary',
                          step.status === 'upcoming' && 'text-muted-foreground'
                        )}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>
                  
                  {!isLast && (
                    <div
                      className={cn(
                        'absolute left-full w-full h-0.5 -ml-5',
                        isCompleted ? 'bg-primary' : 'bg-border'
                      )}
                      style={{ width: 'calc(100vw / var(--step-count))' }}
                    />
                  )}
                </div>
                
                <span
                  className={cn(
                    'mt-2 text-xs sm:text-sm font-medium text-center',
                    isCurrent && 'text-primary font-semibold',
                    isCompleted && 'text-foreground',
                    step.status === 'upcoming' && 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
