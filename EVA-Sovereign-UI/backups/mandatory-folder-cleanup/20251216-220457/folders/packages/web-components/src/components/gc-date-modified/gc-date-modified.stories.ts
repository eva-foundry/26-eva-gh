import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-date-modified';
import type { GCDateModified } from './gc-date-modified';

const meta: Meta<GCDateModified> = {
  title: 'Components/GC Date Modified',
  component: 'gc-date-modified',
  tags: ['autodocs'],
  argTypes: {
    date: {
      control: 'text',
      description: 'Date in ISO 8601 format (YYYY-MM-DD or with time)',
    },
    format: {
      control: { type: 'select' },
      options: ['long', 'short', 'iso'],
      description: 'Date display format',
    },
    'hide-label': {
      control: 'boolean',
      description: 'Hide the "Date modified:" label',
    },
    inline: {
      control: 'boolean',
      description: 'Display label and date on same line',
    },
  },
};

export default meta;
type Story = StoryObj<GCDateModified>;

/**
 * Default date modified with long format.
 * Most common usage at bottom of content pages.
 */
export const Default: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h1>Employment Insurance Regular Benefits</h1>
      <p>Information about EI regular benefits for unemployed Canadians.</p>
      <p>
        You may be eligible for EI regular benefits if you have lost your job through no fault of your own and have
        been without work for at least seven consecutive days.
      </p>

      <gc-date-modified date="2025-12-07"></gc-date-modified>
    </div>
  `,
};

/**
 * Short date format (numeric: YYYY-MM-DD).
 * Compact display for limited space.
 */
export const ShortFormat: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h2>Quick Reference Guide</h2>
      <p>Essential information about CPP retirement benefits.</p>

      <gc-date-modified date="2025-12-07" format="short"></gc-date-modified>
    </div>
  `,
};

/**
 * ISO format (YYYY-MM-DD).
 * Machine-readable format for technical content.
 */
export const ISOFormat: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h2>API Documentation</h2>
      <p>Technical specifications for the benefits API.</p>

      <gc-date-modified date="2025-12-07" format="iso"></gc-date-modified>
    </div>
  `,
};

/**
 * Without label (date only).
 * Useful when context is clear or in compact layouts.
 */
export const NoLabel: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h2>News Article</h2>
      <p>Recent updates to the Canada Pension Plan.</p>
      <p style="color: #666; font-size: 0.875rem;">
        Last updated: <gc-date-modified date="2025-12-07" hide-label></gc-date-modified>
      </p>
    </div>
  `,
};

/**
 * Inline mode (label and date on same line).
 * Useful for flowing with surrounding text.
 */
export const Inline: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h2>Policy Document</h2>
      <p>
        This policy document was last reviewed on
        <gc-date-modified date="2025-12-07" inline hide-label></gc-date-modified>
        and remains current.
      </p>
    </div>
  `,
};

/**
 * Date with time component.
 * Preserves full timestamp in datetime attribute.
 */
export const WithTime: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h2>Breaking News</h2>
      <p>Important update to benefit eligibility requirements.</p>

      <gc-date-modified date="2025-12-07T14:30:00"></gc-date-modified>
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
      <h1>Prestations régulières d'assurance-emploi</h1>
      <p>Information sur les prestations régulières d'AE pour les Canadiens sans emploi.</p>

      <gc-date-modified date="2025-12-07" locale="fr-CA"></gc-date-modified>
    </div>
  `,
};

/**
 * Recent updates timeline.
 * Shows various dates with different formats.
 */
export const Timeline: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h2>Document History</h2>

      <div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;">
        <div>
          <strong>Current Version</strong>
          <gc-date-modified date="2025-12-07"></gc-date-modified>
        </div>

        <div>
          <strong>Previous Update</strong>
          <gc-date-modified date="2025-11-15"></gc-date-modified>
        </div>

        <div>
          <strong>Major Revision</strong>
          <gc-date-modified date="2025-09-01"></gc-date-modified>
        </div>

        <div>
          <strong>Initial Publication</strong>
          <gc-date-modified date="2025-01-01"></gc-date-modified>
        </div>
      </div>
    </div>
  `,
};

/**
 * Comparison of all formats.
 * Shows long, short, and ISO formats side by side.
 */
export const AllFormats: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h2>Date Format Examples</h2>

      <div style="display: grid; gap: 1.5rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;">
        <div>
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem;">Long Format (Default)</h3>
          <gc-date-modified date="2025-12-07" format="long"></gc-date-modified>
        </div>

        <div>
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem;">Short Format</h3>
          <gc-date-modified date="2025-12-07" format="short"></gc-date-modified>
        </div>

        <div>
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem;">ISO Format</h3>
          <gc-date-modified date="2025-12-07" format="iso"></gc-date-modified>
        </div>
      </div>
    </div>
  `,
};

