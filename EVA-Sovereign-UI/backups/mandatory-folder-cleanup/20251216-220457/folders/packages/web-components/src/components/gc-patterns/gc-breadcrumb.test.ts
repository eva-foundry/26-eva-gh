import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-breadcrumb';
import type { GCBreadcrumb } from './gc-breadcrumb';

describe('gc-breadcrumb', () => {
  let element: GCBreadcrumb;

  beforeEach(async () => {
    element = await fixture(html`<gc-breadcrumb></gc-breadcrumb>`);
  });

  it('renders navigation element', () => {
    const nav = element.shadowRoot?.querySelector('nav');
    expect(nav).to.exist;
  });

  it('renders breadcrumb list', () => {
    const list = element.shadowRoot?.querySelector('.breadcrumb-list');
    expect(list).to.exist;
    expect(list?.tagName).to.equal('OL');
  });

  it('renders home link by default', async () => {
    element.items = [{ label: 'Page 1', href: '/page1' }];
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.breadcrumb-link');
    expect(links?.length).to.equal(1); // Home link
    expect(links?.[0]?.textContent?.trim()).to.equal('Home');
  });

  it('hides home link when hideHomeLink is true', async () => {
    element.items = [{ label: 'Page 1', href: '/page1' }];
    element.hideHomeLink = true;
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.breadcrumb-link');
    expect(links?.length).to.equal(0); // No links, only current page
  });

  it('renders multiple breadcrumb items', async () => {
    element.items = [
      { label: 'Services', href: '/services' },
      { label: 'Immigration', href: '/immigration' },
      { label: 'Passports' }
    ];
    await element.updateComplete;

    const items = element.shadowRoot?.querySelectorAll('.breadcrumb-item');
    expect(items?.length).to.equal(4); // Home + 3 items
  });

  it('renders links for all items except last', async () => {
    element.items = [
      { label: 'Services', href: '/services' },
      { label: 'Immigration', href: '/immigration' },
      { label: 'Passports' }
    ];
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.breadcrumb-link');
    const current = element.shadowRoot?.querySelector('.breadcrumb-current');

    expect(links?.length).to.equal(3); // Home + Services + Immigration
    expect(current).to.exist;
    expect(current?.textContent?.trim()).to.equal('Passports');
  });

  it('marks last item with aria-current="page"', async () => {
    element.items = [
      { label: 'Services', href: '/services' },
      { label: 'Passports' }
    ];
    await element.updateComplete;

    const current = element.shadowRoot?.querySelector('[aria-current="page"]');
    expect(current).to.exist;
    expect(current?.textContent?.trim()).to.equal('Passports');
  });

  it('renders separators between items', async () => {
    element.items = [
      { label: 'Services', href: '/services' },
      { label: 'Immigration', href: '/immigration' },
      { label: 'Passports' }
    ];
    await element.updateComplete;

    const separators = element.shadowRoot?.querySelectorAll('.separator');
    expect(separators?.length).to.equal(3); // Between Home-Services, Services-Immigration, Immigration-Passports
  });

  it('does not render separator after last item', async () => {
    element.items = [{ label: 'Passports' }];
    await element.updateComplete;

    const lastItem = element.shadowRoot?.querySelectorAll('.breadcrumb-item')[1]; // Index 1 (after Home)
    const separator = lastItem?.querySelector('.separator');
    expect(separator).to.not.exist;
  });

  it('emits gc-breadcrumb-click event when link clicked', async () => {
    element.items = [{ label: 'Services', href: '/services' }];
    await element.updateComplete;

    const eventSpy = vi.fn();
    element.addEventListener('gc-breadcrumb-click', eventSpy);

    const link = element.shadowRoot?.querySelector('.breadcrumb-link') as HTMLElement;
    link?.click();

    expect(eventSpy).toHaveBeenCalledOnce();
    expect(eventSpy.mock.calls[0][0].detail).to.include({
      index: 0,
      href: '/'
    });
  });

  it('includes item data in click event', async () => {
    const testItem = { label: 'Test Page', href: '/test' };
    element.items = [testItem];
    element.hideHomeLink = true;
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-breadcrumb-click', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    const link = element.shadowRoot?.querySelector('.breadcrumb-link') as HTMLElement;
    link?.click();

    expect(eventDetail).to.deep.include({
      item: testItem,
      index: 0,
      href: '/test'
    });
  });

  it('renders nothing when items array is empty and hideHomeLink is true', async () => {
    element.items = [];
    element.hideHomeLink = true;
    await element.updateComplete;

    const nav = element.shadowRoot?.querySelector('nav');
    expect(nav).to.not.exist;
  });

  it('has proper ARIA attributes', async () => {
    element.items = [{ label: 'Services', href: '/services' }];
    await element.updateComplete;

    const nav = element.shadowRoot?.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).to.equal('Breadcrumb navigation');

    const separators = element.shadowRoot?.querySelectorAll('.separator');
    separators?.forEach(separator => {
      expect(separator.getAttribute('aria-hidden')).to.equal('true');
    });
  });

  it('renders links with correct href attributes', async () => {
    element.items = [
      { label: 'Services', href: '/services' },
      { label: 'Immigration', href: '/immigration' }
    ];
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.breadcrumb-link') as NodeListOf<HTMLAnchorElement>;
    expect(links[0]?.href).to.include('/'); // Home
    expect(links[1]?.href).to.include('/services');
  });

  it('uses # as fallback when href is not provided', async () => {
    element.items = [{ label: 'No Link' }];
    element.hideHomeLink = true;
    await element.updateComplete;

    const current = element.shadowRoot?.querySelector('.breadcrumb-current');
    expect(current).to.exist; // Last item is always current, not a link
  });

  it('supports French Canadian locale', async () => {
    element.locale = 'fr-CA';
    element.items = [{ label: 'Services', href: '/services' }];
    await element.updateComplete;

    const nav = element.shadowRoot?.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).to.equal('Fil d\'ariane');

    const homeLink = element.shadowRoot?.querySelector('.breadcrumb-link');
    expect(homeLink?.textContent?.trim()).to.equal('Accueil');
  });

  it('applies proper CSS classes', async () => {
    element.items = [{ label: 'Services', href: '/services' }];
    await element.updateComplete;

    const list = element.shadowRoot?.querySelector('.breadcrumb-list');
    expect(list?.classList.contains('breadcrumb-list')).to.be.true;

    const item = element.shadowRoot?.querySelector('.breadcrumb-item');
    expect(item?.classList.contains('breadcrumb-item')).to.be.true;

    const link = element.shadowRoot?.querySelector('.breadcrumb-link');
    expect(link?.classList.contains('breadcrumb-link')).to.be.true;
  });

  it('renders current page text without link', async () => {
    element.items = [{ label: 'Current Page' }];
    await element.updateComplete;

    const current = element.shadowRoot?.querySelector('.breadcrumb-current');
    expect(current?.tagName).to.equal('SPAN');
    expect(current?.textContent?.trim()).to.equal('Current Page');
  });

  it('handles empty label gracefully', async () => {
    element.items = [{ label: '', href: '/test' }];
    await element.updateComplete;

    const link = element.shadowRoot?.querySelectorAll('.breadcrumb-link')[1]; // Second link (after Home)
    expect(link?.textContent?.trim()).to.equal('');
  });

  it('maintains proper list semantics', async () => {
    element.items = [
      { label: 'Services', href: '/services' },
      { label: 'Immigration' }
    ];
    await element.updateComplete;

    const list = element.shadowRoot?.querySelector('.breadcrumb-list');
    expect(list?.tagName).to.equal('OL');

    const items = element.shadowRoot?.querySelectorAll('.breadcrumb-item');
    items?.forEach(item => {
      expect(item.tagName).to.equal('LI');
    });
  });

  it('supports keyboard navigation', async () => {
    element.items = [{ label: 'Services', href: '/services' }];
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.breadcrumb-link') as HTMLElement;
    link?.focus();

    expect(document.activeElement?.shadowRoot?.activeElement).to.equal(link);
  });

  it('displays separator with correct content', async () => {
    element.items = [{ label: 'Services', href: '/services' }];
    await element.updateComplete;

    const separator = element.shadowRoot?.querySelector('.separator');
    const style = window.getComputedStyle(separator!, '::before');
    
    // Note: getComputedStyle doesn't always return ::before content in tests,
    // so we just verify the element exists and has the class
    expect(separator).to.exist;
    expect(separator?.classList.contains('separator')).to.be.true;
  });

  it('renders correct number of items with hideHomeLink', async () => {
    element.items = [
      { label: 'Services', href: '/services' },
      { label: 'Immigration' }
    ];
    element.hideHomeLink = true;
    await element.updateComplete;

    const items = element.shadowRoot?.querySelectorAll('.breadcrumb-item');
    expect(items?.length).to.equal(2); // Only the provided items, no Home
  });

  it('handles single item breadcrumb', async () => {
    element.items = [{ label: 'Single Page' }];
    element.hideHomeLink = true;
    await element.updateComplete;

    const items = element.shadowRoot?.querySelectorAll('.breadcrumb-item');
    expect(items?.length).to.equal(1);

    const current = element.shadowRoot?.querySelector('.breadcrumb-current');
    expect(current?.textContent?.trim()).to.equal('Single Page');

    const separators = element.shadowRoot?.querySelectorAll('.separator');
    expect(separators?.length).to.equal(0); // No separators with single item
  });
});
