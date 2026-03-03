import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-feedback.js';
import type { WBFeedback } from './wb-feedback.js';

describe('WBFeedback', () => {
  let feedback: WBFeedback;

  beforeEach(async () => {
    feedback = await fixture<WBFeedback>(html`
      <wb-feedback></wb-feedback>
    `);
  });

  it('renders', () => {
    expect(feedback).to.exist;
  });

  it('default showForm is false', () => {
    expect(feedback.showForm).to.equal(false);
  });

  it('displays toggle button', () => {
    const button = feedback.shadowRoot!.querySelector('.feedback-toggle');
    expect(button).to.exist;
  });

  it('toggle button has aria-expanded', () => {
    const button = feedback.shadowRoot!.querySelector('.feedback-toggle');
    expect(button?.getAttribute('aria-expanded')).to.exist;
  });

  it('toggle button has aria-label', () => {
    const button = feedback.shadowRoot!.querySelector('.feedback-toggle');
    expect(button?.getAttribute('aria-label')).to.exist;
  });

  it('form is hidden initially', () => {
    const form = feedback.shadowRoot!.querySelector('.feedback-form');
    expect(form).to.be.null;
  });

  it('clicking toggle shows form', async () => {
    const button = feedback.shadowRoot!.querySelector('.feedback-toggle') as HTMLElement;
    button.click();
    await feedback.updateComplete;
    expect(feedback.showForm).to.equal(true);
  });

  it('form displays when shown', async () => {
    feedback.showForm = true;
    await feedback.updateComplete;
    const form = feedback.shadowRoot!.querySelector('.feedback-form');
    expect(form).to.exist;
  });

  it('form has role=region', async () => {
    feedback.showForm = true;
    await feedback.updateComplete;
    const form = feedback.shadowRoot!.querySelector('.feedback-form');
    expect(form?.getAttribute('role')).to.equal('region');
  });

  it('form has title', async () => {
    feedback.showForm = true;
    await feedback.updateComplete;
    const title = feedback.shadowRoot!.querySelector('#feedback-title');
    expect(title).to.exist;
  });

  it('form has rating radio buttons', async () => {
    feedback.showForm = true;
    await feedback.updateComplete;
    const radios = feedback.shadowRoot!.querySelectorAll('input[type="radio"]');
    expect(radios.length).to.equal(4);
  });

  it('form has comments textarea', async () => {
    feedback.showForm = true;
    await feedback.updateComplete;
    const textarea = feedback.shadowRoot!.querySelector('#comments');
    expect(textarea).to.exist;
  });

  it('form has email input', async () => {
    feedback.showForm = true;
    await feedback.updateComplete;
    const email = feedback.shadowRoot!.querySelector('#email');
    expect(email).to.exist;
  });

  it('email input has type=email', async () => {
    feedback.showForm = true;
    await feedback.updateComplete;
    const email = feedback.shadowRoot!.querySelector('#email');
    expect(email?.getAttribute('type')).to.equal('email');
  });

  it('form has submit button', async () => {
    feedback.showForm = true;
    await feedback.updateComplete;
    const submit = feedback.shadowRoot!.querySelector('button[type="submit"]');
    expect(submit).to.exist;
  });

  it('form has cancel button', async () => {
    feedback.showForm = true;
    await feedback.updateComplete;
    const cancel = feedback.shadowRoot!.querySelector('.button-secondary');
    expect(cancel).to.exist;
  });

  it('cancel button closes form', async () => {
    feedback.showForm = true;
    await feedback.updateComplete;
    const cancel = feedback.shadowRoot!.querySelector('.button-secondary') as HTMLElement;
    cancel.click();
    await feedback.updateComplete;
    expect(feedback.showForm).to.equal(false);
  });

  it('emits wb-feedback-submit event', async () => {
    let eventFired = false;
    feedback.addEventListener('wb-feedback-submit', () => { eventFired = true; });
    feedback.showForm = true;
    await feedback.updateComplete;
    const radio = feedback.shadowRoot!.querySelector('input[type="radio"]') as HTMLInputElement;
    radio.click();
    const form = feedback.shadowRoot!.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await feedback.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('event includes rating', async () => {
    let rating = '';
    feedback.addEventListener('wb-feedback-submit', (e: Event) => {
      rating = (e as CustomEvent).detail.rating;
    });
    feedback.showForm = true;
    await feedback.updateComplete;
    const radio = feedback.shadowRoot!.querySelector('input[value="excellent"]') as HTMLInputElement;
    radio.click();
    await feedback.updateComplete;
    const form = feedback.shadowRoot!.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await feedback.updateComplete;
    expect(rating).to.equal('excellent');
  });

  it('displays success message after submit', async () => {
    feedback.showForm = true;
    await feedback.updateComplete;
    const radio = feedback.shadowRoot!.querySelector('input[type="radio"]') as HTMLInputElement;
    radio.click();
    const form = feedback.shadowRoot!.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await feedback.updateComplete;
    const success = feedback.shadowRoot!.querySelector('.success-message');
    expect(success).to.exist;
  });

  it('success message displays correct text', async () => {
    feedback.showForm = true;
    await feedback.updateComplete;
    const radio = feedback.shadowRoot!.querySelector('input[type="radio"]') as HTMLInputElement;
    radio.click();
    const form = feedback.shadowRoot!.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await feedback.updateComplete;
    const success = feedback.shadowRoot!.querySelector('.success-message');
    expect(success?.textContent).to.exist;
  });

  it('clicking toggle twice toggles form', async () => {
    const button = feedback.shadowRoot!.querySelector('.feedback-toggle') as HTMLElement;
    button.click();
    await feedback.updateComplete;
    expect(feedback.showForm).to.equal(true);
    button.click();
    await feedback.updateComplete;
    expect(feedback.showForm).to.equal(false);
  });

  it('renders without errors', async () => {
    const test = await fixture<WBFeedback>(html`
      <wb-feedback></wb-feedback>
    `);
    expect(test).to.exist;
  });
});
