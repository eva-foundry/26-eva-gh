import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-filterable-list.js';

interface GCFilterableListStoryArgs {
  items: any[];
  filters: any[];
  locale: string;
}

const meta: Meta<GCFilterableListStoryArgs> = {
  title: 'GC Patterns/gc-filterable-list',
  tags: ['autodocs'],
  render: (args) => html`
    <gc-filterable-list
      .items="${args.items}"
      .filters="${args.filters}"
      .locale="${args.locale}"
    >
      ${args.items.map(item => html`
        <div style="padding: 12px; border-bottom: 1px solid #e1e4e7;">
          <strong>${item.name}</strong><br />
          <small>${item.category} - ${item.region}</small>
        </div>
      `)}
    </gc-filterable-list>
  `,
  argTypes: {
    items: { control: 'object' },
    filters: { control: 'object' },
    locale: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<GCFilterableListStoryArgs>;

const benefitsItems = [
  { id: 1, name: 'Canada Child Benefit', category: 'benefits', region: 'national' },
  { id: 2, name: 'Employment Insurance', category: 'benefits', region: 'national' },
  { id: 3, name: 'Old Age Security', category: 'benefits', region: 'national' },
  { id: 4, name: 'Ontario Trillium Benefit', category: 'benefits', region: 'ontario' },
  { id: 5, name: 'Quebec Parental Insurance', category: 'benefits', region: 'quebec' },
  { id: 6, name: 'GST/HST Credit', category: 'tax-credits', region: 'national' },
  { id: 7, name: 'Disability Tax Credit', category: 'tax-credits', region: 'national' },
  { id: 8, name: 'Canada Workers Benefit', category: 'tax-credits', region: 'national' }
];

const benefitsFilters = [
  {
    id: 'category',
    label: 'Category',
    type: 'checkbox',
    options: [
      { value: 'benefits', label: 'Benefits' },
      { value: 'tax-credits', label: 'Tax Credits' }
    ]
  },
  {
    id: 'region',
    label: 'Region',
    type: 'dropdown',
    options: [
      { value: 'national', label: 'National' },
      { value: 'ontario', label: 'Ontario' },
      { value: 'quebec', label: 'Quebec' }
    ]
  },
  {
    id: 'name',
    label: 'Search by name',
    type: 'text'
  }
];

export const Default: Story = {
  args: {
    items: benefitsItems,
    filters: benefitsFilters,
    locale: 'en-CA'
  }
};

export const WithCheckboxOnly: Story = {
  args: {
    items: benefitsItems,
    filters: [benefitsFilters[0]],
    locale: 'en-CA'
  }
};

export const WithDropdownOnly: Story = {
  args: {
    items: benefitsItems,
    filters: [benefitsFilters[1]],
    locale: 'en-CA'
  }
};

export const WithSearchOnly: Story = {
  args: {
    items: benefitsItems,
    filters: [benefitsFilters[2]],
    locale: 'en-CA'
  }
};

export const WithEvents: Story = {
  args: {
    items: benefitsItems,
    filters: benefitsFilters,
    locale: 'en-CA'
  },
  render: (args) => html`
    <gc-filterable-list
      .items="${args.items}"
      .filters="${args.filters}"
      @gc-filter-change="${(e: CustomEvent) => console.log('Filters changed:', e.detail)}"
      @gc-sort-change="${(e: CustomEvent) => console.log('Sort changed:', e.detail)}"
    >
      ${args.items.map(item => html`
        <div style="padding: 12px; border-bottom: 1px solid #e1e4e7;">
          <strong>${item.name}</strong><br />
          <small>${item.category} - ${item.region}</small>
        </div>
      `)}
    </gc-filterable-list>
  `
};

export const FrenchCanadian: Story = {
  args: {
    items: [
      { id: 1, name: 'Allocation canadienne pour enfants', category: 'prestations', region: 'national' },
      { id: 2, name: 'Assurance-emploi', category: 'prestations', region: 'national' },
      { id: 3, name: 'Sécurité de la vieillesse', category: 'prestations', region: 'national' },
      { id: 4, name: 'Crédit de la TPS/TVH', category: 'credits-impot', region: 'national' }
    ],
    filters: [
      {
        id: 'category',
        label: 'Catégorie',
        type: 'checkbox',
        options: [
          { value: 'prestations', label: 'Prestations' },
          { value: 'credits-impot', label: 'Crédits d\'impôt' }
        ]
      },
      {
        id: 'name',
        label: 'Rechercher par nom',
        type: 'text'
      }
    ],
    locale: 'fr-CA'
  },
  render: (args) => html`
    <gc-filterable-list
      .items="${args.items}"
      .filters="${args.filters}"
      .locale="${args.locale}"
    >
      ${args.items.map(item => html`
        <div style="padding: 12px; border-bottom: 1px solid #e1e4e7;">
          <strong>${item.name}</strong><br />
          <small>${item.category} - ${item.region}</small>
        </div>
      `)}
    </gc-filterable-list>
  `
};
