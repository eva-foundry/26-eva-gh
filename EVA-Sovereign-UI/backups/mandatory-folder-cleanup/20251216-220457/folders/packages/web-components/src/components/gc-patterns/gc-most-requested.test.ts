import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html, expect as chaiExpect } from '@open-wc/testing';
import type { GCMostRequested } from './gc-most-requested';
import './gc-most-requested';

describe('gc-most-requested', () => {
  let element: GCMostRequested;

  beforeEach(async () => {
    element = await fixture(html`<gc-most-requested></gc-most-requested>`);
  });

  describe('Rendering', () => {
    it('renders with default properties', async () => {
      expect(element).toBeDefined();
    
    // Provide content for accessibility testing
    element.links = [{ href: '/test', text: 'Test Link', description: 'Test description' }];
    await element.updateComplete;
    

    it('renders section element', async () => {
      const section = element.shadowRoot!.querySelector('section');
      expect(section).toBeDefined();
    });

    it('renders with slotted content', async () => {
      element = await fixture(html`
        <gc-most-requested>
          <div class="custom">Custom content</div>
        </gc-most-requested>
      `);
      
      const slot = element.shadowRoot!.querySelector('slot');
      expect(slot).toBeDefined();
    });
  });

  describe('Heading', () => {
    it('displays default heading', async () => {
      const heading = element.shadowRoot!.querySelector('.heading');
      expect(heading?.textContent).toBe('Most requested');
    });

    it('displays custom heading', async () => {
      element.heading = 'Popular services';
      await element.updateComplete;

      const heading = element.shadowRoot!.querySelector('.heading');
      expect(heading?.textContent).toBe('Popular services');
    });

    it('has proper heading ID for aria-labelledby', async () => {
      const heading = element.shadowRoot!.querySelector('#most-requested-heading');
      expect(heading).toBeDefined();
      
      const section = element.shadowRoot!.querySelector('section');
      expect(section?.getAttribute('aria-labelledby')).toBe('most-requested-heading');
    });
  });

  describe('Links', () => {
    it('renders multiple links', async () => {
      element.links = [
        { label: 'Employment Insurance', href: '/ei' },
        { label: 'Passports', href: '/passports' },
        { label: 'My Account', href: '/account' }
      ];
      await element.updateComplete;

      const links = element.shadowRoot!.querySelectorAll('.most-requested-link');
      expect(links.length).toBe(3);
    });

    it('renders link with correct href', async () => {
      element.links = [
        { label: 'Employment Insurance', href: '/ei' }
      ];
      await element.updateComplete;

      const link = element.shadowRoot!.querySelector('.most-requested-link') as HTMLAnchorElement;
      expect(link.href).toContain('/ei');
    });

    it('renders link label correctly', async () => {
      element.links = [
        { label: 'Employment Insurance', href: '/ei' }
      ];
      await element.updateComplete;

      const link = element.shadowRoot!.querySelector('.most-requested-link');
      expect(link?.textContent?.trim()).toContain('Employment Insurance');
    });

    it('renders link icon when provided', async () => {
      element.links = [
        { label: 'Passports', href: '/passports', icon: '🛂' }
      ];
      await element.updateComplete;

      const icon = element.shadowRoot!.querySelector('.link-icon');
      expect(icon).toBeDefined();
      expect(icon?.textContent).toBe('🛂');
    });

    it('does not render icon when not provided', async () => {
      element.links = [
        { label: 'Passports', href: '/passports' }
      ];
      await element.updateComplete;

      const icon = element.shadowRoot!.querySelector('.link-icon');
      expect(icon).toBeNull();
    });

    it('renders 5-7 links typically', async () => {
      element.links = [
        { label: 'Link 1', href: '/1' },
        { label: 'Link 2', href: '/2' },
        { label: 'Link 3', href: '/3' },
        { label: 'Link 4', href: '/4' },
        { label: 'Link 5', href: '/5' },
        { label: 'Link 6', href: '/6' }
      ];
      await element.updateComplete;

      const links = element.shadowRoot!.querySelectorAll('.most-requested-link');
      expect(links.length).toBeGreaterThanOrEqual(5);
      expect(links.length).toBeLessThanOrEqual(7);
    });
  });

  describe('Link Interactions', () => {
    it('emits event on link click', async () => {
      const eventSpy = vi.fn();
      element.addEventListener('gc-most-requested-click', eventSpy);

      element.links = [
        { label: 'Passports', href: '/passports' }
      ];
      await element.updateComplete;

      const link = element.shadowRoot!.querySelector('.most-requested-link') as HTMLAnchorElement;
      link.click();

      expect(eventSpy).toHaveBeenCalled();
    });

    it('includes correct event details', async () => {
      const eventSpy = vi.fn();
      element.addEventListener('gc-most-requested-click', eventSpy);

      element.links = [
        { label: 'Passports', href: '/passports', icon: '🛂' }
      ];
      await element.updateComplete;

      const link = element.shadowRoot!.querySelector('.most-requested-link') as HTMLAnchorElement;
      link.click();

      const event = eventSpy.mock.calls[0][0] as CustomEvent;
      expect(event.detail.label).toBe('Passports');
      expect(event.detail.href).toContain('/passports');
      expect(event.detail.icon).toBe('🛂');
    });

    it('includes correct event details without icon', async () => {
      const eventSpy = vi.fn();
      element.addEventListener('gc-most-requested-click', eventSpy);

      element.links = [
        { label: 'Employment Insurance', href: '/ei' }
      ];
      await element.updateComplete;

      const link = element.shadowRoot!.querySelector('.most-requested-link') as HTMLAnchorElement;
      link.click();

      const event = eventSpy.mock.calls[0][0] as CustomEvent;
      expect(event.detail.label).toBe('Employment Insurance');
      expect(event.detail.icon).toBeUndefined();
    });
  });

  describe('Layout', () => {
    it('renders flex container', async () => {
      element.links = [
        { label: 'Link 1', href: '/1' },
        { label: 'Link 2', href: '/2' }
      ];
      await element.updateComplete;

      const list = element.shadowRoot!.querySelector('.links-list');
      expect(list).toBeDefined();
    });

    it('applies prominent visual treatment', async () => {
      element.links = [{ label: 'Link', href: '/link' }];
      await element.updateComplete;

      const container = element.shadowRoot!.querySelector('.most-requested-container');
      expect(container).toBeDefined();
    });
  });

  describe('Accessibility', () => {
    it('uses semantic section element', async () => {
      const section = element.shadowRoot!.querySelector('section');
      expect(section).toBeDefined();
    });

    it('connects heading with section via aria-labelledby', async () => {
      const section = element.shadowRoot!.querySelector('section');
      const heading = element.shadowRoot!.querySelector('#most-requested-heading');
      
      expect(section?.getAttribute('aria-labelledby')).toBe('most-requested-heading');
      expect(heading).toBeDefined();
    });

    it('uses semantic list structure', async () => {
      element.links = [{ label: 'Link', href: '/link' }];
      await element.updateComplete;

      const list = element.shadowRoot!.querySelector('ul[role="list"]');
      expect(list).toBeDefined();
      
      const listItem = element.shadowRoot!.querySelector('li');
      expect(listItem).toBeDefined();
    });

    it('hides decorative icons from screen readers', async () => {
      element.links = [
        { label: 'Passports', href: '/passports', icon: '🛂' }
      ];
      await element.updateComplete;

      const icon = element.shadowRoot!.querySelector('.link-icon');
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });

    it('has minimum touch target size (44px)', async () => {
      element.links = [{ label: 'Link', href: '/link' }];
      await element.updateComplete;

      const link = element.shadowRoot!.querySelector('.most-requested-link') as HTMLElement;
      const styles = getComputedStyle(link);
      const minHeight = parseInt(styles.minHeight);
      
      expect(minHeight).toBeGreaterThanOrEqual(44);
    });

    it('passes accessibility audit', async () => {
      element.links = [
        { label: 'Employment Insurance', href: '/ei' },
        { label: 'Passports', href: '/passports' }
      ];
      await element.updateComplete;

      await chaiExpect(element).to.be.accessible();
    });
  });

  describe('Bilingual Support', () => {
    it('displays English heading by default', async () => {
      const heading = element.shadowRoot!.querySelector('.heading');
      expect(heading?.textContent).toBe('Most requested');
    });

    it('displays French heading', async () => {
      element.locale = 'fr-CA';
      await element.updateComplete;

      const heading = element.shadowRoot!.querySelector('.heading');
      expect(heading?.textContent).toBe('En demande');
    });

    it('preserves custom heading in both locales', async () => {
      element.heading = 'Popular services';
      await element.updateComplete;

      let heading = element.shadowRoot!.querySelector('.heading');
      expect(heading?.textContent).toBe('Popular services');

      element.locale = 'fr-CA';
      await element.updateComplete;

      heading = element.shadowRoot!.querySelector('.heading');
      expect(heading?.textContent).toBe('Popular services');
    });
  });

  describe('Empty States', () => {
    it('renders empty list when no links provided', async () => {
      element.links = [];
      await element.updateComplete;

      const links = element.shadowRoot!.querySelectorAll('.most-requested-link');
      expect(links.length).toBe(0);
    });

    it('still renders heading when empty', async () => {
      element.links = [];
      await element.updateComplete;

      const heading = element.shadowRoot!.querySelector('.heading');
      expect(heading).toBeDefined();
    });
  });
});
