import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-filter.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-filter',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const BasicFilter: Story = {
  render: () => html`
    <wb-filter .tags="${['News', 'Events', 'Reports']}">
      <div data-filter-tags="News">
        <h3>Latest News Update</h3>
        <p>Breaking news from today...</p>
      </div>
      <div data-filter-tags="Events">
        <h3>Upcoming Conference</h3>
        <p>Join us for the annual tech conference...</p>
      </div>
      <div data-filter-tags="Reports">
        <h3>Q4 Financial Report</h3>
        <p>Annual financial summary...</p>
      </div>
      <div data-filter-tags="News,Events">
        <h3>Event Announcement</h3>
        <p>New event coming soon...</p>
      </div>
    </wb-filter>
  `
};

export const BlogFilter: Story = {
  render: () => html`
    <wb-filter .tags="${['Tutorial', 'Review', 'Guide']}">
      <article data-filter-tags="Tutorial">
        <h3>Getting Started with Web Components</h3>
        <p>Learn the basics of building web components...</p>
      </article>
      <article data-filter-tags="Review">
        <h3>Framework Comparison 2025</h3>
        <p>Comparing popular JavaScript frameworks...</p>
      </article>
      <article data-filter-tags="Guide">
        <h3>Accessibility Best Practices</h3>
        <p>How to make your website accessible...</p>
      </article>
      <article data-filter-tags="Tutorial,Guide">
        <h3>ARIA Patterns Tutorial</h3>
        <p>Complete guide to ARIA patterns...</p>
      </article>
    </wb-filter>
  `
};

export const ProductFilter: Story = {
  render: () => html`
    <wb-filter .tags="${['Electronics', 'Books', 'Clothing']}">
      <div data-filter-tags="Electronics" style="padding: 1rem; border: 1px solid #ccc; margin-bottom: 0.5rem;">
        <h4>Laptop - $999</h4>
        <p>High-performance laptop for work</p>
      </div>
      <div data-filter-tags="Books" style="padding: 1rem; border: 1px solid #ccc; margin-bottom: 0.5rem;">
        <h4>Programming Book - $49</h4>
        <p>Learn JavaScript from scratch</p>
      </div>
      <div data-filter-tags="Clothing" style="padding: 1rem; border: 1px solid #ccc; margin-bottom: 0.5rem;">
        <h4>T-Shirt - $19</h4>
        <p>Comfortable cotton t-shirt</p>
      </div>
      <div data-filter-tags="Electronics,Books" style="padding: 1rem; border: 1px solid #ccc; margin-bottom: 0.5rem;">
        <h4>E-Reader - $129</h4>
        <p>Digital reading device</p>
      </div>
    </wb-filter>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-filter .tags="${['Actualités', 'Événements', 'Rapports']}">
        <div data-filter-tags="Actualités">
          <h3>Dernières nouvelles</h3>
          <p>Actualités d'aujourd'hui...</p>
        </div>
        <div data-filter-tags="Événements">
          <h3>Conférence à venir</h3>
          <p>Rejoignez-nous pour la conférence...</p>
        </div>
        <div data-filter-tags="Rapports">
          <h3>Rapport financier T4</h3>
          <p>Résumé financier annuel...</p>
        </div>
      </wb-filter>
    </div>
  `
};
