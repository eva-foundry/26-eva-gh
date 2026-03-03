import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-accordion.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-accordion',
  component: 'wb-accordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# wb-accordion - Expand/Collapse Panels

WET-BOEW 4.x plugin reimplemented as modern Lit 3.x Web Component.

Collapsible content panels with expand/collapse functionality.

**Reference**: https://wet-boew.github.io/wet-boew/demos/details/details-en.html

## Features
- ✅ Expand/collapse on click
- ✅ Keyboard navigation (Arrow keys, Home, End)
- ✅ Expand All / Collapse All controls
- ✅ Multi-expand or single-expand mode
- ✅ Smooth CSS transitions
- ✅ ARIA accordion pattern
- ✅ Icon rotation animation
- ✅ Accessible (keyboard, screen reader)
- ✅ Bilingual (EN-CA/FR-CA)
        `
      }
    }
  },
  argTypes: {
    multiExpand: {
      control: 'boolean',
      description: 'Allow multiple panels to be expanded simultaneously',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    showControls: {
      control: 'boolean',
      description: 'Show expand/collapse all controls',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    }
  }
};

export default meta;
type Story = StoryObj;

export const BasicAccordion: Story = {
  render: () => html`
    <wb-accordion>
      <wb-accordion-panel heading="What is the WET-BOEW project?">
        <p>The Web Experience Toolkit (WET) is an award-winning front-end framework for building websites that are accessible, usable, interoperable, mobile-friendly and multilingual.</p>
        <p>This component is a modern reimplementation using Lit 3.x Web Components.</p>
      </wb-accordion-panel>

      <wb-accordion-panel heading="Why use EVA-Sovereign-UI?">
        <p>EVA-Sovereign-UI provides:</p>
        <ul>
          <li>Modern Web Components architecture (Lit 3.x)</li>
          <li>Framework wrappers (React, Vue, Angular, Svelte)</li>
          <li>WCAG 2.2 AAA compliance</li>
          <li>Official GC Design System tokens</li>
          <li>Bilingual EN-CA/FR-CA support</li>
        </ul>
      </wb-accordion-panel>

      <wb-accordion-panel heading="How to get started?">
        <p>Install the package:</p>
        <pre><code>npm install @eva/sovereign-ui</code></pre>
        <p>Import and use:</p>
        <pre><code>import '@eva/sovereign-ui/wb-accordion';</code></pre>
      </wb-accordion-panel>
    </wb-accordion>
  `
};

export const MultiExpand: Story = {
  render: () => html`
    <wb-accordion multi-expand>
      <wb-accordion-panel heading="Panel 1">
        <p>This accordion allows <strong>multiple panels</strong> to be open at the same time.</p>
        <p>Try opening all three panels!</p>
      </wb-accordion-panel>

      <wb-accordion-panel heading="Panel 2">
        <p>With <code>multi-expand</code> enabled, expanding this panel won't close the others.</p>
      </wb-accordion-panel>

      <wb-accordion-panel heading="Panel 3">
        <p>This is useful when users need to compare content across multiple panels.</p>
      </wb-accordion-panel>
    </wb-accordion>

    <div style="margin-top: 2rem; padding: 1rem; background: #e7f3ff; border-left: 4px solid #2196f3; border-radius: 4px;">
      <strong>💡 Tip:</strong> The <code>multi-expand</code> property allows multiple panels to be expanded simultaneously.
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Multiple panels can be expanded at the same time'
      }
    }
  }
};

export const ExpandedByDefault: Story = {
  render: () => html`
    <wb-accordion>
      <wb-accordion-panel heading="Getting Started" expanded>
        <p>This panel is <strong>expanded by default</strong> using the <code>expanded</code> attribute.</p>
        <p>Perfect for FAQs where the first question should be visible immediately.</p>
      </wb-accordion-panel>

      <wb-accordion-panel heading="Installation">
        <p>Install via npm:</p>
        <pre><code>npm install @eva/sovereign-ui</code></pre>
      </wb-accordion-panel>

      <wb-accordion-panel heading="Configuration">
        <p>Import the component:</p>
        <pre><code>import '@eva/sovereign-ui/wb-accordion';</code></pre>
      </wb-accordion-panel>
    </wb-accordion>
  `,
  parameters: {
    docs: {
      description: {
        story: 'First panel expanded by default using the expanded attribute'
      }
    }
  }
};

