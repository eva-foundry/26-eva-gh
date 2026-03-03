import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-feedback.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-feedback',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const BasicFeedback: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <h2>Page Content</h2>
      <p>This is sample page content. Click the feedback button to provide your opinion.</p>
      <wb-feedback></wb-feedback>
    </div>
  `
};

export const InFooter: Story = {
  render: () => html`
    <div style="min-height: 300px; display: flex; flex-direction: column;">
      <div style="flex: 1; padding: 2rem;">
        <h2>Main Content</h2>
        <p>Scroll down to see the feedback button in the footer.</p>
      </div>
      <footer style="background: #f5f5f5; padding: 2rem; border-top: 1px solid #ddd;">
        <p><strong>Was this page helpful?</strong></p>
        <wb-feedback></wb-feedback>
      </footer>
    </div>
  `
};

export const InSidebar: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem;">
      <main style="padding: 2rem;">
        <h2>Article Title</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat.
        </p>
      </main>
      <aside style="background: #f5f5f5; padding: 1.5rem;">
        <h3>Feedback</h3>
        <p style="font-size: 0.9em; margin-bottom: 1rem;">
          Help us improve this content
        </p>
        <wb-feedback></wb-feedback>
      </aside>
    </div>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem; min-height: 50px;">
        Event log will appear here
      </div>
      <wb-feedback
        @wb-feedback-submit="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) {
            log.innerHTML = '<strong>Feedback submitted:</strong><br>' +
              'Rating: ' + e.detail.rating + '<br>' +
              'Comments: ' + (e.detail.comments || '(none)') + '<br>' +
              'Email: ' + (e.detail.email || '(not provided)') + '<br>' +
              'Page: ' + e.detail.page + '<br>' +
              'Time: ' + new Date(e.detail.timestamp).toLocaleString();
          }
        }}"
      ></wb-feedback>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA" style="padding: 2rem;">
      <h2>Contenu de la page</h2>
      <p>Ceci est un exemple de contenu de page. Cliquez sur le bouton pour donner votre avis.</p>
      <wb-feedback></wb-feedback>
    </div>
  `
};
