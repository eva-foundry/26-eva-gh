import { type Locale, i18nService } from '@/lib/i18n-service'

interface EVALanguageSwitcherProps {
    currentLocale: Locale
    onLanguageChange: (locale: Locale) => void
}

export function EVALanguageSwitcher({ currentLocale, onLanguageChange }: EVALanguageSwitcherProps) {
    const toggleLanguage = () => {
        const newLocale: Locale = currentLocale === 'en-CA' ? 'fr-CA' : 'en-CA'
        onLanguageChange(newLocale)
    }

    const currentLangLabel = currentLocale === 'en-CA' 
        ? i18nService.t('language.french') 
        : i18nService.t('language.english')

    return (
        <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 text-sm font-medium border-2 border-current rounded hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={`${i18nService.t('language.switcher')} (${i18nService.t('language.switcher')}: ${currentLangLabel})`}
            lang={currentLocale === 'en-CA' ? 'fr-CA' : 'en-CA'}
        >
            {currentLangLabel}
        </button>
    )
}
