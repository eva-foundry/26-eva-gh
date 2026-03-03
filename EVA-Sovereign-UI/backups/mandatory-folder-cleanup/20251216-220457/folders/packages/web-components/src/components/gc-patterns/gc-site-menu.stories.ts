import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { MenuItem } from './gc-site-menu.js';
import './gc-site-menu.js';

/**
 * GC Site Menu Component
 * 
 * Main navigation menu for Government of Canada websites with full keyboard support,
 * mobile responsiveness, and nested menu capabilities.
 * 
 * ## Design Specifications
 * - MANDATORY for all GC websites requiring main navigation
 * - Implements ARIA menubar pattern with full keyboard support
 * - Responsive mobile hamburger menu
 * - Supports nested submenus (multi-level navigation)
 * - Tab, Arrow keys, Enter, Space, Escape navigation
 * - Current page indicators
 * - External link indicators
 * - Full bilingual support
 */
const meta = {
  title: 'GC Patterns/Site Menu',
  component: 'gc-site-menu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The GC Site Menu component provides the main navigation structure for Government of Canada
websites. It implements ARIA menubar patterns with full keyboard accessibility, mobile
hamburger menu, and support for nested submenus.

### Key Features
- **ARIA Menubar Pattern**: Complete keyboard navigation with Tab/Arrow/Enter/Escape
- **Mobile Responsive**: Automatic hamburger menu on mobile viewports
- **Nested Menus**: Support for multi-level navigation hierarchies
- **Current Page Indicators**: Visual and semantic marking of active pages
- **External Links**: Automatic indicators for external URLs
- **Keyboard Navigation**: Full keyboard-only operation
- **Bilingual**: English and French labels

### Keyboard Shortcuts
- **Tab**: Move to next menu item
- **Shift+Tab**: Move to previous menu item
- **Enter/Space**: Activate menu item or toggle submenu
- **Arrow Down/Right**: Next item in menu
- **Arrow Up/Left**: Previous item in menu
- **Escape**: Close current submenu

### Usage Guidelines
- Place as first element after skip links
- Use for main site navigation (3-7 top-level items recommended)
- Mark current page with \`current: true\`
- Use nested menus sparingly (max 2-3 levels)
- Keep menu item text concise (2-4 words ideal)
        `,
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of menu item configurations',
      table: {
        type: { summary: 'MenuItem[]' },
      },
    },
    vertical: {
      control: 'boolean',
      description: 'Vertical orientation (sidebar) vs horizontal (menubar)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    mobileMenuOpen: {
      control: 'boolean',
      description: 'Mobile menu open state (controlled)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showMobileToggle: {
      control: 'boolean',
      description: 'Show mobile hamburger toggle button',
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
} satisfies Meta;

export default meta;
type Story = StoryObj;

/**
 * Simple horizontal menu with 5 top-level items.
 */
export const Default: Story = {
  args: {
    locale: 'en-CA',
    vertical: false,
    showMobileToggle: true,
  },
  render: (args) => {
    const items: MenuItem[] = [
      { text: 'Home', href: '/', current: true },
      { text: 'Services', href: '/services' },
      { text: 'Departments', href: '/departments' },
      { text: 'About', href: '/about' },
      { text: 'Contact', href: '/contact' },
    ];

    return html`
      <div style="border: 2px solid #e5e5e5; padding: 1rem;">
        <p style="margin: 0 0 1rem 0; font-weight: 700;">
          ⌨️ Try keyboard navigation: Tab, Arrow keys, Enter
        </p>
        <gc-site-menu
          .items="${items}"
          .locale="${args.locale}"
          ?vertical="${args.vertical}"
          ?show-mobile-toggle="${args.showMobileToggle}"
          @gc-menu-item-click="${(e: CustomEvent) => {
            console.log('Menu item clicked:', e.detail);
          }}"
        ></gc-site-menu>
      </div>
    `;
  },
};

/**
 * Menu with nested submenus (2 levels deep).
 */
