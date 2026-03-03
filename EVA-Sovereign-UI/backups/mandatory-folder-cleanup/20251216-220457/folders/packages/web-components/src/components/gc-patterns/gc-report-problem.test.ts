import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { GCReportProblem } from './gc-report-problem';
import '../../../test/setup';

describe('gc-report-problem', () => {
  let element: GCReportProblem;

  beforeEach(async () => {
    element = await fixture<GCReportProblem>(html`
      <gc-report-problem></gc-report-problem>
    `);
  });

  it('should render report container', () => {
    const container = element.shadowRoot!.querySelector('.report-container');
    expect(container).toBeTruthy();
  });

  it('should display heading', () => {
    const heading = element.shadowRoot!.querySelector('.report-heading');
    expect(heading).toBeTruthy();
    expect(heading!.textContent).toContain('Report a problem');
  });

  it('should display description', () => {
    const description = element.shadowRoot!.querySelector('.report-description');
    expect(description).toBeTruthy();
  });

  it('should render default categories', () => {
    const radioOptions = element.shadowRoot!.querySelectorAll('.radio-option');
    expect(radioOptions.length).toBe(6); // 6 default categories
  });

  it('should render custom categories when provided', async () => {
    element.categories = [
      { id: 'custom1', label: 'Custom Issue 1' },
      { id: 'custom2', label: 'Custom Issue 2' }
    ];
    await element.updateComplete;

    const radioOptions = element.shadowRoot!.querySelectorAll('.radio-option');
    expect(radioOptions.length).toBe(2);
  });

  it('should have textarea for description', () => {
    const textarea = element.shadowRoot!.querySelector('.textarea');
    expect(textarea).toBeTruthy();
  });

  it('should show privacy notice by default', () => {
    const privacyNotice = element.shadowRoot!.querySelector('.privacy-notice');
    expect(privacyNotice).toBeTruthy();
  });

  it('should hide privacy notice when showPrivacyNotice is false', async () => {
    element.showPrivacyNotice = false;
    await element.updateComplete;

    const privacyNotice = element.shadowRoot!.querySelector('.privacy-notice');
    expect(privacyNotice).toBeFalsy();
  });

  it('should have submit and cancel buttons', () => {
    const submitButton = element.shadowRoot!.querySelector('.submit-button');
    const cancelButton = element.shadowRoot!.querySelector('.cancel-button');
    
    expect(submitButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
  });

  it('should disable submit button when form invalid', () => {
    const submitButton = element.shadowRoot!.querySelector('.submit-button') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  it('should enable submit button when form valid', async () => {
    element['selectedCategory'] = 'incorrect';
    element['description'] = 'Test problem description';
    await element.updateComplete;

    const submitButton = element.shadowRoot!.querySelector('.submit-button') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  it('should update selected category on radio change', async () => {
    const radio = element.shadowRoot!.querySelector('input[type="radio"]') as HTMLInputElement;
    radio.click();
    await element.updateComplete;

    expect(element['selectedCategory']).toBeTruthy();
  });

  it('should update description on textarea input', async () => {
    const textarea = element.shadowRoot!.querySelector('.textarea') as HTMLTextAreaElement;
    textarea.value = 'Test description';
    textarea.dispatchEvent(new Event('input'));
    await element.updateComplete;

    expect(element['description']).toBe('Test description');
  });

  it('should emit gc-problem-submit event on form submit', async () => {
    element['selectedCategory'] = 'incorrect';
    element['description'] = 'Test problem';
    await element.updateComplete;

    let eventFired = false;
    element.addEventListener('gc-problem-submit', () => {
      eventFired = true;
    });

    const form = element.shadowRoot!.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await element.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('should show success message after submission', async () => {
    element['selectedCategory'] = 'incorrect';
    element['description'] = 'Test problem';
    await element.updateComplete;

    const form = element.shadowRoot!.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await element.updateComplete;

    const successMessage = element.shadowRoot!.querySelector('.success-message');
    expect(successMessage).toBeTruthy();
  });

  it('should emit gc-problem-cancel event on cancel', async () => {
    let eventFired = false;
    element.addEventListener('gc-problem-cancel', () => {
      eventFired = true;
    });

    const cancelButton = element.shadowRoot!.querySelector('.cancel-button') as HTMLButtonElement;
    cancelButton.click();
    await element.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('should clear form on cancel', async () => {
    element['selectedCategory'] = 'incorrect';
    element['description'] = 'Test';
    await element.updateComplete;

    const cancelButton = element.shadowRoot!.querySelector('.cancel-button') as HTMLButtonElement;
    cancelButton.click();
    await element.updateComplete;

    expect(element['selectedCategory']).toBe('');
    expect(element['description']).toBe('');
  });

  it('should have reset method', () => {
    expect(typeof element.reset).toBe('function');
  });

  it('should reset form state when reset() called', () => {
    element['selectedCategory'] = 'incorrect';
    element['description'] = 'Test';
    element['submitted'] = true;

    element.reset();

    expect(element['selectedCategory']).toBe('');
    expect(element['description']).toBe('');
    expect(element['submitted']).toBe(false);
  });

  it('should include page URL in submission data', async () => {
    element.pageUrl = 'https://example.com/page';
    element['selectedCategory'] = 'incorrect';
    element['description'] = 'Test';
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-problem-submit', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    const form = element.shadowRoot!.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await element.updateComplete;

    expect(eventDetail).toBeTruthy();
    expect((eventDetail as { pageUrl: string }).pageUrl).toBe('https://example.com/page');
  });

  it('should use current URL if pageUrl not provided', async () => {
    element['selectedCategory'] = 'incorrect';
    element['description'] = 'Test';
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-problem-submit', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    const form = element.shadowRoot!.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await element.updateComplete;

    expect((eventDetail as { pageUrl: string }).pageUrl).toBeTruthy();
  });

  it('should submit to API endpoint when provided', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true })
    });
    global.fetch = fetchMock;

    element.apiEndpoint = 'https://api.example.com/report';
    element['selectedCategory'] = 'incorrect';
    element['description'] = 'Test';
    await element.updateComplete;

    const form = element.shadowRoot!.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await element.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(fetchMock).toHaveBeenCalled();
  });

  it('should show error message on submission failure', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('Network error'));
    global.fetch = fetchMock;

    element.apiEndpoint = 'https://api.example.com/report';
    element['selectedCategory'] = 'incorrect';
    element['description'] = 'Test';
    await element.updateComplete;

    const form = element.shadowRoot!.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await element.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(element['errorMessage']).toBeTruthy();
  });

  it('should emit gc-problem-error event on failure', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('Network error'));
    global.fetch = fetchMock;

    element.apiEndpoint = 'https://api.example.com/report';
    element['selectedCategory'] = 'incorrect';
    element['description'] = 'Test';
    await element.updateComplete;

    let eventFired = false;
    element.addEventListener('gc-problem-error', () => {
      eventFired = true;
    });

    const form = element.shadowRoot!.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await element.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(eventFired).toBe(true);
  });

  it('should have proper ARIA attributes', () => {
    const radioGroup = element.shadowRoot!.querySelector('.radio-group');
    expect(radioGroup!.getAttribute('role')).toBe('radiogroup');
    expect(radioGroup!.getAttribute('aria-required')).toBe('true');
  });

  it('should mark required fields', () => {
    const requiredMarkers = element.shadowRoot!.querySelectorAll('.required');
    expect(requiredMarkers.length).toBeGreaterThan(0);
  });

  it('should support French Canadian locale', async () => {
    element.locale = 'fr-CA';
    await element.updateComplete;

    const heading = element.shadowRoot!.querySelector('.report-heading');
    expect(heading!.textContent).toContain('Signaler');
  });

  it('should prevent submission with empty description', () => {
    element['selectedCategory'] = 'incorrect';
    element['description'] = '';

    expect(element['isFormValid']()).toBe(false);
  });

  it('should prevent submission with no category', () => {
    element['selectedCategory'] = '';
    element['description'] = 'Test';

    expect(element['isFormValid']()).toBe(false);
  });

  it('should allow submission with valid data', () => {
    element['selectedCategory'] = 'incorrect';
    element['description'] = 'Test';

    expect(element['isFormValid']()).toBe(true);
  });

  it('should disable buttons during submission', async () => {
    element['submitting'] = true;
    await element.updateComplete;

    const submitButton = element.shadowRoot!.querySelector('.submit-button') as HTMLButtonElement;
    const cancelButton = element.shadowRoot!.querySelector('.cancel-button') as HTMLButtonElement;

    expect(submitButton.disabled).toBe(true);
    expect(cancelButton.disabled).toBe(true);
  });

  it('should have responsive button layout', () => {
    const buttonGroup = element.shadowRoot!.querySelector('.button-group') as HTMLElement;
    const styles = window.getComputedStyle(buttonGroup);
    expect(styles.display).toBe('flex');
  });

  it('should include timestamp in submission', async () => {
    element['selectedCategory'] = 'incorrect';
    element['description'] = 'Test';
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-problem-submit', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    const form = element.shadowRoot!.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await element.updateComplete;

    expect((eventDetail as { timestamp: string }).timestamp).toBeTruthy();
  });

  it('should include user agent in submission', async () => {
    element['selectedCategory'] = 'incorrect';
    element['description'] = 'Test';
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-problem-submit', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    const form = element.shadowRoot!.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await element.updateComplete;

    expect((eventDetail as { userAgent: string }).userAgent).toBeTruthy();
  });
});
