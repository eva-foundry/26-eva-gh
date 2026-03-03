import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

export interface FilterOption {
  value: string;
  label: string;
}

export interface Filter {
  id: string;
  label: string;
  type: 'checkbox' | 'dropdown' | 'text';
  options?: FilterOption[];
}

export interface ActiveFilter {
  filterId: string;
  value: string | string[];
}

@customElement('gc-filterable-list')
export class GCFilterableList extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--eva-fonts-family-base, 'Lato', sans-serif);
    }

    .filterable-list {
      display: grid;
      gap: var(--eva-spacing-lg, 16px);
    }

    .filters-section {
      background: var(--eva-colors-surface-secondary, #f5f5f5);
      border: 1px solid var(--eva-colors-border-primary, #e1e4e7);
      border-radius: 4px;
      padding: var(--eva-spacing-lg, 16px);
    }

    .filters-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--eva-spacing-md, 12px);
    }

    .filters-title {
      font-size: var(--eva-fonts-size-lg, 1.125rem);
      font-weight: var(--eva-fonts-weight-bold, 700);
      margin: 0;
    }

    .clear-filters-btn {
      background: none;
      border: none;
      color: var(--eva-colors-primary, #26374a);
      cursor: pointer;
      font-size: var(--eva-fonts-size-sm, 0.875rem);
      text-decoration: underline;
      padding: var(--eva-spacing-xs, 4px);
    }

    .clear-filters-btn:hover {
      color: var(--eva-colors-primary-dark, #1a2633);
    }

    .clear-filters-btn:focus-visible {
      outline: 3px solid var(--eva-colors-focus, #0535d2);
      outline-offset: 2px;
    }

    .filters-grid {
      display: grid;
      gap: var(--eva-spacing-md, 12px);
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: var(--eva-spacing-xs, 4px);
    }

    .filter-label {
      font-weight: var(--eva-fonts-weight-bold, 700);
      font-size: var(--eva-fonts-size-sm, 0.875rem);
      color: var(--eva-colors-text-primary, #333);
    }

    .filter-input,
    .filter-select {
      padding: var(--eva-spacing-sm, 8px);
      border: 1px solid var(--eva-colors-border-primary, #e1e4e7);
      border-radius: 4px;
      font-family: inherit;
      font-size: var(--eva-fonts-size-base, 1rem);
    }

    .filter-input:focus,
    .filter-select:focus {
      outline: 3px solid var(--eva-colors-focus, #0535d2);
      outline-offset: 2px;
    }

    .filter-checkbox-group {
      display: flex;
      flex-direction: column;
      gap: var(--eva-spacing-xs, 4px);
    }

    .filter-checkbox-label {
      display: flex;
      align-items: center;
      gap: var(--eva-spacing-sm, 8px);
      cursor: pointer;
    }

    .filter-checkbox {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--eva-spacing-md, 12px) 0;
      border-bottom: 2px solid var(--eva-colors-border-primary, #e1e4e7);
    }

    .results-count {
      font-size: var(--eva-fonts-size-base, 1rem);
      color: var(--eva-colors-text-secondary, #666);
    }

    .sort-controls {
      display: flex;
      align-items: center;
      gap: var(--eva-spacing-sm, 8px);
    }

    .sort-label {
      font-size: var(--eva-fonts-size-sm, 0.875rem);
      color: var(--eva-colors-text-secondary, #666);
    }

    .results-list {
      margin-top: var(--eva-spacing-md, 12px);
    }

    @media (max-width: 768px) {
      .filters-grid {
        grid-template-columns: 1fr;
      }

      .results-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--eva-spacing-sm, 8px);
      }
    }
  `;

  @property({ type: Array })
  items: Record<string, unknown>[] = [];

  @property({ type: Array })
  filters: Filter[] = [];

  @property({ type: String })
  sortBy: string = '';

  @property({ type: String })
  sortOrder: 'asc' | 'desc' = 'asc';

  @state()
  private activeFilters: ActiveFilter[] = [];

  @state()
  private filteredItems: Record<string, unknown>[] = [];

  protected override firstUpdated(): void {
    this.filteredItems = [...this.items];
  }

  /**
   * Apply a filter
   */
  public applyFilter(filterId: string, value: string | string[]): void {
    const existingIndex = this.activeFilters.findIndex(f => f.filterId === filterId);
    
    if (existingIndex >= 0) {
      this.activeFilters[existingIndex] = { filterId, value };
    } else {
      this.activeFilters = [...this.activeFilters, { filterId, value }];
    }

    this.updateFilteredItems();
    this.emitEvent('gc-filter-change', {
      activeFilters: this.activeFilters,
      resultCount: this.filteredItems.length
    });
    this.announce(
      this.getMessage('resultsUpdated')
        .replace('{count}', this.filteredItems.length.toString())
    );
  }

  /**
   * Clear all filters
   */
  public clearFilters(): void {
    this.activeFilters = [];
    this.updateFilteredItems();
    this.emitEvent('gc-filter-change', {
      activeFilters: [],
      resultCount: this.filteredItems.length
    });
    this.announce(this.getMessage('filtersCleared'));
  }

  /**
   * Sort the list
   */
  public sort(field: string, order: 'asc' | 'desc'): void {
    this.sortBy = field;
    this.sortOrder = order;
    this.updateFilteredItems();
    this.emitEvent('gc-sort-change', {
      sortBy: field,
      sortOrder: order
    });
  }

  /**
   * Get filtered items (public API)
   */
  public getFilteredItems(): Record<string, unknown>[] {
    return this.filteredItems;
  }

  /**
   * Update filtered items based on active filters
   */
  private updateFilteredItems(): void {
    let filtered = [...this.items];

    // Apply filters
    this.activeFilters.forEach(activeFilter => {
      const filter = this.filters.find(f => f.id === activeFilter.filterId);
      if (!filter) return;

      filtered = filtered.filter(item => {
        const itemValue = item[filter.id];
        
        if (filter.type === 'checkbox') {
          const values = Array.isArray(activeFilter.value) ? activeFilter.value : [activeFilter.value];
          return values.length === 0 || values.includes(String(itemValue));
        } else if (filter.type === 'text') {
          const searchText = String(activeFilter.value).toLowerCase();
          return String(itemValue).toLowerCase().includes(searchText);
        } else {
          return String(itemValue) === String(activeFilter.value);
        }
      });
    });

    // Apply sorting
    if (this.sortBy) {
      filtered.sort((a, b) => {
        const aVal = a[this.sortBy] as string | number;
        const bVal = b[this.sortBy] as string | number;
        
        if (aVal < bVal) return this.sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.filteredItems = filtered;
    this.requestUpdate();
  }

  private handleCheckboxChange(filterId: string, value: string, checked: boolean): void {
    const existing = this.activeFilters.find(f => f.filterId === filterId);
    let values: string[] = [];

    if (existing) {
      values = Array.isArray(existing.value) ? [...existing.value] : [String(existing.value)];
    }

    if (checked) {
      values.push(value);
    } else {
      values = values.filter(v => v !== value);
    }

    this.applyFilter(filterId, values);
  }

  private handleDropdownChange(filterId: string, event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.applyFilter(filterId, target.value);
  }

  private handleTextChange(filterId: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    this.applyFilter(filterId, target.value);
  }

  protected override render() {
    const hasActiveFilters = this.activeFilters.length > 0;

    return html`
      <div class="filterable-list">
        <!-- Filters Section -->
        <div class="filters-section">
          <div class="filters-header">
            <h2 class="filters-title">${this.getMessage('filters')}</h2>
            ${hasActiveFilters ? html`
              <button class="clear-filters-btn" @click="${this.clearFilters}">
                ${this.getMessage('clearFilters')}
              </button>
            ` : ''}
          </div>

          <div class="filters-grid">
            ${this.filters.map(filter => html`
              <div class="filter-group">
                <label class="filter-label">${filter.label}</label>
                
                ${filter.type === 'checkbox' ? html`
                  <div class="filter-checkbox-group">
                    ${filter.options?.map(option => html`
                      <label class="filter-checkbox-label">
                        <input
                          type="checkbox"
                          class="filter-checkbox"
                          value="${option.value}"
                          @change="${(e: Event) => 
                            this.handleCheckboxChange(filter.id, option.value, (e.target as HTMLInputElement).checked)
                          }"
                        />
                        <span>${option.label}</span>
                      </label>
                    `)}
                  </div>
                ` : filter.type === 'dropdown' ? html`
                  <select class="filter-select" @change="${(e: Event) => this.handleDropdownChange(filter.id, e)}">
                    <option value="">${this.getMessage('selectOption')}</option>
                    ${filter.options?.map(option => html`
                      <option value="${option.value}">${option.label}</option>
                    `)}
                  </select>
                ` : html`
                  <input
                    type="text"
                    class="filter-input"
                    placeholder="${this.getMessage('searchPlaceholder')}"
                    @input="${(e: Event) => this.handleTextChange(filter.id, e)}"
                  />
                `}
              </div>
            `)}
          </div>
        </div>

        <!-- Results Section -->
        <div class="results-section">
          <div class="results-header">
            <div class="results-count" role="status" aria-live="polite">
              ${this.getMessage('showingResults')
                .replace('{count}', this.filteredItems.length.toString())
                .replace('{total}', this.items.length.toString())}
            </div>
          </div>

          <div class="results-list">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

registerMessages('gc-filterable-list', {
  'en-CA': {
    filters: 'Filters',
    clearFilters: 'Clear all filters',
    selectOption: 'Select an option',
    searchPlaceholder: 'Search...',
    showingResults: 'Showing {count} of {total} results',
    resultsUpdated: 'Results updated: {count} items found',
    filtersCleared: 'All filters cleared'
  },
  'fr-CA': {
    filters: 'Filtres',
    clearFilters: 'Effacer tous les filtres',
    selectOption: 'Sélectionner une option',
    searchPlaceholder: 'Rechercher...',
    showingResults: 'Affichage de {count} sur {total} résultats',
    resultsUpdated: 'Résultats mis à jour : {count} éléments trouvés',
    filtersCleared: 'Tous les filtres effacés'
  }
});
