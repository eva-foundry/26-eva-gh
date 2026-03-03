import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach, vi } from 'vitest';
import './wb-exitscript.js';
import type { WBExitScript } from './wb-exitscript.js';

describe('WBExitScript', () => {
  let exitscript: WBExitScript;

  beforeEach(async () => {
    global.window.open = vi.fn();
    exitscript = await fixture<WBExitScript>(html`
      <wb-exitscript>
        <a href="https://external.com">External Link</a>
        <a href="/internal">Internal Link</a>
      </wb-exitscript>
    `);
  });

  it('renders', () => {
    expect(exitscript).to.exist;
  });

  it('displays slotted content', () => {
    const links = exitscript.querySelectorAll('a');
    expect(links.length).to.equal(2);
  });

  it('default showModal is false', () => {
    expect(exitscript.showModal).to.equal(false);
  });

  it('no modal displayed initially', () => {
    const modal = exitscript.shadowRoot!.querySelector('.modal');
    expect(modal).to.be.null;
  });

  it('clicking external link shows modal', async () => {
    const link = exitscript.querySelector('a[href="https://external.com"]') as HTMLElement;
    link.click();
    await exitscript.updateComplete;
    expect(exitscript.showModal).to.equal(true);
  });

  it('modal displays when shown', async () => {
    exitscript.showModal = true;
    await exitscript.updateComplete;
    const modal = exitscript.shadowRoot!.querySelector('.modal');
    expect(modal).to.exist;
  });

  it('modal has role=dialog', async () => {
    exitscript.showModal = true;
    await exitscript.updateComplete;
    const modal = exitscript.shadowRoot!.querySelector('.modal');
    expect(modal?.getAttribute('role')).to.equal('dialog');
  });

  it('modal has aria-modal', async () => {
    exitscript.showModal = true;
    await exitscript.updateComplete;
    const modal = exitscript.shadowRoot!.querySelector('.modal');
    expect(modal?.getAttribute('aria-modal')).to.equal('true');
  });

  it('modal has title', async () => {
    exitscript.showModal = true;
    await exitscript.updateComplete;
    const title = exitscript.shadowRoot!.querySelector('.modal-title');
    expect(title).to.exist;
  });

  it('modal has message', async () => {
    exitscript.showModal = true;
    await exitscript.updateComplete;
    const message = exitscript.shadowRoot!.querySelector('.modal-message');
    expect(message).to.exist;
  });

  it('modal has continue button', async () => {
    exitscript.showModal = true;
    await exitscript.updateComplete;
    const buttons = exitscript.shadowRoot!.querySelectorAll('.button');
    expect(buttons.length).to.equal(2);
  });

  it('modal has cancel button', async () => {
    exitscript.showModal = true;
    await exitscript.updateComplete;
    const cancel = exitscript.shadowRoot!.querySelector('.button-secondary');
    expect(cancel).to.exist;
  });

  it('clicking internal link does not show modal', async () => {
    const link = exitscript.querySelector('a[href="/internal"]') as HTMLElement;
    link.click();
    await exitscript.updateComplete;
    expect(exitscript.showModal).to.equal(false);
  });

  it('emits wb-exitscript-shown event', async () => {
    let eventFired = false;
    exitscript.addEventListener('wb-exitscript-shown', () => { eventFired = true; });
    const link = exitscript.querySelector('a[href="https://external.com"]') as HTMLElement;
    link.click();
    await exitscript.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('event includes url', async () => {
    let url = '';
    exitscript.addEventListener('wb-exitscript-shown', (e: Event) => {
      url = (e as CustomEvent).detail.url;
    });
    const link = exitscript.querySelector('a[href="https://external.com"]') as HTMLElement;
    link.click();
    await exitscript.updateComplete;
    expect(url).to.equal('https://external.com');
  });

  it('emits wb-exitscript-cancel on cancel', async () => {
    let eventFired = false;
    exitscript.addEventListener('wb-exitscript-cancel', () => { eventFired = true; });
    exitscript.showModal = true;
    await exitscript.updateComplete;
    const cancel = exitscript.shadowRoot!.querySelector('.button-secondary') as HTMLElement;
    cancel.click();
    await exitscript.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('cancel button closes modal', async () => {
    exitscript.showModal = true;
    await exitscript.updateComplete;
    const cancel = exitscript.shadowRoot!.querySelector('.button-secondary') as HTMLElement;
    cancel.click();
    await exitscript.updateComplete;
    expect(exitscript.showModal).to.equal(false);
  });

  it('ignores hash links', async () => {
    const hash = await fixture<WBExitScript>(html`
      <wb-exitscript>
        <a href="#section">Hash Link</a>
      </wb-exitscript>
    `);
    const link = hash.querySelector('a') as HTMLElement;
    link.click();
    await hash.updateComplete;
    expect(hash.showModal).to.equal(false);
  });

  it('ignores mailto links', async () => {
    const mailto = await fixture<WBExitScript>(html`
      <wb-exitscript>
        <a href="mailto:test@example.com">Email</a>
      </wb-exitscript>
    `);
    const link = mailto.querySelector('a') as HTMLElement;
    link.click();
    await mailto.updateComplete;
    expect(mailto.showModal).to.equal(false);
  });

  it('ignores tel links', async () => {
    const tel = await fixture<WBExitScript>(html`
      <wb-exitscript>
        <a href="tel:1234567890">Phone</a>
      </wb-exitscript>
    `);
    const link = tel.querySelector('a') as HTMLElement;
    link.click();
    await tel.updateComplete;
    expect(tel.showModal).to.equal(false);
  });

  it('handles multiple external links', async () => {
    const multi = await fixture<WBExitScript>(html`
      <wb-exitscript>
        <a href="https://site1.com">Link 1</a>
        <a href="https://site2.com">Link 2</a>
      </wb-exitscript>
    `);
    const links = multi.querySelectorAll('a');
    expect(links.length).to.equal(2);
  });

  it('renders without content', async () => {
    const empty = await fixture<WBExitScript>(html`
      <wb-exitscript></wb-exitscript>
    `);
    expect(empty).to.exist;
  });

  it('renders without errors', async () => {
    const test = await fixture<WBExitScript>(html`
      <wb-exitscript></wb-exitscript>
    `);
    expect(test).to.exist;
  });
});
