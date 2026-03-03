import { cn } from '@/lib/utils';
import { Calendar } from '@phosphor-icons/react';

interface GCDateModifiedProps {
  date: string;
  className?: string;
}

export function GCDateModified({ date, className }: GCDateModifiedProps) {
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-CA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={cn('flex items-center gap-2 text-sm text-muted-foreground', className)}>
      <Calendar size={16} weight="regular" />
      <span>
        Date modified: <time dateTime={date}>{formatDate(date)}</time>
      </span>
    </div>
  );
}
