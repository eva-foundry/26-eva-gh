/**
 * EVA-Sovereign-UI Web Components
 * Main entry point - registers all components
 */

// Tokens
export * from './tokens';

// I18n
export { i18n } from './i18n/i18n-service';
export * from './i18n/formatters';

// Base Component
export { EVABaseComponent } from './utils/base-component';

// GC Design System Components
import './components/gc-design/eva-gc-header';
import './components/gc-design/eva-gc-footer';
import './components/gc-design/eva-gc-button';

// Layout Components
import './components/layout/eva-page-shell';
import './components/layout/eva-hero-banner';
import './components/layout/eva-container';

// Accessibility Components
import './components/accessibility/eva-skip-link';

// I18n Components
import './components/i18n/eva-language-switcher';

// Chat Components
import './components/chat/eva-chat-panel';
import './components/chat/eva-chat-message';

// ESDC Components
import './components/esdc/eva-program-card';

// Initialize i18n with default locale
import { i18n } from './i18n/i18n-service';
i18n.loadLocale('en-CA').then(() => {
  i18n.loadLocale('fr-CA');
});
