import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

export interface SearchResult {
  title: string;
  url: string;
  description: string;
  date?: string;
  breadcrumb?: string[];
}

@customElement('gc-search-results')
export class GCSearchResults extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--eva-fonts-body-family, 'Noto Sans', 'Arial', sans-serif);
    }

    .search-summary {
      padding: var(--eva-spacing-md, 16px);
      background-color: var(--eva-colors-gray-50, #f5f5f5);
      border-left: 4px solid var(--eva-colors-primary, #26374a);
      margin-bottom: var(--eva-spacing-lg, 24px);
    }

    .search-summary h2 {
      margin: 0 0 var(--eva-spacing-xs, 8px) 0;
      font-size: 1.125rem;
      color: var(--eva-colors-gray-900, #333);
    }

    .search-query {
      font-weight: 600;
      color: var(--eva-colors-primary, #26374a);
    }

    .results-count {
      font-size: 0.875rem;
      color: var(--eva-colors-gray-700, #555);
    }

    .results-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .result-item {
      padding: var(--eva-spacing-lg, 24px) 0;
      border-bottom: 1px solid var(--eva-colors-gray-200, #e1e4e7);
    }

    .result-item:last-child {
      border-bottom: none;
    }

    .result-breadcrumb {
      font-size: 0.875rem;
      color: var(--eva-colors-gray-600, #666);
      margin-bottom: var(--eva-spacing-xs, 8px);
    }

    .breadcrumb-separator {
      margin: 0 var(--eva-spacing-xs, 8px);
    }

    .result-title {
      margin: 0 0 var(--eva-spacing-xs, 8px) 0;
    }

    .result-link {
      color: var(--eva-colors-link, #0535d2);
      text-decoration: none;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .result-link:hover {
      text-decoration: underline;
    }

    .result-link:focus {
      outline: 2px solid var(--eva-colors-focus, #26374a);
      outline-offset: 2px;
    }

    .result-link:visited {
      color: var(--eva-colors-link-visited, #7834bc);
    }

    .result-url {
      font-size: 0.875rem;
      color: var(--eva-colors-success, #278400);
      margin-bottom: var(--eva-spacing-xs, 8px);
    }

    .result-description {
      color: var(--eva-colors-gray-800, #444);
      line-height: 1.6;
      margin: 0;
    }

    .result-date {
      font-size: 0.875rem;
      color: var(--eva-colors-gray-600, #666);
      margin-top: var(--eva-spacing-xs, 8px);
    }

    .no-results {
      padding: var(--eva-spacing-xl, 32px);
      text-align: center;
    }

    .no-results h3 {
      color: var(--eva-colors-gray-700, #555);
      margin-bottom: var(--eva-spacing-md, 16px);
    }

    .suggestions {
      text-align: left;
      max-width: 600px;
      margin: 0 auto;
    }

    .suggestions ul {
      list-style-position: inside;
      color: var(--eva-colors-gray-700, #555);
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--eva-spacing-md, 16px);
      margin-top: var(--eva-spacing-xl, 32px);
      padding-top: var(--eva-spacing-lg, 24px);
      border-top: 1px solid var(--eva-colors-gray-200, #e1e4e7);
    }

    .pagination button {
      padding: var(--eva-spacing-sm, 12px) var(--eva-spacing-md, 16px);
      background-color: var(--eva-colors-white, #fff);
      border: 1px solid var(--eva-colors-gray-300, #ccc);
      border-radius: var(--eva-border-radius-sm, 2px);
      cursor: pointer;
      font-size: 1rem;
      color: var(--eva-colors-gray-900, #333);
    }

    .pagination button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .pagination button:not(:disabled):hover {
      background-color: var(--eva-colors-gray-50, #f9f9f9);
    }

    .pagination button:focus {
      outline: 2px solid var(--eva-colors-focus, #26374a);
      outline-offset: 2px;
    }

    .page-info {
      font-size: 0.875rem;
      color: var(--eva-colors-gray-700, #555);
    }

    @media (max-width: 768px) {
      .result-link {
        font-size: 1.125rem;
      }

      .search-summary h2 {
        font-size: 1rem;
      }
    }
  `;

  @property({ type: String })
  query: string = '';

  @property({ type: Array })
  results: SearchResult[] = [];

  @property({ type: Number })
  totalResults: number = 0;

  @property({ type: Number })
  currentPage: number = 1;

  @property({ type: Number })
  pageSize: number = 10;

  @property({ type: Number })
  totalPages: number = 0;

  protected override render() {
    const hasResults = this.results.length > 0;
    const startIndex = (this.currentPage - 1) * this.pageSize + 1;
    const endIndex = Math.min(this.currentPage * this.pageSize, this.totalResults);

    return html`
      ${this.query ? html`
        <div class="search-summary" role="status" aria-live="polite">
          <h2>
            ${this.getMessage('gc-search-results.searchResultsFor')}
            <span class="search-query">"${this.query}"</span>
          </h2>
          <p class="results-count">
            ${hasResults 
              ? this.getMessage('gc-search-results.showingResults')
                  .replace('{start}', startIndex.toString())
                  .replace('{end}', endIndex.toString())
                  .replace('{total}', this.totalResults.toString())
              : this.getMessage('gc-search-results.noResults')}
          </p>
        </div>
      ` : ''}

      ${hasResults ? html`
        <ol class="results-list">
          ${this.results.map(result => html`
            <li class="result-item">
              ${result.breadcrumb && result.breadcrumb.length > 0 ? html`
                <div class="result-breadcrumb" aria-label="${this.getMessage('gc-search-results.breadcrumb')}">
                  ${result.breadcrumb.map((crumb, index) => html`
                    ${index > 0 ? html`<span class="breadcrumb-separator">›</span>` : ''}
                    <span>${crumb}</span>
                  `)}
                </div>
              ` : ''}
              
              <h3 class="result-title">
                <a
                  href="${result.url}"
                  class="result-link"
                  @click="${() => this.emitEvent('gc-result-click', { url: result.url, title: result.title })}"
                >
                  ${result.title}
                </a>
              </h3>
              
              <div class="result-url">${result.url}</div>
              
              <p class="result-description">${result.description}</p>
              
              ${result.date ? html`
                <div class="result-date">
                  ${this.getMessage('gc-search-results.published')}: ${this.formatDate(result.date)}
                </div>
              ` : ''}
            </li>
          `)}
        </ol>

        ${this.totalPages > 1 ? html`
          <nav class="pagination" aria-label="${this.getMessage('gc-search-results.paginationLabel')}">
            <button
              @click="${this.previousPage}"
              ?disabled="${this.currentPage === 1}"
              aria-label="${this.getMessage('gc-search-results.previousPage')}"
            >
              ${this.getMessage('gc-search-results.previous')}
            </button>
            
            <span class="page-info">
              ${this.getMessage('gc-search-results.pageInfo')
                .replace('{current}', this.currentPage.toString())
                .replace('{total}', this.totalPages.toString())}
            </span>
            
            <button
              @click="${this.nextPage}"
              ?disabled="${this.currentPage === this.totalPages}"
              aria-label="${this.getMessage('gc-search-results.nextPage')}"
            >
              ${this.getMessage('gc-search-results.next')}
            </button>
          </nav>
        ` : ''}
      ` : html`
        <div class="no-results">
          <h3>${this.getMessage('gc-search-results.noResultsTitle')}</h3>
          <div class="suggestions">
            <p>${this.getMessage('gc-search-results.suggestions')}</p>
            <ul>
              <li>${this.getMessage('gc-search-results.suggestion1')}</li>
              <li>${this.getMessage('gc-search-results.suggestion2')}</li>
              <li>${this.getMessage('gc-search-results.suggestion3')}</li>
              <li>${this.getMessage('gc-search-results.suggestion4')}</li>
            </ul>
          </div>
        </div>
      `}
    `;
  }

  private formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(this.locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch {
      return dateString;
    }
  }

  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.emitEvent('gc-page-change', { page: this.currentPage });
      this.scrollToTop();
    }
  }

  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.emitEvent('gc-page-change', { page: this.currentPage });
      this.scrollToTop();
    }
  }

  private scrollToTop(): void {
    this.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

registerMessages('gc-search-results', {
  'en-CA': {
    searchResultsFor: 'Search results for',
    showingResults: 'Showing {start} to {end} of {total} results',
    noResults: '0 results found',
    noResultsTitle: 'No results found',
    suggestions: 'Try the following:',
    suggestion1: 'Check your spelling',
    suggestion2: 'Try different or more general keywords',
    suggestion3: 'Remove filters to broaden your search',
    suggestion4: 'Browse by topic to find what you need',
    breadcrumb: 'Breadcrumb navigation',
    published: 'Published',
    paginationLabel: 'Search results pagination',
    previous: 'Previous',
    next: 'Next',
    previousPage: 'Go to previous page',
    nextPage: 'Go to next page',
    pageInfo: 'Page {current} of {total}'
  },
  'fr-CA': {
    searchResultsFor: 'Résultats de recherche pour',
    showingResults: 'Affichage de {start} à {end} sur {total} résultats',
    noResults: '0 résultat trouvé',
    noResultsTitle: 'Aucun résultat trouvé',
    suggestions: 'Essayez ce qui suit :',
    suggestion1: 'Vérifiez votre orthographe',
    suggestion2: 'Essayez des mots-clés différents ou plus généraux',
    suggestion3: 'Supprimez les filtres pour élargir votre recherche',
    suggestion4: 'Parcourez par sujet pour trouver ce dont vous avez besoin',
    breadcrumb: 'Navigation de fil d\'Ariane',
    published: 'Publié',
    paginationLabel: 'Pagination des résultats de recherche',
    previous: 'Précédent',
    next: 'Suivant',
    previousPage: 'Aller à la page précédente',
    nextPage: 'Aller à la page suivante',
    pageInfo: 'Page {current} sur {total}'
  }
});
