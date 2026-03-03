import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-data-inview.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-data-inview',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const BasicLazyLoad: Story = {
  render: () => html`
    <div>
      <p>Scroll down to see lazy loaded content...</p>
      <div style="height: 1500px; background: linear-gradient(to bottom, #f0f0f0, #ffffff);">
        <p style="text-align: center; padding-top: 50px;">Scroll down</p>
      </div>
      <wb-data-inview url="https://jsonplaceholder.typicode.com/posts/1"></wb-data-inview>
    </div>
  `
};

export const MultipleItems: Story = {
  render: () => html`
    <div>
      <p>Scroll down to lazy load multiple items:</p>
      <div style="height: 800px; background: #f9f9f9;"></div>
      <wb-data-inview url="https://jsonplaceholder.typicode.com/posts/1" style="margin-bottom: 2rem;"></wb-data-inview>
      <div style="height: 800px; background: #f9f9f9;"></div>
      <wb-data-inview url="https://jsonplaceholder.typicode.com/posts/2" style="margin-bottom: 2rem;"></wb-data-inview>
      <div style="height: 800px; background: #f9f9f9;"></div>
      <wb-data-inview url="https://jsonplaceholder.typicode.com/posts/3"></wb-data-inview>
    </div>
  `
};

export const CustomThreshold: Story = {
  render: () => html`
    <div>
      <p>This content loads when 50% visible (threshold=0.5):</p>
      <div style="height: 1200px; background: #f0f0f0;"></div>
      <wb-data-inview url="https://jsonplaceholder.typicode.com/posts/4" threshold="0.5"></wb-data-inview>
    </div>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="position: sticky; top: 0; padding: 1rem; background: #f0f0f0; margin-bottom: 1rem; z-index: 10;">
        Event log will appear here
      </div>
      <div style="height: 1200px; background: #f9f9f9;"></div>
      <wb-data-inview 
        url="https://jsonplaceholder.typicode.com/posts/5"
        @wb-inview-loaded="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Content loaded: ${e.detail.url}`;
        }}"
        @wb-inview-error="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Error loading: ${e.detail.url}`;
        }}"
      ></wb-data-inview>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <p>Faites défiler vers le bas pour voir le contenu chargé paresseusement...</p>
      <div style="height: 1200px; background: linear-gradient(to bottom, #e8f5e9, #ffffff);"></div>
      <wb-data-inview url="https://jsonplaceholder.typicode.com/posts/6"></wb-data-inview>
    </div>
  `
};