export const WithNestedMenus: Story = {
  args: {},
  render: (args) => {
    const items: MenuItem[] = [
      { text: 'Home', href: '/' },
      {
        text: 'About',
        href: '/about',
        children: [
          { text: 'Our History', href: '/about/history' },
          { text: 'Leadership Team', href: '/about/team' },
          { text: 'Mission & Values', href: '/about/mission' },
          { text: 'Annual Reports', href: '/about/reports' },
        ],
      },
      {
        text: 'Services',
        href: '/services',
        children: [
          { text: 'Employment Insurance', href: '/services/ei' },
          { text: 'Old Age Security', href: '/services/oas' },
          { text: 'Canada Pension Plan', href: '/services/cpp' },
          { text: 'Social Programs', href: '/services/social' },
        ],
      },
      {
        text: 'Resources',
        href: '/resources',
        children: [
          { text: 'Publications', href: '/resources/publications' },
          { text: 'Statistics', href: '/resources/statistics' },
          { text: 'Tools & Calculators', href: '/resources/tools' },
        ],
      },
      { text: 'Contact', href: '/contact' },
    ];

    return html`
      <div style="border: 2px solid #e5e5e5; padding: 1rem;">
        <p style="margin: 0 0 1rem 0; font-weight: 700;">
          Click menu items with ▶ to expand submenus
        </p>
        <gc-site-menu .items="${items}"></gc-site-menu>
      </div>
    `;
  },
};

/**
 * Vertical sidebar navigation (common for secondary navigation).
 */
export const VerticalSidebar: Story = {
  args: {
    vertical: true,
  },
  render: (args) => {
    const items: MenuItem[] = [
      { text: 'Dashboard', href: '/dashboard', current: true },
      { text: 'Profile Settings', href: '/profile' },
      {
        text: 'Applications',
        href: '/applications',
        children: [
          { text: 'Employment Insurance', href: '/applications/ei' },
          { text: 'Pension Benefits', href: '/applications/pension' },
          { text: 'Social Assistance', href: '/applications/social' },
        ],
      },
      {
        text: 'Documents',
        href: '/documents',
        children: [
          { text: 'Tax Forms', href: '/documents/tax' },
          { text: 'Pay Stubs', href: '/documents/pay' },
          { text: 'Benefits Summary', href: '/documents/benefits' },
        ],
      },
      { text: 'Help & Support', href: '/help' },
      { text: 'Sign Out', href: '/signout' },
    ];

    return html`
      <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem; border: 2px solid #e5e5e5;">
        <div style="background-color: #f5f5f5; padding: 1rem;">
          <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Secondary Navigation</h3>
          <gc-site-menu
            .items="${items}"
            ?vertical="${args.vertical}"
            .showMobileToggle="${false}"
          ></gc-site-menu>
        </div>
        <div style="padding: 2rem;">
          <h1>Main Content Area</h1>
          <p>
            Vertical menus are perfect for sidebar navigation. Notice how the submenus
            expand inline rather than as dropdowns.
          </p>
        </div>
      </div>
    `;
  },
};

/**
 * Menu with current page indicator.
 */
export const WithCurrentPage: Story = {
  args: {},
  render: (args) => {
    const items: MenuItem[] = [
      { text: 'Home', href: '/' },
      { text: 'Services', href: '/services' },
      {
        text: 'About',
        href: '/about',
        current: true,
        children: [
          { text: 'History', href: '/about/history', current: true },
          { text: 'Team', href: '/about/team' },
          { text: 'Mission', href: '/about/mission' },
        ],
      },
      { text: 'Contact', href: '/contact' },
    ];

    return html`
      <div style="border: 2px solid #e5e5e5; padding: 1rem;">
        <p style="margin: 0 0 1rem 0; font-weight: 700;">
          Current page items are highlighted in GC blue
        </p>
        <gc-site-menu .items="${items}"></gc-site-menu>
        <div style="margin-top: 2rem; padding: 1rem; background-color: #f5f5f5;">
          <p style="margin: 0;">
            <strong>About > History</strong> is marked as current. Notice the blue
            background and white text for current items.
          </p>
        </div>
      </div>
    `;
  },
};

/**
 * Menu with external link indicators.
 */
export const WithExternalLinks: Story = {
  args: {},
  render: (args) => {
    const items: MenuItem[] = [
      { text: 'Home', href: '/' },
      { text: 'Canada.ca', href: 'https://www.canada.ca', external: true },
      {
        text: 'Resources',
        href: '/resources',
        children: [
          { text: 'Internal Report', href: '/resources/report' },
          { text: 'Statistics Canada', href: 'https://statcan.gc.ca', external: true },
          { text: 'Open Data Portal', href: 'https://open.canada.ca', external: true },
        ],
      },
      { text: 'GitHub', href: 'https://github.com', external: true },
      { text: 'Contact', href: '/contact' },
    ];

    return html`
      <div style="border: 2px solid #e5e5e5; padding: 1rem;">
        <p style="margin: 0 0 1rem 0; font-weight: 700;">
          External links show ↗ indicator and open in new tab
        </p>
        <gc-site-menu .items="${items}"></gc-site-menu>
      </div>
    `;
  },
};

