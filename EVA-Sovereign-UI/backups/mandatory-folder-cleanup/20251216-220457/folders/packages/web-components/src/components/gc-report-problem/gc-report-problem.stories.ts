import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './gc-report-problem';
import type { GCReportProblem } from './gc-report-problem';

const meta: Meta<GCReportProblem> = {
  title: 'Components/GC Report Problem',
  component: 'gc-report-problem',
  tags: ['autodocs'],
  argTypes: {
    url: {
      control: 'text',
      description: 'Page URL for the report (defaults to current page)',
      table: { category: 'Content' }
    },
    compact: {
      control: 'boolean',
      description: 'Use compact layout for sidebars',
      table: { category: 'Display' }
    },
    successDuration: {
      control: 'number',
      description: 'Success message display duration (milliseconds)',
      table: { category: 'Behavior' }
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
type Story = StoryObj<GCReportProblem>;

/**
 * Default report problem form
 */
export const Default: Story = {
  args: {
    url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html',
    successDuration: 5000,
    lang: 'en-CA'
  },
  render: (args) => html`
    <gc-report-problem
      url="${args.url}"
      ?compact="${args.compact}"
      success-duration="${args.successDuration}"
      lang="${args.lang}"
      @gc-report-problem-submit="${(e: CustomEvent) => console.log('Problem submitted:', e.detail)}"
      @gc-report-problem-cancel="${() => console.log('Form cancelled')}"
      @gc-report-problem-success="${() => console.log('Success message displayed')}"
    ></gc-report-problem>
  `
};

/**
 * Compact version for sidebars and tight spaces
 */
export const Compact: Story = {
  args: {
    compact: true,
    lang: 'en-CA'
  },
  render: (args) => html`
    <gc-report-problem
      ?compact="${args.compact}"
      lang="${args.lang}"
    ></gc-report-problem>
  `
};

/**
 * French localization
 */
export const French: Story = {
  args: {
    url: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada.html',
    lang: 'fr-CA'
  },
  render: (args) => html`
    <gc-report-problem
      url="${args.url}"
      lang="${args.lang}"
    ></gc-report-problem>
  `
};

/**
 * In page footer context
 */
export const InPageFooter: Story = {
  render: () => html`
    <article style="max-width: 800px; padding: 2rem; background: white;">
      <h1>Immigrate to Canada</h1>
      <p style="line-height: 1.6; margin-bottom: 1.5rem;">
        Canada welcomes thousands of immigrants each year. Learn about the different immigration programs
        and find the one that's right for you.
      </p>
      <p style="line-height: 1.6; margin-bottom: 2rem;">
        The Express Entry system manages applications for three immigration programs:
        Federal Skilled Worker Program, Federal Skilled Trades Program, and Canadian Experience Class.
      </p>
      
      <footer style="border-top: 2px solid #e1e4e7; padding-top: 2rem; margin-top: 3rem;">
        <gc-report-problem
          url="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html"
          lang="en-CA"
        ></gc-report-problem>
      </footer>
    </article>
  `
};

/**
 * In sidebar context (compact)
 */
export const InSidebar: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; max-width: 1200px;">
      <main style="flex: 1; padding: 2rem; background: white;">
        <h1>Apply for a Passport</h1>
        <p style="line-height: 1.6; margin-bottom: 1.5rem;">
          Canadian passports are issued by Immigration, Refugees and Citizenship Canada (IRCC).
          You can apply online or by mail.
        </p>
        <h2 style="margin-top: 2rem; margin-bottom: 1rem;">Who can apply</h2>
        <ul style="line-height: 1.8; margin-left: 1.5rem;">
          <li>Canadian citizens</li>
          <li>First-time applicants or renewal</li>
          <li>Adults and children</li>
        </ul>
      </main>
      
      <aside style="width: 300px; padding: 1rem; background: #f5f5f5;">
        <gc-report-problem
          compact
          lang="en-CA"
        ></gc-report-problem>
      </aside>
    </div>
  `
};

/**
 * Event tracking example
 */
export const EventTracking: Story = {
  args: {
    url: 'https://www.canada.ca/en/services.html',
    lang: 'en-CA'
  },
  render: (args) => html`
    <div>
      <gc-report-problem
        url="${args.url}"
        lang="${args.lang}"
        @gc-report-problem-submit="${(e: CustomEvent) => {
          const report = e.detail;
          alert(`Problem Report Submitted:
            
Categories: ${report.categories.join(', ')}
Description: ${report.description}
URL: ${report.url}
Timestamp: ${report.timestamp}`);
        }}"
        @gc-report-problem-cancel="${() => {
          alert('Form cancelled - analytics event would be sent here');
        }}"
        @gc-report-problem-success="${() => {
          alert('Success message displayed - could trigger confetti animation or redirect');
        }}"
      ></gc-report-problem>
      <p style="margin-top: 1rem; color: #666; font-size: 0.875rem;">
        Fill out and submit the form to see event tracking
      </p>
    </div>
  `
};

/**
 * With form validation errors
 */
export const ValidationDemo: Story = {
  render: () => html`
    <div>
      <gc-report-problem lang="en-CA"></gc-report-problem>
      <p style="margin-top: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 0.25rem;">
        <strong>Try this:</strong> Click "Submit" without filling anything to see validation errors.
        Then select a category or type a description to see errors clear automatically.
      </p>
    </div>
  `
};

/**
 * Custom success duration (3 seconds instead of 5)
 */
export const QuickSuccess: Story = {
  args: {
    successDuration: 3000,
    lang: 'en-CA'
  },
  render: (args) => html`
    <div>
      <gc-report-problem
        success-duration="${args.successDuration}"
        lang="${args.lang}"
      ></gc-report-problem>
      <p style="margin-top: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 0.25rem;">
        Success message will disappear after 3 seconds (instead of default 5 seconds)
      </p>
    </div>
  `
};

/**
 * Multiple forms on same page
 */
export const MultipleForms: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <section>
        <h3 style="margin-bottom: 1rem;">English - Full Size</h3>
        <gc-report-problem
          url="https://www.canada.ca/en/page1.html"
          lang="en-CA"
        ></gc-report-problem>
      </section>
      
      <section>
        <h3 style="margin-bottom: 1rem;">French - Compact</h3>
        <gc-report-problem
          url="https://www.canada.ca/fr/page2.html"
          compact
          lang="fr-CA"
        ></gc-report-problem>
      </section>
    </div>
  `
};

