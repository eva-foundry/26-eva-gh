import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-facebook.js';
import type { WBFacebook } from './wb-facebook.js';

describe('WBFacebook', () => {
  let facebook: WBFacebook;

  beforeEach(async () => {
    facebook = await fixture<WBFacebook>(html`
      <wb-facebook pageUrl="https://www.facebook.com/CanadianGov"></wb-facebook>
    `);
  });

  it('renders', () => {
    expect(facebook).to.exist;
  });

  it('displays container', () => {
    const container = facebook.shadowRoot!.querySelector('.container');
    expect(container).to.exist;
  });

  it('displays iframe', () => {
    const iframe = facebook.shadowRoot!.querySelector('iframe');
    expect(iframe).to.exist;
  });

  it('iframe has src', () => {
    const iframe = facebook.shadowRoot!.querySelector('iframe');
    expect(iframe?.getAttribute('src')).to.include('facebook.com');
  });

  it('iframe has title', () => {
    const iframe = facebook.shadowRoot!.querySelector('iframe');
    expect(iframe?.getAttribute('title')).to.exist;
  });

  it('displays loading initially', () => {
    const loading = facebook.shadowRoot!.querySelector('.loading');
    expect(loading).to.exist;
  });

  it('loading has role', () => {
    const loading = facebook.shadowRoot!.querySelector('.loading');
    expect(loading?.getAttribute('role')).to.equal('status');
  });

  it('loading has aria-live', () => {
    const loading = facebook.shadowRoot!.querySelector('.loading');
    expect(loading?.getAttribute('aria-live')).to.equal('polite');
  });

  it('default width is 340', () => {
    expect(facebook.width).to.equal(340);
  });

  it('default height is 500', () => {
    expect(facebook.height).to.equal(500);
  });

  it('default showFaces is true', () => {
    expect(facebook.showFaces).to.equal(true);
  });

  it('default showHeader is true', () => {
    expect(facebook.showHeader).to.equal(true);
  });

  it('default smallHeader is false', () => {
    expect(facebook.smallHeader).to.equal(false);
  });

  it('supports custom width', async () => {
    const custom = await fixture<WBFacebook>(html`
      <wb-facebook pageUrl="https://www.facebook.com/test" width="400"></wb-facebook>
    `);
    expect(custom.width).to.equal(400);
  });

  it('supports custom height', async () => {
    const custom = await fixture<WBFacebook>(html`
      <wb-facebook pageUrl="https://www.facebook.com/test" height="600"></wb-facebook>
    `);
    expect(custom.height).to.equal(600);
  });

  it('supports showFaces option', async () => {
    const noFaces = await fixture<WBFacebook>(html`
      <wb-facebook pageUrl="https://www.facebook.com/test" showFaces="false"></wb-facebook>
    `);
    const iframe = noFaces.shadowRoot!.querySelector('iframe');
    expect(iframe?.getAttribute('src')).to.include('show_faces=false');
  });

  it('supports showHeader option', async () => {
    const noHeader = await fixture<WBFacebook>(html`
      <wb-facebook pageUrl="https://www.facebook.com/test" showHeader="false"></wb-facebook>
    `);
    const iframe = noHeader.shadowRoot!.querySelector('iframe');
    expect(iframe?.getAttribute('src')).to.include('hide_cover=true');
  });

  it('supports smallHeader option', async () => {
    const small = await fixture<WBFacebook>(html`
      <wb-facebook pageUrl="https://www.facebook.com/test" smallHeader></wb-facebook>
    `);
    const iframe = small.shadowRoot!.querySelector('iframe');
    expect(iframe?.getAttribute('src')).to.include('small_header=true');
  });

  it('iframe has allow attributes', () => {
    const iframe = facebook.shadowRoot!.querySelector('iframe');
    expect(iframe?.getAttribute('allow')).to.exist;
  });

  it('iframe frameborder is 0', () => {
    const iframe = facebook.shadowRoot!.querySelector('iframe');
    expect(iframe?.getAttribute('frameborder')).to.equal('0');
  });

  it('iframe scrolling is no', () => {
    const iframe = facebook.shadowRoot!.querySelector('iframe');
    expect(iframe?.getAttribute('scrolling')).to.equal('no');
  });

  it('displays error without pageUrl', async () => {
    const noUrl = await fixture<WBFacebook>(html`
      <wb-facebook></wb-facebook>
    `);
    const error = noUrl.shadowRoot!.querySelector('.error');
    expect(error).to.exist;
  });

  it('error has role=alert', async () => {
    const noUrl = await fixture<WBFacebook>(html`
      <wb-facebook></wb-facebook>
    `);
    const error = noUrl.shadowRoot!.querySelector('.error');
    expect(error?.getAttribute('role')).to.equal('alert');
  });

  it('emits loaded event', async () => {
    let eventFired = false;
    facebook.addEventListener('wb-facebook-loaded', () => { eventFired = true; });
    const iframe = facebook.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
    iframe.dispatchEvent(new Event('load'));
    await facebook.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('loaded event includes url', async () => {
    let eventUrl = '';
    facebook.addEventListener('wb-facebook-loaded', (e: Event) => {
      eventUrl = (e as CustomEvent).detail.url;
    });
    const iframe = facebook.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
    iframe.dispatchEvent(new Event('load'));
    await facebook.updateComplete;
    expect(eventUrl).to.include('facebook.com');
  });

  it('emits error event', async () => {
    let eventFired = false;
    facebook.addEventListener('wb-facebook-error', () => { eventFired = true; });
    const iframe = facebook.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
    iframe.dispatchEvent(new Event('error'));
    await facebook.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('handles different page URLs', async () => {
    const custom = await fixture<WBFacebook>(html`
      <wb-facebook pageUrl="https://www.facebook.com/canada"></wb-facebook>
    `);
    const iframe = custom.shadowRoot!.querySelector('iframe');
    expect(iframe?.getAttribute('src')).to.include('canada');
  });

  it('renders without errors', async () => {
    const test = await fixture<WBFacebook>(html`
      <wb-facebook></wb-facebook>
    `);
    expect(test).to.exist;
  });
});
