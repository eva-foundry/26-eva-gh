import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-data-ajax.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-data-ajax',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const BasicLoad: Story = {
  render: () => html`
    <wb-data-ajax url="https://jsonplaceholder.typicode.com/posts/1" auto-load="true"></wb-data-ajax>
  `
};

export const ManualLoad: Story = {
  render: () => html`
    <div>
      <button onclick="document.querySelector('wb-data-ajax').loadContent()">
        Load Content
      </button>
      <wb-data-ajax url="https://jsonplaceholder.typicode.com/posts/2" auto-load="false"></wb-data-ajax>
    </div>
  `
};

export const WithCaching: Story = {
  render: () => html`
    <div>
      <p>Content is cached - reloading will use cached version:</p>
      <button onclick="document.querySelector('wb-data-ajax').loadContent()">
        Reload (from cache)
      </button>
      <button onclick="document.querySelector('wb-data-ajax').clearCache(); document.querySelector('wb-data-ajax').loadContent()">
        Clear Cache & Reload
      </button>
      <wb-data-ajax url="https://jsonplaceholder.typicode.com/posts/3" cache="true"></wb-data-ajax>
    </div>
  `
};

export const ErrorHandling: Story = {
  render: () => html`
    <wb-data-ajax url="https://jsonplaceholder.typicode.com/invalid-endpoint" auto-load="true"></wb-data-ajax>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-data-ajax url="https://jsonplaceholder.typicode.com/posts/4" auto-load="true"></wb-data-ajax>
    </div>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <wb-data-ajax 
        url="https://jsonplaceholder.typicode.com/posts/5"
        @wb-ajax-loaded="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Loaded: ${e.detail.url} (cached: ${e.detail.cached})`;
        }}"
        @wb-ajax-error="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Error: ${e.detail.error}`;
        }}"
      ></wb-data-ajax>
    </div>
  `
};
