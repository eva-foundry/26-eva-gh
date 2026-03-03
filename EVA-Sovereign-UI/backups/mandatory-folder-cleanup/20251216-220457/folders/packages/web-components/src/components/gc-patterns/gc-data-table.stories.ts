import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-data-table';

const meta: Meta = {
  title: 'GC Patterns/gc-data-table',
  component: 'gc-data-table',
  tags: ['autodocs'],
  argTypes: {
    pageSize: { control: 'number' },
    sortOrder: { control: 'select', options: ['asc', 'desc'] }
  }
};

export default meta;
type Story = StoryObj;

const sampleColumns = [
  { id: 'name', label: 'Name', sortable: true, filterable: true },
  { id: 'department', label: 'Department', sortable: true, filterable: true },
  { id: 'email', label: 'Email', sortable: true, filterable: true },
  { id: 'phone', label: 'Phone', sortable: false, filterable: false }
];

const sampleRows = [
  { name: 'Alice Johnson', department: 'Engineering', email: 'alice.johnson@example.gc.ca', phone: '613-555-0001' },
  { name: 'Bob Smith', department: 'Marketing', email: 'bob.smith@example.gc.ca', phone: '613-555-0002' },
  { name: 'Charlie Brown', department: 'Sales', email: 'charlie.brown@example.gc.ca', phone: '613-555-0003' },
  { name: 'Diana Prince', department: 'Engineering', email: 'diana.prince@example.gc.ca', phone: '613-555-0004' },
  { name: 'Edward Norton', department: 'HR', email: 'edward.norton@example.gc.ca', phone: '613-555-0005' },
  { name: 'Fiona Apple', department: 'Marketing', email: 'fiona.apple@example.gc.ca', phone: '613-555-0006' },
  { name: 'George Martin', department: 'Sales', email: 'george.martin@example.gc.ca', phone: '613-555-0007' },
  { name: 'Helen Keller', department: 'Engineering', email: 'helen.keller@example.gc.ca', phone: '613-555-0008' }
];

export const Default: Story = {
  render: () => html`
    <gc-data-table
      .columns="${sampleColumns}"
      .rows="${sampleRows}"
      .pageSize="${5}"
    ></gc-data-table>
  `
};

export const WithManyRows: Story = {
  render: () => {
    const manyRows = Array.from({ length: 50 }, (_, i) => ({
      name: `Person ${i + 1}`,
      department: ['Engineering', 'Marketing', 'Sales', 'HR'][i % 4],
      email: `person${i + 1}@example.gc.ca`,
      phone: `613-555-${String(i + 1).padStart(4, '0')}`
    }));

    return html`
      <gc-data-table
        .columns="${sampleColumns}"
        .rows="${manyRows}"
        .pageSize="${10}"
      ></gc-data-table>
    `;
  }
};

export const PreSorted: Story = {
  render: () => html`
    <gc-data-table
      .columns="${sampleColumns}"
      .rows="${sampleRows}"
      .sortColumn="${'name'}"
      .sortOrder="${'asc'}"
      .pageSize="${5}"
    ></gc-data-table>
  `
};

export const CustomColumnWidths: Story = {
  render: () => {
    const customColumns = [
      { id: 'name', label: 'Name', sortable: true, filterable: true, width: '200px' },
      { id: 'department', label: 'Department', sortable: true, filterable: true, width: '150px' },
      { id: 'email', label: 'Email', sortable: true, filterable: true, width: '250px' },
      { id: 'phone', label: 'Phone', sortable: false, filterable: false, width: '120px' }
    ];

    return html`
      <gc-data-table
        .columns="${customColumns}"
        .rows="${sampleRows}"
        .pageSize="${5}"
      ></gc-data-table>
    `;
  }
};

export const WithEvents: Story = {
  render: () => html`
    <gc-data-table
      .columns="${sampleColumns}"
      .rows="${sampleRows}"
      .pageSize="${5}"
      @gc-table-sort="${(e: CustomEvent) => console.log('Sort:', e.detail)}"
      @gc-table-filter="${(e: CustomEvent) => console.log('Filter:', e.detail)}"
      @gc-row-select="${(e: CustomEvent) => console.log('Selected rows:', e.detail.selectedRows)}"
    ></gc-data-table>
    <p style="margin-top: 1rem; padding: 1rem; background: #f0f0f0; border-radius: 4px;">
      <strong>Try:</strong> Sort columns, filter data, or select rows. Check the console for events.
    </p>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-data-table
      locale="fr-CA"
      .columns="${[
        { id: 'name', label: 'Nom', sortable: true, filterable: true },
        { id: 'department', label: 'Département', sortable: true, filterable: true },
        { id: 'email', label: 'Courriel', sortable: true, filterable: true },
        { id: 'phone', label: 'Téléphone', sortable: false, filterable: false }
      ]}"
      .rows="${[
        { name: 'Alice Johnson', department: 'Ingénierie', email: 'alice.johnson@exemple.gc.ca', phone: '613-555-0001' },
        { name: 'Bob Smith', department: 'Marketing', email: 'bob.smith@exemple.gc.ca', phone: '613-555-0002' },
        { name: 'Charlie Brown', department: 'Ventes', email: 'charlie.brown@exemple.gc.ca', phone: '613-555-0003' },
        { name: 'Diana Prince', department: 'Ingénierie', email: 'diana.prince@exemple.gc.ca', phone: '613-555-0004' },
        { name: 'Edward Norton', department: 'RH', email: 'edward.norton@exemple.gc.ca', phone: '613-555-0005' }
      ]}"
      .pageSize="${5}"
    ></gc-data-table>
  `
};

export const EmptyTable: Story = {
  render: () => html`
    <gc-data-table
      .columns="${sampleColumns}"
      .rows="${[]}"
    ></gc-data-table>
  `
};
