import { i18nService, type TranslationKey } from '@/lib/i18n-service'
import { useLocaleChange } from '@/hooks/use-locale-change'

interface EVAHeroBannerProps {
    titleKey: TranslationKey
    descriptionKey: TranslationKey
}

export function EVAHeroBanner({ titleKey, descriptionKey }: EVAHeroBannerProps) {
    useLocaleChange()
    
    return (
        <section 
            className="bg-primary text-primary-foreground rounded-lg p-8 mb-8 shadow-lg"
            aria-labelledby="hero-title"
        >
            <div className="max-w-3xl">
                <h2 id="hero-title" className="text-3xl font-bold mb-4">
                    {i18nService.t(titleKey)}
                </h2>
                <p className="text-lg opacity-95">
                    {i18nService.t(descriptionKey)}
                </p>
            </div>
        </section>
    )
}
