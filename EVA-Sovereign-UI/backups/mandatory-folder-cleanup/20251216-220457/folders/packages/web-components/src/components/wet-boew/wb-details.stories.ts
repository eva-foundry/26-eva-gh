import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-details.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-details',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const BasicDetails: Story = {
  render: () => html`
    <wb-details>
      <span slot="summary">What is the Web Experience Toolkit?</span>
      <p>
        The Web Experience Toolkit (WET) is an award-winning front-end framework 
        for building websites that are accessible, usable, interoperable, mobile-friendly, 
        and multilingual. It provides reusable components for building Government of Canada websites.
      </p>
    </wb-details>
  `
};

export const MultipleItems: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <wb-details>
        <span slot="summary">How do I apply for a passport?</span>
        <p>
          You can apply for a Canadian passport by submitting a completed application form, 
          proof of Canadian citizenship, identification, and photos. Applications can be 
          submitted at a Service Canada office or by mail.
        </p>
      </wb-details>

      <wb-details>
        <span slot="summary">What documents do I need?</span>
        <ul>
          <li>Completed application form</li>
          <li>Proof of Canadian citizenship (birth certificate or citizenship certificate)</li>
          <li>Two identical passport photos</li>
          <li>Valid government-issued identification</li>
          <li>Payment for passport fees</li>
        </ul>
      </wb-details>

      <wb-details>
        <span slot="summary">How long does processing take?</span>
        <p>
          Standard processing time is approximately 20 business days. Express and urgent 
          services are available for an additional fee. Processing times may vary depending 
          on the season and volume of applications.
        </p>
      </wb-details>
    </div>
  `
};

export const InitiallyOpen: Story = {
  render: () => html`
    <wb-details open>
      <span slot="summary">Important Notice (Initially Expanded)</span>
      <div style="padding: 1rem; background: #fff3cd; border-left: 4px solid #ffc107;">
        <strong>Service Disruption:</strong> Our online services will be unavailable 
        on Saturday, December 14, 2025, from 2:00 AM to 6:00 AM EST for scheduled maintenance.
      </div>
    </wb-details>
  `
};

export const RichContent: Story = {
  render: () => html`
    <wb-details>
      <span slot="summary">View Detailed Statistics</span>
      <div style="padding: 1rem;">
        <h4 style="margin-top: 0;">2024 Annual Report</h4>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 0.5rem; text-align: left; border: 1px solid #ddd;">Quarter</th>
              <th style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">Applications</th>
              <th style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">Approved</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 0.5rem; border: 1px solid #ddd;">Q1</td>
              <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">12,450</td>
              <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">11,230</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border: 1px solid #ddd;">Q2</td>
              <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">15,680</td>
              <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">14,120</td>
            </tr>
          </tbody>
        </table>
      </div>
    </wb-details>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <wb-details
        @wb-details-toggle="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = 'Details ' + (e.detail.open ? 'expanded' : 'collapsed');
        }}"
      >
        <span slot="summary">Click to test events</span>
        <p>This content will trigger events when toggled.</p>
      </wb-details>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-details>
        <span slot="summary">Qu'est-ce que la Boîte à outils de l'expérience Web?</span>
        <p>
          La Boîte à outils de l'expérience Web (BOEW) est un cadre frontal primé pour 
          la création de sites Web accessibles, utilisables, interopérables, optimisés 
          pour les appareils mobiles et multilingues.
        </p>
      </wb-details>
    </div>
  `
};
