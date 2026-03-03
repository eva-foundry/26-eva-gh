import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/gc-patterns/gc-side-nav.js';
import type { SideNavItem } from '../src/components/gc-patterns/gc-side-nav.js';

/**
 * # GC Side Navigation Component
 *
 * Secondary/sidebar navigation for multi-level content hierarchies following
 * Government of Canada design patterns.
 *
 * ## Key Features
 * - **Collapsible Sections**: Expand/collapse navigation groups with toggle buttons
 * - **Multi-Level Nesting**: Supports deep hierarchies with visual indentation
 * - **Current Page Highlighting**: Blue background marks active page
 * - **Auto-Expansion**: Sections containing current page expand automatically
 * - **Icons & Badges**: Optional icons and notification badges
 * - **Keyboard Accessible**: Full Enter/Space navigation support
 * - **Single/Multi Expand**: Control whether multiple sections can be open
 * - **Disabled States**: Gray out unavailable navigation items
 * - **Bilingual**: Full EN-CA/FR-CA translation support
 * - **WCAG 2.2 AAA Compliant**: ARIA roles, labels, focus management
 *
 * ## Usage Guidelines
 * - Use for secondary navigation in subsections of Canada.ca
 * - Place in left sidebar (250px wide recommended)
 * - Keep hierarchy to 3 levels maximum for clarity
 * - Use expand-all for short navigation trees (<10 items)
 * - Use collapse-all for long trees to reduce cognitive load
 * - Add badges for unread notifications or counts
 * - Mark current page with current: true for context
 */

const meta: Meta = {
  title: 'Government of Canada/Patterns/gc-side-nav',
  component: 'gc-side-nav',
  tags: ['autodocs'],
  argTypes: {
    collapseAll: { control: 'boolean', description: 'Collapse all sections by default' },
    expandAll: { control: 'boolean', description: 'Expand all sections by default' },
    showIcons: { control: 'boolean', description: 'Show icons if provided in items' },
    showBadges: { control: 'boolean', description: 'Show badges if provided in items' },
    multiExpand: { control: 'boolean', description: 'Allow multiple sections expanded' },
    locale: { control: 'select', options: ['en-CA', 'fr-CA'], description: 'Language locale' },
  },
};

export default meta;
type Story = StoryObj;

const simpleItems: SideNavItem[] = [
  { text: 'Dashboard', href: '/dashboard', current: true },
  { text: 'Profile', href: '/profile' },
  { text: 'Settings', href: '/settings' },
  { text: 'Help', href: '/help' },
  { text: 'Sign Out', href: '/signout' },
];

const nestedItems: SideNavItem[] = [
  { text: 'Home', href: '/', icon: '🏠' },
  {
    text: 'About Government',
    icon: '🏛️',
    children: [
      { text: 'Mandate', href: '/about/mandate' },
      { text: 'Leadership', href: '/about/leadership', current: true },
      { text: 'History', href: '/about/history' },
      { text: 'Contact', href: '/about/contact' },
    ],
  },
  {
    text: 'Services',
    icon: '📋',
    children: [
      { text: 'Benefits', href: '/services/benefits' },
      { text: 'Jobs', href: '/services/jobs' },
      { text: 'Immigration', href: '/services/immigration' },
      { text: 'Taxes', href: '/services/taxes' },
    ],
  },
  {
    text: 'Resources',
    icon: '📚',
    children: [
      { text: 'Publications', href: '/resources/publications' },
      { text: 'Forms', href: '/resources/forms' },
      { text: 'Data', href: '/resources/data' },
    ],
  },
];

const deepNestedItems: SideNavItem[] = [
  {
    text: 'Government',
    expanded: true,
    children: [
      {
        text: 'How Government Works',
        children: [
          { text: 'Federal Departments', href: '/gov/how/federal' },
          { text: 'Provincial Governments', href: '/gov/how/provincial' },
          { text: 'Municipal Governments', href: '/gov/how/municipal' },
        ],
      },
      {
        text: 'Open Government',
        children: [
          { text: 'Open Data', href: '/gov/open/data' },
          { text: 'Open Information', href: '/gov/open/info' },
          { text: 'Proactive Disclosure', href: '/gov/open/disclosure' },
        ],
      },
    ],
  },
  {
    text: 'Services',
    children: [
      {
        text: 'Benefits',
        children: [
          { text: 'Employment Insurance', href: '/services/benefits/ei', current: true },
          { text: 'Old Age Security', href: '/services/benefits/oas' },
          { text: 'Canada Pension Plan', href: '/services/benefits/cpp' },
        ],
      },
    ],
  },
];

