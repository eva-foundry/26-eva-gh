import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-search-box';
import type { GCSearchBox } from './gc-search-box';

describe('gc-search-box', () => {
  let element: GCSearchBox;

  beforeEach(async () => {
    element = await fixture(html`<gc-search-box></gc-search-box>`);
  });

  it('renders search form', () => {
    const form = element.shadowRoot?.querySelector('.search-box');
    expect(form).to.exist;
  });

  it('form has role="search"', () => {
    const form = element.shadowRoot?.querySelector('.search-box');
    expect(form?.getAttribute('role')).to.equal('search');
  });

  it('form is form element', () => {
    const form = element.shadowRoot?.querySelector('.search-box');
    expect(form?.tagName.toLowerCase()).to.equal('form');
  });

  it('renders search input', () => {
    const input = element.shadowRoot?.querySelector('.search-input');
    expect(input).to.exist;
  });

  it('input has type="search"', () => {
    const input = element.shadowRoot?.querySelector('.search-input');
    expect(input?.getAttribute('type')).to.equal('search');
  });

  it('input has id', () => {
    const input = element.shadowRoot?.querySelector('.search-input');
    expect(input?.getAttribute('id')).to.equal('search-input');
  });

  it('renders search button', () => {
    const button = element.shadowRoot?.querySelector('.search-button');
    expect(button).to.exist;
  });

  it('button has type="submit"', () => {
    const button = element.shadowRoot?.querySelector('.search-button');
    expect(button?.getAttribute('type')).to.equal('submit');
  });

  it('button has aria-label', () => {
    const button = element.shadowRoot?.querySelector('.search-button');
    expect(button?.getAttribute('aria-label')).to.be.a('string');
  });

  it('input has aria-label', () => {
    const input = element.shadowRoot?.querySelector('.search-input');
    expect(input?.getAttribute('aria-label')).to.be.a('string');
  });

  it('renders label for input', () => {
    const label = element.shadowRoot?.querySelector('label[for="search-input"]');
    expect(label).to.exist;
  });

  it('label has sr-only class', () => {
    const label = element.shadowRoot?.querySelector('label');
    expect(label?.classList.contains('sr-only')).to.be.true;
  });

  it('displays placeholder', () => {
    const input = element.shadowRoot?.querySelector('.search-input');
    expect(input?.getAttribute('placeholder')).to.be.a('string');
  });

  it('uses custom placeholder', async () => {
    element.placeholder = 'Search Canada.ca';
    await element.updateComplete;

    const input = element.shadowRoot?.querySelector('.search-input');
    expect(input?.getAttribute('placeholder')).to.equal('Search Canada.ca');
  });

  it('shows search icon by default', () => {
    const icon = element.shadowRoot?.querySelector('.search-icon');
    expect(icon).to.exist;
  });

  it('icon is SVG', () => {
    const icon = element.shadowRoot?.querySelector('.search-icon');
    expect(icon?.tagName.toLowerCase()).to.equal('svg');
  });

  it('icon has aria-hidden', () => {
    const icon = element.shadowRoot?.querySelector('.search-icon');
    expect(icon?.getAttribute('aria-hidden')).to.equal('true');
  });

  it('shows button text when showButtonText is true', async () => {
    element.showButtonText = true;
    await element.updateComplete;

    const button = element.shadowRoot?.querySelector('.search-button');
    expect(button?.textContent?.trim()).to.be.a('string');
    expect(button?.textContent?.trim().length).to.be.greaterThan(0);
  });

  it('uses custom button text', async () => {
    element.buttonText = 'Find';
    element.showButtonText = true;
    await element.updateComplete;

    const button = element.shadowRoot?.querySelector('.search-button');
    expect(button?.textContent?.trim()).to.equal('Find');
  });

  it('hides icon when showButtonText is true', async () => {
    element.showButtonText = true;
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.search-icon');
    expect(icon).to.not.exist;
  });

  it('updates value on input', async () => {
    const input = element.shadowRoot?.querySelector('.search-input') as HTMLInputElement;
    
    input.value = 'test query';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await element.updateComplete;

    expect(element.value).to.equal('test query');
  });

  it('emits gc-search-input on input', async () => {
    let eventDetail: unknown = null;
    element.addEventListener('gc-search-input', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const input = element.shadowRoot?.querySelector('.search-input') as HTMLInputElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    expect(eventDetail).to.exist;
  });

  it('includes value in input event', async () => {
    let eventDetail: unknown = null;
    element.addEventListener('gc-search-input', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const input = element.shadowRoot?.querySelector('.search-input') as HTMLInputElement;
    input.value = 'search term';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    expect((eventDetail as { value: string })?.value).to.equal('search term');
  });

  it('includes timestamp in input event', async () => {
    let eventDetail: unknown = null;
    element.addEventListener('gc-search-input', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const input = element.shadowRoot?.querySelector('.search-input') as HTMLInputElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    expect((eventDetail as { timestamp: string })?.timestamp).to.be.a('string');
  });

  it('emits gc-search-submit on form submit', async () => {
    let eventDetail: unknown = null;
    element.addEventListener('gc-search-submit', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const form = element.shadowRoot?.querySelector('.search-box') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(eventDetail).to.exist;
  });

  it('includes value in submit event', async () => {
    element.value = 'submit test';
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-search-submit', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const form = element.shadowRoot?.querySelector('.search-box') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect((eventDetail as { value: string })?.value).to.equal('submit test');
  });

  it('includes timestamp in submit event', async () => {
    let eventDetail: unknown = null;
    element.addEventListener('gc-search-submit', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const form = element.shadowRoot?.querySelector('.search-box') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect((eventDetail as { timestamp: string })?.timestamp).to.be.a('string');
  });

  it('applies proper CSS classes', () => {
    const form = element.shadowRoot?.querySelector('.search-box');
    expect(form?.classList.contains('search-box')).to.be.true;

    const input = element.shadowRoot?.querySelector('.search-input');
    expect(input?.classList.contains('search-input')).to.be.true;

    const button = element.shadowRoot?.querySelector('.search-button');
    expect(button?.classList.contains('search-button')).to.be.true;
  });

  it('input reflects value property', async () => {
    element.value = 'initial value';
    await element.updateComplete;

    const input = element.shadowRoot?.querySelector('.search-input') as HTMLInputElement;
    expect(input.value).to.equal('initial value');
  });

  it('updates when value property changes', async () => {
    element.value = 'new value';
    await element.updateComplete;

    const input = element.shadowRoot?.querySelector('.search-input') as HTMLInputElement;
    expect(input.value).to.equal('new value');
  });
});
