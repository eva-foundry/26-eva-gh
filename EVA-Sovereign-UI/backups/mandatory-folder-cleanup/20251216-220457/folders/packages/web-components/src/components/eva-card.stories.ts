import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eva-card.js';

const meta: Meta = {
  title: 'Components/Card',
  component: 'eva-card',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <eva-card>
      <p>This is a default card with no border.</p>
    </eva-card>
  `,
};

export const Bordered: Story = {
  render: () => html`
    <eva-card variant="bordered">
      <p>This is a bordered card with a 1px border.</p>
    </eva-card>
  `,
};

export const Elevated: Story = {
  render: () => html`
    <eva-card variant="elevated">
      <p>This is an elevated card with a shadow.</p>
    </eva-card>
  `,
};

export const WithSlots: Story = {
  render: () => html`
    <eva-card variant="bordered" padding="large">
      <h2 slot="header">Card Header</h2>
      <p>This card uses all three slots: header, default, and footer.</p>
      <p>The content is in the default slot.</p>
      <div slot="footer" style="text-align: right;">
        <eva-button variant="primary">Action</eva-button>
      </div>
    </eva-card>
  `,
};
