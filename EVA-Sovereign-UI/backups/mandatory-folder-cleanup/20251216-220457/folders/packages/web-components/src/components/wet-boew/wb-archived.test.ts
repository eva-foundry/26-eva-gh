import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach, afterEach } from 'vitest';
import './wb-archived.js';
import type { WBArchived } from './wb-archived.js';

describe('WBArchived', () => {
  let archived: WBArchived;

  beforeEach(async () => {
    localStorage.clear();
    archived = await fixture<WBArchived>(html`
      <wb-archived></wb-archived>
    `);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders', () => {
    expect(archived).to.exist;
  });

  it('displays banner', () => {
    const banner = archived.shadowRoot!.querySelector('.banner');
    expect(banner).to.exist;
  });

  it('banner has role=alert', () => {
    const banner = archived.shadowRoot!.querySelector('.banner');
    expect(banner?.getAttribute('role')).to.equal('alert');
  });

  it('displays warning icon', () => {
    const icon = archived.shadowRoot!.querySelector('.icon');
    expect(icon?.textContent).to.include('⚠');
  });

  it('displays title', () => {
    const title = archived.shadowRoot!.querySelector('.title');
    expect(title?.textContent).to.include('Archived');
  });

  it('displays default message', () => {
    const message = archived.shadowRoot!.querySelector('.message');
    expect(message?.textContent).to.include('archived');
  });

  it('displays slotted content', async () => {
    const custom = await fixture<WBArchived>(html`
      <wb-archived>Custom message</wb-archived>
    `);
    const slot = custom.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
  });

  it('displays archived date when provided', async () => {
    const dated = await fixture<WBArchived>(html`
      <wb-archived archivedDate="2020-01-15"></wb-archived>
    `);
    const date = dated.shadowRoot!.querySelector('.date');
    expect(date?.textContent).to.include('2020-01-15');
  });

  it('no date shown when not provided', () => {
    const date = archived.shadowRoot!.querySelector('.date');
    expect(date).to.be.null;
  });

  it('dismiss button hidden by default', () => {
    const dismiss = archived.shadowRoot!.querySelector('.dismiss');
    expect(dismiss).to.be.null;
  });

  it('dismiss button shown when dismissible', async () => {
    const dismissible = await fixture<WBArchived>(html`
      <wb-archived dismissible></wb-archived>
    `);
    const dismiss = dismissible.shadowRoot!.querySelector('.dismiss');
    expect(dismiss).to.exist;
  });

  it('dismiss button has aria-label', async () => {
    const dismissible = await fixture<WBArchived>(html`
      <wb-archived dismissible></wb-archived>
    `);
    const dismiss = dismissible.shadowRoot!.querySelector('.dismiss');
    expect(dismiss?.getAttribute('aria-label')).to.exist;
  });

  it('clicking dismiss hides banner', async () => {
    const dismissible = await fixture<WBArchived>(html`
      <wb-archived dismissible></wb-archived>
    `);
    const dismiss = dismissible.shadowRoot!.querySelector('.dismiss') as HTMLButtonElement;
    dismiss.click();
    await dismissible.updateComplete;
    expect(dismissible.hidden).to.equal(true);
  });

  it('dismiss saves to localStorage', async () => {
    const dismissible = await fixture<WBArchived>(html`
      <wb-archived dismissible storageKey="test-key"></wb-archived>
    `);
    const dismiss = dismissible.shadowRoot!.querySelector('.dismiss') as HTMLButtonElement;
    dismiss.click();
    await dismissible.updateComplete;
    expect(localStorage.getItem('test-key')).to.equal('true');
  });

  it('hidden if previously dismissed', async () => {
    localStorage.setItem('test-dismissed', 'true');
    const dismissed = await fixture<WBArchived>(html`
      <wb-archived dismissible storageKey="test-dismissed"></wb-archived>
    `);
    expect(dismissed.hidden).to.equal(true);
  });

  it('emits dismissed event', async () => {
    let eventFired = false;
    const dismissible = await fixture<WBArchived>(html`
      <wb-archived dismissible></wb-archived>
    `);
    dismissible.addEventListener('wb-archived-dismissed', () => { eventFired = true; });
    const dismiss = dismissible.shadowRoot!.querySelector('.dismiss') as HTMLButtonElement;
    dismiss.click();
    await dismissible.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('supports custom storage key', async () => {
    const custom = await fixture<WBArchived>(html`
      <wb-archived dismissible storageKey="my-custom-key"></wb-archived>
    `);
    expect(custom.storageKey).to.equal('my-custom-key');
  });

  it('default storage key set', () => {
    expect(archived.storageKey).to.equal('wb-archived-dismissed');
  });

  it('renders with date and dismissible', async () => {
    const full = await fixture<WBArchived>(html`
      <wb-archived archivedDate="2020-06-30" dismissible></wb-archived>
    `);
    const date = full.shadowRoot!.querySelector('.date');
    const dismiss = full.shadowRoot!.querySelector('.dismiss');
    expect(date).to.exist;
    expect(dismiss).to.exist;
  });

  it('renders with custom content and date', async () => {
    const custom = await fixture<WBArchived>(html`
      <wb-archived archivedDate="2019-12-01">
        This policy was replaced in 2020.
      </wb-archived>
    `);
    expect(custom).to.exist;
  });

  it('handles empty archived date', async () => {
    const empty = await fixture<WBArchived>(html`
      <wb-archived archivedDate=""></wb-archived>
    `);
    const date = empty.shadowRoot!.querySelector('.date');
    expect(date).to.be.null;
  });

  it('renders without errors', async () => {
    const test = await fixture<WBArchived>(html`
      <wb-archived></wb-archived>
    `);
    expect(test).to.exist;
  });
});
