import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-signature.ts';

/**
 * GC Signature Component
 * 
 * The Government of Canada signature is the official brand mark that identifies GC web properties.
 * It consists of the Canadian flag icon and the "Canada.ca / Government of Canada" wordmark.
 * 
 * ## Design Specifications
 * - Must comply with https://design.canada.ca/common-design-patterns/canada-ca-signature.html
 * - Uses FIP red (#af3c43) for flag
 * - Lato font family for wordmark
 * - Three size variants: small, medium, large
 * - Inverted option for dark backgrounds
 * - WCAG 2.2 AAA compliant
 * - Bilingual EN-CA/FR-CA support
 */
const meta = {
  title: 'GC Patterns/Signature',
  component: 'gc-signature',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The GC Signature is the official Government of Canada brand mark. It must appear on all
GC web properties to provide consistent branding and user trust.

### Key Features
- **Official Branding**: Canadian flag + Government wordmark
- **Size Variants**: Small (compact), Medium (standard), Large (prominent)
- **Link Support**: Can link to homepage or be static
- **Inverted Colors**: White/red variant for dark backgrounds
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Bilingual**: Automatic FR-CA/EN-CA text switching

### Compliance
- Federal Identity Program (FIP) compliant
- Treasury Board Secretariat (TBS) approved
- Canada.ca design system requirement
- WCAG 2.2 Level AAA accessibility
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Signature size variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    href: {
      control: 'text',
      description: 'Link URL when signature is clicked',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '/' },
      },
    },
    linked: {
      control: 'boolean',
      description: 'Enable/disable link behavior',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
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
    locale: {
      control: 'select',
      options: ['en-CA', 'fr-CA'],
      description: 'Current locale (English or French Canadian)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'en-CA' },
      },
    },
  },
  args: {
    size: 'medium',
    href: '/',
    linked: true,
    inverted: false,
    locale: 'en-CA',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/**
 * Default medium-sized signature with link to homepage.
 * This is the standard implementation for headers and navbars.
 */
export const Default: Story = {
  args: {},
  render: (args) => html`
    <gc-signature
      .size="${args.size}"
      .href="${args.href}"
      .linked="${args.linked}"
      .inverted="${args.inverted}"
      .locale="${args.locale}"
      @gc-signature-click="${(e: CustomEvent) => {
        console.log('Signature clicked:', e.detail);
      }}"
    ></gc-signature>
  `,
};

/**
 * Small signature for compact layouts or secondary locations.
 * Ideal for footers, sidebars, or mobile headers.
 */
export const Small: Story = {
  args: {
    size: 'small',
  },
  render: (args) => html`
    <div style="padding: 2rem;">
      <gc-signature
        .size="${args.size}"
        .href="${args.href}"
        .linked="${args.linked}"
        .inverted="${args.inverted}"
        .locale="${args.locale}"
      ></gc-signature>
      <p style="margin-top: 1rem; color: #666;">Compact signature for space-constrained layouts</p>
    </div>
  `,
};

/**
 * Large signature for prominent positioning.
 * Use on landing pages or when branding emphasis is needed.
 */
export const Large: Story = {
  args: {
    size: 'large',
  },
  render: (args) => html`
    <div style="padding: 2rem;">
      <gc-signature
        .size="${args.size}"
        .href="${args.href}"
        .linked="${args.linked}"
        .inverted="${args.inverted}"
        .locale="${args.locale}"
      ></gc-signature>
      <p style="margin-top: 1rem; color: #666;">Large signature for prominent display</p>
    </div>
  `,
};

/**
 * French language version (Français).
 * Wordmark text switches to "Gouvernement du Canada".
 */
export const French: Story = {
  args: {
    locale: 'fr-CA',
  },
  render: (args) => html`
    <div style="padding: 2rem;">
      <gc-signature
        .size="${args.size}"
        .href="${args.href}"
        .linked="${args.linked}"
        .inverted="${args.inverted}"
        .locale="${args.locale}"
      ></gc-signature>
      <p style="margin-top: 1rem; color: #666;">Signature en français</p>
    </div>
  `,
};

/**
 * Inverted colors for dark backgrounds.
 * White flag with red maple leaf, white text.
 */
export const Inverted: Story = {
  args: {
    inverted: true,
  },
  render: (args) => html`
    <div style="padding: 3rem; background-color: #1a1a1a;">
      <gc-signature
        .size="${args.size}"
        .href="${args.href}"
        .linked="${args.linked}"
        .inverted="${args.inverted}"
        .locale="${args.locale}"
      ></gc-signature>
      <p style="margin-top: 1rem; color: #ffffff;">Inverted signature for dark backgrounds</p>
    </div>
  `,
};

/**
 * Static (non-linked) signature.
 * Use when navigation is not needed or appropriate.
 */
export const Static: Story = {
  args: {
    linked: false,
  },
  render: (args) => html`
    <div style="padding: 2rem;">
      <gc-signature
        .size="${args.size}"
        .href="${args.href}"
        .linked="${args.linked}"
        .inverted="${args.inverted}"
        .locale="${args.locale}"
      ></gc-signature>
      <p style="margin-top: 1rem; color: #666;">Static signature (no link behavior)</p>
    </div>
  `,
};

/**
 * All size variants side by side for comparison.
 */
export const SizeComparison: Story = {
  args: {},
  render: (args) => html`
    <div style="padding: 2rem; display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
      <div>
        <h3 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #666;">Small (24x18px flag)</h3>
        <gc-signature size="small" .locale="${args.locale}"></gc-signature>
      </div>

      <div>
        <h3 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #666;">Medium (32x24px flag)</h3>
        <gc-signature size="medium" .locale="${args.locale}"></gc-signature>
      </div>

      <div>
        <h3 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #666;">Large (40x30px flag)</h3>
        <gc-signature size="large" .locale="${args.locale}"></gc-signature>
      </div>
    </div>
  `,
};

/**
 * Header usage example.
 * Shows signature in a typical header layout.
 */
export const InHeader: Story = {
  args: {},
  render: (args) => html`
    <header style="background-color: #fff; border-bottom: 4px solid #af3c43; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
      <gc-signature
        .size="${args.size}"
        .href="${args.href}"
        .locale="${args.locale}"
      ></gc-signature>

      <nav style="display: flex; gap: 2rem;">
        <a href="/services" style="color: #284162; text-decoration: none;">Services</a>
        <a href="/about" style="color: #284162; text-decoration: none;">About</a>
        <a href="/contact" style="color: #284162; text-decoration: none;">Contact</a>
      </nav>
    </header>
  `,
};

/**
 * Footer usage example.
 * Shows small signature in a typical footer.
 */
export const InFooter: Story = {
  args: {
    size: 'small',
  },
  render: (args) => html`
    <footer style="background-color: #f8f8f8; border-top: 4px solid #af3c43; padding: 2rem;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
          <div>
            <h3 style="font-size: 1rem; font-weight: 700; margin: 0 0 1rem 0;">About</h3>
            <a href="/about" style="display: block; margin-bottom: 0.5rem; color: #284162;">About us</a>
            <a href="/contact" style="display: block; margin-bottom: 0.5rem; color: #284162;">Contact</a>
          </div>
          <div>
            <h3 style="font-size: 1rem; font-weight: 700; margin: 0 0 1rem 0;">Legal</h3>
            <a href="/privacy" style="display: block; margin-bottom: 0.5rem; color: #284162;">Privacy</a>
            <a href="/terms" style="display: block; margin-bottom: 0.5rem; color: #284162;">Terms</a>
          </div>
        </div>

        <div style="border-top: 1px solid #d1d1d1; padding-top: 2rem;">
          <gc-signature
            .size="${args.size}"
            .href="${args.href}"
            .locale="${args.locale}"
          ></gc-signature>
        </div>
      </div>
    </footer>
  `,
};

/**
 * Dark theme example with inverted signature.
 * Full page with dark background.
 */
export const DarkTheme: Story = {
  args: {
    inverted: true,
  },
  render: (args) => html`
    <div style="background-color: #1a1a1a; min-height: 400px; padding: 3rem;">
      <gc-signature
        .size="${args.size}"
        .href="${args.href}"
        .linked="${args.linked}"
        .inverted="${args.inverted}"
        .locale="${args.locale}"
      ></gc-signature>

      <div style="margin-top: 3rem; color: #ffffff;">
        <h1 style="font-size: 2.5rem; margin: 0 0 1rem 0;">Dark Theme Application</h1>
        <p style="font-size: 1.125rem; line-height: 1.6;">
          The inverted signature maintains brand consistency on dark backgrounds
          while ensuring proper contrast and readability.
        </p>
      </div>
    </div>
  `,
};

/**
 * Accessibility features demonstration.
 */
export const AccessibilityFeatures: Story = {
  args: {},
  render: (args) => html`
    <div style="padding: 2rem; max-width: 800px;">
      <gc-signature
        .size="${args.size}"
        .href="${args.href}"
        .locale="${args.locale}"
      ></gc-signature>

      <div style="margin-top: 2rem;">
        <h2>Accessibility Features</h2>
        <ul>
          <li><strong>ARIA Labels:</strong> Proper labels for flag icon and signature link</li>
          <li><strong>Keyboard Navigation:</strong> Fully accessible via Tab key</li>
          <li><strong>Focus Indicators:</strong> Clear 3px outline on focus</li>
          <li><strong>Screen Reader Support:</strong> Announces "Government of Canada" or "Gouvernement du Canada"</li>
          <li><strong>Color Contrast:</strong> Meets AAA standards (7:1 ratio)</li>
          <li><strong>Touch Targets:</strong> Large enough for mobile interaction</li>
          <li><strong>Semantic HTML:</strong> Uses proper anchor tags for links</li>
        </ul>

        <h3 style="margin-top: 2rem;">Try It</h3>
        <ol>
          <li>Press Tab to focus the signature</li>
          <li>Press Enter/Space to activate the link</li>
          <li>Use a screen reader to hear the accessible labels</li>
        </ol>
      </div>
    </div>
  `,
};

/**
 * Bilingual switching demonstration.
 */
export const BilingualDemo: Story = {
  args: {},
  render: (args) => html`
    <div style="padding: 2rem;">
      <div style="display: flex; gap: 4rem; align-items: flex-start;">
        <div>
          <h3 style="margin: 0 0 1rem 0;">English</h3>
          <gc-signature size="large" locale="en-CA"></gc-signature>
          <p style="margin-top: 1rem; color: #666; max-width: 300px;">
            English signature displays "Government of Canada"
          </p>
        </div>

        <div>
          <h3 style="margin: 0 0 1rem 0;">Français</h3>
          <gc-signature size="large" locale="fr-CA"></gc-signature>
          <p style="margin-top: 1rem; color: #666; max-width: 300px;">
            La signature française affiche « Gouvernement du Canada »
          </p>
        </div>
      </div>

      <div style="margin-top: 3rem; padding: 1.5rem; background-color: #f0f0f0; border-left: 4px solid #af3c43;">
        <p style="margin: 0; font-weight: 700;">Bilingual Requirement</p>
        <p style="margin: 0.5rem 0 0 0;">
          All Government of Canada websites must support both English and French.
          The signature automatically adapts based on the locale property.
        </p>
      </div>
    </div>
  `,
};
