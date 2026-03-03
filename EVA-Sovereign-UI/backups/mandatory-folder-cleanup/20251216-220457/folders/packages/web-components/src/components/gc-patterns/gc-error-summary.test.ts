import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-error-summary';
import type { GCErrorSummary } from './gc-error-summary';

describe('gc-error-summary', () => {
  let element: GCErrorSummary;

  beforeEach(async () => {
    element = await fixture(html`<gc-error-summary></gc-error-summary>`);
  });

  it('renders nothing when no errors', () => {
    const summary = element.shadowRoot?.querySelector('.error-summary');
    expect(summary).to.not.exist;
  });

  it('renders summary when errors exist', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    const summary = element.shadowRoot?.querySelector('.error-summary');
    expect(summary).to.exist;
  });

  it('has role="alert" on summary', async () => {
    element.errors = [
      { id: '1', field: 'email', message: 'Email is invalid' }
    ];
    await element.updateComplete;

    const summary = element.shadowRoot?.querySelector('.error-summary');
    expect(summary?.getAttribute('role')).to.equal('alert');
  });

  it('displays default heading', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    const heading = element.shadowRoot?.querySelector('.error-heading');
    expect(heading?.textContent?.trim()).to.include('There is a problem');
  });

  it('displays custom heading', async () => {
    element.heading = 'Form validation failed';
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    const heading = element.shadowRoot?.querySelector('.error-heading');
    expect(heading?.textContent?.trim()).to.include('Form validation failed');
  });

  it('displays default description', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    const description = element.shadowRoot?.querySelector('.error-description');
    expect(description?.textContent?.trim()).to.equal('Please correct the following errors:');
  });

  it('displays custom description', async () => {
    element.description = 'The following fields have errors:';
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    const description = element.shadowRoot?.querySelector('.error-description');
    expect(description?.textContent?.trim()).to.equal('The following fields have errors:');
  });

  it('hides description when empty', async () => {
    element.description = '';
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    const description = element.shadowRoot?.querySelector('.error-description');
    expect(description).to.not.exist;
  });

  it('renders error list', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' },
      { id: '2', field: 'email', message: 'Email is invalid' }
    ];
    await element.updateComplete;

    const list = element.shadowRoot?.querySelector('.error-list');
    expect(list).to.exist;

    const items = element.shadowRoot?.querySelectorAll('.error-item');
    expect(items?.length).to.equal(2);
  });

  it('displays error messages', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' },
      { id: '2', field: 'email', message: 'Email is invalid' }
    ];
    await element.updateComplete;

    const items = element.shadowRoot?.querySelectorAll('.error-item');
    expect(items?.[0]?.textContent?.trim()).to.equal('Name is required');
    expect(items?.[1]?.textContent?.trim()).to.equal('Email is invalid');
  });

  it('renders errors with links as anchors', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required', href: '#name' }
    ];
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.error-link');
    expect(link).to.exist;
    expect(link?.getAttribute('href')).to.equal('#name');
  });

  it('renders errors without links as text', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    const text = element.shadowRoot?.querySelector('.error-text');
    expect(text).to.exist;
    expect(text?.textContent?.trim()).to.equal('Name is required');
  });

  it('emits gc-error-click event on link click', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required', href: '#name' }
    ];
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-error-click', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const link = element.shadowRoot?.querySelector('.error-link') as HTMLAnchorElement;
    link.click();

    expect(eventDetail).to.exist;
  });

  it('includes error in event detail', async () => {
    const error = { id: '1', field: 'name', message: 'Name is required', href: '#name' };
    element.errors = [error];
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-error-click', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const link = element.shadowRoot?.querySelector('.error-link') as HTMLAnchorElement;
    link.click();

    expect((eventDetail as { error: unknown })?.error).to.deep.equal(error);
  });

  it('includes timestamp in event detail', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required', href: '#name' }
    ];
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-error-click', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const link = element.shadowRoot?.querySelector('.error-link') as HTMLAnchorElement;
    link.click();

    expect((eventDetail as { timestamp: string })?.timestamp).to.be.a('string');
  });

  it('renders error icon', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.error-icon');
    expect(icon).to.exist;
  });

  it('icon has aria-hidden attribute', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.error-icon');
    expect(icon?.getAttribute('aria-hidden')).to.equal('true');
  });

  it('icon is SVG element', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.error-icon');
    expect(icon?.tagName.toLowerCase()).to.equal('svg');
  });

  it('has aria-labelledby on summary', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    const summary = element.shadowRoot?.querySelector('.error-summary');
    expect(summary?.getAttribute('aria-labelledby')).to.equal('error-heading');
  });

  it('has aria-describedby on summary', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    const summary = element.shadowRoot?.querySelector('.error-summary');
    expect(summary?.getAttribute('aria-describedby')).to.equal('error-description');
  });

  it('heading has correct id', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    const heading = element.shadowRoot?.querySelector('.error-heading');
    expect(heading?.getAttribute('id')).to.equal('error-heading');
  });

  it('description has correct id', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    const description = element.shadowRoot?.querySelector('.error-description');
    expect(description?.getAttribute('id')).to.equal('error-description');
  });

  it('supports French Canadian locale', async () => {
    element.locale = 'fr-CA';
    element.errors = [
      { id: '1', field: 'name', message: 'Le nom est requis' }
    ];
    await element.updateComplete;

    const heading = element.shadowRoot?.querySelector('.error-heading');
    expect(heading?.textContent?.trim()).to.include('Il y a un problème');

    const description = element.shadowRoot?.querySelector('.error-description');
    expect(description?.textContent?.trim()).to.equal('Veuillez corriger les erreurs suivantes :');
  });

  it('updates when errors change', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    let items = element.shadowRoot?.querySelectorAll('.error-item');
    expect(items?.length).to.equal(1);

    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' },
      { id: '2', field: 'email', message: 'Email is invalid' }
    ];
    await element.updateComplete;

    items = element.shadowRoot?.querySelectorAll('.error-item');
    expect(items?.length).to.equal(2);
  });

  it('clears when errors removed', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    let summary = element.shadowRoot?.querySelector('.error-summary');
    expect(summary).to.exist;

    element.errors = [];
    await element.updateComplete;

    summary = element.shadowRoot?.querySelector('.error-summary');
    expect(summary).to.not.exist;
  });

  it('handles multiple errors with mixed link/text', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required', href: '#name' },
      { id: '2', field: 'age', message: 'Age must be positive' },
      { id: '3', field: 'email', message: 'Email is invalid', href: '#email' }
    ];
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.error-link');
    const texts = element.shadowRoot?.querySelectorAll('.error-text');

    expect(links?.length).to.equal(2);
    expect(texts?.length).to.equal(1);
  });

  it('applies proper CSS classes', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    const summary = element.shadowRoot?.querySelector('.error-summary');
    expect(summary?.classList.contains('error-summary')).to.be.true;

    const heading = element.shadowRoot?.querySelector('.error-heading');
    expect(heading?.classList.contains('error-heading')).to.be.true;

    const list = element.shadowRoot?.querySelector('.error-list');
    expect(list?.classList.contains('error-list')).to.be.true;
  });

  it('heading is h2 element', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    const heading = element.shadowRoot?.querySelector('.error-heading');
    expect(heading?.tagName.toLowerCase()).to.equal('h2');
  });

  it('list is ul element', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    const list = element.shadowRoot?.querySelector('.error-list');
    expect(list?.tagName.toLowerCase()).to.equal('ul');
  });

  it('list items are li elements', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required' }
    ];
    await element.updateComplete;

    const item = element.shadowRoot?.querySelector('.error-item');
    expect(item?.tagName.toLowerCase()).to.equal('li');
  });

  it('handles empty error array', async () => {
    element.errors = [];
    await element.updateComplete;

    const summary = element.shadowRoot?.querySelector('.error-summary');
    expect(summary).to.not.exist;
  });

  it('handles errors with all fields', async () => {
    element.errors = [
      { id: '1', field: 'email', message: 'Email is required', href: '#email-field' }
    ];
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.error-link') as HTMLAnchorElement;
    expect(link).to.exist;
    expect(link.getAttribute('href')).to.equal('#email-field');
    expect(link.textContent?.trim()).to.equal('Email is required');
  });

  it('prevents default link behavior', async () => {
    element.errors = [
      { id: '1', field: 'name', message: 'Name is required', href: '#name' }
    ];
    await element.updateComplete;

    let defaultPrevented = false;
    const link = element.shadowRoot?.querySelector('.error-link') as HTMLAnchorElement;
    
    link.addEventListener('click', (e: Event) => {
      defaultPrevented = e.defaultPrevented;
    });

    link.click();

    expect(defaultPrevented).to.be.true;
  });
});
