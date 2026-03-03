import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-print-page';

const meta: Meta = {
  title: 'GC Patterns/gc-print-page',
  component: 'gc-print-page',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary'] },
    showIcon: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <gc-print-page></gc-print-page>
  `
};

export const Primary: Story = {
  render: () => html`
    <gc-print-page variant="primary"></gc-print-page>
  `
};

export const WithoutIcon: Story = {
  render: () => html`
    <gc-print-page .showIcon="${false}"></gc-print-page>
  `
};

export const WithEvents: Story = {
  render: () => html`
    <gc-print-page
      @gc-print="${(e: CustomEvent) => console.log('Print triggered:', e.detail)}"
    ></gc-print-page>
    <p style="margin-top: 1rem; padding: 1rem; background: #f0f0f0; border-radius: 4px;">
      <strong>Try:</strong> Click the print button. Check the console for the event.
    </p>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-print-page locale="fr-CA"></gc-print-page>
  `
};

export const InContent: Story = {
  render: () => html`
    <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
      <article>
        <h1 style="margin-bottom: 1rem;">Apply for a Canadian passport</h1>
        
        <div style="display: flex; gap: 1rem; margin-bottom: 2rem; align-items: center;">
          <gc-print-page></gc-print-page>
          <span style="color: #666;">|</span>
          <a href="#" style="color: #0535d2; text-decoration: none;">Email this page</a>
          <span style="color: #666;">|</span>
          <a href="#" style="color: #0535d2; text-decoration: none;">Share</a>
        </div>

        <p style="margin-bottom: 1rem; color: #555;">
          Learn about applying for, renewing, replacing or updating a Canadian passport. Find out what documents you need, how to apply, and how long it takes.
        </p>

        <div style="margin-top: 2rem; padding: 1.5rem; background: #f5f5f5; border-radius: 4px;">
          <h2 style="margin-bottom: 1rem;">On this page</h2>
          <ul style="margin: 0; padding-left: 1.5rem;">
            <li style="margin-bottom: 0.5rem;">Who can apply</li>
            <li style="margin-bottom: 0.5rem;">How to apply</li>
            <li style="margin-bottom: 0.5rem;">Required documents</li>
            <li style="margin-bottom: 0.5rem;">Fees</li>
            <li>Processing times</li>
          </ul>
        </div>

        <div style="margin-top: 2rem; padding: 1.5rem; border: 1px solid #ddd; border-radius: 4px;">
          <h3 style="margin-bottom: 1rem;">Who can apply</h3>
          <p style="margin: 0; color: #555;">
            Canadian citizens can apply for a passport. You must be a Canadian citizen to get a Canadian passport.
          </p>
        </div>
      </article>
    </div>
  `
};

export const PrintSection: Story = {
  render: () => html`
    <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
      <h1 style="margin-bottom: 1rem;">Full Page Content</h1>
      
      <p style="margin-bottom: 1rem; color: #555;">
        This content is outside the printable section and won't be included when using the "Print section only" button.
      </p>

      <div id="printable-section" style="padding: 1.5rem; background: #f5f5f5; border-radius: 4px; margin-bottom: 1rem;">
        <h2 style="margin-bottom: 1rem;">Printable Section</h2>
        <p style="margin-bottom: 1rem; color: #555;">
          This is the content that will be printed when using the section print button.
        </p>
        <ul style="margin: 0; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem;">Item one</li>
          <li style="margin-bottom: 0.5rem;">Item two</li>
          <li>Item three</li>
        </ul>
      </div>

      <div style="display: flex; gap: 1rem;">
        <gc-print-page></gc-print-page>
        <gc-print-page variant="primary" printSelector="#printable-section"></gc-print-page>
      </div>

      <p style="margin-top: 1rem; padding: 1rem; background: #e6f0f7; border-radius: 4px;">
        <strong>Note:</strong> The first button prints the entire page. The second button (primary) prints only the highlighted section above.
      </p>
    </div>
  `
};

export const MultipleButtons: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <div style="display: flex; gap: 1rem; align-items: center;">
        <gc-print-page></gc-print-page>
        <span style="color: #666;">Default variant</span>
      </div>

      <div style="display: flex; gap: 1rem; align-items: center;">
        <gc-print-page variant="primary"></gc-print-page>
        <span style="color: #666;">Primary variant</span>
      </div>

      <div style="display: flex; gap: 1rem; align-items: center;">
        <gc-print-page .showIcon="${false}"></gc-print-page>
        <span style="color: #666;">Without icon</span>
      </div>

      <div style="display: flex; gap: 1rem; align-items: center;">
        <gc-print-page variant="primary" .showIcon="${false}"></gc-print-page>
        <span style="color: #666;">Primary without icon</span>
      </div>
    </div>
  `
};