/**
 * French language version (Français).
 */
export const French: Story = {
  args: {
    locale: 'fr-CA',
  },
  render: (args) => {
    const items: MenuItem[] = [
      { text: 'Accueil', href: '/', current: true },
      {
        text: 'À propos',
        href: '/about',
        children: [
          { text: 'Notre histoire', href: '/about/history' },
          { text: 'Équipe de direction', href: '/about/team' },
        ],
      },
      { text: 'Services', href: '/services' },
      { text: 'Contact', href: '/contact' },
    ];

    return html`
      <div style="border: 2px solid #e5e5e5; padding: 1rem;">
        <p style="margin: 0 0 1rem 0; font-weight: 700;">
          ⌨️ Navigation au clavier : Tab, flèches, Entrée
        </p>
        <gc-site-menu .items="${items}" .locale="${args.locale}"></gc-site-menu>
      </div>
    `;
  },
};

/**
 * Mobile responsive demonstration (resize browser to see hamburger menu).
 */
export const MobileResponsive: Story = {
  args: {},
  render: (args) => {
    const items: MenuItem[] = [
      { text: 'Home', href: '/' },
      { text: 'Services', href: '/services' },
      {
        text: 'About',
        href: '/about',
        children: [
          { text: 'History', href: '/about/history' },
          { text: 'Team', href: '/about/team' },
        ],
      },
      { text: 'Contact', href: '/contact' },
    ];

    return html`
      <div style="border: 2px solid #e5e5e5; padding: 1rem;">
        <div style="margin-bottom: 1rem; padding: 1rem; background-color: #fff3cd; border-left: 4px solid #ffc107;">
          <p style="margin: 0; font-weight: 700;">📱 Mobile Demo</p>
          <p style="margin: 0.5rem 0 0 0;">
            Resize browser to less than 768px width to see the hamburger menu appear.
            Click it to toggle the mobile menu.
          </p>
        </div>
        <gc-site-menu
          .items="${items}"
          @gc-mobile-menu-toggle="${(e: CustomEvent) => {
            console.log('Mobile menu toggled:', e.detail.open);
          }}"
        ></gc-site-menu>
      </div>
    `;
  },
};

/**
 * Complex multi-level menu (3 levels deep).
 */
export const ComplexMultiLevel: Story = {
  args: {},
  render: (args) => {
    const items: MenuItem[] = [
      { text: 'Home', href: '/' },
      {
        text: 'Government',
        href: '/government',
        children: [
          {
            text: 'How Government Works',
            href: '/government/how',
            children: [
              { text: 'Federal', href: '/government/how/federal' },
              { text: 'Provincial', href: '/government/how/provincial' },
              { text: 'Municipal', href: '/government/how/municipal' },
            ],
          },
          { text: 'Departments & Agencies', href: '/government/departments' },
          { text: 'Prime Minister', href: '/government/pm' },
        ],
      },
      {
        text: 'Services',
        href: '/services',
        children: [
          {
            text: 'Benefits',
            href: '/services/benefits',
            children: [
              { text: 'Employment Insurance', href: '/services/benefits/ei' },
              { text: 'Old Age Security', href: '/services/benefits/oas' },
              { text: 'Canada Pension Plan', href: '/services/benefits/cpp' },
            ],
          },
          {
            text: 'Jobs & Workplace',
            href: '/services/jobs',
            children: [
              { text: 'Find a Job', href: '/services/jobs/find' },
              { text: 'Training', href: '/services/jobs/training' },
              { text: 'Workplace Rights', href: '/services/jobs/rights' },
            ],
          },
        ],
      },
      { text: 'Contact', href: '/contact' },
    ];

    return html`
      <div style="border: 2px solid #e5e5e5; padding: 1rem;">
        <div style="margin-bottom: 1rem; padding: 1rem; background-color: #e7f3ff; border-left: 4px solid #2874a6;">
          <p style="margin: 0; font-weight: 700;">🗂️ Multi-Level Navigation</p>
          <p style="margin: 0.5rem 0 0 0;">
            This demonstrates 3-level deep menus. Click arrows to expand nested submenus.
            Use keyboard navigation to traverse the hierarchy.
          </p>
        </div>
        <gc-site-menu .items="${items}"></gc-site-menu>
      </div>
    `;
  },
};

