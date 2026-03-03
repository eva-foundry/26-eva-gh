import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-geomap.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-geomap',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const BasicMap: Story = {
  render: () => html`
    <wb-geomap
      .markers="${[
        { id: '1', lat: 45.4215, lng: -75.6972, label: 'Ottawa', description: 'Capital of Canada' },
        { id: '2', lat: 43.6532, lng: -79.3832, label: 'Toronto', description: 'Largest city in Canada' }
      ]}"
      centerLat="45.4215"
      centerLng="-75.6972"
      zoom="10"
    ></wb-geomap>
  `
};

export const MultipleMarkers: Story = {
  render: () => html`
    <wb-geomap
      .markers="${[
        { id: '1', lat: 45.5, lng: -75.5, label: 'Location A' },
        { id: '2', lat: 45.3, lng: -75.7, label: 'Location B' },
        { id: '3', lat: 45.6, lng: -75.8, label: 'Location C' },
        { id: '4', lat: 45.4, lng: -75.6, label: 'Location D' }
      ]}"
      centerLat="45.45"
      centerLng="-75.65"
      zoom="11"
    ></wb-geomap>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <wb-geomap
        .markers="${[
          { id: '1', lat: 45.4215, lng: -75.6972, label: 'Ottawa' }
        ]}"
        @wb-geomap-marker-select="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Marker selected: ${e.detail.marker.label}`;
        }}"
        @wb-geomap-zoom="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Zoom level: ${e.detail.zoom}`;
        }}"
        @wb-geomap-location="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Location: ${e.detail.lat}, ${e.detail.lng}`;
        }}"
      ></wb-geomap>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-geomap
        .markers="${[
          { id: '1', lat: 45.4215, lng: -75.6972, label: 'Ottawa', description: 'Capitale du Canada' },
          { id: '2', lat: 46.8139, lng: -71.2080, label: 'Québec', description: 'Capitale provinciale' }
        ]}"
        centerLat="46.0"
        centerLng="-73.0"
        zoom="8"
      ></wb-geomap>
    </div>
  `
};
