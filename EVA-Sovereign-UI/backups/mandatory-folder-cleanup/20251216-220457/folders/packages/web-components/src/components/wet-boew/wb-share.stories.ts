import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-share.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-share',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const AllPlatforms: Story = {
  render: () => html`
    <wb-share
      url="https://www.canada.ca"
      title="Government of Canada"
      description="Official website of the Government of Canada"
    ></wb-share>
  `
};

export const FacebookOnly: Story = {
  render: () => html`
    <wb-share
      url="https://www.canada.ca"
      title="Government of Canada"
      .platforms="${['facebook']}"
    ></wb-share>
  `
};

export const SocialMediaOnly: Story = {
  render: () => html`
    <wb-share
      url="https://www.canada.ca/en/services.html"
      title="Services - Canada.ca"
      .platforms="${['facebook', 'twitter', 'linkedin']}"
    ></wb-share>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <wb-share
        url="https://www.canada.ca"
        title="Test Page"
        @wb-share="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Shared on ${e.detail.platform}: ${e.detail.url}`;
        }}"
      ></wb-share>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-share
        url="https://www.canada.ca/fr.html"
        title="Gouvernement du Canada"
        description="Site officiel du gouvernement du Canada"
      ></wb-share>
    </div>
  `
};
