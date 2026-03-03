import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-feedback-widget.js';

interface GCFeedbackWidgetStoryArgs {
  apiEndpoint: string;
  showPrivacyNotice: boolean;
  locale: string;
}

const meta: Meta<GCFeedbackWidgetStoryArgs> = {
  title: 'GC Patterns/gc-feedback-widget',
  tags: ['autodocs'],
  render: (args) => html`
    <gc-feedback-widget
      .apiEndpoint="${args.apiEndpoint}"
      .showPrivacyNotice="${args.showPrivacyNotice}"
      .locale="${args.locale}"
    ></gc-feedback-widget>
  `,
  argTypes: {
    apiEndpoint: { control: 'text' },
    showPrivacyNotice: { control: 'boolean' },
    locale: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<GCFeedbackWidgetStoryArgs>;

export const Default: Story = {
  args: {
    apiEndpoint: '',
    showPrivacyNotice: true,
    locale: 'en-CA'
  }
};

export const WithoutPrivacyNotice: Story = {
  args: {
    apiEndpoint: '',
    showPrivacyNotice: false,
    locale: 'en-CA'
  }
};

export const WithApiEndpoint: Story = {
  args: {
    apiEndpoint: '/api/feedback',
    showPrivacyNotice: true,
    locale: 'en-CA'
  }
};

export const WithEvents: Story = {
  args: {
    apiEndpoint: '',
    showPrivacyNotice: true,
    locale: 'en-CA'
  },
  render: (args) => html`
    <gc-feedback-widget
      .apiEndpoint="${args.apiEndpoint}"
      .showPrivacyNotice="${args.showPrivacyNotice}"
      @gc-feedback-submit="${(e: CustomEvent) => console.log('Feedback submitted:', e.detail)}"
    ></gc-feedback-widget>
  `
};

export const FrenchCanadian: Story = {
  args: {
    apiEndpoint: '',
    showPrivacyNotice: true,
    locale: 'fr-CA'
  }
};
