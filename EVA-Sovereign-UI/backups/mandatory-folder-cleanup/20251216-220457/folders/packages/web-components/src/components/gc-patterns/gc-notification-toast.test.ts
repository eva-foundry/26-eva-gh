import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-notification-toast';
import type { GCNotificationToast } from './gc-notification-toast';

describe('gc-notification-toast', () => {
  let element: GCNotificationToast;

  beforeEach(async () => {
    element = await fixture(html`<gc-notification-toast></gc-notification-toast>`);
  });

  it('renders nothing when no notifications', () => {
    const container = element.shadowRoot?.querySelector('.toast-container');
    expect(container).to.not.exist;
  });

  it('shows notification when show() is called', async () => {
    element.show('Test notification', 'info');
    await element.updateComplete;

    const toast = element.shadowRoot?.querySelector('.toast');
    expect(toast).to.exist;
  });

  it('displays notification message', async () => {
    element.show('Important message', 'info');
    await element.updateComplete;

    const content = element.shadowRoot?.querySelector('.toast-content');
    expect(content?.textContent?.trim()).to.equal('Important message');
  });

  it('applies correct variant class', async () => {
    element.show('Success!', 'success');
    await element.updateComplete;

    const toast = element.shadowRoot?.querySelector('.toast');
    expect(toast?.classList.contains('success')).to.be.true;
  });

  it('returns unique ID when showing notification', () => {
    const id1 = element.show('Message 1', 'info');
    const id2 = element.show('Message 2', 'info');

    expect(id1).to.be.a('string');
    expect(id2).to.be.a('string');
    expect(id1).to.not.equal(id2);
  });

  it('shows multiple notifications', async () => {
    element.show('First notification', 'info');
    element.show('Second notification', 'success');
    await element.updateComplete;

    const toasts = element.shadowRoot?.querySelectorAll('.toast');
    expect(toasts?.length).to.equal(2);
  });

  it('shows close button by default', async () => {
    element.show('Test', 'info');
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.toast-close');
    expect(closeButton).to.exist;
  });

  it('hides close button when dismissible is false', async () => {
    element.show('Test', 'info', { dismissible: false });
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.toast-close');
    expect(closeButton).to.not.exist;
  });

  it('dismisses notification when close button clicked', async () => {
    element.show('Test', 'info');
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.toast-close') as HTMLElement;
    closeButton?.click();

    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 350));

    const toast = element.shadowRoot?.querySelector('.toast');
    expect(toast).to.not.exist;
  });

  it('auto-dismisses after default duration', async () => {
    element.defaultDuration = 100;
    element.show('Test', 'info');
    await element.updateComplete;

    expect(element.shadowRoot?.querySelector('.toast')).to.exist;

    // Wait for auto-dismiss + animation
    await new Promise(resolve => setTimeout(resolve, 450));

    expect(element.shadowRoot?.querySelector('.toast')).to.not.exist;
  });

  it('auto-dismisses after custom duration', async () => {
    element.show('Test', 'info', { duration: 100 });
    await element.updateComplete;

    expect(element.shadowRoot?.querySelector('.toast')).to.exist;

    await new Promise(resolve => setTimeout(resolve, 450));

    expect(element.shadowRoot?.querySelector('.toast')).to.not.exist;
  });

  it('does not auto-dismiss when duration is 0', async () => {
    element.show('Test', 'info', { duration: 0 });
    await element.updateComplete;

    expect(element.shadowRoot?.querySelector('.toast')).to.exist;

    await new Promise(resolve => setTimeout(resolve, 500));

    expect(element.shadowRoot?.querySelector('.toast')).to.exist;
  });

  it('dismisses notification by ID', async () => {
    const id = element.show('Test', 'info', { duration: 0 });
    await element.updateComplete;

    element.dismiss(id);

    await new Promise(resolve => setTimeout(resolve, 350));

    expect(element.shadowRoot?.querySelector('.toast')).to.not.exist;
  });

  it('dismisses all notifications', async () => {
    element.show('First', 'info', { duration: 0 });
    element.show('Second', 'success', { duration: 0 });
    element.show('Third', 'warning', { duration: 0 });
    await element.updateComplete;

    expect(element.shadowRoot?.querySelectorAll('.toast').length).to.equal(3);

    element.dismissAll();

    await new Promise(resolve => setTimeout(resolve, 350));

    expect(element.shadowRoot?.querySelector('.toast')).to.not.exist;
  });

  it('emits gc-toast-show event', async () => {
    const eventSpy = vi.fn();
    element.addEventListener('gc-toast-show', eventSpy);

    element.show('Test', 'info');

    expect(eventSpy).toHaveBeenCalledOnce();
  });

  it('includes details in show event', async () => {
    let eventDetail: unknown = null;
    element.addEventListener('gc-toast-show', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    element.show('Test message', 'success');

    expect(eventDetail).to.include({
      message: 'Test message',
      variant: 'success'
    });
  });

  it('emits gc-toast-dismiss event', async () => {
    const eventSpy = vi.fn();
    element.addEventListener('gc-toast-dismiss', eventSpy);

    const id = element.show('Test', 'info', { duration: 0 });
    await element.updateComplete;

    element.dismiss(id);

    await new Promise(resolve => setTimeout(resolve, 350));

    expect(eventSpy).toHaveBeenCalledOnce();
  });

  it('provides info() convenience method', async () => {
    element.info('Info message');
    await element.updateComplete;

    const toast = element.shadowRoot?.querySelector('.toast');
    expect(toast?.classList.contains('info')).to.be.true;
  });

  it('provides success() convenience method', async () => {
    element.success('Success message');
    await element.updateComplete;

    const toast = element.shadowRoot?.querySelector('.toast');
    expect(toast?.classList.contains('success')).to.be.true;
  });

  it('provides warning() convenience method', async () => {
    element.warning('Warning message');
    await element.updateComplete;

    const toast = element.shadowRoot?.querySelector('.toast');
    expect(toast?.classList.contains('warning')).to.be.true;
  });

  it('provides error() convenience method', async () => {
    element.error('Error message');
    await element.updateComplete;

    const toast = element.shadowRoot?.querySelector('.toast');
    expect(toast?.classList.contains('error')).to.be.true;
  });

  it('renders icon for each variant', async () => {
    element.show('Test', 'info');
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.toast-icon');
    expect(icon).to.exist;
    expect(icon?.querySelector('svg')).to.exist;
  });

  it('icon has aria-hidden attribute', async () => {
    element.show('Test', 'info');
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.toast-icon');
    expect(icon?.getAttribute('aria-hidden')).to.equal('true');
  });

  it('has proper ARIA attributes', async () => {
    element.show('Test', 'info');
    await element.updateComplete;

    const container = element.shadowRoot?.querySelector('.toast-container');
    expect(container?.getAttribute('role')).to.equal('region');
    expect(container?.getAttribute('aria-live')).to.equal('polite');
    expect(container?.getAttribute('aria-label')).to.equal('Notifications');

    const toast = element.shadowRoot?.querySelector('.toast');
    expect(toast?.getAttribute('role')).to.equal('alert');
  });

  it('close button has proper aria-label', async () => {
    element.show('Test', 'info');
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.toast-close');
    expect(closeButton?.getAttribute('aria-label')).to.equal('Dismiss notification');
  });

  it('supports French Canadian locale', async () => {
    element.locale = 'fr-CA';
    element.show('Test', 'info');
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.toast-close');
    expect(closeButton?.getAttribute('aria-label')).to.equal('Ignorer la notification');
  });

  it('adds removing class during dismiss', async () => {
    const id = element.show('Test', 'info', { duration: 0 });
    await element.updateComplete;

    element.dismiss(id);
    await element.updateComplete;

    const toast = element.shadowRoot?.querySelector('.toast');
    expect(toast?.classList.contains('removing')).to.be.true;
  });

  it('handles dismiss of non-existent ID gracefully', async () => {
    element.show('Test', 'info', { duration: 0 });
    await element.updateComplete;

    element.dismiss('non-existent-id');

    await new Promise(resolve => setTimeout(resolve, 350));

    // Original toast should still exist
    expect(element.shadowRoot?.querySelector('.toast')).to.exist;
  });

  it('close button is a button element', async () => {
    element.show('Test', 'info');
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.toast-close');
    expect(closeButton?.tagName).to.equal('BUTTON');
    expect(closeButton?.getAttribute('type')).to.equal('button');
  });

  it('renders SVG icons', async () => {
    element.show('Test', 'info');
    await element.updateComplete;

    const svg = element.shadowRoot?.querySelector('.toast-icon svg');
    expect(svg).to.exist;
    expect(svg?.tagName).to.equal('svg');
  });

  it('applies proper CSS classes', async () => {
    element.show('Test', 'info');
    await element.updateComplete;

    const container = element.shadowRoot?.querySelector('.toast-container');
    expect(container?.classList.contains('toast-container')).to.be.true;

    const toast = element.shadowRoot?.querySelector('.toast');
    expect(toast?.classList.contains('toast')).to.be.true;
  });

  it('maintains notification order', async () => {
    element.show('First', 'info', { duration: 0 });
    element.show('Second', 'success', { duration: 0 });
    element.show('Third', 'warning', { duration: 0 });
    await element.updateComplete;

    const toasts = element.shadowRoot?.querySelectorAll('.toast-content');
    expect(toasts?.[0]?.textContent?.trim()).to.equal('First');
    expect(toasts?.[1]?.textContent?.trim()).to.equal('Second');
    expect(toasts?.[2]?.textContent?.trim()).to.equal('Third');
  });

  it('includes timestamp in event details', async () => {
    let eventDetail: { timestamp?: string } | null = null;
    element.addEventListener('gc-toast-show', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    element.show('Test', 'info');

    expect(eventDetail?.timestamp).to.be.a('string');
  });

  it('supports keyboard interaction on close button', async () => {
    element.show('Test', 'info');
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.toast-close') as HTMLElement;
    closeButton?.focus();

    expect(document.activeElement?.shadowRoot?.activeElement).to.equal(closeButton);
  });
});
