import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-country-content.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-country-content',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const BasicGeolocation: Story = {
  render: () => html`
    <wb-country-content>
      <div data-country="CA" style="padding: 1rem; background: #d4edda; border: 2px solid #28a745; border-radius: 4px;">
        <h3 style="margin: 0 0 0.5rem 0;">🍁 Welcome to Canada.ca</h3>
        <p style="margin: 0;">
          Access services and information for Canadian residents and citizens.
        </p>
      </div>
      <div data-country="US" style="padding: 1rem; background: #cce5ff; border: 2px solid #004085; border-radius: 4px;">
        <h3 style="margin: 0 0 0.5rem 0;">🗽 Visiting from the United States?</h3>
        <p style="margin: 0;">
          Find information for US visitors to Canada, including travel requirements and border services.
        </p>
      </div>
      <div data-default style="padding: 1rem; background: #fff3cd; border: 2px solid #856404; border-radius: 4px;">
        <h3 style="margin: 0 0 0.5rem 0;">🌍 International Visitors</h3>
        <p style="margin: 0;">
          Welcome to Canada.ca. Find information about visiting, studying, or immigrating to Canada.
        </p>
      </div>
    </wb-country-content>
  `
};

export const RegionalServices: Story = {
  render: () => html`
    <div style="max-width: 700px;">
      <h2>Service Availability</h2>
      <wb-country-content>
        <div data-country="CA">
          <div style="padding: 1.5rem; background: white; border: 1px solid #ddd; border-radius: 4px;">
            <h3 style="margin: 0 0 1rem 0;">Services Available in Canada</h3>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>Online passport renewal</li>
              <li>Tax filing and benefits</li>
              <li>Employment insurance</li>
              <li>Health card renewal</li>
              <li>Business registration</li>
            </ul>
          </div>
        </div>
        <div data-country="US,MX">
          <div style="padding: 1.5rem; background: white; border: 1px solid #ddd; border-radius: 4px;">
            <h3 style="margin: 0 0 1rem 0;">Services for North American Visitors</h3>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>Visitor information</li>
              <li>Border crossing requirements</li>
              <li>Temporary work permits</li>
              <li>Study permits</li>
            </ul>
          </div>
        </div>
        <div data-default>
          <div style="padding: 1.5rem; background: white; border: 1px solid #ddd; border-radius: 4px;">
            <h3 style="margin: 0 0 1rem 0;">International Services</h3>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>Visa and immigration information</li>
              <li>Embassy and consulate locations</li>
              <li>Travel advisories</li>
              <li>International trade</li>
            </ul>
          </div>
        </div>
      </wb-country-content>
    </div>
  `
};

export const EmergencyAlerts: Story = {
  render: () => html`
    <wb-country-content>
      <div data-country="CA" style="padding: 1rem; background: #f8d7da; border-left: 4px solid #dc3545; margin-bottom: 1rem;">
        <strong>Emergency Alert System:</strong> Sign up for emergency alerts in your province or territory.
        Available in all Canadian regions.
      </div>
      <div data-default style="padding: 1rem; background: #fff3cd; border-left: 4px solid #ffc107; margin-bottom: 1rem;">
        <strong>Travel Safety:</strong> Register with the Embassy before traveling to Canada to receive
        important safety and security updates.
      </div>
    </wb-country-content>

    <div style="padding: 1.5rem; background: white; border: 1px solid #ddd;">
      <h2 style="margin-top: 0;">Main Content</h2>
      <p>This content is visible to all users regardless of location.</p>
    </div>
  `
};

export const ManualControl: Story = {
  render: () => {
    const setCanada = () => {
      const element = document.getElementById('manual-country') as any;
      if (element) element.setCountry('CA');
    };

    const setUS = () => {
      const element = document.getElementById('manual-country') as any;
      if (element) element.setCountry('US');
    };

    const setOther = () => {
      const element = document.getElementById('manual-country') as any;
      if (element) element.setCountry('FR');
    };

    return html`
      <div style="max-width: 700px;">
        <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem;">
          <button @click="${setCanada}" style="padding: 0.5rem 1rem; background: #28a745; color: white; border: none; border-radius: 3px; cursor: pointer;">
            View as Canada
          </button>
          <button @click="${setUS}" style="padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer;">
            View as US
          </button>
          <button @click="${setOther}" style="padding: 0.5rem 1rem; background: #6c757d; color: white; border: none; border-radius: 3px; cursor: pointer;">
            View as International
          </button>
        </div>

        <wb-country-content id="manual-country">
          <div data-country="CA" style="padding: 1rem; background: #d4edda; border-radius: 4px;">
            🍁 You are viewing Canadian content
          </div>
          <div data-country="US" style="padding: 1rem; background: #cce5ff; border-radius: 4px;">
            🗽 You are viewing United States content
          </div>
          <div data-default style="padding: 1rem; background: #e7e7e7; border-radius: 4px;">
            🌍 You are viewing international content
          </div>
        </wb-country-content>
      </div>
    `;
  }
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <wb-country-content
        @wb-country-detected="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) {
            log.textContent = 'Detected country: ' + e.detail.country + ' (' + e.detail.countryName + ')';
          }
        }}"
        @wb-country-error="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) {
            log.textContent = 'Detection failed, using fallback: ' + e.detail.fallback;
          }
        }}"
      >
        <div data-country="CA">Canadian content</div>
        <div data-default>Default content</div>
      </wb-country-content>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-country-content>
        <div data-country="CA" style="padding: 1rem; background: #d4edda; border-radius: 4px;">
          <h3 style="margin: 0 0 0.5rem 0;">🍁 Bienvenue sur Canada.ca</h3>
          <p style="margin: 0;">
            Accédez aux services et informations pour les résidents et citoyens canadiens.
          </p>
        </div>
        <div data-default style="padding: 1rem; background: #fff3cd; border-radius: 4px;">
          <h3 style="margin: 0 0 0.5rem 0;">🌍 Visiteurs internationaux</h3>
          <p style="margin: 0;">
            Bienvenue sur Canada.ca. Trouvez des informations sur les visites, les études ou l'immigration au Canada.
          </p>
        </div>
      </wb-country-content>
    </div>
  `
};
