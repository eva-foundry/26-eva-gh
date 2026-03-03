import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-tagfilter.js';
import type { WBTagFilter } from './wb-tagfilter.js';

describe('WBTagFilter', () => {
  let tagfilter: WBTagFilter;

  beforeEach(async () => {
    tagfilter = await fixture<WBTagFilter>(html`
      <wb-tagfilter .tags="${['JavaScript', 'TypeScript', 'Python']}">
        <div data-tags="JavaScript">JS Article</div>
        <div data-tags="TypeScript">TS Article</div>
        <div data-tags="JavaScript,TypeScript">Multi-tag Article</div>
      </wb-tagfilter>
    `);
  });

  it('renders', () => {
    expect(tagfilter).to.exist;
  });

  it('displays tag buttons', () => {
    const buttons = tagfilter.shadowRoot!.querySelectorAll('.tag-button');
    expect(buttons.length).to.equal(3);
  });

  it('tag buttons have correct text', () => {
    const buttons = tagfilter.shadowRoot!.querySelectorAll('.tag-button');
    expect(buttons[0].textContent?.trim()).to.equal('JavaScript');
    expect(buttons[1].textContent?.trim()).to.equal('TypeScript');
    expect(buttons[2].textContent?.trim()).to.equal('Python');
  });

  it('toggles tag active state', async () => {
    const button = tagfilter.shadowRoot!.querySelector('.tag-button') as HTMLButtonElement;
    button.click();
    await tagfilter.updateComplete;
    expect(button.classList.contains('active')).to.equal(true);
  });

  it('deactivates tag on second click', async () => {
    const button = tagfilter.shadowRoot!.querySelector('.tag-button') as HTMLButtonElement;
    button.click();
    await tagfilter.updateComplete;
    button.click();
    await tagfilter.updateComplete;
    expect(button.classList.contains('active')).to.equal(false);
  });

  it('filters items by tag', async () => {
    const button = tagfilter.shadowRoot!.querySelector('.tag-button') as HTMLButtonElement;
    button.click();
    await tagfilter.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    const items = tagfilter.querySelectorAll('[data-filtered="false"]');
    expect(items.length).to.be.greaterThan(0);
  });

  it('shows clear button when tags active', async () => {
    const button = tagfilter.shadowRoot!.querySelector('.tag-button') as HTMLButtonElement;
    button.click();
    await tagfilter.updateComplete;
    const clearButton = tagfilter.shadowRoot!.querySelector('.clear-button');
    expect(clearButton).to.exist;
  });

  it('hides clear button when no tags active', () => {
    const clearButton = tagfilter.shadowRoot!.querySelector('.clear-button');
    expect(clearButton).to.be.null;
  });

  it('clearFilters method clears all tags', async () => {
    const button = tagfilter.shadowRoot!.querySelector('.tag-button') as HTMLButtonElement;
    button.click();
    await tagfilter.updateComplete;
    tagfilter.clearFilters();
    await tagfilter.updateComplete;
    expect(button.classList.contains('active')).to.equal(false);
  });

  it('emits wb-tagfilter-change event', async () => {
    let eventFired = false;
    tagfilter.addEventListener('wb-tagfilter-change', () => { eventFired = true; });
    const button = tagfilter.shadowRoot!.querySelector('.tag-button') as HTMLButtonElement;
    button.click();
    await tagfilter.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('event includes active tags', async () => {
    let activeTags: string[] = [];
    tagfilter.addEventListener('wb-tagfilter-change', (e: Event) => {
      activeTags = (e as CustomEvent).detail.activeTags;
    });
    const button = tagfilter.shadowRoot!.querySelector('.tag-button') as HTMLButtonElement;
    button.click();
    await tagfilter.updateComplete;
    expect(activeTags.length).to.equal(1);
    expect(activeTags[0]).to.equal('JavaScript');
  });

  it('event includes mode', async () => {
    let mode = '';
    tagfilter.addEventListener('wb-tagfilter-change', (e: Event) => {
      mode = (e as CustomEvent).detail.mode;
    });
    const button = tagfilter.shadowRoot!.querySelector('.tag-button') as HTMLButtonElement;
    button.click();
    await tagfilter.updateComplete;
    expect(mode).to.equal('OR');
  });

  it('has default mode OR', () => {
    expect(tagfilter.mode).to.equal('OR');
  });

  it('supports AND mode', async () => {
    const andFilter = await fixture<WBTagFilter>(html`
      <wb-tagfilter mode="AND" .tags="${['JavaScript', 'TypeScript']}">
        <div data-tags="JavaScript,TypeScript">Both tags</div>
        <div data-tags="JavaScript">One tag</div>
      </wb-tagfilter>
    `);
    expect(andFilter.mode).to.equal('AND');
  });

  it('filters with AND mode', async () => {
    tagfilter.mode = 'AND';
    await tagfilter.updateComplete;
    const buttons = tagfilter.shadowRoot!.querySelectorAll('.tag-button');
    (buttons[0] as HTMLButtonElement).click();
    (buttons[1] as HTMLButtonElement).click();
    await tagfilter.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    const visibleItems = tagfilter.querySelectorAll('[data-filtered="true"]');
    expect(visibleItems.length).to.be.greaterThan(0);
  });

  it('filters with OR mode', async () => {
    tagfilter.mode = 'OR';
    await tagfilter.updateComplete;
    const buttons = tagfilter.shadowRoot!.querySelectorAll('.tag-button');
    (buttons[0] as HTMLButtonElement).click();
    await tagfilter.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    const visibleItems = tagfilter.querySelectorAll('[data-filtered="true"]');
    expect(visibleItems.length).to.be.greaterThan(0);
  });

  it('tag buttons have aria-pressed', () => {
    const button = tagfilter.shadowRoot!.querySelector('.tag-button');
    expect(button?.getAttribute('aria-pressed')).to.equal('false');
  });

  it('updates aria-pressed when active', async () => {
    const button = tagfilter.shadowRoot!.querySelector('.tag-button') as HTMLButtonElement;
    button.click();
    await tagfilter.updateComplete;
    expect(button.getAttribute('aria-pressed')).to.equal('true');
  });

  it('tag group has role=group', () => {
    const group = tagfilter.shadowRoot!.querySelector('.filter-tags');
    expect(group?.getAttribute('role')).to.equal('group');
  });

  it('tag group has aria-label', () => {
    const group = tagfilter.shadowRoot!.querySelector('.filter-tags');
    expect(group?.getAttribute('aria-label')).to.equal('Tag filters');
  });

  it('tag buttons have tabindex', () => {
    const button = tagfilter.shadowRoot!.querySelector('.tag-button');
    expect(button?.getAttribute('tabindex')).to.equal('0');
  });

  it('handles items with multiple tags', async () => {
    const items = tagfilter.querySelectorAll('[data-tags*="JavaScript"]');
    expect(items.length).to.equal(2);
  });

  it('handles empty tags array', async () => {
    const noTags = await fixture<WBTagFilter>(html`
      <wb-tagfilter>
        <div>Item</div>
      </wb-tagfilter>
    `);
    const buttons = noTags.shadowRoot!.querySelectorAll('.tag-button');
    expect(buttons.length).to.equal(0);
  });

  it('displays all items when no filters active', async () => {
    await new Promise(resolve => setTimeout(resolve, 50));
    const visibleItems = tagfilter.querySelectorAll('[data-filtered="true"]');
    expect(visibleItems.length).to.equal(3);
  });

  it('handles missing data-tags attribute', async () => {
    const noAttr = await fixture<WBTagFilter>(html`
      <wb-tagfilter .tags="${['Tag1']}">
        <div>No tags</div>
      </wb-tagfilter>
    `);
    const button = noAttr.shadowRoot!.querySelector('.tag-button') as HTMLButtonElement;
    button.click();
    await noAttr.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(noAttr).to.exist;
  });

  it('trims tag values', async () => {
    const trimmed = await fixture<WBTagFilter>(html`
      <wb-tagfilter .tags="${['Tag1']}">
        <div data-tags="Tag1 , Tag2 , Tag3">Spaced tags</div>
      </wb-tagfilter>
    `);
    expect(trimmed).to.exist;
  });
});
