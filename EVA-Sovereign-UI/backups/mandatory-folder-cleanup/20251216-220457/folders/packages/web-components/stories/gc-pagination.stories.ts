import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/gc-patterns/gc-pagination.js';

/**
 * # GC Pagination Component
 *
 * Page navigation controls for multi-page content following Government of Canada design patterns.
 *
 * ## Key Features
 * - **Numbered Pages**: Displays page buttons with smart ellipsis for long lists
 * - **Previous/Next Navigation**: Sequential page navigation with disabled states
 * - **Current Page Indicator**: Visual highlighting with blue background
 * - **Ellipsis Algorithm**: Maintains first + last pages, shows range around current
 * - **Keyboard Accessible**: Full keyboard navigation (Enter/Space on all links)
 * - **Screen Reader Support**: Live region announces page changes
 * - **Compact Mode**: Hides text labels for tight spaces
 * - **Mobile Responsive**: Auto-compact on small screens (<600px)
 * - **Bilingual**: Full EN-CA/FR-CA translation support
 * - **WCAG 2.2 AAA Compliant**: ARIA roles, labels, current page markers
 *
 * ## Usage Guidelines
 * - Use for search results, document listings, data tables with multiple pages
 * - Show pagination when content exceeds 10-20 items per page
 * - Place pagination at bottom of content, optionally at top for long lists
 * - Set maxVisible to 5-9 depending on screen space (7 is recommended default)
 * - Use compact mode for mobile or tight horizontal spaces
 * - Always provide totalPages - component handles ellipsis automatically
 */

const meta: Meta = {
  title: 'Government of Canada/Patterns/gc-pagination',
  component: 'gc-pagination',
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: 'number', description: 'Current active page (1-indexed)' },
    totalPages: { control: 'number', description: 'Total number of pages' },
    maxVisible: { control: 'number', description: 'Maximum page buttons before ellipsis' },
    showFirstLast: { control: 'boolean', description: 'Show first and last page buttons' },
    showPrevNext: { control: 'boolean', description: 'Show previous/next navigation' },
    compact: { control: 'boolean', description: 'Hide text labels (icon-only mode)' },
    locale: { control: 'select', options: ['en-CA', 'fr-CA'], description: 'Language locale' },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default pagination with page 5 selected out of 20 pages. Shows ellipsis algorithm
 * maintaining first + last pages with range around current page.
 */
export const Default: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    maxVisible: 7,
  },
  render: (args) => html`
    <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
      <div style="background: #f5f5f5; padding: 1.5rem; border: 1px solid #ddd; margin-bottom: 1.5rem; border-radius: 4px;">
        <p style="margin: 0; color: #333;">
          <strong>Default Pagination:</strong> Page 5 of 20. Notice how the component automatically
          shows first page (1), last page (20), and pages around the current page with ellipsis
          between them. Click any page number or use Previous/Next buttons to navigate.
        </p>
      </div>

      <gc-pagination
        current-page="${args.currentPage}"
        total-pages="${args.totalPages}"
        max-visible="${args.maxVisible}"
        ?show-first-last="${args.showFirstLast}"
        ?show-prev-next="${args.showPrevNext}"
        ?compact="${args.compact}"
        locale="${args.locale || 'en-CA'}"
        @gc-page-change="${(e: CustomEvent) => console.log('Page changed to:', e.detail.page)}"
      ></gc-pagination>
    </div>
  `,
};

/**
 * Short page list (5 pages total). When totalPages ≤ maxVisible, all pages are shown
 * without ellipsis. No ellipsis needed.
 */
export const ShortList: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
  },
  render: (args) => html`
    <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
      <div style="background: #f0f8ff; padding: 1.5rem; border: 1px solid #b3d9ff; margin-bottom: 1.5rem; border-radius: 4px;">
        <p style="margin: 0; color: #003366;">
          <strong>Short List:</strong> Only 5 pages total. When there are fewer pages than maxVisible (7),
          the component displays all page numbers without ellipsis. Simple and clear pagination.
        </p>
      </div>

      <gc-pagination
        current-page="${args.currentPage}"
        total-pages="${args.totalPages}"
        @gc-page-change="${(e: CustomEvent) => console.log('Page changed to:', e.detail.page)}"
      ></gc-pagination>
    </div>
  `,
};

