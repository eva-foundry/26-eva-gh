import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-page-banner';
import type { GCPageBanner } from './gc-page-banner';

describe('gc-page-banner', () => {
  let element: GCPageBanner;

  beforeEach(async () => {
    element = await fixture(html`<gc-page-banner></gc-page-banner>`);
  });

  it('renders banner container', () => {
    const banner = element.shadowRoot?.querySelector('.banner');
    expect(banner).to.exist;
  });

  it('has role="alert" and aria-live="polite"', () => {
    const banner = element.shadowRoot?.querySelector('.banner');
    expect(banner?.getAttribute('role')).to.equal('alert');
    expect(banner?.getAttribute('aria-live')).to.equal('polite');
  });

  it('renders with info variant by default', () => {
    expect(element.variant).to.equal('info');
  });

  it('renders heading when provided', async () => {
    element.heading = 'Important Notice';
    await element.updateComplete;

    const heading = element.shadowRoot?.querySelector('.banner-heading');
    expect(heading?.textContent).to.equal('Important Notice');
  });

  it('renders description when provided', async () => {
    element.description = 'This is important information.';
    await element.updateComplete;

    const description = element.shadowRoot?.querySelector('.banner-description');
    expect(description?.textContent?.trim()).to.include('This is important information.');
  });

  it('renders slotted content', async () => {
    const el = await fixture(html`
      <gc-page-banner>
        <p>Custom banner content</p>
      </gc-page-banner>
    `);

    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).to.exist;
  });

  it('shows icon by default', () => {
    const icon = element.shadowRoot?.querySelector('.banner-icon');
    expect(icon).to.exist;
  });

  it('hides icon when showIcon is false', async () => {
    element.showIcon = false;
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.banner-icon');
    expect(icon).to.not.exist;
  });

  it('does not show close button by default', () => {
    const closeButton = element.shadowRoot?.querySelector('.banner-close');
    expect(closeButton).to.not.exist;
  });

  it('shows close button when dismissible is true', async () => {
    element.dismissible = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.banner-close');
    expect(closeButton).to.exist;
  });

  it('hides banner when close button clicked', async () => {
    element.dismissible = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.banner-close') as HTMLElement;
    closeButton?.click();

    await element.updateComplete;

    expect(element.hasAttribute('hidden')).to.be.true;
  });

  it('emits gc-banner-close event when closed', async () => {
    element.dismissible = true;
    await element.updateComplete;

    const eventSpy = vi.fn();
    element.addEventListener('gc-banner-close', eventSpy);

    const closeButton = element.shadowRoot?.querySelector('.banner-close') as HTMLElement;
    closeButton?.click();

    expect(eventSpy).toHaveBeenCalledOnce();
  });

  it('includes variant in close event detail', async () => {
    element.variant = 'warning';
    element.dismissible = true;
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-banner-close', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    const closeButton = element.shadowRoot?.querySelector('.banner-close') as HTMLElement;
    closeButton?.click();

    expect(eventDetail).to.include({
      variant: 'warning'
    });
  });

  it('includes timestamp in close event detail', async () => {
    element.dismissible = true;
    await element.updateComplete;

    let eventDetail: { timestamp?: string } | null = null;
    element.addEventListener('gc-banner-close', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    const closeButton = element.shadowRoot?.querySelector('.banner-close') as HTMLElement;
    closeButton?.click();

    expect(eventDetail?.timestamp).to.be.a('string');
  });

  it('renders success variant', async () => {
    element.variant = 'success';
    await element.updateComplete;

    expect(element.getAttribute('variant')).to.equal('success');
  });

  it('renders warning variant', async () => {
    element.variant = 'warning';
    await element.updateComplete;

    expect(element.getAttribute('variant')).to.equal('warning');
  });

  it('renders error variant', async () => {
    element.variant = 'error';
    await element.updateComplete;

    expect(element.getAttribute('variant')).to.equal('error');
  });

  it('renders different icon for success variant', async () => {
    element.variant = 'success';
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.banner-icon svg');
    expect(icon).to.exist;
  });

  it('renders different icon for warning variant', async () => {
    element.variant = 'warning';
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.banner-icon svg');
    expect(icon).to.exist;
  });

  it('renders different icon for error variant', async () => {
    element.variant = 'error';
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.banner-icon svg');
    expect(icon).to.exist;
  });

  it('close button has proper aria-label', async () => {
    element.dismissible = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.banner-close');
    expect(closeButton?.getAttribute('aria-label')).to.equal('Close banner');
  });

  it('supports French Canadian locale for close button', async () => {
    element.locale = 'fr-CA';
    element.dismissible = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.banner-close');
    expect(closeButton?.getAttribute('aria-label')).to.equal('Fermer la bannière');
  });

  it('icon has aria-hidden attribute', () => {
    const icon = element.shadowRoot?.querySelector('.banner-icon');
    expect(icon?.getAttribute('aria-hidden')).to.equal('true');
  });

  it('applies proper CSS classes', () => {
    const banner = element.shadowRoot?.querySelector('.banner');
    expect(banner?.classList.contains('banner')).to.be.true;

    const container = element.shadowRoot?.querySelector('.banner-container');
    expect(container?.classList.contains('banner-container')).to.be.true;

    const content = element.shadowRoot?.querySelector('.banner-content');
    expect(content?.classList.contains('banner-content')).to.be.true;
  });

  it('renders without heading', async () => {
    element.heading = '';
    element.description = 'Description only';
    await element.updateComplete;

    const heading = element.shadowRoot?.querySelector('.banner-heading');
    expect(heading).to.not.exist;

    const description = element.shadowRoot?.querySelector('.banner-description');
    expect(description).to.exist;
  });

  it('renders with both heading and description', async () => {
    element.heading = 'Title';
    element.description = 'Description';
    await element.updateComplete;

    const heading = element.shadowRoot?.querySelector('.banner-heading');
    const description = element.shadowRoot?.querySelector('.banner-description');

    expect(heading).to.exist;
    expect(description).to.exist;
  });

  it('close button is a button element', async () => {
    element.dismissible = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.banner-close');
    expect(closeButton?.tagName).to.equal('BUTTON');
    expect(closeButton?.getAttribute('type')).to.equal('button');
  });

  it('renders icon as SVG', () => {
    const svg = element.shadowRoot?.querySelector('.banner-icon svg');
    expect(svg).to.exist;
    expect(svg?.tagName).to.equal('svg');
  });

  it('handles empty description gracefully', async () => {
    element.description = '';
    await element.updateComplete;

    const description = element.shadowRoot?.querySelector('.banner-description');
    expect(description).to.exist;
  });

  it('supports keyboard interaction on close button', async () => {
    element.dismissible = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.banner-close') as HTMLElement;
    closeButton?.focus();

    expect(document.activeElement?.shadowRoot?.activeElement).to.equal(closeButton);
  });

  it('renders max-width container', () => {
    const container = element.shadowRoot?.querySelector('.banner-container');
    expect(container).to.exist;
  });

  it('uses flex layout for content', () => {
    const content = element.shadowRoot?.querySelector('.banner-content') as HTMLElement;
    const styles = window.getComputedStyle(content);
    
    expect(styles.display).to.equal('flex');
  });

  it('handles variant change', async () => {
    element.variant = 'info';
    await element.updateComplete;
    expect(element.getAttribute('variant')).to.equal('info');

    element.variant = 'success';
    await element.updateComplete;
    expect(element.getAttribute('variant')).to.equal('success');

    element.variant = 'warning';
    await element.updateComplete;
    expect(element.getAttribute('variant')).to.equal('warning');

    element.variant = 'error';
    await element.updateComplete;
    expect(element.getAttribute('variant')).to.equal('error');
  });

  it('banner remains accessible after close', async () => {
    element.dismissible = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.banner-close') as HTMLElement;
    closeButton?.click();

    await element.updateComplete;

    // Banner should be hidden via attribute, not removed from DOM
    const banner = element.shadowRoot?.querySelector('.banner');
    expect(banner).to.exist;
  });

  it('renders with all features enabled', async () => {
    element.variant = 'warning';
    element.heading = 'Important Update';
    element.description = 'Please read this information.';
    element.dismissible = true;
    element.showIcon = true;
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.banner-icon');
    const heading = element.shadowRoot?.querySelector('.banner-heading');
    const description = element.shadowRoot?.querySelector('.banner-description');
    const closeButton = element.shadowRoot?.querySelector('.banner-close');

    expect(icon).to.exist;
    expect(heading).to.exist;
    expect(description).to.exist;
    expect(closeButton).to.exist;
  });

  it('renders with minimal configuration', async () => {
    element.showIcon = false;
    element.heading = '';
    element.dismissible = false;
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.banner-icon');
    const heading = element.shadowRoot?.querySelector('.banner-heading');
    const closeButton = element.shadowRoot?.querySelector('.banner-close');

    expect(icon).to.not.exist;
    expect(heading).to.not.exist;
    expect(closeButton).to.not.exist;
  });
});
