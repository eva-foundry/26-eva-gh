import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-back-to-top';

const meta: Meta = {
  title: 'GC Patterns/gc-back-to-top',
  component: 'gc-back-to-top',
  tags: ['autodocs'],
  argTypes: {
    scrollThreshold: { control: 'number' },
    scrollBehavior: { control: 'select', options: ['smooth', 'auto'] }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="height: 200vh; padding: 2rem;">
      <h2>Scroll down to see the back-to-top button</h2>
      <p>The button will appear after scrolling 300px down the page.</p>
      
      ${Array.from({ length: 50 }, (_, i) => html`
        <p style="margin: 1rem 0;">
          This is paragraph ${i + 1}. Keep scrolling to see the back-to-top button appear in the bottom right corner.
        </p>
      `)}
      
      <gc-back-to-top></gc-back-to-top>
    </div>
  `
};

export const CustomThreshold: Story = {
  render: () => html`
    <div style="height: 200vh; padding: 2rem;">
      <h2>Custom scroll threshold (100px)</h2>
      <p>The button will appear after scrolling only 100px down the page.</p>
      
      ${Array.from({ length: 50 }, (_, i) => html`
        <p style="margin: 1rem 0;">
          This is paragraph ${i + 1}. The button appears sooner with a lower threshold.
        </p>
      `)}
      
      <gc-back-to-top scrollThreshold="100"></gc-back-to-top>
    </div>
  `
};

export const AutoScrollBehavior: Story = {
  render: () => html`
    <div style="height: 200vh; padding: 2rem;">
      <h2>Auto scroll behavior (instant)</h2>
      <p>The button will scroll to top instantly without smooth animation.</p>
      
      ${Array.from({ length: 50 }, (_, i) => html`
        <p style="margin: 1rem 0;">
          This is paragraph ${i + 1}. Click the button to jump to top instantly.
        </p>
      `)}
      
      <gc-back-to-top scrollBehavior="auto"></gc-back-to-top>
    </div>
  `
};

export const WithEvents: Story = {
  render: () => html`
    <div style="height: 200vh; padding: 2rem;">
      <h2>With event logging</h2>
      <p>Open the console to see events when clicking the back-to-top button.</p>
      
      ${Array.from({ length: 50 }, (_, i) => html`
        <p style="margin: 1rem 0;">
          This is paragraph ${i + 1}. Check the console when you click the button.
        </p>
      `)}
      
      <gc-back-to-top
        @gc-scroll-to-top="${(e: CustomEvent) => console.log('Scrolled to top at:', new Date(e.detail.timestamp))}"
      ></gc-back-to-top>
    </div>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <div style="height: 200vh; padding: 2rem;">
      <h2>Faites défiler vers le bas pour voir le bouton</h2>
      <p>Le bouton apparaîtra après avoir fait défiler 300px vers le bas de la page.</p>
      
      ${Array.from({ length: 50 }, (_, i) => html`
        <p style="margin: 1rem 0;">
          Ceci est le paragraphe ${i + 1}. Continuez à faire défiler pour voir le bouton apparaître dans le coin inférieur droit.
        </p>
      `)}
      
      <gc-back-to-top locale="fr-CA"></gc-back-to-top>
    </div>
  `
};

export const AlwaysVisible: Story = {
  render: () => html`
    <div style="height: 200vh; padding: 2rem;">
      <h2>Always visible (for demo)</h2>
      <p>This button is always visible regardless of scroll position.</p>
      
      ${Array.from({ length: 50 }, (_, i) => html`
        <p style="margin: 1rem 0;">
          This is paragraph ${i + 1}. The button is always visible for demonstration.
        </p>
      `)}
      
      <gc-back-to-top scrollThreshold="0"></gc-back-to-top>
    </div>
  `
};
