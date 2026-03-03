import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-loading-spinner';

const meta: Meta = {
  title: 'GC Patterns/gc-loading-spinner',
  component: 'gc-loading-spinner',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    variant: {
      control: 'select',
      options: ['default', 'light', 'primary', 'success', 'warning', 'error']
    },
    centered: { control: 'boolean' },
    overlay: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <gc-loading-spinner></gc-loading-spinner>
  `
};

export const Small: Story = {
  render: () => html`
    <gc-loading-spinner size="small"></gc-loading-spinner>
  `
};

export const Large: Story = {
  render: () => html`
    <gc-loading-spinner size="large"></gc-loading-spinner>
  `
};

export const WithCustomText: Story = {
  render: () => html`
    <gc-loading-spinner text="Processing your request..."></gc-loading-spinner>
  `
};

export const Centered: Story = {
  render: () => html`
    <div style="height: 200px; background: #f5f5f5; border: 1px dashed #ccc; border-radius: 4px;">
      <gc-loading-spinner centered></gc-loading-spinner>
    </div>
  `
};

export const LightVariant: Story = {
  render: () => html`
    <div style="padding: 3rem; background: #26374a; border-radius: 4px;">
      <gc-loading-spinner variant="light"></gc-loading-spinner>
    </div>
  `
};

export const ColorVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem; background: #f5f5f5; border-radius: 8px;">
      <div>
        <p style="margin: 0 0 0.5rem 0; font-weight: 600;">Default</p>
        <gc-loading-spinner variant="default"></gc-loading-spinner>
      </div>

      <div>
        <p style="margin: 0 0 0.5rem 0; font-weight: 600;">Primary</p>
        <gc-loading-spinner variant="primary"></gc-loading-spinner>
      </div>

      <div>
        <p style="margin: 0 0 0.5rem 0; font-weight: 600;">Success</p>
        <gc-loading-spinner variant="success"></gc-loading-spinner>
      </div>

      <div>
        <p style="margin: 0 0 0.5rem 0; font-weight: 600;">Warning</p>
        <gc-loading-spinner variant="warning"></gc-loading-spinner>
      </div>

      <div>
        <p style="margin: 0 0 0.5rem 0; font-weight: 600;">Error</p>
        <gc-loading-spinner variant="error"></gc-loading-spinner>
      </div>

      <div style="padding: 2rem; background: #26374a; border-radius: 4px;">
        <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #fff;">Light (on dark background)</p>
        <gc-loading-spinner variant="light"></gc-loading-spinner>
      </div>
    </div>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 3rem; padding: 2rem; background: #f5f5f5; border-radius: 8px;">
      <div style="text-align: center;">
        <p style="margin: 0 0 1rem 0; font-weight: 600;">Small</p>
        <gc-loading-spinner size="small"></gc-loading-spinner>
      </div>

      <div style="text-align: center;">
        <p style="margin: 0 0 1rem 0; font-weight: 600;">Medium</p>
        <gc-loading-spinner size="medium"></gc-loading-spinner>
      </div>

      <div style="text-align: center;">
        <p style="margin: 0 0 1rem 0; font-weight: 600;">Large</p>
        <gc-loading-spinner size="large"></gc-loading-spinner>
      </div>
    </div>
  `
};

export const Overlay: Story = {
  render: () => {
    let spinner: HTMLElement | null = null;

    const showOverlay = () => {
      spinner = document.createElement('gc-loading-spinner');
      spinner.setAttribute('overlay', '');
      spinner.setAttribute('text', 'Loading application...');
      document.body.appendChild(spinner);

      setTimeout(() => {
        spinner?.remove();
      }, 3000);
    };

    return html`
      <button @click="${showOverlay}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Show Loading Overlay (3s)
      </button>
    `;
  }
};

export const InlineWithContent: Story = {
  render: () => html`
    <div style="padding: 1.5rem; background: #f5f5f5; border-radius: 4px;">
      <p style="margin: 0 0 1rem 0; display: flex; align-items: center; gap: 1rem;">
        <gc-loading-spinner size="small"></gc-loading-spinner>
        <span>Fetching data from server...</span>
      </p>

      <p style="margin: 0 0 1rem 0; display: flex; align-items: center; gap: 1rem;">
        <gc-loading-spinner size="small" variant="success"></gc-loading-spinner>
        <span>Syncing changes...</span>
      </p>

      <p style="margin: 0; display: flex; align-items: center; gap: 1rem;">
        <gc-loading-spinner size="small" variant="warning"></gc-loading-spinner>
        <span>Validating input...</span>
      </p>
    </div>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-loading-spinner locale="fr-CA"></gc-loading-spinner>
  `
};

export const InButton: Story = {
  render: () => html`
    <button disabled style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; opacity: 0.7; cursor: not-allowed;">
      <gc-loading-spinner size="small" variant="light" text=""></gc-loading-spinner>
      <span>Processing...</span>
    </button>
  `
};

export const LoadingStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
      <div style="padding: 1.5rem; background: #fff; border: 1px solid #ddd; border-radius: 4px;">
        <h3 style="margin: 0 0 1rem 0;">Loading data...</h3>
        <gc-loading-spinner text="Fetching records from database"></gc-loading-spinner>
      </div>

      <div style="padding: 1.5rem; background: #d8eeca; border: 1px solid #278400; border-radius: 4px;">
        <h3 style="margin: 0 0 1rem 0;">Processing</h3>
        <gc-loading-spinner variant="success" text="Analyzing 1,247 records"></gc-loading-spinner>
      </div>

      <div style="padding: 1.5rem; background: #f9f4d4; border: 1px solid #ee7100; border-radius: 4px;">
        <h3 style="margin: 0 0 1rem 0;">Waiting</h3>
        <gc-loading-spinner variant="warning" text="Waiting for server response"></gc-loading-spinner>
      </div>
    </div>
  `
};

export const FormSubmission: Story = {
  render: () => html`
    <div style="max-width: 600px; padding: 2rem; background: #f5f5f5; border-radius: 8px;">
      <h2 style="margin: 0 0 1.5rem 0;">Contact Form</h2>
      
      <div style="margin-bottom: 1rem;">
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Name</label>
        <input type="text" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
      </div>

      <div style="margin-bottom: 1rem;">
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email</label>
        <input type="email" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
      </div>

      <div style="margin-bottom: 1.5rem;">
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Message</label>
        <textarea style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; min-height: 100px;"></textarea>
      </div>

      <button disabled style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; opacity: 0.7; cursor: not-allowed;">
        <gc-loading-spinner size="small" variant="light" text=""></gc-loading-spinner>
        <span>Submitting...</span>
      </button>
    </div>
  `
};
