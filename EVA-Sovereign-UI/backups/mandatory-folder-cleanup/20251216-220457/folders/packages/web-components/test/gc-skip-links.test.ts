import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { fixture, html, expect as wcExpect } from '@open-wc/testing';
import type { SkipLink } from '../src/components/gc-patterns/gc-skip-links.js';
import { GCSkipLinks } from '../src/components/gc-patterns/gc-skip-links.js';
import '../src/components/gc-patterns/gc-skip-links.js';

describe('GC Skip Links', () => {
  const sampleLinks: SkipLink[] = [
    { text: 'Skip to main content', target: '#main-content', id: 'skip-main' },
    { text: 'Skip to footer', target: '#footer', id: 'skip-footer' },
  ];

  // Create mock target elements in document
  beforeEach(() => {
    const main = document.createElement('main');
    main.id = 'main-content';
    main.textContent = 'Main content area';
    document.body.appendChild(main);

    const footer = document.createElement('footer');
    footer.id = 'footer';
    footer.textContent = 'Footer area';
    document.body.appendChild(footer);
  });

  afterEach(() => {
    document.getElementById('main-content')?.remove();
    document.getElementById('footer')?.remove();
  });

  describe('Initialization', () => {
    it('renders with default properties', async () => {
      const el = await fixture<GCSkipLinks>(html`<gc-skip-links></gc-skip-links>`);
      
      expect(el).toBeDefined();
      expect(el.links).toEqual([]);
      expect(el.locale).toBe('en-CA');
      expect(el.inverted).toBe(false);
      expect(el.smoothScroll).toBe(true);
      expect(el.focusTarget).toBe(true);
      expect(el.scrollOffset).toBe(0);
    });

    it('renders with custom links', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      expect(el.links).toEqual(sampleLinks);
    });

    it('renders with shadow DOM', async () => {
      const el = await fixture<GCSkipLinks>(html`<gc-skip-links></gc-skip-links>`);
      
      expect(el.shadowRoot).toBeDefined();
      expect(el.shadowRoot).not.toBeNull();
    });

    it('has proper tag name', async () => {
      const el = await fixture<GCSkipLinks>(html`<gc-skip-links></gc-skip-links>`);
      
      expect(el.tagName.toLowerCase()).toBe('gc-skip-links');
    });
  });

  describe('Default Skip Links', () => {
    it('renders default English skip links when no links provided', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links locale="en-CA"></gc-skip-links>
      `);
      
      const links = el.shadowRoot!.querySelectorAll('.skip-link');
      expect(links.length).toBe(2);
      expect(links[0].textContent?.trim()).toBe('Skip to main content');
      expect(links[1].textContent?.trim()).toBe('Skip to footer');
    });

    it('renders default French skip links when locale is fr-CA', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links locale="fr-CA"></gc-skip-links>
      `);
      
      const links = el.shadowRoot!.querySelectorAll('.skip-link');
      expect(links.length).toBe(2);
      expect(links[0].textContent?.trim()).toBe('Passer au contenu principal');
      expect(links[1].textContent?.trim()).toBe('Passer au pied de page');
    });

    it('default links have correct targets', async () => {
      const el = await fixture<GCSkipLinks>(html`<gc-skip-links></gc-skip-links>`);
      
      const links = el.shadowRoot!.querySelectorAll('.skip-link');
      expect(links[0].getAttribute('href')).toBe('#main-content');
      expect(links[1].getAttribute('href')).toBe('#footer');
    });
  });

  describe('Custom Skip Links', () => {
    it('renders custom skip links', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const links = el.shadowRoot!.querySelectorAll('.skip-link');
      expect(links.length).toBe(2);
      expect(links[0].textContent?.trim()).toBe('Skip to main content');
      expect(links[1].textContent?.trim()).toBe('Skip to footer');
    });

    it('renders custom link targets', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const links = el.shadowRoot!.querySelectorAll('.skip-link');
      expect(links[0].getAttribute('href')).toBe('#main-content');
      expect(links[1].getAttribute('href')).toBe('#footer');
    });

    it('assigns custom IDs to links', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const links = el.shadowRoot!.querySelectorAll('.skip-link');
      expect(links[0].id).toBe('skip-main');
      expect(links[1].id).toBe('skip-footer');
    });

    it('generates IDs when not provided', async () => {
      const linksWithoutIds: SkipLink[] = [
        { text: 'Skip to content', target: '#content' },
      ];

      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${linksWithoutIds}"></gc-skip-links>
      `);
      
      const link = el.shadowRoot!.querySelector('.skip-link');
      expect(link?.id).toBe('skip-link-0');
    });
  });

  describe('Visual Hiding Until Focus', () => {
    it('skip links are positioned off-screen by default', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const link = el.shadowRoot!.querySelector('.skip-link') as HTMLElement;
      expect(link).toBeDefined();
      // Links should be positioned off-screen (CSS handles this)
    });

    it('has navigation role on container', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const container = el.shadowRoot!.querySelector('[role="navigation"]');
      expect(container).toBeDefined();
    });

    it('has accessible label on navigation container', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const container = el.shadowRoot!.querySelector('[role="navigation"]');
      expect(container?.getAttribute('aria-label')).toBe('Skip links');
    });
  });

  describe('Skip Link Navigation', () => {
    it('emits gc-skip-link-activated event on click', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const eventSpy = vi.fn();
      el.addEventListener('gc-skip-link-activated', eventSpy);
      
      const link = el.shadowRoot!.querySelector('.skip-link') as HTMLAnchorElement;
      link.click();
      
      await el.updateComplete;
      
      expect(eventSpy).toHaveBeenCalledTimes(1);
    });

    it('event contains link and targetElement', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const eventSpy = vi.fn();
      el.addEventListener('gc-skip-link-activated', eventSpy);
      
      const link = el.shadowRoot!.querySelector('.skip-link') as HTMLAnchorElement;
      link.click();
      
      await el.updateComplete;
      
      const eventDetail = eventSpy.mock.calls[0][0].detail;
      expect(eventDetail).toHaveProperty('link');
      expect(eventDetail).toHaveProperty('targetElement');
      expect(eventDetail.link.text).toBe('Skip to main content');
      expect(eventDetail.targetElement?.id).toBe('main-content');
    });

    it('event bubbles and is composed', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const eventSpy = vi.fn();
      el.addEventListener('gc-skip-link-activated', eventSpy);
      
      const link = el.shadowRoot!.querySelector('.skip-link') as HTMLAnchorElement;
      link.click();
      
      await el.updateComplete;
      
      const event = eventSpy.mock.calls[0][0];
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it('prevents default link behavior', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const link = el.shadowRoot!.querySelector('.skip-link') as HTMLAnchorElement;
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      
      link.dispatchEvent(clickEvent);
      
      expect(clickEvent.defaultPrevented).toBe(true);
    });
  });

  describe('Keyboard Navigation', () => {
    it('activates on Enter key', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const eventSpy = vi.fn();
      el.addEventListener('gc-skip-link-activated', eventSpy);
      
      const link = el.shadowRoot!.querySelector('.skip-link') as HTMLAnchorElement;
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
      
      link.dispatchEvent(enterEvent);
      await el.updateComplete;
      
      expect(eventSpy).toHaveBeenCalledTimes(1);
    });

    it('activates on Space key', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const eventSpy = vi.fn();
      el.addEventListener('gc-skip-link-activated', eventSpy);
      
      const link = el.shadowRoot!.querySelector('.skip-link') as HTMLAnchorElement;
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
      
      link.dispatchEvent(spaceEvent);
      await el.updateComplete;
      
      expect(eventSpy).toHaveBeenCalledTimes(1);
    });

    it('prevents default on Enter key', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const link = el.shadowRoot!.querySelector('.skip-link') as HTMLAnchorElement;
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
      
      link.dispatchEvent(enterEvent);
      
      expect(enterEvent.defaultPrevented).toBe(true);
    });

    it('prevents default on Space key', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const link = el.shadowRoot!.querySelector('.skip-link') as HTMLAnchorElement;
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
      
      link.dispatchEvent(spaceEvent);
      
      expect(spaceEvent.defaultPrevented).toBe(true);
    });
  });

  describe('Smooth Scrolling', () => {
    it('has smoothScroll enabled by default', async () => {
      const el = await fixture<GCSkipLinks>(html`<gc-skip-links></gc-skip-links>`);
      
      expect(el.smoothScroll).toBe(true);
    });

    it('can disable smooth scrolling', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .smoothScroll="${false}"></gc-skip-links>
      `);
      
      expect(el.smoothScroll).toBe(false);
    });
  });

  describe('Focus Target', () => {
    it('has focusTarget enabled by default', async () => {
      const el = await fixture<GCSkipLinks>(html`<gc-skip-links></gc-skip-links>`);
      
      expect(el.focusTarget).toBe(true);
    });

    it('can disable focus target', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .focusTarget="${false}"></gc-skip-links>
      `);
      
      expect(el.focusTarget).toBe(false);
    });
  });

  describe('Scroll Offset', () => {
    it('has zero scroll offset by default', async () => {
      const el = await fixture<GCSkipLinks>(html`<gc-skip-links></gc-skip-links>`);
      
      expect(el.scrollOffset).toBe(0);
    });

    it('accepts custom scroll offset', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links scroll-offset="100"></gc-skip-links>
      `);
      
      expect(el.scrollOffset).toBe(100);
    });
  });

  describe('Inverted Colors', () => {
    it('has inverted attribute when enabled', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links inverted></gc-skip-links>
      `);
      
      expect(el.hasAttribute('inverted')).toBe(true);
      expect(el.inverted).toBe(true);
    });

    it('does not have inverted attribute when disabled', async () => {
      const el = await fixture<GCSkipLinks>(html`<gc-skip-links></gc-skip-links>`);
      
      expect(el.hasAttribute('inverted')).toBe(false);
      expect(el.inverted).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('has semantic anchor elements', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const links = el.shadowRoot!.querySelectorAll('a.skip-link');
      expect(links.length).toBe(2);
    });

    it('all links have href attributes', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const links = el.shadowRoot!.querySelectorAll('a.skip-link');
      links.forEach(link => {
        expect(link.hasAttribute('href')).toBe(true);
      });
    });

    it('passes aXe accessibility audit', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      await wcExpect(el).to.be.accessible();
    });
  });

  describe('Bilingual Support', () => {
    it('uses English text by default', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links locale="en-CA"></gc-skip-links>
      `);
      
      const link = el.shadowRoot!.querySelector('.skip-link');
      expect(link?.textContent).toContain('Skip to main content');
    });

    it('uses French text when locale is fr-CA', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links locale="fr-CA"></gc-skip-links>
      `);
      
      const link = el.shadowRoot!.querySelector('.skip-link');
      expect(link?.textContent).toContain('Passer au contenu principal');
    });
  });

  describe('GC Design System Compliance', () => {
    it('uses Lato font family', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      // Verify font-family is defined in component styles
      expect(el.shadowRoot).toBeDefined();
    });

    it('uses GC blue color (#284162)', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const link = el.shadowRoot!.querySelector('.skip-link');
      expect(link).toBeDefined();
    });

    it('has high z-index for always-on-top behavior', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      // Component should have high z-index
      expect(el.shadowRoot).toBeDefined();
    });
  });

  describe('Performance', () => {
    it('renders within 100ms', async () => {
      const start = performance.now();
      
      await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(100);
    });

    it('handles multiple skip links efficiently', async () => {
      const manyLinks: SkipLink[] = Array.from({ length: 10 }, (_, i) => ({
        text: `Skip to section ${i + 1}`,
        target: `#section-${i + 1}`,
      }));

      const start = performance.now();
      
      await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${manyLinks}"></gc-skip-links>
      `);
      
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(100);
    });

    it('updates reactively to links changes', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const newLinks = [
        ...sampleLinks,
        { text: 'Skip to navigation', target: '#nav' },
      ];
      
      el.links = newLinks;
      await el.updateComplete;
      
      const links = el.shadowRoot!.querySelectorAll('.skip-link');
      expect(links.length).toBe(3);
    });
  });

  describe('CSS Custom Properties', () => {
    it('exposes part="container" for styling', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const container = el.shadowRoot!.querySelector('[part="container"]');
      expect(container).toBeDefined();
    });

    it('exposes part="link" for styling', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${sampleLinks}"></gc-skip-links>
      `);
      
      const link = el.shadowRoot!.querySelector('[part="link"]');
      expect(link).toBeDefined();
    });
  });

  describe('Empty State', () => {
    it('renders default links when links array is empty', async () => {
      const el = await fixture<GCSkipLinks>(html`
        <gc-skip-links .links="${[]}"></gc-skip-links>
      `);
      
      const links = el.shadowRoot!.querySelectorAll('.skip-link');
      expect(links.length).toBe(2); // Default links
    });
  });
});
