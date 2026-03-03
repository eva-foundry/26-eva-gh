type TranslationValue = string | Record<string, any>;

interface Translations {
  [key: string]: TranslationValue;
}

interface LocaleData {
  [locale: string]: Translations;
}

class I18nService {
  private currentLocale: string = 'en-CA';
  private translations: LocaleData = {};
  private listeners: Set<(locale: string) => void> = new Set();

  setTranslations(locale: string, translations: Translations) {
    this.translations[locale] = translations;
  }

  setLocale(locale: string) {
    if (this.translations[locale]) {
      this.currentLocale = locale;
      this.notifyListeners();
    } else {
      console.warn(`Locale ${locale} not found, falling back to ${this.currentLocale}`);
    }
  }

  getLocale(): string {
    return this.currentLocale;
  }

  t(key: string, params?: Record<string, any>): string {
    const keys = key.split('.');
    let value: any = this.translations[this.currentLocale];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`);
      return key;
    }

    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }

    return value;
  }

  formatDate(date: Date, format: 'short' | 'medium' | 'long' = 'medium'): string {
    const options: Intl.DateTimeFormatOptions = 
      format === 'short' 
        ? { year: 'numeric', month: 'numeric', day: 'numeric' }
        : format === 'long'
        ? { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
        : { year: 'numeric', month: 'short', day: 'numeric' };

    return new Intl.DateTimeFormat(this.currentLocale, options).format(date);
  }

  formatNumber(num: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.currentLocale, options).format(num);
  }

  formatCurrency(amount: number, currency: string = 'CAD'): string {
    return new Intl.NumberFormat(this.currentLocale, {
      style: 'currency',
      currency,
    }).format(amount);
  }

  subscribe(callback: (locale: string) => void): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(callback => callback(this.currentLocale));
  }
}

export const i18nService = new I18nService();
