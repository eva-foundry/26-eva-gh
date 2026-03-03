import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach, vi } from 'vitest';
import './wb-toggle.js';
import type { WBToggle } from './wb-toggle.js';

describe('WBToggle', () => {
  let element: WBToggle;

  beforeEach(async () => {
    element = await fixture<WBToggle>(html`
      <wb-toggle label="Show details">
        <p>Hidden content here</p>
      </wb-toggle>
    `);
  });

  it('renders', () => {
    expect(element).toBeDefined();
  });

  it('renders with custom label', () => {
    const button = element.shadowRoot!.querySelector('.toggle-button');
    expect(button?.textContent?.trim()).toContain('Show details');
  });

  it('starts collapsed by default', () => {
    const content = element.shadowRoot!.querySelector('.toggle-content');
    expect(content?.classList.contains('expanded')).toBe(false);
  });

  it('can start expanded with expanded attribute', async () => {
    const expandedElement = await fixture<WBToggle>(html`
      <wb-toggle label="Details" expanded>
        <p>Content</p>
      </wb-toggle>
    `);

    const content = expandedElement.shadowRoot!.querySelector('.toggle-content');
    expect(content?.classList.contains('expanded')).toBe(true);
  });

  it('toggles on button click', async () => {
    const button = element.shadowRoot!.querySelector('.toggle-button') as HTMLButtonElement;
    
    // Initially collapsed
    let content = element.shadowRoot!.querySelector('.toggle-content');
    expect(content?.classList.contains('expanded')).toBe(false);

    // Click to expand
    button.click();
    await element.updateComplete;

    content = element.shadowRoot!.querySelector('.toggle-content');
    expect(content?.classList.contains('expanded')).toBe(true);

    // Click to collapse
    button.click();
    await element.updateComplete;

    content = element.shadowRoot!.querySelector('.toggle-content');
    expect(content?.classList.contains('expanded')).toBe(false);
  });

  it('updates aria-expanded on toggle', async () => {
    const button = element.shadowRoot!.querySelector('.toggle-button') as HTMLButtonElement;

    expect(button.getAttribute('aria-expanded')).toBe('false');

    button.click();
    await element.updateComplete;

    expect(button.getAttribute('aria-expanded')).toBe('true');
  });

  it('has correct ARIA attributes', () => {
    const button = element.shadowRoot!.querySelector('.toggle-button');
    const content = element.shadowRoot!.querySelector('.toggle-content');

    expect(button?.getAttribute('aria-controls')).toBeTruthy();
    expect(content?.getAttribute('role')).toBe('region');
  });

  it('icon rotates when expanded', async () => {
    const button = element.shadowRoot!.querySelector('.toggle-button') as HTMLButtonElement;

    let icon = element.shadowRoot!.querySelector('.toggle-icon');
    expect(icon?.classList.contains('expanded')).toBe(false);

    button.click();
    await element.updateComplete;

    icon = element.shadowRoot!.querySelector('.toggle-icon');
    expect(icon?.classList.contains('expanded')).toBe(true);
  });

  it('can hide icon with show-icon=false', async () => {
    const noIconElement = await fixture<WBToggle>(html`
      <wb-toggle label="Details" show-icon="false">
        <p>Content</p>
      </wb-toggle>
    `);

    const icon = noIconElement.shadowRoot!.querySelector('.toggle-icon');
    expect(icon).toBeNull();
  });

  it('responds to Enter key', async () => {
    const button = element.shadowRoot!.querySelector('.toggle-button') as HTMLButtonElement;

    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await element.updateComplete;

    const content = element.shadowRoot!.querySelector('.toggle-content');
    expect(content?.classList.contains('expanded')).toBe(true);
  });

  it('responds to Space key', async () => {
    const button = element.shadowRoot!.querySelector('.toggle-button') as HTMLButtonElement;

    button.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await element.updateComplete;

    const content = element.shadowRoot!.querySelector('.toggle-content');
    expect(content?.classList.contains('expanded')).toBe(true);
  });

  it('emits wb-toggle-show event when showing', async () => {
    let eventFired = false;
    element.addEventListener('wb-toggle-show', () => {
      eventFired = true;
    });

    element.show();
    await element.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('emits wb-toggle-hide event when hiding', async () => {
    element.show();
    await element.updateComplete;

    let eventFired = false;
    element.addEventListener('wb-toggle-hide', () => {
      eventFired = true;
    });

    element.hide();
    await element.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('show() method expands content', async () => {
    element.show();
    await element.updateComplete;

    const content = element.shadowRoot!.querySelector('.toggle-content');
    expect(content?.classList.contains('expanded')).toBe(true);
  });

  it('hide() method collapses content', async () => {
    element.show();
    await element.updateComplete;

    element.hide();
    await element.updateComplete;

    const content = element.shadowRoot!.querySelector('.toggle-content');
    expect(content?.classList.contains('expanded')).toBe(false);
  });

  it('toggle() method switches state', async () => {
    let content = element.shadowRoot!.querySelector('.toggle-content');
    expect(content?.classList.contains('expanded')).toBe(false);

    element.toggle();
    await element.updateComplete;

    content = element.shadowRoot!.querySelector('.toggle-content');
    expect(content?.classList.contains('expanded')).toBe(true);

    element.toggle();
    await element.updateComplete;

    content = element.shadowRoot!.querySelector('.toggle-content');
    expect(content?.classList.contains('expanded')).toBe(false);
  });

  it('group mode - only one toggle open at a time', async () => {
    const container = await fixture(html`
      <div>
        <wb-toggle id="toggle1" label="Toggle 1" group="group1">
          <p>Content 1</p>
        </wb-toggle>
        <wb-toggle id="toggle2" label="Toggle 2" group="group1">
          <p>Content 2</p>
        </wb-toggle>
        <wb-toggle id="toggle3" label="Toggle 3" group="group1">
          <p>Content 3</p>
        </wb-toggle>
      </div>
    `);

    const toggle1 = container.querySelector('#toggle1') as WBToggle;
    const toggle2 = container.querySelector('#toggle2') as WBToggle;

    // Open toggle1
    toggle1.show();
    await toggle1.updateComplete;

    let content1 = toggle1.shadowRoot!.querySelector('.toggle-content');
    expect(content1?.classList.contains('expanded')).toBe(true);

    // Open toggle2 - should close toggle1
    toggle2.show();
    await toggle2.updateComplete;
    await toggle1.updateComplete;

    content1 = toggle1.shadowRoot!.querySelector('.toggle-content');
    const content2 = toggle2.shadowRoot!.querySelector('.toggle-content');

    expect(content1?.classList.contains('expanded')).toBe(false);
    expect(content2?.classList.contains('expanded')).toBe(true);
  });

  it('toggles without group work independently', async () => {
    const container = await fixture(html`
      <div>
        <wb-toggle id="toggle1" label="Toggle 1">
          <p>Content 1</p>
        </wb-toggle>
        <wb-toggle id="toggle2" label="Toggle 2">
          <p>Content 2</p>
        </wb-toggle>
      </div>
    `);

    const toggle1 = container.querySelector('#toggle1') as WBToggle;
    const toggle2 = container.querySelector('#toggle2') as WBToggle;

    // Open both
    toggle1.show();
    toggle2.show();
    await toggle1.updateComplete;
    await toggle2.updateComplete;

    const content1 = toggle1.shadowRoot!.querySelector('.toggle-content');
    const content2 = toggle2.shadowRoot!.querySelector('.toggle-content');

    // Both should stay open
    expect(content1?.classList.contains('expanded')).toBe(true);
    expect(content2?.classList.contains('expanded')).toBe(true);
  });

  it('renders slotted content', async () => {
    const content = element.querySelector('p');
    expect(content?.textContent).toBe('Hidden content here');
  });

  it('has accessible name from label', () => {
    const button = element.shadowRoot!.querySelector('.toggle-button');
    expect(button?.textContent).toContain('Show details');
  });

  it('announces state changes to screen readers', async () => {
    const announceSpy = vi.spyOn(element, 'announce');

    element.toggle();
    await element.updateComplete;

    expect(announceSpy).toHaveBeenCalled();
  });

  it('supports bilingual labels (FR-CA)', async () => {
    // Set French locale
    document.documentElement.lang = 'fr-CA';
    localStorage.setItem('eva-locale', 'fr-CA');

    const frElement = await fixture<WBToggle>(html`
      <wb-toggle label="Détails">
        <p>Contenu</p>
      </wb-toggle>
    `);

    const button = frElement.shadowRoot!.querySelector('.toggle-button');
    expect(button?.textContent).toContain('Détails');

    // Reset to English
    document.documentElement.lang = 'en-CA';
    localStorage.setItem('eva-locale', 'en-CA');
  });
});
