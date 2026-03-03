import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-bgimg.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-bgimg',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const BasicImage: Story = {
  render: () => html`
    <wb-bgimg 
      src="https://via.placeholder.com/1200x800/3498db/ffffff?text=Hero+Image"
      style="width: 100%; height: 400px;"
    >
      <div style="padding: 2rem; color: white;">
        <h2 style="margin: 0;">Hero Section</h2>
        <p style="margin: 0.5rem 0 0;">Content over background image</p>
      </div>
    </wb-bgimg>
  `
};

export const WithPlaceholder: Story = {
  render: () => html`
    <wb-bgimg 
      src="https://via.placeholder.com/1200x800/e74c3c/ffffff?text=Loading..."
      placeholder="Loading image..."
      style="width: 100%; height: 300px;"
    ></wb-bgimg>
  `
};

export const MultipleImages: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
      <wb-bgimg 
        src="https://via.placeholder.com/600x400/3498db/ffffff?text=Image+1"
        style="height: 200px;"
      ></wb-bgimg>
      
      <wb-bgimg 
        src="https://via.placeholder.com/600x400/2ecc71/ffffff?text=Image+2"
        style="height: 200px;"
      ></wb-bgimg>
      
      <wb-bgimg 
        src="https://via.placeholder.com/600x400/e74c3c/ffffff?text=Image+3"
        style="height: 200px;"
      ></wb-bgimg>
    </div>
  `
};

export const CustomThreshold: Story = {
  render: () => html`
    <div style="margin-top: 150vh;">
      <p style="text-align: center; margin-bottom: 1rem;">
        Scroll down to trigger lazy loading with 50% threshold
      </p>
      <wb-bgimg 
        src="https://via.placeholder.com/1200x600/9b59b6/ffffff?text=Lazy+Loaded"
        threshold="0.5"
        placeholder="Scroll to load..."
        style="width: 100%; height: 400px;"
      ></wb-bgimg>
    </div>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <wb-bgimg 
        src="https://via.placeholder.com/1200x800/1abc9c/ffffff?text=Event+Test"
        style="width: 100%; height: 300px;"
        @wb-bgimg-loaded="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Image loaded: ${e.detail.src}`;
        }}"
        @wb-bgimg-error="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Error loading: ${e.detail.src}`;
        }}"
      ></wb-bgimg>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-bgimg 
        src="https://via.placeholder.com/1200x800/34495e/ffffff?text=Image+FR"
        placeholder="Chargement..."
        style="width: 100%; height: 300px;"
      ></wb-bgimg>
    </div>
  `
};
