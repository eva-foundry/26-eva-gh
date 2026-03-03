import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * GC Pagination Component
 * MANDATORY Government of Canada pagination pattern
 * 
 * Provides accessible multi-page navigation following GC Design System standards.
 * Implements smart page number display with ellipsis for long lists.
 * 
 * Implements: https://design.canada.ca/common-design-patterns/pagination.html
 * 
 * @element gc-pagination
 * 
 * @fires gc-page-change - Fires when user changes page. Detail: { page: number, previousPage: number }
 * 
 * @example
 * ```html
 * <!-- Basic pagination -->
 * <gc-pagination total-pages="10" current-page="1"></gc-pagination>
 * 
 * <!-- With item info -->
 * <gc-pagination 
 *   total-pages="20" 
 *   current-page="5"
 *   total-items="200"
 *   items-per-page="10">
 * </gc-pagination>
 * 
 * <!-- French -->
 * <gc-pagination 
 *   locale="fr-CA"
 *   total-pages="10" 
 *   current-page="3">
 * </gc-pagination>
 * ```
 */
@customElement('gc-pagination')
export class GCPagination extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--eva-spacing-sm, 0.5rem);
      margin: var(--eva-spacing-lg, 1.5rem) 0;
      font-family: var(--eva-fonts-body);
    }

    .pagination-button {
      min-width: 40px;
      height: 40px;
      padding: var(--eva-spacing-xs, 0.25rem) var(--eva-spacing-sm, 0.5rem);
      background: var(--eva-colors-white, #fff);
      border: 1px solid var(--eva-colors-border, #ccc);
      border-radius: 4px;
      color: var(--eva-colors-text, #333);
      font-family: var(--eva-fonts-body);
      font-size: var(--eva-font-size-md, 1rem);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .pagination-button:hover:not(:disabled) {
      background: var(--eva-colors-background-light, #f5f5f5);
      border-color: var(--eva-colors-primary, #26374a);
    }

    .pagination-button:focus {
      outline: 3px solid var(--eva-colors-focus, #269abc);
      outline-offset: 2px;
    }

    .pagination-button:disabled {
      background: var(--eva-colors-background-light, #f5f5f5);
      border-color: var(--eva-colors-border-light, #e8e8e8);
      color: var(--eva-colors-text-light, #999);
      cursor: not-allowed;
      opacity: 0.6;
    }

    .pagination-button.active {
      background: var(--eva-colors-primary, #26374a);
      border-color: var(--eva-colors-primary, #26374a);
      color: var(--eva-colors-white, #fff);
      cursor: default;
    }

    .pagination-button.active:hover {
      background: var(--eva-colors-primary, #26374a);
      border-color: var(--eva-colors-primary, #26374a);
    }

    .pagination-ellipsis {
      min-width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--eva-colors-text, #333);
      font-weight: 600;
    }

    .pagination-info {
      margin-left: var(--eva-spacing-md, 1rem);
      color: var(--eva-colors-text, #333);
      font-size: var(--eva-font-size-sm, 0.875rem);
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    @media (max-width: 768px) {
      .pagination {
        gap: var(--eva-spacing-xs, 0.25rem);
      }

      .pagination-button {
        min-width: 36px;
        height: 36px;
        font-size: var(--eva-font-size-sm, 0.875rem);
      }

      .pagination-ellipsis {
        min-width: 36px;
        height: 36px;
      }

      .pagination-info {
        display: none;
      }
    }

    @media print {
      .pagination {
        display: none;
      }
    }
  `;

  /**
   * Current active page number (1-indexed)
   */
  @property({ type: Number })
  currentPage = 1;

  /**
   * Total number of pages available
   */
  @property({ type: Number })
  totalPages = 1;

  /**
   * Maximum number of page buttons to show before adding ellipsis
   */
  @property({ type: Number })
  maxVisible = 7;

  /**
   * Show item count info text (e.g., "Showing 1 to 10 of 100 items")
   */
  @property({ type: Boolean })
  showInfo = false;

  /**
   * Total number of items across all pages
   */
  @property({ type: Number })
  totalItems = 0;

  /**
   * Number of items displayed per page
   */
  @property({ type: Number })
  itemsPerPage = 10;

  /**
   * Handles page change navigation
   * Fires gc-page-change event with page details
   * @param page - Target page number
   * @private
   */
  private handlePageChange(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }

    this.currentPage = page;

    this.emitEvent('gc-page-change', {
      page,
      totalPages: this.totalPages,
      timestamp: new Date().toISOString()
    });
  }

  private getPageNumbers(): Array<number | 'ellipsis'> {
    if (this.totalPages <= this.maxVisible) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    const pages: Array<number | 'ellipsis'> = [];
    const sidePages = Math.floor((this.maxVisible - 3) / 2);

    pages.push(1);

    if (this.currentPage <= sidePages + 2) {
      for (let i = 2; i <= Math.min(this.maxVisible - 1, this.totalPages - 1); i++) {
        pages.push(i);
      }
      if (this.totalPages > this.maxVisible) {
        pages.push('ellipsis');
      }
    } else if (this.currentPage >= this.totalPages - sidePages - 1) {
      pages.push('ellipsis');
      for (let i = this.totalPages - (this.maxVisible - 2); i < this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push('ellipsis');
      for (let i = this.currentPage - sidePages; i <= this.currentPage + sidePages; i++) {
        pages.push(i);
      }
      pages.push('ellipsis');
    }

    if (pages[pages.length - 1] !== this.totalPages) {
      pages.push(this.totalPages);
    }

    return pages;
  }

  private renderPrevButton() {
    const isDisabled = this.currentPage === 1;
    const prevLabel = this.getMessage('previous');

    return html`
      <button
        class="pagination-button"
        type="button"
        ?disabled="${isDisabled}"
        @click="${() => this.handlePageChange(this.currentPage - 1)}"
        aria-label="${prevLabel}"
      >
        ‹
      </button>
    `;
  }

  private renderNextButton() {
    const isDisabled = this.currentPage === this.totalPages;
    const nextLabel = this.getMessage('next');

    return html`
      <button
        class="pagination-button"
        type="button"
        ?disabled="${isDisabled}"
        @click="${() => this.handlePageChange(this.currentPage + 1)}"
        aria-label="${nextLabel}"
      >
        ›
      </button>
    `;
  }

  private renderPageButton(page: number) {
    const isActive = page === this.currentPage;
    const pageLabel = this.getMessage('page').replace('{page}', String(page));

    return html`
      <button
        class="pagination-button ${isActive ? 'active' : ''}"
        type="button"
        aria-label="${pageLabel}"
        aria-current="${isActive ? 'page' : 'false'}"
        @click="${() => this.handlePageChange(page)}"
      >
        ${page}
      </button>
    `;
  }

  private renderInfo() {
    if (!this.showInfo || this.totalItems === 0) {
      return null;
    }

    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    const infoText = this.getMessage('info')
      .replace('{start}', String(start))
      .replace('{end}', String(end))
      .replace('{total}', String(this.totalItems));

    return html`
      <span class="pagination-info" aria-live="polite">
        ${infoText}
      </span>
    `;
  }

  protected override render() {
    const pages = this.getPageNumbers();
    const navLabel = this.getMessage('navigation');

    return html`
      <nav class="pagination" role="navigation" aria-label="${navLabel}">
        ${this.renderPrevButton()}
        
        ${pages.map(page => 
          page === 'ellipsis'
            ? html`<span class="pagination-ellipsis" aria-hidden="true">…</span>`
            : this.renderPageButton(page as number)
        )}
        
        ${this.renderNextButton()}
        ${this.renderInfo()}
      </nav>
    `;
  }
}

registerMessages('gc-pagination', {
  'en-CA': {
    previous: 'Previous page',
    next: 'Next page',
    page: 'Page {page}',
    navigation: 'Pagination',
    info: 'Showing {start} to {end} of {total} items'
  },
  'fr-CA': {
    previous: 'Page précédente',
    next: 'Page suivante',
    page: 'Page {page}',
    navigation: 'Pagination',
    info: 'Affichage de {start} à {end} sur {total} éléments'
  }
});

declare global {
  interface HTMLElementTagNameMap {
    'gc-pagination': GCPagination;
  }
}
