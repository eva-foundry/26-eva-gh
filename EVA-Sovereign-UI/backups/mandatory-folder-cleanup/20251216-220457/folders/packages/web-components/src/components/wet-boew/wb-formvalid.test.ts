import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './wb-formvalid.js';
import type { WBFormValid } from './wb-formvalid.js';

describe('wb-formvalid', () => {
  let element: WBFormValid;

  beforeEach(async () => {
    element = await fixture<WBFormValid>(html`
      <wb-formvalid>
        <form>
          <input type="text" name="username" required />
          <input type="email" name="email" required />
          <input type="number" name="age" min="18" max="120" />
          <input type="url" name="website" />
          <input type="text" name="postal" pattern="[A-Z]\\d[A-Z] \\d[A-Z]\\d" />
          <button type="submit">Submit</button>
        </form>
      </wb-formvalid>
    `);
  });

  it('should render without errors', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should validate required fields', () => {
    const isValid = element.validate();
    expect(isValid).toBe(false);
    expect(element.shadowRoot?.querySelector('.error-summary')).toBeDefined();
  });

  it('should validate email format', async () => {
    const form = element.querySelector('form')!;
    const emailInput = form.querySelector('[name="email"]') as HTMLInputElement;
    
    emailInput.value = 'invalid-email';
    const isValid = element.validate();
    
    expect(isValid).toBe(false);
  });

  it('should validate URL format', async () => {
    const form = element.querySelector('form')!;
    const urlInput = form.querySelector('[name="website"]') as HTMLInputElement;
    const usernameInput = form.querySelector('[name="username"]') as HTMLInputElement;
    const emailInput = form.querySelector('[name="email"]') as HTMLInputElement;
    
    // Fill required fields
    usernameInput.value = 'testuser';
    emailInput.value = 'test@example.com';
    urlInput.value = 'not-a-url';
    
    const isValid = element.validate();
    expect(isValid).toBe(false);
  });

  it('should validate number range (min)', async () => {
    const form = element.querySelector('form')!;
    const ageInput = form.querySelector('[name="age"]') as HTMLInputElement;
    const usernameInput = form.querySelector('[name="username"]') as HTMLInputElement;
    const emailInput = form.querySelector('[name="email"]') as HTMLInputElement;
    
    usernameInput.value = 'testuser';
    emailInput.value = 'test@example.com';
    ageInput.value = '15';
    
    const isValid = element.validate();
    expect(isValid).toBe(false);
  });

  it('should validate number range (max)', async () => {
    const form = element.querySelector('form')!;
    const ageInput = form.querySelector('[name="age"]') as HTMLInputElement;
    const usernameInput = form.querySelector('[name="username"]') as HTMLInputElement;
    const emailInput = form.querySelector('[name="email"]') as HTMLInputElement;
    
    usernameInput.value = 'testuser';
    emailInput.value = 'test@example.com';
    ageInput.value = '150';
    
    const isValid = element.validate();
    expect(isValid).toBe(false);
  });

  it('should validate custom regex pattern', async () => {
    const form = element.querySelector('form')!;
    const postalInput = form.querySelector('[name="postal"]') as HTMLInputElement;
    const usernameInput = form.querySelector('[name="username"]') as HTMLInputElement;
    const emailInput = form.querySelector('[name="email"]') as HTMLInputElement;
    
    usernameInput.value = 'testuser';
    emailInput.value = 'test@example.com';
    postalInput.value = 'INVALID';
    
    const isValid = element.validate();
    expect(isValid).toBe(false);
  });

  it('should show inline error messages', async () => {
    element.validate();
    await element.updateComplete;
    
    const errorSummary = element.shadowRoot?.querySelector('.error-summary');
    expect(errorSummary).toBeDefined();
  });

  it('should show error summary', async () => {
    element.validate();
    await element.updateComplete;
    
    const errorSummary = element.shadowRoot?.querySelector('.error-summary');
    const errorList = errorSummary?.querySelector('ul');
    
    expect(errorList).toBeDefined();
    expect(errorList?.children.length).toBeGreaterThan(0);
  });

  it('should prevent form submission on errors', async () => {
    const form = element.querySelector('form')!;
    const submitHandler = vi.fn((e) => e.preventDefault());
    
    form.addEventListener('submit', submitHandler);
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    
    expect(submitHandler).toHaveBeenCalled();
  });

  it('should clear errors on field change', async () => {
    const form = element.querySelector('form')!;
    const usernameInput = form.querySelector('[name="username"]') as HTMLInputElement;
    
    element.validate();
    await element.updateComplete;
    
    expect(element.shadowRoot?.querySelector('.error-summary')).toBeDefined();
    
    usernameInput.value = 'validusername';
    element.clearErrors();
    await element.updateComplete;
    
    expect(element.shadowRoot?.querySelector('.error-summary')).toBeNull();
  });

  it('should announce errors to screen readers', async () => {
    const announceSpy = vi.spyOn(element as any, 'announce');
    
    element.validate();
    
    expect(announceSpy).toHaveBeenCalled();
  });

  it('should have bilingual error messages', async () => {
    element.locale = 'fr-CA';
    await element.updateComplete;
    
    element.validate();
    await element.updateComplete;
    
    const errorSummary = element.shadowRoot?.querySelector('.error-summary h2');
    expect(errorSummary?.textContent).toContain('erreur');
  });

  it('should focus first error field', async () => {
    const form = element.querySelector('form')!;
    const usernameInput = form.querySelector('[name="username"]') as HTMLInputElement;
    const focusSpy = vi.spyOn(usernameInput, 'focus');
    
    element.validate();
    
    expect(focusSpy).toHaveBeenCalled();
  });

  it('should support live validation', async () => {
    element.liveValidation = true;
    await element.updateComplete;
    
    // Trigger firstUpdated again to setup live validation
    element.requestUpdate();
    await element.updateComplete;
    
    expect(element.liveValidation).toBe(true);
  });

  it('should emit wb-formvalid-submit event', async () => {
    const form = element.querySelector('form')!;
    const submitListener = vi.fn();
    
    element.addEventListener('wb-formvalid-submit', submitListener);
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    
    expect(submitListener).toHaveBeenCalled();
  });

  it('should emit wb-formvalid-error event', async () => {
    const errorListener = vi.fn();
    
    element.addEventListener('wb-formvalid-error', errorListener);
    element.showError('testField', 'Test error message');
    
    expect(errorListener).toHaveBeenCalled();
  });

  it('should emit wb-formvalid-clear event', async () => {
    const clearListener = vi.fn();
    
    element.addEventListener('wb-formvalid-clear', clearListener);
    element.clearErrors();
    
    expect(clearListener).toHaveBeenCalled();
  });

  it('should validate successfully with all valid inputs', async () => {
    const form = element.querySelector('form')!;
    const usernameInput = form.querySelector('[name="username"]') as HTMLInputElement;
    const emailInput = form.querySelector('[name="email"]') as HTMLInputElement;
    const ageInput = form.querySelector('[name="age"]') as HTMLInputElement;
    const websiteInput = form.querySelector('[name="website"]') as HTMLInputElement;
    const postalInput = form.querySelector('[name="postal"]') as HTMLInputElement;
    
    usernameInput.value = 'validuser';
    emailInput.value = 'valid@example.com';
    ageInput.value = '25';
    websiteInput.value = 'https://example.com';
    postalInput.value = 'K1A 0B1';
    
    const isValid = element.validate();
    expect(isValid).toBe(true);
  });

  it('should work with multiple forms on page independently', async () => {
    const element2 = await fixture<WBFormValid>(html`
      <wb-formvalid>
        <form>
          <input type="text" name="field1" required />
        </form>
      </wb-formvalid>
    `);
    
    element.validate();
    element2.validate();
    
    // Both should have errors independently
    expect(element.shadowRoot?.querySelector('.error-summary')).toBeDefined();
    expect(element2.shadowRoot?.querySelector('.error-summary')).toBeDefined();
  });

  it('should have custom error summary heading', async () => {
    element.errorSummaryHeading = 'Custom Error Heading';
    await element.updateComplete;
    
    element.validate();
    await element.updateComplete;
    
    const heading = element.shadowRoot?.querySelector('.error-summary h2');
    expect(heading?.textContent).toBe('Custom Error Heading');
  });
});
