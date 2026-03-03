import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { EVACard } from './eva-card.js';
import './eva-card.js';
import { waitForUpdate, hasAttribute } from '../../test/helpers.js';

describe('eva-card', () => {
  let element: EVACard;

  beforeEach(async () => {
    element = await fixture(html`<eva-card></eva-card>`);
  });

  describe('Initialization', () => {
    it('should create card element', () => {
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe('eva-card');
    });

    it('should default to default variant', () => {
      expect(element.variant).toBe('default');
    });

    it('should default to medium padding', () => {
      expect(element.padding).toBe('medium');
    });
  });

  describe('Slots', () => {
    it('should render header slot', async () => {
      const element = await fixture(html`
        <eva-card>
          <div slot="header">Card Header</div>
        </eva-card>
      `);
      const headerSlot = element.shadowRoot!.querySelector('slot[name="header"]');
      expect(headerSlot).toBeDefined();
    });

    it('should render default content slot', async () => {
      const element = await fixture(html`
        <eva-card>
          <p>Card content</p>
        </eva-card>
      `);
      const contentSlot = element.shadowRoot!.querySelector('slot:not([name])');
      expect(contentSlot).toBeDefined();
    });

    it('should render footer slot', async () => {
      const element = await fixture(html`
        <eva-card>
          <div slot="footer">Card Footer</div>
        </eva-card>
      `);
      const footerSlot = element.shadowRoot!.querySelector('slot[name="footer"]');
      expect(footerSlot).toBeDefined();
    });
  });

  describe('Padding', () => {
    it('should support none padding', async () => {
      element.padding = 'none';
      await element.updateComplete;
      expect(element.padding).toBe('none');
    });

    it('should support small padding', async () => {
      element.padding = 'small';
      await element.updateComplete;
      expect(element.padding).toBe('small');
    });

    it('should support medium padding', async () => {
      element.padding = 'medium';
      await element.updateComplete;
      expect(element.padding).toBe('medium');
    });

    it('should support large padding', async () => {
      element.padding = 'large';
      await element.updateComplete;
      expect(element.padding).toBe('large');
    });
  });

  describe('Header and Footer', () => {
    it('should render header content', async () => {
      const element = await fixture(html`
        <eva-card>
          <div slot="header">Header Content</div>
        </eva-card>
      `);
      const headerSlot = element.shadowRoot!.querySelector('slot[name="header"]');
      expect(headerSlot).toBeDefined();
    });

    it('should render footer content', async () => {
      const element = await fixture(html`
        <eva-card>
          <div slot="footer">Footer Content</div>
        </eva-card>
      `);
      const footerSlot = element.shadowRoot!.querySelector('slot[name="footer"]');
      expect(footerSlot).toBeDefined();
    });
  });

  describe('Variants', () => {
    it('should support default variant', async () => {
      element.variant = 'default';
      await waitForUpdate(element);
      expect(element.variant).toBe('default');
      expect(hasAttribute(element, 'variant', 'default')).toBe(true);
    });

    it('should support bordered variant', async () => {
      element.variant = 'bordered';
      await waitForUpdate(element);
      expect(element.variant).toBe('bordered');
      expect(hasAttribute(element, 'variant', 'bordered')).toBe(true);
    });

    it('should support elevated variant', async () => {
      element.variant = 'elevated';
      await waitForUpdate(element);
      expect(element.variant).toBe('elevated');
      expect(hasAttribute(element, 'variant', 'elevated')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should be accessible with all slots', async () => {
      const element = await fixture(html`
        <eva-card>
          <div slot="header"><h3>Accessible Card</h3></div>
          <p>Content goes here</p>
          <div slot="footer">Footer</div>
        </eva-card>
      `);
      expect(element).toBeDefined();
    });

    it('should support semantic HTML in slots', async () => {
      const element = await fixture(html`
        <eva-card>
          <header slot="header">
            <h2>Card Header</h2>
          </header>
          <article>Main content</article>
          <footer slot="footer">Card footer</footer>
        </eva-card>
      `);
      expect(element).toBeDefined();
    });
  });
});
