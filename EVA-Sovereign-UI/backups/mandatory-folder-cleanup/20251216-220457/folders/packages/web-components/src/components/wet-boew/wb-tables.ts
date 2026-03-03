import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
}

/**
 * WB-Tables - DataTables Integration
 * Sortable, filterable, paginated tables with export functionality
 */
@customElement('wb-tables')
export class WBTables extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .table-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--eva-spacing-md, 1rem);
      gap: var(--eva-spacing-md, 1rem);
      flex-wrap: wrap;
    }

    .table-search {
      flex: 1;
      min-width: 200px;
      padding: var(--eva-spacing-sm, 0.5rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
    }

    .table-export {
      display: flex;
      gap: var(--eva-spacing-xs, 0.25rem);
    }

    .export-btn {
      padding: var(--eva-spacing-sm, 0.5rem) var(--eva-spacing-md, 1rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
      background: var(--eva-colors-background-default, #ffffff);
      cursor: pointer;
    }

    .export-btn:hover {
      background: var(--eva-colors-background-hover, #f5f5f5);
    }

    .export-btn:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
    }

    .table-wrapper {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid var(--eva-colors-border-default, #cccccc);
    }

    th, td {
      padding: var(--eva-spacing-sm, 0.5rem);
      text-align: left;
      border: 1px solid var(--eva-colors-border-default, #cccccc);
    }

    th {
      background: var(--eva-colors-background-secondary, #f5f5f5);
      font-weight: bold;
      position: relative;
    }

    th.sortable {
      cursor: pointer;
      user-select: none;
    }

    th.sortable:hover {
      background: var(--eva-colors-background-hover, #e0e0e0);
    }

    .sort-indicator {
      margin-left: var(--eva-spacing-xs, 0.25rem);
      font-size: 0.8em;
    }

    tr:nth-child(even) {
      background: var(--eva-colors-background-default, #ffffff);
    }

    tr:nth-child(odd) {
      background: var(--eva-colors-background-alt, #f9f9f9);
    }

    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: var(--eva-spacing-md, 1rem);
      gap: var(--eva-spacing-md, 1rem);
      flex-wrap: wrap;
    }

    .pagination-info {
      font-size: 0.9rem;
    }

    .pagination-controls {
      display: flex;
      gap: var(--eva-spacing-xs, 0.25rem);
    }

    .page-btn {
      padding: var(--eva-spacing-xs, 0.25rem) var(--eva-spacing-sm, 0.5rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
      background: var(--eva-colors-background-default, #ffffff);
      cursor: pointer;
    }

    .page-btn:hover:not(:disabled) {
      background: var(--eva-colors-background-hover, #f5f5f5);
    }

    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .page-btn.active {
      background: var(--eva-colors-background-primary, #335075);
      color: #ffffff;
      border-color: var(--eva-colors-background-primary, #335075);
    }

    .page-size-select {
      padding: var(--eva-spacing-xs, 0.25rem) var(--eva-spacing-sm, 0.5rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
    }

    @media (max-width: 768px) {
      table {
        display: block;
      }

      thead {
        display: none;
      }

      tbody {
        display: block;
      }

      tr {
        display: block;
        margin-bottom: var(--eva-spacing-md, 1rem);
        border: 1px solid var(--eva-colors-border-default, #cccccc);
      }

      td {
        display: flex;
        justify-content: space-between;
        padding: var(--eva-spacing-sm, 0.5rem);
        border: none;
        border-bottom: 1px solid var(--eva-colors-border-default, #cccccc);
      }

      td::before {
        content: attr(data-label);
        font-weight: bold;
        margin-right: var(--eva-spacing-sm, 0.5rem);
      }
    }
  `;

  @property({ type: Array })
  data: any[] = [];

  @property({ type: Array })
  columns: TableColumn[] = [];

  @property({ type: Number, attribute: 'page-size' })
  pageSize = 10;

  @property({ type: Boolean })
  sortable = true;

  @property({ type: Boolean })
  filterable = true;

  @property({ type: Boolean })
  exportable = true;

  @state()
  private currentPage = 1;

  @state()
  private searchQuery = '';

  @state()
  private sortColumn: string | null = null;

  @state()
  private sortDirection: 'asc' | 'desc' = 'asc';

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-tables', {
      'en-CA': {
        search: 'Search',
        exportCSV: 'Export CSV',
        exportExcel: 'Export Excel',
        exportPDF: 'Export PDF',
        showing: 'Showing',
        to: 'to',
        of: 'of',
        entries: 'entries',
        previous: 'Previous',
        next: 'Next',
        rowsPerPage: 'Rows per page'
      },
      'fr-CA': {
        search: 'Rechercher',
        exportCSV: 'Exporter CSV',
        exportExcel: 'Exporter Excel',
        exportPDF: 'Exporter PDF',
        showing: 'Affichage de',
        to: 'à',
        of: 'sur',
        entries: 'entrées',
        previous: 'Précédent',
        next: 'Suivant',
        rowsPerPage: 'Lignes par page'
      }
    });
  }

  sort(column: string, direction: 'asc' | 'desc' = 'asc'): void {
    this.sortColumn = column;
    this.sortDirection = direction;
    this.currentPage = 1;
    this.emitEvent('wb-tables-sort', { column, direction });
  }

  filter(query: string): void {
    this.searchQuery = query.toLowerCase();
    this.currentPage = 1;
    this.emitEvent('wb-tables-filter', { query });
  }

  exportCSV(): void {
    const csv = this.toCSV();
    this.downloadFile(csv, 'export.csv', 'text/csv');
    this.emitEvent('wb-tables-export', { format: 'csv', data: this.getFilteredData() });
  }

  exportExcel(): void {
    // Simplified: Export as TSV (Tab-Separated Values) which Excel can open
    const tsv = this.toTSV();
    this.downloadFile(tsv, 'export.xls', 'application/vnd.ms-excel');
    this.emitEvent('wb-tables-export', { format: 'excel', data: this.getFilteredData() });
  }

  exportPDF(): void {
    // Simplified: Export as HTML table that can be printed to PDF
    const html = this.toHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    this.emitEvent('wb-tables-export', { format: 'pdf', data: this.getFilteredData() });
  }

  private toCSV(): string {
    const headers = this.columns.map(col => col.label).join(',');
    const rows = this.getFilteredData().map(row => 
      this.columns.map(col => JSON.stringify(row[col.key] || '')).join(',')
    );
    return [headers, ...rows].join('\n');
  }

  private toTSV(): string {
    const headers = this.columns.map(col => col.label).join('\t');
    const rows = this.getFilteredData().map(row => 
      this.columns.map(col => row[col.key] || '').join('\t')
    );
    return [headers, ...rows].join('\n');
  }

  private toHTML(): string {
    const headers = this.columns.map(col => `<th>${col.label}</th>`).join('');
    const rows = this.getFilteredData().map(row => 
      `<tr>${this.columns.map(col => `<td>${row[col.key] || ''}</td>`).join('')}</tr>`
    ).join('');
    return `
      <!DOCTYPE html>
      <html>
      <head><title>Table Export</title><style>table{border-collapse:collapse;width:100%}th,td{border:1px solid #ccc;padding:8px;text-align:left}th{background:#f5f5f5}</style></head>
      <body><table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></body>
      </html>
    `;
  }

  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  private getFilteredData(): any[] {
    let filtered = [...this.data];

    // Search filter
    if (this.searchQuery) {
      filtered = filtered.filter(row =>
        this.columns.some(col => 
          String(row[col.key] || '').toLowerCase().includes(this.searchQuery)
        )
      );
    }

    // Sort
    if (this.sortColumn) {
      filtered.sort((a, b) => {
        const aVal = a[this.sortColumn!];
        const bVal = b[this.sortColumn!];
        const compare = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return this.sortDirection === 'asc' ? compare : -compare;
      });
    }

    return filtered;
  }

  private getPaginatedData(): any[] {
    const filtered = this.getFilteredData();
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return filtered.slice(start, end);
  }

  private getTotalPages(): number {
    return Math.ceil(this.getFilteredData().length / this.pageSize);
  }

  private handleSort(column: TableColumn): void {
    if (!this.sortable || column.sortable === false) return;

    const newDirection = 
      this.sortColumn === column.key && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sort(column.key, newDirection);
  }

  private handleSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filter(input.value);
  }

  private handlePageChange(page: number): void {
    this.currentPage = page;
  }

  private handlePageSizeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.pageSize = parseInt(select.value, 10);
    this.currentPage = 1;
  }

  private renderSortIndicator(column: TableColumn): string {
    if (this.sortColumn !== column.key) return '';
    return this.sortDirection === 'asc' ? '▲' : '▼';
  }

  override render() {
    const paginatedData = this.getPaginatedData();
    const totalPages = this.getTotalPages();
    const filtered = this.getFilteredData();
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(start + this.pageSize - 1, filtered.length);

    return html`
      <div class="table-controls">
        ${this.filterable ? html`
          <input
            type="text"
            class="table-search"
            placeholder="${this.getMessage('wb-tables', 'search')}..."
            @input="${this.handleSearch}"
          />
        ` : ''}
        ${this.exportable ? html`
          <div class="table-export">
            <button class="export-btn" @click="${this.exportCSV}">
              ${this.getMessage('wb-tables', 'exportCSV')}
            </button>
            <button class="export-btn" @click="${this.exportExcel}">
              ${this.getMessage('wb-tables', 'exportExcel')}
            </button>
            <button class="export-btn" @click="${this.exportPDF}">
              ${this.getMessage('wb-tables', 'exportPDF')}
            </button>
          </div>
        ` : ''}
      </div>

      <div class="table-wrapper">
        <table role="table">
          <thead>
            <tr>
              ${this.columns.map(col => html`
                <th
                  class="${this.sortable && col.sortable !== false ? 'sortable' : ''}"
                  @click="${() => this.handleSort(col)}"
                  aria-sort="${this.sortColumn === col.key ? (this.sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}"
                >
                  ${col.label}
                  <span class="sort-indicator">${this.renderSortIndicator(col)}</span>
                </th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${paginatedData.map(row => html`
              <tr>
                ${this.columns.map(col => html`
                  <td data-label="${col.label}">${row[col.key] || ''}</td>
                `)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <div class="pagination-info">
          ${this.getMessage('wb-tables', 'showing')} ${start} ${this.getMessage('wb-tables', 'to')} ${end} ${this.getMessage('wb-tables', 'of')} ${filtered.length} ${this.getMessage('wb-tables', 'entries')}
        </div>
        <div class="pagination-controls">
          <select class="page-size-select" @change="${this.handlePageSizeChange}">
            <option value="10" ?selected="${this.pageSize === 10}">10 ${this.getMessage('wb-tables', 'rowsPerPage')}</option>
            <option value="25" ?selected="${this.pageSize === 25}">25 ${this.getMessage('wb-tables', 'rowsPerPage')}</option>
            <option value="50" ?selected="${this.pageSize === 50}">50 ${this.getMessage('wb-tables', 'rowsPerPage')}</option>
            <option value="100" ?selected="${this.pageSize === 100}">100 ${this.getMessage('wb-tables', 'rowsPerPage')}</option>
          </select>
          <button
            class="page-btn"
            ?disabled="${this.currentPage === 1}"
            @click="${() => this.handlePageChange(this.currentPage - 1)}"
          >
            ${this.getMessage('wb-tables', 'previous')}
          </button>
          ${Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const page = i + 1;
            return html`
              <button
                class="page-btn ${this.currentPage === page ? 'active' : ''}"
                @click="${() => this.handlePageChange(page)}"
              >
                ${page}
              </button>
            `;
          })}
          <button
            class="page-btn"
            ?disabled="${this.currentPage === totalPages}"
            @click="${() => this.handlePageChange(this.currentPage + 1)}"
          >
            ${this.getMessage('wb-tables', 'next')}
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-tables': WBTables;
  }
}
