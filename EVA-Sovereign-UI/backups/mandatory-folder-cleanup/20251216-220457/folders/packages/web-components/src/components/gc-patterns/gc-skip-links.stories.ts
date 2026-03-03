import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { SkipLink } from './gc-skip-links.js';
import './gc-skip-links.js';

/**
 * GC Skip Links Component
 * 
 * Accessibility skip navigation links allow keyboard and screen reader users to bypass
 * repetitive navigation and jump directly to main content areas.
 * 
 * ## Design Specifications
 * - Must comply with WCAG 2.2 Level AAA success criterion 2.4.1 (Bypass Blocks)
 * - Visually hidden until focused
 * - Appears at top of page on keyboard focus
 * - Uses GC blue (#284162) for text
 * - High z-index for always-on-top behavior
 * - Required for all Government of Canada websites
 */
const meta = {
  title: 'GC Patterns/Skip Links',
  component: 'gc-skip-links',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The GC Skip Links component provides essential accessibility navigation shortcuts that allow
keyboard and screen reader users to bypass repetitive content and jump directly to important
page sections.

### Key Features
- **WCAG AAA Compliant**: Meets success criterion 2.4.1 (Bypass Blocks)
- **Visually Hidden**: Links hidden until focused via keyboard
- **Smooth Scrolling**: Optional smooth scroll animation to target
- **Focus Management**: Automatically focuses target element
- **Bilingual**: English and French default links
- **Customizable**: Add any number of skip links to any page section
- **Event Tracking**: Emits gc-skip-link-activated for analytics

### Compliance
- **MANDATORY** for all GC websites
- WCAG 2.2 Level AAA requirement
- Treasury Board Secretariat (TBS) approved
- Canada.ca design system requirement

### Usage Note
Skip links should be the **first focusable elements** on every page. Press Tab immediately
after page load to reveal them. They disappear when focus moves away.
        `,
      },
    },
  },
  argTypes: {
    links: {
      control: 'object',
      description: 'Array of skip link configurations',
      table: {
        type: { summary: 'SkipLink[]' },
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
    inverted: {
      control: 'boolean',
      description: 'Use inverted colors for dark backgrounds',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    smoothScroll: {
      control: 'boolean',
      description: 'Enable smooth scrolling to target',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    focusTarget: {
      control: 'boolean',
      description: 'Focus target element after navigation',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    scrollOffset: {
      control: 'number',
      description: 'Scroll offset from top (in pixels)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/**
 * Default skip links with standard "Skip to main content" and "Skip to footer" links.
 * Press Tab to see the skip links appear.
 */
export const Default: Story = {
  args: {
    locale: 'en-CA',
    inverted: false,
    smoothScroll: true,
    focusTarget: true,
    scrollOffset: 0,
  },
  render: (args) => html`
    <div>
      <gc-skip-links
        .locale="${args.locale}"
        ?inverted="${args.inverted}"
        .smoothScroll="${args.smoothScroll}"
        .focusTarget="${args.focusTarget}"
        .scrollOffset="${args.scrollOffset}"
        @gc-skip-link-activated="${(e: CustomEvent) => {
          console.log('Skip link activated:', e.detail);
        }}"
      ></gc-skip-links>

      <div style="padding: 2rem; background-color: #f8f8f8; margin-top: 3rem;">
        <p style="font-weight: 700; color: #d9534f;">
          ⌨️ Press Tab now to see the skip links appear!
        </p>
        <p>
          Skip links are visually hidden until focused. They provide keyboard users
          quick access to main content areas.
        </p>
      </div>

      <main id="main-content" style="padding: 2rem; min-height: 400px; background-color: #fff; border: 2px solid #284162; margin-top: 2rem;">
        <h1>Main Content</h1>
        <p>This is the main content area. Skip links can jump directly here.</p>
      </main>

      <footer id="footer" style="padding: 2rem; background-color: #f8f8f8; margin-top: 2rem; border-top: 4px solid #af3c43;">
        <p>Footer content area</p>
      </footer>
    </div>
  `,
};

/**
 * French language version (Français).
 * Default skip links display "Passer au contenu principal" and "Passer au pied de page".
 */
export const French: Story = {
  args: {
    locale: 'fr-CA',
  },
  render: (args) => html`
    <div>
      <gc-skip-links .locale="${args.locale}"></gc-skip-links>

      <div style="padding: 2rem; background-color: #f8f8f8; margin-top: 3rem;">
        <p style="font-weight: 700; color: #d9534f;">
          ⌨️ Appuyez sur Tab pour voir les liens !
        </p>
        <p>
          Les liens de saut sont cachés visuellement jusqu'à ce qu'ils soient sélectionnés.
        </p>
      </div>

      <main id="main-content" style="padding: 2rem; min-height: 400px; background-color: #fff; border: 2px solid #284162; margin-top: 2rem;">
        <h1>Contenu principal</h1>
        <p>Ceci est la zone de contenu principal.</p>
      </main>

      <footer id="footer" style="padding: 2rem; background-color: #f8f8f8; margin-top: 2rem; border-top: 4px solid #af3c43;">
        <p>Zone de pied de page</p>
      </footer>
    </div>
  `,
};

/**
 * Custom skip links targeting multiple page sections.
 */
export const CustomLinks: Story = {
  args: {},
  render: (args) => {
    const customLinks: SkipLink[] = [
      { text: 'Skip to navigation', target: '#navigation' },
      { text: 'Skip to main content', target: '#main-content' },
      { text: 'Skip to sidebar', target: '#sidebar' },
      { text: 'Skip to footer', target: '#footer' },
    ];

    return html`
      <div>
        <gc-skip-links .links="${customLinks}"></gc-skip-links>

        <div style="padding: 2rem; background-color: #f8f8f8; margin-top: 3rem;">
          <p style="font-weight: 700; color: #d9534f;">
            ⌨️ Press Tab to see 4 custom skip links!
          </p>
        </div>

        <nav id="navigation" style="padding: 2rem; background-color: #e8e8e8; margin-top: 2rem;">
          <h2>Navigation</h2>
          <p>Site navigation area</p>
        </nav>

        <div style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem; margin-top: 2rem;">
          <main id="main-content" style="padding: 2rem; background-color: #fff; border: 2px solid #284162;">
            <h1>Main Content</h1>
            <p>Primary content area</p>
          </main>

          <aside id="sidebar" style="padding: 2rem; background-color: #f0f0f0; border: 2px solid #666;">
            <h2>Sidebar</h2>
            <p>Supplementary content</p>
          </aside>
        </div>

        <footer id="footer" style="padding: 2rem; background-color: #f8f8f8; margin-top: 2rem; border-top: 4px solid #af3c43;">
          <p>Footer content</p>
        </footer>
      </div>
    `;
  },
};

/**
 * Skip links in a full page layout demonstrating typical usage.
 */
export const FullPageExample: Story = {
  args: {},
  render: (args) => html`
    <div style="min-height: 100vh; display: flex; flex-direction: column;">
      <gc-skip-links></gc-skip-links>

      <header style="background-color: #fff; border-bottom: 4px solid #af3c43; padding: 1.5rem 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h1 style="margin: 0; font-size: 1.5rem;">Government of Canada</h1>
          </div>
          <nav>
            <a href="#" style="margin: 0 1rem; color: #284162;">Services</a>
            <a href="#" style="margin: 0 1rem; color: #284162;">About</a>
            <a href="#" style="margin: 0 1rem; color: #284162;">Contact</a>
          </nav>
        </div>
      </header>

      <main id="main-content" style="flex: 1; padding: 3rem 2rem; max-width: 1200px; margin: 0 auto; width: 100%;">
        <h1>Page Title</h1>
        <p style="font-size: 1.125rem; line-height: 1.6;">
          Press Tab at the top of this page to reveal skip links. They allow keyboard users
          to bypass the header navigation and jump directly to this main content.
        </p>
        <p style="line-height: 1.6;">
          This is essential for accessibility - imagine having to tab through 50+ navigation
          links on every page before reaching the content you want!
        </p>
      </main>

      <footer id="footer" style="background-color: #f8f8f8; border-top: 4px solid #af3c43; padding: 2rem;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <p style="margin: 0;">© His Majesty the King in Right of Canada</p>
        </div>
      </footer>
    </div>
  `,
};

/**
 * Skip links with scroll offset for fixed headers.
 */
export const WithScrollOffset: Story = {
  args: {
    scrollOffset: 80,
  },
  render: (args) => html`
    <div>
      <div style="position: fixed; top: 0; left: 0; right: 0; background-color: #284162; color: white; padding: 1rem; z-index: 1000;">
        <p style="margin: 0;">Fixed Header (80px tall)</p>
      </div>

      <gc-skip-links .scrollOffset="${args.scrollOffset}"></gc-skip-links>

      <div style="padding: 2rem; margin-top: 100px; background-color: #f8f8f8;">
        <p style="font-weight: 700; color: #d9534f;">
          ⌨️ Skip links account for the 80px fixed header offset
        </p>
      </div>

      <main id="main-content" style="padding: 2rem; min-height: 600px; background-color: #fff; border: 2px solid #284162; margin-top: 2rem;">
        <h1>Main Content</h1>
        <p>The skip link will scroll to account for the fixed header above.</p>
      </main>

      <footer id="footer" style="padding: 2rem; background-color: #f8f8f8; margin-top: 2rem;">
        <p>Footer content</p>
      </footer>
    </div>
  `,
};

/**
 * Accessibility demonstration showing keyboard interaction.
 */
export const AccessibilityFeatures: Story = {
  args: {},
  render: (args) => html`
    <div>
      <gc-skip-links></gc-skip-links>

      <div style="padding: 2rem; background-color: #fff3cd; border-left: 4px solid #ffc107; margin-top: 3rem;">
        <h2 style="margin-top: 0;">⌨️ Keyboard Instructions</h2>
        <ol style="line-height: 1.8;">
          <li><strong>Press Tab</strong> - Skip link appears at top of page</li>
          <li><strong>Press Enter or Space</strong> - Activate skip link</li>
          <li><strong>Tab again</strong> - Move to next skip link</li>
          <li><strong>Shift+Tab</strong> - Move to previous focusable element</li>
        </ol>
      </div>

      <main id="main-content" style="padding: 2rem; min-height: 400px; background-color: #fff; border: 2px solid #284162; margin-top: 2rem;">
        <h1>Accessibility Features</h1>
        
        <h2>Why Skip Links Matter</h2>
        <ul style="line-height: 1.8;">
          <li><strong>WCAG 2.4.1 Requirement:</strong> Level A success criterion</li>
          <li><strong>Keyboard Efficiency:</strong> Bypass repetitive navigation</li>
          <li><strong>Screen Reader Support:</strong> Quick content access</li>
          <li><strong>Motor Disability Support:</strong> Reduce required interactions</li>
        </ul>

        <h2>Technical Implementation</h2>
        <ul style="line-height: 1.8;">
          <li>Position: absolute with top: -100px (off-screen)</li>
          <li>On focus: top: 0 (slides into view)</li>
          <li>High z-index: Always visible when focused</li>
          <li>Smooth scroll animation (optional)</li>
          <li>Automatic focus management</li>
        </ul>

        <h2>Best Practices</h2>
        <ul style="line-height: 1.8;">
          <li>Place as first element in DOM</li>
          <li>Minimum 2 skip links (main content + footer)</li>
          <li>Add skip links for complex navigation structures</li>
          <li>Test with keyboard-only navigation</li>
          <li>Test with screen readers (NVDA, JAWS, VoiceOver)</li>
        </ul>
      </main>

      <footer id="footer" style="padding: 2rem; background-color: #f8f8f8; margin-top: 2rem; border-top: 4px solid #af3c43;">
        <p>Footer content</p>
      </footer>
    </div>
  `,
};

/**
 * Interactive demo with event logging.
 */
export const EventTracking: Story = {
  args: {},
  render: (args) => {
    const log: string[] = [];

    const handleActivation = (e: CustomEvent) => {
      const msg = `Navigated to: ${e.detail.link.text} → ${e.detail.link.target}`;
      log.push(msg);
      console.log('Skip link event:', e.detail);
    };

    return html`
      <div>
        <gc-skip-links @gc-skip-link-activated="${handleActivation}"></gc-skip-links>

        <div style="padding: 2rem; background-color: #f8f8f8; margin-top: 3rem;">
          <p style="font-weight: 700;">
            Activate a skip link to see event details logged below
          </p>
          <div style="margin-top: 1rem; padding: 1rem; background-color: #fff; border: 1px solid #d1d1d1; font-family: monospace; font-size: 0.875rem; min-height: 100px;">
            ${log.length === 0 
              ? html`<em style="color: #666;">No events yet...</em>` 
              : log.map(msg => html`<div>${msg}</div>`)}
          </div>
        </div>

        <main id="main-content" style="padding: 2rem; min-height: 400px; background-color: #fff; border: 2px solid #284162; margin-top: 2rem;">
          <h1>Event Tracking Demo</h1>
          <p>When you use a skip link, the component emits a <code>gc-skip-link-activated</code> event.</p>
          <p>This can be used for:</p>
          <ul>
            <li>Analytics tracking</li>
            <li>Custom scroll behavior</li>
            <li>Additional UI updates</li>
            <li>Debugging and testing</li>
          </ul>
        </main>

        <footer id="footer" style="padding: 2rem; background-color: #f8f8f8; margin-top: 2rem; border-top: 4px solid #af3c43;">
          <p>Footer content</p>
        </footer>
      </div>
    `;
  },
};

/**
 * Visual demonstration of skip link appearance on focus.
 */
export const VisualBehavior: Story = {
  args: {},
  render: (args) => html`
    <div>
      <gc-skip-links></gc-skip-links>

      <div style="padding: 2rem; background-color: #f0f0f0; margin-top: 3rem; border: 2px dashed #284162;">
        <h2 style="margin-top: 0;">Skip Link Visual Behavior</h2>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
          <div>
            <h3>Before Focus (Hidden)</h3>
            <div style="background-color: #fff; padding: 1.5rem; border: 1px solid #d1d1d1;">
              <p style="color: #666; font-style: italic;">
                Skip links are positioned off-screen (top: -100px)
              </p>
              <p style="margin: 0; color: #666; font-size: 0.875rem;">
                Not visible in normal flow
              </p>
            </div>
          </div>

          <div>
            <h3>On Focus (Visible)</h3>
            <div style="background-color: #fff; padding: 1.5rem; border: 3px solid #303fc1; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
              <p style="font-weight: 700;">Skip to main content</p>
              <p style="margin: 0; font-size: 0.875rem; color: #666;">
                Slides down to top: 0, fully visible with focus outline
              </p>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1.5rem; background-color: #fff3cd; border-left: 4px solid #ffc107;">
          <p style="margin: 0; font-weight: 700;">💡 Design Details</p>
          <ul style="margin-top: 0.5rem; line-height: 1.6;">
            <li>White background with GC blue text</li>
            <li>3px solid border for high contrast</li>
            <li>Box shadow for depth</li>
            <li>Rounded bottom corners</li>
            <li>3px focus outline (blue)</li>
            <li>0.2s transition animation</li>
          </ul>
        </div>
      </div>

      <main id="main-content" style="padding: 2rem; background-color: #fff; margin-top: 2rem;">
        <h1>Main Content</h1>
      </main>

      <footer id="footer" style="padding: 2rem; background-color: #f8f8f8; margin-top: 2rem;">
        <p>Footer</p>
      </footer>
    </div>
  `,
};
