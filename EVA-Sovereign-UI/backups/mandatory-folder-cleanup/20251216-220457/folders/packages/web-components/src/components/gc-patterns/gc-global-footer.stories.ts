import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-global-footer.js';

/**
 * GC Global Footer Component
 * 
 * The Government of Canada global footer is a mandatory pattern for all GC web properties.
 * It provides:
 * - Corporate links (About Government, About this site)
 * - Official GC wordmark
 * - Mandatory links (Social media, Privacy, Terms)
 * - Optional context band for related content
 * - Compact mode for minimal footprint
 * 
 * ## Design Specifications
 * - Must comply with https://design.canada.ca/common-design-patterns/site-footer.html
 * - Uses FIP red border (#af3c43)
 * - Lato font family for branding
 * - WET color palette (#284162 for links)
 * - WCAG 2.2 AAA compliant
 * - Bilingual EN-CA/FR-CA support
 */
const meta = {
  title: 'GC Patterns/Global Footer',
  component: 'gc-global-footer',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Global Footer is a mandatory Government of Canada design pattern that must appear
at the bottom of all government web pages. It provides consistent corporate links,
branding, and mandatory disclosures.

### Key Features
- **Corporate Links**: Organized sections for About Government and About this site
- **GC Wordmark**: Official Government of Canada branding
- **Mandatory Links**: Privacy, Terms and conditions, Social media (required by TBS)
- **Context Band**: Optional section for department-specific links
- **Compact Mode**: Minimal footer with essential links only
- **Responsive**: Mobile-first design with stack layout

### Compliance
- Treasury Board Secretariat (TBS) approved pattern
- Canada.ca design system requirement
- WCAG 2.2 Level AAA accessibility
- Federal Identity Program (FIP) compliant
        `,
      },
    },
  },
  argTypes: {
    expanded: {
      control: 'boolean',
      description: 'Show all footer sections (true) or compact version (false)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showContextBand: {
      control: 'boolean',
      description: 'Show optional context band above footer',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    contextBandTitle: {
      control: 'text',
      description: 'Title for context band section',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
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
    expanded: true,
    showContextBand: false,
    contextBandTitle: '',
    locale: 'en-CA',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/**
 * Default GC global footer with all sections visible.
 * This is the standard implementation for most government web pages.
 */
export const Default: Story = {
  args: {},
  render: (args) => html`
    <div style="min-height: 60vh; padding: 2rem; background-color: #fff;">
      <h1>Page Content</h1>
      <p>The footer appears at the bottom of the page with all corporate links.</p>
    </div>

    <gc-global-footer
      .expanded="${args.expanded}"
      .showContextBand="${args.showContextBand}"
      .contextBandTitle="${args.contextBandTitle}"
      .locale="${args.locale}"
      @gc-link-click="${(e: CustomEvent) => {
        console.log('Footer link clicked:', e.detail);
      }}"
    ></gc-global-footer>
  `,
};

/**
 * Compact footer with minimal links.
 * Use for internal applications or when space is limited.
 */
export const Compact: Story = {
  args: {
    expanded: false,
  },
  render: (args) => html`
    <div style="min-height: 60vh; padding: 2rem; background-color: #fff;">
      <h1>Internal Application</h1>
      <p>Compact footer shows only essential links.</p>
    </div>

    <gc-global-footer
      .expanded="${args.expanded}"
      .locale="${args.locale}"
    ></gc-global-footer>
  `,
};

/**
 * French language version (Français).
 * All footer content automatically switches to French.
 */
export const French: Story = {
  args: {
    locale: 'fr-CA',
  },
  render: (args) => html`
    <div style="min-height: 60vh; padding: 2rem; background-color: #fff;">
      <h1>Contenu de la page</h1>
      <p>Le pied de page apparaît au bas de la page avec tous les liens.</p>
    </div>

    <gc-global-footer
      .expanded="${args.expanded}"
      .locale="${args.locale}"
    ></gc-global-footer>
  `,
};

/**
 * Footer with context band for department-specific content.
 * Use this pattern to add related links or services.
 */
export const WithContextBand: Story = {
  args: {
    showContextBand: true,
    contextBandTitle: 'Employment and Social Development Canada',
  },
  render: (args) => html`
    <div style="min-height: 60vh; padding: 2rem; background-color: #fff;">
      <h1>ESDC Services</h1>
      <p>Context band provides department-specific footer content.</p>
    </div>

    <gc-global-footer
      .expanded="${args.expanded}"
      .showContextBand="${args.showContextBand}"
      .contextBandTitle="${args.contextBandTitle}"
      .locale="${args.locale}"
    >
      <div slot="bands" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
        <div>
          <h4 style="margin: 0 0 1rem 0; font-weight: 700;">Benefits</h4>
          <a href="/ei" style="display: block; margin-bottom: 0.5rem; color: #284162;">Employment Insurance</a>
          <a href="/cpp" style="display: block; margin-bottom: 0.5rem; color: #284162;">Canada Pension Plan</a>
          <a href="/oas" style="display: block; margin-bottom: 0.5rem; color: #284162;">Old Age Security</a>
        </div>
        <div>
          <h4 style="margin: 0 0 1rem 0; font-weight: 700;">Programs</h4>
          <a href="/training" style="display: block; margin-bottom: 0.5rem; color: #284162;">Skills training</a>
          <a href="/jobs" style="display: block; margin-bottom: 0.5rem; color: #284162;">Job Bank</a>
          <a href="/student-loans" style="display: block; margin-bottom: 0.5rem; color: #284162;">Student loans</a>
        </div>
      </div>
    </gc-global-footer>
  `,
};

/**
 * Footer with corporate links slot.
 * Add custom department or agency links.
 */
export const WithCorporateLinks: Story = {
  args: {},
  render: (args) => html`
    <div style="min-height: 60vh; padding: 2rem; background-color: #fff;">
      <h1>Department Portal</h1>
      <p>Corporate slot allows custom footer sections.</p>
    </div>

    <gc-global-footer
      .expanded="${args.expanded}"
      .locale="${args.locale}"
    >
      <div slot="corporate">
        <h3 style="font-family: Lato, sans-serif; font-size: 1.125rem; font-weight: 700; margin: 0 0 0.75rem 0;">
          Innovation, Science and Economic Development Canada
        </h3>
        <a href="/isde/about" style="display: block; margin-bottom: 0.5rem; color: #284162; text-decoration: underline;">
          About ISED
        </a>
        <a href="/isde/mandate" style="display: block; margin-bottom: 0.5rem; color: #284162; text-decoration: underline;">
          Mandate and role
        </a>
        <a href="/isde/transparency" style="display: block; margin-bottom: 0.5rem; color: #284162; text-decoration: underline;">
          Transparency
        </a>
        <a href="/isde/careers" style="display: block; margin-bottom: 0.5rem; color: #284162; text-decoration: underline;">
          Careers at ISED
        </a>
      </div>
    </gc-global-footer>
  `,
};

/**
 * Complete Canada.ca page with header and footer.
 * Shows the full GC page layout pattern.
 */
export const FullPageLayout: Story = {
  args: {},
  render: (args) => html`
    <style>
      .canada-page {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
      .canada-content {
        flex: 1;
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }
    </style>

    <div class="canada-page">
      <!-- Page content -->
      <div class="canada-content">
        <nav aria-label="Breadcrumb" style="margin-bottom: 1.5rem;">
          <a href="/" style="color: #284162;">Canada.ca</a> &gt;
          <a href="/services" style="color: #284162;">Services</a> &gt;
          <span>Benefits</span>
        </nav>

        <h1 style="font-size: 2.5rem; margin: 0 0 1rem 0;">Government benefits</h1>
        <p style="font-size: 1.125rem; margin-bottom: 2rem;">
          Find benefits and services to help you with employment, retirement,
          education, and more.
        </p>

        <section style="margin-bottom: 2rem;">
          <h2 style="border-top: 4px solid #26374a; padding-top: 1rem;">
            Employment Insurance
          </h2>
          <p>
            Get financial help while looking for work or upgrading your skills.
          </p>
          <a href="/ei" style="color: #284162; text-decoration: underline; font-weight: 700;">
            Apply for EI benefits
          </a>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="border-top: 4px solid #26374a; padding-top: 1rem;">
            Canada Pension Plan
          </h2>
          <p>
            Learn about CPP retirement, disability, and survivor benefits.
          </p>
          <a href="/cpp" style="color: #284162; text-decoration: underline; font-weight: 700;">
            CPP benefits calculator
          </a>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="border-top: 4px solid #26374a; padding-top: 1rem;">
            Old Age Security
          </h2>
          <p>
            Monthly payment available to seniors 65 and older.
          </p>
          <a href="/oas" style="color: #284162; text-decoration: underline; font-weight: 700;">
            Check OAS eligibility
          </a>
        </section>
      </div>

      <!-- Global footer -->
      <gc-global-footer
        .expanded="${args.expanded}"
        .locale="${args.locale}"
      ></gc-global-footer>
    </div>
  `,
};

/**
 * Department-specific footer with context band.
 * Example: Service Canada footer with program links.
 */
export const DepartmentFooter: Story = {
  args: {
    showContextBand: true,
    contextBandTitle: 'Service Canada',
  },
  render: (args) => html`
    <div style="min-height: 60vh; padding: 2rem; background-color: #fff;">
      <h1>Service Canada</h1>
      <p>Access benefits and services for Canadians.</p>
    </div>

    <gc-global-footer
      .expanded="${args.expanded}"
      .showContextBand="${args.showContextBand}"
      .contextBandTitle="${args.contextBandTitle}"
      .locale="${args.locale}"
    >
      <div slot="bands" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
        <div>
          <h4 style="margin: 0 0 0.75rem 0; font-weight: 700; font-size: 1rem;">Services</h4>
          <a href="/sc/services" style="display: block; margin-bottom: 0.5rem; color: #284162; text-decoration: underline;">
            All services
          </a>
          <a href="/sc/contact" style="display: block; margin-bottom: 0.5rem; color: #284162; text-decoration: underline;">
            Contact us
          </a>
          <a href="/sc/offices" style="display: block; margin-bottom: 0.5rem; color: #284162; text-decoration: underline;">
            Service locations
          </a>
        </div>
        <div>
          <h4 style="margin: 0 0 0.75rem 0; font-weight: 700; font-size: 1rem;">Tools</h4>
          <a href="/sc/my-account" style="display: block; margin-bottom: 0.5rem; color: #284162; text-decoration: underline;">
            My Service Canada Account
          </a>
          <a href="/sc/eservices" style="display: block; margin-bottom: 0.5rem; color: #284162; text-decoration: underline;">
            Online services
          </a>
          <a href="/sc/calculators" style="display: block; margin-bottom: 0.5rem; color: #284162; text-decoration: underline;">
            Benefit calculators
          </a>
        </div>
        <div>
          <h4 style="margin: 0 0 0.75rem 0; font-weight: 700; font-size: 1rem;">Information</h4>
          <a href="/sc/help" style="display: block; margin-bottom: 0.5rem; color: #284162; text-decoration: underline;">
            Help centre
          </a>
          <a href="/sc/fraud" style="display: block; margin-bottom: 0.5rem; color: #284162; text-decoration: underline;">
            Report fraud
          </a>
          <a href="/sc/accessibility" style="display: block; margin-bottom: 0.5rem; color: #284162; text-decoration: underline;">
            Accessibility services
          </a>
        </div>
      </div>
    </gc-global-footer>
  `,
};

/**
 * Mobile responsive demonstration.
 * Footer stacks sections vertically on small screens.
 */
export const MobileResponsive: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => html`
    <div style="min-height: 50vh; padding: 1rem; background-color: #fff;">
      <h1>Mobile View</h1>
      <p>Footer sections stack vertically for easy mobile navigation.</p>
    </div>

    <gc-global-footer
      .expanded="${args.expanded}"
      .locale="${args.locale}"
    ></gc-global-footer>
  `,
};

/**
 * Accessibility features demonstration.
 * Highlights the accessibility features of the global footer.
 */
export const AccessibilityFeatures: Story = {
  args: {},
  render: (args) => html`
    <div style="padding: 2rem; max-width: 1200px; margin: 0 auto; min-height: 60vh;">
      <h1>Footer Accessibility Features</h1>
      
      <h2>Built-in WCAG 2.2 AAA Compliance</h2>
      <ul>
        <li><strong>Contentinfo role:</strong> Footer has proper landmark role for screen readers</li>
        <li><strong>Heading hierarchy:</strong> Proper H2/H3 structure for sections</li>
        <li><strong>Underlined links:</strong> All links visually distinct without relying on color</li>
        <li><strong>Color contrast:</strong> Exceeds AAA contrast ratios (7:1)</li>
        <li><strong>Keyboard navigation:</strong> All links fully keyboard accessible</li>
        <li><strong>Focus indicators:</strong> Clear focus outlines on all interactive elements</li>
        <li><strong>Responsive text:</strong> Readable at all zoom levels up to 200%</li>
        <li><strong>Print styles:</strong> Footer optimized for printing</li>
        <li><strong>High contrast mode:</strong> Enhanced visibility in high contrast settings</li>
        <li><strong>Bilingual support:</strong> Full FR-CA/EN-CA translations</li>
      </ul>

      <h2>TBS Requirements</h2>
      <ul>
        <li>✅ Mandatory links present (Privacy, Terms, Social media)</li>
        <li>✅ Official GC wordmark displayed</li>
        <li>✅ Corporate links properly organized</li>
        <li>✅ FIP red brand border</li>
        <li>✅ WET-compliant color palette</li>
      </ul>
    </div>

    <gc-global-footer
      .expanded="${args.expanded}"
      .locale="${args.locale}"
    ></gc-global-footer>
  `,
};
