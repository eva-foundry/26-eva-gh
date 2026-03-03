import { type ReactNode } from 'react'
import { i18nService, type TranslationKey } from '@/lib/i18n-service'
import { type SovereignProfileId } from '@/lib/sovereign-profiles'
import { useLocaleChange } from '@/hooks/use-locale-change'

interface EVAGCHeaderProps {
    appNameKey: TranslationKey
    profile: SovereignProfileId
    actions?: ReactNode
}

export function EVAGCHeader({ appNameKey, actions }: EVAGCHeaderProps) {
    useLocaleChange()
    
    return (
        <>
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded focus:shadow-lg"
            >
                {i18nService.t('header.skipToMain')}
            </a>
            <header className="bg-primary text-primary-foreground shadow-md" role="banner">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <div 
                                className="w-10 h-10 bg-primary-foreground/20 rounded flex items-center justify-center font-bold text-lg"
                                aria-hidden="true"
                            >
                                GC
                            </div>
                            <h1 className="text-lg font-semibold">
                                {i18nService.t(appNameKey)}
                            </h1>
                        </div>
                        
                        {actions && (
                            <nav className="flex items-center gap-4" aria-label={i18nService.t('header.navigation')}>
                                {actions}
                            </nav>
                        )}
                    </div>
                </div>
            </header>
        </>
    )
}