/**
 * Very long page list (100 pages). Demonstrates ellipsis algorithm with current page in middle.
 * First (1) and last (100) always visible, pages around current with ellipsis on both sides.
 */
export const LongList: Story = {
  args: {
    currentPage: 50,
    totalPages: 100,
    maxVisible: 7,
  },
  render: (args) => html`
    <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
      <div style="background: #fff4e6; padding: 1.5rem; border: 1px solid #ffd699; margin-bottom: 1.5rem; border-radius: 4px;">
        <p style="margin: 0; color: #663300;">
          <strong>Long List (100 Pages):</strong> Smart ellipsis keeps pagination compact. Shows first page (1),
          last page (100), and pages around current (50). Ellipsis appears on both sides. Try clicking page
          numbers near the beginning or end to see how the algorithm adjusts the visible range.
        </p>
      </div>

      <gc-pagination
        current-page="${args.currentPage}"
        total-pages="${args.totalPages}"
        max-visible="${args.maxVisible}"
        @gc-page-change="${(e: CustomEvent) => {
          console.log('Page changed to:', e.detail.page);
        }}"
      ></gc-pagination>
    </div>
  `,
};

/**
 * First page selected. Previous button is disabled. Shows how disabled state is rendered
 * with opacity 0.5 and aria-disabled attribute.
 */
export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 20,
  },
  render: (args) => html`
    <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
      <div style="background: #e8f5e9; padding: 1.5rem; border: 1px solid #a5d6a7; margin-bottom: 1.5rem; border-radius: 4px;">
        <p style="margin: 0; color: #1b5e20;">
          <strong>First Page:</strong> Page 1 selected. The Previous button is disabled (grayed out,
          aria-disabled="true"). Cannot navigate before first page. Next button is active.
        </p>
      </div>

      <gc-pagination
        current-page="${args.currentPage}"
        total-pages="${args.totalPages}"
        @gc-page-change="${(e: CustomEvent) => console.log('Page changed to:', e.detail.page)}"
      ></gc-pagination>
    </div>
  `,
};

/**
 * Last page selected. Next button is disabled. Shows boundary condition handling.
 */
export const LastPage: Story = {
  args: {
    currentPage: 20,
    totalPages: 20,
  },
  render: (args) => html`
    <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
      <div style="background: #fff3e0; padding: 1.5rem; border: 1px solid #ffcc80; margin-bottom: 1.5rem; border-radius: 4px;">
        <p style="margin: 0; color: #e65100;">
          <strong>Last Page:</strong> Page 20 of 20. The Next button is disabled (grayed out,
          aria-disabled="true"). Cannot navigate beyond last page. Previous button is active.
        </p>
      </div>

      <gc-pagination
        current-page="${args.currentPage}"
        total-pages="${args.totalPages}"
        @gc-page-change="${(e: CustomEvent) => console.log('Page changed to:', e.detail.page)}"
      ></gc-pagination>
    </div>
  `,
};

/**
 * Compact mode hides "Previous" and "Next" text labels, showing only icons. Useful for
 * mobile layouts or tight horizontal spaces. Auto-activates on screens <600px.
 */
export const CompactMode: Story = {
  args: {
    currentPage: 10,
    totalPages: 30,
    compact: true,
  },
  render: (args) => html`
    <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
      <div style="background: #f3e5f5; padding: 1.5rem; border: 1px solid #ce93d8; margin-bottom: 1.5rem; border-radius: 4px;">
        <p style="margin: 0; color: #4a148c;">
          <strong>Compact Mode:</strong> Text labels hidden on Previous/Next buttons, showing only
          ‹ and › icons. Saves horizontal space. Note: buttons are smaller (40px instead of 44px).
          This mode auto-activates on screens smaller than 600px.
        </p>
      </div>

      <gc-pagination
        current-page="${args.currentPage}"
        total-pages="${args.totalPages}"
        ?compact="${args.compact}"
        @gc-page-change="${(e: CustomEvent) => console.log('Page changed to:', e.detail.page)}"
      ></gc-pagination>
    </div>
  `,
};

