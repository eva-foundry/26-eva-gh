import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-page-banner';

const meta: Meta = {
  title: 'GC Patterns/gc-page-banner',
  component: 'gc-page-banner',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error']
    },
    dismissible: { control: 'boolean' },
    showIcon: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  render: () => html`
    <gc-page-banner
      variant="info"
      heading="New service available"
      description="You can now apply for benefits online through our new portal."
    ></gc-page-banner>
  `
};

export const Success: Story = {
  render: () => html`
    <gc-page-banner
      variant="success"
      heading="Application submitted successfully"
      description="Your application has been received. You will receive a confirmation email within 24 hours."
    ></gc-page-banner>
  `
};

export const Warning: Story = {
  render: () => html`
    <gc-page-banner
      variant="warning"
      heading="Service interruption scheduled"
      description="This service will be unavailable on Saturday, December 14, 2025 from 1:00 AM to 5:00 AM EST for scheduled maintenance."
    ></gc-page-banner>
  `
};

export const Error: Story = {
  render: () => html`
    <gc-page-banner
      variant="error"
      heading="Service currently unavailable"
      description="We are experiencing technical difficulties. Please try again later or contact support."
    ></gc-page-banner>
  `
};

export const Dismissible: Story = {
  render: () => html`
    <gc-page-banner
      variant="info"
      heading="Cookie notice"
      description="This website uses cookies to enhance your browsing experience."
      dismissible
    ></gc-page-banner>
  `
};

export const WithoutIcon: Story = {
  render: () => html`
    <gc-page-banner
      variant="info"
      heading="Important announcement"
      description="Please review the updated terms and conditions."
      .showIcon="${false}"
    ></gc-page-banner>
  `
};

export const WithSlottedContent: Story = {
  render: () => html`
    <gc-page-banner
      variant="warning"
      heading="Account requires verification"
    >
      <p style="margin: 0 0 0.5rem 0;">
        Your account needs to be verified before you can access all features.
      </p>
      <a href="#" style="color: #26374a; font-weight: 600; text-decoration: underline;">
        Verify your account now
      </a>
    </gc-page-banner>
  `
};

export const WithEvents: Story = {
  render: () => html`
    <gc-page-banner
      variant="info"
      heading="Notification"
      description="Click the × button to dismiss this banner."
      dismissible
      @gc-banner-close="${(e: CustomEvent) => {
        console.log('Banner closed:', e.detail);
      }}"
    ></gc-page-banner>
    <p style="margin-top: 1rem; padding: 1rem; background: #f0f0f0; border-radius: 4px;">
      <strong>Try:</strong> Dismiss the banner and check the console for event details.
    </p>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-page-banner
      locale="fr-CA"
      variant="info"
      heading="Nouveau service disponible"
      description="Vous pouvez maintenant présenter une demande de prestations en ligne via notre nouveau portail."
      dismissible
    ></gc-page-banner>
  `
};

export const InPageContext: Story = {
  render: () => html`
    <div style="max-width: 1200px; margin: 0 auto;">
      <gc-page-banner
        variant="warning"
        heading="Weather alert"
        description="Severe weather warning in effect. Travel may be affected. Check local conditions before departing."
        dismissible
      ></gc-page-banner>

      <main style="padding: 2rem 1rem;">
        <h1 style="margin-bottom: 1rem;">Travel advisories</h1>
        
        <p style="margin-bottom: 1rem; color: #555; line-height: 1.6;">
          Check current travel advisories and alerts before planning international travel.
        </p>

        <div style="padding: 1.5rem; background: #f5f5f5; border-radius: 4px;">
          <h2 style="margin: 0 0 1rem 0; font-size: 1.25rem;">Recent updates</h2>
          <ul style="margin: 0; padding-left: 1.5rem;">
            <li style="margin-bottom: 0.5rem;">Updated safety information for Europe</li>
            <li style="margin-bottom: 0.5rem;">New entry requirements for Asia-Pacific</li>
            <li>Health advisories for Caribbean destinations</li>
          </ul>
        </div>
      </main>
    </div>
  `
};

export const MultipleBanners: Story = {
  render: () => html`
    <div style="max-width: 1200px; margin: 0 auto;">
      <gc-page-banner
        variant="error"
        heading="Critical system maintenance"
        description="Online services will be unavailable December 15-16, 2025."
        dismissible
      ></gc-page-banner>

      <gc-page-banner
        variant="warning"
        heading="Application deadline approaching"
        description="Submit your application before December 31, 2025 to be considered for this intake."
        dismissible
        style="margin-top: 1rem;"
      ></gc-page-banner>

      <gc-page-banner
        variant="info"
        heading="New feature available"
        description="You can now save your application progress and return later."
        dismissible
        style="margin-top: 1rem;"
      ></gc-page-banner>

      <main style="padding: 2rem 1rem; margin-top: 2rem; background: #fff; border: 1px solid #ddd; border-radius: 4px;">
        <h1 style="margin-bottom: 1rem;">Applications</h1>
        <p style="color: #555;">Application content goes here...</p>
      </main>
    </div>
  `
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem; background: #f5f5f5;">
      <div>
        <h3 style="margin: 0 0 0.5rem 0;">Info</h3>
        <gc-page-banner
          variant="info"
          heading="Information banner"
          description="This is an informational message."
          dismissible
        ></gc-page-banner>
      </div>

      <div>
        <h3 style="margin: 0 0 0.5rem 0;">Success</h3>
        <gc-page-banner
          variant="success"
          heading="Success banner"
          description="This is a success message."
          dismissible
        ></gc-page-banner>
      </div>

      <div>
        <h3 style="margin: 0 0 0.5rem 0;">Warning</h3>
        <gc-page-banner
          variant="warning"
          heading="Warning banner"
          description="This is a warning message."
          dismissible
        ></gc-page-banner>
      </div>

      <div>
        <h3 style="margin: 0 0 0.5rem 0;">Error</h3>
        <gc-page-banner
          variant="error"
          heading="Error banner"
          description="This is an error message."
          dismissible
        ></gc-page-banner>
      </div>
    </div>
  `
};
