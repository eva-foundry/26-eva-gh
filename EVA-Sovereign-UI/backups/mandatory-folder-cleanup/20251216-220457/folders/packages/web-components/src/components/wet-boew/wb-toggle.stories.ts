import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-toggle.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-toggle',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# WB-Toggle - Show/Hide Content Toggle

Simple show/hide toggle for content sections with smooth animations.

## Features
- ✅ Click or keyboard (Enter/Space) to toggle
- ✅ Smooth height transitions (CSS max-height)
- ✅ Icon rotation animation (chevron ▼ → ▲)
- ✅ ARIA expanded state (aria-expanded, role="region")
- ✅ Screen reader announcements
- ✅ Bilingual labels (EN-CA/FR-CA)
- ✅ Toggle groups (only one open at a time)
- ✅ Print-friendly (shows all content when printing)
- ✅ Reduced motion support (prefers-reduced-motion)
- ✅ WCAG 2.2 AAA compliant

## Events
- \`wb-toggle-show\` - Fired when content is shown
- \`wb-toggle-hide\` - Fired when content is hidden

## Methods
- \`toggle()\` - Toggle visibility
- \`show()\` - Show content
- \`hide()\` - Hide content

## Reference
Based on WET-BOEW Toggle:  
https://wet-boew.github.io/wet-boew/demos/toggle/toggle-en.html
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

export const BasicToggle: Story = {
  render: () => html`
    <wb-toggle label="Show program details">
      <h3>Employment Insurance (EI) Benefits</h3>
      <p>
        Employment Insurance (EI) provides temporary financial assistance to unemployed Canadians 
        who have lost their job through no fault of their own, while they look for work or upgrade their skills.
      </p>
      <ul>
        <li>Regular benefits</li>
        <li>Maternity and parental benefits</li>
        <li>Sickness benefits</li>
        <li>Compassionate care benefits</li>
        <li>Family caregiver benefits</li>
      </ul>
      <p>
        <strong>Eligibility:</strong> You may be eligible for EI if you have lost your job through no fault 
        of your own, have worked a certain number of insurable hours, and are able and available to work.
      </p>
    </wb-toggle>
  `
};

export const ExpandedByDefault: Story = {
  render: () => html`
    <wb-toggle label="Important notice" expanded>
      <div style="padding: 1rem; background: #f9f9f9; border-left: 4px solid #d3080c;">
        <strong>Service disruption:</strong> Our offices will be closed for maintenance on December 25, 2025. 
        Online services will remain available.
      </div>
    </wb-toggle>
  `
};

export const NoIcon: Story = {
  render: () => html`
    <wb-toggle label="Toggle without icon" show-icon="false">
      <p>This toggle doesn't show the chevron icon.</p>
      <p>Use this for a cleaner, text-only button appearance.</p>
    </wb-toggle>
  `
};

export const ToggleGroup: Story = {
  render: () => html`
    <h2>Frequently Asked Questions</h2>
    <p>Click a question to see the answer. Only one answer shown at a time.</p>

    <wb-toggle label="How do I apply for a passport?" group="faq">
      <p>
        You can apply for a Canadian passport online or by mail. Visit 
        <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports.html">
          canada.ca/passports
        </a> for complete instructions.
      </p>
    </wb-toggle>

    <wb-toggle label="How long does it take to get a passport?" group="faq">
      <p>
        Processing times vary depending on the service option you choose:
      </p>
      <ul>
        <li>Standard service: 20 business days</li>
        <li>Express service: 10 business days</li>
        <li>Urgent service: 2-9 business days</li>
      </ul>
    </wb-toggle>

    <wb-toggle label="What documents do I need?" group="faq">
      <p>You will need:</p>
      <ul>
        <li>Proof of Canadian citizenship (birth certificate or citizenship certificate)</li>
        <li>Two identical passport photos</li>
        <li>Valid government-issued ID</li>
        <li>Completed application form</li>
      </ul>
    </wb-toggle>

    <wb-toggle label="How much does a passport cost?" group="faq">
      <p>
        <strong>10-year adult passport:</strong> $160 CAD<br>
        <strong>5-year adult passport:</strong> $120 CAD<br>
        <strong>5-year child passport:</strong> $57 CAD
      </p>
    </wb-toggle>
  `
};

export const EventHandling: Story = {
  render: () => html`
    <wb-toggle 
      label="Toggle with event logging"
      @wb-toggle-show="${(e: CustomEvent) => console.log('Content shown:', e.detail)}"
      @wb-toggle-hide="${(e: CustomEvent) => console.log('Content hidden:', e.detail)}"
    >
      <p>Open the browser console to see events when you toggle this content.</p>
      <p>This demonstrates the custom events fired by the component.</p>
    </wb-toggle>
  `
};

export const KeyboardNavigation: Story = {
  render: () => html`
    <div>
      <h2>Keyboard Accessibility</h2>
      <p>This toggle is fully keyboard accessible:</p>
      <ul>
        <li><kbd>Tab</kbd> - Focus the toggle button</li>
        <li><kbd>Enter</kbd> or <kbd>Space</kbd> - Toggle content visibility</li>
      </ul>

      <wb-toggle label="Keyboard navigation demo">
        <p>
          This content can be toggled using only the keyboard. The toggle button receives 
          focus with the Tab key, and can be activated with Enter or Space.
        </p>
        <p>
          Screen readers announce the current state (expanded/collapsed) and the button label.
        </p>
      </wb-toggle>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-toggle label="Afficher les détails du programme">
        <h3>Assurance-emploi (AE)</h3>
        <p>
          L'assurance-emploi (AE) offre une aide financière temporaire aux Canadiens sans emploi 
          qui ont perdu leur emploi sans en être responsables, pendant qu'ils cherchent du travail 
          ou améliorent leurs compétences.
        </p>
        <ul>
          <li>Prestations régulières</li>
          <li>Prestations de maternité et parentales</li>
          <li>Prestations de maladie</li>
          <li>Prestations de compassion</li>
          <li>Prestations pour proches aidants</li>
        </ul>
      </wb-toggle>
    </div>
  `
};
