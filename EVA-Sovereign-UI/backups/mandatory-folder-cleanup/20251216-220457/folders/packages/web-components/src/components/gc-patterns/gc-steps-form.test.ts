import { expect as chaiExpect } from 'chai';
import { fixture, html } from '@open-wc/testing';
import { GCStepsForm } from './gc-steps-form.js';

import './gc-steps-form.js';

describe('gc-steps-form', () => {
  const mockSteps = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      fields: '<input type="text" placeholder="Full Name" />'
    },
    {
      id: 'contact',
      title: 'Contact Information',
      description: 'How can we reach you?',
      fields: '<input type="email" placeholder="Email" />'
    },
    {
      id: 'review',
      title: 'Review',
      description: 'Please review your information',
      fields: '<p>Review your submission</p>'
    }
  ];

  it('should render all step indicators', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    const indicators = el.shadowRoot!.querySelectorAll('.step-indicator');
    chaiExpect(indicators.length).to.equal(3);
  });

  it('should start at first step', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    await el.updateComplete;
    const currentIndicator = el.shadowRoot!.querySelector('.step-indicator.current');
    chaiExpect(currentIndicator).to.exist;
  });

  it('should display current step title', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    const title = el.shadowRoot!.querySelector('.step-content h2');
    chaiExpect(title?.textContent).to.equal('Personal Information');
  });

  it('should display current step description', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    const description = el.shadowRoot!.querySelector('.step-description');
    chaiExpect(description?.textContent).to.equal('Tell us about yourself');
  });

  it('should advance to next step', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    el.nextStep();
    await el.updateComplete;

    const title = el.shadowRoot!.querySelector('.step-content h2');
    chaiExpect(title?.textContent).to.equal('Contact Information');
  });

  it('should go back to previous step', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    el.nextStep();
    await el.updateComplete;
    el.previousStep();
    await el.updateComplete;

    const title = el.shadowRoot!.querySelector('.step-content h2');
    chaiExpect(title?.textContent).to.equal('Personal Information');
  });

  it('should disable previous button on first step', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    const prevBtn = el.shadowRoot!.querySelector('.btn-secondary') as HTMLButtonElement;
    chaiExpect(prevBtn.disabled).to.be.true;
  });

  it('should enable previous button after advancing', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    el.nextStep();
    await el.updateComplete;

    const prevBtn = el.shadowRoot!.querySelector('.btn-secondary') as HTMLButtonElement;
    chaiExpect(prevBtn.disabled).to.be.false;
  });

  it('should show submit button on last step', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    el.goToStep(2);
    await el.updateComplete;

    const submitBtn = el.shadowRoot!.querySelector('.btn-primary');
    chaiExpect(submitBtn?.textContent?.trim()).to.equal('Submit');
  });

  it('should emit step-change event on next', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    let eventFired = false;
    let eventDetail: any;

    el.addEventListener('gc-step-change', ((e: CustomEvent) => {
      eventFired = true;
      eventDetail = e.detail;
    }) as EventListener);

    el.nextStep();
    await el.updateComplete;

    chaiExpect(eventFired).to.be.true;
    chaiExpect(eventDetail.direction).to.equal('next');
  });

  it('should emit step-change event on previous', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    el.nextStep();
    await el.updateComplete;

    let eventFired = false;
    el.addEventListener('gc-step-change', (() => {
      eventFired = true;
    }) as EventListener);

    el.previousStep();
    await el.updateComplete;

    chaiExpect(eventFired).to.be.true;
  });

  it('should emit form-submit event', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    el.goToStep(2);
    await el.updateComplete;

    let eventFired = false;
    el.addEventListener('gc-form-submit', (() => {
      eventFired = true;
    }) as EventListener);

    el.submitForm();
    await el.updateComplete;

    chaiExpect(eventFired).to.be.true;
  });

  it('should mark completed steps', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    el.nextStep();
    el.nextStep();
    await el.updateComplete;

    const completedSteps = el.shadowRoot!.querySelectorAll('.step-indicator.completed');
    chaiExpect(completedSteps.length).to.equal(2);
  });

  it('should display checkmarks on completed steps', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    el.nextStep();
    await el.updateComplete;

    const completedNumber = el.shadowRoot!.querySelector('.step-indicator.completed .step-number');
    chaiExpect(completedNumber?.textContent?.trim()).to.equal('');
  });

  it('should go to specific step using goToStep', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    el.goToStep(2);
    await el.updateComplete;

    const title = el.shadowRoot!.querySelector('.step-content h2');
    chaiExpect(title?.textContent).to.equal('Review');
  });

  it('should display validation errors', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    el.addValidationError('Name is required');
    await el.updateComplete;

    const errorSection = el.shadowRoot!.querySelector('.validation-errors');
    chaiExpect(errorSection).to.exist;
  });

  it('should list all validation errors', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    el.addValidationError('Name is required');
    el.addValidationError('Name must be at least 2 characters');
    await el.updateComplete;

    const errors = el.shadowRoot!.querySelectorAll('.validation-errors li');
    chaiExpect(errors.length).to.equal(2);
  });

  it('should clear validation errors', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    el.addValidationError('Name is required');
    await el.updateComplete;
    el.clearValidationErrors();
    await el.updateComplete;

    const errorSection = el.shadowRoot!.querySelector('.validation-errors');
    chaiExpect(errorSection).to.not.exist;
  });

  it('should have progress indicator with navigation role', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    const progressIndicator = el.shadowRoot!.querySelector('.progress-indicator');
    chaiExpect(progressIndicator?.getAttribute('role')).to.equal('navigation');
  });

  it('should have ARIA labels on step numbers', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    const stepNumbers = el.shadowRoot!.querySelectorAll('.step-number');
    stepNumbers.forEach(number => {
      chaiExpect(number.hasAttribute('aria-label')).to.be.true;
    });
  });

  it('should have alert role on validation errors', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    el.addValidationError('Error');
    await el.updateComplete;

    const errorSection = el.shadowRoot!.querySelector('.validation-errors');
    chaiExpect(errorSection?.getAttribute('role')).to.equal('alert');
  });

  it('should handle empty steps array', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${[]}"></gc-steps-form>
    `);
    const indicators = el.shadowRoot!.querySelectorAll('.step-indicator');
    chaiExpect(indicators.length).to.equal(0);
  });

  it('should not advance beyond last step', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    el.goToStep(2);
    await el.updateComplete;
    el.nextStep();
    await el.updateComplete;

    const title = el.shadowRoot!.querySelector('.step-content h2');
    chaiExpect(title?.textContent).to.equal('Review');
  });

  it('should not go before first step', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    el.previousStep();
    await el.updateComplete;

    const title = el.shadowRoot!.querySelector('.step-content h2');
    chaiExpect(title?.textContent).to.equal('Personal Information');
  });

  it('should be accessible', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}"></gc-steps-form>
    `);
    await chaiExpect(el).to.be.accessible();
  });

  it('should support French Canadian locale', async () => {
    const el = await fixture<GCStepsForm>(html`
      <gc-steps-form .steps="${mockSteps}" locale="fr-CA"></gc-steps-form>
    `);
    const nextBtn = el.shadowRoot!.querySelector('.btn-primary');
    chaiExpect(nextBtn?.textContent?.trim()).to.equal('Suivant');
  });
});
