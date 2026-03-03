import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-page-details';
import type { GCPageDetails } from './gc-page-details';

const meta: Meta<GCPageDetails> = {
  title: 'Components/GC Page Details',
  component: 'gc-page-details',
  tags: ['autodocs'],
  argTypes: {
    'date-modified': {
      control: 'text',
      description: 'Last modified date in ISO 8601 format (YYYY-MM-DD)',
    },
    publisher: {
      control: 'text',
      description: 'Publishing organization name',
    },
    'content-type': {
      control: 'text',
      description: 'Content type (e.g., Guidance, Form, Report)',
    },
    identifier: {
      control: 'text',
      description: 'Government identifier (e.g., ESDC-CPP-001)',
    },
    compact: {
      control: 'boolean',
      description: 'Compact layout for tight spaces',
    },
  },
};

export default meta;
type Story = StoryObj<GCPageDetails>;

/**
 * Default page details with all metadata fields.
 * Displays at the bottom of content pages.
 */
export const Default: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h1>Employment Insurance Benefits</h1>
      <p>
        Employment Insurance (EI) provides temporary income support to unemployed Canadians while they look for work
        or upgrade their skills.
      </p>
      <p>
        You may be eligible for EI regular benefits if you have lost your job through no fault of your own (for
        example, due to shortage of work, seasonal or mass lay-offs) and you have been without work and without pay
        for at least seven consecutive days in the last 52 weeks.
      </p>

      <gc-page-details
        date-modified="2025-12-07"
        publisher="Employment and Social Development Canada"
        content-type="Guidance"
        identifier="ESDC-EI-001"
      ></gc-page-details>
    </div>
  `,
};

/**
 * Minimal page details with only date modified.
 * Most common use case for simple content pages.
 */
export const DateOnly: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h1>Privacy Policy</h1>
      <p>This privacy policy explains how we collect, use, and protect your personal information.</p>

      <gc-page-details date-modified="2025-11-15"></gc-page-details>
    </div>
  `,
};

/**
 * Health Canada page with all metadata.
 * Example from a different department.
 */
export const HealthCanada: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h1>COVID-19 Vaccination Guidance</h1>
      <p>Information about COVID-19 vaccines approved for use in Canada.</p>

      <gc-page-details
        date-modified="2025-12-01"
        publisher="Health Canada"
        content-type="Public Health Guidance"
        identifier="HC-COVID-2025-001"
      ></gc-page-details>
    </div>
  `,
};

/**
 * Immigration page with bilingual publisher.
 * Example from IRCC.
 */
export const Immigration: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h1>Apply for a Visitor Visa</h1>
      <p>Find out if you need a visitor visa and how to apply.</p>

      <gc-page-details
        date-modified="2025-10-20"
        publisher="Immigration, Refugees and Citizenship Canada"
        content-type="Application Form"
        identifier="IRCC-VISA-123"
      ></gc-page-details>
    </div>
  `,
};

/**
 * Compact mode for sidebars or tight layouts.
 * Reduces spacing and font size.
 */
export const Compact: Story = {
  render: () => html`
    <div style="max-width: 300px; border: 1px solid #e0e0e0; padding: 1rem;">
      <h3>Related Information</h3>
      <p>Quick reference guide for benefit eligibility.</p>

      <gc-page-details
        date-modified="2025-12-07"
        publisher="ESDC"
        content-type="Quick Reference"
        compact
      ></gc-page-details>
    </div>
  `,
};

/**
 * Report with identifier and content type.
 * Example of a formal government report.
 */
export const Report: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h1>Annual Report on Employment Insurance 2024-2025</h1>
      <p>This report provides statistics and analysis of Employment Insurance program performance.</p>

      <gc-page-details
        date-modified="2025-09-30"
        publisher="Employment and Social Development Canada"
        content-type="Annual Report"
        identifier="ESDC-EI-AR-2025"
      ></gc-page-details>
    </div>
  `,
};

/**
 * Form page with metadata.
 * Example of an application or submission form.
 */
export const Form: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h1>Canada Pension Plan Retirement Application</h1>
      <p>Apply for your CPP retirement pension online.</p>

      <gc-page-details
        date-modified="2025-11-28"
        publisher="Employment and Social Development Canada"
        content-type="Online Form"
        identifier="ESDC-CPP-RETIRE-FORM"
      ></gc-page-details>
    </div>
  `,
};

