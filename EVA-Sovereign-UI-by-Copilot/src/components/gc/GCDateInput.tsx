import { cn } from '@/lib/utils';
import { useState } from 'react';

interface GCDateInputProps {
  id: string;
  label: string;
  value?: { year: string; month: string; day: string };
  onChange?: (value: { year: string; month: string; day: string }) => void;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}

export function GCDateInput({
  id,
  label,
  value = { year: '', month: '', day: '' },
  onChange,
  required,
  error,
  helperText,
  className
}: GCDateInputProps) {
  const [dateValue, setDateValue] = useState(value);

  const handleChange = (field: 'year' | 'month' | 'day', val: string) => {
    const newValue = { ...dateValue, [field]: val };
    setDateValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={`${id}-year`} className="block text-base font-semibold text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      
      {helperText && !error && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
      
      <div className="flex gap-3">
        <div className="flex-1 max-w-[100px]">
          <label htmlFor={`${id}-year`} className="block text-sm font-medium text-foreground mb-1">
            Year
          </label>
          <input
            type="text"
            id={`${id}-year`}
            value={dateValue.year}
            onChange={(e) => handleChange('year', e.target.value)}
            placeholder="YYYY"
            maxLength={4}
            className={cn(
              'w-full px-3 py-2 text-base border rounded',
              'bg-background text-foreground',
              'focus:outline-none focus:ring-3 focus:ring-ring',
              error ? 'border-destructive' : 'border-input'
            )}
          />
        </div>
        
        <div className="flex-1 max-w-[80px]">
          <label htmlFor={`${id}-month`} className="block text-sm font-medium text-foreground mb-1">
            Month
          </label>
          <input
            type="text"
            id={`${id}-month`}
            value={dateValue.month}
            onChange={(e) => handleChange('month', e.target.value)}
            placeholder="MM"
            maxLength={2}
            className={cn(
              'w-full px-3 py-2 text-base border rounded',
              'bg-background text-foreground',
              'focus:outline-none focus:ring-3 focus:ring-ring',
              error ? 'border-destructive' : 'border-input'
            )}
          />
        </div>
        
        <div className="flex-1 max-w-[80px]">
          <label htmlFor={`${id}-day`} className="block text-sm font-medium text-foreground mb-1">
            Day
          </label>
          <input
            type="text"
            id={`${id}-day`}
            value={dateValue.day}
            onChange={(e) => handleChange('day', e.target.value)}
            placeholder="DD"
            maxLength={2}
            className={cn(
              'w-full px-3 py-2 text-base border rounded',
              'bg-background text-foreground',
              'focus:outline-none focus:ring-3 focus:ring-ring',
              error ? 'border-destructive' : 'border-input'
            )}
          />
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-destructive font-medium">{error}</p>
      )}
    </div>
  );
}
