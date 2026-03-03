import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-facebook.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-facebook',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const GovernmentPage: Story = {
  render: () => html`
    <wb-facebook
      pageUrl="https://www.facebook.com/CanadianGovernment"
      width="340"
      height="500"
    ></wb-facebook>
  `
};

export const CustomSize: Story = {
  render: () => html`
    <wb-facebook
      pageUrl="https://www.facebook.com/Canada"
      width="500"
      height="600"
    ></wb-facebook>
  `
};

export const NoFaces: Story = {
  render: () => html`
    <wb-facebook
      pageUrl="https://www.facebook.com/CanadianGovernment"
      width="340"
      height="400"
      showFaces="false"
    ></wb-facebook>
  `
};

export const SmallHeader: Story = {
  render: () => html`
    <wb-facebook
      pageUrl="https://www.facebook.com/Canada"
      width="340"
      height="400"
      smallHeader
    ></wb-facebook>
  `
};

export const Compact: Story = {
  render: () => html`
    <wb-facebook
      pageUrl="https://www.facebook.com/CanadianGovernment"
      width="300"
      height="300"
      showFaces="false"
      showHeader="false"
    ></wb-facebook>
  `
};

export const InSidebar: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 1fr 340px; gap: 2rem; max-width: 1200px;">
      <div style="padding: 1rem; background: white; border: 1px solid #ddd;">
        <h2 style="margin-top: 0;">Main Content</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
          eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <aside>
        <h3 style="margin-top: 0;">Follow Us</h3>
        <wb-facebook
          pageUrl="https://www.facebook.com/CanadianGovernment"
          width="340"
          height="500"
        ></wb-facebook>
      </aside>
    </div>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <wb-facebook
        pageUrl="https://www.facebook.com/Canada"
        @wb-facebook-loaded="${() => {
          const log = document.getElementById('log');
          if (log) log.textContent = 'Facebook page loaded successfully';
        }}"
        @wb-facebook-error="${() => {
          const log = document.getElementById('log');
          if (log) log.textContent = 'Failed to load Facebook page';
        }}"
      ></wb-facebook>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <h3>Suivez-nous sur Facebook</h3>
      <wb-facebook
        pageUrl="https://www.facebook.com/Canada"
        width="340"
        height="500"
      ></wb-facebook>
    </div>
  `
};
