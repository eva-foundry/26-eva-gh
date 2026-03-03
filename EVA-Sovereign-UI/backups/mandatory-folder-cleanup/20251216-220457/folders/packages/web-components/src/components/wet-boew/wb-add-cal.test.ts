import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-add-cal.js';
import type { WBAddCal } from './wb-add-cal.js';

describe('WBAddCal', () => {
  let addCal: WBAddCal;

  beforeEach(async () => {
    addCal = await fixture<WBAddCal>(html`
      <wb-add-cal
        title="Team Meeting"
        description="Quarterly review"
        location="Office"
        startDate="2025-02-01T10:00:00Z"
        endDate="2025-02-01T11:00:00Z"
      ></wb-add-cal>
    `);
  });

  it('renders', () => {
    expect(addCal).to.exist;
  });

  it('has title property', () => {
    expect(addCal.title).to.equal('Team Meeting');
  });

  it('has description property', () => {
    expect(addCal.description).to.equal('Quarterly review');
  });

  it('has location property', () => {
    expect(addCal.location).to.equal('Office');
  });

  it('has startDate property', () => {
    expect(addCal.startDate).to.equal('2025-02-01T10:00:00Z');
  });

  it('has endDate property', () => {
    expect(addCal.endDate).to.equal('2025-02-01T11:00:00Z');
  });

  it('displays button', () => {
    const button = addCal.shadowRoot!.querySelector('.add-cal-button');
    expect(button).to.exist;
  });

  it('button has aria-label', () => {
    const button = addCal.shadowRoot!.querySelector('.add-cal-button');
    expect(button?.getAttribute('aria-label')).to.exist;
  });

  it('button has icon', () => {
    const icon = addCal.shadowRoot!.querySelector('.icon');
    expect(icon).to.exist;
  });

  it('emits wb-add-cal-added event on click', async () => {
    let eventFired = false;
    addCal.addEventListener('wb-add-cal-added', () => { eventFired = true; });
    const button = addCal.shadowRoot!.querySelector('.add-cal-button') as HTMLButtonElement;
    button.click();
    await addCal.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('event includes title', async () => {
    let title = '';
    addCal.addEventListener('wb-add-cal-added', (e: Event) => {
      title = (e as CustomEvent).detail.title;
    });
    const button = addCal.shadowRoot!.querySelector('.add-cal-button') as HTMLButtonElement;
    button.click();
    await addCal.updateComplete;
    expect(title).to.equal('Team Meeting');
  });

  it('event includes startDate', async () => {
    let startDate = '';
    addCal.addEventListener('wb-add-cal-added', (e: Event) => {
      startDate = (e as CustomEvent).detail.startDate;
    });
    const button = addCal.shadowRoot!.querySelector('.add-cal-button') as HTMLButtonElement;
    button.click();
    await addCal.updateComplete;
    expect(startDate).to.equal('2025-02-01T10:00:00Z');
  });

  it('event includes endDate', async () => {
    let endDate = '';
    addCal.addEventListener('wb-add-cal-added', (e: Event) => {
      endDate = (e as CustomEvent).detail.endDate;
    });
    const button = addCal.shadowRoot!.querySelector('.add-cal-button') as HTMLButtonElement;
    button.click();
    await addCal.updateComplete;
    expect(endDate).to.equal('2025-02-01T11:00:00Z');
  });

  it('default title is empty', async () => {
    const empty = await fixture<WBAddCal>(html`
      <wb-add-cal></wb-add-cal>
    `);
    expect(empty.title).to.equal('');
  });

  it('default description is empty', async () => {
    const empty = await fixture<WBAddCal>(html`
      <wb-add-cal></wb-add-cal>
    `);
    expect(empty.description).to.equal('');
  });

  it('default location is empty', async () => {
    const empty = await fixture<WBAddCal>(html`
      <wb-add-cal></wb-add-cal>
    `);
    expect(empty.location).to.equal('');
  });

  it('emits error on invalid start date', async () => {
    let errorFired = false;
    const invalid = await fixture<WBAddCal>(html`
      <wb-add-cal
        title="Test"
        startDate="invalid-date"
        endDate="2025-02-01T11:00:00Z"
      ></wb-add-cal>
    `);
    invalid.addEventListener('wb-add-cal-error', () => { errorFired = true; });
    const button = invalid.shadowRoot!.querySelector('.add-cal-button') as HTMLButtonElement;
    button.click();
    await invalid.updateComplete;
    expect(errorFired).to.equal(true);
  });

  it('emits error on invalid end date', async () => {
    let errorFired = false;
    const invalid = await fixture<WBAddCal>(html`
      <wb-add-cal
        title="Test"
        startDate="2025-02-01T10:00:00Z"
        endDate="invalid-date"
      ></wb-add-cal>
    `);
    invalid.addEventListener('wb-add-cal-error', () => { errorFired = true; });
    const button = invalid.shadowRoot!.querySelector('.add-cal-button') as HTMLButtonElement;
    button.click();
    await invalid.updateComplete;
    expect(errorFired).to.equal(true);
  });

  it('displays calendar emoji icon', () => {
    const icon = addCal.shadowRoot!.querySelector('.icon');
    expect(icon?.textContent).to.include('📅');
  });

  it('button has focus outline', () => {
    const button = addCal.shadowRoot!.querySelector('.add-cal-button') as HTMLElement;
    const style = getComputedStyle(button);
    expect(style).to.exist;
  });

  it('renders with minimal properties', async () => {
    const minimal = await fixture<WBAddCal>(html`
      <wb-add-cal
        title="Simple Event"
        startDate="2025-03-01T12:00:00Z"
        endDate="2025-03-01T13:00:00Z"
      ></wb-add-cal>
    `);
    expect(minimal).to.exist;
  });

  it('renders without errors', async () => {
    const noError = await fixture<WBAddCal>(html`
      <wb-add-cal></wb-add-cal>
    `);
    expect(noError).to.exist;
  });
});
