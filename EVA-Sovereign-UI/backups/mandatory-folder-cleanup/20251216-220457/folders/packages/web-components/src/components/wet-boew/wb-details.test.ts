import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-details.js';
import type { WBDetails } from './wb-details.js';

describe('WBDetails', () => {
  let details: WBDetails;

  beforeEach(async () => {
    details = await fixture<WBDetails>(html`
      <wb-details>
        <span slot="summary">Click to expand</span>
        <p>Hidden content</p>
      </wb-details>
    `);
  });

  it('renders', () => {
    expect(details).to.exist;
  });

  it('default open is false', () => {
    expect(details.open).to.equal(false);
  });

  it('displays summary', () => {
    const summary = details.shadowRoot!.querySelector('.summary');
    expect(summary).to.exist;
  });

  it('summary has role=button', () => {
    const summary = details.shadowRoot!.querySelector('.summary');
    expect(summary?.getAttribute('role')).to.equal('button');
  });

  it('summary has tabindex', () => {
    const summary = details.shadowRoot!.querySelector('.summary');
    expect(summary?.getAttribute('tabindex')).to.equal('0');
  });

  it('summary has aria-expanded', () => {
    const summary = details.shadowRoot!.querySelector('.summary');
    expect(summary?.getAttribute('aria-expanded')).to.exist;
  });

  it('summary has aria-label', () => {
    const summary = details.shadowRoot!.querySelector('.summary');
    expect(summary?.getAttribute('aria-label')).to.exist;
  });

  it('displays icon', () => {
    const icon = details.shadowRoot!.querySelector('.icon');
    expect(icon).to.exist;
  });

  it('content is hidden initially', () => {
    const content = details.shadowRoot!.querySelector('.content');
    expect(content?.classList.contains('open')).to.equal(false);
  });

  it('content has role=region', () => {
    const content = details.shadowRoot!.querySelector('.content');
    expect(content?.getAttribute('role')).to.equal('region');
  });

  it('clicking summary opens details', async () => {
    const summary = details.shadowRoot!.querySelector('.summary') as HTMLElement;
    summary.click();
    await details.updateComplete;
    expect(details.open).to.equal(true);
  });

  it('content displays when open', async () => {
    details.open = true;
    await details.updateComplete;
    const content = details.shadowRoot!.querySelector('.content');
    expect(content?.classList.contains('open')).to.equal(true);
  });

  it('icon rotates when open', async () => {
    details.open = true;
    await details.updateComplete;
    const icon = details.shadowRoot!.querySelector('.icon');
    expect(icon?.classList.contains('open')).to.equal(true);
  });

  it('emits wb-details-toggle event', async () => {
    let eventFired = false;
    details.addEventListener('wb-details-toggle', () => { eventFired = true; });
    const summary = details.shadowRoot!.querySelector('.summary') as HTMLElement;
    summary.click();
    await details.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('event includes open state', async () => {
    let openState = false;
    details.addEventListener('wb-details-toggle', (e: Event) => {
      openState = (e as CustomEvent).detail.open;
    });
    const summary = details.shadowRoot!.querySelector('.summary') as HTMLElement;
    summary.click();
    await details.updateComplete;
    expect(openState).to.equal(true);
  });

  it('Enter key toggles open', async () => {
    const summary = details.shadowRoot!.querySelector('.summary') as HTMLElement;
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    summary.dispatchEvent(event);
    await details.updateComplete;
    expect(details.open).to.equal(true);
  });

  it('Space key toggles open', async () => {
    const summary = details.shadowRoot!.querySelector('.summary') as HTMLElement;
    const event = new KeyboardEvent('keydown', { key: ' ' });
    summary.dispatchEvent(event);
    await details.updateComplete;
    expect(details.open).to.equal(true);
  });

  it('clicking twice toggles state', async () => {
    const summary = details.shadowRoot!.querySelector('.summary') as HTMLElement;
    summary.click();
    await details.updateComplete;
    expect(details.open).to.equal(true);
    summary.click();
    await details.updateComplete;
    expect(details.open).to.equal(false);
  });

  it('supports initial open state', async () => {
    const open = await fixture<WBDetails>(html`
      <wb-details open>
        <span slot="summary">Summary</span>
        <p>Content</p>
      </wb-details>
    `);
    expect(open.open).to.equal(true);
  });

  it('reflects open attribute', async () => {
    details.open = true;
    await details.updateComplete;
    expect(details.hasAttribute('open')).to.equal(true);
  });

  it('displays slotted content', () => {
    const slot = details.shadowRoot!.querySelector('slot:not([name])');
    expect(slot).to.exist;
  });

  it('displays named summary slot', () => {
    const summarySlot = details.shadowRoot!.querySelector('slot[name="summary"]');
    expect(summarySlot).to.exist;
  });

  it('handles empty summary', async () => {
    const empty = await fixture<WBDetails>(html`
      <wb-details>
        <p>Content only</p>
      </wb-details>
    `);
    expect(empty).to.exist;
  });

  it('handles empty content', async () => {
    const empty = await fixture<WBDetails>(html`
      <wb-details>
        <span slot="summary">Summary only</span>
      </wb-details>
    `);
    expect(empty).to.exist;
  });

  it('renders without errors', async () => {
    const test = await fixture<WBDetails>(html`
      <wb-details></wb-details>
    `);
    expect(test).to.exist;
  });
});
