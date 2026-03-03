import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-social-share';

const meta: Meta = {
  title: 'GC Patterns/gc-social-share',
  component: 'gc-social-share',
  tags: ['autodocs'],
  argTypes: {
    showHeading: { control: 'boolean' },
    pageUrl: { control: 'text' },
    pageTitle: { control: 'text' },
    description: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <gc-social-share
      pageUrl="https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports.html"
      pageTitle="Apply for a Canadian passport"
      description="Learn about applying for, renewing, replacing or updating a Canadian passport."
    ></gc-social-share>
  `
};

export const WithoutHeading: Story = {
  render: () => html`
    <gc-social-share
      pageUrl="https://www.canada.ca"
      pageTitle="Canada.ca"
      .showHeading="${false}"
    ></gc-social-share>
  `
};

export const CustomPlatforms: Story = {
  render: () => html`
    <gc-social-share
      pageUrl="https://www.canada.ca"
      pageTitle="Canada.ca"
      .platforms="${['facebook', 'twitter', 'copy']}"
    ></gc-social-share>
  `
};

export const OnlyEmail: Story = {
  render: () => html`
    <gc-social-share
      pageUrl="https://www.canada.ca"
      pageTitle="Canada.ca"
      description="Official website of the Government of Canada"
      .platforms="${['email']}"
    ></gc-social-share>
  `
};

export const WithEvents: Story = {
  render: () => html`
    <gc-social-share
      pageUrl="https://www.canada.ca"
      pageTitle="Canada.ca"
      @gc-share="${(e: CustomEvent) => console.log('Shared on:', e.detail.platform, e.detail)}"
      @gc-share-copy="${(e: CustomEvent) => console.log('Link copied:', e.detail.url)}"
      @gc-share-copy-error="${(e: CustomEvent) => console.error('Copy failed:', e.detail.error)}"
    ></gc-social-share>
    <p style="margin-top: 1rem; padding: 1rem; background: #f0f0f0; border-radius: 4px;">
      <strong>Try:</strong> Click any share button or copy link. Check the console for events.
    </p>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-social-share
      locale="fr-CA"
      pageUrl="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/passeports-canadiens.html"
      pageTitle="Demander un passeport canadien"
      description="Renseignez-vous sur la façon de demander, renouveler, remplacer ou mettre à jour un passeport canadien."
    ></gc-social-share>
  `
};

export const InContent: Story = {
  render: () => html`
    <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
      <article>
        <h1 style="margin-bottom: 1rem;">Apply for a Canadian passport</h1>
        
        <p style="margin-bottom: 1rem; color: #555;">
          Learn about applying for, renewing, replacing or updating a Canadian passport. Find out what documents you need, how to apply, and how long it takes.
        </p>

        <gc-social-share
          pageUrl="https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports.html"
          pageTitle="Apply for a Canadian passport"
          description="Learn about applying for, renewing, replacing or updating a Canadian passport."
        ></gc-social-share>

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
      </article>
    </div>
  `
};
