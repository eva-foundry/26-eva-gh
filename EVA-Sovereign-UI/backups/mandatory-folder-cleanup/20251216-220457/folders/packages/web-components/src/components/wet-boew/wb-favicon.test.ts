import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach, afterEach } from 'vitest';
import './wb-favicon.js';
import type { WBFavicon } from './wb-favicon.js';

describe('WBFavicon', () => {
  let favicon: WBFavicon;
  let originalLink: HTMLLinkElement | null;

  beforeEach(async () => {
    originalLink = document.querySelector('link[rel*="icon"]');
    favicon = await fixture<WBFavicon>(html`
      <wb-favicon src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="></wb-favicon>
    `);
  });

  afterEach(() => {
    const links = document.querySelectorAll('link[rel*="icon"]');
    links.forEach(link => {
      if (link !== originalLink) {
        link.remove();
      }
    });
  });

  it('renders', () => {
    expect(favicon).to.exist;
  });

  it('has src property', () => {
    expect(favicon.src).to.include('data:image/png');
  });

  it('default type is image/png', () => {
    expect(favicon.type).to.equal('image/png');
  });

  it('default badge is empty', () => {
    expect(favicon.badge).to.equal('');
  });

  it('is not visible', () => {
    const display = getComputedStyle(favicon).display;
    expect(display).to.equal('none');
  });

  it('creates favicon link element', async () => {
    await favicon.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));
    const link = document.querySelector('link[rel*="icon"]');
    expect(link).to.exist;
  });

  it('sets favicon type', async () => {
    const typed = await fixture<WBFavicon>(html`
      <wb-favicon src="test.ico" type="image/x-icon"></wb-favicon>
    `);
    expect(typed.type).to.equal('image/x-icon');
  });

  it('supports badge text', async () => {
    const badged = await fixture<WBFavicon>(html`
      <wb-favicon 
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        badge="5"
      ></wb-favicon>
    `);
    expect(badged.badge).to.equal('5');
  });

  it('emits wb-favicon-changed event', async () => {
    let eventFired = false;
    favicon.addEventListener('wb-favicon-changed', () => { eventFired = true; });
    await favicon.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(eventFired).to.equal(true);
  });

  it('event includes src', async () => {
    let src = '';
    favicon.addEventListener('wb-favicon-changed', (e: Event) => {
      src = (e as CustomEvent).detail.src;
    });
    await favicon.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(src).to.include('data:image/png');
  });

  it('event includes badge when set', async () => {
    let badge = '';
    const badged = await fixture<WBFavicon>(html`
      <wb-favicon 
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        badge="3"
      ></wb-favicon>
    `);
    badged.addEventListener('wb-favicon-changed', (e: Event) => {
      badge = (e as CustomEvent).detail.badge;
    });
    await badged.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(badge).to.equal('3');
  });

  it('updates favicon when src changes', async () => {
    favicon.src = 'data:image/png;base64,another-icon';
    await favicon.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));
    const link = document.querySelector('link[rel*="icon"]') as HTMLLinkElement;
    expect(link?.href).to.include('data:image/png');
  });

  it('updates favicon when badge changes', async () => {
    favicon.badge = '9';
    await favicon.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));
    const link = document.querySelector('link[rel*="icon"]');
    expect(link).to.exist;
  });

  it('renders without src', async () => {
    const noSrc = await fixture<WBFavicon>(html`
      <wb-favicon></wb-favicon>
    `);
    expect(noSrc).to.exist;
  });

  it('default src is empty', async () => {
    const empty = await fixture<WBFavicon>(html`
      <wb-favicon></wb-favicon>
    `);
    expect(empty.src).to.equal('');
  });

  it('renders with empty badge', async () => {
    const noBadge = await fixture<WBFavicon>(html`
      <wb-favicon src="test.png" badge=""></wb-favicon>
    `);
    expect(noBadge.badge).to.equal('');
  });

  it('supports numeric badges', async () => {
    const numeric = await fixture<WBFavicon>(html`
      <wb-favicon 
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        badge="99"
      ></wb-favicon>
    `);
    expect(numeric.badge).to.equal('99');
  });

  it('supports text badges', async () => {
    const text = await fixture<WBFavicon>(html`
      <wb-favicon 
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        badge="!"
      ></wb-favicon>
    `);
    expect(text.badge).to.equal('!');
  });

  it('renders multiple instances', async () => {
    const multi = await fixture(html`
      <div>
        <wb-favicon src="icon1.png"></wb-favicon>
        <wb-favicon src="icon2.png"></wb-favicon>
      </div>
    `);
    const instances = multi.querySelectorAll('wb-favicon');
    expect(instances.length).to.equal(2);
  });

  it('cleans up on disconnect', async () => {
    const temp = await fixture<WBFavicon>(html`
      <wb-favicon 
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
      ></wb-favicon>
    `);
    temp.remove();
    expect(temp.isConnected).to.equal(false);
  });
});
