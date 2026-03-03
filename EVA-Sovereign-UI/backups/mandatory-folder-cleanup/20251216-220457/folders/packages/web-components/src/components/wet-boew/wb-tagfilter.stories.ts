import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-tagfilter.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-tagfilter',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const BasicTagFilter: Story = {
  render: () => html`
    <wb-tagfilter .tags="${['News', 'Events', 'Reports']}">
      <article data-tags="News" style="padding: 1rem; border: 1px solid #ccc; margin-bottom: 0.5rem;">
        <h3>Latest News Update</h3>
        <p>Breaking news from today...</p>
      </article>
      <article data-tags="Events" style="padding: 1rem; border: 1px solid #ccc; margin-bottom: 0.5rem;">
        <h3>Upcoming Conference</h3>
        <p>Join us for the annual tech conference...</p>
      </article>
      <article data-tags="Reports" style="padding: 1rem; border: 1px solid #ccc; margin-bottom: 0.5rem;">
        <h3>Q4 Financial Report</h3>
        <p>Annual financial summary...</p>
      </article>
      <article data-tags="News,Events" style="padding: 1rem; border: 1px solid #ccc; margin-bottom: 0.5rem;">
        <h3>Event Announcement</h3>
        <p>New event coming soon...</p>
      </article>
    </wb-tagfilter>
  `
};

export const BlogPosts: Story = {
  render: () => html`
    <wb-tagfilter .tags="${['Tutorial', 'Review', 'Guide', 'News']}">
      <article data-tags="Tutorial" style="padding: 1rem; background: #f9f9f9; margin-bottom: 0.5rem;">
        <h4>Getting Started with Web Components</h4>
        <p>Learn the basics...</p>
      </article>
      <article data-tags="Review" style="padding: 1rem; background: #f9f9f9; margin-bottom: 0.5rem;">
        <h4>Framework Comparison 2025</h4>
        <p>Comparing popular frameworks...</p>
      </article>
      <article data-tags="Tutorial,Guide" style="padding: 1rem; background: #f9f9f9; margin-bottom: 0.5rem;">
        <h4>Accessibility Best Practices</h4>
        <p>Complete guide to accessibility...</p>
      </article>
      <article data-tags="News" style="padding: 1rem; background: #f9f9f9; margin-bottom: 0.5rem;">
        <h4>New Web Standards Released</h4>
        <p>Latest updates from W3C...</p>
      </article>
    </wb-tagfilter>
  `
};

export const ANDMode: Story = {
  render: () => html`
    <div>
      <p><strong>AND mode:</strong> Items must have ALL selected tags</p>
      <wb-tagfilter mode="AND" .tags="${['Frontend', 'Backend', 'DevOps']}">
        <div data-tags="Frontend,Backend" style="padding: 1rem; border: 1px solid #ddd; margin-bottom: 0.5rem;">
          <h4>Full Stack Developer</h4>
          <p>Frontend + Backend</p>
        </div>
        <div data-tags="Frontend" style="padding: 1rem; border: 1px solid #ddd; margin-bottom: 0.5rem;">
          <h4>UI Developer</h4>
          <p>Frontend only</p>
        </div>
        <div data-tags="Backend,DevOps" style="padding: 1rem; border: 1px solid #ddd; margin-bottom: 0.5rem;">
          <h4>Platform Engineer</h4>
          <p>Backend + DevOps</p>
        </div>
        <div data-tags="Frontend,Backend,DevOps" style="padding: 1rem; border: 1px solid #ddd; margin-bottom: 0.5rem;">
          <h4>Site Reliability Engineer</h4>
          <p>All three skills</p>
        </div>
      </wb-tagfilter>
    </div>
  `
};

export const ProductCatalog: Story = {
  render: () => html`
    <wb-tagfilter .tags="${['Electronics', 'Books', 'Clothing', 'Sale']}">
      <div data-tags="Electronics,Sale" style="padding: 1rem; border: 2px solid #f00; margin-bottom: 0.5rem;">
        <h4>Laptop - $799 (Sale!)</h4>
        <p>High-performance laptop</p>
      </div>
      <div data-tags="Books" style="padding: 1rem; border: 1px solid #ccc; margin-bottom: 0.5rem;">
        <h4>Programming Book - $49</h4>
        <p>Learn JavaScript</p>
      </div>
      <div data-tags="Clothing,Sale" style="padding: 1rem; border: 2px solid #f00; margin-bottom: 0.5rem;">
        <h4>T-Shirt - $9 (Sale!)</h4>
        <p>Comfortable cotton</p>
      </div>
      <div data-tags="Electronics" style="padding: 1rem; border: 1px solid #ccc; margin-bottom: 0.5rem;">
        <h4>Mouse - $29</h4>
        <p>Wireless mouse</p>
      </div>
    </wb-tagfilter>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-tagfilter .tags="${['Actualités', 'Événements', 'Rapports']}">
        <article data-tags="Actualités" style="padding: 1rem; border: 1px solid #ccc; margin-bottom: 0.5rem;">
          <h3>Dernières nouvelles</h3>
          <p>Actualités d'aujourd'hui...</p>
        </article>
        <article data-tags="Événements" style="padding: 1rem; border: 1px solid #ccc; margin-bottom: 0.5rem;">
          <h3>Conférence à venir</h3>
          <p>Rejoignez-nous...</p>
        </article>
        <article data-tags="Rapports" style="padding: 1rem; border: 1px solid #ccc; margin-bottom: 0.5rem;">
          <h3>Rapport financier T4</h3>
          <p>Résumé annuel...</p>
        </article>
      </wb-tagfilter>
    </div>
  `
};
