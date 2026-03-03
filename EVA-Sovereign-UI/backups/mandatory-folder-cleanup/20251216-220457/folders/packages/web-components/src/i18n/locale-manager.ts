/**
 * i18n Locale Manager
 * Runtime bilingual support for all EVA Sovereign UI components
 * Supports EN-CA and FR-CA with runtime locale switching (no page reload)
 * 
 * @module locale-manager
 */

/**
 * Supported locales (full locale codes)
 */
export type SupportedLocale = 'en-CA' | 'fr-CA';

/**
 * Short locale codes
 */
export type ShortLocale = 'en' | 'fr';

/**
 * Message catalog type
 */
export type MessageCatalog = Record<string, string>;

/**
 * Locale messages for a component
 */
export interface LocaleMessages {
  'en-CA': MessageCatalog;
  'fr-CA': MessageCatalog;
}

/**
 * Locale change event detail
 */
export interface LocaleChangeDetail {
  locale: SupportedLocale;
  previousLocale: SupportedLocale;
}

/**
 * Global message registry for all components
 */
const globalMessages: Map<string, LocaleMessages> = new Map();

/**
 * Current global locale
 */
let currentLocale: SupportedLocale = 'en-CA';

/**
 * Set global locale for all components
 * @param locale - 'en-CA' or 'fr-CA' (or short 'en'/'fr')
 */
export function setGlobalLocale(locale: SupportedLocale | ShortLocale): void {
  const previousLocale = currentLocale;
  
  // Normalize to full locale code
  const normalizedLocale = normalizeLocale(locale);
  currentLocale = normalizedLocale;
  
  // Update HTML lang attribute
  document.documentElement.lang = normalizedLocale;
  
  // Persist to localStorage
  try {
    localStorage.setItem('eva-locale', normalizedLocale);
  } catch (e) {
    console.warn('[i18n] Failed to persist locale to localStorage:', e);
  }
  
  // Emit global event for components that need manual updates
  window.dispatchEvent(new CustomEvent<LocaleChangeDetail>('eva-locale-change', {
    detail: { locale: normalizedLocale, previousLocale }
  }));
}

/**
 * Get current global locale
 * @returns Current locale ('en-CA' or 'fr-CA')
 */
export function getGlobalLocale(): SupportedLocale {
  return currentLocale;
}

/**
 * Toggle between English and French
 * @returns New locale after toggle
 */
export function toggleLocale(): SupportedLocale {
  const newLocale = currentLocale === 'en-CA' ? 'fr-CA' : 'en-CA';
  setGlobalLocale(newLocale);
  return newLocale;
}

/**
 * Normalize locale code to full format
 * @param locale - Short ('en'/'fr') or full ('en-CA'/'fr-CA')
 * @returns Full locale code
 */
function normalizeLocale(locale: SupportedLocale | ShortLocale): SupportedLocale {
  if (locale === 'en' || locale === 'en-CA') {
    return 'en-CA';
  }
  if (locale === 'fr' || locale === 'fr-CA') {
    return 'fr-CA';
  }
  return 'en-CA'; // Default fallback
}

/**
 * Initialize locale from localStorage or URL parameter
 * Should be called once when app loads
 */
export function initializeLocale(): void {
  // Check URL parameter first (?lang=fr or ?lang=fr-CA)
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  
  if (urlLang) {
    const normalized = normalizeLocale(urlLang as SupportedLocale | ShortLocale);
    setGlobalLocale(normalized);
    return;
  }
  
  // Check localStorage
  try {
    const storedLocale = localStorage.getItem('eva-locale');
    if (storedLocale) {
      setGlobalLocale(storedLocale as SupportedLocale);
      return;
    }
  } catch (e) {
    // localStorage not available
  }
  
  // Check browser language
  const browserLang = navigator.language;
  if (browserLang.startsWith('fr')) {
    setGlobalLocale('fr-CA');
  } else {
    setGlobalLocale('en-CA');
  }
}

/**
 * Register messages for a component
 * @param componentName - Component identifier (e.g., 'eva-button')
 * @param messages - Messages for EN-CA and FR-CA
 */
export function registerMessages(componentName: string, messages: LocaleMessages): void {
  globalMessages.set(componentName, messages);
}

/**
 * Get localized message
 * @param componentName - Component name
 * @param key - Message key
 * @param locale - Locale to use (defaults to current global locale)
 * @param fallback - Fallback text if key not found
 * @returns Localized message or fallback
 */
export function getMessage(
  componentName: string,
  key: string,
  locale?: SupportedLocale,
  fallback?: string
): string {
  const targetLocale = locale || currentLocale;
  const componentMessages = globalMessages.get(componentName);
  
  if (!componentMessages) {
    return fallback ?? key;
  }
  
  const localeMessages = componentMessages[targetLocale];
  if (!localeMessages) {
    return fallback ?? key;
  }
  
  const message = localeMessages[key];
  if (message) {
    return message;
  }
  
  // Try fallback to English if French not found
  if (targetLocale === 'fr-CA') {
    const enMessage = componentMessages['en-CA']?.[key];
    if (enMessage) {
      console.warn(`[i18n] Missing French translation for ${componentName}.${key}`);
      return enMessage;
    }
  }
  
  // Return fallback or key
  return fallback ?? key;
}

/**
 * Common UI messages shared across all components
 */
export const commonMessages: LocaleMessages = {
  'en-CA': {
    close: 'Close',
    submit: 'Submit',
    cancel: 'Cancel',
    required: 'Required',
    optional: 'Optional',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Information',
    yes: 'Yes',
    no: 'No',
    search: 'Search',
    menu: 'Menu',
    home: 'Home',
    language: 'Language',
    english: 'English',
    french: 'Français'
  },
  'fr-CA': {
    close: 'Fermer',
    submit: 'Soumettre',
    cancel: 'Annuler',
    required: 'Obligatoire',
    optional: 'Optionnel',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    warning: 'Avertissement',
    info: 'Information',
    yes: 'Oui',
    no: 'Non',
    search: 'Recherche',
    menu: 'Menu',
    home: 'Accueil',
    language: 'Langue',
    english: 'Anglais',
    french: 'Français'
  }
};

// Register common messages
registerMessages('common', commonMessages);

// Initialize locale when module loads
if (typeof window !== 'undefined') {
  initializeLocale();
}
