import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './gc-share';
import type { GCShare } from './gc-share';

const meta: Meta<GCShare> = {
  title: 'Components/GC Share',
  component: 'gc-share',
  tags: ['autodocs'],
  argTypes: {
    url: {
      control: 'text',
      description: 'URL to share (defaults to current page)',
      table: { category: 'Content' }
    },
    title: {
      control: 'text',
      description: 'Title to share (defaults to document.title)',
      table: { category: 'Content' }
    },
    platforms: {
      control: 'object',
      description: 'Array of platforms to display',
      table: { category: 'Content' }
    },
    hideHeading: {
      control: 'boolean',
      description: 'Hide "Share this page" heading',
      table: { category: 'Display' }
    },
    compact: {
      control: 'boolean',
      description: 'Use compact layout for sidebars',
      table: { category: 'Display' }
    },
    lang: {
      control: 'select',
      options: ['en-CA', 'fr-CA'],
      description: 'Component language',
      table: { category: 'Localization' }
    }
  }
};

export default meta;
type Story = StoryObj<GCShare>;

/**
 * Default share component with all platforms
 */
export const Default: Story = {
  args: {
    url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html',
    title: 'Immigrate to Canada',
    lang: 'en-CA'
  },
  render: (args) => html`
    <gc-share
      url="${args.url}"
      title="${args.title}"
      .platforms="${args.platforms}"
      ?hide-heading="${args.hideHeading}"
      ?compact="${args.compact}"
      lang="${args.lang}"
      @gc-share-click="${(e: CustomEvent) => console.log('Share clicked:', e.detail)}"
      @gc-share-success="${(e: CustomEvent) => console.log('Share success:', e.detail)}"
    ></gc-share>
  `
};

/**
 * Facebook only sharing
 */
export const FacebookOnly: Story = {
  args: {
    url: 'https://www.canada.ca/en/health-canada/news/2024/12/health-canada-updates.html',
    title: 'Health Canada Updates',
    platforms: ['facebook'],
    lang: 'en-CA'
  },
  render: (args) => html`
    <gc-share
      url="${args.url}"
      title="${args.title}"
      .platforms="${args.platforms}"
      lang="${args.lang}"
    ></gc-share>
  `
};

/**
 * Twitter and LinkedIn only (professional networks)
 */
export const ProfessionalNetworks: Story = {
  args: {
    url: 'https://www.canada.ca/en/innovation-science-economic-development/programs/digital-identity.html',
    title: 'Digital Identity in Canada',
    platforms: ['twitter', 'linkedin'],
    lang: 'en-CA'
  },
  render: (args) => html`
    <gc-share
      url="${args.url}"
      title="${args.title}"
      .platforms="${args.platforms}"
      lang="${args.lang}"
    ></gc-share>
  `
};

/**
 * Email and copy link only (private sharing)
 */
export const PrivateSharing: Story = {
  args: {
    url: 'https://www.canada.ca/en/revenue-agency/services/e-services/cra-login-services.html',
    title: 'CRA Login Services',
    platforms: ['email', 'copylink'],
    lang: 'en-CA'
  },
  render: (args) => html`
    <gc-share
      url="${args.url}"
      title="${args.title}"
      .platforms="${args.platforms}"
      lang="${args.lang}"
    ></gc-share>
  `
};

/**
 * Compact mode for sidebars and tight spaces
 */
export const Compact: Story = {
  args: {
    url: 'https://www.canada.ca/en/services/benefits.html',
    title: 'Benefits',
    compact: true,
    lang: 'en-CA'
  },
  render: (args) => html`
    <gc-share
      url="${args.url}"
      title="${args.title}"
      ?compact="${args.compact}"
      lang="${args.lang}"
    ></gc-share>
  `
};

/**
 * No heading (integrated into content)
 */
export const NoHeading: Story = {
  args: {
    url: 'https://www.canada.ca/en/employment-social-development/programs/ei.html',
    title: 'Employment Insurance',
    hideHeading: true,
    lang: 'en-CA'
  },
  render: (args) => html`
    <gc-share
      url="${args.url}"
      title="${args.title}"
      ?hide-heading="${args.hideHeading}"
      lang="${args.lang}"
    ></gc-share>
  `
};

/**
 * French localization
 */
