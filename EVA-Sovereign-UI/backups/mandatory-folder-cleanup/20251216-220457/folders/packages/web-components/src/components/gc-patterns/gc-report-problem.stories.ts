import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-report-problem';

const meta: Meta = {
  title: 'GC Patterns/gc-report-problem',
  component: 'gc-report-problem',
  tags: ['autodocs'],
  argTypes: {
    showPrivacyNotice: { control: 'boolean' },
    pageUrl: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <gc-report-problem></gc-report-problem>
  `
};

export const WithoutPrivacyNotice: Story = {
  render: () => html`
    <gc-report-problem .showPrivacyNotice="${false}"></gc-report-problem>
  `
};

export const CustomCategories: Story = {
  render: () => html`
    <gc-report-problem
      .categories="${[
        { id: 'technical', label: 'Technical issue' },
        { id: 'content', label: 'Content problem' },
        { id: 'accessibility', label: 'Accessibility issue' }
      ]}"
    ></gc-report-problem>
  `
};

export const WithAPI: Story = {
  render: () => html`
    <gc-report-problem
      apiEndpoint="https://api.example.com/report-problem"
      pageUrl="https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports.html"
    ></gc-report-problem>
    <p style="margin-top: 1rem; padding: 1rem; background: #f0f0f0; border-radius: 4px;">
      <strong>Note:</strong> This example is configured to send reports to an API endpoint (mock URL).
    </p>
  `
};

export const WithEvents: Story = {
  render: () => html`
    <gc-report-problem
      @gc-problem-submit="${(e: CustomEvent) => console.log('Problem submitted:', e.detail)}"
      @gc-problem-cancel="${() => console.log('Form cancelled')}"
      @gc-problem-error="${(e: CustomEvent) => console.error('Submission error:', e.detail)}"
    ></gc-report-problem>
    <p style="margin-top: 1rem; padding: 1rem; background: #f0f0f0; border-radius: 4px;">
      <strong>Try:</strong> Fill out and submit the form, or click cancel. Check the console for events.
    </p>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-report-problem locale="fr-CA"></gc-report-problem>
  `
};

export const InPageContext: Story = {
  render: () => html`
    <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
      <article>
        <h1 style="margin-bottom: 1rem;">Apply for a Canadian passport</h1>
        
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

        <div style="margin-top: 3rem; padding: 1.5rem; border: 1px solid #ddd; border-radius: 4px;">
          <h3 style="margin-bottom: 1rem;">Who can apply</h3>
          <p style="margin: 0; color: #555;">
            Canadian citizens can apply for a passport. You must be a Canadian citizen to get a Canadian passport.
          </p>
        </div>

        <div style="margin-top: 3rem;">
          <h3 style="margin-bottom: 1rem;">Did you find what you were looking for?</h3>
          <gc-report-problem
            pageUrl="https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports.html"
          ></gc-report-problem>
        </div>
      </article>
    </div>
  `
};

export const AfterContentSection: Story = {
  render: () => html`
    <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
      <article>
        <h1 style="margin-bottom: 1.5rem;">Page title</h1>
        
        <div style="padding: 2rem; background: #fff; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 2rem;">
          <p style="margin: 0; color: #555;">Main content goes here...</p>
        </div>

        <hr style="margin: 3rem 0; border: none; border-top: 1px solid #ddd;" />

        <aside>
          <gc-report-problem></gc-report-problem>
        </aside>
      </article>
    </div>
  `
};
