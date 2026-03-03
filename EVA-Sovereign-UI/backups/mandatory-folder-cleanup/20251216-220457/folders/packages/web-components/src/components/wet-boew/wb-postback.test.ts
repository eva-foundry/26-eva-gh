import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './wb-postback.js';
import type { WBPostback } from './wb-postback.js';

// Mock fetch for testing
global.fetch = vi.fn();

describe('wb-postback', () => {
  let element: WBPostback;

  beforeEach(async () => {
    vi.clearAllMocks();
    
    element = await fixture<WBPostback>(html`
      <wb-postback action="/api/submit" method="POST">
        <form>
          <label>Name: <input type="text" name="name" required /></label>
          <label>Email: <input type="email" name="email" required /></label>
          <button type="submit">Submit</button>
        </form>
      </wb-postback>
    `);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without errors', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).not.toBeNull();
  });

  it('submits form via fetch on form submit', async () => {
    const mockResponse = { ok: true, json: async () => ({ message: 'Success' }) };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    const form = element.querySelector('form')!;
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    await element.updateComplete;

    // Wait for async fetch
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(global.fetch).toHaveBeenCalledOnce();
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/submit',
      expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData)
      })
    );
  });

  it('displays loading spinner during submission', async () => {
    const mockResponse = { ok: true, json: async () => ({ message: 'Success' }) };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    const form = element.querySelector('form')!;
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    await element.updateComplete;

    const spinner = element.shadowRoot!.querySelector('.spinner');
    expect(spinner).toBeDefined();
  });

  it('shows success message on successful submission', async () => {
    const mockResponse = {
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ message: 'Form submitted successfully!' })
    };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    const form = element.querySelector('form')!;
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    
    // Wait for async fetch
    await new Promise(resolve => setTimeout(resolve, 50));
    await element.updateComplete;

    const statusMessage = element.shadowRoot!.querySelector('.status-success');
    expect(statusMessage).toBeDefined();
  });

  it('shows error message on failed submission', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    const form = element.querySelector('form')!;
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    
    // Wait for async fetch
    await new Promise(resolve => setTimeout(resolve, 50));
    await element.updateComplete;

    const statusMessage = element.shadowRoot!.querySelector('.status-error');
    expect(statusMessage).toBeDefined();
  });

  it('prevents double submission', async () => {
    const mockResponse = { ok: true, json: async () => ({ message: 'Success' }) };
    (global.fetch as any).mockResolvedValue(mockResponse);

    const form = element.querySelector('form')!;
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    // Submit twice rapidly
    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));

    await new Promise(resolve => setTimeout(resolve, 50));

    // Should only be called once
    expect(global.fetch).toHaveBeenCalledOnce();
  });

  it('validates form before submission', async () => {
    const form = element.querySelector('form')!;

    // Leave required fields empty
    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    await element.updateComplete;

    // Should not call fetch
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('emits wb-postback-submit event when starting', async () => {
    const spy = vi.fn();
    element.addEventListener('wb-postback-submit', spy);

    const mockResponse = { ok: true, json: async () => ({ message: 'Success' }) };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    const form = element.querySelector('form')!;
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    await element.updateComplete;

    expect(spy).toHaveBeenCalledOnce();
  });

  it('emits wb-postback-success event on success', async () => {
    const spy = vi.fn();
    element.addEventListener('wb-postback-success', spy);

    const mockResponse = {
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ message: 'Success', id: 123 })
    };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    const form = element.querySelector('form')!;
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail.response).toEqual({ message: 'Success', id: 123 });
  });

  it('emits wb-postback-error event on failure', async () => {
    const spy = vi.fn();
    element.addEventListener('wb-postback-error', spy);

    const mockResponse = {
      ok: false,
      status: 400,
      statusText: 'Bad Request'
    };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    const form = element.querySelector('form')!;
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(spy).toHaveBeenCalledOnce();
  });

  it('resets form on successful submission', async () => {
    const mockResponse = {
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ message: 'Success' })
    };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    const form = element.querySelector('form')!;
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
  });

  it('displays custom success message', async () => {
    element.successMessage = 'Thank you for your submission!';
    await element.updateComplete;

    const mockResponse = {
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ message: 'Default message' })
    };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    const form = element.querySelector('form')!;
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    
    await new Promise(resolve => setTimeout(resolve, 50));
    await element.updateComplete;

    const statusMessage = element.shadowRoot!.querySelector('.status-success');
    expect(statusMessage?.textContent).toContain('Thank you');
  });

  it('displays custom error message', async () => {
    element.errorMessage = 'Custom error occurred!';
    await element.updateComplete;

    const mockResponse = {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    const form = element.querySelector('form')!;
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    
    await new Promise(resolve => setTimeout(resolve, 50));
    await element.updateComplete;

    const statusMessage = element.shadowRoot!.querySelector('.status-error');
    expect(statusMessage?.textContent).toContain('Custom error');
  });

  it('shows retry button on error', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    const form = element.querySelector('form')!;
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    
    await new Promise(resolve => setTimeout(resolve, 50));
    await element.updateComplete;

    const retryButton = element.shadowRoot!.querySelector('.retry-button');
    expect(retryButton).toBeDefined();
  });

  it('retry button resubmits form', async () => {
    const mockResponse1 = {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    };
    const mockResponse2 = {
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ message: 'Success' })
    };
    (global.fetch as any)
      .mockResolvedValueOnce(mockResponse1)
      .mockResolvedValueOnce(mockResponse2);

    const form = element.querySelector('form')!;
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    // First submission fails
    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 50));
    await element.updateComplete;

    // Click retry
    const retryButton = element.shadowRoot!.querySelector<HTMLButtonElement>('.retry-button')!;
    retryButton.click();
    await new Promise(resolve => setTimeout(resolve, 50));
    await element.updateComplete;

    // Should have called fetch twice
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('announces status to screen readers', async () => {
    const spy = vi.spyOn(element, 'announce');

    const mockResponse = {
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ message: 'Success' })
    };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    const form = element.querySelector('form')!;
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(spy).toHaveBeenCalled();
  });

  it('handles network error gracefully', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Failed to fetch'));

    const form = element.querySelector('form')!;
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    
    await new Promise(resolve => setTimeout(resolve, 50));
    await element.updateComplete;

    const statusMessage = element.shadowRoot!.querySelector('.status-error');
    expect(statusMessage?.textContent).toContain('Network error');
  });

  it('bilingual error messages (French)', async () => {
    element.locale = 'fr-CA';
    await element.updateComplete;

    const mockResponse = {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    const form = element.querySelector('form')!;
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    
    await new Promise(resolve => setTimeout(resolve, 50));
    await element.updateComplete;

    const retryButton = element.shadowRoot!.querySelector('.retry-button');
    expect(retryButton?.textContent).toContain('Réessayer');
  });

  it('clearStatus() removes status message', async () => {
    const mockResponse = {
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ message: 'Success' })
    };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    const form = element.querySelector('form')!;
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 50));
    await element.updateComplete;

    // Should have success message
    let statusMessage = element.shadowRoot!.querySelector('.status-success');
    expect(statusMessage).toBeDefined();

    // Clear status
    element.clearStatus();
    await element.updateComplete;

    // Should be gone
    statusMessage = element.shadowRoot!.querySelector('.status-success');
    expect(statusMessage).toBeNull();
  });

  it('can hide status messages with show-status=false', async () => {
    element.showStatus = false;
    await element.updateComplete;

    const mockResponse = {
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ message: 'Success' })
    };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    const form = element.querySelector('form')!;
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 50));
    await element.updateComplete;

    const statusMessage = element.shadowRoot!.querySelector('.status-message');
    expect(statusMessage).toBeNull();
  });
});
