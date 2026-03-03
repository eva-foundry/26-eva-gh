import { Locale } from '../utils/i18n.js';

/**
 * Locale Context
 * Simple context for sharing locale across components
 */
export interface LocaleContext {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

// Global locale state (simple implementation without @lit/context)
let currentLocale: Locale = 'en-CA';
const localeListeners: Set<(locale: Locale) => void> = new Set();

/**
 * Get current global locale
 */
export function getGlobalLocale(): Locale {
  return currentLocale;
}

/**
 * Set global locale and notify all listeners
 */
export function setGlobalLocale(locale: Locale): void {
  currentLocale = locale;
  localeListeners.forEach((listener) => listener(locale));
}

/**
 * Subscribe to locale changes
 */
export function subscribeToLocale(listener: (locale: Locale) => void): () => void {
  localeListeners.add(listener);
  return () => localeListeners.delete(listener);
}

/**
 * Get system locale (browser language)
 * @returns Detected locale (defaults to 'en-CA')
 */
export function getSystemLocale(): Locale {
  const browserLocale = navigator.language || 'en-CA';
  
  // Check if it's French
  if (browserLocale.toLowerCase().startsWith('fr')) {
    return 'fr-CA';
  }
  
  // Default to English
  return 'en-CA';
}
