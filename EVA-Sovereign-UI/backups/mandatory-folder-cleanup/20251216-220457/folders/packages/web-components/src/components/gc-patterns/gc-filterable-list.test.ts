import { expect as chaiExpect } from 'chai';
import { fixture, html } from '@open-wc/testing';
import { GCFilterableList } from './gc-filterable-list.js';

import './gc-filterable-list.js';

describe('gc-filterable-list', () => {
  const mockFilters = [
    {
      id: 'category',
      label: 'Category',
      type: 'checkbox' as const,
      options: [
        { value: 'benefits', label: 'Benefits' },
        { value: 'taxes', label: 'Taxes' }
      ]
    },
    {
      id: 'region',
      label: 'Region',
      type: 'dropdown' as const,
      options: [
        { value: 'on', label: 'Ontario' },
        { value: 'qc', label: 'Quebec' }
      ]
    },
    {
      id: 'search',
      label: 'Search',
      type: 'text' as const
    }
  ];

  const mockItems = [
    { id: 1, category: 'benefits', region: 'on', name: 'Child Benefit' },
    { id: 2, category: 'taxes', region: 'qc', name: 'Income Tax' },
    { id: 3, category: 'benefits', region: 'qc', name: 'Employment Insurance' }
  ];

  it('should render filters section', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .filters="${mockFilters}"></gc-filterable-list>
    `);
    const filtersSection = el.shadowRoot!.querySelector('.filters-section');
    chaiExpect(filtersSection).to.exist;
  });

  it('should display all filter groups', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .filters="${mockFilters}"></gc-filterable-list>
    `);
    const filterGroups = el.shadowRoot!.querySelectorAll('.filter-group');
    chaiExpect(filterGroups.length).to.equal(3);
  });

  it('should render checkbox filter', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .filters="${mockFilters}"></gc-filterable-list>
    `);
    const checkboxes = el.shadowRoot!.querySelectorAll('.filter-checkbox');
    chaiExpect(checkboxes.length).to.equal(2);
  });

  it('should render dropdown filter', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .filters="${mockFilters}"></gc-filterable-list>
    `);
    const select = el.shadowRoot!.querySelector('.filter-select');
    chaiExpect(select).to.exist;
  });

  it('should render text filter', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .filters="${mockFilters}"></gc-filterable-list>
    `);
    const textInput = el.shadowRoot!.querySelector('.filter-input');
    chaiExpect(textInput).to.exist;
  });

  it('should display results count', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .items="${mockItems}" .filters="${mockFilters}"></gc-filterable-list>
    `);
    const resultsCount = el.shadowRoot!.querySelector('.results-count');
    chaiExpect(resultsCount?.textContent).to.include('3');
  });

  it('should show clear filters button when filters active', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .items="${mockItems}" .filters="${mockFilters}"></gc-filterable-list>
    `);
    
    el.applyFilter('category', 'benefits');
    await el.updateComplete;

    const clearBtn = el.shadowRoot!.querySelector('.clear-filters-btn');
    chaiExpect(clearBtn).to.exist;
  });

  it('should hide clear filters button when no filters active', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .items="${mockItems}" .filters="${mockFilters}"></gc-filterable-list>
    `);
    const clearBtn = el.shadowRoot!.querySelector('.clear-filters-btn');
    chaiExpect(clearBtn).to.not.exist;
  });

  it('should filter items by checkbox', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .items="${mockItems}" .filters="${mockFilters}"></gc-filterable-list>
    `);
    
    el.applyFilter('category', ['benefits']);
    await el.updateComplete;

    const filtered = el.getFilteredItems();
    chaiExpect(filtered.length).to.equal(2);
  });

  it('should filter items by dropdown', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .items="${mockItems}" .filters="${mockFilters}"></gc-filterable-list>
    `);
    
    el.applyFilter('region', 'qc');
    await el.updateComplete;

    const filtered = el.getFilteredItems();
    chaiExpect(filtered.length).to.equal(2);
  });

  it('should clear all filters', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .items="${mockItems}" .filters="${mockFilters}"></gc-filterable-list>
    `);
    
    el.applyFilter('category', ['benefits']);
    await el.updateComplete;
    
    el.clearFilters();
    await el.updateComplete;

    const filtered = el.getFilteredItems();
    chaiExpect(filtered.length).to.equal(3);
  });

  it('should emit filter-change event', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .items="${mockItems}" .filters="${mockFilters}"></gc-filterable-list>
    `);
    
    let eventFired = false;
    el.addEventListener('gc-filter-change', (() => {
      eventFired = true;
    }) as EventListener);

    el.applyFilter('category', ['benefits']);
    await el.updateComplete;

    chaiExpect(eventFired).to.be.true;
  });

  it('should sort items ascending', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .items="${mockItems}" .filters="${mockFilters}"></gc-filterable-list>
    `);
    
    el.sort('id', 'asc');
    await el.updateComplete;

    const filtered = el.getFilteredItems();
    chaiExpect(filtered[0].id).to.equal(1);
  });

  it('should sort items descending', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .items="${mockItems}" .filters="${mockFilters}"></gc-filterable-list>
    `);
    
    el.sort('id', 'desc');
    await el.updateComplete;

    const filtered = el.getFilteredItems();
    chaiExpect(filtered[0].id).to.equal(3);
  });

  it('should emit sort-change event', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .items="${mockItems}" .filters="${mockFilters}"></gc-filterable-list>
    `);
    
    let eventFired = false;
    el.addEventListener('gc-sort-change', (() => {
      eventFired = true;
    }) as EventListener);

    el.sort('id', 'asc');
    await el.updateComplete;

    chaiExpect(eventFired).to.be.true;
  });

  it('should have aria-live region for results count', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .items="${mockItems}" .filters="${mockFilters}"></gc-filterable-list>
    `);
    const resultsCount = el.shadowRoot!.querySelector('.results-count');
    chaiExpect(resultsCount?.getAttribute('aria-live')).to.equal('polite');
  });

  it('should handle empty items array', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .items="${[]}" .filters="${mockFilters}"></gc-filterable-list>
    `);
    const resultsCount = el.shadowRoot!.querySelector('.results-count');
    chaiExpect(resultsCount?.textContent).to.include('0');
  });

  it('should handle empty filters array', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .items="${mockItems}" .filters="${[]}"></gc-filterable-list>
    `);
    const filterGroups = el.shadowRoot!.querySelectorAll('.filter-group');
    chaiExpect(filterGroups.length).to.equal(0);
  });

  it('should support French Canadian locale', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list 
        .items="${mockItems}" 
        .filters="${mockFilters}"
        locale="fr-CA"
      ></gc-filterable-list>
    `);
    const title = el.shadowRoot!.querySelector('.filters-title');
    chaiExpect(title?.textContent).to.equal('Filtres');
  });

  it('should be accessible', async () => {
    const el = await fixture<GCFilterableList>(html`
      <gc-filterable-list .items="${mockItems}" .filters="${mockFilters}"></gc-filterable-list>
    `);    
    // Content already provided via mockItems and mockFilters
    await el.updateComplete;
        await chaiExpect(el).to.be.accessible();
  });
});