export const NoControls: Story = {
  render: () => html`
    <wb-accordion show-controls="false">
      <wb-accordion-panel heading="Panel 1">
        <p>This accordion has <strong>no expand/collapse all controls</strong>.</p>
      </wb-accordion-panel>

      <wb-accordion-panel heading="Panel 2">
        <p>Users must expand each panel individually.</p>
      </wb-accordion-panel>

      <wb-accordion-panel heading="Panel 3">
        <p>Useful when you want a cleaner interface.</p>
      </wb-accordion-panel>
    </wb-accordion>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Accordion without expand/collapse all controls (show-controls=false)'
      }
    }
  }
};

export const KeyboardNavigation: Story = {
  render: () => html`
    <wb-accordion>
      <wb-accordion-panel heading="Keyboard Shortcuts">
        <p>This accordion is fully keyboard accessible:</p>
        <ul>
          <li><kbd>Tab</kbd> - Navigate between panel headers</li>
          <li><kbd>Enter</kbd> / <kbd>Space</kbd> - Toggle panel</li>
          <li><kbd>↑</kbd> Arrow Up - Move to previous panel</li>
          <li><kbd>↓</kbd> Arrow Down - Move to next panel</li>
          <li><kbd>Home</kbd> - Move to first panel</li>
          <li><kbd>End</kbd> - Move to last panel</li>
        </ul>
      </wb-accordion-panel>

      <wb-accordion-panel heading="Screen Reader Support">
        <p>Proper ARIA attributes ensure compatibility with screen readers:</p>
        <ul>
          <li><code>aria-expanded</code> - Indicates panel state</li>
          <li><code>aria-controls</code> - Links button to content</li>
          <li>Role="region" - Identifies content region</li>
        </ul>
      </wb-accordion-panel>

      <wb-accordion-panel heading="Focus Management">
        <p>Focus is properly managed when navigating with keyboard.</p>
        <p>Try using the arrow keys to move between panels!</p>
      </wb-accordion-panel>
    </wb-accordion>

    <div style="margin-top: 2rem; padding: 1rem; background: #e8f5e9; border-left: 4px solid #278400; border-radius: 4px;">
      <strong>✅ WCAG 2.2 AAA:</strong> Fully keyboard accessible with proper ARIA attributes.
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates keyboard navigation and accessibility features'
      }
    }
  }
};

export const BilingualFrench: Story = {
  render: () => html`
    <wb-accordion locale="fr-CA">
      <wb-accordion-panel heading="Qu'est-ce que WET-BOEW?">
        <p>La Boîte à outils de l'expérience Web (BOEW) est un cadre frontal primé pour créer des sites Web accessibles, utilisables, interopérables, optimisés pour les appareils mobiles et multilingues.</p>
      </wb-accordion-panel>

      <wb-accordion-panel heading="Pourquoi utiliser EVA-Sovereign-UI?">
        <p>EVA-Sovereign-UI fournit:</p>
        <ul>
          <li>Architecture moderne de composants Web (Lit 3.x)</li>
          <li>Wrappers de framework (React, Vue, Angular, Svelte)</li>
          <li>Conformité WCAG 2.2 AAA</li>
          <li>Jetons officiels du système de conception GC</li>
          <li>Support bilingue EN-CA/FR-CA</li>
        </ul>
      </wb-accordion-panel>

      <wb-accordion-panel heading="Comment commencer?">
        <p>Installer le paquet:</p>
        <pre><code>npm install @eva/sovereign-ui</code></pre>
      </wb-accordion-panel>
    </wb-accordion>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Expand/Collapse controls displayed in French (FR-CA)'
      }
    }
  }
};
