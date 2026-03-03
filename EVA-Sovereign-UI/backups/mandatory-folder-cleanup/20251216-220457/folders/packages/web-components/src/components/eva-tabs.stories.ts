import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eva-tabs.js';

const meta: Meta = {
  title: 'Components/Tabs',
  component: 'eva-tabs',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const ThreeTabs: Story = {
  render: () => html`
    <eva-tabs>
      <eva-tab label="Overview">
        <h3>Overview</h3>
        <p>This is the overview tab content.</p>
      </eva-tab>
      <eva-tab label="Details">
        <h3>Details</h3>
        <p>This is the details tab with more information.</p>
      </eva-tab>
      <eva-tab label="Settings">
        <h3>Settings</h3>
        <p>This is the settings tab for configuration.</p>
      </eva-tab>
    </eva-tabs>
  `,
};

export const ManyTabs: Story = {
  render: () => html`
    <eva-tabs>
      <eva-tab label="Home">Home content</eva-tab>
      <eva-tab label="About">About content</eva-tab>
      <eva-tab label="Services">Services content</eva-tab>
      <eva-tab label="Products">Products content</eva-tab>
      <eva-tab label="Contact">Contact content</eva-tab>
    </eva-tabs>
  `,
};