const itemsWithBadges: SideNavItem[] = [
  { text: 'Dashboard', href: '/dashboard' },
  { text: 'Messages', href: '/messages', icon: '✉️', badge: '5' },
  { text: 'Notifications', href: '/notifications', icon: '🔔', badge: '12' },
  {
    text: 'Applications',
    icon: '📄',
    badge: '2',
    children: [
      { text: 'In Progress', href: '/apps/progress', badge: '2' },
      { text: 'Submitted', href: '/apps/submitted' },
      { text: 'Archived', href: '/apps/archived' },
    ],
  },
  { text: 'Settings', href: '/settings', icon: '⚙️' },
];

/**
 * Simple vertical navigation with Dashboard selected. Basic sidebar pattern
 * for secondary navigation without nesting.
 */
export const Default: Story = {
  args: {},
  render: () => html`
    <div style="padding: 2rem;">
      <div style="background: #e8f5e9; padding: 1.5rem; border: 1px solid #a5d6a7; margin-bottom: 1.5rem; border-radius: 4px;">
        <p style="margin: 0; color: #1b5e20;">
          <strong>Simple Side Navigation:</strong> Basic vertical navigation with 5 items.
          Dashboard is marked as current page (blue background). Click any item to see
          gc-side-nav-click event in console.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem; border: 1px solid #ddd;">
        <gc-side-nav
          .items="${simpleItems}"
          @gc-side-nav-click="${(e: CustomEvent) => console.log('Navigate to:', e.detail)}"
        ></gc-side-nav>
        
        <div style="padding: 2rem; background: #f9f9f9;">
          <h2 style="margin: 0 0 1rem 0; color: #284162;">Main Content Area</h2>
          <p style="color: #666; line-height: 1.6;">
            This is where the page content would appear. The side navigation stays fixed
            in the left sidebar (250px wide) while content scrolls on the right.
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * Navigation with nested sections. "About Government > Leadership" is current,
 * so that section auto-expands. Shows icons, collapsible groups, and current page highlighting.
 */
export const WithNestedSections: Story = {
  args: {},
  render: () => html`
    <div style="padding: 2rem;">
      <div style="background: #e1f5fe; padding: 1.5rem; border: 1px solid #81d4fa; margin-bottom: 1.5rem; border-radius: 4px;">
        <p style="margin: 0; color: #01579b;">
          <strong>Nested Navigation:</strong> Leadership page is current, so "About Government"
          section auto-expands. Click section titles or toggle arrows (▶) to expand/collapse.
          Icons (🏠 🏛️ 📋 📚) shown next to each item.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem; border: 1px solid #ddd;">
        <gc-side-nav
          .items="${nestedItems}"
          @gc-side-nav-click="${(e: CustomEvent) => console.log('Navigate to:', e.detail)}"
          @gc-side-nav-toggle="${(e: CustomEvent) => console.log('Toggle section:', e.detail)}"
        ></gc-side-nav>
        
        <div style="padding: 2rem; background: #f9f9f9;">
          <h2 style="margin: 0 0 1rem 0; color: #284162;">Leadership</h2>
          <p style="color: #666; line-height: 1.6;">
            Content for the Leadership page. Notice how the "About Government" section
            remains expanded because it contains the current page.
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * Deep 3-level hierarchy with nested submenus. Employment Insurance is current,
 * so all parent sections expand automatically. Demonstrates maximum nesting depth.
 */
export const DeepNesting: Story = {
  args: {},
  render: () => html`
    <div style="padding: 2rem;">
      <div style="background: #fff3e0; padding: 1.5rem; border: 1px solid #ffcc80; margin-bottom: 1.5rem; border-radius: 4px;">
        <p style="margin: 0; color: #e65100;">
          <strong>Deep Nesting (3 Levels):</strong> Government > Services > Benefits > Employment Insurance
          is current. All parent sections auto-expand to show the current page path. Notice
          indentation increases with each level (2rem, 3rem, 4rem padding).
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem; border: 1px solid #ddd;">
        <gc-side-nav
          .items="${deepNestedItems}"
          @gc-side-nav-click="${(e: CustomEvent) => console.log('Navigate to:', e.detail)}"
        ></gc-side-nav>
        
        <div style="padding: 2rem; background: #f9f9f9;">
          <h2 style="margin: 0 0 1rem 0; color: #284162;">Employment Insurance</h2>
          <p style="color: #666; line-height: 1.6;">
            Deep page in the hierarchy. The full navigation path remains visible and expanded,
            helping users understand their location in the site structure.
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * All sections collapsed by default. User must click toggle buttons or section titles
 * to expand groups. Useful for long navigation trees to reduce initial visual clutter.
 */
export const CollapsedByDefault: Story = {
  args: {
    collapseAll: true,
  },
  render: (args) => html`
    <div style="padding: 2rem;">
      <div style="background: #f3e5f5; padding: 1.5rem; border: 1px solid #ce93d8; margin-bottom: 1.5rem; border-radius: 4px;">
        <p style="margin: 0; color: #4a148c;">
          <strong>Collapsed by Default:</strong> All sections start closed, even if they contain
          the current page. Users click section titles or toggle arrows to expand. Good for
          very long navigation lists (20+ items) to reduce cognitive load.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem; border: 1px solid #ddd;">
        <gc-side-nav
          .items="${nestedItems}"
          ?collapse-all="${args.collapseAll}"
          @gc-side-nav-click="${(e: CustomEvent) => console.log('Navigate to:', e.detail)}"
        ></gc-side-nav>
        
        <div style="padding: 2rem; background: #f9f9f9;">
          <h2 style="margin: 0 0 1rem 0; color: #284162;">Collapsed Navigation Demo</h2>
          <p style="color: #666; line-height: 1.6;">
            Click "About Government", "Services", or "Resources" in the sidebar to see child pages.
            This keeps the sidebar compact and focused.
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * All sections expanded by default. Shows entire navigation tree at once.
 * Best for short trees (<15 total items) where users benefit from seeing all options.
 */
export const ExpandedByDefault: Story = {
  args: {
    expandAll: true,
  },
  render: (args) => html`
    <div style="padding: 2rem;">
      <div style="background: #fce4ec; padding: 1.5rem; border: 1px solid #f48fb1; margin-bottom: 1.5rem; border-radius: 4px;">
        <p style="margin: 0; color: #880e4f;">
          <strong>Expanded by Default:</strong> All sections start open, showing the entire
          navigation tree. Good for short navigation lists (10-15 items total) where users
          benefit from seeing all available pages at once. No clicking required to explore.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem; border: 1px solid #ddd;">
        <gc-side-nav
          .items="${nestedItems}"
          ?expand-all="${args.expandAll}"
          @gc-side-nav-click="${(e: CustomEvent) => console.log('Navigate to:', e.detail)}"
        ></gc-side-nav>
        
        <div style="padding: 2rem; background: #f9f9f9;">
          <h2 style="margin: 0 0 1rem 0; color: #284162;">Fully Expanded Navigation</h2>
          <p style="color: #666; line-height: 1.6;">
            All sections visible immediately. Users can scan the entire site structure without
            any interaction. Toggle buttons still work to collapse sections if needed.
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * Single-expand mode: only one section can be open at a time. Opening a new section
 * automatically closes others. Useful for long navigation lists to keep sidebar compact.
 */
export const SingleExpand: Story = {
  args: {
    multiExpand: false,
    collapseAll: true,
  },
  render: (args) => html`
    <div style="padding: 2rem;">
      <div style="background: #fffde7; padding: 1.5rem; border: 1px solid #fff59d; margin-bottom: 1.5rem; border-radius: 4px;">
        <p style="margin: 0; color: #f57f17;">
          <strong>Single Expand Mode (Accordion):</strong> multiExpand=false means only one
          section can be open at a time. Try opening "About Government", then "Services" -
          the first section will automatically close. Keeps sidebar height manageable.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem; border: 1px solid #ddd;">
        <gc-side-nav
          .items="${nestedItems}"
          ?multi-expand="${args.multiExpand}"
          ?collapse-all="${args.collapseAll}"
          @gc-side-nav-click="${(e: CustomEvent) => console.log('Navigate to:', e.detail)}"
          @gc-side-nav-toggle="${(e: CustomEvent) => console.log('Toggled:', e.detail)}"
        ></gc-side-nav>
        
        <div style="padding: 2rem; background: #f9f9f9;">
          <h2 style="margin: 0 0 1rem 0; color: #284162;">Accordion Behavior</h2>
          <p style="color: #666; line-height: 1.6;">
            Classic accordion pattern. Opening a new section closes the previous one,
            reducing vertical scrolling. Common in admin panels and documentation sites.
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * Navigation with icons and notification badges. Shows unread message counts (5),
 * notification counts (12), and in-progress application counts (2).
 */
export const WithIconsAndBadges: Story = {
  args: {},
  render: () => html`
    <div style="padding: 2rem;">
      <div style="background: #e8eaf6; padding: 1.5rem; border: 1px solid #9fa8da; margin-bottom: 1.5rem; border-radius: 4px;">
        <p style="margin: 0; color: #283593;">
          <strong>Icons & Badges:</strong> Messages shows 5 unread (red badge), Notifications
          shows 12 new (red badge), Applications section has 2 total with 2 in progress.
          Badges use red background (#d32f2f) for visibility. Icons add visual context.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem; border: 1px solid #ddd;">
        <gc-side-nav
          .items="${itemsWithBadges}"
          @gc-side-nav-click="${(e: CustomEvent) => console.log('Navigate to:', e.detail)}"
        ></gc-side-nav>
        
        <div style="padding: 2rem; background: #f9f9f9;">
          <h2 style="margin: 0 0 1rem 0; color: #284162;">User Dashboard</h2>
          <p style="color: #666; line-height: 1.6;">
            Dashboard with notification badges. Common pattern for user account areas
            where users need to see counts of unread items, pending actions, or alerts.
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * Navigation with disabled items. "Coming Soon" and "Premium Feature" are grayed out
 * and cannot be clicked. Useful for features under development or requiring upgrades.
 */
export const WithDisabledItems: Story = {
  args: {},
  render: () => {
    const itemsWithDisabled: SideNavItem[] = [
      { text: 'Dashboard', href: '/dashboard', current: true },
      { text: 'My Profile', href: '/profile' },
      { text: 'Settings', href: '/settings' },
      { text: 'Premium Feature', href: '/premium', disabled: true, icon: '⭐' },
      {
        text: 'Help',
        children: [
          { text: 'Documentation', href: '/help/docs' },
          { text: 'FAQ', href: '/help/faq' },
          { text: 'Support Chat', href: '/help/chat', disabled: true },
        ],
      },
    ];

    return html`
      <div style="padding: 2rem;">
        <div style="background: #ffebee; padding: 1.5rem; border: 1px solid #ef9a9a; margin-bottom: 1.5rem; border-radius: 4px;">
          <p style="margin: 0; color: #c62828;">
            <strong>Disabled Items:</strong> "Premium Feature" and "Support Chat" are disabled
            (grayed out, opacity 0.5). Clicks are prevented and pointer-events: none applied.
            Use for features under development, requiring permissions, or needing upgrades.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem; border: 1px solid #ddd;">
          <gc-side-nav
            .items="${itemsWithDisabled}"
            @gc-side-nav-click="${(e: CustomEvent) => console.log('Navigate to:', e.detail)}"
          ></gc-side-nav>
          
          <div style="padding: 2rem; background: #f9f9f9;">
            <h2 style="margin: 0 0 1rem 0; color: #284162;">Dashboard</h2>
            <p style="color: #666; line-height: 1.6;">
              Try clicking "Premium Feature" or "Support Chat" - they will not respond.
              Disabled state clearly indicates unavailable options without hiding them.
            </p>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * French language (fr-CA). Shows "Navigation latérale", "Développer", "Réduire"
 * for expand/collapse buttons. All ARIA labels also in French.
 */
export const French: Story = {
  args: {
    locale: 'fr-CA',
  },
  render: (args) => {
    const frenchItems: SideNavItem[] = [
      { text: 'Accueil', href: '/', icon: '🏠' },
      {
        text: 'À propos',
        icon: '🏛️',
        children: [
          { text: 'Mandat', href: '/about/mandate' },
          { text: 'Leadership', href: '/about/leadership', current: true },
          { text: 'Histoire', href: '/about/history' },
          { text: 'Contact', href: '/about/contact' },
        ],
      },
      {
        text: 'Services',
        icon: '📋',
        children: [
          { text: 'Prestations', href: '/services/benefits' },
          { text: 'Emplois', href: '/services/jobs' },
          { text: 'Immigration', href: '/services/immigration' },
        ],
      },
    ];

    return html`
      <div style="padding: 2rem;">
        <div style="background: #e0f2f1; padding: 1.5rem; border: 1px solid #80cbc4; margin-bottom: 1.5rem; border-radius: 4px;">
          <p style="margin: 0; color: #00695c;">
            <strong>Français (fr-CA):</strong> Navigation latérale en français. Les étiquettes
            des boutons d'expansion et toutes les annonces ARIA sont en français. Testez les
            boutons d'expansion pour voir "Développer" et "Réduire".
          </p>
        </div>

        <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem; border: 1px solid #ddd;">
          <gc-side-nav
            .items="${frenchItems}"
            locale="${args.locale}"
            @gc-side-nav-click="${(e: CustomEvent) => console.log('Naviguer vers:', e.detail)}"
          ></gc-side-nav>
          
          <div style="padding: 2rem; background: #f9f9f9;">
            <h2 style="margin: 0 0 1rem 0; color: #284162;">Leadership</h2>
            <p style="color: #666; line-height: 1.6;">
              Contenu de la page Leadership. La section "À propos" reste ouverte car elle
              contient la page actuelle.
            </p>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * Live event tracking with log below navigation. Shows gc-side-nav-click and
 * gc-side-nav-toggle events with full detail objects.
 */
export const EventTracking: Story = {
  args: {},
  render: () => {
    const events: { type: string; data: unknown; time: string }[] = [];
    const updateLog = () => {
      const logEl = document.getElementById('sidenav-event-log');
      if (logEl) {
        logEl.innerHTML = events.length === 0
          ? '<em style="color: #666;">No events yet. Click navigation items or toggle buttons.</em>'
          : events
              .slice(-10)
              .reverse()
              .map(
                (e) =>
                  `<div style="padding: 0.5rem; border-bottom: 1px solid #eee;">
                    <strong>${e.type}:</strong>
                    <pre style="margin: 0.25rem 0 0 0; font-size: 0.875rem; color: #666;">${JSON.stringify(e.data, null, 2)}</pre>
                    <span style="color: #999; font-size: 0.75rem;">${e.time}</span>
                  </div>`
              )
              .join('');
      }
    };

    return html`
      <div style="padding: 2rem; max-width: 1200px;">
        <div style="background: #f1f8e9; padding: 1.5rem; border: 1px solid #c5e1a5; margin-bottom: 1.5rem; border-radius: 4px;">
          <p style="margin: 0; color: #33691e;">
            <strong>Event Tracking:</strong> Click navigation items to see gc-side-nav-click events.
            Click toggle arrows to see gc-side-nav-toggle events. Last 10 events shown below with
            full detail objects including item data and paths.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem;">
          <gc-side-nav
            .items="${nestedItems}"
            @gc-side-nav-click="${(e: CustomEvent) => {
              events.push({
                type: 'gc-side-nav-click',
                data: e.detail,
                time: new Date().toLocaleTimeString(),
              });
              updateLog();
              console.log('Click:', e.detail);
            }}"
            @gc-side-nav-toggle="${(e: CustomEvent) => {
              events.push({
                type: 'gc-side-nav-toggle',
                data: e.detail,
                time: new Date().toLocaleTimeString(),
              });
              updateLog();
              console.log('Toggle:', e.detail);
            }}"
          ></gc-side-nav>

          <div>
            <div style="border: 2px solid #333; border-radius: 4px; background: #fff;">
              <div style="background: #333; color: #fff; padding: 0.75rem; font-weight: 600;">
                Event Log (Last 10 Events)
              </div>
              <div id="sidenav-event-log" style="min-height: 400px; max-height: 600px; overflow-y: auto; padding: 1rem;">
                <em style="color: #666;">No events yet. Click navigation items or toggle buttons.</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * Keyboard navigation demonstration with instructions. Shows Tab, Enter, Space
 * shortcuts for full keyboard accessibility without mouse.
 */
export const KeyboardNavigationDemo: Story = {
  args: {},
  render: () => html`
    <div style="padding: 2rem; max-width: 1200px;">
      <div style="background: #e3f2fd; padding: 1.5rem; border: 1px solid #90caf9; margin-bottom: 1.5rem; border-radius: 4px;">
        <h3 style="margin: 0 0 1rem 0; color: #0d47a1;">Keyboard Navigation Instructions</h3>
        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 4px; overflow: hidden;">
          <thead>
            <tr style="background: #0d47a1; color: white;">
              <th style="padding: 0.75rem; text-align: left; border-right: 1px solid #42a5f5;">Key</th>
              <th style="padding: 0.75rem; text-align: left;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 0.75rem; border-right: 1px solid #ddd;">
                <kbd style="background: #f5f5f5; padding: 0.25rem 0.5rem; border-radius: 3px; font-family: monospace; border: 1px solid #ccc;">Tab</kbd>
              </td>
              <td style="padding: 0.75rem;">Move focus to next navigation item or toggle button</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 0.75rem; border-right: 1px solid #ddd;">
                <kbd style="background: #f5f5f5; padding: 0.25rem 0.5rem; border-radius: 3px; font-family: monospace; border: 1px solid #ccc;">Shift</kbd> +
                <kbd style="background: #f5f5f5; padding: 0.25rem 0.5rem; border-radius: 3px; font-family: monospace; border: 1px solid #ccc;">Tab</kbd>
              </td>
              <td style="padding: 0.75rem;">Move focus to previous navigation item or toggle button</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 0.75rem; border-right: 1px solid #ddd;">
                <kbd style="background: #f5f5f5; padding: 0.25rem 0.5rem; border-radius: 3px; font-family: monospace; border: 1px solid #ccc;">Enter</kbd>
              </td>
              <td style="padding: 0.75rem;">Activate focused navigation link or toggle section</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem; border-right: 1px solid #ddd;">
                <kbd style="background: #f5f5f5; padding: 0.25rem 0.5rem; border-radius: 3px; font-family: monospace; border: 1px solid #ccc;">Space</kbd>
              </td>
              <td style="padding: 0.75rem;">Activate focused navigation link or toggle section</td>
            </tr>
          </tbody>
        </table>
        <p style="margin: 1rem 0 0 0; color: #555; font-size: 0.9rem;">
          <strong>Try it:</strong> Click in the navigation below, then use Tab to move between
          items and Enter/Space to select. Notice the 3px blue focus outline (#0c2447).
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem; border: 1px solid #ddd;">
        <gc-side-nav
          .items="${nestedItems}"
          @gc-side-nav-click="${(e: CustomEvent) => {
            console.log('Keyboard navigation to:', e.detail);
          }}"
        ></gc-side-nav>
        
        <div style="padding: 2rem; background: #f9f9f9;">
          <h2 style="margin: 0 0 1rem 0; color: #284162;">Accessibility Features</h2>
          <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem; line-height: 1.8; color: #555;">
            <li><strong>role="link"</strong> on navigation items without children</li>
            <li><strong>role="button"</strong> on navigation items with children</li>
            <li><strong>role="group"</strong> on nested sublists for semantic structure</li>
            <li><strong>aria-current="page"</strong> marks current page for screen readers</li>
            <li><strong>aria-expanded</strong> on toggle buttons (true/false)</li>
            <li><strong>aria-label</strong> on nav container and toggle buttons</li>
            <li><strong>3px focus outline</strong> (#0c2447) with -3px offset for visibility</li>
            <li><strong>Enter/Space</strong> activation for all interactive elements</li>
          </ul>
        </div>
      </div>
    </div>
  `,
};
