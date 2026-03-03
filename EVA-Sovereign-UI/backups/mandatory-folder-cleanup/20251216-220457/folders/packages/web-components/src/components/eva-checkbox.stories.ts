import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eva-checkbox.js';

const meta: Meta = {
  title: 'Components/Checkbox',
  component: 'eva-checkbox',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Unchecked: Story = {
  render: () => html`<eva-checkbox>I agree to the terms</eva-checkbox>`,
};

export const Checked: Story = {
  render: () => html`<eva-checkbox checked>I agree to the terms</eva-checkbox>`,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <eva-checkbox disabled>Disabled unchecked</eva-checkbox>
      <eva-checkbox checked disabled>Disabled checked</eva-checkbox>
    </div>
  `,
};

export const Group: Story = {
  render: () => html`
    <fieldset>
      <legend>Select your interests:</legend>
      <eva-checkbox name="interest" value="web">Web Development</eva-checkbox>
      <eva-checkbox name="interest" value="mobile">Mobile Development</eva-checkbox>
      <eva-checkbox name="interest" value="backend">Backend Development</eva-checkbox>
      <eva-checkbox name="interest" value="devops">DevOps</eva-checkbox>
    </fieldset>
  `,
};
