import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-breadcrumbs';
import type { GCBreadcrumbs } from './gc-breadcrumbs';

describe('gc-breadcrumbs', () => {
  let element: GCBreadcrumbs;

  beforeEach(async () => {
    element = await fixture(html`<gc-breadcrumbs></gc-breadcrumbs>`);
  });

  it('renders nav element', () => {
    const nav = element.shadowRoot?.querySelector('nav');
    expect(nav).to.exist;
  });

  it('nav has aria-label', () => {
    const nav = element.shadowRoot?.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).to.be.a('string');
  });

  it('renders breadcrumbs list', () => {
    const list = element.shadowRoot?.querySelector('.breadcrumbs');
    expect(list).to.exist;
  });

  it('breadcrumbs is ol element', () => {
    const list = element.shadowRoot?.querySelector('.breadcrumbs');
    expect(list?.tagName.toLowerCase()).to.equal('ol');
  });

  it('renders default home item when no items provided', () => {
    const items = element.shadowRoot?.querySelectorAll('.breadcrumb-item');
    expect(items?.length).to.equal(1);
  });

  it('renders custom items', async () => {
    element.items = [
      { text: 'Home', href: '/' },
      { text: 'Products', href: '/products' },
      { text: 'Category' }
    ];
    await element.updateComplete;

    const items = element.shadowRoot?.querySelectorAll('.breadcrumb-item');
    expect(items?.length).to.equal(3);
  });

  it('breadcrumb items are li elements', () => {
    const items = element.shadowRoot?.querySelectorAll('.breadcrumb-item');
    items?.forEach(item => {
      expect(item.tagName.toLowerCase()).to.equal('li');
    });
  });

  it('renders links for non-last items with href', async () => {
    element.items = [
      { text: 'Home', href: '/' },
      { text: 'Current' }
    ];
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.breadcrumb-link');
    expect(link).to.exist;
    expect(link?.tagName.toLowerCase()).to.equal('a');
  });

  it('links have correct href', async () => {
    element.items = [
      { text: 'Home', href: '/home' },
      { text: 'Current' }
    ];
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.breadcrumb-link') as HTMLAnchorElement;
    expect(link?.href).to.include('/home');
  });

  it('renders current item as span', async () => {
    element.items = [
      { text: 'Home', href: '/' },
      { text: 'Current' }
    ];
    await element.updateComplete;

    const current = element.shadowRoot?.querySelector('.breadcrumb-current');
    expect(current).to.exist;
    expect(current?.tagName.toLowerCase()).to.equal('span');
  });

  it('current item has aria-current="page"', async () => {
    element.items = [
      { text: 'Home', href: '/' },
      { text: 'Current Page' }
    ];
    await element.updateComplete;

    const items = element.shadowRoot?.querySelectorAll('.breadcrumb-item');
    const lastItem = items?.[items.length - 1];
    const current = lastItem?.querySelector('.breadcrumb-current');
    expect(current?.getAttribute('aria-current')).to.equal('page');
  });

  it('renders separators between items', async () => {
    element.items = [
      { text: 'Home', href: '/' },
      { text: 'Products', href: '/products' },
      { text: 'Current' }
    ];
    await element.updateComplete;

    const separators = element.shadowRoot?.querySelectorAll('.breadcrumb-separator');
    expect(separators?.length).to.equal(2);
  });

  it('separators have aria-hidden="true"', async () => {
    element.items = [
      { text: 'Home', href: '/' },
      { text: 'Current' }
    ];
    await element.updateComplete;

    const separator = element.shadowRoot?.querySelector('.breadcrumb-separator');
    expect(separator?.getAttribute('aria-hidden')).to.equal('true');
  });

  it('does not render separator after last item', async () => {
    element.items = [
      { text: 'Home', href: '/' },
      { text: 'Current' }
    ];
    await element.updateComplete;

    const items = element.shadowRoot?.querySelectorAll('.breadcrumb-item');
    const lastItem = items?.[items.length - 1];
    const separator = lastItem?.querySelector('.breadcrumb-separator');
    expect(separator).to.not.exist;
  });

  it('uses default separator', () => {
    expect(element.separator).to.equal('›');
  });

  it('renders custom separator', async () => {
    element.separator = '/';
    element.items = [
      { text: 'Home', href: '/' },
      { text: 'Current' }
    ];
    await element.updateComplete;

    const separator = element.shadowRoot?.querySelector('.breadcrumb-separator');
    expect(separator?.textContent?.trim()).to.equal('/');
  });

  it('updates when items change', async () => {
    element.items = [
      { text: 'First', href: '/' }
    ];
    await element.updateComplete;

    let items = element.shadowRoot?.querySelectorAll('.breadcrumb-item');
    expect(items?.length).to.equal(1);

    element.items = [
      { text: 'First', href: '/' },
      { text: 'Second', href: '/second' },
      { text: 'Third' }
    ];
    await element.updateComplete;

    items = element.shadowRoot?.querySelectorAll('.breadcrumb-item');
    expect(items?.length).to.equal(3);
  });

  it('applies proper CSS classes', () => {
    const list = element.shadowRoot?.querySelector('.breadcrumbs');
    expect(list?.classList.contains('breadcrumbs')).to.be.true;

    const item = element.shadowRoot?.querySelector('.breadcrumb-item');
    expect(item?.classList.contains('breadcrumb-item')).to.be.true;
  });

  it('renders item text correctly', async () => {
    element.items = [
      { text: 'Home', href: '/' },
      { text: 'Test Page' }
    ];
    await element.updateComplete;

    const current = element.shadowRoot?.querySelector('.breadcrumb-current');
    expect(current?.textContent?.trim()).to.equal('Test Page');
  });

  it('handles items without href', async () => {
    element.items = [
      { text: 'Home' },
      { text: 'Current' }
    ];
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.breadcrumb-link');
    expect(links?.length).to.equal(0);

    const spans = element.shadowRoot?.querySelectorAll('.breadcrumb-current');
    expect(spans?.length).to.equal(2);
  });

  it('handles single item', async () => {
    element.items = [
      { text: 'Only Item' }
    ];
    await element.updateComplete;

    const items = element.shadowRoot?.querySelectorAll('.breadcrumb-item');
    expect(items?.length).to.equal(1);

    const separators = element.shadowRoot?.querySelectorAll('.breadcrumb-separator');
    expect(separators?.length).to.equal(0);
  });

  it('handles empty items array', async () => {
    element.items = [];
    await element.updateComplete;

    const items = element.shadowRoot?.querySelectorAll('.breadcrumb-item');
    expect(items?.length).to.be.greaterThan(0);
  });

  it('all non-current items with href are links', async () => {
    element.items = [
      { text: 'One', href: '/1' },
      { text: 'Two', href: '/2' },
      { text: 'Three', href: '/3' },
      { text: 'Current' }
    ];
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.breadcrumb-link');
    expect(links?.length).to.equal(3);
  });

  it('separators are span elements', async () => {
    element.items = [
      { text: 'Home', href: '/' },
      { text: 'Current' }
    ];
    await element.updateComplete;

    const separators = element.shadowRoot?.querySelectorAll('.breadcrumb-separator');
    separators?.forEach(sep => {
      expect(sep.tagName.toLowerCase()).to.equal('span');
    });
  });
});
