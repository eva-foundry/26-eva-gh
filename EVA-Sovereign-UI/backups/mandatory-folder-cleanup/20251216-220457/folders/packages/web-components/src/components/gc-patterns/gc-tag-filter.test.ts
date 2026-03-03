import { expect as chaiExpect } from 'chai';
import { fixture, html } from '@open-wc/testing';
import { GCTagFilter } from './gc-tag-filter.js';

import './gc-tag-filter.js';

describe('gc-tag-filter', () => {
  const mockTags = [
    { id: 'benefits', label: 'Benefits', count: 25 },
    { id: 'taxes', label: 'Taxes', count: 18 },
    { id: 'immigration', label: 'Immigration', count: 12 }
  ];

  it('should render tag cloud', async () => {
    const el = await fixture<GCTagFilter>(html`
      <gc-tag-filter .tags="${mockTags}"></gc-tag-filter>
    `);
    const tags = el.shadowRoot!.querySelectorAll('.tag');
    chaiExpect(tags.length).to.equal(3);
  });

  it('should display tag labels', async () => {
    const el = await fixture<GCTagFilter>(html`
      <gc-tag-filter .tags="${mockTags}"></gc-tag-filter>
    `);
    const firstTag = el.shadowRoot!.querySelector('.tag');
    chaiExpect(firstTag?.textContent).to.include('Benefits');
  });

  it('should display tag counts', async () => {
    const el = await fixture<GCTagFilter>(html`
      <gc-tag-filter .tags="${mockTags}"></gc-tag-filter>
    `);
    const firstTag = el.shadowRoot!.querySelector('.tag');
    chaiExpect(firstTag?.textContent).to.include('(25)');
  });

  it('should toggle tag on click', async () => {
    const el = await fixture<GCTagFilter>(html`
      <gc-tag-filter .tags="${mockTags}"></gc-tag-filter>
    `);
    const firstTag = el.shadowRoot!.querySelector('.tag') as HTMLElement;
    firstTag.click();
    await el.updateComplete;

    chaiExpect(firstTag.classList.contains('active')).to.be.true;
  });

  it('should set aria-pressed on active tag', async () => {
    const el = await fixture<GCTagFilter>(html`
      <gc-tag-filter .tags="${mockTags}"></gc-tag-filter>
    `);
    const firstTag = el.shadowRoot!.querySelector('.tag') as HTMLElement;
    firstTag.click();
    await el.updateComplete;

    chaiExpect(firstTag.getAttribute('aria-pressed')).to.equal('true');
  });

  it('should deactivate tag on second click', async () => {
    const el = await fixture<GCTagFilter>(html`
      <gc-tag-filter .tags="${mockTags}"></gc-tag-filter>
    `);
    const firstTag = el.shadowRoot!.querySelector('.tag') as HTMLElement;
    firstTag.click();
    await el.updateComplete;
    firstTag.click();
    await el.updateComplete;

    chaiExpect(firstTag.classList.contains('active')).to.be.false;
  });

  it('should show clear button when tags active', async () => {
    const el = await fixture<GCTagFilter>(html`
      <gc-tag-filter .tags="${mockTags}"></gc-tag-filter>
    `);
    el.toggleTag('benefits');
    await el.updateComplete;

    const clearBtn = el.shadowRoot!.querySelector('.clear-tags-btn');
    chaiExpect(clearBtn).to.exist;
  });

  it('should hide clear button when no tags active', async () => {
    const el = await fixture<GCTagFilter>(html`
      <gc-tag-filter .tags="${mockTags}"></gc-tag-filter>
    `);
    const clearBtn = el.shadowRoot!.querySelector('.clear-tags-btn');
    chaiExpect(clearBtn).to.not.exist;
  });

  it('should clear all tags', async () => {
    const el = await fixture<GCTagFilter>(html`
      <gc-tag-filter .tags="${mockTags}"></gc-tag-filter>
    `);
    el.toggleTag('benefits');
    el.toggleTag('taxes');
    await el.updateComplete;

    el.clearTags();
    await el.updateComplete;

    const activeTags = el.shadowRoot!.querySelectorAll('.tag.active');
    chaiExpect(activeTags.length).to.equal(0);
  });

  it('should emit tag-change event', async () => {
    const el = await fixture<GCTagFilter>(html`
      <gc-tag-filter .tags="${mockTags}"></gc-tag-filter>
    `);
    
    let eventFired = false;
    el.addEventListener('gc-tag-change', (() => {
      eventFired = true;
    }) as EventListener);

    el.toggleTag('benefits');
    await el.updateComplete;

    chaiExpect(eventFired).to.be.true;
  });

  it('should toggle tag with Enter key', async () => {
    const el = await fixture<GCTagFilter>(html`
      <gc-tag-filter .tags="${mockTags}"></gc-tag-filter>
    `);
    const firstTag = el.shadowRoot!.querySelector('.tag') as HTMLElement;
    
    firstTag.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await el.updateComplete;

    chaiExpect(firstTag.classList.contains('active')).to.be.true;
  });

  it('should toggle tag with Space key', async () => {
    const el = await fixture<GCTagFilter>(html`
      <gc-tag-filter .tags="${mockTags}"></gc-tag-filter>
    `);
    const firstTag = el.shadowRoot!.querySelector('.tag') as HTMLElement;
    
    firstTag.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await el.updateComplete;

    chaiExpect(firstTag.classList.contains('active')).to.be.true;
  });

  it('should have role group on tag cloud', async () => {
    const el = await fixture<GCTagFilter>(html`
      <gc-tag-filter .tags="${mockTags}"></gc-tag-filter>
    `);
    const tagCloud = el.shadowRoot!.querySelector('.tag-cloud');
    chaiExpect(tagCloud?.getAttribute('role')).to.equal('group');
  });

  it('should have aria-live region', async () => {
    const el = await fixture<GCTagFilter>(html`
      <gc-tag-filter .tags="${mockTags}"></gc-tag-filter>
    `);
    const liveRegion = el.shadowRoot!.querySelector('[role="status"]');
    chaiExpect(liveRegion?.getAttribute('aria-live')).to.equal('polite');
  });

  it('should handle tags without counts', async () => {
    const tagsNoCount = [
      { id: 'tag1', label: 'Tag 1' },
      { id: 'tag2', label: 'Tag 2' }
    ];

    const el = await fixture<GCTagFilter>(html`
      <gc-tag-filter .tags="${tagsNoCount}"></gc-tag-filter>
    `);
    const firstTag = el.shadowRoot!.querySelector('.tag');
    const count = firstTag?.querySelector('.tag-count');
    chaiExpect(count).to.not.exist;
  });

  it('should handle empty tags array', async () => {
    const el = await fixture<GCTagFilter>(html`
      <gc-tag-filter .tags="${[]}"></gc-tag-filter>
    `);
    const tags = el.shadowRoot!.querySelectorAll('.tag');
    chaiExpect(tags.length).to.equal(0);
  });

  it('should support French Canadian locale', async () => {
    const el = await fixture<GCTagFilter>(html`
      <gc-tag-filter .tags="${mockTags}" locale="fr-CA"></gc-tag-filter>
    `);
    const title = el.shadowRoot!.querySelector('.tag-filter-title');
    chaiExpect(title?.textContent).to.equal('Filtrer par étiquette');
  });

  it('should be accessible', async () => {
    const el = await fixture<GCTagFilter>(html`
      <gc-tag-filter .tags="${mockTags}"></gc-tag-filter>
    `);    
    // Content already provided via mockTags
    await el.updateComplete;
        await chaiExpect(el).to.be.accessible();
  });
});
