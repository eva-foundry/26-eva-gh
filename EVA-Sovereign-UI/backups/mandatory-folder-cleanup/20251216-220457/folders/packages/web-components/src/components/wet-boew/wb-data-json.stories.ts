import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-data-json.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-data-json',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const BasicTemplate: Story = {
  render: () => html`
    <wb-data-json
      .data="${{ name: 'Alice', age: 30, city: 'Ottawa' }}"
      template="<div style='padding: 1rem; border: 1px solid #ccc;'><h3>{{ name }}</h3><p>Age: {{ age }}, City: {{ city }}</p></div>"
      auto-load="false"
    ></wb-data-json>
  `
};

export const ArrayData: Story = {
  render: () => html`
    <wb-data-json
      .data="${[
        { name: 'Alice', role: 'Developer' },
        { name: 'Bob', role: 'Designer' },
        { name: 'Charlie', role: 'Manager' }
      ]}"
      template="<div style='padding: 0.5rem; border-bottom: 1px solid #eee;'><strong>{{ name }}</strong> - {{ role }}</div>"
      auto-load="false"
    ></wb-data-json>
  `
};

export const ProductList: Story = {
  render: () => html`
    <wb-data-json
      .data="${[
        { product: 'Laptop', price: '$999', stock: 'In Stock' },
        { product: 'Mouse', price: '$29', stock: 'In Stock' },
        { product: 'Keyboard', price: '$79', stock: 'Out of Stock' }
      ]}"
      template="<div style='padding: 1rem; border: 1px solid #ddd; margin-bottom: 0.5rem;'><h4>{{ product }}</h4><p>Price: {{ price }} | Status: {{ stock }}</p></div>"
      auto-load="false"
    ></wb-data-json>
  `
};

export const FromAPI: Story = {
  render: () => html`
    <wb-data-json
      url="https://jsonplaceholder.typicode.com/users/1"
      template="<div style='padding: 1rem; background: #f0f0f0;'><h3>{{ name }}</h3><p>Email: {{ email }}</p><p>Phone: {{ phone }}</p></div>"
      auto-load="true"
    ></wb-data-json>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-data-json
        .data="${{ nom: 'Alice', âge: 30, ville: 'Ottawa' }}"
        template="<div style='padding: 1rem; border: 1px solid #ccc;'><h3>{{ nom }}</h3><p>Âge: {{ âge }}, Ville: {{ ville }}</p></div>"
        auto-load="false"
      ></wb-data-json>
    </div>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <wb-data-json
        .data="${[{ name: 'Item 1' }, { name: 'Item 2' }]}"
        template="<p>{{ name }}</p>"
        auto-load="false"
        @wb-json-rendered="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Rendered ${e.detail.count} items`;
        }}"
      ></wb-data-json>
    </div>
  `
};
