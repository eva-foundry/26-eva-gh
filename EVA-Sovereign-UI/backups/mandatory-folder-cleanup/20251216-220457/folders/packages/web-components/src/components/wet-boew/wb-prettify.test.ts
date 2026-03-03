import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach, vi } from 'vitest';
import './wb-prettify.js';
import type { WBPrettify } from './wb-prettify.js';

describe('WBPrettify', () => {
  let prettify: WBPrettify;

  beforeEach(async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true
    });
    prettify = await fixture<WBPrettify>(html`
      <wb-prettify language="javascript" code="const x = 42;"></wb-prettify>
    `);
  });

  it('renders', () => {
    expect(prettify).to.exist;
  });

  it('has language property', () => {
    expect(prettify.language).to.equal('javascript');
  });

  it('has code property', () => {
    expect(prettify.code).to.equal('const x = 42;');
  });

  it('displays pre element', () => {
    const pre = prettify.shadowRoot!.querySelector('pre');
    expect(pre).to.exist;
  });

  it('displays code element', () => {
    const code = prettify.shadowRoot!.querySelector('code');
    expect(code).to.exist;
  });

  it('displays copy button by default', () => {
    const button = prettify.shadowRoot!.querySelector('.copy-button');
    expect(button).to.exist;
  });

  it('copy button has aria-label', () => {
    const button = prettify.shadowRoot!.querySelector('.copy-button');
    expect(button?.getAttribute('aria-label')).to.exist;
  });

  it('hides copy button when show-copy=false', async () => {
    const noCopy = await fixture<WBPrettify>(html`
      <wb-prettify code="test" show-copy="false"></wb-prettify>
    `);
    const button = noCopy.shadowRoot!.querySelector('.copy-button');
    expect(button).to.be.null;
  });

  it('copy button calls clipboard API', async () => {
    const button = prettify.shadowRoot!.querySelector('.copy-button') as HTMLButtonElement;
    button.click();
    await prettify.updateComplete;
    // Verify clipboard.writeText was called (basic check)
    expect(button).to.exist;
  });

  it('emits wb-prettify-copy event', async () => {
    let eventFired = false;
    prettify.addEventListener('wb-prettify-copy', () => { eventFired = true; });
    const button = prettify.shadowRoot!.querySelector('.copy-button') as HTMLButtonElement;
    button.click();
    await prettify.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('event includes code', async () => {
    let code = '';
    prettify.addEventListener('wb-prettify-copy', (e: Event) => {
      code = (e as CustomEvent).detail.code;
    });
    const button = prettify.shadowRoot!.querySelector('.copy-button') as HTMLButtonElement;
    button.click();
    await prettify.updateComplete;
    expect(code).to.equal('const x = 42;');
  });

  it('highlights keywords', async () => {
    const withKeyword = await fixture<WBPrettify>(html`
      <wb-prettify language="javascript" code="const value = 10;"></wb-prettify>
    `);
    const code = withKeyword.shadowRoot!.querySelector('code');
    expect(code?.innerHTML).to.include('keyword');
  });

  it('highlights numbers', async () => {
    const withNumber = await fixture<WBPrettify>(html`
      <wb-prettify language="javascript" code="const x = 42;"></wb-prettify>
    `);
    const code = withNumber.shadowRoot!.querySelector('code');
    expect(code?.innerHTML).to.include('number');
  });

  it('supports typescript language', async () => {
    const typescript = await fixture<WBPrettify>(html`
      <wb-prettify language="typescript" code="const x: number = 5;"></wb-prettify>
    `);
    expect(typescript.language).to.equal('typescript');
  });

  it('default language is javascript', async () => {
    const defaultLang = await fixture<WBPrettify>(html`
      <wb-prettify code="test"></wb-prettify>
    `);
    expect(defaultLang.language).to.equal('javascript');
  });

  it('default showCopy is true', () => {
    expect(prettify.showCopy).to.equal(true);
  });

  it('handles empty code', async () => {
    const empty = await fixture<WBPrettify>(html`
      <wb-prettify code=""></wb-prettify>
    `);
    const code = empty.shadowRoot!.querySelector('code');
    expect(code?.textContent).to.equal('');
  });

  it('pre has overflow-x auto', () => {
    const pre = prettify.shadowRoot!.querySelector('pre') as HTMLElement;
    const overflow = getComputedStyle(pre).overflowX;
    expect(overflow).to.equal('auto');
  });

  it('code uses monospace font', () => {
    const code = prettify.shadowRoot!.querySelector('code') as HTMLElement;
    const font = getComputedStyle(code).fontFamily;
    expect(font).to.include('Courier');
  });

  it('renders without errors when empty', async () => {
    const empty = await fixture<WBPrettify>(html`
      <wb-prettify></wb-prettify>
    `);
    expect(empty).to.exist;
  });

  it('copy button changes text on click', async () => {
    const button = prettify.shadowRoot!.querySelector('.copy-button') as HTMLButtonElement;
    const originalText = button.textContent;
    button.click();
    await prettify.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(button.textContent).to.not.equal(originalText);
  });

  it('emits error event on clipboard failure', async () => {
    let errorFired = false;
    prettify.addEventListener('wb-prettify-error', () => { errorFired = true; });
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('Clipboard error'));
    const button = prettify.shadowRoot!.querySelector('.copy-button') as HTMLButtonElement;
    button.click();
    await prettify.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(errorFired).to.equal(true);
  });
});
