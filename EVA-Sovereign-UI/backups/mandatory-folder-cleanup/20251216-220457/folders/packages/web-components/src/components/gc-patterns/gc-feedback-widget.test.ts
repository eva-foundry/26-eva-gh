import { expect as chaiExpect } from 'chai';
import { fixture, html } from '@open-wc/testing';
import { GCFeedbackWidget } from './gc-feedback-widget.js';

import './gc-feedback-widget.js';

describe('gc-feedback-widget', () => {
  it('should render feedback question', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    const question = el.shadowRoot!.querySelector('.feedback-question');
    chaiExpect(question?.textContent).to.include('Did you find what you were looking for?');
  });

  it('should display Yes and No buttons', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    const buttons = el.shadowRoot!.querySelectorAll('.feedback-buttons .btn');
    chaiExpect(buttons.length).to.equal(2);
    chaiExpect(buttons[0].textContent?.trim()).to.equal('Yes');
    chaiExpect(buttons[1].textContent?.trim()).to.equal('No');
  });

  it('should show follow-up form when Yes is clicked', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    const yesBtn = el.shadowRoot!.querySelectorAll('.btn')[0] as HTMLButtonElement;
    yesBtn.click();
    await el.updateComplete;

    const followUp = el.shadowRoot!.querySelector('.follow-up');
    chaiExpect(followUp).to.exist;
  });

  it('should show follow-up form when No is clicked', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    const noBtn = el.shadowRoot!.querySelectorAll('.btn')[1] as HTMLButtonElement;
    noBtn.click();
    await el.updateComplete;

    const followUp = el.shadowRoot!.querySelector('.follow-up');
    chaiExpect(followUp).to.exist;
  });

  it('should highlight selected button', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    const yesBtn = el.shadowRoot!.querySelectorAll('.btn')[0] as HTMLButtonElement;
    yesBtn.click();
    await el.updateComplete;

    chaiExpect(yesBtn.classList.contains('selected')).to.be.true;
  });

  it('should set aria-pressed on selected button', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    const yesBtn = el.shadowRoot!.querySelectorAll('.btn')[0] as HTMLButtonElement;
    yesBtn.click();
    await el.updateComplete;

    chaiExpect(yesBtn.getAttribute('aria-pressed')).to.equal('true');
  });

  it('should display textarea for comments', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    const yesBtn = el.shadowRoot!.querySelectorAll('.btn')[0] as HTMLButtonElement;
    yesBtn.click();
    await el.updateComplete;

    const textarea = el.shadowRoot!.querySelector('.feedback-textarea');
    chaiExpect(textarea).to.exist;
  });

  it('should display submit button after selection', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    const yesBtn = el.shadowRoot!.querySelectorAll('.btn')[0] as HTMLButtonElement;
    yesBtn.click();
    await el.updateComplete;

    const submitBtn = el.shadowRoot!.querySelector('.submit-btn');
    chaiExpect(submitBtn).to.exist;
  });

  it('should show different follow-up for No', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    const noBtn = el.shadowRoot!.querySelectorAll('.btn')[1] as HTMLButtonElement;
    noBtn.click();
    await el.updateComplete;

    const label = el.shadowRoot!.querySelector('.follow-up-label');
    chaiExpect(label?.textContent).to.include('What was wrong?');
  });

  it('should show privacy notice by default', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    const yesBtn = el.shadowRoot!.querySelectorAll('.btn')[0] as HTMLButtonElement;
    yesBtn.click();
    await el.updateComplete;

    const privacyNotice = el.shadowRoot!.querySelector('.privacy-notice');
    chaiExpect(privacyNotice).to.exist;
  });

  it('should hide privacy notice when disabled', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget .showPrivacyNotice="${false}"></gc-feedback-widget>
    `);
    const yesBtn = el.shadowRoot!.querySelectorAll('.btn')[0] as HTMLButtonElement;
    yesBtn.click();
    await el.updateComplete;

    const privacyNotice = el.shadowRoot!.querySelector('.privacy-notice');
    chaiExpect(privacyNotice).to.not.exist;
  });

  it('should emit feedback-submit event', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    
    let eventFired = false;
    let eventDetail: unknown;

    el.addEventListener('gc-feedback-submit', ((e: CustomEvent) => {
      eventFired = true;
      eventDetail = e.detail;
    }) as EventListener);

    const yesBtn = el.shadowRoot!.querySelectorAll('.btn')[0] as HTMLButtonElement;
    yesBtn.click();
    await el.updateComplete;

    await el.submitFeedback();
    await el.updateComplete;

    chaiExpect(eventFired).to.be.true;
    chaiExpect(eventDetail).to.have.property('helpful');
  });

  it('should show thank you message after submission', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    const yesBtn = el.shadowRoot!.querySelectorAll('.btn')[0] as HTMLButtonElement;
    yesBtn.click();
    await el.updateComplete;

    await el.submitFeedback();
    await el.updateComplete;

    const thankYou = el.shadowRoot!.querySelector('.thank-you-message');
    chaiExpect(thankYou).to.exist;
  });

  it('should hide form after submission', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    const yesBtn = el.shadowRoot!.querySelectorAll('.btn')[0] as HTMLButtonElement;
    yesBtn.click();
    await el.updateComplete;

    await el.submitFeedback();
    await el.updateComplete;

    const buttons = el.shadowRoot!.querySelector('.feedback-buttons');
    chaiExpect(buttons).to.not.exist;
  });

  it('should reset widget', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    const yesBtn = el.shadowRoot!.querySelectorAll('.btn')[0] as HTMLButtonElement;
    yesBtn.click();
    await el.updateComplete;

    await el.submitFeedback();
    await el.updateComplete;

    el.reset();
    await el.updateComplete;

    const question = el.shadowRoot!.querySelector('.feedback-question');
    chaiExpect(question).to.exist;
  });

  it('should have role alert on thank you message', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    const yesBtn = el.shadowRoot!.querySelectorAll('.btn')[0] as HTMLButtonElement;
    yesBtn.click();
    await el.updateComplete;

    await el.submitFeedback();
    await el.updateComplete;

    const thankYou = el.shadowRoot!.querySelector('.thank-you-message');
    chaiExpect(thankYou?.getAttribute('role')).to.equal('alert');
  });

  it('should have aria-live region', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    const liveRegion = el.shadowRoot!.querySelector('[role="status"]');
    chaiExpect(liveRegion).to.exist;
    chaiExpect(liveRegion?.getAttribute('aria-live')).to.equal('polite');
  });

  it('should support French Canadian locale', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget locale="fr-CA"></gc-feedback-widget>
    `);
    const question = el.shadowRoot!.querySelector('.feedback-question');
    chaiExpect(question?.textContent).to.include('Avez-vous trouvé ce que vous cherchiez?');
  });

  it('should be accessible', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    
    // Provide content for accessibility testing by clicking button to show form
    const yesBtn = el.shadowRoot!.querySelectorAll('.btn')[0] as HTMLButtonElement;
    yesBtn.click();
    await el.updateComplete;
    
    await chaiExpect(el).to.be.accessible();
  });

  it('should be accessible with follow-up visible', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    const yesBtn = el.shadowRoot!.querySelectorAll('.btn')[0] as HTMLButtonElement;
    yesBtn.click();
    await el.updateComplete;

    await chaiExpect(el).to.be.accessible();
  });

  it('should be accessible after submission', async () => {
    const el = await fixture<GCFeedbackWidget>(html`
      <gc-feedback-widget></gc-feedback-widget>
    `);
    const yesBtn = el.shadowRoot!.querySelectorAll('.btn')[0] as HTMLButtonElement;
    yesBtn.click();
    await el.updateComplete;

    await el.submitFeedback();
    await el.updateComplete;

    await chaiExpect(el).to.be.accessible();
  });
});
