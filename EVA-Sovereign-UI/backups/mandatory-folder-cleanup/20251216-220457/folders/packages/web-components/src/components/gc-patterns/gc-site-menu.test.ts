import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-site-menu';
import type { GCSiteMenu } from './gc-site-menu';

describe('gc-site-menu', () => {
  let element: GCSiteMenu;

  beforeEach(async () => {
    element = await fixture(html`<gc-site-menu></gc-site-menu>`);
  });

  it('renders navigation element', async () => {
    element.items = [{ label: 'Home', href: '/' }];
    await element.updateComplete;

    const nav = element.shadowRoot?.querySelector('nav');
    expect(nav).to.exist;
  });

  it('renders menu list', async () => {
    element.items = [{ label: 'Home', href: '/' }];
    await element.updateComplete;

    const list = element.shadowRoot?.querySelector('.menu-list');
    expect(list).to.exist;
    expect(list?.tagName).to.equal('UL');
  });

  it('renders menu items', async () => {
    element.items = [
      { label: 'Jobs', href: '/jobs' },
      { label: 'Immigration', href: '/immigration' },
      { label: 'Travel', href: '/travel' }
    ];
    await element.updateComplete;

    const items = element.shadowRoot?.querySelectorAll('.menu-item');
    expect(items?.length).to.equal(3);
  });

  it('renders menu links with correct text', async () => {
    element.items = [
      { label: 'Jobs', href: '/jobs' },
      { label: 'Immigration', href: '/immigration' }
    ];
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.menu-link');
    expect(links?.[0]?.textContent?.trim()).to.equal('Jobs');
    expect(links?.[1]?.textContent?.trim()).to.equal('Immigration');
  });

  it('renders menu links with correct href', async () => {
    element.items = [
      { label: 'Jobs', href: '/jobs' },
      { label: 'Immigration', href: '/immigration' }
    ];
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.menu-link') as NodeListOf<HTMLAnchorElement>;
    expect(links[0]?.href).to.include('/jobs');
    expect(links[1]?.href).to.include('/immigration');
  });

  it('marks current page with aria-current', async () => {
    element.items = [
      { label: 'Jobs', href: '/jobs', current: false },
      { label: 'Immigration', href: '/immigration', current: true },
      { label: 'Travel', href: '/travel' }
    ];
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.menu-link');
    expect(links[0]?.getAttribute('aria-current')).to.not.equal('page');
    expect(links[1]?.getAttribute('aria-current')).to.equal('page');
    expect(links[2]?.getAttribute('aria-current')).to.not.equal('page');
  });

  it('emits gc-menu-click event when link clicked', async () => {
    element.items = [{ label: 'Jobs', href: '/jobs' }];
    await element.updateComplete;

    const eventSpy = vi.fn();
    element.addEventListener('gc-menu-click', eventSpy);

    const link = element.shadowRoot?.querySelector('.menu-link') as HTMLElement;
    link?.click();

    expect(eventSpy).toHaveBeenCalledOnce();
  });

  it('includes item data in click event', async () => {
    const testItem = { label: 'Immigration', href: '/immigration' };
    element.items = [testItem];
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-menu-click', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    const link = element.shadowRoot?.querySelector('.menu-link') as HTMLElement;
    link?.click();

    expect(eventDetail).to.deep.include({
      item: testItem,
      index: 0,
      href: '/immigration'
    });
  });

  it('renders nothing when items array is empty', async () => {
    element.items = [];
    await element.updateComplete;

    const nav = element.shadowRoot?.querySelector('nav');
    expect(nav).to.not.exist;
  });

  it('has proper ARIA attributes', async () => {
    element.items = [
      { label: 'Jobs', href: '/jobs' },
      { label: 'Immigration', href: '/immigration' }
    ];
    await element.updateComplete;

    const nav = element.shadowRoot?.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).to.equal('Site menu');

    const list = element.shadowRoot?.querySelector('.menu-list');
    expect(list?.getAttribute('role')).to.equal('menubar');

    const items = element.shadowRoot?.querySelectorAll('.menu-item');
    items?.forEach(item => {
      expect(item.getAttribute('role')).to.equal('none');
    });

    const links = element.shadowRoot?.querySelectorAll('.menu-link');
    links?.forEach(link => {
      expect(link.getAttribute('role')).to.equal('menuitem');
    });
  });

  it('applies proper CSS classes', async () => {
    element.items = [{ label: 'Jobs', href: '/jobs' }];
    await element.updateComplete;

    const container = element.shadowRoot?.querySelector('.menu-container');
    expect(container?.classList.contains('menu-container')).to.be.true;

    const list = element.shadowRoot?.querySelector('.menu-list');
    expect(list?.classList.contains('menu-list')).to.be.true;

    const item = element.shadowRoot?.querySelector('.menu-item');
    expect(item?.classList.contains('menu-item')).to.be.true;

    const link = element.shadowRoot?.querySelector('.menu-link');
    expect(link?.classList.contains('menu-link')).to.be.true;
  });

  it('supports French Canadian locale', async () => {
    element.locale = 'fr-CA';
    element.items = [{ label: 'Emplois', href: '/emplois' }];
    await element.updateComplete;

    const nav = element.shadowRoot?.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).to.equal('Menu du site');
  });

  it('handles single menu item', async () => {
    element.items = [{ label: 'Home', href: '/' }];
    await element.updateComplete;

    const items = element.shadowRoot?.querySelectorAll('.menu-item');
    expect(items?.length).to.equal(1);

    const link = element.shadowRoot?.querySelector('.menu-link');
    expect(link?.textContent?.trim()).to.equal('Home');
  });

  it('handles many menu items', async () => {
    element.items = [
      { label: 'Jobs', href: '/jobs' },
      { label: 'Immigration', href: '/immigration' },
      { label: 'Travel', href: '/travel' },
      { label: 'Business', href: '/business' },
      { label: 'Benefits', href: '/benefits' },
      { label: 'Health', href: '/health' },
      { label: 'Taxes', href: '/taxes' }
    ];
    await element.updateComplete;

    const items = element.shadowRoot?.querySelectorAll('.menu-item');
    expect(items?.length).to.equal(7);
  });

  it('renders links as anchor elements', async () => {
    element.items = [{ label: 'Jobs', href: '/jobs' }];
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.menu-link');
    expect(link?.tagName).to.equal('A');
  });

  it('maintains list semantics', async () => {
    element.items = [
      { label: 'Jobs', href: '/jobs' },
      { label: 'Immigration', href: '/immigration' }
    ];
    await element.updateComplete;

    const list = element.shadowRoot?.querySelector('.menu-list');
    expect(list?.tagName).to.equal('UL');

    const items = element.shadowRoot?.querySelectorAll('.menu-item');
    items?.forEach(item => {
      expect(item.tagName).to.equal('LI');
    });
  });

  it('supports keyboard navigation', async () => {
    element.items = [{ label: 'Jobs', href: '/jobs' }];
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.menu-link') as HTMLElement;
    link?.focus();

    expect(document.activeElement?.shadowRoot?.activeElement).to.equal(link);
  });

  it('handles empty label gracefully', async () => {
    element.items = [{ label: '', href: '/test' }];
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.menu-link');
    expect(link?.textContent?.trim()).to.equal('');
  });

  it('handles multiple current items', async () => {
    element.items = [
      { label: 'Jobs', href: '/jobs', current: true },
      { label: 'Immigration', href: '/immigration', current: true }
    ];
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.menu-link[aria-current="page"]');
    expect(links?.length).to.equal(2);
  });

  it('handles items without current property', async () => {
    element.items = [
      { label: 'Jobs', href: '/jobs' },
      { label: 'Immigration', href: '/immigration' }
    ];
    await element.updateComplete;

    const currentLinks = element.shadowRoot?.querySelectorAll('.menu-link[aria-current="page"]');
    expect(currentLinks?.length).to.equal(0);
  });

  it('emits event for each menu item click', async () => {
    element.items = [
      { label: 'Jobs', href: '/jobs' },
      { label: 'Immigration', href: '/immigration' }
    ];
    await element.updateComplete;

    const eventSpy = vi.fn();
    element.addEventListener('gc-menu-click', eventSpy);

    const links = element.shadowRoot?.querySelectorAll('.menu-link') as NodeListOf<HTMLElement>;
    links[0]?.click();
    links[1]?.click();

    expect(eventSpy).toHaveBeenCalledTimes(2);
  });

  it('includes correct index in event detail', async () => {
    element.items = [
      { label: 'Jobs', href: '/jobs' },
      { label: 'Immigration', href: '/immigration' },
      { label: 'Travel', href: '/travel' }
    ];
    await element.updateComplete;

    const events: Array<{ index: number }> = [];
    element.addEventListener('gc-menu-click', (e: Event) => {
      events.push({ index: (e as CustomEvent).detail.index });
    });

    const links = element.shadowRoot?.querySelectorAll('.menu-link') as NodeListOf<HTMLElement>;
    links[0]?.click();
    links[1]?.click();
    links[2]?.click();

    expect(events[0]?.index).to.equal(0);
    expect(events[1]?.index).to.equal(1);
    expect(events[2]?.index).to.equal(2);
  });

  it('renders with max-width container', async () => {
    element.items = [{ label: 'Jobs', href: '/jobs' }];
    await element.updateComplete;

    const container = element.shadowRoot?.querySelector('.menu-container');
    expect(container).to.exist;
  });

  it('displays links in horizontal layout', async () => {
    element.items = [
      { label: 'Jobs', href: '/jobs' },
      { label: 'Immigration', href: '/immigration' }
    ];
    await element.updateComplete;

    const list = element.shadowRoot?.querySelector('.menu-list') as HTMLElement;
    const styles = window.getComputedStyle(list);
    
    expect(styles.display).to.equal('flex');
  });

  it('handles click on current page link', async () => {
    element.items = [{ label: 'Jobs', href: '/jobs', current: true }];
    await element.updateComplete;

    const eventSpy = vi.fn();
    element.addEventListener('gc-menu-click', eventSpy);

    const link = element.shadowRoot?.querySelector('.menu-link') as HTMLElement;
    link?.click();

    expect(eventSpy).toHaveBeenCalledOnce();
  });

  it('uses semantic nav element', async () => {
    element.items = [{ label: 'Jobs', href: '/jobs' }];
    await element.updateComplete;

    const nav = element.shadowRoot?.querySelector('nav');
    expect(nav?.tagName).to.equal('NAV');
  });

  it('maintains accessible label on nav', async () => {
    element.items = [{ label: 'Jobs', href: '/jobs' }];
    await element.updateComplete;

    const nav = element.shadowRoot?.querySelector('nav');
    const ariaLabel = nav?.getAttribute('aria-label');
    
    expect(ariaLabel).to.be.a('string');
    expect(ariaLabel?.length).to.be.greaterThan(0);
  });
});
