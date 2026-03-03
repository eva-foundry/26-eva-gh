import { expect as chaiExpect } from 'chai';
import { fixture, html } from '@open-wc/testing';
import { GCTabbedInterface } from './gc-tabbed-interface.js';

import './gc-tabbed-interface.js';

describe('gc-tabbed-interface', () => {
  const mockTabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: 'This is the overview content.'
    },
    {
      id: 'eligibility',
      label: 'Eligibility',
      content: 'This is the eligibility content.'
    },
    {
      id: 'apply',
      label: 'How to apply',
      content: 'This is the application content.'
    }
  ];

  it('should render all tabs', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    const tabs = el.shadowRoot!.querySelectorAll('[role="tab"]');
    chaiExpect(tabs.length).to.equal(3);
  });

  it('should display tab labels', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    const tabs = el.shadowRoot!.querySelectorAll('[role="tab"]');
    chaiExpect(tabs[0].textContent?.trim()).to.equal('Overview');
    chaiExpect(tabs[1].textContent?.trim()).to.equal('Eligibility');
  });

  it('should select first tab by default', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    await el.updateComplete;
    const firstTab = el.shadowRoot!.querySelector('[role="tab"]');
    chaiExpect(firstTab?.getAttribute('aria-selected')).to.equal('true');
  });

  it('should show selected tabpanel content', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    await el.updateComplete;
    const panel = el.shadowRoot!.querySelector('[role="tabpanel"]:not([hidden])');
    chaiExpect(panel?.textContent?.trim()).to.equal('This is the overview content.');
  });

  it('should hide non-selected tabpanels', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    await el.updateComplete;
    const hiddenPanels = el.shadowRoot!.querySelectorAll('[role="tabpanel"][hidden]');
    chaiExpect(hiddenPanels.length).to.equal(2);
  });

  it('should switch tabs on click', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    const secondTab = el.shadowRoot!.querySelectorAll('[role="tab"]')[1] as HTMLElement;
    secondTab.click();
    await el.updateComplete;

    chaiExpect(secondTab.getAttribute('aria-selected')).to.equal('true');
  });

  it('should show correct content after tab switch', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    const secondTab = el.shadowRoot!.querySelectorAll('[role="tab"]')[1] as HTMLElement;
    secondTab.click();
    await el.updateComplete;

    const visiblePanel = el.shadowRoot!.querySelector('[role="tabpanel"]:not([hidden])');
    chaiExpect(visiblePanel?.textContent?.trim()).to.equal('This is the eligibility content.');
  });

  it('should navigate with ArrowRight key', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    await el.updateComplete;
    const firstTab = el.shadowRoot!.querySelector('[role="tab"]') as HTMLElement;
    
    firstTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await el.updateComplete;

    const tabs = el.shadowRoot!.querySelectorAll('[role="tab"]');
    chaiExpect(tabs[1].getAttribute('aria-selected')).to.equal('true');
  });

  it('should navigate with ArrowLeft key', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    el.selectTab('apply');
    await el.updateComplete;
    
    const lastTab = el.shadowRoot!.querySelectorAll('[role="tab"]')[2] as HTMLElement;
    lastTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    await el.updateComplete;

    const tabs = el.shadowRoot!.querySelectorAll('[role="tab"]');
    chaiExpect(tabs[1].getAttribute('aria-selected')).to.equal('true');
  });

  it('should navigate to first tab with Home key', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    el.selectTab('apply');
    await el.updateComplete;
    
    const lastTab = el.shadowRoot!.querySelectorAll('[role="tab"]')[2] as HTMLElement;
    lastTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
    await el.updateComplete;

    const firstTab = el.shadowRoot!.querySelector('[role="tab"]');
    chaiExpect(firstTab?.getAttribute('aria-selected')).to.equal('true');
  });

  it('should navigate to last tab with End key', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    await el.updateComplete;
    
    const firstTab = el.shadowRoot!.querySelector('[role="tab"]') as HTMLElement;
    firstTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    await el.updateComplete;

    const tabs = el.shadowRoot!.querySelectorAll('[role="tab"]');
    chaiExpect(tabs[2].getAttribute('aria-selected')).to.equal('true');
  });

  it('should emit tab-change event', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    let eventFired = false;
    let eventDetail: any;

    el.addEventListener('gc-tab-change', ((e: CustomEvent) => {
      eventFired = true;
      eventDetail = e.detail;
    }) as EventListener);

    el.selectTab('eligibility');
    await el.updateComplete;

    chaiExpect(eventFired).to.be.true;
    chaiExpect(eventDetail.id).to.equal('eligibility');
  });

  it('should handle disabled tabs', async () => {
    const tabsWithDisabled = [
      ...mockTabs,
      {
        id: 'disabled',
        label: 'Disabled',
        content: 'This tab is disabled.',
        disabled: true
      }
    ];

    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${tabsWithDisabled}"></gc-tabbed-interface>
    `);
    const disabledTab = el.shadowRoot!.querySelectorAll('[role="tab"]')[3];
    chaiExpect(disabledTab.getAttribute('aria-disabled')).to.equal('true');
  });

  it('should not select disabled tab on click', async () => {
    const tabsWithDisabled = [
      ...mockTabs,
      {
        id: 'disabled',
        label: 'Disabled',
        content: 'This tab is disabled.',
        disabled: true
      }
    ];

    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${tabsWithDisabled}"></gc-tabbed-interface>
    `);
    const disabledTab = el.shadowRoot!.querySelectorAll('[role="tab"]')[3] as HTMLElement;
    disabledTab.click();
    await el.updateComplete;

    chaiExpect(disabledTab.getAttribute('aria-selected')).to.equal('false');
  });

  it('should skip disabled tabs with keyboard navigation', async () => {
    const tabsWithDisabled = [
      { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
      { id: 'tab2', label: 'Tab 2', content: 'Content 2', disabled: true },
      { id: 'tab3', label: 'Tab 3', content: 'Content 3' }
    ];

    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${tabsWithDisabled}"></gc-tabbed-interface>
    `);
    await el.updateComplete;
    
    const firstTab = el.shadowRoot!.querySelector('[role="tab"]') as HTMLElement;
    firstTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await el.updateComplete;

    const tabs = el.shadowRoot!.querySelectorAll('[role="tab"]');
    chaiExpect(tabs[2].getAttribute('aria-selected')).to.equal('true');
  });

  it('should have proper ARIA tablist pattern', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    const tablist = el.shadowRoot!.querySelector('[role="tablist"]');
    chaiExpect(tablist).to.exist;
    chaiExpect(tablist?.hasAttribute('aria-label')).to.be.true;
  });

  it('should associate tabs with tabpanels', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    const firstTab = el.shadowRoot!.querySelector('[role="tab"]');
    const controlsId = firstTab?.getAttribute('aria-controls');
    const panel = el.shadowRoot!.querySelector(`#${controlsId}`);
    
    chaiExpect(panel).to.exist;
    chaiExpect(panel?.getAttribute('role')).to.equal('tabpanel');
  });

  it('should set tabindex correctly', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    await el.updateComplete;
    const tabs = el.shadowRoot!.querySelectorAll('[role="tab"]');
    
    chaiExpect(tabs[0].getAttribute('tabindex')).to.equal('0');
    chaiExpect(tabs[1].getAttribute('tabindex')).to.equal('-1');
    chaiExpect(tabs[2].getAttribute('tabindex')).to.equal('-1');
  });

  it('should handle empty tabs array', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${[]}"></gc-tabbed-interface>
    `);
    const tabs = el.shadowRoot!.querySelectorAll('[role="tab"]');
    chaiExpect(tabs.length).to.equal(0);
  });

  it('should wrap around with ArrowRight at last tab', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    el.selectTab('apply');
    await el.updateComplete;
    
    const lastTab = el.shadowRoot!.querySelectorAll('[role="tab"]')[2] as HTMLElement;
    lastTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await el.updateComplete;

    const firstTab = el.shadowRoot!.querySelector('[role="tab"]');
    chaiExpect(firstTab?.getAttribute('aria-selected')).to.equal('true');
  });

  it('should wrap around with ArrowLeft at first tab', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    await el.updateComplete;
    
    const firstTab = el.shadowRoot!.querySelector('[role="tab"]') as HTMLElement;
    firstTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    await el.updateComplete;

    const tabs = el.shadowRoot!.querySelectorAll('[role="tab"]');
    chaiExpect(tabs[2].getAttribute('aria-selected')).to.equal('true');
  });

  it('should be accessible', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    await chaiExpect(el).to.be.accessible();
  });

  it('should support French Canadian locale', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}" locale="fr-CA"></gc-tabbed-interface>
    `);
    const tablist = el.shadowRoot!.querySelector('[role="tablist"]');
    chaiExpect(tablist?.getAttribute('aria-label')).to.equal('Interface à onglets');
  });

  it('should call selectTab method programmatically', async () => {
    const el = await fixture<GCTabbedInterface>(html`
      <gc-tabbed-interface .tabs="${mockTabs}"></gc-tabbed-interface>
    `);
    el.selectTab('eligibility');
    await el.updateComplete;

    const tabs = el.shadowRoot!.querySelectorAll('[role="tab"]');
    chaiExpect(tabs[1].getAttribute('aria-selected')).to.equal('true');
  });
});
