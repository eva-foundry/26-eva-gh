/**
 * I18n Service for EVA-Sovereign-UI
 * Supports multiple locales with nested translation keys
 */

type TranslationMap = Record<string, any>;

export class I18nService {
  private static instance: I18nService;
  private currentLocale: string = 'en-CA';
  private translations: Record<string, TranslationMap> = {};
  private listeners: Set<(locale: string) => void> = new Set();

  private constructor() {
    // Singleton pattern
  }

  static getInstance(): I18nService {
    if (!I18nService.instance) {
      I18nService.instance = new I18nService();
    }
    return I18nService.instance;
  }

  /**
   * Load translations for a specific locale
   */
  async loadLocale(locale: string): Promise<void> {
    if (this.translations[locale]) {
      return; // Already loaded
    }

    try {
      const response = await fetch(`/src/i18n/locales/${locale}.json`);
      const data = await response.json();
      this.translations[locale] = data;
    } catch (error) {
      console.error(`Failed to load locale ${locale}:`, error);
      this.translations[locale] = {};
    }
  }

  /**
   * Set the current locale and notify listeners
   */
  async setLocale(locale: string): Promise<void> {
    if (!this.translations[locale]) {
      await this.loadLocale(locale);
    }
    this.currentLocale = locale;
    this.notifyListeners();
  }

  /**
   * Get the current locale
   */
  getLocale(): string {
    return this.currentLocale;
  }

  /**
   * Translate a key with optional parameters
   * Supports nested keys using dot notation: "esdc.hero.title"
   */
  t(key: string, params?: Record<string, any>): string {
    const keys = key.split('.');
    let value: any = this.translations[this.currentLocale];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Replace parameters {param}
    if (params) {
      return value.replace(/\{(\w+)\}/g, (_, paramKey) => {
        return params[paramKey] !== undefined ? String(params[paramKey]) : `{${paramKey}}`;
      });
    }

    return value;
  }

  /**
   * Subscribe to locale changes
   */
  subscribe(callback: (locale: string) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * Notify all listeners of locale change
   */
  private notifyListeners(): void {
    this.listeners.forEach(callback => callback(this.currentLocale));
  }

  /**
   * Get all available locales
   */
  getAvailableLocales(): string[] {
    return ['en-CA', 'fr-CA', 'en-US', 'en-GB', 'en-AU'];
  }

  /**
   * Check if a locale is loaded
   */
  isLocaleLoaded(locale: string): boolean {
    return !!this.translations[locale];
  }
}

// Export singleton instance
export const i18n = I18nService.getInstance();
