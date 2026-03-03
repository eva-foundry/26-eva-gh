import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach, afterEach } from 'vitest';
import './wb-lightbox.js';
import type { WBLightbox, WBLightboxItem } from './wb-lightbox.js';

describe('WBLightbox', () => {
  let lightbox: WBLightbox;

  beforeEach(async () => {
    lightbox = await fixture<WBLightbox>(html`
      <wb-lightbox>
        <wb-lightbox-item src="/image1.jpg" caption="Image 1"></wb-lightbox-item>
        <wb-lightbox-item src="/image2.jpg" caption="Image 2"></wb-lightbox-item>
        <wb-lightbox-item src="/image3.jpg" caption="Image 3"></wb-lightbox-item>
      </wb-lightbox>
    `);
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders', () => {
    expect(lightbox).toBeDefined();
  });

  it('renders thumbnail grid', () => {
    const grid = lightbox.shadowRoot!.querySelector('.lightbox-grid');
    expect(grid).toBeDefined();
  });

  it('renders all lightbox items', () => {
    const items = lightbox.querySelectorAll('wb-lightbox-item');
    expect(items.length).toBe(3);
  });

  it('starts closed', () => {
    const modal = lightbox.shadowRoot!.querySelector('.lightbox-modal');
    expect(modal?.classList.contains('open')).toBe(false);
  });

  it('opens when item is clicked', async () => {
    const item = lightbox.querySelector('wb-lightbox-item') as WBLightboxItem;
    const thumbnail = item.shadowRoot!.querySelector('.item-thumbnail') as HTMLElement;
    
    thumbnail.click();
    await lightbox.updateComplete;

    const modal = lightbox.shadowRoot!.querySelector('.lightbox-modal');
    expect(modal?.classList.contains('open')).toBe(true);
  });

  it('opens at correct index', async () => {
    lightbox.openAt(1);
    await lightbox.updateComplete;

    const modal = lightbox.shadowRoot!.querySelector('.lightbox-modal');
    expect(modal?.classList.contains('open')).toBe(true);
  });

  it('closes with close() method', async () => {
    lightbox.openAt(0);
    await lightbox.updateComplete;

    lightbox.close();
    await lightbox.updateComplete;

    const modal = lightbox.shadowRoot!.querySelector('.lightbox-modal');
    expect(modal?.classList.contains('open')).toBe(false);
  });

  it('closes when close button clicked', async () => {
    lightbox.openAt(0);
    await lightbox.updateComplete;

    const closeBtn = lightbox.shadowRoot!.querySelector('.lightbox-close') as HTMLButtonElement;
    closeBtn.click();
    await lightbox.updateComplete;

    const modal = lightbox.shadowRoot!.querySelector('.lightbox-modal');
    expect(modal?.classList.contains('open')).toBe(false);
  });

  it('closes on Escape key', async () => {
    lightbox.openAt(0);
    await lightbox.updateComplete;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await lightbox.updateComplete;

    const modal = lightbox.shadowRoot!.querySelector('.lightbox-modal');
    expect(modal?.classList.contains('open')).toBe(false);
  });

  it('navigates to next image', async () => {
    lightbox.openAt(0);
    await lightbox.updateComplete;

    lightbox.next();
    await lightbox.updateComplete;

    // Check if second image is displayed (index 1)
    const image = lightbox.shadowRoot!.querySelector('.lightbox-image') as HTMLImageElement;
    expect(image.src).toContain('image2.jpg');
  });

  it('navigates to previous image', async () => {
    lightbox.openAt(1);
    await lightbox.updateComplete;

    lightbox.previous();
    await lightbox.updateComplete;

    const image = lightbox.shadowRoot!.querySelector('.lightbox-image') as HTMLImageElement;
    expect(image.src).toContain('image1.jpg');
  });

  it('navigates with arrow keys', async () => {
    lightbox.openAt(0);
    await lightbox.updateComplete;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await lightbox.updateComplete;

    const image = lightbox.shadowRoot!.querySelector('.lightbox-image') as HTMLImageElement;
    expect(image.src).toContain('image2.jpg');
  });

  it('does not go before first image', async () => {
    lightbox.openAt(0);
    await lightbox.updateComplete;

    lightbox.previous();
    await lightbox.updateComplete;

    const image = lightbox.shadowRoot!.querySelector('.lightbox-image') as HTMLImageElement;
    expect(image.src).toContain('image1.jpg'); // Still first image
  });

  it('does not go after last image', async () => {
    lightbox.openAt(2);
    await lightbox.updateComplete;

    lightbox.next();
    await lightbox.updateComplete;

    const image = lightbox.shadowRoot!.querySelector('.lightbox-image') as HTMLImageElement;
    expect(image.src).toContain('image3.jpg'); // Still last image
  });

  it('disables prev button on first image', async () => {
    lightbox.openAt(0);
    await lightbox.updateComplete;

    const prevBtn = lightbox.shadowRoot!.querySelector('.lightbox-nav-prev') as HTMLButtonElement;
    expect(prevBtn.disabled).toBe(true);
  });

  it('disables next button on last image', async () => {
    lightbox.openAt(2);
    await lightbox.updateComplete;

    const nextBtn = lightbox.shadowRoot!.querySelector('.lightbox-nav-next') as HTMLButtonElement;
    expect(nextBtn.disabled).toBe(true);
  });

  it('displays image caption', async () => {
    lightbox.openAt(0);
    await lightbox.updateComplete;

    const caption = lightbox.shadowRoot!.querySelector('.lightbox-caption');
    expect(caption?.textContent).toBe('Image 1');
  });

  it('displays image counter', async () => {
    lightbox.openAt(0);
    await lightbox.updateComplete;

    const counter = lightbox.shadowRoot!.querySelector('.lightbox-counter');
    expect(counter?.textContent).toContain('1');
    expect(counter?.textContent).toContain('3');
  });

  it('prevents body scroll when open', async () => {
    lightbox.openAt(0);
    await lightbox.updateComplete;

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', async () => {
    lightbox.openAt(0);
    await lightbox.updateComplete;

    lightbox.close();
    await lightbox.updateComplete;

    expect(document.body.style.overflow).toBe('');
  });

  it('emits wb-lightbox-open event', async () => {
    let eventFired = false;
    lightbox.addEventListener('wb-lightbox-open', () => {
      eventFired = true;
    });

    lightbox.openAt(0);
    await lightbox.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('emits wb-lightbox-close event', async () => {
    lightbox.openAt(0);
    await lightbox.updateComplete;

    let eventFired = false;
    lightbox.addEventListener('wb-lightbox-close', () => {
      eventFired = true;
    });

    lightbox.close();
    await lightbox.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('emits wb-lightbox-change event on navigation', async () => {
    lightbox.openAt(0);
    await lightbox.updateComplete;

    let eventFired = false;
    lightbox.addEventListener('wb-lightbox-change', () => {
      eventFired = true;
    });

    lightbox.next();
    await lightbox.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('supports custom column count', async () => {
    const customLightbox = await fixture<WBLightbox>(html`
      <wb-lightbox columns="3">
        <wb-lightbox-item src="/image1.jpg"></wb-lightbox-item>
        <wb-lightbox-item src="/image2.jpg"></wb-lightbox-item>
        <wb-lightbox-item src="/image3.jpg"></wb-lightbox-item>
      </wb-lightbox>
    `);

    const grid = customLightbox.shadowRoot!.querySelector('.lightbox-grid') as HTMLElement;
    expect(grid.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
  });

  it('has ARIA dialog attributes', async () => {
    lightbox.openAt(0);
    await lightbox.updateComplete;

    const modal = lightbox.shadowRoot!.querySelector('.lightbox-modal');
    expect(modal?.getAttribute('role')).toBe('dialog');
    expect(modal?.getAttribute('aria-modal')).toBe('true');
  });
});

describe('WBLightboxItem', () => {
  let item: WBLightboxItem;

  beforeEach(async () => {
    item = await fixture<WBLightboxItem>(html`
      <wb-lightbox-item
        src="/full.jpg"
        thumbnail="/thumb.jpg"
        caption="Test Caption"
        alt="Test Alt"
      ></wb-lightbox-item>
    `);
  });

  it('renders', () => {
    expect(item).toBeDefined();
  });

  it('renders thumbnail image', () => {
    const img = item.shadowRoot!.querySelector('.item-thumbnail') as HTMLImageElement;
    expect(img).toBeDefined();
    expect(img.src).toContain('thumb.jpg');
  });

  it('uses src as thumbnail if no thumbnail provided', async () => {
    const noThumbItem = await fixture<WBLightboxItem>(html`
      <wb-lightbox-item src="/image.jpg"></wb-lightbox-item>
    `);

    const img = noThumbItem.shadowRoot!.querySelector('.item-thumbnail') as HTMLImageElement;
    expect(img.src).toContain('image.jpg');
  });

  it('renders caption', () => {
    const caption = item.shadowRoot!.querySelector('.item-caption');
    expect(caption?.textContent).toBe('Test Caption');
  });

  it('does not render caption if not provided', async () => {
    const noCapItem = await fixture<WBLightboxItem>(html`
      <wb-lightbox-item src="/image.jpg"></wb-lightbox-item>
    `);

    const caption = noCapItem.shadowRoot!.querySelector('.item-caption');
    expect(caption).toBeNull();
  });

  it('has alt text', () => {
    const img = item.shadowRoot!.querySelector('.item-thumbnail') as HTMLImageElement;
    expect(img.alt).toBe('Test Alt');
  });

  it('has role="button" for accessibility', () => {
    const img = item.shadowRoot!.querySelector('.item-thumbnail');
    expect(img?.getAttribute('role')).toBe('button');
  });

  it('is keyboard accessible (tabindex="0")', () => {
    const img = item.shadowRoot!.querySelector('.item-thumbnail');
    expect(img?.getAttribute('tabindex')).toBe('0');
  });
});
