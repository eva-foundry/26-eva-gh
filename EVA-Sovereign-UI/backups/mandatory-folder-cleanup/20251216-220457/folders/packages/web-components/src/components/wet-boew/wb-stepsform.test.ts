import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './wb-stepsform.js';
import type { WBStepsForm } from './wb-stepsform.js';

describe('wb-stepsform', () => {
  let element: WBStepsForm;

  beforeEach(async () => {
    // Clear localStorage before each test
    localStorage.clear();

    element = await fixture<WBStepsForm>(html`
      <wb-stepsform
        current-step="1"
        total-steps="3"
        .stepLabels=${['Personal Info', 'Address', 'Review']}
      >
        <div data-step="1">
          <label>Name: <input type="text" name="name" required /></label>
          <label>Email: <input type="email" name="email" required /></label>
        </div>
        <div data-step="2">
          <label>Street: <input type="text" name="street" required /></label>
          <label>City: <input type="text" name="city" required /></label>
        </div>
        <div data-step="3">
          <p>Review your information</p>
          <p>Name: <span id="review-name"></span></p>
          <p>Email: <span id="review-email"></span></p>
        </div>
      </wb-stepsform>
    `);
  });

  it('renders without errors', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).not.toBeNull();
  });

  it('displays current step in progress indicator', async () => {
    await element.updateComplete;
    
    const activeStep = element.shadowRoot!.querySelector('.step-indicator.active');
    expect(activeStep).toBeDefined();
    expect(activeStep?.textContent).toContain('Personal Info');
  });

  it('shows correct step count', async () => {
    await element.updateComplete;
    
    const stepIndicators = element.shadowRoot!.querySelectorAll('.step-indicator');
    expect(stepIndicators.length).toBe(3);
  });

  it('advances to next step on nextStep()', async () => {
    // Fill required fields in step 1
    const nameInput = element.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = element.querySelector<HTMLInputElement>('input[name="email"]')!;
    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    element.nextStep();
    await element.updateComplete;

    expect(element.currentStep).toBe(2);
  });

  it('moves to previous step on previousStep()', async () => {
    element.currentStep = 2;
    await element.updateComplete;

    element.previousStep();
    await element.updateComplete;

    expect(element.currentStep).toBe(1);
  });

  it('prevents advancing if current step has validation errors', async () => {
    // Leave required fields empty
    element.nextStep();
    await element.updateComplete;

    // Should still be on step 1
    expect(element.currentStep).toBe(1);
  });

  it('marks completed steps when advancing', async () => {
    // Fill step 1 fields
    const nameInput = element.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = element.querySelector<HTMLInputElement>('input[name="email"]')!;
    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    element.nextStep();
    await element.updateComplete;

    const completedStep = element.shadowRoot!.querySelector('.step-indicator.completed');
    expect(completedStep).toBeDefined();
  });

  it('allows jumping to completed steps', async () => {
    // Complete step 1
    const nameInput = element.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = element.querySelector<HTMLInputElement>('input[name="email"]')!;
    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    element.nextStep();
    await element.updateComplete;

    // Now on step 2, jump back to step 1
    element.goToStep(1);
    await element.updateComplete;

    expect(element.currentStep).toBe(1);
  });

  it('prevents jumping to future steps', async () => {
    element.goToStep(3);
    await element.updateComplete;

    // Should still be on step 1
    expect(element.currentStep).toBe(1);
  });

  it('shows only current step content', async () => {
    await element.updateComplete;

    const step1 = element.querySelector('[data-step="1"]')!;
    const step2 = element.querySelector('[data-step="2"]')!;
    const step3 = element.querySelector('[data-step="3"]')!;

    expect(step1.classList.contains('active')).toBe(true);
    expect(step2.classList.contains('active')).toBe(false);
    expect(step3.classList.contains('active')).toBe(false);
  });

  it('emits wb-stepsform-next event when advancing', async () => {
    const spy = vi.fn();
    element.addEventListener('wb-stepsform-next', spy);

    // Fill required fields
    const nameInput = element.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = element.querySelector<HTMLInputElement>('input[name="email"]')!;
    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    element.nextStep();
    await element.updateComplete;

    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail).toEqual({ from: 1, to: 2 });
  });

  it('emits wb-stepsform-previous event when going back', async () => {
    const spy = vi.fn();
    element.addEventListener('wb-stepsform-previous', spy);

    element.currentStep = 2;
    await element.updateComplete;

    element.previousStep();
    await element.updateComplete;

    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail).toEqual({ from: 2, to: 1 });
  });

  it('emits wb-stepsform-complete event on finish', async () => {
    const spy = vi.fn();
    element.addEventListener('wb-stepsform-complete', spy);

    // Navigate to final step
    element.currentStep = 3;
    await element.updateComplete;

    element.completeWizard();
    await element.updateComplete;

    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail.data).toBeDefined();
  });

  it('collects form data on completion', async () => {
    const nameInput = element.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = element.querySelector<HTMLInputElement>('input[name="email"]')!;
    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    element.currentStep = 3;
    await element.updateComplete;

    const spy = vi.fn();
    element.addEventListener('wb-stepsform-complete', spy);

    element.completeWizard();
    await element.updateComplete;

    const formData = spy.mock.calls[0][0].detail.data;
    expect(formData.name).toBe('John Doe');
    expect(formData.email).toBe('john@example.com');
  });

  it('saves progress to localStorage when enabled', async () => {
    element.saveProgress = true;
    await element.updateComplete;

    // Fill fields
    const nameInput = element.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = element.querySelector<HTMLInputElement>('input[name="email"]')!;
    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    element.saveState();
    await element.updateComplete;

    const saved = localStorage.getItem('wb-stepsform-progress');
    expect(saved).not.toBeNull();

    const state = JSON.parse(saved!);
    expect(state.currentStep).toBe(1);
    expect(state.formData.name).toBe('John Doe');
  });

  it('restores progress from localStorage', async () => {
    // Save state
    const savedState = {
      currentStep: 2,
      completedSteps: [1],
      formData: {
        name: 'Jane Doe',
        email: 'jane@example.com'
      }
    };
    localStorage.setItem('wb-stepsform-progress', JSON.stringify(savedState));

    // Create new element with saveProgress enabled
    const newElement = await fixture<WBStepsForm>(html`
      <wb-stepsform
        save-progress
        current-step="1"
        total-steps="3"
      >
        <div data-step="1">
          <input type="text" name="name" required />
          <input type="email" name="email" required />
        </div>
        <div data-step="2">
          <input type="text" name="street" required />
        </div>
        <div data-step="3">
          <p>Review</p>
        </div>
      </wb-stepsform>
    `);

    await newElement.updateComplete;

    expect(newElement.currentStep).toBe(2);
    expect(newElement.querySelector<HTMLInputElement>('input[name="name"]')!.value).toBe('Jane Doe');
  });

  it('keyboard shortcut Ctrl+Right advances step', async () => {
    // Fill required fields
    const nameInput = element.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = element.querySelector<HTMLInputElement>('input[name="email"]')!;
    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    const event = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      ctrlKey: true,
      bubbles: true
    });
    element.dispatchEvent(event);
    await element.updateComplete;

    expect(element.currentStep).toBe(2);
  });

  it('keyboard shortcut Ctrl+Left goes to previous step', async () => {
    element.currentStep = 2;
    await element.updateComplete;

    const event = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      ctrlKey: true,
      bubbles: true
    });
    element.dispatchEvent(event);
    await element.updateComplete;

    expect(element.currentStep).toBe(1);
  });

  it('displays custom step labels', async () => {
    await element.updateComplete;

    const labels = element.shadowRoot!.querySelectorAll('.step-label');
    expect(labels[0].textContent).toContain('Personal Info');
    expect(labels[1].textContent).toContain('Address');
    expect(labels[2].textContent).toContain('Review');
  });

  it('shows finish button on last step', async () => {
    element.currentStep = 3;
    await element.updateComplete;

    const finishButton = element.shadowRoot!.querySelector('.button-finish');
    expect(finishButton).toBeDefined();
    expect(finishButton?.textContent).toContain('Complete');
  });

  it('announces step changes to screen readers', async () => {
    const spy = vi.spyOn(element, 'announce');

    // Fill required fields
    const nameInput = element.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = element.querySelector<HTMLInputElement>('input[name="email"]')!;
    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    element.nextStep();
    await element.updateComplete;

    expect(spy).toHaveBeenCalled();
  });

  it('bilingual step labels work (French)', async () => {
    element.locale = 'fr-CA';
    await element.updateComplete;

    const nextButton = element.shadowRoot!.querySelector('.button-next');
    expect(nextButton?.textContent).toContain('suivante');
  });

  it('disables previous button on first step', async () => {
    await element.updateComplete;

    const prevButton = element.shadowRoot!.querySelector<HTMLButtonElement>('.button-previous');
    expect(prevButton?.disabled).toBe(true);
  });

  it('clears localStorage on wizard completion', async () => {
    element.saveProgress = true;
    element.saveState();
    await element.updateComplete;

    expect(localStorage.getItem('wb-stepsform-progress')).not.toBeNull();

    element.currentStep = 3;
    await element.updateComplete;

    element.completeWizard();
    await element.updateComplete;

    expect(localStorage.getItem('wb-stepsform-progress')).toBeNull();
  });
});
