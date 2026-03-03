import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-language-toggle';
import type { GCLanguageToggle } from './gc-language-toggle';

describe('gc-language-toggle', () => {
  let element: GCLanguageToggle;

  beforeEach(async () => {
    element = await fixture(html`<gc-language-toggle></gc-language-toggle>`);
  });

  it('renders language toggle container', () => {
    const container = element.shadowRoot?.querySelector('.language-toggle');
    expect(container).to.exist;
  });

  it('renders toggle link', () => {
    const link = element.shadowRoot?.querySelector('.toggle-link');
    expect(link).to.exist;
    expect(link?.tagName).to.equal('A');
  });

  it('displays French link when current language is English', async () => {
    element.locale = 'en-CA';
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.toggle-link');
    expect(link?.textContent).to.include('Français');
  });

  it('displays English link when current language is French', async () => {
    element.locale = 'fr-CA';
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.toggle-link');
    expect(link?.textContent).to.include('English');
  });

  it('displays language abbreviation', async () => {
    element.locale = 'en-CA';
    await element.updateComplete;

    const abbr = element.shadowRoot?.querySelector('.language-abbr');
    expect(abbr?.textContent?.trim()).to.equal('FR');
  });

  it('displays correct abbreviation when French', async () => {
    element.locale = 'fr-CA';
    await element.updateComplete;

    const abbr = element.shadowRoot?.querySelector('.language-abbr');
    expect(abbr?.textContent?.trim()).to.equal('EN');
  });

  it('sets correct lang attribute on link', async () => {
    element.locale = 'en-CA';
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.toggle-link');
    expect(link?.getAttribute('lang')).to.equal('fr');
  });

  it('sets lang="en" when current language is French', async () => {
    element.locale = 'fr-CA';
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.toggle-link');
    expect(link?.getAttribute('lang')).to.equal('en');
  });

  it('uses targetUrl when provided', async () => {
    element.targetUrl = 'https://www.canada.ca/fr/index.html';
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.toggle-link') as HTMLAnchorElement;
    expect(link?.href).to.equal('https://www.canada.ca/fr/index.html');
  });

  it('auto-generates URL when targetUrl not provided', async () => {
    // Mock window.location
    delete (window as { location?: unknown }).location;
    (window as { location?: unknown }).location = new URL('https://www.canada.ca/en/services.html') as unknown;

    element.locale = 'en-CA';
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.toggle-link') as HTMLAnchorElement;
    expect(link?.href).to.include('/fr/');
  });

  it('emits gc-language-toggle event when clicked', async () => {
    element.targetUrl = '/fr/test.html';
    await element.updateComplete;

    const eventSpy = vi.fn();
    element.addEventListener('gc-language-toggle', eventSpy);

    const link = element.shadowRoot?.querySelector('.toggle-link') as HTMLElement;
    link?.click();

    expect(eventSpy).toHaveBeenCalledOnce();
  });

  it('includes language transition details in event', async () => {
    element.locale = 'en-CA';
    element.targetUrl = '/fr/test.html';
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-language-toggle', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    const link = element.shadowRoot?.querySelector('.toggle-link') as HTMLElement;
    link?.click();

    expect(eventDetail).to.include({
      from: 'en-CA',
      to: 'fr-CA'
    });
  });

  it('includes timestamp in event detail', async () => {
    element.targetUrl = '/fr/test.html';
    await element.updateComplete;

    let eventDetail: { timestamp?: string } | null = null;
    element.addEventListener('gc-language-toggle', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    const link = element.shadowRoot?.querySelector('.toggle-link') as HTMLElement;
    link?.click();

    expect(eventDetail?.timestamp).to.be.a('string');
  });

  it('switches locale in-place when no targetUrl', async () => {
    element.locale = 'en-CA';
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.toggle-link') as HTMLElement;
    link?.click();

    await element.updateComplete;

    expect(element.locale).to.equal('fr-CA');
  });

  it('prevents default navigation when no targetUrl', async () => {
    element.locale = 'en-CA';
    await element.updateComplete;

    let defaultPrevented = false;
    const link = element.shadowRoot?.querySelector('.toggle-link') as HTMLElement;
    
    link?.addEventListener('click', (e) => {
      defaultPrevented = e.defaultPrevented;
    });

    link?.click();

    expect(defaultPrevented).to.be.true;
  });

  it('navigates when targetUrl is provided', async () => {
    element.targetUrl = '/fr/test.html';
    await element.updateComplete;

    let defaultPrevented = false;
    const link = element.shadowRoot?.querySelector('.toggle-link') as HTMLElement;
    
    link?.addEventListener('click', (e) => {
      defaultPrevented = e.defaultPrevented;
    });

    link?.click();

    expect(defaultPrevented).to.be.false;
  });

  it('applies default variant styling by default', () => {
    const link = element.shadowRoot?.querySelector('.toggle-link');
    expect(link?.classList.contains('toggle-link')).to.be.true;
  });

  it('applies dark variant when specified', async () => {
    element.variant = 'dark';
    await element.updateComplete;

    expect(element.getAttribute('variant')).to.equal('dark');
  });

  it('applies inline variant when specified', async () => {
    element.variant = 'inline';
    await element.updateComplete;

    expect(element.getAttribute('variant')).to.equal('inline');
  });

  it('updates when locale changes', async () => {
    element.locale = 'en-CA';
    await element.updateComplete;

    let link = element.shadowRoot?.querySelector('.toggle-link');
    expect(link?.textContent).to.include('Français');

    element.locale = 'fr-CA';
    await element.updateComplete;

    link = element.shadowRoot?.querySelector('.toggle-link');
    expect(link?.textContent).to.include('English');
  });

  it('abbreviation has aria-hidden attribute', () => {
    const abbr = element.shadowRoot?.querySelector('.language-abbr');
    expect(abbr?.getAttribute('aria-hidden')).to.equal('true');
  });

  it('renders as anchor element', () => {
    const link = element.shadowRoot?.querySelector('.toggle-link');
    expect(link?.tagName).to.equal('A');
  });

  it('has proper CSS class', () => {
    const link = element.shadowRoot?.querySelector('.toggle-link');
    expect(link?.classList.contains('toggle-link')).to.be.true;
  });

  it('handles targetLanguage property', async () => {
    element.locale = 'en-CA';
    element.targetLanguage = 'fr';
    await element.updateComplete;

    let eventDetail: { to?: string } | null = null;
    element.addEventListener('gc-language-toggle', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    const link = element.shadowRoot?.querySelector('.toggle-link') as HTMLElement;
    link?.click();

    expect(eventDetail?.to).to.equal('fr-CA');
  });

  it('toggles between en-CA and fr-CA', async () => {
    element.locale = 'en-CA';
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.toggle-link') as HTMLElement;
    
    // First toggle: en-CA -> fr-CA
    link?.click();
    await element.updateComplete;
    expect(element.locale).to.equal('fr-CA');

    // Second toggle: fr-CA -> en-CA
    link?.click();
    await element.updateComplete;
    expect(element.locale).to.equal('en-CA');
  });

  it('replaces /en/ with /fr/ in URL path', async () => {
    delete (window as { location?: unknown }).location;
    (window as { location?: unknown }).location = new URL('https://www.canada.ca/en/immigration/services.html') as unknown;

    element.locale = 'en-CA';
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.toggle-link') as HTMLAnchorElement;
    expect(link?.href).to.include('/fr/immigration/services.html');
  });

  it('replaces /fr/ with /en/ in URL path', async () => {
    delete (window as { location?: unknown }).location;
    (window as { location?: unknown }).location = new URL('https://www.canada.ca/fr/immigration/services.html') as unknown;

    element.locale = 'fr-CA';
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.toggle-link') as HTMLAnchorElement;
    expect(link?.href).to.include('/en/immigration/services.html');
  });

  it('uses correct text for both languages', async () => {
    element.locale = 'en-CA';
    await element.updateComplete;
    
    const linkEn = element.shadowRoot?.querySelector('.toggle-link');
    expect(linkEn?.textContent).to.include('Français');

    element.locale = 'fr-CA';
    await element.updateComplete;

    const linkFr = element.shadowRoot?.querySelector('.toggle-link');
    expect(linkFr?.textContent).to.include('English');
  });

  it('maintains focus styles for accessibility', async () => {
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.toggle-link') as HTMLElement;
    link?.focus();

    expect(document.activeElement?.shadowRoot?.activeElement).to.equal(link);
  });

  it('includes targetUrl in event detail', async () => {
    element.targetUrl = '/fr/page.html';
    await element.updateComplete;

    let eventDetail: { targetUrl?: string } | null = null;
    element.addEventListener('gc-language-toggle', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    const link = element.shadowRoot?.querySelector('.toggle-link') as HTMLElement;
    link?.click();

    expect(eventDetail?.targetUrl).to.equal('/fr/page.html');
  });

  it('handles click multiple times', async () => {
    element.locale = 'en-CA';
    await element.updateComplete;

    const eventSpy = vi.fn();
    element.addEventListener('gc-language-toggle', eventSpy);

    const link = element.shadowRoot?.querySelector('.toggle-link') as HTMLElement;
    
    link?.click();
    await element.updateComplete;
    
    link?.click();
    await element.updateComplete;

    expect(eventSpy).toHaveBeenCalledTimes(2);
  });
});
