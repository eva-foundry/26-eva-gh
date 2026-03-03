import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-language-toggle.js';

/**
 * GC Language Toggle Component
 * 
 * The official Government of Canada language switcher allows users to toggle between English and French.
 * This component is a mandatory element on all GC web properties to support Canada's bilingual requirements.
 * 
 * ## Design Specifications
 * - Must comply with https://design.canada.ca/common-design-patterns/language-toggle.html
 * - Uses GC blue (#284162) for default text color
 * - Lato font family for consistency
 * - Full and abbreviated display modes
 * - Three size variants: small, medium, large
 * - Inverted option for dark backgrounds
 * - WCAG 2.2 AAA compliant
 * - Bilingual ARIA labels
 */
const meta = {
  title: 'GC Patterns/Language Toggle',
  component: 'gc-language-toggle',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The GC Language Toggle is the official Government of Canada language switcher component.
It allows users to switch between English (EN-CA) and French (FR-CA) locales.

### Key Features
- **Bilingual Support**: Automatically displays opposite language text
- **Multiple Display Modes**: Full text ("Français") or abbreviated ("FR")
- **Size Variants**: Small, medium, large to fit any layout
- **Inverted Colors**: White text variant for dark backgrounds
- **Accessible**: Bilingual ARIA labels, keyboard navigation
- **Event Driven**: Emits gc-language-change event for integration

### Compliance
- Federal Identity Program (FIP) compliant
- Treasury Board Secretariat (TBS) approved
- Canada.ca design system requirement
- WCAG 2.2 Level AAA accessibility
- Official Languages Act (OLA) compliant

### Usage Note
This component emits a \`gc-language-change\` event when clicked. The parent application
must handle this event to actually change the UI language. The component manages its own
\`current\` property state.
        `,
      },
    },
  },
  argTypes: {
    current: {
      control: 'select',
      options: ['en-CA', 'fr-CA'],
      description: 'Current active locale',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'en-CA' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Toggle size variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    displayMode: {
      control: 'select',
      options: ['full', 'abbreviated'],
      description: 'Display mode: full text or abbreviation',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'full' },
      },
    },
    inverted: {
      control: 'boolean',
      description: 'Use inverted colors for dark backgrounds',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    prefixLabel: {
      control: 'text',
      description: 'Optional prefix label (e.g., "Language:")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    showAbbr: {
      control: 'boolean',
      description: 'Show abbreviation in parentheses (e.g., "English (EN)")',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    animated: {
      control: 'boolean',
      description: 'Enable animated transition on language change',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Custom ARIA label (defaults to bilingual label)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    current: 'en-CA',
    size: 'medium',
    displayMode: 'full',
    inverted: false,
    showAbbr: false,
    animated: true,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/**
 * Default language toggle showing "Français" (when current is EN).
 * This is the standard implementation for headers and navbars.
 */
export const Default: Story = {
  args: {},
  render: (args) => html`
    <gc-language-toggle
      .current="${args.current}"
      .size="${args.size}"
      .displayMode="${args.displayMode}"
      .inverted="${args.inverted}"
      .prefixLabel="${args.prefixLabel}"
      .showAbbr="${args.showAbbr}"
      .animated="${args.animated}"
      .ariaLabel="${args.ariaLabel}"
      @gc-language-change="${(e: CustomEvent) => {
        console.log('Language changed:', e.detail);
      }}"
    ></gc-language-toggle>
  `,
};

/**
 * French current locale showing "English" toggle.
 */
export const French: Story = {
  args: {
    current: 'fr-CA',
  },
  render: (args) => html`
    <div style="padding: 2rem;">
      <gc-language-toggle
        .current="${args.current}"
        .size="${args.size}"
        @gc-language-change="${(e: CustomEvent) => {
          console.log('Langue changée:', e.detail);
        }}"
      ></gc-language-toggle>
      <p style="margin-top: 1rem; color: #666;">Affiche « English » quand le français est actif</p>
    </div>
  `,
};

/**
 * Abbreviated display mode showing "FR" or "EN" instead of full text.
 * Useful for compact layouts or mobile views.
 */
export const Abbreviated: Story = {
  args: {
    displayMode: 'abbreviated',
  },
  render: (args) => html`
    <div style="padding: 2rem;">
      <gc-language-toggle
        .current="${args.current}"
        .displayMode="${args.displayMode}"
        .size="${args.size}"
      ></gc-language-toggle>
      <p style="margin-top: 1rem; color: #666;">Compact mode showing "FR" or "EN" abbreviation</p>
    </div>
  `,
};

/**
 * Small size variant for compact layouts.
 */
export const Small: Story = {
  args: {
    size: 'small',
  },
  render: (args) => html`
    <div style="padding: 2rem;">
      <gc-language-toggle
        .current="${args.current}"
        .size="${args.size}"
      ></gc-language-toggle>
      <p style="margin-top: 1rem; color: #666;">Small size for footers or sidebars</p>
    </div>
  `,
};

/**
 * Large size variant for prominent positioning.
 */
export const Large: Story = {
  args: {
    size: 'large',
  },
  render: (args) => html`
    <div style="padding: 2rem;">
      <gc-language-toggle
        .current="${args.current}"
        .size="${args.size}"
      ></gc-language-toggle>
      <p style="margin-top: 1rem; color: #666;">Large size for landing pages</p>
    </div>
  `,
};

/**
 * Size comparison showing all three variants.
 */
export const SizeComparison: Story = {
  args: {},
  render: (args) => html`
    <div style="padding: 2rem; display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
      <div>
        <h3 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #666;">Small</h3>
        <gc-language-toggle size="small" .current="${args.current}"></gc-language-toggle>
      </div>

      <div>
        <h3 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #666;">Medium (Default)</h3>
        <gc-language-toggle size="medium" .current="${args.current}"></gc-language-toggle>
      </div>

      <div>
        <h3 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #666;">Large</h3>
        <gc-language-toggle size="large" .current="${args.current}"></gc-language-toggle>
      </div>
    </div>
  `,
};

/**
 * Display modes: full text vs abbreviated.
 */
export const DisplayModes: Story = {
  args: {},
  render: (args) => html`
    <div style="padding: 2rem; display: flex; gap: 4rem; align-items: flex-start;">
      <div>
        <h3 style="margin: 0 0 1rem 0;">Full Text</h3>
        <gc-language-toggle display-mode="full" .current="${args.current}"></gc-language-toggle>
        <p style="margin-top: 1rem; color: #666; max-width: 200px;">
          Displays "Français" or "English"
        </p>
      </div>

      <div>
        <h3 style="margin: 0 0 1rem 0;">Abbreviated</h3>
        <gc-language-toggle display-mode="abbreviated" .current="${args.current}"></gc-language-toggle>
        <p style="margin-top: 1rem; color: #666; max-width: 200px;">
          Displays "FR" or "EN"
        </p>
      </div>
    </div>
  `,
};

/**
 * Toggle with prefix label "Language:" / "Langue:".
 */
export const WithPrefixLabel: Story = {
  args: {
    prefixLabel: 'Language:',
  },
  render: (args) => html`
    <div style="padding: 2rem;">
      <gc-language-toggle
        .current="${args.current}"
        .prefixLabel="${args.prefixLabel}"
      ></gc-language-toggle>
      <p style="margin-top: 1rem; color: #666;">Adds contextual label before toggle</p>
    </div>
  `,
};

/**
 * Toggle showing abbreviation in parentheses.
 */
export const WithAbbreviation: Story = {
  args: {
    showAbbr: true,
  },
  render: (args) => html`
    <div style="padding: 2rem;">
      <gc-language-toggle
        .current="${args.current}"
        .showAbbr="${args.showAbbr}"
      ></gc-language-toggle>
      <p style="margin-top: 1rem; color: #666;">Shows "Français (FR)" or "English (EN)"</p>
    </div>
  `,
};

/**
 * Inverted colors for dark backgrounds.
 */
export const Inverted: Story = {
  args: {
    inverted: true,
  },
  render: (args) => html`
    <div style="padding: 3rem; background-color: #1a1a1a;">
      <gc-language-toggle
        .current="${args.current}"
        .inverted="${args.inverted}"
      ></gc-language-toggle>
      <p style="margin-top: 1rem; color: #ffffff;">Inverted colors for dark backgrounds</p>
    </div>
  `,
};

/**
 * Inverted abbreviated toggle on dark background.
 */
export const InvertedAbbreviated: Story = {
  args: {
    inverted: true,
    displayMode: 'abbreviated',
    size: 'large',
  },
  render: (args) => html`
    <div style="padding: 3rem; background-color: #1a1a1a;">
      <gc-language-toggle
        .current="${args.current}"
        .inverted="${args.inverted}"
        .displayMode="${args.displayMode}"
        .size="${args.size}"
      ></gc-language-toggle>
      <p style="margin-top: 1rem; color: #ffffff;">Large abbreviated toggle on dark theme</p>
    </div>
  `,
};

/**
 * Header usage example with GC branding.
 */
export const InHeader: Story = {
  args: {},
  render: (args) => html`
    <header style="background-color: #fff; border-bottom: 4px solid #af3c43; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 2rem;">
        <img src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg" alt="Government of Canada" style="height: 30px;">
      </div>

      <gc-language-toggle
        .current="${args.current}"
        size="medium"
        @gc-language-change="${(e: CustomEvent) => {
          console.log('Header language changed:', e.detail);
        }}"
      ></gc-language-toggle>
    </header>
  `,
};

/**
 * Footer usage example.
 */
export const InFooter: Story = {
  args: {
    size: 'small',
    prefixLabel: 'Language:',
  },
  render: (args) => html`
    <footer style="background-color: #f8f8f8; border-top: 4px solid #af3c43; padding: 2rem;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <p style="margin: 0; font-size: 0.875rem; color: #666;">© His Majesty the King in Right of Canada</p>
          </div>

          <gc-language-toggle
            .current="${args.current}"
            .size="${args.size}"
            .prefixLabel="${args.prefixLabel}"
          ></gc-language-toggle>
        </div>
      </div>
    </footer>
  `,
};

/**
 * Interactive demo with language switching.
 */
export const InteractiveDemo: Story = {
  args: {},
  render: (args) => {
    let currentLang = args.current;
    
    return html`
      <div style="padding: 2rem; max-width: 800px;">
        <h2>${currentLang === 'en-CA' ? 'Welcome to Our Website' : 'Bienvenue sur notre site Web'}</h2>
        
        <gc-language-toggle
          .current="${currentLang}"
          size="large"
          @gc-language-change="${(e: CustomEvent) => {
            currentLang = e.detail.to;
            console.log('Language switched to:', currentLang);
          }}"
        ></gc-language-toggle>

        <div style="margin-top: 2rem;">
          <h3>${currentLang === 'en-CA' ? 'How it Works' : 'Comment ça fonctionne'}</h3>
          <ol style="line-height: 1.8;">
            <li>${currentLang === 'en-CA' 
              ? 'Click the language toggle above' 
              : 'Cliquez sur le commutateur de langue ci-dessus'}</li>
            <li>${currentLang === 'en-CA' 
              ? 'The component emits a "gc-language-change" event' 
              : 'Le composant émet un événement « gc-language-change »'}</li>
            <li>${currentLang === 'en-CA' 
              ? 'Your app listens for this event and updates the UI' 
              : 'Votre application écoute cet événement et met à jour l\'interface'}</li>
          </ol>
        </div>
      </div>
    `;
  },
};

/**
 * Accessibility features demonstration.
 */
export const AccessibilityFeatures: Story = {
  args: {},
  render: (args) => html`
    <div style="padding: 2rem; max-width: 800px;">
      <gc-language-toggle .current="${args.current}"></gc-language-toggle>

      <div style="margin-top: 2rem;">
        <h2>Accessibility Features</h2>
        <ul>
          <li><strong>Bilingual ARIA Labels:</strong> "Switch to French / Passer au français"</li>
          <li><strong>Keyboard Navigation:</strong> Fully accessible via Tab and Enter/Space</li>
          <li><strong>Focus Indicators:</strong> Clear 3px outline on focus</li>
          <li><strong>Screen Reader Support:</strong> Announces language change to assistive technology</li>
          <li><strong>Role="button":</strong> Proper semantic role for link-as-button pattern</li>
          <li><strong>Lang Attribute:</strong> Marks toggle text with correct language code</li>
          <li><strong>Color Contrast:</strong> Meets AAA standards (7:1 ratio)</li>
        </ul>

        <h3 style="margin-top: 2rem;">Try It</h3>
        <ol>
          <li>Press Tab to focus the toggle</li>
          <li>Press Enter or Space to activate</li>
          <li>Use a screen reader to hear bilingual labels</li>
          <li>Check the live region announcement after switching</li>
        </ol>
      </div>
    </div>
  `,
};

/**
 * Multiple toggles demonstrating different configurations.
 */
export const VariantShowcase: Story = {
  args: {},
  render: (args) => html`
    <div style="padding: 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
      <div style="padding: 1.5rem; border: 1px solid #d1d1d1; border-radius: 4px;">
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Default</h3>
        <gc-language-toggle current="en-CA"></gc-language-toggle>
      </div>

      <div style="padding: 1.5rem; border: 1px solid #d1d1d1; border-radius: 4px;">
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Abbreviated</h3>
        <gc-language-toggle current="en-CA" display-mode="abbreviated"></gc-language-toggle>
      </div>

      <div style="padding: 1.5rem; border: 1px solid #d1d1d1; border-radius: 4px;">
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">With Prefix</h3>
        <gc-language-toggle current="en-CA" prefix-label="Language:"></gc-language-toggle>
      </div>

      <div style="padding: 1.5rem; border: 1px solid #d1d1d1; border-radius: 4px;">
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">With Abbreviation</h3>
        <gc-language-toggle current="en-CA" show-abbr></gc-language-toggle>
      </div>

      <div style="padding: 1.5rem; border: 1px solid #d1d1d1; border-radius: 4px;">
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Small</h3>
        <gc-language-toggle current="en-CA" size="small"></gc-language-toggle>
      </div>

      <div style="padding: 1.5rem; border: 1px solid #d1d1d1; border-radius: 4px;">
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Large</h3>
        <gc-language-toggle current="en-CA" size="large"></gc-language-toggle>
      </div>

      <div style="padding: 1.5rem; background-color: #1a1a1a; border-radius: 4px;">
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem; color: #fff;">Inverted</h3>
        <gc-language-toggle current="en-CA" inverted></gc-language-toggle>
      </div>

      <div style="padding: 1.5rem; background-color: #1a1a1a; border-radius: 4px;">
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem; color: #fff;">Inverted Abbreviated</h3>
        <gc-language-toggle current="en-CA" inverted display-mode="abbreviated" size="large"></gc-language-toggle>
      </div>
    </div>
  `,
};
