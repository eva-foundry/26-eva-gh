import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html, expect as chaiExpect } from '@open-wc/testing';
import type { GCFeatureTiles } from './gc-feature-tiles';
import './gc-feature-tiles';

describe('gc-feature-tiles', () => {
  let element: GCFeatureTiles;

  beforeEach(async () => {
    element = await fixture(html`<gc-feature-tiles></gc-feature-tiles>`);
  });

  it('renders with default properties', async () => {
    expect(element).toBeDefined();
    
    // Provide content for accessibility testing
    element.features = [{ image: '/test.jpg', alt: 'Test', heading: 'Test Feature', description: 'Test description', href: '#test', ctaLabel: 'Learn more' }];
    await element.updateComplete;
    
    chaiExpect(element).to.be.accessible();
  });

  it('renders multiple tiles', async () => {
    element.features = [
      { image: '/img1.jpg', alt: 'Alt 1', heading: 'Feature 1', description: 'Desc 1', href: '#1', ctaLabel: 'Learn more' },
      { image: '/img2.jpg', alt: 'Alt 2', heading: 'Feature 2', description: 'Desc 2', href: '#2', ctaLabel: 'Learn more' }
    ];
    await element.updateComplete;
    const tiles = element.shadowRoot!.querySelectorAll('.tile');
    expect(tiles.length).toBe(2);
  });

  it('renders tile image', async () => {
    element.features = [
      { image: '/test.jpg', alt: 'Test alt', heading: 'Test', description: 'Desc', href: '#', ctaLabel: 'Click' }
    ];
    await element.updateComplete;
    const img = element.shadowRoot!.querySelector('.tile-image') as HTMLImageElement;
    expect(img.src).toContain('/test.jpg');
    expect(img.alt).toBe('Test alt');
  });

  it('renders tile heading', async () => {
    element.features = [
      { image: '/img.jpg', alt: 'Alt', heading: 'Test Heading', description: 'Desc', href: '#', ctaLabel: 'Click' }
    ];
    await element.updateComplete;
    const heading = element.shadowRoot!.querySelector('.tile-heading');
    expect(heading?.textContent).toBe('Test Heading');
  });

  it('renders tile description', async () => {
    element.features = [
      { image: '/img.jpg', alt: 'Alt', heading: 'Title', description: 'Test Description', href: '#', ctaLabel: 'Click' }
    ];
    await element.updateComplete;
    const desc = element.shadowRoot!.querySelector('.tile-description');
    expect(desc?.textContent).toBe('Test Description');
  });

  it('renders CTA link', async () => {
    element.features = [
      { image: '/img.jpg', alt: 'Alt', heading: 'Title', description: 'Desc', href: '#test', ctaLabel: 'Read more' }
    ];
    await element.updateComplete;
    const link = element.shadowRoot!.querySelector('.tile-link') as HTMLAnchorElement;
    expect(link.textContent).toContain('Read more');
    expect(link.href).toContain('#test');
  });

  it('applies column setting', async () => {
    element.columns = 2;
    await element.updateComplete;
    const style = element.style.getPropertyValue('--gc-tiles-columns');
    expect(style).toBe('2');
  });

  it('emits event on tile click', async () => {
    const eventSpy = vi.fn();
    element.addEventListener('gc-feature-tile-click', eventSpy);
    element.features = [
      { image: '/img.jpg', alt: 'Alt', heading: 'Test', description: 'Desc', href: '#', ctaLabel: 'Click' }
    ];
    await element.updateComplete;
    const link = element.shadowRoot!.querySelector('.tile-link') as HTMLAnchorElement;
    link.click();
    expect(eventSpy).toHaveBeenCalled();
  });

  it('uses lazy loading for images', async () => {
    element.features = [
      { image: '/img.jpg', alt: 'Alt', heading: 'Test', description: 'Desc', href: '#', ctaLabel: 'Click' }
    ];
    await element.updateComplete;
    const img = element.shadowRoot!.querySelector('.tile-image');
    expect(img?.getAttribute('loading')).toBe('lazy');
  });

  it('uses semantic article element', async () => {
    element.features = [
      { image: '/img.jpg', alt: 'Alt', heading: 'Test', description: 'Desc', href: '#', ctaLabel: 'Click' }
    ];
    await element.updateComplete;
    const article = element.shadowRoot!.querySelector('article');
    expect(article).toBeDefined();
  });

  it('passes accessibility audit', async () => {
    element.features = [
      { image: '/img.jpg', alt: 'Feature image', heading: 'Feature', description: 'Description', href: '#', ctaLabel: 'Learn more' }
    ];
    await element.updateComplete;
    await chaiExpect(element).to.be.accessible();
  });
});
