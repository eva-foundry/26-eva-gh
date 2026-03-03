import { describe, it, expect, beforeEach } from 'vitest';
import { createComponent } from '../../../../../tests/test-utils';
import './eva-language-switcher';
import { i18n } from '../../i18n/i18n-service';

describe('eva-language-switcher i18n reactive', () => {
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createComponent('eva-language-switcher');
    // Stub translations if fetch not executed in test environment
    if (!(i18n as any).translations['en-CA']) {
      (i18n as any).translations['en-CA'] = { language: { current: 'Current language' }, accessibility: { language: 'Language selection' } };
    }
    if (!(i18n as any).translations['fr-CA']) {
      (i18n as any).translations['fr-CA'] = { language: { current: 'Langue actuelle' }, accessibility: { language: 'Sélection de la langue' } };
    }
    await i18n.setLocale('en-CA');
    await new Promise(r => setTimeout(r, 10));
  });

  it('should render English current locale indicator', () => {
    const sr = element.shadowRoot?.querySelector('.lang-button[aria-current="true"] .sr-only');
    expect(sr?.textContent).toMatch(/Current language/i);
  });

  it('should reactively update when locale changes', async () => {
    await i18n.setLocale('fr-CA');
    await new Promise(r => setTimeout(r, 20));
    const sr = element.shadowRoot?.querySelector('.lang-button[aria-current="true"] .sr-only');
    expect(sr?.textContent).toMatch(/Langue actuelle/i);
  });
});
