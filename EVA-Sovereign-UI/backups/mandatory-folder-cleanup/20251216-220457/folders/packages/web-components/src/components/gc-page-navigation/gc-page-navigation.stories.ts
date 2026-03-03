import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './gc-page-navigation';
import type { GCPageNavigation } from './gc-page-navigation';

const meta: Meta<GCPageNavigation> = {
  title: 'Components/GC Page Navigation',
  component: 'gc-page-navigation',
  tags: ['autodocs'],
  argTypes: {
    previousUrl: {
      control: 'text',
      description: 'URL for previous page',
      table: { category: 'Content' }
    },
    previousTitle: {
      control: 'text',
      description: 'Title for previous page',
      table: { category: 'Content' }
    },
    nextUrl: {
      control: 'text',
      description: 'URL for next page',
      table: { category: 'Content' }
    },
    nextTitle: {
      control: 'text',
      description: 'Title for next page',
      table: { category: 'Content' }
    },
    compact: {
      control: 'boolean',
      description: 'Use compact layout',
      table: { category: 'Display' }
    },
    lang: {
      control: 'select',
      options: ['en-CA', 'fr-CA'],
      description: 'Component language',
      table: { category: 'Localization' }
    }
  }
};

export default meta;
type Story = StoryObj<GCPageNavigation>;

/**
 * Default navigation with both previous and next links
 */
export const Default: Story = {
  args: {
    previousUrl: '/guide/step1',
    previousTitle: 'Step 1: Getting Started',
    nextUrl: '/guide/step3',
    nextTitle: 'Step 3: Next Steps',
    lang: 'en-CA'
  },
  render: (args) => html`
    <gc-page-navigation
      previous-url="${args.previousUrl}"
      previous-title="${args.previousTitle}"
      next-url="${args.nextUrl}"
      next-title="${args.nextTitle}"
      ?compact="${args.compact}"
      lang="${args.lang}"
      @gc-page-navigation-click="${(e: CustomEvent) => console.log('Navigation clicked:', e.detail)}"
    ></gc-page-navigation>
  `
};

/**
 * Previous link only
 */
export const PreviousOnly: Story = {
  args: {
    previousUrl: '/guide/introduction',
    previousTitle: 'Introduction',
    lang: 'en-CA'
  },
  render: (args) => html`
    <gc-page-navigation
      previous-url="${args.previousUrl}"
      previous-title="${args.previousTitle}"
      lang="${args.lang}"
    ></gc-page-navigation>
  `
};

/**
 * Next link only
 */
export const NextOnly: Story = {
  args: {
    nextUrl: '/guide/eligibility',
    nextTitle: 'Check Your Eligibility',
    lang: 'en-CA'
  },
  render: (args) => html`
    <gc-page-navigation
      next-url="${args.nextUrl}"
      next-title="${args.nextTitle}"
      lang="${args.lang}"
    ></gc-page-navigation>
  `
};

/**
 * Without titles (URLs only)
 */
export const WithoutTitles: Story = {
  args: {
    previousUrl: '/guide/step1',
    nextUrl: '/guide/step3',
    lang: 'en-CA'
  },
  render: (args) => html`
    <gc-page-navigation
      previous-url="${args.previousUrl}"
      next-url="${args.nextUrl}"
      lang="${args.lang}"
    ></gc-page-navigation>
  `
};

/**
 * Compact mode for tight spaces
 */
export const Compact: Story = {
  args: {
    previousUrl: '/guide/step1',
    previousTitle: 'Previous Step',
    nextUrl: '/guide/step3',
    nextTitle: 'Next Step',
    compact: true,
    lang: 'en-CA'
  },
  render: (args) => html`
    <gc-page-navigation
      previous-url="${args.previousUrl}"
      previous-title="${args.previousTitle}"
      next-url="${args.nextUrl}"
      next-title="${args.nextTitle}"
      ?compact="${args.compact}"
      lang="${args.lang}"
    ></gc-page-navigation>
  `
};

/**
 * French localization
 */
export const French: Story = {
  args: {
    previousUrl: '/guide/etape1',
    previousTitle: 'Étape 1 : Commencer',
    nextUrl: '/guide/etape3',
    nextTitle: 'Étape 3 : Prochaines étapes',
    lang: 'fr-CA'
  },
  render: (args) => html`
    <gc-page-navigation
      previous-url="${args.previousUrl}"
      previous-title="${args.previousTitle}"
      next-url="${args.nextUrl}"
      next-title="${args.nextTitle}"
      lang="${args.lang}"
    ></gc-page-navigation>
  `
};

/**
 * In article context
 */
export const InArticle: Story = {
  render: () => html`
    <article style="max-width: 800px; padding: 2rem; background: white;">
      <h1>Step 2: Gather Your Documents</h1>
      
      <p style="line-height: 1.6; margin-bottom: 1.5rem;">
        Before you begin your application, you'll need to gather several important documents.
        Having these ready will make the process much smoother.
      </p>

      <h2 style="margin-top: 2rem; margin-bottom: 1rem;">Required Documents</h2>
      <ul style="line-height: 1.8; margin-left: 1.5rem; margin-bottom: 1.5rem;">
        <li>Proof of identity (passport, birth certificate)</li>
        <li>Proof of residency</li>
        <li>Employment documentation</li>
        <li>Financial statements</li>
      </ul>

      <h2 style="margin-top: 2rem; margin-bottom: 1rem;">Document Checklist</h2>
      <p style="line-height: 1.6; margin-bottom: 2rem;">
        Use our interactive checklist to ensure you have everything you need before proceeding
        to the next step.
      </p>

      <footer style="margin-top: 3rem; padding-top: 2rem;">
        <gc-page-navigation
          previous-url="/guide/introduction"
          previous-title="Step 1: Getting Started"
          next-url="/guide/submit-application"
          next-title="Step 3: Submit Your Application"
          lang="en-CA"
        ></gc-page-navigation>
      </footer>
    </article>
  `
};

