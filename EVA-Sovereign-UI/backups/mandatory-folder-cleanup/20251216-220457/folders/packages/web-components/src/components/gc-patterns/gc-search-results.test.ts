import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { GCSearchResults } from './gc-search-results';
import type { SearchResult } from './gc-search-results';
import '../../../test/setup';

describe('gc-search-results', () => {
  let element: GCSearchResults;
  const mockResults: SearchResult[] = [
    {
      title: 'Apply for a passport',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports.html',
      description: 'Learn about applying for, renewing, replacing or updating a Canadian passport.',
      date: '2024-01-15',
      breadcrumb: ['Home', 'Travel', 'Passports']
    },
    {
      title: 'Renew your passport',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/renew-adult-passport.html',
      description: 'How to renew your adult Canadian passport by mail or in person.',
      date: '2024-02-20',
      breadcrumb: ['Home', 'Travel', 'Passports', 'Renew']
    }
  ];

  beforeEach(async () => {
    element = await fixture<GCSearchResults>(html`
      <gc-search-results></gc-search-results>
    `);
  });

  it('should render search summary with query', async () => {
    element.query = 'passport';
    element.results = mockResults;
    element.totalResults = 2;
    await element.updateComplete;

    const summary = element.shadowRoot!.querySelector('.search-summary');
    expect(summary).toBeTruthy();
    expect(summary!.textContent).toContain('passport');
  });

  it('should display results count', async () => {
    element.query = 'passport';
    element.results = mockResults;
    element.totalResults = 2;
    await element.updateComplete;

    const resultsCount = element.shadowRoot!.querySelector('.results-count');
    expect(resultsCount).toBeTruthy();
    expect(resultsCount!.textContent).toContain('2');
  });

  it('should render all search results', async () => {
    element.results = mockResults;
    await element.updateComplete;

    const resultItems = element.shadowRoot!.querySelectorAll('.result-item');
    expect(resultItems.length).toBe(mockResults.length);
  });

  it('should display result titles as links', async () => {
    element.results = mockResults;
    await element.updateComplete;

    const links = element.shadowRoot!.querySelectorAll('.result-link');
    expect(links.length).toBe(mockResults.length);
    expect((links[0] as HTMLAnchorElement).textContent).toBe(mockResults[0].title);
    expect((links[0] as HTMLAnchorElement).href).toBe(mockResults[0].url);
  });

  it('should display result descriptions', async () => {
    element.results = mockResults;
    await element.updateComplete;

    const descriptions = element.shadowRoot!.querySelectorAll('.result-description');
    expect(descriptions.length).toBe(mockResults.length);
    expect(descriptions[0].textContent).toBe(mockResults[0].description);
  });

  it('should display breadcrumbs when available', async () => {
    element.results = mockResults;
    await element.updateComplete;

    const breadcrumbs = element.shadowRoot!.querySelectorAll('.result-breadcrumb');
    expect(breadcrumbs.length).toBe(mockResults.length);
  });

  it('should display dates when available', async () => {
    element.results = mockResults;
    await element.updateComplete;

    const dates = element.shadowRoot!.querySelectorAll('.result-date');
    expect(dates.length).toBe(mockResults.length);
  });

  it('should show no results message when results empty', async () => {
    element.query = 'nonexistent';
    element.results = [];
    element.totalResults = 0;
    await element.updateComplete;

    const noResults = element.shadowRoot!.querySelector('.no-results');
    expect(noResults).toBeTruthy();
  });

  it('should display search suggestions when no results', async () => {
    element.query = 'test';
    element.results = [];
    element.totalResults = 0;
    await element.updateComplete;

    const suggestions = element.shadowRoot!.querySelector('.suggestions');
    expect(suggestions).toBeTruthy();
    
    const suggestionItems = suggestions!.querySelectorAll('li');
    expect(suggestionItems.length).toBeGreaterThan(0);
  });

  it('should emit gc-result-click event when result clicked', async () => {
    element.results = mockResults;
    await element.updateComplete;

    let eventFired = false;
    element.addEventListener('gc-result-click', () => {
      eventFired = true;
    });

    const link = element.shadowRoot!.querySelector('.result-link') as HTMLAnchorElement;
    link.click();

    expect(eventFired).toBe(true);
  });

  it('should show pagination when multiple pages', async () => {
    element.results = mockResults;
    element.totalResults = 50;
    element.totalPages = 5;
    await element.updateComplete;

    const pagination = element.shadowRoot!.querySelector('.pagination');
    expect(pagination).toBeTruthy();
  });

  it('should hide pagination when only one page', async () => {
    element.results = mockResults;
    element.totalResults = 2;
    element.totalPages = 1;
    await element.updateComplete;

    const pagination = element.shadowRoot!.querySelector('.pagination');
    expect(pagination).toBeFalsy();
  });

  it('should navigate to next page', async () => {
    element.results = mockResults;
    element.totalResults = 50;
    element.totalPages = 5;
    element.currentPage = 1;
    await element.updateComplete;

    element.nextPage();
    await element.updateComplete;

    expect(element.currentPage).toBe(2);
  });

  it('should navigate to previous page', async () => {
    element.results = mockResults;
    element.totalResults = 50;
    element.totalPages = 5;
    element.currentPage = 2;
    await element.updateComplete;

    element.previousPage();
    await element.updateComplete;

    expect(element.currentPage).toBe(1);
  });

  it('should disable previous button on first page', async () => {
    element.results = mockResults;
    element.totalResults = 50;
    element.totalPages = 5;
    element.currentPage = 1;
    await element.updateComplete;

    const prevButton = element.shadowRoot!.querySelector('.pagination button:first-child') as HTMLButtonElement;
    expect(prevButton.disabled).toBe(true);
  });

  it('should disable next button on last page', async () => {
    element.results = mockResults;
    element.totalResults = 50;
    element.totalPages = 5;
    element.currentPage = 5;
    await element.updateComplete;

    const nextButton = element.shadowRoot!.querySelector('.pagination button:last-child') as HTMLButtonElement;
    expect(nextButton.disabled).toBe(true);
  });

  it('should emit gc-page-change event when page changes', async () => {
    element.results = mockResults;
    element.totalResults = 50;
    element.totalPages = 5;
    element.currentPage = 1;
    await element.updateComplete;

    let eventFired = false;
    element.addEventListener('gc-page-change', () => {
      eventFired = true;
    });

    element.nextPage();
    await element.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('should format dates correctly', async () => {
    element.results = mockResults;
    await element.updateComplete;

    const formattedDate = element['formatDate']('2024-01-15');
    expect(formattedDate).toBeTruthy();
    expect(formattedDate).not.toBe('2024-01-15');
  });

  it('should handle invalid dates gracefully', () => {
    const invalidDate = element['formatDate']('invalid-date');
    expect(invalidDate).toBe('invalid-date');
  });

  it('should have proper ARIA attributes', async () => {
    element.query = 'passport';
    element.results = mockResults;
    await element.updateComplete;

    const summary = element.shadowRoot!.querySelector('.search-summary');
    expect(summary!.getAttribute('role')).toBe('status');
    expect(summary!.getAttribute('aria-live')).toBe('polite');
  });

  it('should support French Canadian locale', async () => {
    element.locale = 'fr-CA';
    element.query = 'passeport';
    element.results = mockResults;
    element.totalResults = 2;
    await element.updateComplete;

    const summary = element.shadowRoot!.querySelector('.search-summary');
    expect(summary!.textContent).toContain('Résultats');
  });

  it('should render breadcrumb separators correctly', async () => {
    element.results = mockResults;
    await element.updateComplete;

    const separators = element.shadowRoot!.querySelectorAll('.breadcrumb-separator');
    expect(separators.length).toBeGreaterThan(0);
  });

  it('should display URL for each result', async () => {
    element.results = mockResults;
    await element.updateComplete;

    const urls = element.shadowRoot!.querySelectorAll('.result-url');
    expect(urls.length).toBe(mockResults.length);
    expect(urls[0].textContent).toBe(mockResults[0].url);
  });

  it('should show correct page info', async () => {
    element.results = mockResults;
    element.totalResults = 50;
    element.totalPages = 5;
    element.currentPage = 2;
    await element.updateComplete;

    const pageInfo = element.shadowRoot!.querySelector('.page-info');
    expect(pageInfo!.textContent).toContain('2');
    expect(pageInfo!.textContent).toContain('5');
  });

  it('should calculate result range correctly', async () => {
    element.results = mockResults;
    element.totalResults = 25;
    element.pageSize = 10;
    element.currentPage = 2;
    await element.updateComplete;

    const resultsCount = element.shadowRoot!.querySelector('.results-count');
    expect(resultsCount!.textContent).toContain('11');
    expect(resultsCount!.textContent).toContain('20');
  });

  it('should handle results without breadcrumbs', async () => {
    const resultsNoBreadcrumb: SearchResult[] = [
      {
        title: 'Test Result',
        url: 'https://example.com',
        description: 'Test description'
      }
    ];
    element.results = resultsNoBreadcrumb;
    await element.updateComplete;

    const breadcrumbs = element.shadowRoot!.querySelectorAll('.result-breadcrumb');
    expect(breadcrumbs.length).toBe(0);
  });

  it('should handle results without dates', async () => {
    const resultsNoDate: SearchResult[] = [
      {
        title: 'Test Result',
        url: 'https://example.com',
        description: 'Test description'
      }
    ];
    element.results = resultsNoDate;
    await element.updateComplete;

    const dates = element.shadowRoot!.querySelectorAll('.result-date');
    expect(dates.length).toBe(0);
  });

  it('should have accessible pagination labels', async () => {
    element.results = mockResults;
    element.totalResults = 50;
    element.totalPages = 5;
    await element.updateComplete;

    const pagination = element.shadowRoot!.querySelector('.pagination');
    expect(pagination!.getAttribute('aria-label')).toBeTruthy();
  });
});
