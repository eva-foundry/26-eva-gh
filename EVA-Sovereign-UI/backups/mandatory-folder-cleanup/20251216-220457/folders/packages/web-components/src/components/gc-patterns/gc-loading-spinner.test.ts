import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-loading-spinner';
import type { GCLoadingSpinner } from './gc-loading-spinner';

describe('gc-loading-spinner', () => {
  let element: GCLoadingSpinner;

  beforeEach(async () => {
    element = await fixture(html`<gc-loading-spinner></gc-loading-spinner>`);
  });

  it('renders spinner container', () => {
    const container = element.shadowRoot?.querySelector('.spinner-container');
    expect(container).to.exist;
  });

  it('renders spinner element', () => {
    const spinner = element.shadowRoot?.querySelector('.spinner');
    expect(spinner).to.exist;
  });

  it('has role="status" on spinner', () => {
    const spinner = element.shadowRoot?.querySelector('.spinner');
    expect(spinner?.getAttribute('role')).to.equal('status');
  });

  it('has aria-live="polite" on spinner', () => {
    const spinner = element.shadowRoot?.querySelector('.spinner');
    expect(spinner?.getAttribute('aria-live')).to.equal('polite');
  });

  it('displays default loading text', () => {
    const text = element.shadowRoot?.querySelector('.spinner-text');
    expect(text?.textContent?.trim()).to.equal('Loading...');
  });

  it('displays custom text when provided', async () => {
    element.text = 'Processing your request...';
    await element.updateComplete;

    const text = element.shadowRoot?.querySelector('.spinner-text');
    expect(text?.textContent?.trim()).to.equal('Processing your request...');
  });

  it('sets aria-label on spinner', () => {
    const spinner = element.shadowRoot?.querySelector('.spinner');
    expect(spinner?.getAttribute('aria-label')).to.equal('Loading...');
  });

  it('sets aria-label with custom text', async () => {
    element.text = 'Saving...';
    await element.updateComplete;

    const spinner = element.shadowRoot?.querySelector('.spinner');
    expect(spinner?.getAttribute('aria-label')).to.equal('Saving...');
  });

  it('text has aria-hidden attribute', () => {
    const text = element.shadowRoot?.querySelector('.spinner-text');
    expect(text?.getAttribute('aria-hidden')).to.equal('true');
  });

  it('uses medium size by default', () => {
    expect(element.size).to.equal('medium');
  });

  it('applies small size variant', async () => {
    element.size = 'small';
    await element.updateComplete;

    expect(element.getAttribute('size')).to.equal('small');
  });

  it('applies large size variant', async () => {
    element.size = 'large';
    await element.updateComplete;

    expect(element.getAttribute('size')).to.equal('large');
  });

  it('uses default variant by default', () => {
    expect(element.variant).to.equal('default');
  });

  it('applies light variant', async () => {
    element.variant = 'light';
    await element.updateComplete;

    expect(element.getAttribute('variant')).to.equal('light');
  });

  it('applies primary variant', async () => {
    element.variant = 'primary';
    await element.updateComplete;

    expect(element.getAttribute('variant')).to.equal('primary');
  });

  it('applies success variant', async () => {
    element.variant = 'success';
    await element.updateComplete;

    expect(element.getAttribute('variant')).to.equal('success');
  });

  it('applies warning variant', async () => {
    element.variant = 'warning';
    await element.updateComplete;

    expect(element.getAttribute('variant')).to.equal('warning');
  });

  it('applies error variant', async () => {
    element.variant = 'error';
    await element.updateComplete;

    expect(element.getAttribute('variant')).to.equal('error');
  });

  it('is not centered by default', () => {
    expect(element.centered).to.be.false;
  });

  it('applies centered attribute', async () => {
    element.centered = true;
    await element.updateComplete;

    expect(element.hasAttribute('centered')).to.be.true;
  });

  it('is not overlay by default', () => {
    expect(element.overlay).to.be.false;
  });

  it('applies overlay attribute', async () => {
    element.overlay = true;
    await element.updateComplete;

    expect(element.hasAttribute('overlay')).to.be.true;
  });

  it('hides text in overlay mode when no custom text', async () => {
    element.overlay = true;
    await element.updateComplete;

    const text = element.shadowRoot?.querySelector('.spinner-text');
    expect(text).to.not.exist;
  });

  it('shows custom text even in overlay mode', async () => {
    element.overlay = true;
    element.text = 'Please wait...';
    await element.updateComplete;

    const text = element.shadowRoot?.querySelector('.spinner-text');
    expect(text).to.exist;
    expect(text?.textContent?.trim()).to.equal('Please wait...');
  });

  it('supports French Canadian locale', async () => {
    element.locale = 'fr-CA';
    await element.updateComplete;

    const text = element.shadowRoot?.querySelector('.spinner-text');
    expect(text?.textContent?.trim()).to.equal('Chargement...');
  });

  it('applies proper CSS classes', () => {
    const container = element.shadowRoot?.querySelector('.spinner-container');
    expect(container?.classList.contains('spinner-container')).to.be.true;

    const spinner = element.shadowRoot?.querySelector('.spinner');
    expect(spinner?.classList.contains('spinner')).to.be.true;
  });

  it('renders inline-block by default', () => {
    const styles = window.getComputedStyle(element);
    expect(styles.display).to.equal('inline-block');
  });

  it('handles empty text property', async () => {
    element.text = '';
    await element.updateComplete;

    const text = element.shadowRoot?.querySelector('.spinner-text');
    expect(text?.textContent?.trim()).to.equal('Loading...');
  });

  it('combines size and variant', async () => {
    element.size = 'large';
    element.variant = 'success';
    await element.updateComplete;

    expect(element.getAttribute('size')).to.equal('large');
    expect(element.getAttribute('variant')).to.equal('success');
  });

  it('combines centered and overlay', async () => {
    element.centered = true;
    element.overlay = true;
    await element.updateComplete;

    expect(element.hasAttribute('centered')).to.be.true;
    expect(element.hasAttribute('overlay')).to.be.true;
  });

  it('updates text dynamically', async () => {
    element.text = 'Loading...';
    await element.updateComplete;

    let text = element.shadowRoot?.querySelector('.spinner-text');
    expect(text?.textContent?.trim()).to.equal('Loading...');

    element.text = 'Almost done...';
    await element.updateComplete;

    text = element.shadowRoot?.querySelector('.spinner-text');
    expect(text?.textContent?.trim()).to.equal('Almost done...');
  });

  it('updates size dynamically', async () => {
    element.size = 'small';
    await element.updateComplete;
    expect(element.getAttribute('size')).to.equal('small');

    element.size = 'large';
    await element.updateComplete;
    expect(element.getAttribute('size')).to.equal('large');
  });

  it('updates variant dynamically', async () => {
    element.variant = 'primary';
    await element.updateComplete;
    expect(element.getAttribute('variant')).to.equal('primary');

    element.variant = 'error';
    await element.updateComplete;
    expect(element.getAttribute('variant')).to.equal('error');
  });

  it('renders with all features enabled', async () => {
    element.size = 'large';
    element.variant = 'primary';
    element.text = 'Custom loading text';
    element.centered = true;
    await element.updateComplete;

    const spinner = element.shadowRoot?.querySelector('.spinner');
    const text = element.shadowRoot?.querySelector('.spinner-text');

    expect(spinner).to.exist;
    expect(text).to.exist;
    expect(element.getAttribute('size')).to.equal('large');
    expect(element.getAttribute('variant')).to.equal('primary');
    expect(element.hasAttribute('centered')).to.be.true;
  });

  it('maintains accessibility when locale changes', async () => {
    element.locale = 'en-CA';
    await element.updateComplete;

    let spinner = element.shadowRoot?.querySelector('.spinner');
    expect(spinner?.getAttribute('aria-label')).to.equal('Loading...');

    element.locale = 'fr-CA';
    await element.updateComplete;

    spinner = element.shadowRoot?.querySelector('.spinner');
    expect(spinner?.getAttribute('aria-label')).to.equal('Chargement...');
  });

  it('spinner has proper structure', () => {
    const container = element.shadowRoot?.querySelector('.spinner-container');
    const spinner = container?.querySelector('.spinner');
    
    expect(container).to.exist;
    expect(spinner).to.exist;
  });

  it('uses flex layout for container', () => {
    const container = element.shadowRoot?.querySelector('.spinner-container') as HTMLElement;
    const styles = window.getComputedStyle(container);
    
    expect(styles.display).to.equal('inline-flex');
  });

  it('renders minimal configuration', async () => {
    element.text = '';
    element.centered = false;
    element.overlay = false;
    await element.updateComplete;

    const spinner = element.shadowRoot?.querySelector('.spinner');
    expect(spinner).to.exist;
  });

  it('handles all size options', async () => {
    const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
    
    for (const size of sizes) {
      element.size = size;
      await element.updateComplete;
      expect(element.getAttribute('size')).to.equal(size);
    }
  });

  it('handles all variant options', async () => {
    const variants: Array<'default' | 'light' | 'primary' | 'success' | 'warning' | 'error'> = 
      ['default', 'light', 'primary', 'success', 'warning', 'error'];
    
    for (const variant of variants) {
      element.variant = variant;
      await element.updateComplete;
      expect(element.getAttribute('variant')).to.equal(variant);
    }
  });
});
