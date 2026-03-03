import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach, vi } from 'vitest';
import './wb-data-ajax.js';
import type { WBDataAjax } from './wb-data-ajax.js';

describe('WBDataAjax', () => {
  let ajax: WBDataAjax;

  beforeEach(async () => {
    global.fetch = vi.fn();
    ajax = await fixture<WBDataAjax>(html`
      <wb-data-ajax url="/test.html" auto-load="false"></wb-data-ajax>
    `);
  });

  it('renders', () => {
    expect(ajax).to.exist;
  });

  it('has url property', () => {
    expect(ajax.url).to.equal('/test.html');
  });

  it('has cache property defaulting to true', async () => {
    const defaultAjax = await fixture<WBDataAjax>(html`
      <wb-data-ajax url="/test"></wb-data-ajax>
    `);
    expect(defaultAjax.cache).to.equal(true);
  });

  it('has method property defaulting to GET', () => {
    expect(ajax.method).to.equal('GET');
  });

  it('has autoLoad property', () => {
    expect(ajax.autoLoad).to.equal(false);
  });

  it('loadContent method exists', () => {
    expect(ajax.loadContent).to.be.a('function');
  });

  it('displays loading state', async () => {
    (global.fetch as any).mockImplementation(() => new Promise(() => {}));
    ajax.loadContent();
    await ajax.updateComplete;
    const loading = ajax.shadowRoot!.querySelector('.ajax-loading');
    expect(loading).to.exist;
  });

  it('loading message has role=status', async () => {
    (global.fetch as any).mockImplementation(() => new Promise(() => {}));
    ajax.loadContent();
    await ajax.updateComplete;
    const loading = ajax.shadowRoot!.querySelector('.ajax-loading');
    expect(loading?.getAttribute('role')).to.equal('status');
  });

  it('loading has aria-live=polite', async () => {
    (global.fetch as any).mockImplementation(() => new Promise(() => {}));
    ajax.loadContent();
    await ajax.updateComplete;
    const loading = ajax.shadowRoot!.querySelector('.ajax-loading');
    expect(loading?.getAttribute('aria-live')).to.equal('polite');
  });

  it('displays error state', async () => {
    (global.fetch as any).mockRejectedValue(new Error('Network error'));
    await ajax.loadContent();
    await ajax.updateComplete;
    const error = ajax.shadowRoot!.querySelector('.ajax-error');
    expect(error).to.exist;
  });

  it('error has role=alert', async () => {
    (global.fetch as any).mockRejectedValue(new Error('Network error'));
    await ajax.loadContent();
    await ajax.updateComplete;
    const error = ajax.shadowRoot!.querySelector('.ajax-error');
    expect(error?.getAttribute('role')).to.equal('alert');
  });

  it('displays retry button on error', async () => {
    (global.fetch as any).mockRejectedValue(new Error('Network error'));
    await ajax.loadContent();
    await ajax.updateComplete;
    const button = ajax.shadowRoot!.querySelector('button');
    expect(button?.textContent).to.include('Retry');
  });

  it('retry button calls loadContent', async () => {
    (global.fetch as any).mockRejectedValue(new Error('Network error'));
    await ajax.loadContent();
    await ajax.updateComplete;
    const button = ajax.shadowRoot!.querySelector('button') as HTMLButtonElement;
    const spy = vi.spyOn(ajax, 'loadContent');
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it('emits wb-ajax-loaded event on success', async () => {
    let eventFired = false;
    ajax.addEventListener('wb-ajax-loaded', () => { eventFired = true; });
    (global.fetch as any).mockResolvedValue({
      ok: true,
      text: async () => '<p>Test content</p>'
    });
    await ajax.loadContent();
    expect(eventFired).to.equal(true);
  });

  it('emits wb-ajax-error event on failure', async () => {
    let eventFired = false;
    ajax.addEventListener('wb-ajax-error', () => { eventFired = true; });
    (global.fetch as any).mockRejectedValue(new Error('Network error'));
    await ajax.loadContent();
    expect(eventFired).to.equal(true);
  });

  it('caches content when cache=true', async () => {
    ajax.cache = true;
    (global.fetch as any).mockResolvedValue({
      ok: true,
      text: async () => '<p>Cached content</p>'
    });
    await ajax.loadContent();
    expect((global.fetch as any).mock.calls.length).to.equal(1);
    await ajax.loadContent();
    expect((global.fetch as any).mock.calls.length).to.equal(1);
  });

  it('clearCache method clears cache', async () => {
    ajax.cache = true;
    (global.fetch as any).mockResolvedValue({
      ok: true,
      text: async () => '<p>Content</p>'
    });
    await ajax.loadContent();
    ajax.clearCache();
    await ajax.loadContent();
    expect((global.fetch as any).mock.calls.length).to.equal(2);
  });

  it('does not cache when cache=false', async () => {
    ajax.cache = false;
    (global.fetch as any).mockResolvedValue({
      ok: true,
      text: async () => '<p>Content</p>'
    });
    await ajax.loadContent();
    await ajax.loadContent();
    expect((global.fetch as any).mock.calls.length).to.equal(2);
  });

  it('displays content after loading', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      text: async () => '<p>Test content</p>'
    });
    await ajax.loadContent();
    await ajax.updateComplete;
    const content = ajax.shadowRoot!.querySelector('.ajax-content');
    expect(content).to.exist;
  });

  it('handles HTTP errors', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });
    await ajax.loadContent();
    await ajax.updateComplete;
    const error = ajax.shadowRoot!.querySelector('.ajax-error');
    expect(error?.textContent).to.include('404');
  });

  it('auto-loads when autoLoad=true', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      text: async () => '<p>Auto loaded</p>'
    });
    const autoAjax = await fixture<WBDataAjax>(html`
      <wb-data-ajax url="/auto.html" auto-load="true"></wb-data-ajax>
    `);
    await new Promise(resolve => setTimeout(resolve, 100));
    expect((global.fetch as any).mock.calls.length).to.be.greaterThan(0);
  });

  it('does not auto-load when autoLoad=false', async () => {
    (global.fetch as any).mockClear();
    const noAutoAjax = await fixture<WBDataAjax>(html`
      <wb-data-ajax url="/test.html" auto-load="false"></wb-data-ajax>
    `);
    await new Promise(resolve => setTimeout(resolve, 50));
    expect((global.fetch as any).mock.calls.length).to.equal(0);
  });

  it('handles missing URL gracefully', async () => {
    const noUrlAjax = await fixture<WBDataAjax>(html`
      <wb-data-ajax auto-load="false"></wb-data-ajax>
    `);
    await noUrlAjax.loadContent();
    expect(noUrlAjax).to.exist;
  });

  it('uses correct HTTP method', async () => {
    ajax.method = 'POST';
    (global.fetch as any).mockResolvedValue({
      ok: true,
      text: async () => 'OK'
    });
    await ajax.loadContent();
    expect((global.fetch as any).mock.calls[0][1].method).to.equal('POST');
  });

  it('sets Content-Type header', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      text: async () => 'OK'
    });
    await ajax.loadContent();
    expect((global.fetch as any).mock.calls[0][1].headers['Content-Type']).to.equal('text/html');
  });

  it('event includes cached flag', async () => {
    let cached = false;
    ajax.addEventListener('wb-ajax-loaded', (e: Event) => {
      cached = (e as CustomEvent).detail.cached;
    });
    ajax.cache = true;
    (global.fetch as any).mockResolvedValue({
      ok: true,
      text: async () => '<p>Content</p>'
    });
    await ajax.loadContent();
    expect(cached).to.equal(false);
    await ajax.loadContent();
    expect(cached).to.equal(true);
  });
});
