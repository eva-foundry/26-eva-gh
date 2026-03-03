import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-accordion';
import type { GCAccordion } from './gc-accordion';

describe('gc-accordion', () => {
  let element: GCAccordion;

  beforeEach(async () => {
    element = await fixture(html`<gc-accordion></gc-accordion>`);
  });

  it('renders accordion container', () => {
    const accordion = element.shadowRoot?.querySelector('.accordion');
    expect(accordion).to.exist;
  });

  it('renders no items by default', () => {
    const items = element.shadowRoot?.querySelectorAll('.accordion-item');
    expect(items?.length).to.equal(0);
  });

  it('renders accordion items', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' },
      { id: '2', heading: 'Item 2', content: 'Content 2' }
    ];
    await element.updateComplete;

    const items = element.shadowRoot?.querySelectorAll('.accordion-item');
    expect(items?.length).to.equal(2);
  });

  it('renders item headings', async () => {
    element.items = [
      { id: '1', heading: 'First Item', content: 'Content' }
    ];
    await element.updateComplete;

    const heading = element.shadowRoot?.querySelector('.accordion-header');
    expect(heading?.textContent?.trim()).to.include('First Item');
  });

  it('all items collapsed by default', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' },
      { id: '2', heading: 'Item 2', content: 'Content 2' }
    ];
    await element.updateComplete;

    const headers = element.shadowRoot?.querySelectorAll('.accordion-header');
    headers?.forEach(header => {
      expect(header.getAttribute('aria-expanded')).to.equal('false');
    });
  });

  it('expands item on click', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const header = element.shadowRoot?.querySelector('.accordion-header') as HTMLButtonElement;
    header.click();
    await element.updateComplete;

    expect(header.getAttribute('aria-expanded')).to.equal('true');
  });

  it('collapses expanded item on click', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const header = element.shadowRoot?.querySelector('.accordion-header') as HTMLButtonElement;
    header.click();
    await element.updateComplete;
    
    expect(header.getAttribute('aria-expanded')).to.equal('true');

    header.click();
    await element.updateComplete;

    expect(header.getAttribute('aria-expanded')).to.equal('false');
  });

  it('allows multiple items expanded when allowMultiple=true', async () => {
    element.allowMultiple = true;
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' },
      { id: '2', heading: 'Item 2', content: 'Content 2' }
    ];
    await element.updateComplete;

    const headers = element.shadowRoot?.querySelectorAll('.accordion-header') as NodeListOf<HTMLButtonElement>;
    headers[0].click();
    await element.updateComplete;
    headers[1].click();
    await element.updateComplete;

    expect(headers[0].getAttribute('aria-expanded')).to.equal('true');
    expect(headers[1].getAttribute('aria-expanded')).to.equal('true');
  });

  it('collapses other items when allowMultiple=false', async () => {
    element.allowMultiple = false;
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' },
      { id: '2', heading: 'Item 2', content: 'Content 2' }
    ];
    await element.updateComplete;

    const headers = element.shadowRoot?.querySelectorAll('.accordion-header') as NodeListOf<HTMLButtonElement>;
    headers[0].click();
    await element.updateComplete;
    headers[1].click();
    await element.updateComplete;

    expect(headers[0].getAttribute('aria-expanded')).to.equal('false');
    expect(headers[1].getAttribute('aria-expanded')).to.equal('true');
  });

  it('emits gc-accordion-toggle event', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-accordion-toggle', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const header = element.shadowRoot?.querySelector('.accordion-header') as HTMLButtonElement;
    header.click();

    expect(eventDetail).to.exist;
  });

  it('includes itemId in event', async () => {
    element.items = [
      { id: 'test-id', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-accordion-toggle', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const header = element.shadowRoot?.querySelector('.accordion-header') as HTMLButtonElement;
    header.click();

    expect((eventDetail as { itemId: string })?.itemId).to.equal('test-id');
  });

  it('includes expanded state in event', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-accordion-toggle', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const header = element.shadowRoot?.querySelector('.accordion-header') as HTMLButtonElement;
    header.click();

    expect((eventDetail as { expanded: boolean })?.expanded).to.be.true;
  });

  it('includes timestamp in event', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-accordion-toggle', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const header = element.shadowRoot?.querySelector('.accordion-header') as HTMLButtonElement;
    header.click();

    expect((eventDetail as { timestamp: string })?.timestamp).to.be.a('string');
  });

  it('renders panel with content', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Test Content' }
    ];
    await element.updateComplete;

    const content = element.shadowRoot?.querySelector('.accordion-content');
    expect(content?.textContent?.trim()).to.equal('Test Content');
  });

  it('panel has aria-hidden when collapsed', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const panel = element.shadowRoot?.querySelector('.accordion-panel');
    expect(panel?.getAttribute('aria-hidden')).to.equal('true');
  });

  it('panel removes aria-hidden when expanded', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const header = element.shadowRoot?.querySelector('.accordion-header') as HTMLButtonElement;
    header.click();
    await element.updateComplete;

    const panel = element.shadowRoot?.querySelector('.accordion-panel');
    expect(panel?.getAttribute('aria-hidden')).to.equal('false');
  });

  it('header has aria-controls', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const header = element.shadowRoot?.querySelector('.accordion-header');
    expect(header?.getAttribute('aria-controls')).to.equal('panel-1');
  });

  it('panel has aria-labelledby', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const panel = element.shadowRoot?.querySelector('.accordion-panel');
    expect(panel?.getAttribute('aria-labelledby')).to.equal('header-1');
  });

  it('renders icon', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.accordion-icon');
    expect(icon).to.exist;
  });

  it('icon is SVG', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.accordion-icon');
    expect(icon?.tagName.toLowerCase()).to.equal('svg');
  });

  it('icon has aria-hidden', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.accordion-icon');
    expect(icon?.getAttribute('aria-hidden')).to.equal('true');
  });

  it('header is button element', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const header = element.shadowRoot?.querySelector('.accordion-header');
    expect(header?.tagName.toLowerCase()).to.equal('button');
  });

  it('header has type="button"', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const header = element.shadowRoot?.querySelector('.accordion-header');
    expect(header?.getAttribute('type')).to.equal('button');
  });

  it('panel has role="region"', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const panel = element.shadowRoot?.querySelector('.accordion-panel');
    expect(panel?.getAttribute('role')).to.equal('region');
  });

  it('applies proper CSS classes', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const accordion = element.shadowRoot?.querySelector('.accordion');
    expect(accordion?.classList.contains('accordion')).to.be.true;

    const item = element.shadowRoot?.querySelector('.accordion-item');
    expect(item?.classList.contains('accordion-item')).to.be.true;

    const header = element.shadowRoot?.querySelector('.accordion-header');
    expect(header?.classList.contains('accordion-header')).to.be.true;

    const panel = element.shadowRoot?.querySelector('.accordion-panel');
    expect(panel?.classList.contains('accordion-panel')).to.be.true;
  });

  it('heading is wrapped in h3', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const h3 = element.shadowRoot?.querySelector('h3');
    expect(h3).to.exist;
    expect(h3?.querySelector('.accordion-header')).to.exist;
  });

  it('supports initially expanded items', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1', expanded: true }
    ];
    await element.updateComplete;

    const header = element.shadowRoot?.querySelector('.accordion-header');
    expect(header?.getAttribute('aria-expanded')).to.equal('true');
  });

  it('updates when items change', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    let items = element.shadowRoot?.querySelectorAll('.accordion-item');
    expect(items?.length).to.equal(1);

    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' },
      { id: '2', heading: 'Item 2', content: 'Content 2' }
    ];
    await element.updateComplete;

    items = element.shadowRoot?.querySelectorAll('.accordion-item');
    expect(items?.length).to.equal(2);
  });

  it('maintains expanded state across updates', async () => {
    element.items = [
      { id: '1', heading: 'Item 1', content: 'Content 1' },
      { id: '2', heading: 'Item 2', content: 'Content 2' }
    ];
    await element.updateComplete;

    const headers = element.shadowRoot?.querySelectorAll('.accordion-header') as NodeListOf<HTMLButtonElement>;
    headers[0].click();
    await element.updateComplete;

    expect(headers[0].getAttribute('aria-expanded')).to.equal('true');

    element.items = [...element.items];
    await element.updateComplete;

    const updatedHeaders = element.shadowRoot?.querySelectorAll('.accordion-header') as NodeListOf<HTMLButtonElement>;
    expect(updatedHeaders[0].getAttribute('aria-expanded')).to.equal('true');
  });
});
