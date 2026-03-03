import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eva-button.js';

const meta: Meta = {
  title: 'Components/Button',
  component: 'eva-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['supertask', 'primary', 'secondary', 'danger', 'link', 'contextual-signin'],
      description: 'Button visual style (GC Design System)',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state (shows spinner)',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Supertask: Story = {
  render: () => html`<eva-button variant="supertask">Supertask Action</eva-button>`,
};

export const Primary: Story = {
  render: () => html`<eva-button variant="primary">Primary Action</eva-button>`,
};

export const Secondary: Story = {
  render: () => html`<eva-button variant="secondary">Secondary Action</eva-button>`,
};

export const Danger: Story = {
  render: () => html`<eva-button variant="danger">Delete</eva-button>`,
};

export const Link: Story = {
  render: () => html`<eva-button variant="link">Learn more</eva-button>`,
};

export const ContextualSignIn: Story = {
  render: () => html`<eva-button variant="contextual-signin">Sign in</eva-button>`,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <eva-button variant="supertask">Supertask</eva-button>
      <eva-button variant="primary">Primary</eva-button>
      <eva-button variant="secondary">Secondary</eva-button>
      <eva-button variant="danger">Danger</eva-button>
      <eva-button variant="link">Link</eva-button>
      <eva-button variant="contextual-signin">Sign in</eva-button>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 1rem;">
      <eva-button variant="primary" size="small">Small</eva-button>
      <eva-button variant="primary" size="medium">Medium</eva-button>
      <eva-button variant="primary" size="large">Large</eva-button>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem;">
      <eva-button variant="primary" disabled>Disabled Primary</eva-button>
      <eva-button variant="secondary" disabled>Disabled Secondary</eva-button>
    </div>
  `,
};

export const Loading: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem;">
      <eva-button variant="primary" loading>Loading...</eva-button>
      <eva-button variant="secondary" loading>Please wait</eva-button>
    </div>
  `,
};
