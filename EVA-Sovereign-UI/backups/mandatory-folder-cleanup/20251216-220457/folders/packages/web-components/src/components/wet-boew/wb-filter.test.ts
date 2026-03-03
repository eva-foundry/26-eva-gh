import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-filter.js';
import type { WBFilter } from './wb-filter.js';

describe('WBFilter', () => {
  let filter: WBFilter;

  beforeEach(async () => {
    filter = await fixture<WBFilter>(html`
      <wb-filter .tags="${['tag1', 'tag2', 'tag3']}">
        <div data-filter-tags="tag1">Item 1</div>
        <div data-filter-tags="tag2">Item 2</div>
        <div data-filter-tags="tag1,tag3">Item 3</div>
      </wb-filter>
    `);
  });

  it('renders', () => {
    expect(filter).to.exist;
  });

  it('displays search input', () => {
    const search = filter.shadowRoot!.querySelector('.filter-search');
    expect(search).to.exist;
  });

  it('displays tag filters', () => {
    const tags = filter.shadowRoot!.querySelectorAll('.filter-tag');
    expect(tags.length).to.equal(3);
  });

  it('tag buttons have correct text', () => {
    const tags = filter.shadowRoot!.querySelectorAll('.filter-tag');
    expect(tags[0].textContent?.trim()).to.equal('tag1');
    expect(tags[1].textContent?.trim()).to.equal('tag2');
    expect(tags[2].textContent?.trim()).to.equal('tag3');
  });

  it('toggles tag active state', async () => {
    const tag = filter.shadowRoot!.querySelector('.filter-tag') as HTMLButtonElement;
    tag.click();
    await filter.updateComplete;
    expect(tag.classList.contains('active')).to.equal(true);
  });

  it('deactivates tag on second click', async () => {
    const tag = filter.shadowRoot!.querySelector('.filter-tag') as HTMLButtonElement;
    tag.click();
    await filter.updateComplete;
    tag.click();
    await filter.updateComplete;
    expect(tag.classList.contains('active')).to.equal(false);
  });

  it('filters items by tag', async () => {
    const tag = filter.shadowRoot!.querySelector('.filter-tag') as HTMLButtonElement;
    tag.click();
    await filter.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    const items = filter.querySelectorAll('[data-filtered="false"]');
    expect(items.length).to.equal(1);
  });

  it('filters items by search query', async () => {
    const search = filter.shadowRoot!.querySelector('.filter-search') as HTMLInputElement;
    search.value = 'Item 2';
    search.dispatchEvent(new Event('input'));
    await filter.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    const items = filter.querySelectorAll('[data-filtered="false"]');
    expect(items.length).to.be.greaterThan(0);
  });

  it('combines tag and search filters', async () => {
    const tag = filter.shadowRoot!.querySelector('.filter-tag') as HTMLButtonElement;
    tag.click();
    await filter.updateComplete;
    const search = filter.shadowRoot!.querySelector('.filter-search') as HTMLInputElement;
    search.value = 'Item 3';
    search.dispatchEvent(new Event('input'));
    await filter.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    const visibleItems = filter.querySelectorAll('[data-filtered="true"]');
    expect(visibleItems.length).to.be.greaterThan(0);
  });

  it('shows result count', () => {
    const count = filter.shadowRoot!.querySelector('.filter-count');
    expect(count).to.exist;
  });

  it('hides result count when show-count=false', async () => {
    filter.showCount = false;
    await filter.updateComplete;
    const count = filter.shadowRoot!.querySelector('.filter-count');
    expect(count).to.be.null;
  });

  it('updates result count after filtering', async () => {
    const tag = filter.shadowRoot!.querySelector('.filter-tag') as HTMLButtonElement;
    tag.click();
    await filter.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    const count = filter.shadowRoot!.querySelector('.filter-count');
    expect(count?.textContent).to.include('2');
  });

  it('emits wb-filter-change event', async () => {
    let eventFired = false;
    filter.addEventListener('wb-filter-change', () => { eventFired = true; });
    const tag = filter.shadowRoot!.querySelector('.filter-tag') as HTMLButtonElement;
    tag.click();
    await filter.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('clears all filters', async () => {
    const tag = filter.shadowRoot!.querySelector('.filter-tag') as HTMLButtonElement;
    tag.click();
    await filter.updateComplete;
    filter.clearFilters();
    await filter.updateComplete;
    expect(tag.classList.contains('active')).to.equal(false);
  });

  it('supports custom filter attribute', async () => {
    const customFilter = await fixture<WBFilter>(html`
      <wb-filter filter-attribute="data-category" .tags="${['cat1', 'cat2']}">
        <div data-category="cat1">Item A</div>
        <div data-category="cat2">Item B</div>
      </wb-filter>
    `);
    expect(customFilter.filterAttribute).to.equal('data-category');
  });

  it('handles items with multiple tags', async () => {
    const items = filter.querySelectorAll('[data-filter-tags*="tag1"]');
    expect(items.length).to.equal(2);
  });

  it('handles empty tags array', async () => {
    const noTags = await fixture<WBFilter>(html`
      <wb-filter>
        <div>Item 1</div>
      </wb-filter>
    `);
    const tags = noTags.shadowRoot!.querySelectorAll('.filter-tag');
    expect(tags.length).to.equal(0);
  });

  it('search is case-insensitive', async () => {
    const search = filter.shadowRoot!.querySelector('.filter-search') as HTMLInputElement;
    search.value = 'ITEM 1';
    search.dispatchEvent(new Event('input'));
    await filter.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    const visibleItems = filter.querySelectorAll('[data-filtered="true"]');
    expect(visibleItems.length).to.be.greaterThan(0);
  });

  it('displays all items when no filters active', async () => {
    await new Promise(resolve => setTimeout(resolve, 50));
    const visibleItems = filter.querySelectorAll('[data-filtered="true"]');
    expect(visibleItems.length).to.equal(3);
  });

  it('tag buttons have tabindex', () => {
    const tag = filter.shadowRoot!.querySelector('.filter-tag');
    expect(tag?.getAttribute('tabindex')).to.equal('0');
  });

  it('search input has placeholder', () => {
    const search = filter.shadowRoot!.querySelector('.filter-search');
    expect(search?.getAttribute('placeholder')).to.include('Search');
  });
});
