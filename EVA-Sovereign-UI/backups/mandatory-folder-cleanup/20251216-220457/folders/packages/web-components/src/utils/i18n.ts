/**
 * i18n Message Registry
 * Manages translations for all EVA components
 * EN-CA and FR-CA bilingual support
 */

export type Locale = 'en-CA' | 'fr-CA';

export interface MessageCatalog {
  [key: string]: string;
}

export interface LocaleMessages {
  'en-CA': MessageCatalog;
  'fr-CA': MessageCatalog;
}

/**
 * Global message registry for all components
 * Components register their messages here
 */
const globalMessages: Map<string, LocaleMessages> = new Map();

/**
 * Register messages for a component
 * @param componentName Component name (e.g., 'eva-button')
 * @param messages Messages for EN-CA and FR-CA
 */
export function registerMessages(componentName: string, messages: LocaleMessages): void {
  globalMessages.set(componentName, messages);
}

/**
 * Get translated message
 * @param componentName Component name
 * @param key Message key
 * @param locale Current locale
 * @param fallback Fallback text if key not found
 * @returns Translated message
 */
export function getMessage(
  componentName: string,
  key: string,
  locale: Locale,
  fallback?: string
): string {
  const componentMessages = globalMessages.get(componentName);
  if (!componentMessages) {
    return fallback ?? key;
  }

  const localeMessages = componentMessages[locale];
  if (!localeMessages) {
    return fallback ?? key;
  }

  return localeMessages[key] ?? fallback ?? key;
}

/**
 * Format date using Intl.DateTimeFormat
 * @param date Date to format
 * @param locale Current locale
 * @param options Formatting options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Format number using Intl.NumberFormat
 * @param value Number to format
 * @param locale Current locale
 * @param options Formatting options
 * @returns Formatted number string
 */
export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Format currency using Intl.NumberFormat
 * @param value Amount to format
 * @param locale Current locale
 * @param currency Currency code (CAD default)
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, locale: Locale, currency = 'CAD'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

// Register common messages for EVA components
registerMessages('eva-button', {
  'en-CA': {
    loading: 'Loading...',
    submit: 'Submit',
    cancel: 'Cancel',
    'sign-in': 'Sign in',
  },
  'fr-CA': {
    loading: 'Chargement...',
    submit: 'Soumettre',
    cancel: 'Annuler',
    'sign-in': 'Se connecter',
  },
});

registerMessages('eva-alert', {
  'en-CA': {
    'dismiss-alert': 'Dismiss alert',
    'alert-dismissed': 'Alert dismissed',
    success: 'Success',
    info: 'Information',
    warning: 'Warning',
    danger: 'Error',
  },
  'fr-CA': {
    'dismiss-alert': 'Rejeter l\'alerte',
    'alert-dismissed': 'Alerte rejetée',
    success: 'Succès',
    info: 'Information',
    warning: 'Avertissement',
    danger: 'Erreur',
  },
});

registerMessages('eva-card', {
  'en-CA': {
    // Card component doesn't have default messages yet
  },
  'fr-CA': {
    // Card component doesn't have default messages yet
  },
});

registerMessages('eva-modal', {
  'en-CA': {
    close: 'Close modal',
    'modal-closed': 'Modal closed',
  },
  'fr-CA': {
    close: 'Fermer le modal',
    'modal-closed': 'Modal fermé',
  },
});

registerMessages('eva-chat-panel', {
  'en-CA': {
    title: 'EVA Assistant',
    you: 'You',
    eva: 'EVA',
    system: 'System',
    placeholder: 'Type your message...',
    'input-label': 'Chat message input',
    send: 'Send message',
    'message-sent': 'Message sent',
  },
  'fr-CA': {
    title: 'Assistant EVA',
    you: 'Vous',
    eva: 'EVA',
    system: 'Système',
    placeholder: 'Tapez votre message...',
    'input-label': 'Saisie de message de chat',
    send: 'Envoyer le message',
    'message-sent': 'Message envoyé',
  },
});