/**
 * French language (fr-CA). Shows "Précédent" and "Suivant" for Previous/Next.
 * Screen reader announcements also in French.
 */
export const French: Story = {
  args: {
    currentPage: 8,
    totalPages: 25,
    locale: 'fr-CA',
  },
  render: (args) => html`
    <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
      <div style="background: #e1f5fe; padding: 1.5rem; border: 1px solid #81d4fa; margin-bottom: 1.5rem; border-radius: 4px;">
        <p style="margin: 0; color: #01579b;">
          <strong>Français (fr-CA):</strong> Pagination en français. Les boutons affichent
          "Précédent" et "Suivant". Les annonces pour les lecteurs d'écran sont également en français.
          Page 8 de 25 sélectionnée.
        </p>
      </div>

      <gc-pagination
        current-page="${args.currentPage}"
        total-pages="${args.totalPages}"
        locale="${args.locale}"
        @gc-page-change="${(e: CustomEvent) => console.log('Page changée à:', e.detail.page)}"
      ></gc-pagination>
    </div>
  `,
};

/**
 * Custom maxVisible setting (5 instead of default 7). Shows fewer page buttons,
 * creating more compact pagination. Useful when horizontal space is limited.
 */
export const CustomMaxVisible: Story = {
  args: {
    currentPage: 25,
    totalPages: 50,
    maxVisible: 5,
  },
  render: (args) => html`
    <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
      <div style="background: #fce4ec; padding: 1.5rem; border: 1px solid #f48fb1; margin-bottom: 1.5rem; border-radius: 4px;">
        <p style="margin: 0; color: #880e4f;">
          <strong>Custom maxVisible (5):</strong> Only 5 page buttons visible at once (instead of default 7).
          Creates tighter pagination. Ellipsis algorithm still maintains first + last pages. Reduces
          horizontal width requirement.
        </p>
      </div>

      <gc-pagination
        current-page="${args.currentPage}"
        total-pages="${args.totalPages}"
        max-visible="${args.maxVisible}"
        @gc-page-change="${(e: CustomEvent) => console.log('Page changed to:', e.detail.page)}"
      ></gc-pagination>
    </div>
  `,
};

/**
 * Hide Previous/Next buttons by setting showPrevNext to false. Only numbered page buttons
 * remain. Useful when sequential navigation is not needed.
 */
export const NoPrevNext: Story = {
  args: {
    currentPage: 5,
    totalPages: 15,
    showPrevNext: false,
  },
  render: (args) => html`
    <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
      <div style="background: #f1f8e9; padding: 1.5rem; border: 1px solid #c5e1a5; margin-bottom: 1.5rem; border-radius: 4px;">
        <p style="margin: 0; color: #33691e;">
          <strong>No Previous/Next Buttons:</strong> Only numbered page buttons shown. Previous/Next
          navigation hidden via showPrevNext="false". Cleaner look when sequential navigation is not needed.
        </p>
      </div>

      <gc-pagination
        current-page="${args.currentPage}"
        total-pages="${args.totalPages}"
        ?show-prev-next="${args.showPrevNext}"
        @gc-page-change="${(e: CustomEvent) => console.log('Page changed to:', e.detail.page)}"
      ></gc-pagination>
    </div>
  `,
};

/**
 * Live event tracking. Shows gc-page-change events in a log below pagination.
 * Demonstrates event structure: { page: number }.
 */