/**
 * Custom ARIA labels for accessibility.
 */
export const CustomAriaLabels: Story = {
  args: {},
  render: (args) => {
    const items: MenuItem[] = [
      {
        text: 'Home',
        href: '/',
        ariaLabel: 'Navigate to homepage',
      },
      {
        text: 'About',
        href: '/about',
        ariaLabel: 'Learn about our organization',
        children: [
          {
            text: 'Team',
            href: '/about/team',
            ariaLabel: 'Meet our leadership team',
          },
          {
            text: 'History',
            href: '/about/history',
            ariaLabel: 'Discover our organization history',
          },
        ],
      },
      {
        text: 'Contact',
        href: '/contact',
        ariaLabel: 'Contact us for support',
      },
    ];

    return html`
      <div style="border: 2px solid #e5e5e5; padding: 1rem;">
        <div style="margin-bottom: 1rem; padding: 1rem; background-color: #f0f0f0; border-left: 4px solid #666;">
          <p style="margin: 0; font-weight: 700;">♿ Enhanced Accessibility</p>
          <p style="margin: 0.5rem 0 0 0;">
            Custom ARIA labels provide more descriptive context for screen reader users.
            Inspect the DOM or use a screen reader to hear the enhanced labels.
          </p>
        </div>
        <gc-site-menu .items="${items}"></gc-site-menu>
      </div>
    `;
  },
};

/**
 * Full page layout example with header.
 */
export const FullPageLayout: Story = {
  args: {},
  render: (args) => {
    const items: MenuItem[] = [
      { text: 'Home', href: '/', current: true },
      {
        text: 'Services',
        href: '/services',
        children: [
          { text: 'Employment Insurance', href: '/services/ei' },
          { text: 'Pensions', href: '/services/pensions' },
        ],
      },
      { text: 'About', href: '/about' },
      { text: 'Contact', href: '/contact' },
    ];

    return html`
      <div style="min-height: 100vh; display: flex; flex-direction: column;">
        <header style="background-color: #fff; border-bottom: 4px solid #af3c43;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="width: 32px; height: 24px; background-color: #af3c43;"></div>
                <div>
                  <div style="font-weight: 700; font-size: 1.125rem;">Government of Canada</div>
                  <div style="font-size: 0.875rem; color: #666;">Gouvernement du Canada</div>
                </div>
              </div>
              <button style="padding: 0.5rem 1rem; border: 1px solid #284162; background: none; color: #284162; cursor: pointer;">
                Français
              </button>
            </div>
            <gc-site-menu .items="${items}"></gc-site-menu>
          </div>
        </header>
        <main style="flex: 1; padding: 3rem 2rem; max-width: 1200px; margin: 0 auto; width: 100%;">
          <h1>Welcome to Canada.ca</h1>
          <p style="font-size: 1.125rem; line-height: 1.6;">
            This demonstrates the site menu in a complete page layout. The menu integrates
            seamlessly with the Government of Canada header pattern.
          </p>
        </main>
        <footer style="background-color: #f8f8f8; border-top: 4px solid #af3c43; padding: 2rem;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <p style="margin: 0;">© His Majesty the King in Right of Canada</p>
          </div>
        </footer>
      </div>
    `;
  },
};

/**
 * Event tracking and analytics demonstration.
 */
