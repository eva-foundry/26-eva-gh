import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-twitter.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-twitter',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const GovernmentAccount: Story = {
  render: () => html`
    <wb-twitter
      username="Canada"
      width="400"
      height="600"
      tweetLimit="5"
    ></wb-twitter>
  `
};

export const CompactTimeline: Story = {
  render: () => html`
    <wb-twitter
      username="CanadianPM"
      width="350"
      height="400"
      tweetLimit="3"
    ></wb-twitter>
  `
};

export const DarkTheme: Story = {
  render: () => html`
    <div style="background: #15202b; padding: 2rem;">
      <wb-twitter
        username="Canada"
        width="400"
        height="600"
        theme="dark"
        tweetLimit="5"
      ></wb-twitter>
    </div>
  `
};

export const TallTimeline: Story = {
  render: () => html`
    <wb-twitter
      username="Canada"
      width="400"
      height="800"
      tweetLimit="10"
    ></wb-twitter>
  `
};

export const InSidebar: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 1fr 400px; gap: 2rem; max-width: 1200px;">
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
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
          veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
      </div>
      <aside>
        <h3 style="margin-top: 0;">Latest Updates</h3>
        <wb-twitter
          username="Canada"
          width="400"
          height="600"
          tweetLimit="5"
        ></wb-twitter>
      </aside>
    </div>
  `
};

export const MultipleSources: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 900px;">
      <div>
        <h3 style="margin-top: 0;">Government of Canada</h3>
        <wb-twitter
          username="Canada"
          width="400"
          height="500"
          tweetLimit="3"
        ></wb-twitter>
      </div>
      <div>
        <h3 style="margin-top: 0;">Prime Minister</h3>
        <wb-twitter
          username="CanadianPM"
          width="400"
          height="500"
          tweetLimit="3"
        ></wb-twitter>
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
      <wb-twitter
        username="Canada"
        @wb-twitter-loaded="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = 'Twitter timeline loaded for @' + e.detail.username;
        }}"
        @wb-twitter-error="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = 'Failed to load timeline for @' + e.detail.username;
        }}"
      ></wb-twitter>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <h3>Suivez-nous sur Twitter</h3>
      <wb-twitter
        username="Canada"
        width="400"
        height="600"
        tweetLimit="5"
      ></wb-twitter>
    </div>
  `
};
