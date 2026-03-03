import { i18nService } from './i18nService'
import enCA from './locales/en-CA.json'
import frCA from './locales/fr-CA.json'

export async function initializeI18n(initialLocale: "en" | "fr" = "en") {
  await i18nService.loadTranslations("en", enCA)
  await i18nService.loadTranslations("fr", frCA)
  i18nService.setLocale(initialLocale)
}

export { i18nService } from './i18nService'
export { useTranslation } from '@/hooks/useTranslation'
export type { Locale } from './i18nService'
