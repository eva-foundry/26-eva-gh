import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-favicon.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-favicon',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

// Base64 encoded red dot favicon (1x1 PNG)
const redDot = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==';
const blueDot = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPj/HwADBwIAMCbHYQAAAABJRU5ErkJggg==';

export const BasicFavicon: Story = {
  render: () => html`
    <div>
      <p>Look at the browser tab - the favicon should change to a red dot</p>
      <wb-favicon src="${redDot}"></wb-favicon>
    </div>
  `
};

export const WithBadge: Story = {
  render: () => html`
    <div>
      <p>Favicon with notification badge (number "5")</p>
      <wb-favicon src="${blueDot}" badge="5"></wb-favicon>
    </div>
  `
};

export const DifferentBadges: Story = {
  render: () => html`
    <div>
      <p>Select different badge values:</p>
      <button @click="${() => {
        const fav = document.querySelector('wb-favicon');
        if (fav) fav.setAttribute('badge', '1');
      }}">Badge: 1</button>
      
      <button @click="${() => {
        const fav = document.querySelector('wb-favicon');
        if (fav) fav.setAttribute('badge', '99');
      }}">Badge: 99</button>
      
      <button @click="${() => {
        const fav = document.querySelector('wb-favicon');
        if (fav) fav.setAttribute('badge', '!');
      }}">Badge: !</button>
      
      <button @click="${() => {
        const fav = document.querySelector('wb-favicon');
        if (fav) fav.setAttribute('badge', '');
      }}">No Badge</button>
      
      <wb-favicon src="${redDot}" badge="3"></wb-favicon>
    </div>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <p>Change favicon to trigger events:</p>
      <button @click="${() => {
        const fav = document.querySelector('wb-favicon');
        if (fav) fav.setAttribute('src', redDot);
      }}">Red Icon</button>
      
      <button @click="${() => {
        const fav = document.querySelector('wb-favicon');
        if (fav) fav.setAttribute('src', blueDot);
      }}">Blue Icon</button>
      
      <wb-favicon 
        src="${redDot}"
        @wb-favicon-changed="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Favicon changed: ${e.detail.badge || 'no badge'}`;
        }}"
        @wb-favicon-error="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Error: ${e.detail.error}`;
        }}"
      ></wb-favicon>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <p>L'icône du navigateur devrait changer</p>
      <wb-favicon src="${redDot}" badge="7"></wb-favicon>
    </div>
  `
};