export const EventTracking: Story = {
  args: {},
  render: (args) => {
    const items: MenuItem[] = [
      { text: 'Home', href: '/' },
      {
        text: 'Services',
        href: '/services',
        children: [
          { text: 'Employment', href: '/services/employment' },
          { text: 'Benefits', href: '/services/benefits' },
        ],
      },
      { text: 'Contact', href: '/contact' },
    ];

    const log: string[] = [];

    return html`
      <div style="border: 2px solid #e5e5e5; padding: 1rem;">
        <p style="margin: 0 0 1rem 0; font-weight: 700;">
          Click menu items to see event details logged below
        </p>
        <gc-site-menu
          .items="${items}"
          @gc-menu-item-click="${(e: CustomEvent) => {
            const msg = `Clicked: "${e.detail.item.text}" → ${e.detail.item.href}`;
            log.unshift(msg);
            if (log.length > 10) log.pop();
            e.target.requestUpdate();
            console.log('Navigation event:', e.detail);
          }}"
          @gc-mobile-menu-toggle="${(e: CustomEvent) => {
            const msg = `Mobile menu: ${e.detail.open ? 'OPENED' : 'CLOSED'}`;
            log.unshift(msg);
            if (log.length > 10) log.pop();
            e.target.requestUpdate();
          }}"
        ></gc-site-menu>
        <div style="margin-top: 1rem; padding: 1rem; background-color: #f5f5f5; border: 1px solid #d1d1d1; font-family: monospace; font-size: 0.875rem; min-height: 150px;">
          <div style="font-weight: 700; margin-bottom: 0.5rem;">Event Log:</div>
          ${log.length === 0
            ? html`<em style="color: #666;">No events yet...</em>`
            : log.map((msg) => html`<div style="padding: 0.25rem 0;">${msg}</div>`)}
        </div>
      </div>
    `;
  },
};

/**
 * Keyboard navigation demonstration with visual indicators.
 */
export const KeyboardNavigationDemo: Story = {
  args: {},
  render: (args) => {
    const items: MenuItem[] = [
      { text: 'Home', href: '/' },
      {
        text: 'About',
        href: '/about',
        children: [
          { text: 'History', href: '/about/history' },
          { text: 'Team', href: '/about/team' },
        ],
      },
      { text: 'Services', href: '/services' },
      { text: 'Contact', href: '/contact' },
    ];

    return html`
      <div style="border: 2px solid #e5e5e5; padding: 1rem;">
        <div style="margin-bottom: 1rem; padding: 1rem; background-color: #fff3cd; border-left: 4px solid #ffc107;">
          <h3 style="margin: 0 0 0.5rem 0;">⌨️ Keyboard Navigation Guide</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="text-align: left; border-bottom: 2px solid #333;">
                <th style="padding: 0.5rem;">Key</th>
                <th style="padding: 0.5rem;">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 0.5rem;"><kbd style="padding: 0.25rem 0.5rem; background: #f0f0f0; border: 1px solid #999; border-radius: 3px;">Tab</kbd></td>
                <td style="padding: 0.5rem;">Move to next menu item</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem;"><kbd style="padding: 0.25rem 0.5rem; background: #f0f0f0; border: 1px solid #999; border-radius: 3px;">Shift+Tab</kbd></td>
                <td style="padding: 0.5rem;">Move to previous menu item</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem;"><kbd style="padding: 0.25rem 0.5rem; background: #f0f0f0; border: 1px solid #999; border-radius: 3px;">Enter</kbd> / <kbd style="padding: 0.25rem 0.5rem; background: #f0f0f0; border: 1px solid #999; border-radius: 3px;">Space</kbd></td>
                <td style="padding: 0.5rem;">Activate link or toggle submenu</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem;"><kbd style="padding: 0.25rem 0.5rem; background: #f0f0f0; border: 1px solid #999; border-radius: 3px;">↓</kbd> / <kbd style="padding: 0.25rem 0.5rem; background: #f0f0f0; border: 1px solid #999; border-radius: 3px;">→</kbd></td>
                <td style="padding: 0.5rem;">Next menu item (arrow navigation)</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem;"><kbd style="padding: 0.25rem 0.5rem; background: #f0f0f0; border: 1px solid #999; border-radius: 3px;">↑</kbd> / <kbd style="padding: 0.25rem 0.5rem; background: #f0f0f0; border: 1px solid #999; border-radius: 3px;">←</kbd></td>
                <td style="padding: 0.5rem;">Previous menu item (arrow navigation)</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem;"><kbd style="padding: 0.25rem 0.5rem; background: #f0f0f0; border: 1px solid #999; border-radius: 3px;">Esc</kbd></td>
                <td style="padding: 0.5rem;">Close current submenu</td>
              </tr>
            </tbody>
          </table>
        </div>
        <gc-site-menu .items="${items}"></gc-site-menu>
        <div style="margin-top: 1rem; padding: 1rem; background-color: #e7f3ff; border-left: 4px solid #2874a6;">
          <p style="margin: 0; font-weight: 700;">💡 Try It Out</p>
          <p style="margin: 0.5rem 0 0 0;">
            Click in the menu area, then use your keyboard to navigate. Notice the
            blue focus indicators showing your current position.
          </p>
        </div>
      </div>
    `;
  },
};
