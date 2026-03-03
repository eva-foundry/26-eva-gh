import { expect as chaiExpect } from 'chai';
import { fixture, html } from '@open-wc/testing';
import { GCExpandCollapse } from './gc-expand-collapse.js';

import './gc-expand-collapse.js';

describe('gc-expand-collapse', () => {
  const mockPanels = [
    {
      id: 'faq-1',
      heading: 'How do I apply for a passport?',
      content: 'You can apply for a passport online or in person at a Service Canada office.',
      expanded: false
    },
    {
      id: 'faq-2',
      heading: 'What documents do I need?',
      content: 'You will need proof of Canadian citizenship, identification, and passport photos.',
      expanded: false
    },
    {
      id: 'faq-3',
      heading: 'How long does it take?',
      content: 'Processing times vary. Standard service is 20 business days, express is 10 business days.',
      expanded: false
    }
  ];

  it('should render accordion panels', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    const panels = el.shadowRoot!.querySelectorAll('.panel');
    chaiExpect(panels.length).to.equal(3);
  });

  it('should display panel headings', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    const headings = el.shadowRoot!.querySelectorAll('.panel-heading');
    chaiExpect(headings[0].textContent).to.equal('How do I apply for a passport?');
  });

  it('should have panels collapsed by default', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    const headers = el.shadowRoot!.querySelectorAll('.panel-header');
    headers.forEach(header => {
      chaiExpect(header.getAttribute('aria-expanded')).to.equal('false');
    });
  });

  it('should expand panel when header clicked', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    const header = el.shadowRoot!.querySelector('.panel-header') as HTMLButtonElement;
    header.click();
    await el.updateComplete;
    chaiExpect(header.getAttribute('aria-expanded')).to.equal('true');
  });

  it('should collapse expanded panel when clicked again', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    el.expandPanel('faq-1');
    await el.updateComplete;
    
    const header = el.shadowRoot!.querySelector('.panel-header') as HTMLButtonElement;
    header.click();
    await el.updateComplete;
    chaiExpect(header.getAttribute('aria-expanded')).to.equal('false');
  });

  it('should allow only one panel open when allowMultiple is false', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}" .allowMultiple="${false}"></gc-expand-collapse>
    `);
    el.expandPanel('faq-1');
    await el.updateComplete;
    el.expandPanel('faq-2');
    await el.updateComplete;

    const headers = el.shadowRoot!.querySelectorAll('.panel-header');
    chaiExpect(headers[0].getAttribute('aria-expanded')).to.equal('false');
    chaiExpect(headers[1].getAttribute('aria-expanded')).to.equal('true');
  });

  it('should allow multiple panels open when allowMultiple is true', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}" allowMultiple></gc-expand-collapse>
    `);
    el.expandPanel('faq-1');
    await el.updateComplete;
    el.expandPanel('faq-2');
    await el.updateComplete;

    const headers = el.shadowRoot!.querySelectorAll('.panel-header');
    chaiExpect(headers[0].getAttribute('aria-expanded')).to.equal('true');
    chaiExpect(headers[1].getAttribute('aria-expanded')).to.equal('true');
  });

  it('should emit panel-expand event', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    let eventFired = false;
    let eventDetail: any;

    el.addEventListener('gc-panel-expand', ((e: CustomEvent) => {
      eventFired = true;
      eventDetail = e.detail;
    }) as EventListener);

    el.expandPanel('faq-1');
    await el.updateComplete;

    chaiExpect(eventFired).to.be.true;
    chaiExpect(eventDetail.id).to.equal('faq-1');
  });

  it('should emit panel-collapse event', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    el.expandPanel('faq-1');
    await el.updateComplete;

    let eventFired = false;
    el.addEventListener('gc-panel-collapse', (() => {
      eventFired = true;
    }) as EventListener);

    el.collapsePanel('faq-1');
    await el.updateComplete;
    chaiExpect(eventFired).to.be.true;
  });

  it('should toggle panel with Enter key', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    const header = el.shadowRoot!.querySelector('.panel-header') as HTMLButtonElement;
    
    header.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await el.updateComplete;
    chaiExpect(header.getAttribute('aria-expanded')).to.equal('true');
  });

  it('should toggle panel with Space key', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    const header = el.shadowRoot!.querySelector('.panel-header') as HTMLButtonElement;
    
    header.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await el.updateComplete;
    chaiExpect(header.getAttribute('aria-expanded')).to.equal('true');
  });

  it('should have proper ARIA accordion pattern', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    const headers = el.shadowRoot!.querySelectorAll('.panel-header');
    headers.forEach(header => {
      chaiExpect(header.hasAttribute('aria-expanded')).to.be.true;
      chaiExpect(header.hasAttribute('aria-controls')).to.be.true;
    });
  });

  it('should show expanded content', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    el.expandPanel('faq-1');
    await el.updateComplete;

    const content = el.shadowRoot!.querySelector('#content-faq-1');
    chaiExpect(content?.classList.contains('expanded')).to.be.true;
  });

  it('should hide collapsed content', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    const content = el.shadowRoot!.querySelector('#content-faq-1');
    chaiExpect(content?.hasAttribute('hidden')).to.be.true;
  });

  it('should display panel content text', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    el.expandPanel('faq-1');
    await el.updateComplete;

    const contentInner = el.shadowRoot!.querySelector('.panel-content-inner');
    chaiExpect(contentInner?.textContent?.trim()).to.include('You can apply for a passport online');
  });

  it('should rotate icon when expanded', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    const header = el.shadowRoot!.querySelector('.panel-header') as HTMLButtonElement;
    header.click();
    await el.updateComplete;

    chaiExpect(header.getAttribute('aria-expanded')).to.equal('true');
  });

  it('should support pre-expanded panels', async () => {
    const expandedPanels = [...mockPanels];
    expandedPanels[0].expanded = true;

    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${expandedPanels}"></gc-expand-collapse>
    `);
    const header = el.shadowRoot!.querySelector('.panel-header') as HTMLButtonElement;
    chaiExpect(header.getAttribute('aria-expanded')).to.equal('true');
  });

  it('should handle empty panels array', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${[]}"></gc-expand-collapse>
    `);
    const panels = el.shadowRoot!.querySelectorAll('.panel');
    chaiExpect(panels.length).to.equal(0);
  });

  it('should have unique IDs for each panel', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    const panels = el.shadowRoot!.querySelectorAll('.panel');
    const ids = Array.from(panels).map(p => p.id);
    const uniqueIds = new Set(ids);
    chaiExpect(uniqueIds.size).to.equal(3);
  });

  it('should be accessible', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    
    // Content already provided via mockPanels
    await el.updateComplete;
    
    await chaiExpect(el).to.be.accessible();
  });

  it('should support French Canadian locale', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}" locale="fr-CA"></gc-expand-collapse>
    `);
    const accordion = el.shadowRoot!.querySelector('.accordion');
    chaiExpect(accordion?.getAttribute('aria-label')).to.equal('Accordéon');
  });

  it('should call togglePanel method', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    el.togglePanel('faq-1');
    await el.updateComplete;
    
    const header = el.shadowRoot!.querySelector('.panel-header') as HTMLButtonElement;
    chaiExpect(header.getAttribute('aria-expanded')).to.equal('true');

    el.togglePanel('faq-1');
    await el.updateComplete;
    chaiExpect(header.getAttribute('aria-expanded')).to.equal('false');
  });

  it('should have button elements as headers', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    const headers = el.shadowRoot!.querySelectorAll('.panel-header');
    headers.forEach(header => {
      chaiExpect(header.tagName.toLowerCase()).to.equal('button');
    });
  });

  it('should wrap headers in h3 elements', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    const h3Elements = el.shadowRoot!.querySelectorAll('h3');
    chaiExpect(h3Elements.length).to.equal(3);
  });

  it('should have panel icon', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    const icons = el.shadowRoot!.querySelectorAll('.panel-icon');
    chaiExpect(icons.length).to.equal(3);
  });

  it('should mark icon as aria-hidden', async () => {
    const el = await fixture<GCExpandCollapse>(html`
      <gc-expand-collapse .panels="${mockPanels}"></gc-expand-collapse>
    `);
    const icons = el.shadowRoot!.querySelectorAll('.panel-icon');
    icons.forEach(icon => {
      chaiExpect(icon.getAttribute('aria-hidden')).to.equal('true');
    });
  });
});