/**
 * Policy document with full metadata.
 * Example of an official policy or regulation.
 */
export const Policy: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h1>Employment Insurance Premium Rate Policy</h1>
      <p>Information about how EI premium rates are determined.</p>

      <gc-page-details
        date-modified="2025-01-15"
        publisher="Employment and Social Development Canada"
        content-type="Policy Document"
        identifier="ESDC-EI-POLICY-2025"
      ></gc-page-details>
    </div>
  `,
};

/**
 * French language version (fr-CA).
 * All labels and date formatting in French.
 */
export const French: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h1>Prestations d'assurance-emploi</h1>
      <p>
        L'assurance-emploi (AE) fournit un soutien temporaire du revenu aux Canadiens sans emploi pendant qu'ils
        cherchent du travail ou perfectionnent leurs compétences.
      </p>

      <gc-page-details
        date-modified="2025-12-07"
        publisher="Emploi et Développement social Canada"
        content-type="Guide"
        identifier="EDSC-AE-001"
        locale="fr-CA"
      ></gc-page-details>
    </div>
  `,
};

/**
 * Empty state - no metadata provided.
 * Component renders nothing when no props are set.
 */
export const Empty: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h1>Test Page</h1>
      <p>This page has no metadata configured.</p>

      <gc-page-details></gc-page-details>

      <p style="color: #666; font-style: italic; margin-top: 1rem;">
        ↑ The page details component is present but renders nothing (no metadata provided).
      </p>
    </div>
  `,
};

/**
 * Various date formats.
 * Shows how different ISO dates are formatted.
 */
export const DateFormats: Story = {
  render: () => html`
    <div style="max-width: 800px; display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Recent Update (December 2025)</h3>
        <gc-page-details date-modified="2025-12-07"></gc-page-details>
      </div>

      <div>
        <h3>Mid-Year Update (June 2025)</h3>
        <gc-page-details date-modified="2025-06-15"></gc-page-details>
      </div>

      <div>
        <h3>Start of Year (January 2025)</h3>
        <gc-page-details date-modified="2025-01-01"></gc-page-details>
      </div>

      <div>
        <h3>Previous Year (December 2024)</h3>
        <gc-page-details date-modified="2024-12-31"></gc-page-details>
      </div>
    </div>
  `,
};

/**
 * Different publisher names.
 * Shows various government department names.
 */
export const Publishers: Story = {
  render: () => html`
    <div style="max-width: 800px; display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Employment and Social Development Canada (ESDC)</h3>
        <gc-page-details
          date-modified="2025-12-07"
          publisher="Employment and Social Development Canada"
        ></gc-page-details>
      </div>

      <div>
        <h3>Health Canada</h3>
        <gc-page-details date-modified="2025-12-07" publisher="Health Canada"></gc-page-details>
      </div>

      <div>
        <h3>Immigration, Refugees and Citizenship Canada (IRCC)</h3>
        <gc-page-details
          date-modified="2025-12-07"
          publisher="Immigration, Refugees and Citizenship Canada"
        ></gc-page-details>
      </div>

      <div>
        <h3>Canada Revenue Agency (CRA)</h3>
        <gc-page-details date-modified="2025-12-07" publisher="Canada Revenue Agency"></gc-page-details>
      </div>

      <div>
        <h3>Public Services and Procurement Canada (PSPC)</h3>
        <gc-page-details
          date-modified="2025-12-07"
          publisher="Public Services and Procurement Canada"
        ></gc-page-details>
      </div>
    </div>
  `,
};

/**
 * Different content types.
 * Shows various government content classifications.
 */
export const ContentTypes: Story = {
  render: () => html`
    <div style="max-width: 800px; display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Guidance</h3>
        <gc-page-details date-modified="2025-12-07" content-type="Guidance"></gc-page-details>
      </div>

      <div>
        <h3>Form</h3>
        <gc-page-details date-modified="2025-12-07" content-type="Online Form"></gc-page-details>
      </div>

      <div>
        <h3>Report</h3>
        <gc-page-details date-modified="2025-12-07" content-type="Annual Report"></gc-page-details>
      </div>

      <div>
        <h3>Policy</h3>
        <gc-page-details date-modified="2025-12-07" content-type="Policy Document"></gc-page-details>
      </div>

      <div>
        <h3>Regulation</h3>
        <gc-page-details date-modified="2025-12-07" content-type="Regulation"></gc-page-details>
      </div>

      <div>
        <h3>Act</h3>
        <gc-page-details date-modified="2025-12-07" content-type="Act of Parliament"></gc-page-details>
      </div>
    </div>
  `,
};

/**
 * Event tracking demonstration.
 * Shows the gc-page-details-ready event.
 */
export const EventTracking: Story = {
  render: () => {
    const logEvent = (eventName: string) => {
      const log = document.getElementById('page-details-event-log');
      if (log) {
        const entry = document.createElement('div');
        entry.style.padding = '0.5rem';
        entry.style.borderBottom = '1px solid #e0e0e0';
        entry.innerHTML = `
          <strong>${eventName}</strong>
          <br><small>${new Date().toLocaleTimeString()}</small>
        `;
        log.insertBefore(entry, log.firstChild);
        // Keep only last 5 events
        while (log.children.length > 5) {
          log.removeChild(log.lastChild!);
        }
      }
    };

    setTimeout(() => {
      const pageDetails = document.querySelector('gc-page-details');
      if (pageDetails) {
        pageDetails.addEventListener('gc-page-details-ready', () => {
          logEvent('gc-page-details-ready');
        });
      }
    }, 100);

    return html`
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div>
          <h3>Page with Details</h3>
          <p>Page metadata is displayed below.</p>

          <gc-page-details
            date-modified="2025-12-07"
            publisher="Employment and Social Development Canada"
            content-type="Guidance"
            identifier="ESDC-TEST-001"
          ></gc-page-details>
        </div>
        <div>
          <h3>Event Log</h3>
          <div
            id="page-details-event-log"
            style="
              border: 1px solid #e0e0e0;
              border-radius: 4px;
              max-height: 200px;
              overflow-y: auto;
              font-family: monospace;
              font-size: 0.875rem;
            "
          ></div>
        </div>
      </div>
    `;
  },
};

/**
 * Accessibility features demonstration.
 * Shows semantic HTML structure and ARIA attributes.
 */
export const AccessibilityDemo: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h3>Accessibility Features</h3>
      <gc-page-details
        date-modified="2025-12-07"
        publisher="Employment and Social Development Canada"
        content-type="Guidance"
        identifier="ESDC-TEST-001"
      ></gc-page-details>

      <div style="margin-top: 2rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;">
        <h4>Semantic HTML Structure</h4>
        <ul style="margin: 0; padding-left: 1.5rem;">
          <li><code>&lt;section&gt;</code> - Semantic container for page details</li>
          <li><code>&lt;dl&gt;</code> - Description list for metadata pairs</li>
          <li><code>&lt;dt&gt;</code> - Term/label for each metadata field</li>
          <li><code>&lt;dd&gt;</code> - Value for each metadata field</li>
          <li><code>&lt;time datetime="..."&gt;</code> - Machine-readable date with human-readable display</li>
        </ul>

        <h4 style="margin-top: 1rem;">ARIA Attributes</h4>
        <ul style="margin: 0; padding-left: 1.5rem;">
          <li><code>aria-label</code> on section - Provides accessible name</li>
          <li><code>datetime</code> attribute - ISO 8601 format for machines</li>
        </ul>

        <h4 style="margin-top: 1rem;">Visual Design</h4>
        <ul style="margin: 0; padding-left: 1.5rem;">
          <li>Clear visual separation with top border</li>
          <li>Bold labels for scannability</li>
          <li>Sufficient spacing between items</li>
          <li>High contrast mode support</li>
          <li>Print-friendly styling</li>
        </ul>
      </div>
    </div>
  `,
};
