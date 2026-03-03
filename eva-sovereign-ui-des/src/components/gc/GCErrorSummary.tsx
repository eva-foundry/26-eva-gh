import { cn } from '@/lib/utils';
import { WarningCircle } from '@phosphor-icons/react';

interface GCErrorSummaryProps {
  title?: string;
  errors: { id: string; message: string }[];
  className?: string;
}

export function GCErrorSummary({ 
  title = 'There is a problem with your submission', 
  errors, 
  className 
}: GCErrorSummaryProps) {
  const handleErrorClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (errors.length === 0) return null;

  return (
    <div 
      className={cn(
        'border-l-4 border-destructive bg-destructive/10 p-4 rounded',
        className
      )}
      role="alert"
      aria-labelledby="error-summary-title"
      tabIndex={-1}
    >
      <div className="flex items-start gap-3">
        <WarningCircle size={24} weight="fill" className="text-destructive flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h2 id="error-summary-title" className="text-lg font-bold text-destructive mb-3">
            {title}
          </h2>
          <ul className="space-y-2">
            {errors.map((error) => (
              <li key={error.id}>
                <button
                  type="button"
                  onClick={() => handleErrorClick(error.id)}
                  className="text-destructive underline hover:no-underline font-medium text-left"
                >
                  {error.message}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
