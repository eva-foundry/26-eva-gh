import { Button } from '@/components/ui/button';
import { Globe } from '@phosphor-icons/react';

interface LanguageSwitcherProps {
  currentLocale: string;
  availableLocales: string[];
  onLocaleChange: (locale: string) => void;
}

export function LanguageSwitcher({ currentLocale, availableLocales, onLocaleChange }: LanguageSwitcherProps) {
  const getLocaleName = (locale: string) => {
    const names: Record<string, string> = {
      'en-CA': 'English',
      'fr-CA': 'Français',
      'en-US': 'English',
      'en-GB': 'English',
      'en-AU': 'English',
      'en-NZ': 'English',
      'es-US': 'Español',
      'cy-GB': 'Cymraeg',
      'mi-NZ': 'Māori',
    };
    return names[locale] || locale;
  };

  const toggleLocale = () => {
    const currentIndex = availableLocales.indexOf(currentLocale);
    const nextIndex = (currentIndex + 1) % availableLocales.length;
    onLocaleChange(availableLocales[nextIndex]);
  };

  if (availableLocales.length <= 1) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLocale}
      className="flex items-center gap-2"
      aria-label={`Switch language. Current language: ${getLocaleName(currentLocale)}`}
    >
      <Globe size={18} weight="duotone" aria-hidden="true" />
      <span className="font-medium">{getLocaleName(currentLocale)}</span>
    </Button>
  );
}
