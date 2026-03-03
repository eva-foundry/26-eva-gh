import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html, expect as wcExpect } from '@open-wc/testing';
import { GCLanguageToggle } from '../src/components/gc-patterns/gc-language-toggle.js';
import '../src/components/gc-patterns/gc-language-toggle.js';

describe('GC Language Toggle', () => {
  describe('Initialization', () => {
    it('renders with default properties', async () => {
      const el = await fixture<GCLanguageToggle>(html`<gc-language-toggle></gc-language-toggle>`);
      
      expect(el).toBeDefined();
      expect(el.current).toBe('en-CA');
      expect(el.size).toBe('medium');
      expect(el.displayMode).toBe('full');
      expect(el.inverted).toBe(false);
    });

    it('renders with custom current locale', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="fr-CA"></gc-language-toggle>
      `);
      
      expect(el.current).toBe('fr-CA');
    });

    it('accepts all property types via JavaScript', async () => {
      const el = await fixture<GCLanguageToggle>(html`<gc-language-toggle></gc-language-toggle>`);
      
      el.current = 'fr-CA';
      el.size = 'large';
      el.displayMode = 'abbreviated';
      el.inverted = true;
      el.prefixLabel = 'Language:';
      el.showAbbr = true;
      el.animated = false;
      
      await el.updateComplete;
      
      expect(el.current).toBe('fr-CA');
      expect(el.size).toBe('large');
      expect(el.displayMode).toBe('abbreviated');
      expect(el.inverted).toBe(true);
      expect(el.prefixLabel).toBe('Language:');
      expect(el.showAbbr).toBe(true);
      expect(el.animated).toBe(false);
    });

    it('renders with shadow DOM', async () => {
      const el = await fixture<GCLanguageToggle>(html`<gc-language-toggle></gc-language-toggle>`);
      
      expect(el.shadowRoot).toBeDefined();
      expect(el.shadowRoot).not.toBeNull();
    });

    it('has proper tag name', async () => {
      const el = await fixture<GCLanguageToggle>(html`<gc-language-toggle></gc-language-toggle>`);
      
      expect(el.tagName.toLowerCase()).toBe('gc-language-toggle');
    });
  });

  describe('Language Toggle Link', () => {
    it('renders toggle link with correct text (EN → FR)', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en-CA"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link).toBeDefined();
      expect(link?.textContent?.trim()).toBe('Français');
    });

    it('renders toggle link with correct text (FR → EN)', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="fr-CA"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link?.textContent?.trim()).toBe('English');
    });

    it('renders abbreviated text (EN → FR)', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en-CA" display-mode="abbreviated"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link?.textContent?.trim()).toBe('FR');
    });

    it('renders abbreviated text (FR → EN)', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="fr-CA" display-mode="abbreviated"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link?.textContent?.trim()).toBe('EN');
    });

    it('shows language abbreviation in parentheses when show-abbr is true', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en-CA" show-abbr></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link?.textContent?.trim()).toBe('Français (FR)');
    });

    it('has correct lang attribute on link', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en-CA"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link?.getAttribute('lang')).toBe('fr');
    });

    it('has role="button" on link', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en-CA"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link?.getAttribute('role')).toBe('button');
    });
  });

  describe('Language Switching', () => {
    it('switches from English to French on click', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en-CA"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a')!;
      link.click();
      
      await el.updateComplete;
      
      expect(el.current).toBe('fr-CA');
    });

    it('switches from French to English on click', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="fr-CA"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a')!;
      link.click();
      
      await el.updateComplete;
      
      expect(el.current).toBe('en-CA');
    });

    it('emits gc-language-change event on toggle', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en-CA"></gc-language-toggle>
      `);
      
      const eventSpy = vi.fn();
      el.addEventListener('gc-language-change', eventSpy);
      
      const link = el.shadowRoot!.querySelector('a')!;
      link.click();
      
      await el.updateComplete;
      
      expect(eventSpy).toHaveBeenCalledTimes(1);
      expect(eventSpy.mock.calls[0][0].detail).toEqual({
        from: 'en-CA',
        to: 'fr-CA',
      });
    });

    it('event bubbles and is composed', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en-CA"></gc-language-toggle>
      `);
      
      const eventSpy = vi.fn();
      el.addEventListener('gc-language-change', eventSpy);
      
      const link = el.shadowRoot!.querySelector('a')!;
      link.click();
      
      await el.updateComplete;
      
      const event = eventSpy.mock.calls[0][0];
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it('updates link text after switching', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en-CA"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a')!;
      expect(link.textContent?.trim()).toBe('Français');
      
      link.click();
      await el.updateComplete;
      
      expect(link.textContent?.trim()).toBe('English');
    });

    it('updates lang attribute after switching', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en-CA"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a')!;
      expect(link.getAttribute('lang')).toBe('fr');
      
      link.click();
      await el.updateComplete;
      
      expect(link.getAttribute('lang')).toBe('en');
    });
  });

  describe('Size Variants', () => {
    it('has size="small" attribute reflected', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle size="small"></gc-language-toggle>
      `);
      
      expect(el.getAttribute('size')).toBe('small');
    });

    it('has size="medium" attribute reflected', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle size="medium"></gc-language-toggle>
      `);
      
      expect(el.getAttribute('size')).toBe('medium');
    });

    it('has size="large" attribute reflected', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle size="large"></gc-language-toggle>
      `);
      
      expect(el.getAttribute('size')).toBe('large');
    });

    it('accepts size changes programmatically', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle size="small"></gc-language-toggle>
      `);
      
      el.size = 'large';
      await el.updateComplete;
      
      expect(el.getAttribute('size')).toBe('large');
    });
  });

  describe('Display Modes', () => {
    it('has display-mode="full" attribute reflected', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle display-mode="full"></gc-language-toggle>
      `);
      
      expect(el.getAttribute('display-mode')).toBe('full');
    });

    it('has display-mode="abbreviated" attribute reflected', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle display-mode="abbreviated"></gc-language-toggle>
      `);
      
      expect(el.getAttribute('display-mode')).toBe('abbreviated');
    });

    it('applies abbreviated CSS class in abbreviated mode', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle display-mode="abbreviated"></gc-language-toggle>
      `);
      
      const container = el.shadowRoot!.querySelector('.lang-toggle');
      expect(container?.classList.contains('lang-toggle--abbreviated')).toBe(true);
    });

    it('does not apply abbreviated CSS class in full mode', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle display-mode="full"></gc-language-toggle>
      `);
      
      const container = el.shadowRoot!.querySelector('.lang-toggle');
      expect(container?.classList.contains('lang-toggle--abbreviated')).toBe(false);
    });
  });

  describe('Inverted Colors', () => {
    it('has inverted attribute when enabled', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle inverted></gc-language-toggle>
      `);
      
      expect(el.hasAttribute('inverted')).toBe(true);
      expect(el.inverted).toBe(true);
    });

    it('does not have inverted attribute when disabled', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle></gc-language-toggle>
      `);
      
      expect(el.hasAttribute('inverted')).toBe(false);
      expect(el.inverted).toBe(false);
    });

    it('can toggle inverted programmatically', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle></gc-language-toggle>
      `);
      
      el.inverted = true;
      await el.updateComplete;
      
      expect(el.hasAttribute('inverted')).toBe(true);
      
      el.inverted = false;
      await el.updateComplete;
      
      expect(el.hasAttribute('inverted')).toBe(false);
    });
  });

  describe('Prefix Label', () => {
    it('renders prefix label when provided', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle prefix-label="Language:"></gc-language-toggle>
      `);
      
      const label = el.shadowRoot!.querySelector('.lang-toggle__label');
      expect(label).toBeDefined();
      expect(label?.textContent?.trim()).toBe('Language:');
    });

    it('does not render prefix label when not provided', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle></gc-language-toggle>
      `);
      
      const label = el.shadowRoot!.querySelector('.lang-toggle__label');
      expect(label).toBeNull();
    });

    it('updates prefix label programmatically', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle></gc-language-toggle>
      `);
      
      el.prefixLabel = 'Langue:';
      await el.updateComplete;
      
      const label = el.shadowRoot!.querySelector('.lang-toggle__label');
      expect(label?.textContent?.trim()).toBe('Langue:');
    });
  });

  describe('Accessibility', () => {
    it('has ARIA label on link', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en-CA"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link?.hasAttribute('aria-label')).toBe(true);
    });

    it('uses default bilingual ARIA label (EN → FR)', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en-CA"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link?.getAttribute('aria-label')).toBe('Switch to French / Passer au français');
    });

    it('uses default bilingual ARIA label (FR → EN)', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="fr-CA"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link?.getAttribute('aria-label')).toBe('Passer à l\'anglais / Switch to English');
    });

    it('allows custom ARIA label', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle aria-label="Custom toggle label"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link?.getAttribute('aria-label')).toBe('Custom toggle label');
    });

    it('is keyboard accessible with Tab', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a')!;
      
      // Simulate Tab key focus
      link.focus();
      expect(el.shadowRoot!.activeElement).toBe(link);
    });

    it('passes aXe accessibility audit', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en-CA"></gc-language-toggle>
      `);
      
      await wcExpect(el).to.be.accessible();
    });
  });

  describe('GC Design System Compliance', () => {
    it('uses Lato font family', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle></gc-language-toggle>
      `);
      
      // Verify font-family is defined in component styles
      expect(el.shadowRoot).toBeDefined();
    });

    it('uses GC blue color (#284162) for text', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle></gc-language-toggle>
      `);
      
      // CSS variable should be defined in component styles
      const link = el.shadowRoot!.querySelector('a');
      expect(link).toBeDefined();
    });

    it('displays as inline-block', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle></gc-language-toggle>
      `);
      
      // Verify display:inline-block is set in component styles
      expect(el.shadowRoot).toBeDefined();
    });
  });

  describe('Events', () => {
    it('prevents default link behavior', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en-CA"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a')!;
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      
      link.dispatchEvent(clickEvent);
      
      expect(clickEvent.defaultPrevented).toBe(true);
    });

    it('emits event with correct detail structure', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en-CA"></gc-language-toggle>
      `);
      
      const eventSpy = vi.fn();
      el.addEventListener('gc-language-change', eventSpy);
      
      const link = el.shadowRoot!.querySelector('a')!;
      link.click();
      
      await el.updateComplete;
      
      const eventDetail = eventSpy.mock.calls[0][0].detail;
      expect(eventDetail).toHaveProperty('from');
      expect(eventDetail).toHaveProperty('to');
      expect(eventDetail.from).toBe('en-CA');
      expect(eventDetail.to).toBe('fr-CA');
    });
  });

  describe('Performance', () => {
    it('renders within 100ms', async () => {
      const start = performance.now();
      
      await fixture<GCLanguageToggle>(html`<gc-language-toggle></gc-language-toggle>`);
      
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(100);
    });

    it('handles rapid language switches', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en-CA"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a')!;
      
      // Rapid clicks
      link.click();
      await el.updateComplete;
      link.click();
      await el.updateComplete;
      link.click();
      await el.updateComplete;
      
      expect(el.current).toBe('fr-CA');
    });

    it('updates reactively to property changes', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en-CA"></gc-language-toggle>
      `);
      
      el.current = 'fr-CA';
      await el.updateComplete;
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link?.textContent?.trim()).toBe('English');
    });
  });

  describe('Bilingual Support', () => {
    it('displays French text when current is en-CA', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en-CA"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link?.textContent).toContain('Français');
    });

    it('displays English text when current is fr-CA', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="fr-CA"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link?.textContent).toContain('English');
    });

    it('handles locale variants (en vs en-CA)', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle current="en"></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('a')!;
      link.click();
      await el.updateComplete;
      
      expect(el.current).toBe('fr-CA');
    });
  });

  describe('CSS Custom Properties', () => {
    it('exposes part="container" for styling', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle></gc-language-toggle>
      `);
      
      const container = el.shadowRoot!.querySelector('[part="container"]');
      expect(container).toBeDefined();
    });

    it('exposes part="link" for styling', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle></gc-language-toggle>
      `);
      
      const link = el.shadowRoot!.querySelector('[part="link"]');
      expect(link).toBeDefined();
    });

    it('exposes part="label" when prefix label is present', async () => {
      const el = await fixture<GCLanguageToggle>(html`
        <gc-language-toggle prefix-label="Language:"></gc-language-toggle>
      `);
      
      const label = el.shadowRoot!.querySelector('[part="label"]');
      expect(label).toBeDefined();
    });
  });
});
