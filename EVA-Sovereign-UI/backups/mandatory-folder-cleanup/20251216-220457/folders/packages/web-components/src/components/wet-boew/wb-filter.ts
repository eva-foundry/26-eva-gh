import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Filter - Content Filtering
 * Filter content by keywords, tags, categories
 */
@customElement('wb-filter')
export class WBFilter extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .filter-controls {
      display: flex;
      gap: var(--eva-spacing-md, 1rem);
      margin-bottom: var(--eva-spacing-md, 1rem);
      flex-wrap: wrap;
    }

    .filter-search {
      flex: 1;
      min-width: 200px;
      padding: var(--eva-spacing-sm, 0.5rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
    }

    .filter-tags {
      display: flex;
      gap: var(--eva-spacing-xs, 0.25rem);
      flex-wrap: wrap;
    }

    .filter-tag {
      padding: var(--eva-spacing-xs, 0.25rem) var(--eva-spacing-sm, 0.5rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
      background: var(--eva-colors-background-default, #ffffff);
      cursor: pointer;
      user-select: none;
    }

    .filter-tag:hover {
      background: var(--eva-colors-background-hover, #f5f5f5);
    }

    .filter-tag.active {
      background: var(--eva-colors-background-primary, #335075);
      color: #ffffff;
      border-color: var(--eva-colors-background-primary, #335075);
    }

    .filter-tag:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
    }

    .filter-results {
      margin-top: var(--eva-spacing-md, 1rem);
    }

    .filter-count {
      font-size: 0.9rem;
      color: var(--eva-colors-text-secondary, #666666);
      margin-bottom: var(--eva-spacing-sm, 0.5rem);
    }

    ::slotted([data-filtered="false"]) {
      display: none !important;
    }
  `;

  @property({ type: String, attribute: 'filter-attribute' })
  filterAttribute = 'data-filter-tags';

  @property({ type: Array })
  tags: string[] = [];

  @property({ type: Boolean, attribute: 'show-count' })
  showCount = true;

  @state()
  private activeTags: Set<string> = new Set();

  @state()
  private searchQuery = '';

  @state()
  private filteredCount = 0;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-filter', {
      'en-CA': {
        search: 'Search',
        allItems: 'All items',
        showingResults: 'Showing',
        of: 'of',
        results: 'results',
        noResults: 'No results found'
      },
      'fr-CA': {
        search: 'Rechercher',
        allItems: 'Tous les éléments',
        showingResults: 'Affichage de',
        of: 'sur',
        results: 'résultats',
        noResults: 'Aucun résultat trouvé'
      }
    });

    this.updateFilters();
  }

  private handleSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.toLowerCase();
    this.updateFilters();
  }

  private toggleTag(tag: string): void {
    if (this.activeTags.has(tag)) {
      this.activeTags.delete(tag);
    } else {
      this.activeTags.add(tag);
    }
    this.activeTags = new Set(this.activeTags);
    this.updateFilters();
    this.emitEvent('wb-filter-change', { activeTags: Array.from(this.activeTags), searchQuery: this.searchQuery });
  }

  clearFilters(): void {
    this.activeTags.clear();
    this.searchQuery = '';
    this.activeTags = new Set();
    this.updateFilters();
  }

  private updateFilters(): void {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return;

    const elements = slot.assignedElements();
    let visibleCount = 0;

    elements.forEach((element) => {
      const el = element as HTMLElement;
      let visible = true;

      // Tag filter
      if (this.activeTags.size > 0) {
        const itemTags = (el.getAttribute(this.filterAttribute) || '').split(',').map(t => t.trim());
        const hasMatchingTag = Array.from(this.activeTags).some(tag => itemTags.includes(tag));
        if (!hasMatchingTag) {
          visible = false;
        }
      }

      // Search filter
      if (this.searchQuery && visible) {
        const textContent = el.textContent?.toLowerCase() || '';
        if (!textContent.includes(this.searchQuery)) {
          visible = false;
        }
      }

      el.setAttribute('data-filtered', visible ? 'true' : 'false');
      if (visible) visibleCount++;
    });

    this.filteredCount = visibleCount;
    this.requestUpdate();
  }

  override render() {
    return html`
      <div class="filter-controls">
        <input
          type="text"
          class="filter-search"
          placeholder="${this.getMessage('wb-filter', 'search')}..."
          @input="${this.handleSearch}"
          .value="${this.searchQuery}"
        />
      </div>

      ${this.tags.length > 0 ? html`
        <div class="filter-tags">
          ${this.tags.map(tag => html`
            <button
              class="filter-tag ${this.activeTags.has(tag) ? 'active' : ''}"
              @click="${() => this.toggleTag(tag)}"
              tabindex="0"
            >
              ${tag}
            </button>
          `)}
        </div>
      ` : ''}

      ${this.showCount ? html`
        <div class="filter-count">
          ${this.getMessage('wb-filter', 'showingResults')} ${this.filteredCount} ${this.getMessage('wb-filter', 'results')}
        </div>
      ` : ''}

      <div class="filter-results">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-filter': WBFilter;
  }
}
