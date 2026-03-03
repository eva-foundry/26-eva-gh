import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-page-details.js';

interface GCPageDetailsStoryArgs {
  publishedDate: string;
  modifiedDate: string;
  contributors: any[];
  contentId: string;
  locale: string;
}

const meta: Meta<GCPageDetailsStoryArgs> = {
  title: 'GC Patterns/gc-page-details',
  tags: ['autodocs'],
  render: (args) => html`
    <gc-page-details
      .publishedDate="${args.publishedDate}"
      .modifiedDate="${args.modifiedDate}"
      .contributors="${args.contributors}"
      .contentId="${args.contentId}"
      .locale="${args.locale}"
    ></gc-page-details>
  `,
  argTypes: {
    publishedDate: { control: 'text' },
    modifiedDate: { control: 'text' },
    contributors: { control: 'object' },
    contentId: { control: 'text' },
    locale: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<GCPageDetailsStoryArgs>;

export const Default: Story = {
  args: {
    publishedDate: '2024-01-15T10:00:00Z',
    modifiedDate: '2024-03-20T14:30:00Z',
    contributors: [
      { name: 'Service Canada', role: 'Publisher' }
    ],
    contentId: 'GC-DOC-12345',
    locale: 'en-CA'
  }
};

export const WithMultipleContributors: Story = {
  args: {
    publishedDate: '2023-06-10T09:00:00Z',
    modifiedDate: '2024-02-15T16:45:00Z',
    contributors: [
      { name: 'John Doe', role: 'Author' },
      { name: 'Jane Smith', role: 'Editor' },
      { name: 'Bob Johnson', role: 'Reviewer' }
    ],
    contentId: 'GC-GUIDE-456',
    locale: 'en-CA'
  }
};

export const WithoutContentId: Story = {
  args: {
    publishedDate: '2024-01-01T00:00:00Z',
    modifiedDate: '2024-01-15T12:00:00Z',
    contributors: [
      { name: 'Canada Revenue Agency' }
    ],
    contentId: '',
    locale: 'en-CA'
  }
};

export const PublishedOnly: Story = {
  args: {
    publishedDate: '2024-01-15T10:00:00Z',
    modifiedDate: '',
    contributors: [],
    contentId: '',
    locale: 'en-CA'
  }
};

export const ModifiedOnly: Story = {
  args: {
    publishedDate: '',
    modifiedDate: '2024-03-20T14:30:00Z',
    contributors: [
      { name: 'Immigration, Refugees and Citizenship Canada' }
    ],
    contentId: '',
    locale: 'en-CA'
  }
};

export const FrenchCanadian: Story = {
  args: {
    publishedDate: '2024-01-15T10:00:00Z',
    modifiedDate: '2024-03-20T14:30:00Z',
    contributors: [
      { name: 'Service Canada', role: 'Éditeur' },
      { name: 'Marie Tremblay', role: 'Auteure' }
    ],
    contentId: 'GC-DOC-789',
    locale: 'fr-CA'
  }
};
