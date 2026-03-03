import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-tabs';
import type { GCTabs } from './gc-tabs';

describe('gc-tabs', () => {
  let element: GCTabs;

  beforeEach(async () => {
    element = await fixture(html`<gc-tabs></gc-tabs>`);
  });

  it('renders tabs container', () => {
    const container = element.shadowRoot?.querySelector('.tabs-container');
    expect(container).to.exist;
  });

  it('renders tab list', () => {
    const tabList = element.shadowRoot?.querySelector('.tab-list');
    expect(tabList).to.exist;
  });

  it('tab list has role="tablist"', () => {
    const tabList = element.shadowRoot?.querySelector('.tab-list');
    expect(tabList?.getAttribute('role')).to.equal('tablist');
  });

  it('renders no tabs by default', () => {
    const tabs = element.shadowRoot?.querySelectorAll('.tab');
    expect(tabs?.length).to.equal(0);
  });

  it('renders tab buttons', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' },
      { id: '2', label: 'Tab 2', content: 'Content 2' }
    ];
    await element.updateComplete;

    const tabs = element.shadowRoot?.querySelectorAll('.tab');
    expect(tabs?.length).to.equal(2);
  });

  it('renders tab labels', async () => {
    element.tabs = [
      { id: '1', label: 'First Tab', content: 'Content 1' }
    ];
    await element.updateComplete;

    const tab = element.shadowRoot?.querySelector('.tab');
    expect(tab?.textContent?.trim()).to.equal('First Tab');
  });

  it('first tab active by default', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' },
      { id: '2', label: 'Tab 2', content: 'Content 2' }
    ];
    await element.updateComplete;

    expect(element.activeTab).to.equal('1');
  });

  it('first tab has aria-selected="true" by default', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' },
      { id: '2', label: 'Tab 2', content: 'Content 2' }
    ];
    await element.updateComplete;

    const tabs = element.shadowRoot?.querySelectorAll('.tab');
    expect(tabs?.[0]?.getAttribute('aria-selected')).to.equal('true');
    expect(tabs?.[1]?.getAttribute('aria-selected')).to.equal('false');
  });

  it('changes active tab on click', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' },
      { id: '2', label: 'Tab 2', content: 'Content 2' }
    ];
    await element.updateComplete;

    const tabs = element.shadowRoot?.querySelectorAll('.tab') as NodeListOf<HTMLButtonElement>;
    tabs[1].click();
    await element.updateComplete;

    expect(element.activeTab).to.equal('2');
  });

  it('updates aria-selected on tab change', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' },
      { id: '2', label: 'Tab 2', content: 'Content 2' }
    ];
    await element.updateComplete;

    const tabs = element.shadowRoot?.querySelectorAll('.tab') as NodeListOf<HTMLButtonElement>;
    tabs[1].click();
    await element.updateComplete;

    expect(tabs[0].getAttribute('aria-selected')).to.equal('false');
    expect(tabs[1].getAttribute('aria-selected')).to.equal('true');
  });

  it('emits gc-tab-change event', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' },
      { id: '2', label: 'Tab 2', content: 'Content 2' }
    ];
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-tab-change', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const tabs = element.shadowRoot?.querySelectorAll('.tab') as NodeListOf<HTMLButtonElement>;
    tabs[1].click();

    expect(eventDetail).to.exist;
  });

  it('includes tabId in event', async () => {
    element.tabs = [
      { id: 'test-tab', label: 'Tab 1', content: 'Content 1' },
      { id: '2', label: 'Tab 2', content: 'Content 2' }
    ];
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-tab-change', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const tabs = element.shadowRoot?.querySelectorAll('.tab') as NodeListOf<HTMLButtonElement>;
    tabs[0].click();

    expect((eventDetail as { tabId: string })?.tabId).to.equal('test-tab');
  });

  it('includes timestamp in event', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-tab-change', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const tab = element.shadowRoot?.querySelector('.tab') as HTMLButtonElement;
    tab.click();

    expect((eventDetail as { timestamp: string })?.timestamp).to.be.a('string');
  });

  it('renders tab panels', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' },
      { id: '2', label: 'Tab 2', content: 'Content 2' }
    ];
    await element.updateComplete;

    const panels = element.shadowRoot?.querySelectorAll('.tab-panel');
    expect(panels?.length).to.equal(2);
  });

  it('shows active panel', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' },
      { id: '2', label: 'Tab 2', content: 'Content 2' }
    ];
    await element.updateComplete;

    const panels = element.shadowRoot?.querySelectorAll('.tab-panel') as NodeListOf<HTMLElement>;
    expect(panels[0].hasAttribute('hidden')).to.be.false;
    expect(panels[1].hasAttribute('hidden')).to.be.true;
  });

  it('switches visible panel on tab change', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' },
      { id: '2', label: 'Tab 2', content: 'Content 2' }
    ];
    await element.updateComplete;

    const tabs = element.shadowRoot?.querySelectorAll('.tab') as NodeListOf<HTMLButtonElement>;
    tabs[1].click();
    await element.updateComplete;

    const panels = element.shadowRoot?.querySelectorAll('.tab-panel') as NodeListOf<HTMLElement>;
    expect(panels[0].hasAttribute('hidden')).to.be.true;
    expect(panels[1].hasAttribute('hidden')).to.be.false;
  });

  it('panel displays content', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Test Content' }
    ];
    await element.updateComplete;

    const panel = element.shadowRoot?.querySelector('.tab-panel');
    expect(panel?.textContent?.trim()).to.equal('Test Content');
  });

  it('tab has role="tab"', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const tab = element.shadowRoot?.querySelector('.tab');
    expect(tab?.getAttribute('role')).to.equal('tab');
  });

  it('panel has role="tabpanel"', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const panel = element.shadowRoot?.querySelector('.tab-panel');
    expect(panel?.getAttribute('role')).to.equal('tabpanel');
  });

  it('tab has aria-controls', async () => {
    element.tabs = [
      { id: 'test', label: 'Tab 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const tab = element.shadowRoot?.querySelector('.tab');
    expect(tab?.getAttribute('aria-controls')).to.equal('panel-test');
  });

  it('panel has aria-labelledby', async () => {
    element.tabs = [
      { id: 'test', label: 'Tab 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const panel = element.shadowRoot?.querySelector('.tab-panel');
    expect(panel?.getAttribute('aria-labelledby')).to.equal('tab-test');
  });

  it('active tab has tabindex="0"', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' },
      { id: '2', label: 'Tab 2', content: 'Content 2' }
    ];
    await element.updateComplete;

    const tabs = element.shadowRoot?.querySelectorAll('.tab');
    expect(tabs?.[0]?.getAttribute('tabindex')).to.equal('0');
    expect(tabs?.[1]?.getAttribute('tabindex')).to.equal('-1');
  });

  it('tab is button element', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const tab = element.shadowRoot?.querySelector('.tab');
    expect(tab?.tagName.toLowerCase()).to.equal('button');
  });

  it('tab has type="button"', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const tab = element.shadowRoot?.querySelector('.tab');
    expect(tab?.getAttribute('type')).to.equal('button');
  });

  it('applies proper CSS classes', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const container = element.shadowRoot?.querySelector('.tabs-container');
    expect(container?.classList.contains('tabs-container')).to.be.true;

    const tabList = element.shadowRoot?.querySelector('.tab-list');
    expect(tabList?.classList.contains('tab-list')).to.be.true;

    const tab = element.shadowRoot?.querySelector('.tab');
    expect(tab?.classList.contains('tab')).to.be.true;

    const panel = element.shadowRoot?.querySelector('.tab-panel');
    expect(panel?.classList.contains('tab-panel')).to.be.true;
  });

  it('tab list is ul element', () => {
    const tabList = element.shadowRoot?.querySelector('.tab-list');
    expect(tabList?.tagName.toLowerCase()).to.equal('ul');
  });

  it('updates when tabs change', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    let tabs = element.shadowRoot?.querySelectorAll('.tab');
    expect(tabs?.length).to.equal(1);

    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' },
      { id: '2', label: 'Tab 2', content: 'Content 2' }
    ];
    await element.updateComplete;

    tabs = element.shadowRoot?.querySelectorAll('.tab');
    expect(tabs?.length).to.equal(2);
  });

  it('handles custom activeTab', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' },
      { id: '2', label: 'Tab 2', content: 'Content 2' }
    ];
    element.activeTab = '2';
    await element.updateComplete;

    const tabs = element.shadowRoot?.querySelectorAll('.tab');
    expect(tabs?.[0]?.getAttribute('aria-selected')).to.equal('false');
    expect(tabs?.[1]?.getAttribute('aria-selected')).to.equal('true');
  });

  it('maintains panel count matches tab count', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' },
      { id: '2', label: 'Tab 2', content: 'Content 2' },
      { id: '3', label: 'Tab 3', content: 'Content 3' }
    ];
    await element.updateComplete;

    const tabs = element.shadowRoot?.querySelectorAll('.tab');
    const panels = element.shadowRoot?.querySelectorAll('.tab-panel');

    expect(tabs?.length).to.equal(panels?.length);
  });

  it('panel has tabindex', async () => {
    element.tabs = [
      { id: '1', label: 'Tab 1', content: 'Content 1' }
    ];
    await element.updateComplete;

    const panel = element.shadowRoot?.querySelector('.tab-panel');
    expect(panel?.getAttribute('tabindex')).to.equal('0');
  });
});