/**
 * Multi-page guide example
 */
export const MultiPageGuide: Story = {
  render: () => html`
    <div style="max-width: 900px; margin: 0 auto;">
      <div style="background: #f5f5f5; padding: 1rem; margin-bottom: 2rem; border-radius: 0.25rem;">
        <h3 style="margin: 0 0 0.5rem 0;">Immigration Guide</h3>
        <p style="margin: 0; color: #666; font-size: 0.875rem;">Page 2 of 5</p>
      </div>

      <article style="background: white; padding: 2rem; margin-bottom: 2rem;">
        <h1>Determine Your Eligibility</h1>
        <p style="line-height: 1.6;">
          Before applying, check if you meet the basic requirements for immigration to Canada.
          This page will help you understand the eligibility criteria for different programs.
        </p>
      </article>

      <gc-page-navigation
        previous-url="/guide/overview"
        previous-title="Overview"
        next-url="/guide/choose-program"
        next-title="Choose Your Program"
        lang="en-CA"
      ></gc-page-navigation>
    </div>
  `
};

/**
 * Long titles example
 */
export const LongTitles: Story = {
  args: {
    previousUrl: '/guide/step1',
    previousTitle: 'Step 1: Understanding the Canadian Immigration System and Application Process',
    nextUrl: '/guide/step3',
    nextTitle: 'Step 3: Preparing Your Documentation and Supporting Materials for Submission',
    lang: 'en-CA'
  },
  render: (args) => html`
    <gc-page-navigation
      previous-url="${args.previousUrl}"
      previous-title="${args.previousTitle}"
      next-url="${args.nextUrl}"
      next-title="${args.nextTitle}"
      lang="${args.lang}"
    ></gc-page-navigation>
  `
};

/**
 * Event tracking example
 */
export const EventTracking: Story = {
  args: {
    previousUrl: '/guide/step1',
    previousTitle: 'Step 1',
    nextUrl: '/guide/step3',
    nextTitle: 'Step 3',
    lang: 'en-CA'
  },
  render: (args) => html`
    <div>
      <gc-page-navigation
        previous-url="${args.previousUrl}"
        previous-title="${args.previousTitle}"
        next-url="${args.nextUrl}"
        next-title="${args.nextTitle}"
        lang="${args.lang}"
        @gc-page-navigation-click="${(e: CustomEvent) => {
          e.preventDefault();
          alert(`Navigation Event:
            
Direction: ${e.detail.direction}
URL: ${e.detail.url}

In production, this would:
- Send analytics event
- Track user flow through guide
- Update progress indicators`);
        }}"
      ></gc-page-navigation>
      <p style="margin-top: 1rem; color: #666; font-size: 0.875rem;">
        Click navigation links to see event tracking (navigation prevented for demo)
      </p>
    </div>
  `
};

/**
 * Responsive design
 */
export const Responsive: Story = {
  render: () => html`
    <div>
      <h3 style="margin-bottom: 1rem;">Desktop View (default)</h3>
      <gc-page-navigation
        previous-url="/guide/step1"
        previous-title="Previous Step"
        next-url="/guide/step3"
        next-title="Next Step"
        lang="en-CA"
      ></gc-page-navigation>

      <h3 style="margin-top: 3rem; margin-bottom: 1rem;">Mobile View (< 768px)</h3>
      <div style="max-width: 400px;">
        <gc-page-navigation
          previous-url="/guide/step1"
          previous-title="Previous Step"
          next-url="/guide/step3"
          next-title="Next Step"
          lang="en-CA"
        ></gc-page-navigation>
      </div>

      <p style="margin-top: 2rem; padding: 1rem; background: #f5f5f5; border-radius: 0.25rem;">
        On mobile devices, navigation links stack vertically for better touch targets.
        Resize your browser window to see the responsive behavior.
      </p>
    </div>
  `
};

/**
 * Accessibility features
 */
export const Accessibility: Story = {
  args: {
    previousUrl: '/guide/accessibility',
    previousTitle: 'Accessibility Guidelines',
    nextUrl: '/guide/testing',
    nextTitle: 'Testing Your Application',
    lang: 'en-CA'
  },
  render: (args) => html`
    <div>
      <gc-page-navigation
        previous-url="${args.previousUrl}"
        previous-title="${args.previousTitle}"
        next-url="${args.nextUrl}"
        next-title="${args.nextTitle}"
        lang="${args.lang}"
      ></gc-page-navigation>
      
      <div style="margin-top: 2rem; padding: 1.5rem; background: #f5f5f5; border-radius: 0.25rem;">
        <h3 style="margin-bottom: 1rem;">Accessibility Features:</h3>
        <ul style="list-style-position: inside; line-height: 1.8;">
          <li><strong>Semantic HTML:</strong> Uses &lt;nav&gt; and &lt;a&gt; elements</li>
          <li><strong>ARIA labels:</strong> aria-label on nav and individual links</li>
          <li><strong>Keyboard navigation:</strong> Fully accessible via Tab, Enter keys</li>
          <li><strong>Focus indicators:</strong> Clear 3px blue outline on focus</li>
          <li><strong>Visual direction:</strong> Arrow icons indicate direction</li>
          <li><strong>Responsive touch targets:</strong> Links are large enough for touch interaction</li>
          <li><strong>Screen reader support:</strong> Descriptive link text and labels</li>
          <li><strong>Hover effects:</strong> Clear visual feedback on interaction</li>
        </ul>
      </div>
    </div>
  `
};