export const French: Story = {
  args: {
    url: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada.html',
    title: 'Immigrer au Canada',
    lang: 'fr-CA'
  },
  render: (args) => html`
    <gc-share
      url="${args.url}"
      title="${args.title}"
      lang="${args.lang}"
    ></gc-share>
  `
};

/**
 * In article context
 */
export const InArticle: Story = {
  render: () => html`
    <article style="max-width: 800px; padding: 2rem; background: white;">
      <h1>New Digital Services Available</h1>
      <p style="color: #666; font-size: 0.875rem; margin-bottom: 1rem;">
        Published: January 15, 2024
      </p>
      <p style="line-height: 1.6; margin-bottom: 1.5rem;">
        The Government of Canada is pleased to announce the launch of new digital services
        designed to make it easier for Canadians to access government information and services online.
      </p>
      <p style="line-height: 1.6; margin-bottom: 2rem;">
        These services include improved online portals, mobile applications, and enhanced security features
        to protect your personal information.
      </p>
      <gc-share
        url="https://www.canada.ca/en/news/digital-services.html"
        title="New Digital Services Available"
        lang="en-CA"
      ></gc-share>
    </article>
  `
};

/**
 * In page footer
 */
export const InPageFooter: Story = {
  render: () => html`
    <footer style="border-top: 1px solid #e1e4e7; padding-top: 2rem; margin-top: 3rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem;">
        <div>
          <gc-share
            url="https://www.canada.ca/en/transparency/reporting.html"
            title="Annual Transparency Report"
            compact
            lang="en-CA"
          ></gc-share>
        </div>
        <div style="text-align: right; color: #666; font-size: 0.875rem;">
          <p>Date modified: 2024-01-15</p>
        </div>
      </div>
    </footer>
  `
};

/**
 * Event tracking example
 */
export const EventTracking: Story = {
  args: {
    url: 'https://www.canada.ca/en/services.html',
    title: 'Government Services',
    lang: 'en-CA'
  },
  render: (args) => html`
    <div>
      <gc-share
        url="${args.url}"
        title="${args.title}"
        lang="${args.lang}"
        @gc-share-click="${(e: CustomEvent) => {
          alert(`Shared on ${e.detail.platform}: ${e.detail.url}`);
        }}"
        @gc-share-success="${(e: CustomEvent) => {
          alert(`Successfully copied link: ${e.detail.url}`);
        }}"
      ></gc-share>
      <p style="margin-top: 1rem; color: #666; font-size: 0.875rem;">
        Click any share button to see event tracking
      </p>
    </div>
  `
};

/**
 * Multiple share widgets
 */
export const MultipleWidgets: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3 style="margin-bottom: 1rem;">News Article</h3>
        <gc-share
          url="https://www.canada.ca/en/news/article-1.html"
          title="Important Government Announcement"
          lang="en-CA"
        ></gc-share>
      </div>
      <div>
        <h3 style="margin-bottom: 1rem;">Service Page (Compact)</h3>
        <gc-share
          url="https://www.canada.ca/en/services/page.html"
          title="Apply for Benefits"
          compact
          lang="en-CA"
        ></gc-share>
      </div>
      <div>
        <h3 style="margin-bottom: 1rem;">Social Media Only</h3>
        <gc-share
          url="https://www.canada.ca/en/campaign.html"
          title="National Campaign"
          .platforms="${['facebook', 'twitter', 'linkedin']}"
          hide-heading
          lang="en-CA"
        ></gc-share>
      </div>
    </div>
  `
};

/**
 * Accessibility test
 */
export const Accessibility: Story = {
  args: {
    url: 'https://www.canada.ca/en/accessibility.html',
    title: 'Accessibility at Canada.ca',
    lang: 'en-CA'
  },
  render: (args) => html`
    <div>
      <gc-share
        url="${args.url}"
        title="${args.title}"
        lang="${args.lang}"
      ></gc-share>
      <div style="margin-top: 2rem; padding: 1rem; background: #f5f5f5; border-radius: 0.25rem;">
        <h3 style="margin-bottom: 0.5rem;">Accessibility Features:</h3>
        <ul style="list-style-position: inside; line-height: 1.6;">
          <li>Semantic button elements for all platforms</li>
          <li>aria-label on all share buttons</li>
          <li>44px touch targets for mobile</li>
          <li>role="status" and aria-live="polite" on success feedback</li>
          <li>Keyboard navigable (Tab key)</li>
          <li>Clear focus indicators (3px blue outline)</li>
        </ul>
      </div>
    </div>
  `
};
