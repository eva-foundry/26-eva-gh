import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-tables.js';
import type { WBTables, TableColumn } from './wb-tables.js';

describe('WBTables', () => {
  let table: WBTables;
  const sampleData = [
    { id: 1, name: 'Alice', age: 30, city: 'Toronto' },
    { id: 2, name: 'Bob', age: 25, city: 'Vancouver' },
    { id: 3, name: 'Charlie', age: 35, city: 'Montreal' }
  ];
  const sampleColumns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'city', label: 'City' }
  ];

  beforeEach(async () => {
    table = await fixture<WBTables>(html`<wb-tables></wb-tables>`);
    table.data = sampleData;
    table.columns = sampleColumns;
    await table.updateComplete;
  });

  it('renders', () => {
    expect(table).to.exist;
  });

  it('displays table data', () => {
    const rows = table.shadowRoot!.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(3);
  });

  it('displays column headers', () => {
    const headers = table.shadowRoot!.querySelectorAll('th');
    expect(headers.length).to.equal(4);
    expect(headers[0].textContent).to.include('ID');
    expect(headers[1].textContent).to.include('Name');
  });

  it('sorts ascending by column', async () => {
    table.sort('name', 'asc');
    await table.updateComplete;
    const rows = table.shadowRoot!.querySelectorAll('tbody tr');
    const firstCell = rows[0].querySelector('td');
    expect(firstCell?.textContent).to.equal('1');
  });

  it('sorts descending by column', async () => {
    table.sort('name', 'desc');
    await table.updateComplete;
    const rows = table.shadowRoot!.querySelectorAll('tbody tr');
    const firstCell = rows[0].querySelector('td');
    expect(firstCell?.textContent).to.equal('3');
  });

  it('filters data by search query', async () => {
    table.filter('bob');
    await table.updateComplete;
    const rows = table.shadowRoot!.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(1);
  });

  it('paginates data', async () => {
    table.pageSize = 2;
    await table.updateComplete;
    const rows = table.shadowRoot!.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(2);
  });

  it('changes page', async () => {
    table.pageSize = 2;
    await table.updateComplete;
    const nextBtn = table.shadowRoot!.querySelector('.page-btn:last-child') as HTMLButtonElement;
    nextBtn.click();
    await table.updateComplete;
    expect((table as any).currentPage).to.equal(2);
  });

  it('changes page size', async () => {
    const select = table.shadowRoot!.querySelector('.page-size-select') as HTMLSelectElement;
    select.value = '25';
    select.dispatchEvent(new Event('change'));
    await table.updateComplete;
    expect(table.pageSize).to.equal(25);
  });

  it('shows search input when filterable', () => {
    const search = table.shadowRoot!.querySelector('.table-search');
    expect(search).to.exist;
  });

  it('hides search input when not filterable', async () => {
    table.filterable = false;
    await table.updateComplete;
    const search = table.shadowRoot!.querySelector('.table-search');
    expect(search).to.be.null;
  });

  it('shows export buttons when exportable', () => {
    const exportBtns = table.shadowRoot!.querySelectorAll('.export-btn');
    expect(exportBtns.length).to.equal(3);
  });

  it('hides export buttons when not exportable', async () => {
    table.exportable = false;
    await table.updateComplete;
    const exportBtns = table.shadowRoot!.querySelectorAll('.export-btn');
    expect(exportBtns.length).to.equal(0);
  });

  it('emits wb-tables-sort event', async () => {
    let eventFired = false;
    table.addEventListener('wb-tables-sort', () => { eventFired = true; });
    table.sort('name', 'asc');
    await table.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('emits wb-tables-filter event', async () => {
    let eventFired = false;
    table.addEventListener('wb-tables-filter', () => { eventFired = true; });
    table.filter('test');
    await table.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('emits wb-tables-export event on CSV export', async () => {
    let eventFired = false;
    table.addEventListener('wb-tables-export', () => { eventFired = true; });
    table.exportCSV();
    await table.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('has sortable class on headers when sortable', () => {
    const headers = table.shadowRoot!.querySelectorAll('th.sortable');
    expect(headers.length).to.equal(4);
  });

  it('does not have sortable class when sortable=false', async () => {
    table.sortable = false;
    await table.updateComplete;
    const headers = table.shadowRoot!.querySelectorAll('th.sortable');
    expect(headers.length).to.equal(0);
  });

  it('displays sort indicator', async () => {
    table.sort('name', 'asc');
    await table.updateComplete;
    const indicator = table.shadowRoot!.querySelector('.sort-indicator');
    expect(indicator?.textContent).to.equal('▲');
  });

  it('toggles sort direction on header click', async () => {
    const header = table.shadowRoot!.querySelector('th.sortable') as HTMLElement;
    header.click();
    await table.updateComplete;
    expect((table as any).sortDirection).to.equal('asc');
    header.click();
    await table.updateComplete;
    expect((table as any).sortDirection).to.equal('desc');
  });

  it('has ARIA sort attribute', async () => {
    table.sort('name', 'asc');
    await table.updateComplete;
    const header = table.shadowRoot!.querySelectorAll('th')[1];
    expect(header.getAttribute('aria-sort')).to.equal('ascending');
  });

  it('displays pagination info', () => {
    const info = table.shadowRoot!.querySelector('.pagination-info');
    expect(info?.textContent).to.include('Showing 1');
  });

  it('disables previous button on first page', () => {
    const prevBtn = table.shadowRoot!.querySelector('.pagination-controls .page-btn') as HTMLButtonElement;
    expect(prevBtn.disabled).to.equal(true);
  });

  it('enables previous button on later pages', async () => {
    table.pageSize = 2;
    await table.updateComplete;
    const nextBtn = table.shadowRoot!.querySelector('.page-btn:last-child') as HTMLButtonElement;
    nextBtn.click();
    await table.updateComplete;
    const prevBtn = table.shadowRoot!.querySelector('.pagination-controls .page-btn') as HTMLButtonElement;
    expect(prevBtn.disabled).to.equal(false);
  });

  it('handles empty data', async () => {
    table.data = [];
    await table.updateComplete;
    const rows = table.shadowRoot!.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(0);
  });

  it('handles missing column data', async () => {
    table.data = [{ id: 1 }];
    await table.updateComplete;
    const cells = table.shadowRoot!.querySelectorAll('tbody td');
    expect(cells[1].textContent).to.equal('');
  });

  it('has role="table" on table element', () => {
    const tableEl = table.shadowRoot!.querySelector('table');
    expect(tableEl?.getAttribute('role')).to.equal('table');
  });

  it('supports data-label on mobile', () => {
    const cells = table.shadowRoot!.querySelectorAll('td');
    expect(cells[0].getAttribute('data-label')).to.equal('ID');
  });
});
