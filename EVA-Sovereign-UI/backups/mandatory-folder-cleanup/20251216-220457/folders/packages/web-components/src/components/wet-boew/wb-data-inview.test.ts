import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach, vi } from 'vitest';
import './wb-data-inview.js';
import type { WBDataInView } from './wb-data-inview.js';

describe('WBDataInView', () => {
  let inview: WBDataInView;

  beforeEach(async () => {
    global.fetch = vi.fn();
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn()
    }));

    inview = await fixture<WBDataInView>(html`
      <wb-data-inview url="/test.html"></wb-data-inview>
    `);
  });

  it('renders', () => {
    expect(inview).to.exist;
  });

  it('has url property', () => {
    expect(inview.url).to.equal('/test.html');
  });

  it('has threshold property defaulting to 0.1', async () => {
    const defaultInview = await fixture<WBDataInView>(html`
      <wb-data-inview url="/test"></wb-data-inview>
    `);
    expect(defaultInview.threshold).to.equal('0.1');
  });

  it('has once property defaulting to true', () => {
    expect(inview.once).to.equal(true);
  });

  it('creates IntersectionObserver', () => {
    expect(global.IntersectionObserver).toHaveBeenCalled();
  });

  it('displays placeholder initially', () => {
    const placeholder = inview.shadowRoot!.querySelector('.placeholder');
    expect(placeholder).to.exist;
  });

  it('placeholder has role=status', () => {
    const placeholder = inview.shadowRoot!.querySelector('.placeholder');
    expect(placeholder?.getAttribute('role')).to.equal('status');
  });

  it('placeholder has aria-live=polite', () => {
    const placeholder = inview.shadowRoot!.querySelector('.placeholder');
    expect(placeholder?.getAttribute('aria-live')).to.equal('polite');
  });

  it('loadContent method exists', () => {
    expect(inview.loadContent).to.be.a('function');
  });

  it('emits wb-inview-loaded event', async () => {
    let eventFired = false;
    inview.addEventListener('wb-inview-loaded', () => { eventFired = true; });
    (global.fetch as any).mockResolvedValue({
      ok: true,
      text: async () => '<p>Content</p>'
    });
    await inview.loadContent();
    expect(eventFired).to.equal(true);
  });

  it('emits wb-inview-error event on failure', async () => {
    let eventFired = false;
    inview.addEventListener('wb-inview-error', () => { eventFired = true; });
    (global.fetch as any).mockRejectedValue(new Error('Network error'));
    await inview.loadContent();
    expect(eventFired).to.equal(true);
  });

  it('handles HTTP errors', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });
    await inview.loadContent();
    expect(inview).to.exist;
  });

  it('parses threshold as float', () => {
    const threshold = parseFloat(inview.threshold);
    expect(threshold).to.equal(0.1);
  });

  it('disconnects observer on component disconnect', () => {
    const mockObserver = (global.IntersectionObserver as any).mock.results[0].value;
    inview.disconnectedCallback();
    expect(mockObserver.disconnect).toHaveBeenCalled();
  });

  it('observes the host element', () => {
    const mockObserver = (global.IntersectionObserver as any).mock.results[0].value;
    expect(mockObserver.observe).toHaveBeenCalled();
  });

  it('custom threshold is applied', async () => {
    const customThreshold = await fixture<WBDataInView>(html`
      <wb-data-inview url="/test" threshold="0.5"></wb-data-inview>
    `);
    expect(customThreshold.threshold).to.equal('0.5');
  });

  it('once=false allows multiple loads', async () => {
    const multiLoad = await fixture<WBDataInView>(html`
      <wb-data-inview url="/test" once="false"></wb-data-inview>
    `);
    expect(multiLoad.once).to.equal(false);
  });

  it('does not load content multiple times', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      text: async () => '<p>Content</p>'
    });
    await inview.loadContent();
    await inview.loadContent();
    expect((global.fetch as any).mock.calls.length).to.equal(1);
  });

  it('has minimum height', () => {
    const minHeight = getComputedStyle(inview).minHeight;
    expect(minHeight).to.equal('100px');
  });

  it('placeholder has minimum height', () => {
    const placeholder = inview.shadowRoot!.querySelector('.placeholder') as HTMLElement;
    const minHeight = getComputedStyle(placeholder).minHeight;
    expect(minHeight).to.equal('100px');
  });

  it('placeholder has centered content', () => {
    const placeholder = inview.shadowRoot!.querySelector('.placeholder') as HTMLElement;
    const display = getComputedStyle(placeholder).display;
    expect(display).to.equal('flex');
  });

  it('event includes URL', async () => {
    let url = '';
    inview.addEventListener('wb-inview-loaded', (e: Event) => {
      url = (e as CustomEvent).detail.url;
    });
    (global.fetch as any).mockResolvedValue({
      ok: true,
      text: async () => '<p>Content</p>'
    });
    await inview.loadContent();
    expect(url).to.equal('/test.html');
  });

  it('error event includes URL and error', async () => {
    let detail: any = {};
    inview.addEventListener('wb-inview-error', (e: Event) => {
      detail = (e as CustomEvent).detail;
    });
    (global.fetch as any).mockRejectedValue(new Error('Network error'));
    await inview.loadContent();
    expect(detail.url).to.equal('/test.html');
    expect(detail.error).to.exist;
  });

  it('fetch uses correct URL', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      text: async () => '<p>Content</p>'
    });
    await inview.loadContent();
    expect((global.fetch as any).mock.calls[0][0]).to.equal('/test.html');
  });

  it('renders without errors when empty', async () => {
    const empty = await fixture<WBDataInView>(html`
      <wb-data-inview url=""></wb-data-inview>
    `);
    expect(empty).to.exist;
  });

  it('handles missing URL gracefully', async () => {
    const noUrl = await fixture<WBDataInView>(html`
      <wb-data-inview></wb-data-inview>
    `);
    expect(noUrl).to.exist;
  });
});
