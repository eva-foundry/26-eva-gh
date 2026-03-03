type Locale = "en" | "fr"

interface TranslationData {
  [key: string]: string | TranslationData
}

class I18nService {
  private translations: Record<Locale, TranslationData> = {
    en: {},
    fr: {}
  }
  
  private currentLocale: Locale = "en"
  private listeners: Set<(locale: Locale) => void> = new Set()

  async loadTranslations(locale: Locale, data: TranslationData) {
    this.translations[locale] = data
  }

  setLocale(locale: Locale) {
    this.currentLocale = locale
    this.notifyListeners()
  }

  getLocale(): Locale {
    return this.currentLocale
  }

  t(key: string, locale?: Locale): string {
    const lang = locale || this.currentLocale
    const keys = key.split('.')
    let value: any = this.translations[lang]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Missing translation for key: ${key} in locale: ${lang}`)
        return key
      }
    }

    return typeof value === 'string' ? value : key
  }

  subscribe(listener: (locale: Locale) => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentLocale))
  }
}

export const i18nService = new I18nService()
export type { Locale, TranslationData }
