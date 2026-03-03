import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-fieldflow.js';
import type { WBFieldFlow } from './wb-fieldflow.js';

describe('WBFieldFlow', () => {
  const simpleSteps = [
    {
      id: 'step1',
      question: 'Are you a Canadian citizen?',
      options: [
        { value: 'yes', label: 'Yes', next: 'step2' },
        { value: 'no', label: 'No', result: 'You must be a Canadian citizen to apply' }
      ]
    },
    {
      id: 'step2',
      question: 'Do you have a valid passport?',
      options: [
        { value: 'yes', label: 'Yes', result: 'You can renew your passport online' },
        { value: 'no', label: 'No', result: 'You need to apply for a new passport' }
      ]
    }
  ];

  let wizard: WBFieldFlow;

  beforeEach(async () => {
    wizard = await fixture<WBFieldFlow>(html`
      <wb-fieldflow .steps="${simpleSteps}"></wb-fieldflow>
    `);
  });

  it('renders', () => {
    expect(wizard).to.exist;
  });

  it('displays first step', () => {
    const question = wizard.shadowRoot!.querySelector('.question');
    expect(question?.textContent).to.include('Canadian citizen');
  });

  it('displays progress bar', () => {
    const progress = wizard.shadowRoot!.querySelector('.progress');
    expect(progress).to.exist;
  });

  it('progress has role', () => {
    const progress = wizard.shadowRoot!.querySelector('.progress');
    expect(progress?.getAttribute('role')).to.equal('progressbar');
  });

  it('displays options', () => {
    const options = wizard.shadowRoot!.querySelectorAll('.option');
    expect(options.length).to.equal(2);
  });

  it('displays radio buttons', () => {
    const radios = wizard.shadowRoot!.querySelectorAll('input[type="radio"]');
    expect(radios.length).to.equal(2);
  });

  it('displays labels', () => {
    const labels = wizard.shadowRoot!.querySelectorAll('label');
    expect(labels.length).to.equal(2);
  });

  it('displays next button', () => {
    const next = wizard.shadowRoot!.querySelector('button:not(.secondary)');
    expect(next?.textContent).to.include('Next');
  });

  it('displays back button', () => {
    const back = wizard.shadowRoot!.querySelector('button.secondary');
    expect(back?.textContent).to.include('Back');
  });

  it('back button disabled initially', () => {
    const back = wizard.shadowRoot!.querySelector('button.secondary') as HTMLButtonElement;
    expect(back.disabled).to.equal(true);
  });

  it('next button disabled initially', () => {
    const next = wizard.shadowRoot!.querySelector('button:not(.secondary)') as HTMLButtonElement;
    expect(next.disabled).to.equal(true);
  });

  it('selecting option enables next', async () => {
    const radio = wizard.shadowRoot!.querySelector('input[type="radio"]') as HTMLInputElement;
    radio.click();
    await wizard.updateComplete;
    const next = wizard.shadowRoot!.querySelector('button:not(.secondary)') as HTMLButtonElement;
    expect(next.disabled).to.equal(false);
  });

  it('next advances to second step', async () => {
    const radio = wizard.shadowRoot!.querySelector('input[type="radio"]') as HTMLInputElement;
    radio.click();
    await wizard.updateComplete;
    const next = wizard.shadowRoot!.querySelector('button:not(.secondary)') as HTMLButtonElement;
    next.click();
    await wizard.updateComplete;
    const question = wizard.shadowRoot!.querySelector('.question');
    expect(question?.textContent).to.include('passport');
  });

  it('back button enabled after advancing', async () => {
    const radio = wizard.shadowRoot!.querySelector('input[type="radio"]') as HTMLInputElement;
    radio.click();
    await wizard.updateComplete;
    const next = wizard.shadowRoot!.querySelector('button:not(.secondary)') as HTMLButtonElement;
    next.click();
    await wizard.updateComplete;
    const back = wizard.shadowRoot!.querySelector('button.secondary') as HTMLButtonElement;
    expect(back.disabled).to.equal(false);
  });

  it('back returns to previous step', async () => {
    const radio = wizard.shadowRoot!.querySelector('input[type="radio"]') as HTMLInputElement;
    radio.click();
    await wizard.updateComplete;
    const next = wizard.shadowRoot!.querySelector('button:not(.secondary)') as HTMLButtonElement;
    next.click();
    await wizard.updateComplete;
    const back = wizard.shadowRoot!.querySelector('button.secondary') as HTMLButtonElement;
    back.click();
    await wizard.updateComplete;
    const question = wizard.shadowRoot!.querySelector('.question');
    expect(question?.textContent).to.include('Canadian citizen');
  });

  it('displays result when complete', async () => {
    const radios = wizard.shadowRoot!.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
    radios[1].click(); // Select "No"
    await wizard.updateComplete;
    const next = wizard.shadowRoot!.querySelector('button:not(.secondary)') as HTMLButtonElement;
    next.click();
    await wizard.updateComplete;
    const result = wizard.shadowRoot!.querySelector('.result');
    expect(result).to.exist;
  });

  it('result displays message', async () => {
    const radios = wizard.shadowRoot!.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
    radios[1].click();
    await wizard.updateComplete;
    const next = wizard.shadowRoot!.querySelector('button:not(.secondary)') as HTMLButtonElement;
    next.click();
    await wizard.updateComplete;
    const message = wizard.shadowRoot!.querySelector('.result-message');
    expect(message?.textContent).to.include('Canadian citizen');
  });

  it('displays reset button in result', async () => {
    const radios = wizard.shadowRoot!.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
    radios[1].click();
    await wizard.updateComplete;
    const next = wizard.shadowRoot!.querySelector('button:not(.secondary)') as HTMLButtonElement;
    next.click();
    await wizard.updateComplete;
    const reset = wizard.shadowRoot!.querySelector('.result button');
    expect(reset?.textContent).to.include('Start Over');
  });

  it('reset button restarts wizard', async () => {
    const radios = wizard.shadowRoot!.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
    radios[1].click();
    await wizard.updateComplete;
    const next = wizard.shadowRoot!.querySelector('button:not(.secondary)') as HTMLButtonElement;
    next.click();
    await wizard.updateComplete;
    const reset = wizard.shadowRoot!.querySelector('.result button') as HTMLButtonElement;
    reset.click();
    await wizard.updateComplete;
    const question = wizard.shadowRoot!.querySelector('.question');
    expect(question?.textContent).to.include('Canadian citizen');
  });

  it('emits step event', async () => {
    let eventFired = false;
    wizard.addEventListener('wb-fieldflow-step', () => { eventFired = true; });
    const radio = wizard.shadowRoot!.querySelector('input[type="radio"]') as HTMLInputElement;
    radio.click();
    await wizard.updateComplete;
    const next = wizard.shadowRoot!.querySelector('button:not(.secondary)') as HTMLButtonElement;
    next.click();
    await wizard.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('emits complete event', async () => {
    let eventFired = false;
    wizard.addEventListener('wb-fieldflow-complete', () => { eventFired = true; });
    const radios = wizard.shadowRoot!.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
    radios[1].click();
    await wizard.updateComplete;
    const next = wizard.shadowRoot!.querySelector('button:not(.secondary)') as HTMLButtonElement;
    next.click();
    await wizard.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('emits back event', async () => {
    let eventFired = false;
    wizard.addEventListener('wb-fieldflow-back', () => { eventFired = true; });
    const radio = wizard.shadowRoot!.querySelector('input[type="radio"]') as HTMLInputElement;
    radio.click();
    await wizard.updateComplete;
    const next = wizard.shadowRoot!.querySelector('button:not(.secondary)') as HTMLButtonElement;
    next.click();
    await wizard.updateComplete;
    const back = wizard.shadowRoot!.querySelector('button.secondary') as HTMLButtonElement;
    back.click();
    await wizard.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('emits reset event', async () => {
    let eventFired = false;
    wizard.addEventListener('wb-fieldflow-reset', () => { eventFired = true; });
    const radios = wizard.shadowRoot!.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
    radios[1].click();
    await wizard.updateComplete;
    const next = wizard.shadowRoot!.querySelector('button:not(.secondary)') as HTMLButtonElement;
    next.click();
    await wizard.updateComplete;
    const reset = wizard.shadowRoot!.querySelector('.result button') as HTMLButtonElement;
    reset.click();
    await wizard.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('handles empty steps', async () => {
    const empty = await fixture<WBFieldFlow>(html`
      <wb-fieldflow .steps="${[]}"></wb-fieldflow>
    `);
    expect(empty).to.exist;
  });

  it('displays step counter', () => {
    const counter = wizard.shadowRoot!.querySelector('[style*="text-align: center"]');
    expect(counter?.textContent).to.include('Step 1 of 2');
  });

  it('renders without errors', async () => {
    const test = await fixture<WBFieldFlow>(html`
      <wb-fieldflow></wb-fieldflow>
    `);
    expect(test).to.exist;
  });
});
