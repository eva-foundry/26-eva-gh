import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html, expect as chaiExpect } from '@open-wc/testing';
import type { GCContextualAlerts } from './gc-contextual-alerts';
import './gc-contextual-alerts';

describe('gc-contextual-alerts', () => {
  let element: GCContextualAlerts;

  beforeEach(async () => {
    element = await fixture(html`<gc-contextual-alerts></gc-contextual-alerts>`);
  });

  it('renders with default properties', async () => {
    expect(element).toBeDefined();
    
    // Provide content for accessibility testing
    element.message = 'Test alert message';
    await element.updateComplete;
    
    chaiExpect(element).to.be.accessible();
  });

  it('renders info variant by default', async () => {
    const alert = element.shadowRoot!.querySelector('.alert');
    expect(alert?.classList.contains('info')).toBe(true);
  });

  it('renders error variant', async () => {
    element.variant = 'error';
    await element.updateComplete;
    const alert = element.shadowRoot!.querySelector('.alert');
    expect(alert?.classList.contains('error')).toBe(true);
  });

  it('renders warning variant', async () => {
    element.variant = 'warning';
    await element.updateComplete;
    const alert = element.shadowRoot!.querySelector('.alert');
    expect(alert?.classList.contains('warning')).toBe(true);
  });

  it('renders success variant', async () => {
    element.variant = 'success';
    await element.updateComplete;
    const alert = element.shadowRoot!.querySelector('.alert');
    expect(alert?.classList.contains('success')).toBe(true);
  });

  it('renders custom heading', async () => {
    element.heading = 'Custom Heading';
    await element.updateComplete;
    const heading = element.shadowRoot!.querySelector('.heading');
    expect(heading?.textContent).toBe('Custom Heading');
  });

  it('renders message', async () => {
    element.message = 'Test message';
    await element.updateComplete;
    const message = element.shadowRoot!.querySelector('.message');
    expect(message?.textContent).toBe('Test message');
  });

  it('renders slotted content', async () => {
    element = await fixture(html`
      <gc-contextual-alerts><p>Custom content</p></gc-contextual-alerts>
    `);
    const slot = element.shadowRoot!.querySelector('slot');
    expect(slot).toBeDefined();
  });

  it('renders close button when dismissible', async () => {
    element.dismissible = true;
    await element.updateComplete;
    const closeBtn = element.shadowRoot!.querySelector('.close-button');
    expect(closeBtn).toBeDefined();
  });

  it('does not render close button when not dismissible', async () => {
    element.dismissible = false;
    await element.updateComplete;
    const closeBtn = element.shadowRoot!.querySelector('.close-button');
    expect(closeBtn).toBeNull();
  });

  it('emits event on close', async () => {
    const eventSpy = vi.fn();
    element.addEventListener('gc-contextual-alert-close', eventSpy);
    element.message = 'Test';
    await element.updateComplete;

    const closeBtn = element.shadowRoot!.querySelector('.close-button') as HTMLButtonElement;
    closeBtn.click();

    await new Promise(resolve => setTimeout(resolve, 350));
    expect(eventSpy).toHaveBeenCalled();
  });

  it('hides alert on close', async () => {
    element.message = 'Test';
    await element.updateComplete;

    const closeBtn = element.shadowRoot!.querySelector('.close-button') as HTMLButtonElement;
    closeBtn.click();

    await new Promise(resolve => setTimeout(resolve, 350));
    expect(element.visible).toBe(false);
  });

  it('uses alert role for errors', async () => {
    element.variant = 'error';
    await element.updateComplete;
    const alert = element.shadowRoot!.querySelector('.alert');
    expect(alert?.getAttribute('role')).toBe('alert');
  });

  it('uses status role for non-errors', async () => {
    element.variant = 'info';
    await element.updateComplete;
    const alert = element.shadowRoot!.querySelector('.alert');
    expect(alert?.getAttribute('role')).toBe('status');
  });

  it('uses assertive aria-live for errors', async () => {
    element.variant = 'error';
    await element.updateComplete;
    const alert = element.shadowRoot!.querySelector('.alert');
    expect(alert?.getAttribute('aria-live')).toBe('assertive');
  });

  it('uses polite aria-live for non-errors', async () => {
    element.variant = 'info';
    await element.updateComplete;
    const alert = element.shadowRoot!.querySelector('.alert');
    expect(alert?.getAttribute('aria-live')).toBe('polite');
  });

  it('shows alert with show()', async () => {
    element.visible = false;
    element.show();
    await element.updateComplete;
    expect(element.visible).toBe(true);
  });

  it('hides alert with hide()', async () => {
    element.visible = true;
    element.hide();
    await element.updateComplete;
    expect(element.visible).toBe(false);
  });

  it('displays error icon', async () => {
    element.variant = 'error';
    await element.updateComplete;
    const icon = element.shadowRoot!.querySelector('.icon');
    expect(icon?.textContent).toBe('✖');
  });

  it('displays warning icon', async () => {
    element.variant = 'warning';
    await element.updateComplete;
    const icon = element.shadowRoot!.querySelector('.icon');
    expect(icon?.textContent).toBe('⚠');
  });

  it('displays info icon', async () => {
    element.variant = 'info';
    await element.updateComplete;
    const icon = element.shadowRoot!.querySelector('.icon');
    expect(icon?.textContent).toBe('ℹ');
  });

  it('displays success icon', async () => {
    element.variant = 'success';
    await element.updateComplete;
    const icon = element.shadowRoot!.querySelector('.icon');
    expect(icon?.textContent).toBe('✓');
  });

  it('hides icon from screen readers', async () => {
    const icon = element.shadowRoot!.querySelector('.icon');
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });

  it('passes accessibility audit', async () => {
    element.message = 'Test message';
    await element.updateComplete;
    await chaiExpect(element).to.be.accessible();
  });
});
