import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-bgimg.js';
import type { WBBgImg } from './wb-bgimg.js';

describe('WBBgImg', () => {
  let bgimg: WBBgImg;

  beforeEach(async () => {
    bgimg = await fixture<WBBgImg>(html`
      <wb-bgimg 
        src="https://via.placeholder.com/800x600"
        style="width: 400px; height: 300px;"
      ></wb-bgimg>
    `);
  });

  it('renders', () => {
    expect(bgimg).to.exist;
  });

  it('has src property', () => {
    expect(bgimg.src).to.equal('https://via.placeholder.com/800x600');
  });

  it('displays bg-container', () => {
    const container = bgimg.shadowRoot!.querySelector('.bg-container');
    expect(container).to.exist;
  });

  it('container has role=img', () => {
    const container = bgimg.shadowRoot!.querySelector('.bg-container');
    expect(container?.getAttribute('role')).to.equal('img');
  });

  it('container has aria-label', () => {
    const container = bgimg.shadowRoot!.querySelector('.bg-container');
    expect(container?.getAttribute('aria-label')).to.exist;
  });

  it('default threshold is 0.1', () => {
    expect(bgimg.threshold).to.equal(0.1);
  });

  it('supports custom threshold', async () => {
    const custom = await fixture<WBBgImg>(html`
      <wb-bgimg src="test.jpg" threshold="0.5"></wb-bgimg>
    `);
    expect(custom.threshold).to.equal(0.5);
  });

  it('displays placeholder text', async () => {
    const withPlaceholder = await fixture<WBBgImg>(html`
      <wb-bgimg 
        src="test.jpg" 
        placeholder="Loading..."
      ></wb-bgimg>
    `);
    const placeholder = withPlaceholder.shadowRoot!.querySelector('.placeholder');
    expect(placeholder?.textContent).to.equal('Loading...');
  });

  it('no placeholder when not set', () => {
    const placeholder = bgimg.shadowRoot!.querySelector('.placeholder');
    expect(placeholder).to.be.null;
  });

  it('container has loading class initially', () => {
    const container = bgimg.shadowRoot!.querySelector('.bg-container');
    expect(container?.classList.contains('loading')).to.equal(true);
  });

  it('emits wb-bgimg-loaded event', async () => {
    let eventFired = false;
    bgimg.addEventListener('wb-bgimg-loaded', () => { eventFired = true; });
    await new Promise(resolve => setTimeout(resolve, 500));
    expect(eventFired).to.equal(true);
  });

  it('event includes src', async () => {
    let src = '';
    bgimg.addEventListener('wb-bgimg-loaded', (e: Event) => {
      src = (e as CustomEvent).detail.src;
    });
    await new Promise(resolve => setTimeout(resolve, 500));
    expect(src).to.equal('https://via.placeholder.com/800x600');
  });

  it('supports slot content', async () => {
    const withSlot = await fixture<WBBgImg>(html`
      <wb-bgimg src="test.jpg">
        <div class="overlay">Content</div>
      </wb-bgimg>
    `);
    const slot = withSlot.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
  });

  it('renders without src', async () => {
    const noSrc = await fixture<WBBgImg>(html`
      <wb-bgimg></wb-bgimg>
    `);
    expect(noSrc).to.exist;
  });

  it('default src is empty', async () => {
    const empty = await fixture<WBBgImg>(html`
      <wb-bgimg></wb-bgimg>
    `);
    expect(empty.src).to.equal('');
  });

  it('default placeholder is empty', () => {
    expect(bgimg.placeholder).to.equal('');
  });

  it('container background-size is cover', () => {
    const container = bgimg.shadowRoot!.querySelector('.bg-container') as HTMLElement;
    const style = getComputedStyle(container);
    expect(style.backgroundSize).to.equal('cover');
  });

  it('container background-position is center', () => {
    const container = bgimg.shadowRoot!.querySelector('.bg-container') as HTMLElement;
    const style = getComputedStyle(container);
    expect(style.backgroundPosition).to.include('center');
  });

  it('placeholder is centered', () => {
    const withPlaceholder = document.createElement('wb-bgimg') as WBBgImg;
    withPlaceholder.src = 'test.jpg';
    withPlaceholder.placeholder = 'Loading';
    document.body.appendChild(withPlaceholder);
    const placeholder = withPlaceholder.shadowRoot!.querySelector('.placeholder') as HTMLElement;
    if (placeholder) {
      const style = getComputedStyle(placeholder);
      expect(style.position).to.equal('absolute');
    }
    document.body.removeChild(withPlaceholder);
  });

  it('renders with minimal properties', async () => {
    const minimal = await fixture<WBBgImg>(html`
      <wb-bgimg src="image.jpg"></wb-bgimg>
    `);
    expect(minimal).to.exist;
  });

  it('handles empty placeholder gracefully', async () => {
    const empty = await fixture<WBBgImg>(html`
      <wb-bgimg src="test.jpg" placeholder=""></wb-bgimg>
    `);
    const placeholder = empty.shadowRoot!.querySelector('.placeholder');
    expect(placeholder).to.be.null;
  });

  it('supports multiple instances', async () => {
    const multi = await fixture(html`
      <div>
        <wb-bgimg src="image1.jpg"></wb-bgimg>
        <wb-bgimg src="image2.jpg"></wb-bgimg>
      </div>
    `);
    const instances = multi.querySelectorAll('wb-bgimg');
    expect(instances.length).to.equal(2);
  });
});
