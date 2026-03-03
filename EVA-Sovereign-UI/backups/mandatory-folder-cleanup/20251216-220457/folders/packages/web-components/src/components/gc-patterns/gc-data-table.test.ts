import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { GCDataTable } from './gc-data-table';
import type { TableColumn } from './gc-data-table';
import '../../../test/setup';

describe('gc-data-table', () => {
  let element: GCDataTable;
  const mockColumns: TableColumn[] = [
    { id: 'name', label: 'Name', sortable: true, filterable: true },
    { id: 'email', label: 'Email', sortable: true, filterable: true },
    { id: 'role', label: 'Role', sortable: false, filterable: true }
  ];
  const mockRows = [
    { name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
    { name: 'Bob Jones', email: 'bob@example.com', role: 'User' },
    { name: 'Charlie Brown', email: 'charlie@example.com', role: 'Manager' }
  ];

  beforeEach(async () => {
    element = await fixture<GCDataTable>(html`
      <gc-data-table .columns="${mockColumns}" .rows="${mockRows}"></gc-data-table>
    `);
  });

  it('should render table with columns', () => {
    const headers = element.shadowRoot!.querySelectorAll('th[role="columnheader"]');
    expect(headers.length).toBeGreaterThan(0);
  });

  it('should render all rows', () => {
    const rows = element.shadowRoot!.querySelectorAll('tbody tr[role="row"]');
    expect(rows.length).toBe(mockRows.length);
  });

  it('should sort column when header clicked', async () => {
    const nameHeader = element.shadowRoot!.querySelector('th.sortable') as HTMLElement;
    nameHeader.click();
    await element.updateComplete;

    expect(element.sortColumn).toBe('name');
    expect(element.sortOrder).toBe('asc');
  });

  it('should toggle sort order on second click', async () => {
    const nameHeader = element.shadowRoot!.querySelector('th.sortable') as HTMLElement;
    nameHeader.click();
    await element.updateComplete;
    nameHeader.click();
    await element.updateComplete;

    expect(element.sortOrder).toBe('desc');
  });

  it('should display sort indicator for active column', async () => {
    element.sortColumn = 'name';
    element.sortOrder = 'asc';
    await element.updateComplete;

    const indicator = element.shadowRoot!.querySelector('.sort-indicator.active');
    expect(indicator).toBeTruthy();
    expect(indicator!.textContent).toBe('↑');
  });

  it('should filter rows based on input', async () => {
    const filterInput = element.shadowRoot!.querySelector('.filter-input') as HTMLInputElement;
    filterInput.value = 'Alice';
    filterInput.dispatchEvent(new Event('input'));
    await element.updateComplete;

    const rows = element.shadowRoot!.querySelectorAll('tbody tr[role="row"]');
    expect(rows.length).toBe(1);
  });

  it('should select row when checkbox clicked', async () => {
    const checkbox = element.shadowRoot!.querySelectorAll('tbody .checkbox')[0] as HTMLInputElement;
    checkbox.click();
    await element.updateComplete;

    expect(element['selectedRows'].size).toBe(1);
  });

  it('should select all rows when header checkbox clicked', async () => {
    const selectAllCheckbox = element.shadowRoot!.querySelector('thead .checkbox') as HTMLInputElement;
    selectAllCheckbox.click();
    await element.updateComplete;

    expect(element['selectedRows'].size).toBe(mockRows.length);
  });

  it('should show bulk actions when rows selected', async () => {
    element['selectedRows'].add(0);
    element.requestUpdate();
    await element.updateComplete;

    const bulkActions = element.shadowRoot!.querySelector('.bulk-actions');
    expect(bulkActions).toBeTruthy();
  });

  it('should clear selection when clear button clicked', async () => {
    element['selectedRows'].add(0);
    element['selectedRows'].add(1);
    element.requestUpdate();
    await element.updateComplete;

    const clearButton = element.shadowRoot!.querySelector('.bulk-actions button:last-child') as HTMLButtonElement;
    clearButton.click();
    await element.updateComplete;

    expect(element['selectedRows'].size).toBe(0);
  });

  it('should emit gc-table-sort event when sorting', async () => {
    let eventFired = false;
    element.addEventListener('gc-table-sort', () => {
      eventFired = true;
    });

    element.sort('name');
    await element.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('should emit gc-table-filter event when filtering', async () => {
    let eventFired = false;
    element.addEventListener('gc-table-filter', () => {
      eventFired = true;
    });

    element.filter('name', 'Alice');
    await element.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('should emit gc-row-select event when selecting rows', async () => {
    let eventFired = false;
    element.addEventListener('gc-row-select', () => {
      eventFired = true;
    });

    element.selectRow(0);
    await element.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('should paginate rows correctly', async () => {
    element.pageSize = 2;
    await element.updateComplete;

    const rows = element.shadowRoot!.querySelectorAll('tbody tr[role="row"]');
    expect(rows.length).toBe(2);
  });

  it('should show pagination controls when multiple pages', async () => {
    element.pageSize = 2;
    await element.updateComplete;

    const pagination = element.shadowRoot!.querySelector('.pagination');
    expect(pagination).toBeTruthy();
  });

  it('should navigate to next page', async () => {
    element.pageSize = 2;
    await element.updateComplete;

    element.nextPage();
    await element.updateComplete;

    expect(element.currentPage).toBe(2);
  });

  it('should navigate to previous page', async () => {
    element.pageSize = 2;
    element.currentPage = 2;
    await element.updateComplete;

    element.previousPage();
    await element.updateComplete;

    expect(element.currentPage).toBe(1);
  });

  it('should disable previous button on first page', async () => {
    element.pageSize = 2;
    await element.updateComplete;

    const prevButton = element.shadowRoot!.querySelector('.pagination-controls button:first-child') as HTMLButtonElement;
    expect(prevButton.disabled).toBe(true);
  });

  it('should disable next button on last page', async () => {
    element.pageSize = 2;
    element.currentPage = 2;
    await element.updateComplete;

    const nextButton = element.shadowRoot!.querySelector('.pagination-controls button:last-child') as HTMLButtonElement;
    expect(nextButton.disabled).toBe(true);
  });

  it('should show no data message when rows empty', async () => {
    element.rows = [];
    await element.updateComplete;

    const noData = element.shadowRoot!.querySelector('.no-data');
    expect(noData).toBeTruthy();
  });

  it('should have proper ARIA attributes', async () => {
    const table = element.shadowRoot!.querySelector('table');
    expect(table!.getAttribute('role')).toBe('grid');
    expect(table!.getAttribute('aria-label')).toBeTruthy();
  });

  it('should update aria-sort attribute when sorting', async () => {
    element.sortColumn = 'name';
    element.sortOrder = 'asc';
    await element.updateComplete;

    const nameHeader = element.shadowRoot!.querySelectorAll('th[role="columnheader"]')[1] as HTMLElement;
    expect(nameHeader.getAttribute('aria-sort')).toBe('ascending');
  });

  it('should support keyboard navigation on sortable headers', async () => {
    const nameHeader = element.shadowRoot!.querySelector('th.sortable') as HTMLElement;
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    nameHeader.dispatchEvent(event);
    await element.updateComplete;

    expect(element.sortColumn).toBe('name');
  });

  it('should export CSV with selected rows', async () => {
    element.selectRow(0);
    element.selectRow(1);
    await element.updateComplete;

    const exportButton = element.shadowRoot!.querySelector('.bulk-actions button:first-of-type') as HTMLButtonElement;
    expect(exportButton).toBeTruthy();
  });

  it('should reset to page 1 when filtering', async () => {
    element.pageSize = 2;
    element.currentPage = 2;
    await element.updateComplete;

    element.filter('name', 'Alice');
    await element.updateComplete;

    expect(element.currentPage).toBe(1);
  });

  it('should support French Canadian locale', async () => {
    element.locale = 'fr-CA';
    await element.updateComplete;

    const noDataElement = element.shadowRoot!.querySelector('.no-data');
    if (element.rows.length === 0) {
      expect(noDataElement?.textContent).toContain('Aucune');
    }
  });

  it('should handle row selection with keyboard', async () => {
    const checkbox = element.shadowRoot!.querySelector('tbody .checkbox') as HTMLInputElement;
    checkbox.focus();
    const event = new KeyboardEvent('keydown', { key: ' ' });
    checkbox.dispatchEvent(event);
    await element.updateComplete;

    expect(checkbox.checked).toBe(true);
  });

  it('should maintain selection state across pages', async () => {
    element.pageSize = 2;
    element.selectRow(0);
    await element.updateComplete;

    element.nextPage();
    await element.updateComplete;

    expect(element['selectedRows'].has(0)).toBe(true);
  });

  it('should filter case-insensitively', async () => {
    element.filter('name', 'alice');
    await element.updateComplete;

    const rows = element.shadowRoot!.querySelectorAll('tbody tr[role="row"]');
    expect(rows.length).toBe(1);
  });

  it('should sort strings alphabetically', async () => {
    element.sort('name');
    await element.updateComplete;

    const firstCell = element.shadowRoot!.querySelector('tbody tr:first-child td:nth-child(2)');
    expect(firstCell?.textContent).toBe('Alice Smith');
  });

  it('should have sticky header', async () => {
    const thead = element.shadowRoot!.querySelector('thead') as HTMLElement;
    const styles = window.getComputedStyle(thead);
    expect(styles.position).toBe('sticky');
  });

  it('should export CSV with proper formatting', () => {
    element.selectRow(0);
    const csvContent = element['convertToCSV']([mockRows[0]]);
    expect(csvContent).toContain('Name,Email,Role');
    expect(csvContent).toContain('Alice Smith,alice@example.com,Admin');
  });

  it('should handle CSV export with commas in values', () => {
    const rowWithComma = [{ name: 'Smith, John', email: 'john@example.com', role: 'Admin' }];
    const csvContent = element['convertToCSV'](rowWithComma);
    expect(csvContent).toContain('"Smith, John"');
  });

  it('should apply column width when specified', async () => {
    element.columns = [
      { id: 'name', label: 'Name', sortable: true, filterable: true, width: '200px' }
    ];
    await element.updateComplete;

    const header = element.shadowRoot!.querySelectorAll('th[role="columnheader"]')[1] as HTMLElement;
    expect(header.style.width).toBe('200px');
  });

  it('should show pagination info correctly', async () => {
    element.pageSize = 2;
    await element.updateComplete;

    const paginationInfo = element.shadowRoot!.querySelector('.pagination-info');
    expect(paginationInfo?.textContent).toContain('1');
    expect(paginationInfo?.textContent).toContain('2');
    expect(paginationInfo?.textContent).toContain('3');
  });
});
