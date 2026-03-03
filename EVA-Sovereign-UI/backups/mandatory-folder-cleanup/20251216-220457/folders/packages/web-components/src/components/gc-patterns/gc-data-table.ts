import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

export interface TableColumn {
  id: string;
  label: string;
  sortable: boolean;
  filterable: boolean;
  width?: string;
}

@customElement('gc-data-table')
export class GCDataTable extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--eva-fonts-body-family, 'Noto Sans', 'Arial', sans-serif);
      overflow-x: auto;
    }

    .table-container {
      position: relative;
      overflow-x: auto;
      border: 1px solid var(--eva-colors-gray-200, #e1e4e7);
      border-radius: var(--eva-border-radius-md, 4px);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 600px;
    }

    thead {
      position: sticky;
      top: 0;
      z-index: 10;
      background-color: var(--eva-colors-gray-50, #f5f5f5);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    th {
      padding: var(--eva-spacing-md, 16px);
      text-align: left;
      font-weight: 600;
      color: var(--eva-colors-gray-900, #333);
      border-bottom: 2px solid var(--eva-colors-gray-300, #ccc);
      white-space: nowrap;
    }

    th.sortable {
      cursor: pointer;
      user-select: none;
    }

    th.sortable:hover {
      background-color: var(--eva-colors-gray-100, #e8e8e8);
    }

    .sort-header {
      display: flex;
      align-items: center;
      gap: var(--eva-spacing-xs, 8px);
    }

    .sort-indicator {
      font-size: 12px;
      opacity: 0.5;
    }

    .sort-indicator.active {
      opacity: 1;
      color: var(--eva-colors-primary, #26374a);
    }

    .filter-row {
      background-color: var(--eva-colors-white, #fff);
    }

    .filter-input {
      width: 100%;
      padding: var(--eva-spacing-xs, 8px);
      border: 1px solid var(--eva-colors-gray-300, #ccc);
      border-radius: var(--eva-border-radius-sm, 2px);
      font-size: 14px;
    }

    .filter-input:focus {
      outline: 2px solid var(--eva-colors-focus, #26374a);
      outline-offset: 2px;
    }

    td {
      padding: var(--eva-spacing-md, 16px);
      border-bottom: 1px solid var(--eva-colors-gray-200, #e1e4e7);
    }

    tbody tr:hover {
      background-color: var(--eva-colors-gray-50, #f9f9f9);
    }

    tbody tr.selected {
      background-color: var(--eva-colors-primary-50, #e6f0f7);
    }

    .checkbox {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    .bulk-actions {
      padding: var(--eva-spacing-md, 16px);
      background-color: var(--eva-colors-primary-50, #e6f0f7);
      border-bottom: 1px solid var(--eva-colors-gray-200, #e1e4e7);
      display: flex;
      gap: var(--eva-spacing-sm, 12px);
      align-items: center;
    }

    .bulk-actions button {
      padding: var(--eva-spacing-xs, 8px) var(--eva-spacing-md, 16px);
      background-color: var(--eva-colors-white, #fff);
      border: 1px solid var(--eva-colors-gray-300, #ccc);
      border-radius: var(--eva-border-radius-sm, 2px);
      cursor: pointer;
      font-size: 14px;
    }

    .bulk-actions button:hover {
      background-color: var(--eva-colors-gray-50, #f9f9f9);
    }

    .bulk-actions button:focus {
      outline: 2px solid var(--eva-colors-focus, #26374a);
      outline-offset: 2px;
    }

    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--eva-spacing-md, 16px);
      background-color: var(--eva-colors-gray-50, #f5f5f5);
      border-top: 1px solid var(--eva-colors-gray-200, #e1e4e7);
    }

    .pagination-info {
      font-size: 14px;
      color: var(--eva-colors-gray-700, #555);
    }

    .pagination-controls {
      display: flex;
      gap: var(--eva-spacing-xs, 8px);
    }

    .pagination-controls button {
      padding: var(--eva-spacing-xs, 8px) var(--eva-spacing-md, 16px);
      background-color: var(--eva-colors-white, #fff);
      border: 1px solid var(--eva-colors-gray-300, #ccc);
      border-radius: var(--eva-border-radius-sm, 2px);
      cursor: pointer;
      font-size: 14px;
    }

    .pagination-controls button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .pagination-controls button:not(:disabled):hover {
      background-color: var(--eva-colors-gray-50, #f9f9f9);
    }

    .pagination-controls button:focus {
      outline: 2px solid var(--eva-colors-focus, #26374a);
      outline-offset: 2px;
    }

    .no-data {
      padding: var(--eva-spacing-xl, 32px);
      text-align: center;
      color: var(--eva-colors-gray-600, #666);
    }

    @media (max-width: 768px) {
      th, td {
        padding: var(--eva-spacing-sm, 12px);
        font-size: 14px;
      }
    }
  `;

  @property({ type: Array })
  columns: TableColumn[] = [];

  @property({ type: Array })
  rows: Array<Record<string, unknown>> = [];

  @property({ type: String })
  sortColumn?: string;

  @property({ type: String })
  sortOrder: 'asc' | 'desc' = 'asc';

  @property({ type: Number })
  currentPage: number = 1;

  @property({ type: Number })
  pageSize: number = 25;

  @state()
  private filters: Map<string, string> = new Map();

  @state()
  private selectedRows: Set<number> = new Set();

  protected override render() {
    const filteredRows = this.getFilteredRows();
    const sortedRows = this.getSortedRows(filteredRows);
    const paginatedRows = this.getPaginatedRows(sortedRows);
    const totalPages = Math.ceil(sortedRows.length / this.pageSize);

    return html`
      ${this.selectedRows.size > 0 ? html`
        <div class="bulk-actions">
          <span>${this.getMessage('gc-data-table.selectedCount').replace('{count}', this.selectedRows.size.toString())}</span>
          <button @click="${this.handleExportCSV}">${this.getMessage('gc-data-table.exportCSV')}</button>
          <button @click="${this.clearSelection}">${this.getMessage('gc-data-table.clearSelection')}</button>
        </div>
      ` : ''}

      <div class="table-container">
        <table role="grid" aria-label="${this.getMessage('gc-data-table.ariaLabel')}">
          <thead>
            <tr role="row">
              <th role="columnheader">
                <input
                  type="checkbox"
                  class="checkbox"
                  aria-label="${this.getMessage('gc-data-table.selectAll')}"
                  @change="${this.handleSelectAll}"
                  .checked="${this.selectedRows.size === paginatedRows.length && paginatedRows.length > 0}"
                />
              </th>
              ${this.columns.map(column => html`
                <th
                  role="columnheader"
                  class="${column.sortable ? 'sortable' : ''}"
                  style="${column.width ? `width: ${column.width}` : ''}"
                  @click="${column.sortable ? () => this.handleSort(column.id) : undefined}"
                  @keydown="${column.sortable ? (e: KeyboardEvent) => this.handleHeaderKeydown(e, column.id) : undefined}"
                  tabindex="${column.sortable ? '0' : '-1'}"
                  aria-sort="${this.sortColumn === column.id ? (this.sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}"
                >
                  <div class="sort-header">
                    ${column.label}
                    ${column.sortable ? html`
                      <span class="sort-indicator ${this.sortColumn === column.id ? 'active' : ''}">
                        ${this.sortColumn === column.id ? (this.sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                      </span>
                    ` : ''}
                  </div>
                </th>
              `)}
            </tr>
            <tr class="filter-row" role="row">
              <th role="columnheader"></th>
              ${this.columns.map(column => html`
                <th role="columnheader">
                  ${column.filterable ? html`
                    <input
                      type="text"
                      class="filter-input"
                      placeholder="${this.getMessage('gc-data-table.filterPlaceholder')}"
                      aria-label="${this.getMessage('gc-data-table.filterLabel').replace('{column}', column.label)}"
                      @input="${(e: InputEvent) => this.handleFilter(column.id, (e.target as HTMLInputElement).value)}"
                      .value="${this.filters.get(column.id) || ''}"
                    />
                  ` : ''}
                </th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${paginatedRows.length === 0 ? html`
              <tr>
                <td colspan="${this.columns.length + 1}" class="no-data">
                  ${this.getMessage('gc-data-table.noData')}
                </td>
              </tr>
            ` : paginatedRows.map((row, index) => {
              const absoluteIndex = (this.currentPage - 1) * this.pageSize + index;
              const isSelected = this.selectedRows.has(absoluteIndex);
              return html`
                <tr role="row" class="${isSelected ? 'selected' : ''}">
                  <td role="gridcell">
                    <input
                      type="checkbox"
                      class="checkbox"
                      aria-label="${this.getMessage('gc-data-table.selectRow')}"
                      @change="${() => this.handleRowSelect(absoluteIndex)}"
                      .checked="${isSelected}"
                    />
                  </td>
                  ${this.columns.map(column => html`
                    <td role="gridcell">${row[column.id] ?? ''}</td>
                  `)}
                </tr>
              `;
            })}
          </tbody>
        </table>
      </div>

      ${totalPages > 1 ? html`
        <div class="pagination">
          <div class="pagination-info">
            ${this.getMessage('gc-data-table.paginationInfo')
              .replace('{start}', ((this.currentPage - 1) * this.pageSize + 1).toString())
              .replace('{end}', Math.min(this.currentPage * this.pageSize, sortedRows.length).toString())
              .replace('{total}', sortedRows.length.toString())}
          </div>
          <div class="pagination-controls">
            <button
              @click="${this.previousPage}"
              ?disabled="${this.currentPage === 1}"
              aria-label="${this.getMessage('gc-data-table.previousPage')}"
            >
              ${this.getMessage('gc-data-table.previous')}
            </button>
            <span>${this.getMessage('gc-data-table.pageInfo').replace('{current}', this.currentPage.toString()).replace('{total}', totalPages.toString())}</span>
            <button
              @click="${this.nextPage}"
              ?disabled="${this.currentPage === totalPages}"
              aria-label="${this.getMessage('gc-data-table.nextPage')}"
            >
              ${this.getMessage('gc-data-table.next')}
            </button>
          </div>
        </div>
      ` : ''}
    `;
  }

  private getFilteredRows(): Array<Record<string, unknown>> {
    if (this.filters.size === 0) {
      return this.rows;
    }

    return this.rows.filter(row => {
      for (const [columnId, filterValue] of this.filters.entries()) {
        const cellValue = String(row[columnId] || '').toLowerCase();
        if (!cellValue.includes(filterValue.toLowerCase())) {
          return false;
        }
      }
      return true;
    });
  }

  private getSortedRows(rows: Array<Record<string, unknown>>): Array<Record<string, unknown>> {
    if (!this.sortColumn) {
      return rows;
    }

    return [...rows].sort((a, b) => {
      const aValue = a[this.sortColumn!] as string | number;
      const bValue = b[this.sortColumn!] as string | number;

      if (aValue === bValue) return 0;

      const comparison = aValue > bValue ? 1 : -1;
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  private getPaginatedRows(rows: Array<Record<string, unknown>>): Array<Record<string, unknown>> {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return rows.slice(start, end);
  }

  private handleSort(columnId: string): void {
    if (this.sortColumn === columnId) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = columnId;
      this.sortOrder = 'asc';
    }

    this.emitEvent('gc-table-sort', {
      column: columnId,
      order: this.sortOrder
    });

    this.announce(this.getMessage('gc-data-table.sortAnnouncement')
      .replace('{column}', this.columns.find(c => c.id === columnId)?.label || columnId)
      .replace('{order}', this.sortOrder === 'asc' 
        ? this.getMessage('gc-data-table.ascending') 
        : this.getMessage('gc-data-table.descending')));
  }

  private handleHeaderKeydown(e: KeyboardEvent, columnId: string): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleSort(columnId);
    }
  }

  private handleFilter(columnId: string, value: string): void {
    if (value) {
      this.filters.set(columnId, value);
    } else {
      this.filters.delete(columnId);
    }
    this.currentPage = 1;
    this.filters = new Map(this.filters);

    this.emitEvent('gc-table-filter', {
      column: columnId,
      value
    });
  }

  private handleRowSelect(rowIndex: number): void {
    if (this.selectedRows.has(rowIndex)) {
      this.selectedRows.delete(rowIndex);
    } else {
      this.selectedRows.add(rowIndex);
    }
    this.selectedRows = new Set(this.selectedRows);

    this.emitEvent('gc-row-select', {
      selectedRows: Array.from(this.selectedRows)
    });
  }

  private handleSelectAll(e: Event): void {
    const checked = (e.target as HTMLInputElement).checked;
    const filteredRows = this.getFilteredRows();
    const sortedRows = this.getSortedRows(filteredRows);
    const paginatedRows = this.getPaginatedRows(sortedRows);

    if (checked) {
      paginatedRows.forEach((_, index) => {
        const absoluteIndex = (this.currentPage - 1) * this.pageSize + index;
        this.selectedRows.add(absoluteIndex);
      });
    } else {
      paginatedRows.forEach((_, index) => {
        const absoluteIndex = (this.currentPage - 1) * this.pageSize + index;
        this.selectedRows.delete(absoluteIndex);
      });
    }
    this.selectedRows = new Set(this.selectedRows);

    this.emitEvent('gc-row-select', {
      selectedRows: Array.from(this.selectedRows)
    });
  }

  private clearSelection(): void {
    this.selectedRows.clear();
    this.selectedRows = new Set(this.selectedRows);

    this.emitEvent('gc-row-select', {
      selectedRows: []
    });
  }

  private handleExportCSV(): void {
    const selectedData = this.rows.filter((_, index) => this.selectedRows.has(index));
    const csvContent = this.convertToCSV(selectedData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private convertToCSV(data: Array<Record<string, unknown>>): string {
    const headers = this.columns.map(c => c.label).join(',');
    const rows = data.map(row => 
      this.columns.map(col => {
        const value = row[col.id];
        const stringValue = String(value ?? '');
        return stringValue.includes(',') ? `"${stringValue}"` : stringValue;
      }).join(',')
    );
    return [headers, ...rows].join('\n');
  }

  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  public nextPage(): void {
    const filteredRows = this.getFilteredRows();
    const sortedRows = this.getSortedRows(filteredRows);
    const totalPages = Math.ceil(sortedRows.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  public sort(columnId: string): void {
    this.handleSort(columnId);
  }

  public filter(columnId: string, value: string): void {
    this.handleFilter(columnId, value);
  }

  public selectRow(rowIndex: number): void {
    this.handleRowSelect(rowIndex);
  }

  public selectAllRows(): void {
    this.rows.forEach((_, index) => {
      this.selectedRows.add(index);
    });
    this.selectedRows = new Set(this.selectedRows);

    this.emitEvent('gc-row-select', {
      selectedRows: Array.from(this.selectedRows)
    });
  }

  public exportCSV(): void {
    this.handleExportCSV();
  }
}

registerMessages('gc-data-table', {
  'en-CA': {
    ariaLabel: 'Data table',
    selectAll: 'Select all rows',
    selectRow: 'Select row',
    filterPlaceholder: 'Filter...',
    filterLabel: 'Filter {column}',
    noData: 'No data available',
    selectedCount: '{count} rows selected',
    exportCSV: 'Export CSV',
    clearSelection: 'Clear selection',
    paginationInfo: 'Showing {start} to {end} of {total} entries',
    previous: 'Previous',
    next: 'Next',
    previousPage: 'Go to previous page',
    nextPage: 'Go to next page',
    pageInfo: 'Page {current} of {total}',
    sortAnnouncement: 'Table sorted by {column} in {order} order',
    ascending: 'ascending',
    descending: 'descending'
  },
  'fr-CA': {
    ariaLabel: 'Tableau de données',
    selectAll: 'Sélectionner toutes les lignes',
    selectRow: 'Sélectionner la ligne',
    filterPlaceholder: 'Filtrer...',
    filterLabel: 'Filtrer {column}',
    noData: 'Aucune donnée disponible',
    selectedCount: '{count} lignes sélectionnées',
    exportCSV: 'Exporter CSV',
    clearSelection: 'Effacer la sélection',
    paginationInfo: 'Affichage de {start} à {end} sur {total} entrées',
    previous: 'Précédent',
    next: 'Suivant',
    previousPage: 'Aller à la page précédente',
    nextPage: 'Aller à la page suivante',
    pageInfo: 'Page {current} sur {total}',
    sortAnnouncement: 'Tableau trié par {column} en ordre {order}',
    ascending: 'croissant',
    descending: 'décroissant'
  }
});
