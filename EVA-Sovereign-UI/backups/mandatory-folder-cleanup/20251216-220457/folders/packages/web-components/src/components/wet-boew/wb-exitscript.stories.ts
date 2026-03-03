import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-exitscript.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-exitscript',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const BasicExample: Story = {
  render: () => html`
    <wb-exitscript>
      <p>
        Click the external link below to see the warning:
        <a href="https://www.google.com">Google (External)</a>
      </p>
      <p>
        Internal links work normally:
        <a href="/about">About Page (Internal)</a>
      </p>
    </wb-exitscript>
  `
};

export const MultipleLinks: Story = {
  render: () => html`
    <wb-exitscript>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <h4>External Links (will show warning)</h4>
          <ul>
            <li><a href="https://www.canada.ca">Canada.ca</a></li>
            <li><a href="https://www.github.com">GitHub</a></li>
            <li><a href="https://www.google.com">Google</a></li>
          </ul>
        </div>
        
        <div>
          <h4>Internal Links (no warning)</h4>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h4>Special Links (no warning)</h4>
          <ul>
            <li><a href="#section">Jump to Section</a></li>
            <li><a href="mailto:info@example.com">Email Us</a></li>
            <li><a href="tel:1-800-123-4567">Call Us</a></li>
          </ul>
        </div>
      </div>
    </wb-exitscript>
  `
};

export const InContent: Story = {
  render: () => html`
    <wb-exitscript>
      <article style="max-width: 800px;">
        <h2>Government Services</h2>
        <p>
          The Government of Canada provides various services to citizens. 
          For more information, visit the 
          <a href="https://www.canada.ca/en/services.html">official services page</a>.
        </p>
        <p>
          You can also find helpful resources on external sites like 
          <a href="https://www.servicecanada.gc.ca">Service Canada</a> and 
          <a href="https://www.cra-arc.gc.ca">Canada Revenue Agency</a>.
        </p>
        <p>
          For internal navigation, use our <a href="/sitemap">sitemap</a> or 
          <a href="/search">search</a> features.
        </p>
      </article>
    </wb-exitscript>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <wb-exitscript
        @wb-exitscript-shown="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Warning shown for: ${e.detail.url}`;
        }}"
        @wb-exitscript-continue="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `User continued to: ${e.detail.url}`;
        }}"
        @wb-exitscript-cancel="${() => {
          const log = document.getElementById('log');
          if (log) log.textContent = 'User cancelled external navigation';
        }}"
      >
        <p>
          Test external link: 
          <a href="https://www.example.com">Example.com</a>
        </p>
      </wb-exitscript>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-exitscript>
        <p>
          Cliquez sur le lien externe ci-dessous pour voir l'avertissement :
          <a href="https://www.google.com">Google (Externe)</a>
        </p>
        <p>
          Les liens internes fonctionnent normalement :
          <a href="/a-propos">Page À propos (Interne)</a>
        </p>
      </wb-exitscript>
    </div>
  `
};
