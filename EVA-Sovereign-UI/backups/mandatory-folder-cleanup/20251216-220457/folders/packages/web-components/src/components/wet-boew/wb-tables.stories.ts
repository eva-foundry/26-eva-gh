import type { Meta, StoryObj } from '@storybook/web-components';
import './wb-tables.js';
import type { TableColumn } from './wb-tables.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-tables',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

const sampleData = [
  { id: 1, name: 'Alice Johnson', department: 'Engineering', salary: 95000, location: 'Toronto' },
  { id: 2, name: 'Bob Smith', department: 'Marketing', salary: 75000, location: 'Vancouver' },
  { id: 3, name: 'Charlie Brown', department: 'Sales', salary: 85000, location: 'Montreal' },
  { id: 4, name: 'Diana Prince', department: 'Engineering', salary: 105000, location: 'Ottawa' },
  { id: 5, name: 'Eve Davis', department: 'HR', salary: 70000, location: 'Calgary' },
  { id: 6, name: 'Frank Miller', department: 'Engineering', salary: 98000, location: 'Toronto' },
  { id: 7, name: 'Grace Lee', department: 'Marketing', salary: 78000, location: 'Vancouver' },
  { id: 8, name: 'Henry Wilson', department: 'Sales', salary: 88000, location: 'Montreal' },
  { id: 9, name: 'Iris Taylor', department: 'Engineering', salary: 102000, location: 'Ottawa' },
  { id: 10, name: 'Jack Anderson', department: 'HR', salary: 72000, location: 'Calgary' },
  { id: 11, name: 'Karen Martinez', department: 'Engineering', salary: 96000, location: 'Toronto' },
  { id: 12, name: 'Leo Garcia', department: 'Marketing', salary: 76000, location: 'Vancouver' }
];

const columns: TableColumn[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'department', label: 'Department' },
  { key: 'salary', label: 'Salary' },
  { key: 'location', label: 'Location' }
];

export const BasicTable: Story = {
  render: () => {
    const table = document.createElement('wb-tables');
    table.data = sampleData;
    table.columns = columns;
    return table;
  }
};

export const WithPagination: Story = {
  render: () => {
    const table = document.createElement('wb-tables');
    table.data = sampleData;
    table.columns = columns;
    table.setAttribute('page-size', '5');
    return table;
  }
};

export const NonSortable: Story = {
  render: () => {
    const table = document.createElement('wb-tables');
    table.data = sampleData;
    table.columns = columns;
    table.sortable = false;
    return table;
  }
};

export const NoExport: Story = {
  render: () => {
    const table = document.createElement('wb-tables');
    table.data = sampleData;
    table.columns = columns;
    table.exportable = false;
    return table;
  }
};

export const EventHandling: Story = {
  render: () => {
    const table = document.createElement('wb-tables');
    table.data = sampleData;
    table.columns = columns;
    table.addEventListener('wb-tables-sort', (e: Event) => {
      console.log('Sort event:', (e as CustomEvent).detail);
    });
    table.addEventListener('wb-tables-filter', (e: Event) => {
      console.log('Filter event:', (e as CustomEvent).detail);
    });
    table.addEventListener('wb-tables-export', (e: Event) => {
      console.log('Export event:', (e as CustomEvent).detail);
    });
    return table;
  }
};

export const BilingualFrench: Story = {
  render: () => {
    const container = document.createElement('div');
    container.lang = 'fr-CA';
    const table = document.createElement('wb-tables');
    table.data = sampleData;
    table.columns = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Nom' },
      { key: 'department', label: 'Département' },
      { key: 'salary', label: 'Salaire' },
      { key: 'location', label: 'Emplacement' }
    ];
    container.appendChild(table);
    return container;
  }
};
