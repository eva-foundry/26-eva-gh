import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eva-alert.js';

// Alert Stories
export default {
  title: 'Components/Alert',
  component: 'eva-alert',
  tags: ['autodocs'],
} as Meta;

export const Success: StoryObj = {
  render: () => html`<eva-alert type="success">Operation completed successfully!</eva-alert>`,
};

export const Info: StoryObj = {
  render: () => html`<eva-alert type="info">Here's some important information.</eva-alert>`,
};

export const Warning: StoryObj = {
  render: () => html`<eva-alert type="warning">Please review your input.</eva-alert>`,
};

export const Danger: StoryObj = {
  render: () => html`<eva-alert type="danger">An error occurred. Please try again.</eva-alert>`,
};

export const Dismissible: StoryObj = {
  render: () => html`
    <eva-alert type="info" dismissible>You can dismiss this alert by clicking the × button.</eva-alert>
  `,
};
