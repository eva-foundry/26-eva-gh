import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-global-header.js';

/**
 * GC Global Header Component
 * 
 * The Government of Canada global header is a mandatory pattern for all GC web properties.
 * It provides:
 * - Official GC signature with flag and wordmark
 * - Language toggle (English/French)
 * - Global search functionality
 * - Primary navigation menu
 * - Mobile-responsive menu
 * - Skip-to-content accessibility link
 * 
 * ## Design Specifications
 * - Must comply with https://design.canada.ca/common-design-patterns/site-header.html
 * - Uses FIP red border (#af3c43)
 * - Lato font family for branding
 * - WET color palette (#284162 for links)
 * - WCAG 2.2 AAA compliant
 * - Bilingual EN-CA/FR-CA support
 */
const meta = {
  title: 'GC Patterns/Global Header',
  component: 'gc-global-header',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Global Header is a mandatory Government of Canada design pattern that must appear
on all government web pages. It provides consistent branding, navigation, and accessibility
features across all GC digital properties.

### Key Features
- **Official GC Branding**: Canadian flag icon and Government of Canada wordmark
- **Language Toggle**: Seamless switching between English and French
- **Search**: Integrated Canada.ca search functionality
- **Navigation**: Flexible slot-based navigation system
- **Mobile-First**: Responsive design with hamburger menu for mobile
- **Accessibility**: Skip-to-content link, ARIA landmarks, keyboard navigation

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
    siteTitle: {
      control: 'text',
      description: 'Optional site title displayed next to navigation',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    showSearch: {
      control: 'boolean',
      description: 'Show/hide the search widget',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showLanguageToggle: {
      control: 'boolean',
      description: 'Show/hide the language toggle button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
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
    siteTitle: '',
    showSearch: true,
    showLanguageToggle: true,
    locale: 'en-CA',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/**
 * Default GC global header with all features enabled.
 * This is the standard implementation for most government web pages.
 */
export const Default: Story = {
  args: {},
  render: (args) => html`
    <gc-global-header
      .siteTitle="${args.siteTitle}"
      .showSearch="${args.showSearch}"
      .showLanguageToggle="${args.showLanguageToggle}"
      .locale="${args.locale}"
      @gc-language-change="${(e: CustomEvent) => {
        console.log('Language changed:', e.detail);
        alert(`Language changed to: ${e.detail.locale}`);
      }}"
      @gc-search="${(e: CustomEvent) => {
        console.log('Search submitted:', e.detail);
        alert(`Search query: ${e.detail.query}`);
      }}"
      @gc-menu-toggle="${(e: CustomEvent) => {
        console.log('Mobile menu toggled:', e.detail);
      }}"
    >
      <a href="/en/services">Services and information</a>
      <a href="/en/departments">Departments and agencies</a>
      <a href="/en/government">About government</a>
    </gc-global-header>

    <!-- Example main content target for skip link -->
    <main id="main-content" style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
      <h1>Welcome to Government of Canada</h1>
      <p>This is where your page content would appear.</p>
      <p>The skip-to-content link allows screen reader users to bypass the header and jump directly here.</p>
    </main>
  `,
};

/**
 * Global header with a custom site title.
 * Use this pattern for specific services or departments.
 */
export const WithSiteTitle: Story = {
  args: {
    siteTitle: 'Employment and Social Development Canada',
  },
  render: (args) => html`
    <gc-global-header
      .siteTitle="${args.siteTitle}"
      .showSearch="${args.showSearch}"
      .showLanguageToggle="${args.showLanguageToggle}"
      .locale="${args.locale}"
    >
      <a href="/en/services">Services</a>
      <a href="/en/benefits">Benefits</a>
      <a href="/en/careers">Careers</a>
      <a href="/en/immigration">Immigration</a>
    </gc-global-header>

    <main id="main-content" style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
      <h1>ESDC Services</h1>
      <p>Employment Insurance, pensions, and social programs.</p>
    </main>
  `,
};

/**
 * French language version (Français).
 * All text content automatically switches to French.
 */
export const French: Story = {
  args: {
    locale: 'fr-CA',
    siteTitle: 'Emploi et Développement social Canada',
  },
  render: (args) => html`
    <gc-global-header
      .siteTitle="${args.siteTitle}"
      .showSearch="${args.showSearch}"
      .showLanguageToggle="${args.showLanguageToggle}"
      .locale="${args.locale}"
    >
      <a href="/fr/services">Services</a>
      <a href="/fr/prestations">Prestations</a>
      <a href="/fr/carrieres">Carrières</a>
      <a href="/fr/immigration">Immigration</a>
    </gc-global-header>

    <main id="main-content" style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
      <h1>Services d'EDSC</h1>
      <p>Assurance-emploi, pensions et programmes sociaux.</p>
    </main>
  `,
};

/**
 * Minimal header without search.
 * Use for internal tools or applications where search isn't needed.
 */
export const NoSearch: Story = {
  args: {
    showSearch: false,
    siteTitle: 'Internal Portal',
  },
  render: (args) => html`
    <gc-global-header
      .siteTitle="${args.siteTitle}"
      .showSearch="${args.showSearch}"
      .showLanguageToggle="${args.showLanguageToggle}"
      .locale="${args.locale}"
    >
      <a href="/dashboard">Dashboard</a>
      <a href="/reports">Reports</a>
      <a href="/settings">Settings</a>
    </gc-global-header>

    <main id="main-content" style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
      <h1>Internal Tools</h1>
      <p>Search functionality disabled for this internal application.</p>
    </main>
  `,
};

/**
 * Minimal header without language toggle.
 * Use for single-language applications (not recommended for public-facing sites).
 */
export const NoLanguageToggle: Story = {
  args: {
    showLanguageToggle: false,
    siteTitle: 'Public Service Portal',
  },
  render: (args) => html`
    <gc-global-header
      .siteTitle="${args.siteTitle}"
      .showSearch="${args.showSearch}"
      .showLanguageToggle="${args.showLanguageToggle}"
      .locale="${args.locale}"
    >
      <a href="/home">Home</a>
      <a href="/services">Services</a>
      <a href="/contact">Contact</a>
    </gc-global-header>

    <main id="main-content" style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
      <h1>Single Language Site</h1>
      <p><strong>Note:</strong> Language toggle is hidden. This configuration is NOT recommended for public-facing Government of Canada sites.</p>
    </main>
  `,
};

/**
 * Custom search implementation using the search slot.
 * Replace the default search with your own implementation.
 */
export const CustomSearch: Story = {
  args: {
    siteTitle: 'Advanced Services Portal',
  },
  render: (args) => html`
    <gc-global-header
      .siteTitle="${args.siteTitle}"
      .showSearch="${args.showSearch}"
      .showLanguageToggle="${args.showLanguageToggle}"
      .locale="${args.locale}"
    >
      <a href="/services">Services</a>
      <a href="/documents">Documents</a>
      
      <div slot="search" style="display: flex; gap: 0.5rem;">
        <select style="padding: 0.5rem; border: 2px solid #666; border-radius: 0.25rem;">
          <option>All</option>
          <option>Services</option>
          <option>Forms</option>
          <option>Guides</option>
        </select>
        <input 
          type="search" 
          placeholder="Advanced search..."
          style="padding: 0.5rem; border: 2px solid #666; border-radius: 0.25rem; min-width: 200px;"
        />
        <button 
          style="background-color: #284162; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;"
        >
          Search
        </button>
      </div>
    </gc-global-header>

    <main id="main-content" style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
      <h1>Custom Search</h1>
      <p>This example shows how to replace the default search with a custom implementation using the "search" slot.</p>
    </main>
  `,
};

/**
 * Mobile responsive behavior demonstration.
 * Resize the viewport to see the hamburger menu appear.
 */
export const MobileResponsive: Story = {
  args: {
    siteTitle: 'Mobile-First Design',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => html`
    <gc-global-header
      .siteTitle="${args.siteTitle}"
      .showSearch="${args.showSearch}"
      .showLanguageToggle="${args.showLanguageToggle}"
      .locale="${args.locale}"
      @gc-menu-toggle="${(e: CustomEvent) => {
        console.log('Mobile menu:', e.detail.open ? 'OPENED' : 'CLOSED');
      }}"
    >
      <a href="/services">Services</a>
      <a href="/benefits">Benefits</a>
      <a href="/immigration">Immigration</a>
      <a href="/business">Business</a>
      <a href="/jobs">Jobs</a>
    </gc-global-header>

    <main id="main-content" style="padding: 1rem;">
      <h1>Mobile View</h1>
      <p>Tap the "Menu" button to open the mobile navigation.</p>
      <ul>
        <li>Hamburger menu for navigation</li>
        <li>Responsive search input</li>
        <li>Touch-friendly targets (44px minimum)</li>
        <li>Optimized for small screens</li>
      </ul>
    </main>
  `,
};

/**
 * Canada.ca homepage implementation example.
 * Shows the header as it would appear on the main Canada.ca site.
 */
export const CanadaDotCa: Story = {
  args: {
    siteTitle: '',
  },
  render: (args) => html`
    <gc-global-header
      .siteTitle="${args.siteTitle}"
      .showSearch="${args.showSearch}"
      .showLanguageToggle="${args.showLanguageToggle}"
      .locale="${args.locale}"
      @gc-language-change="${(e: CustomEvent) => {
        alert(`Switching to: ${e.detail.locale === 'en-CA' ? 'English' : 'Français'}`);
      }}"
      @gc-search="${(e: CustomEvent) => {
        if (e.detail.query) {
          alert(`Searching Canada.ca for: "${e.detail.query}"`);
        }
      }}"
    >
      <a href="/en/services">Services and information</a>
      <a href="/en/departments">Departments and agencies</a>
      <a href="/en/government">About government</a>
      <a href="/en/news">News</a>
    </gc-global-header>

    <main id="main-content" style="padding: 2rem; max-width: 1200px; margin: 0 auto; background-color: #f5f5f5;">
      <div style="background-color: white; padding: 2rem; margin-bottom: 2rem;">
        <h1 style="font-size: 2.5rem; margin: 0 0 1rem 0; color: #333;">Canada.ca</h1>
        <p style="font-size: 1.125rem; color: #666;">Services and information from the Government of Canada</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <div style="background-color: white; padding: 1.5rem; border-top: 4px solid #26374a;">
          <h2 style="margin-top: 0;">Jobs and the workplace</h2>
          <p>Find a job, training, hiring programs, permits</p>
        </div>
        <div style="background-color: white; padding: 1.5rem; border-top: 4px solid #26374a;">
          <h2 style="margin-top: 0;">Immigration and citizenship</h2>
          <p>Visit, work, study, immigrate, citizenship</p>
        </div>
        <div style="background-color: white; padding: 1.5rem; border-top: 4px solid #26374a;">
          <h2 style="margin-top: 0;">Travel and tourism</h2>
          <p>Passports, advisories, attractions, events</p>
        </div>
      </div>
    </main>
  `,
};

/**
 * Accessibility features demonstration.
 * Highlights the accessibility features of the global header.
 */
export const AccessibilityFeatures: Story = {
  args: {
    siteTitle: 'Accessible Government Services',
  },
  render: (args) => html`
    <gc-global-header
      .siteTitle="${args.siteTitle}"
      .showSearch="${args.showSearch}"
      .showLanguageToggle="${args.showLanguageToggle}"
      .locale="${args.locale}"
    >
      <a href="/home">Home</a>
      <a href="/services">Services</a>
      <a href="/accessibility">Accessibility</a>
    </gc-global-header>

    <main id="main-content" style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
      <h1>Accessibility Features</h1>
      
      <h2>Built-in WCAG 2.2 AAA Compliance</h2>
      <ul>
        <li><strong>Skip to content:</strong> Hidden link appears on Tab focus, allows keyboard users to skip navigation</li>
        <li><strong>ARIA landmarks:</strong> Proper banner role and navigation labels</li>
        <li><strong>Touch targets:</strong> All interactive elements are at least 44x44 pixels</li>
        <li><strong>Keyboard navigation:</strong> Full keyboard support with visible focus indicators</li>
        <li><strong>Screen reader support:</strong> Descriptive labels and announcements</li>
        <li><strong>Color contrast:</strong> Meets AAA contrast ratios (7:1 for text)</li>
        <li><strong>Language switching:</strong> Proper lang attribute updates</li>
        <li><strong>Responsive:</strong> Works on all viewport sizes and zoom levels</li>
        <li><strong>Reduced motion:</strong> Respects prefers-reduced-motion setting</li>
        <li><strong>High contrast:</strong> Enhanced borders in high contrast mode</li>
      </ul>

      <h2>Try It</h2>
      <ol>
        <li>Press Tab to see the skip link appear</li>
        <li>Use Tab to navigate through all interactive elements</li>
        <li>Press Enter/Space on buttons and links</li>
        <li>Use a screen reader to hear proper labels and roles</li>
        <li>Toggle language to hear language change announcement</li>
      </ol>
    </main>
  `,
};
