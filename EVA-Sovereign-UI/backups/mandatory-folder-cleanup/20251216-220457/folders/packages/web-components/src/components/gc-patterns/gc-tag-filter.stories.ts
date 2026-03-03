import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-tag-filter.js';

interface GCTagFilterStoryArgs {
  tags: any[];
  locale: string;
}

const meta: Meta<GCTagFilterStoryArgs> = {
  title: 'GC Patterns/gc-tag-filter',
  tags: ['autodocs'],
  render: (args) => html`
    <gc-tag-filter
      .tags="${args.tags}"
      .locale="${args.locale}"
    ></gc-tag-filter>
  `,
  argTypes: {
    tags: { control: 'object' },
    locale: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<GCTagFilterStoryArgs>;

const benefitTags = [
  { id: 'ccb', label: 'Canada Child Benefit', count: 25 },
  { id: 'ei', label: 'Employment Insurance', count: 18 },
  { id: 'oas', label: 'Old Age Security', count: 12 },
  { id: 'cpp', label: 'Canada Pension Plan', count: 15 },
  { id: 'gst', label: 'GST/HST Credit', count: 8 }
];

const topicTags = [
  { id: 'health', label: 'Health', count: 42 },
  { id: 'taxes', label: 'Taxes', count: 35 },
  { id: 'immigration', label: 'Immigration', count: 28 },
  { id: 'travel', label: 'Travel', count: 22 },
  { id: 'business', label: 'Business', count: 19 },
  { id: 'jobs', label: 'Jobs', count: 16 },
  { id: 'environment', label: 'Environment', count: 14 },
  { id: 'education', label: 'Education', count: 11 }
];

export const Default: Story = {
  args: {
    tags: benefitTags,
    locale: 'en-CA'
  }
};

export const ManyTags: Story = {
  args: {
    tags: topicTags,
    locale: 'en-CA'
  }
};

export const WithoutCounts: Story = {
  args: {
    tags: [
      { id: 'featured', label: 'Featured' },
      { id: 'popular', label: 'Popular' },
      { id: 'recent', label: 'Recent' },
      { id: 'archived', label: 'Archived' }
    ],
    locale: 'en-CA'
  }
};

export const WithEvents: Story = {
  args: {
    tags: benefitTags,
    locale: 'en-CA'
  },
  render: (args) => html`
    <gc-tag-filter
      .tags="${args.tags}"
      @gc-tag-change="${(e: CustomEvent) => console.log('Tags changed:', e.detail)}"
    ></gc-tag-filter>
  `
};

export const FrenchCanadian: Story = {
  args: {
    tags: [
      { id: 'ace', label: 'Allocation canadienne pour enfants', count: 25 },
      { id: 'ae', label: 'Assurance-emploi', count: 18 },
      { id: 'sv', label: 'Sécurité de la vieillesse', count: 12 },
      { id: 'rpc', label: 'Régime de pensions du Canada', count: 15 }
    ],
    locale: 'fr-CA'
  }
};
