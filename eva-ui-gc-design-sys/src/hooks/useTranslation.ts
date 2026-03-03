import { useEffect, useState } from 'react'
import { i18nService, type Locale } from '@/services/i18n/i18nService'

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>(i18nService.getLocale())

  useEffect(() => {
    const unsubscribe = i18nService.subscribe((newLocale) => {
      setLocale(newLocale)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const t = (key: string) => i18nService.t(key)

  return { t, locale, setLocale: (l: Locale) => i18nService.setLocale(l) }
}