export const EventTracking: Story = {
  args: {
    currentPage: 1,
    totalPages: 20,
  },
  render: (args) => {
    const events: { page: number; time: string }[] = [];
    const updateLog = () => {
      const logEl = document.getElementById('pagination-event-log');
      if (logEl) {
        logEl.innerHTML = events.length === 0
          ? '<em style="color: #666;">No events yet. Click a page number or navigation button.</em>'
          : events
              .slice(-10)
              .reverse()
              .map(
                (e) =>
                  `<div style="padding: 0.5rem; border-bottom: 1px solid #eee;">
                    <strong>gc-page-change:</strong> Page ${e.page}
                    <span style="color: #666; font-size: 0.875rem; margin-left: 1rem;">${e.time}</span>
                  </div>`
              )
              .join('');
      }
    };

    return html`
      <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
        <div style="background: #fffde7; padding: 1.5rem; border: 1px solid #fff59d; margin-bottom: 1.5rem; border-radius: 4px;">
          <p style="margin: 0; color: #f57f17;">
            <strong>Event Tracking:</strong> Click page numbers or navigation buttons to see
            gc-page-change events logged below. Each event contains { page: number } detail.
          </p>
        </div>

        <gc-pagination
          current-page="${args.currentPage}"
          total-pages="${args.totalPages}"
          @gc-page-change="${(e: CustomEvent) => {
            events.push({
              page: e.detail.page,
              time: new Date().toLocaleTimeString(),
            });
            updateLog();
            console.log('gc-page-change:', e.detail);
          }}"
        ></gc-pagination>

        <div style="margin-top: 2rem; border: 2px solid #333; border-radius: 4px; background: #fff;">
          <div style="background: #333; color: #fff; padding: 0.75rem; font-weight: 600;">
            Event Log (Last 10 Events)
          </div>
          <div id="pagination-event-log" style="min-height: 200px; padding: 1rem;">
            <em style="color: #666;">No events yet. Click a page number or navigation button.</em>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * Pagination in a realistic GC search results layout. Shows how pagination integrates
 * with search results, filters, and result count.
 */
export const SearchResultsLayout: Story = {
  args: {
    currentPage: 3,
    totalPages: 15,
  },
  render: (args) => html`
    <div style="max-width: 1200px; margin: 0 auto; padding: 2rem; font-family: Lato, sans-serif;">
      <!-- GC Header simulation -->
      <div style="background: #284162; color: white; padding: 1rem 0; margin: -2rem -2rem 2rem -2rem;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; align-items: center; gap: 1rem;">
          <img src="https://via.placeholder.com/120x40/284162/ffffff?text=Canada" alt="Government of Canada" style="height: 40px;" />
          <h1 style="font-size: 1.25rem; margin: 0; font-weight: 400;">Search Results</h1>
        </div>
      </div>

      <!-- Search summary -->
      <div style="border-bottom: 2px solid #284162; padding-bottom: 1rem; margin-bottom: 2rem;">
        <h2 style="font-size: 1.75rem; margin: 0 0 0.5rem 0; color: #284162;">Your search for "employment insurance"</h2>
        <p style="margin: 0; color: #666; font-size: 1rem;">
          <strong>Showing results 21-30 of 145</strong>
        </p>
      </div>

      <!-- Mock search results -->
      ${Array.from({ length: 10 }, (_, i) => html`
        <div style="border-left: 4px solid #284162; padding-left: 1rem; margin-bottom: 1.5rem;">
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">
            <a href="#" style="color: #284162; text-decoration: none;">
              Employment Insurance Result ${i + 21}
            </a>
          </h3>
          <p style="margin: 0 0 0.25rem 0; color: #666; font-size: 0.875rem;">
            www.canada.ca/en/services/benefits/ei/result-${i + 21}
          </p>
          <p style="margin: 0; color: #333; line-height: 1.6;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...
          </p>
        </div>
      `)}

      <!-- Pagination -->
      <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #ddd;">
        <gc-pagination
          current-page="${args.currentPage}"
          total-pages="${args.totalPages}"
          @gc-page-change="${(e: CustomEvent) => {
            console.log('Loading page:', e.detail.page);
            // In real app: fetch new results, scroll to top
          }}"
        ></gc-pagination>
      </div>
    </div>
  `,
};

/**
 * Keyboard navigation demonstration with visual instructions. Shows how to navigate
 * pagination using only keyboard (Tab, Enter, Space).
 */
export const KeyboardNavigationDemo: Story = {
  args: {
    currentPage: 10,
    totalPages: 25,
  },
  render: (args) => html`
    <div style="padding: 2rem; max-width: 900px; margin: 0 auto;">
      <div style="background: #e8eaf6; padding: 1.5rem; border: 1px solid #9fa8da; margin-bottom: 1.5rem; border-radius: 4px;">
        <h3 style="margin: 0 0 1rem 0; color: #283593;">Keyboard Navigation Instructions</h3>
        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 4px; overflow: hidden;">
          <thead>
            <tr style="background: #283593; color: white;">
              <th style="padding: 0.75rem; text-align: left; border-right: 1px solid #5c6bc0;">Key</th>
              <th style="padding: 0.75rem; text-align: left;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 0.75rem; border-right: 1px solid #ddd;">
                <kbd style="background: #f5f5f5; padding: 0.25rem 0.5rem; border-radius: 3px; font-family: monospace; border: 1px solid #ccc;">Tab</kbd>
              </td>
              <td style="padding: 0.75rem;">Move focus to next page button or navigation control</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 0.75rem; border-right: 1px solid #ddd;">
                <kbd style="background: #f5f5f5; padding: 0.25rem 0.5rem; border-radius: 3px; font-family: monospace; border: 1px solid #ccc;">Shift</kbd> +
                <kbd style="background: #f5f5f5; padding: 0.25rem 0.5rem; border-radius: 3px; font-family: monospace; border: 1px solid #ccc;">Tab</kbd>
              </td>
              <td style="padding: 0.75rem;">Move focus to previous page button or navigation control</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 0.75rem; border-right: 1px solid #ddd;">
                <kbd style="background: #f5f5f5; padding: 0.25rem 0.5rem; border-radius: 3px; font-family: monospace; border: 1px solid #ccc;">Enter</kbd>
              </td>
              <td style="padding: 0.75rem;">Activate focused page button (navigate to that page)</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem; border-right: 1px solid #ddd;">
                <kbd style="background: #f5f5f5; padding: 0.25rem 0.5rem; border-radius: 3px; font-family: monospace; border: 1px solid #ccc;">Space</kbd>
              </td>
              <td style="padding: 0.75rem;">Activate focused page button (navigate to that page)</td>
            </tr>
          </tbody>
        </table>
        <p style="margin: 1rem 0 0 0; color: #555; font-size: 0.9rem;">
          <strong>Try it:</strong> Click in the pagination below, then use Tab to move between
          buttons and Enter/Space to select pages. Notice the 3px blue focus outline.
        </p>
      </div>

      <gc-pagination
        current-page="${args.currentPage}"
        total-pages="${args.totalPages}"
        @gc-page-change="${(e: CustomEvent) => {
          console.log('Keyboard navigation to page:', e.detail.page);
        }}"
      ></gc-pagination>

      <div style="margin-top: 2rem; padding: 1rem; background: #fff; border: 2px dashed #9fa8da; border-radius: 4px;">
        <h4 style="margin: 0 0 0.5rem 0; color: #283593;">Accessibility Features</h4>
        <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem; line-height: 1.8; color: #555;">
          <li><strong>role="button"</strong> on page links for semantic HTML</li>
          <li><strong>aria-current="page"</strong> marks current page for screen readers</li>
          <li><strong>aria-label</strong> on each page button ("Go to page X")</li>
          <li><strong>aria-disabled</strong> on Previous/Next when at boundaries</li>
          <li><strong>aria-live="polite"</strong> region announces "Page X of Y" on change</li>
          <li><strong>3px focus outline</strong> with 2px offset for visibility</li>
        </ul>
      </div>
    </div>
  `,
};
