import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-footer';
import type { GCFooter } from './gc-footer';

describe('gc-footer', () => {
  let element: GCFooter;

  beforeEach(async () => {
    element = await fixture(html`<gc-footer></gc-footer>`);
  });

  it('renders footer', () => {
    const footer = element.shadowRoot?.querySelector('.footer');
    expect(footer).to.exist;
  });

  it('footer is footer element', () => {
    const footer = element.shadowRoot?.querySelector('.footer');
    expect(footer?.tagName.toLowerCase()).to.equal('footer');
  });

  it('renders footer-main section', () => {
    const main = element.shadowRoot?.querySelector('.footer-main');
    expect(main).to.exist;
  });

  it('renders footer-bottom section', () => {
    const bottom = element.shadowRoot?.querySelector('.footer-bottom');
    expect(bottom).to.exist;
  });

  it('renders footer-links container', () => {
    const links = element.shadowRoot?.querySelector('.footer-links');
    expect(links).to.exist;
  });

  it('renders default sections', () => {
    const sections = element.shadowRoot?.querySelectorAll('.footer-section');
    expect(sections?.length).to.be.greaterThan(0);
  });

  it('renders custom sections', async () => {
    element.sections = [
      {
        heading: 'Test Section',
        links: [
          { text: 'Link 1', href: '#1' },
          { text: 'Link 2', href: '#2' }
        ]
      }
    ];
    await element.updateComplete;

    const heading = element.shadowRoot?.querySelector('.footer-section h3');
    expect(heading?.textContent).to.equal('Test Section');
  });

  it('section headings are h3', () => {
    const heading = element.shadowRoot?.querySelector('.footer-section h3');
    expect(heading?.tagName.toLowerCase()).to.equal('h3');
  });

  it('renders section links', () => {
    const links = element.shadowRoot?.querySelectorAll('.footer-section a');
    expect(links?.length).to.be.greaterThan(0);
  });

  it('section links are anchor elements', () => {
    const links = element.shadowRoot?.querySelectorAll('.footer-section a');
    links?.forEach(link => {
      expect(link.tagName.toLowerCase()).to.equal('a');
    });
  });

  it('section links have href', () => {
    const links = element.shadowRoot?.querySelectorAll('.footer-section a');
    links?.forEach(link => {
      expect(link.getAttribute('href')).to.be.a('string');
    });
  });

  it('renders footer-sub-links', () => {
    const subLinks = element.shadowRoot?.querySelector('.footer-sub-links');
    expect(subLinks).to.exist;
  });

  it('sub-links is ul element', () => {
    const subLinks = element.shadowRoot?.querySelector('.footer-sub-links');
    expect(subLinks?.tagName.toLowerCase()).to.equal('ul');
  });

  it('renders default sub-links', () => {
    const subLinks = element.shadowRoot?.querySelectorAll('.footer-sub-links a');
    expect(subLinks?.length).to.be.greaterThan(0);
  });

  it('renders custom sub-links', async () => {
    element.subLinks = [
      { text: 'Custom Link', href: '#custom' }
    ];
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.footer-sub-links a');
    expect(link?.textContent).to.equal('Custom Link');
  });

  it('does not render logo by default', () => {
    const logo = element.shadowRoot?.querySelector('.footer-logo');
    expect(logo).to.not.exist;
  });

  it('renders logo when logoSrc provided', async () => {
    element.logoSrc = 'logo.svg';
    await element.updateComplete;

    const logo = element.shadowRoot?.querySelector('.footer-logo');
    expect(logo).to.exist;
  });

  it('logo is img element', async () => {
    element.logoSrc = 'logo.svg';
    await element.updateComplete;

    const logo = element.shadowRoot?.querySelector('.footer-logo');
    expect(logo?.tagName.toLowerCase()).to.equal('img');
  });

  it('logo has src attribute', async () => {
    element.logoSrc = 'test.svg';
    await element.updateComplete;

    const logo = element.shadowRoot?.querySelector('.footer-logo') as HTMLImageElement;
    expect(logo?.src).to.include('test.svg');
  });

  it('logo has alt attribute', async () => {
    element.logoSrc = 'logo.svg';
    element.logoAlt = 'Test Logo';
    await element.updateComplete;

    const logo = element.shadowRoot?.querySelector('.footer-logo');
    expect(logo?.getAttribute('alt')).to.equal('Test Logo');
  });

  it('uses default logo alt when not provided', async () => {
    element.logoSrc = 'logo.svg';
    await element.updateComplete;

    const logo = element.shadowRoot?.querySelector('.footer-logo');
    expect(logo?.getAttribute('alt')).to.be.a('string');
  });

  it('applies proper CSS classes', () => {
    const footer = element.shadowRoot?.querySelector('.footer');
    expect(footer?.classList.contains('footer')).to.be.true;

    const main = element.shadowRoot?.querySelector('.footer-main');
    expect(main?.classList.contains('footer-main')).to.be.true;

    const bottom = element.shadowRoot?.querySelector('.footer-bottom');
    expect(bottom?.classList.contains('footer-bottom')).to.be.true;

    const links = element.shadowRoot?.querySelector('.footer-links');
    expect(links?.classList.contains('footer-links')).to.be.true;

    const section = element.shadowRoot?.querySelector('.footer-section');
    expect(section?.classList.contains('footer-section')).to.be.true;

    const subLinks = element.shadowRoot?.querySelector('.footer-sub-links');
    expect(subLinks?.classList.contains('footer-sub-links')).to.be.true;
  });

  it('section lists are ul elements', () => {
    const lists = element.shadowRoot?.querySelectorAll('.footer-section ul');
    lists?.forEach(list => {
      expect(list.tagName.toLowerCase()).to.equal('ul');
    });
  });

  it('section list items are li elements', () => {
    const items = element.shadowRoot?.querySelectorAll('.footer-section li');
    items?.forEach(item => {
      expect(item.tagName.toLowerCase()).to.equal('li');
    });
  });

  it('updates when sections change', async () => {
    element.sections = [
      {
        heading: 'New Section',
        links: [{ text: 'New Link', href: '#new' }]
      }
    ];
    await element.updateComplete;

    const heading = element.shadowRoot?.querySelector('.footer-section h3');
    expect(heading?.textContent).to.equal('New Section');
  });

  it('updates when subLinks change', async () => {
    element.subLinks = [
      { text: 'Updated Link', href: '#updated' }
    ];
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.footer-sub-links a');
    expect(link?.textContent).to.equal('Updated Link');
  });

  it('renders multiple sections', async () => {
    element.sections = [
      { heading: 'Section 1', links: [{ text: 'Link 1', href: '#1' }] },
      { heading: 'Section 2', links: [{ text: 'Link 2', href: '#2' }] },
      { heading: 'Section 3', links: [{ text: 'Link 3', href: '#3' }] }
    ];
    await element.updateComplete;

    const sections = element.shadowRoot?.querySelectorAll('.footer-section');
    expect(sections?.length).to.equal(3);
  });

  it('renders multiple links per section', async () => {
    element.sections = [
      {
        heading: 'Test',
        links: [
          { text: 'Link 1', href: '#1' },
          { text: 'Link 2', href: '#2' },
          { text: 'Link 3', href: '#3' }
        ]
      }
    ];
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.footer-section a');
    expect(links?.length).to.equal(3);
  });
});
