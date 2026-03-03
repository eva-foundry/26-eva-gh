import { cn } from '@/lib/utils';
import { Globe } from '@phosphor-icons/react';

interface GCLanguageToggleProps {
  currentLanguage?: 'en' | 'fr';
  onLanguageChange?: (language: 'en' | 'fr') => void;
  className?: string;
}

export function GCLanguageToggle({ 
  currentLanguage = 'en', 
  onLanguageChange,
  className 
}: GCLanguageToggleProps) {
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'fr' : 'en';
    onLanguageChange?.(newLanguage);
  };

  const label = currentLanguage === 'en' ? 'Français' : 'English';
  const ariaLabel = currentLanguage === 'en' 
    ? 'Switch to French' 
    : 'Passer à l\'anglais';

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-2',
        'text-sm font-medium text-foreground',
        'hover:underline focus:outline-none focus:ring-3 focus:ring-ring rounded',
        className
      )}
      aria-label={ariaLabel}
    >
      <Globe size={18} weight="regular" />
      <span>{label}</span>
    </button>
  );
}
