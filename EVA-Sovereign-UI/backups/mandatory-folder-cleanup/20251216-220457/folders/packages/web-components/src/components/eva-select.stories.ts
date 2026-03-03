import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eva-select.js';

const meta: Meta = {
  title: 'Components/Select',
  component: 'eva-select',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => html`
    <eva-select label="Province" placeholder="Select your province">
      <option value="ON">Ontario</option>
      <option value="QC">Quebec</option>
      <option value="BC">British Columbia</option>
      <option value="AB">Alberta</option>
    </eva-select>
  `,
};

export const Required: Story = {
  render: () => html`
    <eva-select label="Language" required>
      <option value="en">English</option>
      <option value="fr">Français</option>
    </eva-select>
  `,
};

export const WithHint: Story = {
  render: () => html`
    <eva-select label="Department" hint="Select the department you work in">
      <option value="it">Information Technology</option>
      <option value="hr">Human Resources</option>
      <option value="finance">Finance</option>
    </eva-select>
  `,
};

export const WithError: Story = {
  render: () => html`
    <eva-select label="Country" error="Please select a country">
      <option value="">Select...</option>
      <option value="ca">Canada</option>
      <option value="us">United States</option>
      <option value="mx">Mexico</option>
    </eva-select>
  `,
};
