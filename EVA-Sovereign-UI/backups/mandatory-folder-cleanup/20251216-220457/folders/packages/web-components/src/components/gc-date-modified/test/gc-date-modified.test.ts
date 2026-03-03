import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import { GCDateModified } from '../gc-date-modified';
import '../gc-date-modified';

describe('gc-date-modified', () => {
  describe('Initialization', () => {
    it('renders with default properties', async () => {
      const el = await fixture<GCDateModified>(html`<gc-date-modified></gc-date-modified>`);
      expect(el).to.exist;
      expect(el.date).to.be.undefined;
      expect(el.format).to.equal('long');
      expect(el.hideLabel).to.be.false;
      expect(el.inline).to.be.false;
    });

    it('renders with custom date', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07"></gc-date-modified>
      `);
      expect(el.date).to.equal('2025-12-07');
    });

    it('has correct shadow DOM structure', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07"></gc-date-modified>
      `);
      const container = el.shadowRoot!.querySelector('.date-modified');
      expect(container).to.exist;
    });

    it('is defined as gc-date-modified', () => {
      const el = document.createElement('gc-date-modified');
      expect(el).to.be.instanceOf(GCDateModified);
    });

    it('emits gc-date-modified-ready event on initialization', async () => {
      const el = document.createElement('gc-date-modified') as GCDateModified;
      setTimeout(() => document.body.appendChild(el));
      const event = await oneEvent(el, 'gc-date-modified-ready');
      expect(event).to.exist;
      expect(event.type).to.equal('gc-date-modified-ready');
      document.body.removeChild(el);
    });
  });

  describe('Date Display', () => {
    it('renders date when provided', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07"></gc-date-modified>
      `);
      const time = el.shadowRoot!.querySelector('time');
      expect(time).to.exist;
      expect(time?.getAttribute('datetime')).to.equal('2025-12-07');
    });

    it('does not render when date is missing', async () => {
      const el = await fixture<GCDateModified>(html`<gc-date-modified></gc-date-modified>`);
      const container = el.shadowRoot!.querySelector('.date-modified');
      expect(container).to.not.exist;
    });

    it('handles date with time component', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07T14:30:00"></gc-date-modified>
      `);
      const time = el.shadowRoot!.querySelector('time');
      expect(time?.getAttribute('datetime')).to.equal('2025-12-07T14:30:00');
    });

    it('handles invalid date gracefully', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="invalid-date"></gc-date-modified>
      `);
      const time = el.shadowRoot!.querySelector('time');
      expect(time).to.exist;
      expect(time?.textContent?.trim()).to.equal('invalid-date');
    });
  });

  describe('Date Formats', () => {
    it('formats date in long format by default (en-CA)', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07" locale="en-CA"></gc-date-modified>
      `);
      const time = el.shadowRoot!.querySelector('time');
      expect(time?.textContent?.trim()).to.include('December');
      expect(time?.textContent?.trim()).to.include('2025');
    });

    it('formats date in short format (YYYY-MM-DD)', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07" format="short"></gc-date-modified>
      `);
      const time = el.shadowRoot!.querySelector('time');
      const text = time?.textContent?.trim() || '';
      // Short format should be numeric
      expect(text).to.match(/\d{4}[-/]\d{2}[-/]\d{2}/);
    });

    it('formats date in ISO format (YYYY-MM-DD)', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07" format="iso"></gc-date-modified>
      `);
      const time = el.shadowRoot!.querySelector('time');
      expect(time?.textContent?.trim()).to.equal('2025-12-07');
    });

    it('formats date in French (fr-CA)', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07" locale="fr-CA"></gc-date-modified>
      `);
      const time = el.shadowRoot!.querySelector('time');
      expect(time?.textContent?.trim()).to.include('décembre');
      expect(time?.textContent?.trim()).to.include('2025');
    });
  });

  describe('Label Display', () => {
    it('shows label by default', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07"></gc-date-modified>
      `);
      const label = el.shadowRoot!.querySelector('.date-label');
      expect(label).to.exist;
    });

    it('hides label when hide-label is true', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07" hide-label></gc-date-modified>
      `);
      const label = el.shadowRoot!.querySelector('.date-label');
      expect(label).to.not.exist;
    });

    it('renders English label by default', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07" locale="en-CA"></gc-date-modified>
      `);
      const label = el.shadowRoot!.querySelector('.date-label');
      expect(label?.textContent?.trim().length).to.be.greaterThan(0);
    });

    it('renders French label when locale is fr-CA', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07" locale="fr-CA"></gc-date-modified>
      `);
      const label = el.shadowRoot!.querySelector('.date-label');
      expect(label?.textContent?.trim().length).to.be.greaterThan(0);
    });
  });

  describe('Inline Mode', () => {
    it('applies inline attribute', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07" inline></gc-date-modified>
      `);
      expect(el.inline).to.be.true;
      expect(el.hasAttribute('inline')).to.be.true;
    });

    it('reflects inline attribute to host', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07" inline></gc-date-modified>
      `);
      expect(el.getAttribute('inline')).to.equal('');
    });
  });

  describe('Accessibility', () => {
    it('uses semantic time element', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07"></gc-date-modified>
      `);
      const time = el.shadowRoot!.querySelector('time');
      expect(time).to.exist;
    });

    it('has datetime attribute with ISO format', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07"></gc-date-modified>
      `);
      const time = el.shadowRoot!.querySelector('time');
      expect(time?.hasAttribute('datetime')).to.be.true;
      expect(time?.getAttribute('datetime')).to.equal('2025-12-07');
    });

    it('preserves full datetime in attribute', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07T14:30:00"></gc-date-modified>
      `);
      const time = el.shadowRoot!.querySelector('time');
      expect(time?.getAttribute('datetime')).to.equal('2025-12-07T14:30:00');
    });
  });

  describe('Bilingual Support', () => {
    it('renders English label by default', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07"></gc-date-modified>
      `);
      const text = el.shadowRoot!.textContent || '';
      expect(text.trim().length).to.be.greaterThan(0);
    });

    it('renders French label when locale is fr-CA', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07" locale="fr-CA"></gc-date-modified>
      `);
      const text = el.shadowRoot!.textContent || '';
      expect(text.trim().length).to.be.greaterThan(0);
    });
  });

  describe('Event Emission', () => {
    it('emits gc-date-modified-ready event', async () => {
      const el = document.createElement('gc-date-modified') as GCDateModified;
      setTimeout(() => document.body.appendChild(el));
      const event = await oneEvent(el, 'gc-date-modified-ready');
      expect(event.type).to.equal('gc-date-modified-ready');
      document.body.removeChild(el);
    });

    it('ready event bubbles', async () => {
      const el = document.createElement('gc-date-modified') as GCDateModified;
      setTimeout(() => document.body.appendChild(el));
      const event = await oneEvent(el, 'gc-date-modified-ready');
      expect(event.bubbles).to.be.true;
      document.body.removeChild(el);
    });

    it('ready event is composed', async () => {
      const el = document.createElement('gc-date-modified') as GCDateModified;
      setTimeout(() => document.body.appendChild(el));
      const event = await oneEvent(el, 'gc-date-modified-ready');
      expect(event.composed).to.be.true;
      document.body.removeChild(el);
    });
  });

  describe('GC Design System Compliance', () => {
    it('uses Lato font family', () => {
      expect(GCDateModified.styles.cssText).to.include('Lato');
    });

    it('uses GC blue color (#284162)', () => {
      expect(GCDateModified.styles.cssText).to.include('#284162');
    });

    it('has proper font size for metadata', () => {
      expect(GCDateModified.styles.cssText).to.include('0.875rem');
    });
  });

  describe('Performance', () => {
    it('renders under 100ms', async () => {
      const start = performance.now();
      await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07"></gc-date-modified>
      `);
      const duration = performance.now() - start;
      expect(duration).to.be.lessThan(100);
    });

    it('updates reactively when properties change', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07"></gc-date-modified>
      `);
      el.format = 'short';
      await el.updateComplete;
      const time = el.shadowRoot!.querySelector('time');
      const text = time?.textContent?.trim() || '';
      expect(text).to.match(/\d{4}[-/]\d{2}[-/]\d{2}/);
    });
  });

  describe('CSS Custom Properties', () => {
    it('exposes part="container" for styling', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07"></gc-date-modified>
      `);
      const container = el.shadowRoot!.querySelector('[part="container"]');
      expect(container).to.exist;
    });

    it('exposes part="label" for styling', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07"></gc-date-modified>
      `);
      const label = el.shadowRoot!.querySelector('[part="label"]');
      expect(label).to.exist;
    });

    it('exposes part="value" for styling', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07"></gc-date-modified>
      `);
      const value = el.shadowRoot!.querySelector('[part="value"]');
      expect(value).to.exist;
    });

    it('exposes part="time" for styling', async () => {
      const el = await fixture<GCDateModified>(html`
        <gc-date-modified date="2025-12-07"></gc-date-modified>
      `);
      const time = el.shadowRoot!.querySelector('[part="time"]');
      expect(time).to.exist;
    });
  });
});
