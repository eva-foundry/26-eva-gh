import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eva-input.js';

const meta: Meta = {
  title: 'Components/Input',
  component: 'eva-input',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url', 'number'],
    },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    hint: { control: 'text' },
    maxlength: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => html`
    <eva-input label="Full Name" placeholder="Enter your name"></eva-input>
  `,
};

export const Email: Story = {
  render: () => html`
    <eva-input
      label="Email Address"
      type="email"
      placeholder="you@example.com"
      required
    ></eva-input>
  `,
};

export const WithHint: Story = {
  render: () => html`
    <eva-input
      label="Password"
      type="password"
      hint="Must be at least 8 characters"
      required
    ></eva-input>
  `,
};

export const WithError: Story = {
  render: () => html`
    <eva-input
      label="Phone Number"
      type="tel"
      value="123-456"
      error="Invalid phone number format"
    ></eva-input>
  `,
};

export const WithCharCounter: Story = {
  render: () => html`
    <eva-input
      label="Bio"
      placeholder="Tell us about yourself"
      maxlength="200"
      value="I love web components"
    ></eva-input>
  `,
};
