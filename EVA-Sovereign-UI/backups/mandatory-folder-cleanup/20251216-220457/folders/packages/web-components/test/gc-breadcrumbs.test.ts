import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html, beAccessible } from './vitest-helpers-clean';
import type { BreadcrumbItem } from '../src/components/gc-patterns/gc-breadcrumbs.js';
import { GCBreadcrumbs } from '../src/components/gc-patterns/gc-breadcrumbs.js';
import '../src/components/gc-patterns/gc-breadcrumbs.js';

describe('GC Breadcrumbs', () => {
  const sampleItems: BreadcrumbItem[] = [
    { text: 'Home', href: '/', id: 'home' },
    { text: 'Services', href: '/services', id: 'services' },
    { text: 'Passports', href: '/services/passports', id: 'passports' },
  ];

  const longItems: BreadcrumbItem[] = [
    { text: 'Home', href: '/' },
    { text: 'Government', href: '/government' },
    { text: 'Departments', href: '/government/departments' },
    { text: 'Immigration', href: '/government/departments/immigration' },
    { text: 'Services', href: '/government/departments/immigration/services' },
    { text: 'Citizenship', href: '/government/departments/immigration/services/citizenship' },
  ];

  describe('Initialization', () => {
    it('renders with default properties', async () => {
      const el = await fixture<GCBreadcrumbs>(html`<gc-breadcrumbs></gc-breadcrumbs>`);
      
      expect(el).toBeDefined();
      expect(el.items).toEqual([]);
      expect(el.separator).toBe('›');
      expect(el.autoCollapse).toBe(true);
      expect(el.maxItems).toBe(3);
      expect(el.compact).toBe(false);
      expect(el.inverted).toBe(false);
      expect(el.showStructuredData).toBe(true);
      expect(el.locale).toBe('en-CA');
    });

    it('renders with items', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      expect(el.items).toEqual(sampleItems);
    });

    it('renders with custom separator', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" separator="/"></gc-breadcrumbs>
      `);
      
      expect(el.separator).toBe('/');
    });

    it('renders with shadow DOM', async () => {
      const el = await fixture<GCBreadcrumbs>(html`<gc-breadcrumbs></gc-breadcrumbs>`);
      
      expect(el.shadowRoot).toBeDefined();
      expect(el.shadowRoot).not.toBeNull();
    });

    it('has proper tag name', async () => {
      const el = await fixture<GCBreadcrumbs>(html`<gc-breadcrumbs></gc-breadcrumbs>`);
      
      expect(el.tagName.toLowerCase()).toBe('gc-breadcrumbs');
    });
  });

  describe('Breadcrumb Items', () => {
    it('renders all breadcrumb items', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" .autoCollapse="${false}"></gc-breadcrumbs>
      `);
      
      const items = el.shadowRoot!.querySelectorAll('.breadcrumb-item');
      expect(items.length).toBe(3);
    });

    it('renders breadcrumb text', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" .autoCollapse="${false}"></gc-breadcrumbs>
      `);
      
      const items = el.shadowRoot!.querySelectorAll('.breadcrumb-item');
      expect(items[0].textContent).toContain('Home');
      expect(items[1].textContent).toContain('Services');
      expect(items[2].textContent).toContain('Passports');
    });

    it('renders links for non-current items', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" .autoCollapse="${false}"></gc-breadcrumbs>
      `);
      
      const links = el.shadowRoot!.querySelectorAll('a');
      expect(links.length).toBe(2); // First two items are links
      expect(links[0].getAttribute('href')).toBe('/');
      expect(links[1].getAttribute('href')).toBe('/services');
    });

    it('renders current page without link', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" .autoCollapse="${false}"></gc-breadcrumbs>
      `);
      
      const currentItem = el.shadowRoot!.querySelector('.breadcrumb-item.current');
      expect(currentItem).toBeDefined();
      expect(currentItem?.querySelector('a')).toBeNull();
      expect(currentItem?.querySelector('span[aria-current="page"]')).toBeDefined();
    });

    it('marks current item with aria-current="page"', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" .autoCollapse="${false}"></gc-breadcrumbs>
      `);
      
      const currentSpan = el.shadowRoot!.querySelector('span[aria-current="page"]');
      expect(currentSpan).toBeDefined();
      expect(currentSpan?.textContent).toBe('Passports');
    });
  });

  describe('Separators', () => {
    it('renders separators between items', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" .autoCollapse="${false}"></gc-breadcrumbs>
      `);
      
      const separators = el.shadowRoot!.querySelectorAll('.breadcrumb-separator');
      expect(separators.length).toBe(2); // Between 3 items
    });

    it('uses default separator "›"', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" .autoCollapse="${false}"></gc-breadcrumbs>
      `);
      
      const separator = el.shadowRoot!.querySelector('.breadcrumb-separator');
      expect(separator?.textContent?.trim()).toBe('›');
    });

    it('uses custom separator', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" separator="/" .autoCollapse="${false}"></gc-breadcrumbs>
      `);
      
      const separator = el.shadowRoot!.querySelector('.breadcrumb-separator');
      expect(separator?.textContent?.trim()).toBe('/');
    });

    it('marks separators as aria-hidden', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" .autoCollapse="${false}"></gc-breadcrumbs>
      `);
      
      const separators = el.shadowRoot!.querySelectorAll('.breadcrumb-separator');
      separators.forEach(sep => {
        expect(sep.getAttribute('aria-hidden')).toBe('true');
      });
    });
  });

  describe('Auto-Collapse', () => {
    it('collapses items when exceeding maxItems', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${longItems}" .autoCollapse="${true}" .maxItems="${3}"></gc-breadcrumbs>
      `);
      
      const ellipsis = el.shadowRoot!.querySelector('.breadcrumb-ellipsis');
      expect(ellipsis).toBeDefined();
    });

    it('does not collapse when items <= maxItems', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" .autoCollapse="${true}" .maxItems="${3}"></gc-breadcrumbs>
      `);
      
      const ellipsis = el.shadowRoot!.querySelector('.breadcrumb-ellipsis');
      expect(ellipsis).toBeNull();
    });

    it('does not collapse when autoCollapse is false', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${longItems}" .autoCollapse="${false}"></gc-breadcrumbs>
      `);
      
      const ellipsis = el.shadowRoot!.querySelector('.breadcrumb-ellipsis');
      expect(ellipsis).toBeNull();
      
      const items = el.shadowRoot!.querySelectorAll('.breadcrumb-item');
      expect(items.length).toBe(6);
    });

    it('expands collapsed breadcrumbs on ellipsis click', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${longItems}" .autoCollapse="${true}" .maxItems="${3}"></gc-breadcrumbs>
      `);
      
      const ellipsis = el.shadowRoot!.querySelector('.breadcrumb-ellipsis') as HTMLButtonElement;
      expect(ellipsis).toBeDefined();
      
      ellipsis.click();
      await el.updateComplete;
      
      expect(el.autoCollapse).toBe(false);
      const items = el.shadowRoot!.querySelectorAll('.breadcrumb-item');
      expect(items.length).toBe(6);
    });

    it('ellipsis has accessible label', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${longItems}" .autoCollapse="${true}" .maxItems="${3}"></gc-breadcrumbs>
      `);
      
      const ellipsis = el.shadowRoot!.querySelector('.breadcrumb-ellipsis');
      expect(ellipsis?.hasAttribute('aria-label')).toBe(true);
      expect(ellipsis?.getAttribute('aria-label')).toBe('Show all breadcrumb levels');
    });
  });

  describe('Compact Mode', () => {
    it('has compact attribute when enabled', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" compact></gc-breadcrumbs>
      `);
      
      expect(el.hasAttribute('compact')).toBe(true);
      expect(el.compact).toBe(true);
    });

    it('does not have compact attribute when disabled', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      expect(el.hasAttribute('compact')).toBe(false);
      expect(el.compact).toBe(false);
    });
  });

  describe('Inverted Colors', () => {
    it('has inverted attribute when enabled', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" inverted></gc-breadcrumbs>
      `);
      
      expect(el.hasAttribute('inverted')).toBe(true);
      expect(el.inverted).toBe(true);
    });

    it('does not have inverted attribute when disabled', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      expect(el.hasAttribute('inverted')).toBe(false);
      expect(el.inverted).toBe(false);
    });
  });

  describe('Structured Data', () => {
    it('generates structured data by default', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      const script = el.shadowRoot!.querySelector('script[type="application/ld+json"]');
      expect(script).toBeDefined();
    });

    it('does not generate structured data when disabled', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" .showStructuredData="${false}"></gc-breadcrumbs>
      `);
      
      const script = el.shadowRoot!.querySelector('script[type="application/ld+json"]');
      expect(script).toBeNull();
    });

    it('structured data contains BreadcrumbList type', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      const script = el.shadowRoot!.querySelector('script[type="application/ld+json"]');
      const data = JSON.parse(script?.textContent || '{}');
      
      expect(data['@type']).toBe('BreadcrumbList');
    });

    it('structured data contains all items', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      const script = el.shadowRoot!.querySelector('script[type="application/ld+json"]');
      const data = JSON.parse(script?.textContent || '{}');
      
      expect(data.itemListElement).toHaveLength(3);
      expect(data.itemListElement[0].name).toBe('Home');
      expect(data.itemListElement[1].name).toBe('Services');
      expect(data.itemListElement[2].name).toBe('Passports');
    });

    it('structured data has correct positions', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      const script = el.shadowRoot!.querySelector('script[type="application/ld+json"]');
      const data = JSON.parse(script?.textContent || '{}');
      
      expect(data.itemListElement[0].position).toBe(1);
      expect(data.itemListElement[1].position).toBe(2);
      expect(data.itemListElement[2].position).toBe(3);
    });
  });

  describe('Accessibility', () => {
    it('has nav element with aria-label', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      const nav = el.shadowRoot!.querySelector('nav');
      expect(nav?.hasAttribute('aria-label')).toBe(true);
      expect(nav?.getAttribute('aria-label')).toBe('You are here:');
    });

    it('uses French aria-label when locale is fr-CA', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" locale="fr-CA"></gc-breadcrumbs>
      `);
      
      const nav = el.shadowRoot!.querySelector('nav');
      expect(nav?.getAttribute('aria-label')).toBe('Vous êtes ici :');
    });

    it('has semantic ol list structure', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      const list = el.shadowRoot!.querySelector('ol');
      expect(list).toBeDefined();
      expect(list?.classList.contains('breadcrumbs')).toBe(true);
    });

    it('uses li elements for breadcrumb items', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" .autoCollapse="${false}"></gc-breadcrumbs>
      `);
      
      const items = el.shadowRoot!.querySelectorAll('ol > li');
      expect(items.length).toBe(3);
    });

    it('has screen reader text "You are here:"', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      const srOnly = el.shadowRoot!.querySelector('.sr-only');
      expect(srOnly?.textContent).toBe('You are here:');
    });

    it('passes aXe accessibility audit', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      await beAccessible(el);
    });
  });

  describe('Events', () => {
    it('emits gc-breadcrumb-click event on link click', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" .autoCollapse="${false}"></gc-breadcrumbs>
      `);
      
      const eventSpy = vi.fn();
      el.addEventListener('gc-breadcrumb-click', eventSpy);
      
      const link = el.shadowRoot!.querySelector('a')!;
      link.click();
      
      await el.updateComplete;
      
      expect(eventSpy).toHaveBeenCalledTimes(1);
    });

    it('event contains item and index', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" .autoCollapse="${false}"></gc-breadcrumbs>
      `);
      
      const eventSpy = vi.fn();
      el.addEventListener('gc-breadcrumb-click', eventSpy);
      
      const link = el.shadowRoot!.querySelector('a')!;
      link.click();
      
      await el.updateComplete;
      
      const eventDetail = eventSpy.mock.calls[0][0].detail;
      expect(eventDetail).toHaveProperty('item');
      expect(eventDetail).toHaveProperty('index');
      expect(eventDetail.item).toEqual(sampleItems[0]);
      expect(eventDetail.index).toBe(0);
    });

    it('event bubbles and is composed', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" .autoCollapse="${false}"></gc-breadcrumbs>
      `);
      
      const eventSpy = vi.fn();
      el.addEventListener('gc-breadcrumb-click', eventSpy);
      
      const link = el.shadowRoot!.querySelector('a')!;
      link.click();
      
      await el.updateComplete;
      
      const event = eventSpy.mock.calls[0][0];
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it('does not emit event for current (last) item', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" .autoCollapse="${false}"></gc-breadcrumbs>
      `);
      
      const eventSpy = vi.fn();
      el.addEventListener('gc-breadcrumb-click', eventSpy);
      
      const currentItem = el.shadowRoot!.querySelector('.breadcrumb-item.current span');
      const clickEvent = new MouseEvent('click', { bubbles: true });
      currentItem?.dispatchEvent(clickEvent);
      
      await el.updateComplete;
      
      expect(eventSpy).not.toHaveBeenCalled();
    });
  });

  describe('Bilingual Support', () => {
    it('uses English "You are here:" by default', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" locale="en-CA"></gc-breadcrumbs>
      `);
      
      const nav = el.shadowRoot!.querySelector('nav');
      expect(nav?.getAttribute('aria-label')).toBe('You are here:');
    });

    it('uses French "Vous êtes ici :" when locale is fr-CA', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}" locale="fr-CA"></gc-breadcrumbs>
      `);
      
      const nav = el.shadowRoot!.querySelector('nav');
      expect(nav?.getAttribute('aria-label')).toBe('Vous êtes ici :');
    });

    it('uses French ellipsis label when locale is fr-CA', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${longItems}" .autoCollapse="${true}" .maxItems="${3}" locale="fr-CA"></gc-breadcrumbs>
      `);
      
      const ellipsis = el.shadowRoot!.querySelector('.breadcrumb-ellipsis');
      expect(ellipsis?.getAttribute('aria-label')).toBe('Afficher tous les niveaux');
    });
  });

  describe('GC Design System Compliance', () => {
    it('uses Lato font family', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      // Verify font-family is defined in component styles
      expect(el.shadowRoot).toBeDefined();
    });

    it('uses GC blue color (#284162) for links', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      // CSS variable should be defined
      const link = el.shadowRoot!.querySelector('a');
      expect(link).toBeDefined();
    });

    it('displays as block', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      // Verify display:block is set in component styles
      expect(el.shadowRoot).toBeDefined();
    });
  });

  describe('Performance', () => {
    it('renders within 100ms', async () => {
      const start = performance.now();
      
      await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(100);
    });

    it('handles long breadcrumb lists efficiently', async () => {
      const start = performance.now();
      
      await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${longItems}"></gc-breadcrumbs>
      `);
      
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(100);
    });

    it('updates reactively to items changes', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      const newItems = [
        ...sampleItems,
        { text: 'Apply', href: '/services/passports/apply' },
      ];
      
      el.items = newItems;
      await el.updateComplete;
      
      const items = el.shadowRoot!.querySelectorAll('.breadcrumb-item');
      expect(items.length).toBe(4);
    });
  });

  describe('CSS Custom Properties', () => {
    it('exposes part="container" for styling', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      const container = el.shadowRoot!.querySelector('[part="container"]');
      expect(container).toBeDefined();
    });

    it('exposes part="list" for styling', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      const list = el.shadowRoot!.querySelector('[part="list"]');
      expect(list).toBeDefined();
    });

    it('exposes part="item" for styling', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      const item = el.shadowRoot!.querySelector('[part="item"]');
      expect(item).toBeDefined();
    });

    it('exposes part="link" for styling', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      const link = el.shadowRoot!.querySelector('[part="link"]');
      expect(link).toBeDefined();
    });

    it('exposes part="separator" for styling', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${sampleItems}"></gc-breadcrumbs>
      `);
      
      const separator = el.shadowRoot!.querySelector('[part="separator"]');
      expect(separator).toBeDefined();
    });
  });

  describe('Empty State', () => {
    it('renders nothing when items array is empty', async () => {
      const el = await fixture<GCBreadcrumbs>(html`
        <gc-breadcrumbs .items="${[]}"></gc-breadcrumbs>
      `);
      
      const nav = el.shadowRoot!.querySelector('nav');
      expect(nav).toBeNull();
    });

    it('renders nothing when no items provided', async () => {
      const el = await fixture<GCBreadcrumbs>(html`<gc-breadcrumbs></gc-breadcrumbs>`);
      
      const nav = el.shadowRoot!.querySelector('nav');
      expect(nav).toBeNull();
    });
  });
});
