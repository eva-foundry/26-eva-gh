import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eva-modal.js';
import './eva-button.js';

const meta: Meta = {
  title: 'Components/Modal',
  component: 'eva-modal',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Small: Story = {
  render: () => html`
    <eva-button id="open-small" variant="primary">Open Small Modal</eva-button>
    <eva-modal id="modal-small" size="small">
      <h2 slot="header">Small Modal</h2>
      <p>This is a small modal (400px max-width).</p>
      <eva-button slot="footer" variant="primary" id="close-small">Close</eva-button>
    </eva-modal>
    <script>
      document.getElementById('open-small').addEventListener('click', () => {
        document.getElementById('modal-small').open = true;
      });
      document.getElementById('close-small').addEventListener('click', () => {
        document.getElementById('modal-small').open = false;
      });
    </script>
  `,
};

export const Medium: Story = {
  render: () => html`
    <eva-button id="open-medium" variant="primary">Open Medium Modal</eva-button>
    <eva-modal id="modal-medium" size="medium">
      <h2 slot="header">Medium Modal</h2>
      <p>This is a medium modal (600px max-width) with more content.</p>
      <p>It includes focus trap, Esc to close, and backdrop click to close.</p>
      <eva-button slot="footer" variant="primary" id="close-medium">Close</eva-button>
    </eva-modal>
    <script>
      document.getElementById('open-medium').addEventListener('click', () => {
        document.getElementById('modal-medium').open = true;
      });
      document.getElementById('close-medium').addEventListener('click', () => {
        document.getElementById('modal-medium').open = false;
      });
    </script>
  `,
};

export const Large: Story = {
  render: () => html`
    <eva-button id="open-large" variant="primary">Open Large Modal</eva-button>
    <eva-modal id="modal-large" size="large">
      <h2 slot="header">Large Modal</h2>
      <p>This is a large modal (900px max-width).</p>
      <p>Perfect for displaying detailed content, forms, or data tables.</p>
      <eva-button slot="footer" variant="secondary" id="cancel">Cancel</eva-button>
      <eva-button slot="footer" variant="primary" id="save">Save</eva-button>
    </eva-modal>
    <script>
      document.getElementById('open-large').addEventListener('click', () => {
        document.getElementById('modal-large').open = true;
      });
      document.getElementById('cancel').addEventListener('click', () => {
        document.getElementById('modal-large').open = false;
      });
      document.getElementById('save').addEventListener('click', () => {
        document.getElementById('modal-large').open = false;
      });
    </script>
  `,
};
