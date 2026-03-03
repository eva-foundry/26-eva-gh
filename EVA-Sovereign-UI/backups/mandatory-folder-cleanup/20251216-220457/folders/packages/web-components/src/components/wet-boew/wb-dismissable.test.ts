import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach, afterEach } from 'vitest';
import './wb-dismissable.js';
import type { WBDismissable } from './wb-dismissable.js';

describe('WBDismissable', () => {
  let dismissable: WBDismissable;

  beforeEach(async () => {
    localStorage.clear();
    dismissable = await fixture<WBDismissable>(html`
      <wb-dismissable>
        <p>This is dismissable content</p>
      </wb-dismissable>
    `);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders', () => {
    expect(dismissable).to.exist;
  });

  it('displays container', () => {
    const container = dismissable.shadowRoot!.querySelector('.container');
    expect(container).to.exist;
  });

  it('displays dismiss button', () => {
    const button = dismissable.shadowRoot!.querySelector('.dismiss-button');
    expect(button).to.exist;
  });

  it('button has aria-label', () => {
    const button = dismissable.shadowRoot!.querySelector('.dismiss-button');
    expect(button?.getAttribute('aria-label')).to.exist;
  });

  it('displays slotted content', () => {
    const content = dismissable.shadowRoot!.querySelector('.content');
    expect(content).to.exist;
  });

  it('clicking dismiss hides element', async () => {
    const button = dismissable.shadowRoot!.querySelector('.dismiss-button') as HTMLButtonElement;
    button.click();
    await dismissable.updateComplete;
    expect(dismissable.hidden).to.equal(true);
  });

  it('persistent by default', () => {
    expect(dismissable.persistent).to.equal(true);
  });

  it('saves to localStorage when persistent', async () => {
    const button = dismissable.shadowRoot!.querySelector('.dismiss-button') as HTMLButtonElement;
    button.click();
    await dismissable.updateComplete;
    expect(localStorage.getItem('wb-dismissable')).to.equal('true');
  });

  it('does not save when not persistent', async () => {
    const nonPersistent = await fixture<WBDismissable>(html`
      <wb-dismissable persistent="false">Content</wb-dismissable>
    `);
    const button = nonPersistent.shadowRoot!.querySelector('.dismiss-button') as HTMLButtonElement;
    button.click();
    await nonPersistent.updateComplete;
    expect(localStorage.getItem('wb-dismissable')).to.be.null;
  });

  it('uses custom storage key', async () => {
    const custom = await fixture<WBDismissable>(html`
      <wb-dismissable storageKey="custom-key">Content</wb-dismissable>
    `);
    const button = custom.shadowRoot!.querySelector('.dismiss-button') as HTMLButtonElement;
    button.click();
    await custom.updateComplete;
    expect(localStorage.getItem('custom-key')).to.equal('true');
  });

  it('hidden if previously dismissed', async () => {
    localStorage.setItem('test-dismiss', 'true');
    const dismissed = await fixture<WBDismissable>(html`
      <wb-dismissable storageKey="test-dismiss">Content</wb-dismissable>
    `);
    expect(dismissed.hidden).to.equal(true);
  });

  it('not hidden if not previously dismissed', async () => {
    const notDismissed = await fixture<WBDismissable>(html`
      <wb-dismissable storageKey="never-dismissed">Content</wb-dismissable>
    `);
    expect(notDismissed.hidden).to.equal(false);
  });

  it('emits dismissed event', async () => {
    let eventFired = false;
    dismissable.addEventListener('wb-dismissable-dismissed', () => { eventFired = true; });
    const button = dismissable.shadowRoot!.querySelector('.dismiss-button') as HTMLButtonElement;
    button.click();
    await dismissable.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('event includes persistent state', async () => {
    let isPersistent = false;
    dismissable.addEventListener('wb-dismissable-dismissed', (e: Event) => {
      isPersistent = (e as CustomEvent).detail.persistent;
    });
    const button = dismissable.shadowRoot!.querySelector('.dismiss-button') as HTMLButtonElement;
    button.click();
    await dismissable.updateComplete;
    expect(isPersistent).to.equal(true);
  });

  it('renders with multiple paragraphs', async () => {
    const multi = await fixture<WBDismissable>(html`
      <wb-dismissable>
        <p>First paragraph</p>
        <p>Second paragraph</p>
      </wb-dismissable>
    `);
    expect(multi).to.exist;
  });

  it('renders with rich content', async () => {
    const rich = await fixture<WBDismissable>(html`
      <wb-dismissable>
        <h3>Title</h3>
        <p>Content with <strong>bold</strong> text</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </wb-dismissable>
    `);
    expect(rich).to.exist;
  });

  it('handles empty content', async () => {
    const empty = await fixture<WBDismissable>(html`
      <wb-dismissable></wb-dismissable>
    `);
    expect(empty).to.exist;
  });

  it('default storage key set', () => {
    expect(dismissable.storageKey).to.equal('wb-dismissable');
  });

  it('supports boolean persistent attribute', async () => {
    const test = await fixture<WBDismissable>(html`
      <wb-dismissable persistent>Content</wb-dismissable>
    `);
    expect(test.persistent).to.equal(true);
  });

  it('renders without errors', async () => {
    const test = await fixture<WBDismissable>(html`
      <wb-dismissable></wb-dismissable>
    `);
    expect(test).to.exist;
  });
});
