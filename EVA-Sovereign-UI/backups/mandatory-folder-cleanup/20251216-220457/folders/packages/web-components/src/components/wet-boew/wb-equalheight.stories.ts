import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-equalheight.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-equalheight',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const TwoColumns: Story = {
  render: () => html`
    <wb-equalheight columns="2">
      <div style="padding: 1rem; background: #f0f0f0; border: 1px solid #ccc;">
        <h3>Column 1</h3>
        <p>Short content here.</p>
      </div>
      <div style="padding: 1rem; background: #f0f0f0; border: 1px solid #ccc;">
        <h3>Column 2</h3>
        <p>This column has much longer content that extends the height significantly.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Additional paragraph to demonstrate height differences.</p>
      </div>
    </wb-equalheight>
  `
};

export const ThreeColumns: Story = {
  render: () => html`
    <wb-equalheight columns="3">
      <div style="padding: 1rem; background: #e3f2fd; border: 1px solid #1976d2;">
        <h3>Feature 1</h3>
        <p>Basic description.</p>
      </div>
      <div style="padding: 1rem; background: #e3f2fd; border: 1px solid #1976d2;">
        <h3>Feature 2</h3>
        <p>This feature has a longer description that spans multiple lines.</p>
        <p>Extra content here.</p>
      </div>
      <div style="padding: 1rem; background: #e3f2fd; border: 1px solid #1976d2;">
        <h3>Feature 3</h3>
        <p>Medium length content.</p>
      </div>
    </wb-equalheight>
  `
};

export const VerticalLayout: Story = {
  render: () => html`
    <wb-equalheight vertical>
      <div style="padding: 1rem; background: #fff3e0; border: 1px solid #f57c00;">
        <h4>Row 1</h4>
        <p>Content A</p>
      </div>
      <div style="padding: 1rem; background: #fff3e0; border: 1px solid #f57c00;">
        <h4>Row 2</h4>
        <p>Content B with more text to demonstrate equal heights in vertical mode.</p>
      </div>
      <div style="padding: 1rem; background: #fff3e0; border: 1px solid #f57c00;">
        <h4>Row 3</h4>
        <p>Content C</p>
      </div>
    </wb-equalheight>
  `
};

export const JSFallback: Story = {
  render: () => html`
    <wb-equalheight use-js-fallback columns="2">
      <div style="padding: 1rem; background: #f3e5f5; border: 1px solid #7b1fa2;">
        <h3>JS Fallback Column 1</h3>
        <p>Using JavaScript to equalize heights.</p>
      </div>
      <div style="padding: 1rem; background: #f3e5f5; border: 1px solid #7b1fa2;">
        <h3>JS Fallback Column 2</h3>
        <p>This column has significantly more content.</p>
        <p>Additional paragraphs demonstrate the JavaScript fallback mechanism.</p>
        <p>The heights should be equalized programmatically.</p>
        <button onclick="this.style.display='none'">Hide me to trigger resize</button>
      </div>
    </wb-equalheight>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-equalheight columns="2">
        <div style="padding: 1rem; background: #e8f5e9; border: 1px solid #388e3c;">
          <h3>Colonne 1</h3>
          <p>Contenu court ici.</p>
        </div>
        <div style="padding: 1rem; background: #e8f5e9; border: 1px solid #388e3c;">
          <h3>Colonne 2</h3>
          <p>Cette colonne a un contenu beaucoup plus long qui augmente considérablement la hauteur.</p>
          <p>Texte supplémentaire pour démontrer les différences de hauteur.</p>
        </div>
      </wb-equalheight>
    </div>
  `
};
