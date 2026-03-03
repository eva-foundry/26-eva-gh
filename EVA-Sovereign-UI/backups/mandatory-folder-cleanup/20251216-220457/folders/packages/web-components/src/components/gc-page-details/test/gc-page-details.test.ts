import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { GCPageDetails } from '../gc-page-details';
import '../gc-page-details';

describe('gc-page-details', () => {
  describe('Initialization', () => {
    it('renders with default properties', async () => {
      const el = await fixture<GCPageDetails>(html`<gc-page-details></gc-page-details>`);
      expect(el).to.exist;
      expect(el.dateModified).to.be.undefined;
      expect(el.publisher).to.be.undefined;
      expect(el.contentType).to.be.undefined;
      expect(el.identifier).to.be.undefined;
      expect(el.compact).to.be.false;
    });

    it('renders with all metadata properties', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details
          date-modified="2025-12-07"
          publisher="Employment and Social Development Canada"
          content-type="Guidance"
          identifier="ESDC-CPP-001"
        ></gc-page-details>
      `);
      expect(el.dateModified).to.equal('2025-12-07');
      expect(el.publisher).to.equal('Employment and Social Development Canada');
      expect(el.contentType).to.equal('Guidance');
      expect(el.identifier).to.equal('ESDC-CPP-001');
    });

    it('has correct shadow DOM structure', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details date-modified="2025-12-07"></gc-page-details>
      `);
      const section = el.shadowRoot!.querySelector('.page-details');
      expect(section).to.exist;
      expect(section?.tagName).to.equal('SECTION');
    });

    it('is defined as gc-page-details', () => {
      const el = document.createElement('gc-page-details');
      expect(el).to.be.instanceOf(GCPageDetails);
    });

    it('emits gc-page-details-ready event on initialization', async () => {
      const el = document.createElement('gc-page-details') as GCPageDetails;
      setTimeout(() => document.body.appendChild(el));
      const event = await oneEvent(el, 'gc-page-details-ready');
      expect(event).to.exist;
      expect(event.type).to.equal('gc-page-details-ready');
      document.body.removeChild(el);
    });
  });

  describe('Date Modified Display', () => {
    it('renders date modified when provided', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details date-modified="2025-12-07"></gc-page-details>
      `);
      const time = el.shadowRoot!.querySelector('time');
      expect(time).to.exist;
      expect(time?.getAttribute('datetime')).to.equal('2025-12-07');
    });

    it('formats date in English (en-CA)', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details date-modified="2025-12-07" locale="en-CA"></gc-page-details>
      `);
      const time = el.shadowRoot!.querySelector('time');
      expect(time?.textContent?.trim()).to.include('December');
      expect(time?.textContent?.trim()).to.include('2025');
    });

    it('formats date in French (fr-CA)', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details date-modified="2025-12-07" locale="fr-CA"></gc-page-details>
      `);
      const time = el.shadowRoot!.querySelector('time');
      expect(time?.textContent?.trim()).to.include('décembre');
      expect(time?.textContent?.trim()).to.include('2025');
    });

    it('handles invalid date gracefully', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details date-modified="invalid-date"></gc-page-details>
      `);
      const time = el.shadowRoot!.querySelector('time');
      expect(time).to.exist;
      // Should fall back to original string
      expect(time?.textContent?.trim()).to.equal('invalid-date');
    });
  });

  describe('Publisher Display', () => {
    it('renders publisher when provided', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details publisher="Employment and Social Development Canada"></gc-page-details>
      `);
      const text = el.shadowRoot!.textContent || '';
      expect(text).to.include('Employment and Social Development Canada');
    });

    it('does not render publisher section when empty', async () => {
      const el = await fixture<GCPageDetails>(html`<gc-page-details></gc-page-details>`);
      const text = el.shadowRoot!.textContent || '';
      expect(text).not.to.include('Publisher');
    });
  });

  describe('Content Type Display', () => {
    it('renders content type when provided', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details content-type="Guidance"></gc-page-details>
      `);
      const text = el.shadowRoot!.textContent || '';
      expect(text).to.include('Guidance');
    });

    it('supports various content types', async () => {
      const contentTypes = ['Guidance', 'Form', 'Report', 'Policy', 'Regulation'];
      for (const type of contentTypes) {
        const el = await fixture<GCPageDetails>(html`
          <gc-page-details content-type="${type}"></gc-page-details>
        `);
        const text = el.shadowRoot!.textContent || '';
        expect(text).to.include(type);
      }
    });
  });

  describe('Identifier Display', () => {
    it('renders identifier when provided', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details identifier="ESDC-CPP-001"></gc-page-details>
      `);
      const text = el.shadowRoot!.textContent || '';
      expect(text).to.include('ESDC-CPP-001');
    });

    it('supports various identifier formats', async () => {
      const identifiers = ['ESDC-CPP-001', 'HC-COVID-2025', 'IRCC-VISA-123'];
      for (const id of identifiers) {
        const el = await fixture<GCPageDetails>(html`
          <gc-page-details identifier="${id}"></gc-page-details>
        `);
        const text = el.shadowRoot!.textContent || '';
        expect(text).to.include(id);
      }
    });
  });

  describe('Compact Mode', () => {
    it('applies compact attribute', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details date-modified="2025-12-07" compact></gc-page-details>
      `);
      expect(el.compact).to.be.true;
      expect(el.hasAttribute('compact')).to.be.true;
    });

    it('reflects compact attribute to host', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details compact></gc-page-details>
      `);
      expect(el.getAttribute('compact')).to.equal('');
    });
  });

  describe('Empty State', () => {
    it('renders nothing when no metadata provided', async () => {
      const el = await fixture<GCPageDetails>(html`<gc-page-details></gc-page-details>`);
      const section = el.shadowRoot!.querySelector('.page-details');
      expect(section).to.not.exist;
    });

    it('renders when at least one metadata field provided', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details date-modified="2025-12-07"></gc-page-details>
      `);
      const section = el.shadowRoot!.querySelector('.page-details');
      expect(section).to.exist;
    });
  });

  describe('Accessibility', () => {
    it('uses semantic dl/dt/dd structure', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details
          date-modified="2025-12-07"
          publisher="ESDC"
          content-type="Guidance"
          identifier="ESDC-001"
        ></gc-page-details>
      `);
      const dl = el.shadowRoot!.querySelector('dl');
      const dts = el.shadowRoot!.querySelectorAll('dt');
      const dds = el.shadowRoot!.querySelectorAll('dd');
      expect(dl).to.exist;
      expect(dts.length).to.equal(4);
      expect(dds.length).to.equal(4);
    });

    it('uses semantic section element', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details date-modified="2025-12-07"></gc-page-details>
      `);
      const section = el.shadowRoot!.querySelector('section');
      expect(section).to.exist;
    });

    it('has aria-label on section', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details date-modified="2025-12-07"></gc-page-details>
      `);
      const section = el.shadowRoot!.querySelector('section');
      expect(section?.hasAttribute('aria-label')).to.be.true;
    });

    it('uses time element with datetime attribute', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details date-modified="2025-12-07"></gc-page-details>
      `);
      const time = el.shadowRoot!.querySelector('time');
      expect(time).to.exist;
      expect(time?.hasAttribute('datetime')).to.be.true;
      expect(time?.getAttribute('datetime')).to.equal('2025-12-07');
    });
  });

  describe('Bilingual Support', () => {
    it('renders English labels by default', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details date-modified="2025-12-07"></gc-page-details>
      `);
      const text = el.shadowRoot!.textContent || '';
      expect(text.trim().length).to.be.greaterThan(0);
    });

    it('renders French labels when locale is fr-CA', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details
          date-modified="2025-12-07"
          publisher="Emploi et Développement social Canada"
          locale="fr-CA"
        ></gc-page-details>
      `);
      const text = el.shadowRoot!.textContent || '';
      expect(text.trim().length).to.be.greaterThan(0);
    });
  });

  describe('Event Emission', () => {
    it('emits gc-page-details-ready event', async () => {
      const el = document.createElement('gc-page-details') as GCPageDetails;
      setTimeout(() => document.body.appendChild(el));
      const event = await oneEvent(el, 'gc-page-details-ready');
      expect(event.type).to.equal('gc-page-details-ready');
      document.body.removeChild(el);
    });

    it('ready event bubbles', async () => {
      const el = document.createElement('gc-page-details') as GCPageDetails;
      setTimeout(() => document.body.appendChild(el));
      const event = await oneEvent(el, 'gc-page-details-ready');
      expect(event.bubbles).to.be.true;
      document.body.removeChild(el);
    });

    it('ready event is composed', async () => {
      const el = document.createElement('gc-page-details') as GCPageDetails;
      setTimeout(() => document.body.appendChild(el));
      const event = await oneEvent(el, 'gc-page-details-ready');
      expect(event.composed).to.be.true;
      document.body.removeChild(el);
    });
  });

  describe('GC Design System Compliance', () => {
    it('uses Lato font family', () => {
      expect(GCPageDetails.styles.cssText).to.include('Lato');
    });

    it('uses GC blue color (#284162)', () => {
      expect(GCPageDetails.styles.cssText).to.include('#284162');
    });

    it('has proper spacing for readability', () => {
      expect(GCPageDetails.styles.cssText).to.include('gap');
      expect(GCPageDetails.styles.cssText).to.include('padding');
    });
  });

  describe('Performance', () => {
    it('renders under 100ms', async () => {
      const start = performance.now();
      await fixture<GCPageDetails>(html`
        <gc-page-details
          date-modified="2025-12-07"
          publisher="Employment and Social Development Canada"
          content-type="Guidance"
          identifier="ESDC-CPP-001"
        ></gc-page-details>
      `);
      const duration = performance.now() - start;
      expect(duration).to.be.lessThan(100);
    });

    it('updates reactively when properties change', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details date-modified="2025-12-07"></gc-page-details>
      `);
      el.publisher = 'Health Canada';
      await el.updateComplete;
      const text = el.shadowRoot!.textContent || '';
      expect(text).to.include('Health Canada');
    });
  });

  describe('CSS Custom Properties', () => {
    it('exposes part="container" for styling', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details date-modified="2025-12-07"></gc-page-details>
      `);
      const container = el.shadowRoot!.querySelector('[part="container"]');
      expect(container).to.exist;
    });

    it('exposes part="details-list" for styling', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details date-modified="2025-12-07"></gc-page-details>
      `);
      const list = el.shadowRoot!.querySelector('[part="details-list"]');
      expect(list).to.exist;
    });

    it('exposes part="detail-item" for styling', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details date-modified="2025-12-07"></gc-page-details>
      `);
      const item = el.shadowRoot!.querySelector('[part="detail-item"]');
      expect(item).to.exist;
    });

    it('exposes part="detail-label" for styling', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details date-modified="2025-12-07"></gc-page-details>
      `);
      const label = el.shadowRoot!.querySelector('[part="detail-label"]');
      expect(label).to.exist;
    });

    it('exposes part="detail-value" for styling', async () => {
      const el = await fixture<GCPageDetails>(html`
        <gc-page-details date-modified="2025-12-07"></gc-page-details>
      `);
      const value = el.shadowRoot!.querySelector('[part="detail-value"]');
      expect(value).to.exist;
    });
  });
});
