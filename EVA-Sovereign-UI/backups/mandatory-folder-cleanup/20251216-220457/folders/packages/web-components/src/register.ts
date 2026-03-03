/**
 * Auto-register all EVA web components
 * Import this file to automatically define all custom elements
 */

// Import all component classes
import { EVAButton } from './components/eva-button.js';
import { EVACard } from './components/eva-card.js';
import { EVAAlert } from './components/eva-alert.js';
import { EVAInput } from './components/eva-input.js';
import { EVASelect } from './components/eva-select.js';
import { EVACheckbox } from './components/eva-checkbox.js';
import { EVARadio } from './components/eva-radio.js';
import { EVAModal } from './components/eva-modal.js';
import { EVATabs, EVATab } from './components/eva-tabs.js';
import { EVAChatPanel } from './components/eva-chat-panel.js';
import { EVANavShell } from './components/eva-nav-shell.js';
import { EVABackstageShell } from './components/eva-backstage-shell.js';
import { EVAA11yPanel } from './components/eva-a11y-panel.js';
import { EVALivePreview } from './components/eva-live-preview.js';

// Register all components
if (!customElements.get('eva-button')) {
  customElements.define('eva-button', EVAButton);
}
if (!customElements.get('eva-card')) {
  customElements.define('eva-card', EVACard);
}
if (!customElements.get('eva-alert')) {
  customElements.define('eva-alert', EVAAlert);
}
if (!customElements.get('eva-input')) {
  customElements.define('eva-input', EVAInput);
}
if (!customElements.get('eva-select')) {
  customElements.define('eva-select', EVASelect);
}
if (!customElements.get('eva-checkbox')) {
  customElements.define('eva-checkbox', EVACheckbox);
}
if (!customElements.get('eva-radio')) {
  customElements.define('eva-radio', EVARadio);
}
if (!customElements.get('eva-modal')) {
  customElements.define('eva-modal', EVAModal);
}
if (!customElements.get('eva-tabs')) {
  customElements.define('eva-tabs', EVATabs);
}
if (!customElements.get('eva-tab')) {
  customElements.define('eva-tab', EVATab);
}
if (!customElements.get('eva-chat-panel')) {
  customElements.define('eva-chat-panel', EVAChatPanel);
}
if (!customElements.get('eva-nav-shell')) {
  customElements.define('eva-nav-shell', EVANavShell);
}
if (!customElements.get('eva-backstage-shell')) {
  customElements.define('eva-backstage-shell', EVABackstageShell);
}
if (!customElements.get('eva-a11y-panel')) {
  customElements.define('eva-a11y-panel', EVAA11yPanel);
}
if (!customElements.get('eva-live-preview')) {
  customElements.define('eva-live-preview', EVALivePreview);
}

console.log('✅ EVA Sovereign UI components registered');

// Re-export all classes for programmatic use
export {
  EVAButton,
  EVACard,
  EVAAlert,
  EVAInput,
  EVASelect,
  EVACheckbox,
  EVARadio,
  EVAModal,
  EVATabs,
  EVATab,
  EVAChatPanel,
  EVANavShell,
  EVABackstageShell,
  EVAA11yPanel,
  EVALivePreview
};

// Re-export utilities
export * from './utils/i18n.js';
export * from './utils/locale-context.js';
export * from './utils/sovereign-profile.js';
export * from './utils/accessibility.js';
