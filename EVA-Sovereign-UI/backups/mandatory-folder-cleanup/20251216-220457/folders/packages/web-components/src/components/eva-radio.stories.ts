import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eva-radio.js';

const meta: Meta = {
  title: 'Components/Radio',
  component: 'eva-radio',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Group: Story = {
  render: () => html`
    <fieldset>
      <legend>Select your gender:</legend>
      <eva-radio name="gender" value="male" checked>Male</eva-radio>
      <eva-radio name="gender" value="female">Female</eva-radio>
      <eva-radio name="gender" value="other">Other</eva-radio>
      <eva-radio name="gender" value="prefer-not">Prefer not to say</eva-radio>
    </fieldset>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <fieldset>
      <legend>Payment method:</legend>
      <eva-radio name="payment" value="credit" checked>Credit Card</eva-radio>
      <eva-radio name="payment" value="debit">Debit Card</eva-radio>
      <eva-radio name="payment" value="cash" disabled>Cash (unavailable)</eva-radio>
    </fieldset>
  `,
};
