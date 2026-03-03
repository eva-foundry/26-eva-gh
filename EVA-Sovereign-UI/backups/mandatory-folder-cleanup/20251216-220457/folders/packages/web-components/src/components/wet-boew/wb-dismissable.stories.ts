import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-dismissable.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-dismissable',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const BasicNotice: Story = {
  render: () => html`
    <wb-dismissable storageKey="basic-notice">
      <p style="margin: 0;">
        <strong>Note:</strong> This website uses cookies to improve your experience.
        By continuing to use this site, you agree to our cookie policy.
      </p>
    </wb-dismissable>
  `
};

export const Announcement: Story = {
  render: () => html`
    <wb-dismissable storageKey="announcement">
      <div style="padding: 0.5rem 0;">
        <h3 style="margin: 0 0 0.5rem 0;">New Feature Available</h3>
        <p style="margin: 0;">
          We've added a new online form that allows you to submit applications
          directly through your account. Try it today!
        </p>
      </div>
    </wb-dismissable>
  `
};

export const TemporaryBanner: Story = {
  render: () => html`
    <wb-dismissable persistent="false" storageKey="temp-banner">
      <div style="padding: 0.5rem 0; background: #d4edda; margin: -1rem; padding: 1rem; border-radius: 4px;">
        <p style="margin: 0; color: #155724;">
          <strong>✓ Success:</strong> Your preferences have been saved.
        </p>
      </div>
    </wb-dismissable>
  `
};

export const InlineHelp: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <h2>Application Form</h2>
      
      <wb-dismissable storageKey="form-help">
        <div style="background: #e7f3ff; margin: -1rem; padding: 1rem; border-radius: 4px;">
          <h4 style="margin: 0 0 0.5rem 0; color: #004085;">💡 Helpful Tips</h4>
          <ul style="margin: 0; padding-left: 1.5rem;">
            <li>Have your documents ready before starting</li>
            <li>You can save progress and return later</li>
            <li>Required fields are marked with an asterisk (*)</li>
          </ul>
        </div>
      </wb-dismissable>

      <form style="margin-top: 1rem; padding: 1rem; background: white; border: 1px solid #ddd;">
        <p>Form fields would appear here...</p>
      </form>
    </div>
  `
};

export const MultipleDismissable: Story = {
  render: () => html`
    <div style="max-width: 700px; display: flex; flex-direction: column; gap: 1rem;">
      <wb-dismissable storageKey="notice-1">
        <p style="margin: 0;">
          <strong>Privacy Notice:</strong> We value your privacy. Read our updated
          privacy policy to learn how we protect your data.
        </p>
      </wb-dismissable>

      <wb-dismissable storageKey="notice-2">
        <div style="background: #fff3cd; margin: -1rem; padding: 1rem; border-radius: 4px;">
          <p style="margin: 0; color: #856404;">
            <strong>Maintenance Alert:</strong> Scheduled maintenance on Saturday,
            December 14, 2025, from 2:00 AM to 6:00 AM EST.
          </p>
        </div>
      </wb-dismissable>

      <wb-dismissable storageKey="notice-3">
        <p style="margin: 0;">
          <strong>Browser Support:</strong> For the best experience, we recommend
          using the latest version of Chrome, Firefox, Safari, or Edge.
        </p>
      </wb-dismissable>

      <div style="padding: 2rem; background: white; border: 1px solid #ddd;">
        <h2 style="margin-top: 0;">Main Content</h2>
        <p>Your page content appears here after the dismissable notices.</p>
      </div>
    </div>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <wb-dismissable
        storageKey="event-demo"
        @wb-dismissable-dismissed="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) {
            const persistent = e.detail.persistent ? 'persistent' : 'temporary';
            log.textContent = 'Dismissed (' + persistent + ')';
          }
        }}"
      >
        <p style="margin: 0;">Click the × button to dismiss and trigger event.</p>
      </wb-dismissable>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-dismissable storageKey="fr-notice">
        <p style="margin: 0;">
          <strong>Avis :</strong> Ce site Web utilise des témoins pour améliorer
          votre expérience. En continuant à utiliser ce site, vous acceptez notre
          politique en matière de témoins.
        </p>
      </wb-dismissable>
    </div>
  `
};