/**
 * Accessibility features demonstration
 */
export const Accessibility: Story = {
  args: {
    lang: 'en-CA'
  },
  render: (args) => html`
    <div>
      <gc-report-problem
        url="https://www.canada.ca/en/accessibility.html"
        lang="${args.lang}"
      ></gc-report-problem>
      <div style="margin-top: 2rem; padding: 1.5rem; background: #f5f5f5; border-radius: 0.25rem;">
        <h3 style="margin-bottom: 1rem;">Accessibility Features:</h3>
        <ul style="list-style-position: inside; line-height: 1.8;">
          <li><strong>Semantic form elements:</strong> input[type="checkbox"], textarea, button</li>
          <li><strong>ARIA labels:</strong> aria-label on checkboxes, aria-required on textarea</li>
          <li><strong>ARIA validation:</strong> aria-invalid toggles based on validation state</li>
          <li><strong>ARIA live regions:</strong> role="alert" on error, role="status" + aria-live="polite" on success</li>
          <li><strong>Keyboard navigation:</strong> All controls accessible via Tab, Enter, Space</li>
          <li><strong>Touch targets:</strong> 44px minimum height for buttons</li>
          <li><strong>Focus indicators:</strong> Clear outlines on all interactive elements</li>
          <li><strong>Required field indicators:</strong> Visual (*) and screen reader announcements</li>
        </ul>
      </div>
    </div>
  `
};

/**
 * Integration with page metadata
 */
export const WithPageMetadata: Story = {
  render: () => html`
    <article style="max-width: 800px; padding: 2rem; background: white;">
      <h1>Employment Insurance (EI)</h1>
      
      <div style="margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #e1e4e7; color: #666; font-size: 0.875rem;">
        <p>Date modified: 2024-01-15</p>
      </div>

      <p style="line-height: 1.6; margin-bottom: 1.5rem;">
        Employment Insurance (EI) provides temporary financial assistance to unemployed Canadians
        who have lost their job through no fault of their own.
      </p>

      <h2 style="margin-top: 2rem; margin-bottom: 1rem;">Eligibility</h2>
      <p style="line-height: 1.6; margin-bottom: 1.5rem;">
        To be eligible for EI benefits, you must have worked a certain number of insurable hours
        in the last 52 weeks or since your last claim.
      </p>

      <footer style="border-top: 2px solid #e1e4e7; padding-top: 2rem; margin-top: 3rem;">
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <gc-report-problem
            url="https://www.canada.ca/en/services/benefits/ei.html"
            lang="en-CA"
          ></gc-report-problem>
          
          <div style="padding-top: 1rem; border-top: 1px solid #e1e4e7; color: #666; font-size: 0.875rem;">
            <p>Publisher: Employment and Social Development Canada</p>
            <p>Identifier: ESDC-BUR-000-12-24</p>
          </div>
        </div>
      </footer>
    </article>
  `
};