/**
 * Sidebar usage with compact styling.
 * Common pattern in page layouts.
 */
export const Sidebar: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; max-width: 1000px;">
      <div>
        <h1>Main Content</h1>
        <p>Primary article or page content goes here.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <aside style="padding: 1rem; background: #f5f5f5; border-radius: 4px;">
        <h3 style="margin-top: 0;">Page Information</h3>
        <gc-date-modified date="2025-12-07"></gc-date-modified>

        <h3 style="margin-top: 1.5rem;">Previous Version</h3>
        <gc-date-modified date="2025-11-01"></gc-date-modified>
      </aside>
    </div>
  `,
};

/**
 * Footer usage pattern.
 * Typical placement at page bottom with other metadata.
 */
export const Footer: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <article>
        <h1>Canada Pension Plan Overview</h1>
        <p>The Canada Pension Plan (CPP) is a contributory, earnings-related social insurance program.</p>
        <p>
          It forms one of the three pillars of Canada's retirement income system and is responsible for providing
          income support to contributors and their families.
        </p>
      </article>

      <footer
        style="margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #e0e0e0; display: flex; flex-direction: column; gap: 0.5rem;"
      >
        <gc-date-modified date="2025-12-07"></gc-date-modified>
        <div style="font-size: 0.875rem; color: #666;">
          Publisher: Employment and Social Development Canada
        </div>
      </footer>
    </div>
  `,
};

/**
 * Event tracking demonstration.
 * Shows the gc-date-modified-ready event.
 */
export const EventTracking: Story = {
  render: () => {
    const logEvent = (eventName: string) => {
      const log = document.getElementById('date-modified-event-log');
      if (log) {
        const entry = document.createElement('div');
        entry.style.padding = '0.5rem';
        entry.style.borderBottom = '1px solid #e0e0e0';
        entry.innerHTML = `
          <strong>${eventName}</strong>
          <br><small>${new Date().toLocaleTimeString()}</small>
        `;
        log.insertBefore(entry, log.firstChild);
        while (log.children.length > 5) {
          log.removeChild(log.lastChild!);
        }
      }
    };

    setTimeout(() => {
      const dateModified = document.querySelector('gc-date-modified');
      if (dateModified) {
        dateModified.addEventListener('gc-date-modified-ready', () => {
          logEvent('gc-date-modified-ready');
        });
      }
    }, 100);

    return html`
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div>
          <h3>Date Modified</h3>
          <gc-date-modified date="2025-12-07"></gc-date-modified>
        </div>
        <div>
          <h3>Event Log</h3>
          <div
            id="date-modified-event-log"
            style="border: 1px solid #e0e0e0; border-radius: 4px; max-height: 200px; overflow-y: auto; font-family: monospace; font-size: 0.875rem;"
          ></div>
        </div>
      </div>
    `;
  },
};

/**
 * Accessibility features demonstration.
 * Shows semantic HTML structure and machine-readable formats.
 */
export const AccessibilityDemo: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h3>Date Modified Component</h3>
      <gc-date-modified date="2025-12-07T14:30:00"></gc-date-modified>

      <div style="margin-top: 2rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;">
        <h4>Semantic HTML</h4>
        <ul style="margin: 0; padding-left: 1.5rem;">
          <li><code>&lt;time datetime="..."&gt;</code> - Semantic time element with machine-readable format</li>
          <li><code>datetime</code> attribute - ISO 8601 format for machines (YYYY-MM-DD or with time)</li>
          <li>Human-readable text inside time element (formatted for locale)</li>
        </ul>

        <h4 style="margin-top: 1rem;">Accessibility Features</h4>
        <ul style="margin: 0; padding-left: 1.5rem;">
          <li>Clear "Date modified:" label for context</li>
          <li>Machine-readable datetime attribute for assistive tech</li>
          <li>Locale-aware date formatting (EN-CA, FR-CA)</li>
          <li>Multiple format options (long, short, ISO)</li>
          <li>High contrast mode support</li>
          <li>Print-friendly styling</li>
        </ul>

        <h4 style="margin-top: 1rem;">Format Options</h4>
        <ul style="margin: 0; padding-left: 1.5rem;">
          <li><strong>Long</strong>: December 7, 2025 (most readable)</li>
          <li><strong>Short</strong>: 2025-12-07 or 12/07/2025 (compact)</li>
          <li><strong>ISO</strong>: 2025-12-07 (technical/API documentation)</li>
        </ul>
      </div>
    </div>
  `,
};
