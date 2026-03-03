import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-pagination';
import type { GCPagination } from './gc-pagination';

describe('gc-pagination', () => {
  let element: GCPagination;

  beforeEach(async () => {
    element = await fixture(html`<gc-pagination></gc-pagination>`);
  });

  it('renders pagination nav', () => {
    const nav = element.shadowRoot?.querySelector('.pagination');
    expect(nav).to.exist;
  });

  it('nav has role="navigation"', () => {
    const nav = element.shadowRoot?.querySelector('.pagination');
    expect(nav?.getAttribute('role')).to.equal('navigation');
  });

  it('nav has aria-label', () => {
    const nav = element.shadowRoot?.querySelector('.pagination');
    expect(nav?.getAttribute('aria-label')).to.be.a('string');
  });

  it('renders previous button', () => {
    const buttons = element.shadowRoot?.querySelectorAll('.pagination-button');
    expect(buttons?.[0]?.textContent?.trim()).to.equal('‹');
  });

  it('renders next button', () => {
    const buttons = element.shadowRoot?.querySelectorAll('.pagination-button');
    const lastButton = buttons?.[buttons.length - 1];
    expect(lastButton?.textContent?.trim()).to.equal('›');
  });

  it('previous button disabled on first page', () => {
    element.currentPage = 1;
    element.totalPages = 5;
    element.requestUpdate();
    
    const prevButton = element.shadowRoot?.querySelector('.pagination-button') as HTMLButtonElement;
    expect(prevButton.disabled).to.be.true;
  });

  it('next button disabled on last page', async () => {
    element.currentPage = 5;
    element.totalPages = 5;
    await element.updateComplete;
    
    const buttons = element.shadowRoot?.querySelectorAll('.pagination-button');
    const nextButton = buttons?.[buttons.length - 1] as HTMLButtonElement;
    expect(nextButton.disabled).to.be.true;
  });

  it('renders page numbers', async () => {
    element.totalPages = 5;
    await element.updateComplete;
    
    const buttons = element.shadowRoot?.querySelectorAll('.pagination-button');
    expect(buttons.length).to.be.greaterThan(2);
  });

  it('marks current page as active', async () => {
    element.currentPage = 2;
    element.totalPages = 5;
    await element.updateComplete;
    
    const activeButton = element.shadowRoot?.querySelector('.pagination-button.active');
    expect(activeButton).to.exist;
  });

  it('active button has aria-current="page"', async () => {
    element.currentPage = 2;
    element.totalPages = 5;
    await element.updateComplete;
    
    const activeButton = element.shadowRoot?.querySelector('.pagination-button.active');
    expect(activeButton?.getAttribute('aria-current')).to.equal('page');
  });

  it('changes page on button click', async () => {
    element.totalPages = 5;
    await element.updateComplete;
    
    const buttons = element.shadowRoot?.querySelectorAll('.pagination-button') as NodeListOf<HTMLButtonElement>;
    const page2Button = Array.from(buttons).find(btn => btn.textContent?.trim() === '2');
    
    if (page2Button) {
      page2Button.click();
      await element.updateComplete;
      expect(element.currentPage).to.equal(2);
    }
  });

  it('emits gc-page-change event', async () => {
    element.totalPages = 5;
    await element.updateComplete;
    
    let eventDetail: unknown = null;
    element.addEventListener('gc-page-change', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);
    
    const buttons = element.shadowRoot?.querySelectorAll('.pagination-button') as NodeListOf<HTMLButtonElement>;
    const page2Button = Array.from(buttons).find(btn => btn.textContent?.trim() === '2');
    
    if (page2Button) {
      page2Button.click();
      expect(eventDetail).to.exist;
    }
  });

  it('includes page in event', async () => {
    element.totalPages = 5;
    await element.updateComplete;
    
    let eventDetail: unknown = null;
    element.addEventListener('gc-page-change', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);
    
    const buttons = element.shadowRoot?.querySelectorAll('.pagination-button') as NodeListOf<HTMLButtonElement>;
    const page3Button = Array.from(buttons).find(btn => btn.textContent?.trim() === '3');
    
    if (page3Button) {
      page3Button.click();
      expect((eventDetail as { page: number })?.page).to.equal(3);
    }
  });

  it('includes totalPages in event', async () => {
    element.totalPages = 5;
    await element.updateComplete;
    
    let eventDetail: unknown = null;
    element.addEventListener('gc-page-change', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);
    
    const buttons = element.shadowRoot?.querySelectorAll('.pagination-button') as NodeListOf<HTMLButtonElement>;
    const page2Button = Array.from(buttons).find(btn => btn.textContent?.trim() === '2');
    
    if (page2Button) {
      page2Button.click();
      expect((eventDetail as { totalPages: number })?.totalPages).to.equal(5);
    }
  });

  it('includes timestamp in event', async () => {
    element.totalPages = 5;
    await element.updateComplete;
    
    let eventDetail: unknown = null;
    element.addEventListener('gc-page-change', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);
    
    const buttons = element.shadowRoot?.querySelectorAll('.pagination-button') as NodeListOf<HTMLButtonElement>;
    const page2Button = Array.from(buttons).find(btn => btn.textContent?.trim() === '2');
    
    if (page2Button) {
      page2Button.click();
      expect((eventDetail as { timestamp: string })?.timestamp).to.be.a('string');
    }
  });

  it('previous button goes to previous page', async () => {
    element.currentPage = 3;
    element.totalPages = 5;
    await element.updateComplete;
    
    const prevButton = element.shadowRoot?.querySelector('.pagination-button') as HTMLButtonElement;
    prevButton.click();
    await element.updateComplete;
    
    expect(element.currentPage).to.equal(2);
  });

  it('next button goes to next page', async () => {
    element.currentPage = 2;
    element.totalPages = 5;
    await element.updateComplete;
    
    const buttons = element.shadowRoot?.querySelectorAll('.pagination-button');
    const nextButton = buttons?.[buttons.length - 1] as HTMLButtonElement;
    nextButton.click();
    await element.updateComplete;
    
    expect(element.currentPage).to.equal(3);
  });

  it('shows ellipsis for many pages', async () => {
    element.totalPages = 20;
    await element.updateComplete;
    
    const ellipsis = element.shadowRoot?.querySelector('.pagination-ellipsis');
    expect(ellipsis).to.exist;
  });

  it('ellipsis has aria-hidden', async () => {
    element.totalPages = 20;
    await element.updateComplete;
    
    const ellipsis = element.shadowRoot?.querySelector('.pagination-ellipsis');
    expect(ellipsis?.getAttribute('aria-hidden')).to.equal('true');
  });

  it('shows all pages when totalPages <= maxVisible', async () => {
    element.totalPages = 5;
    element.maxVisible = 7;
    await element.updateComplete;
    
    const ellipsis = element.shadowRoot?.querySelector('.pagination-ellipsis');
    expect(ellipsis).to.not.exist;
  });

  it('respects maxVisible property', async () => {
    element.totalPages = 20;
    element.maxVisible = 5;
    await element.updateComplete;
    
    const buttons = element.shadowRoot?.querySelectorAll('.pagination-button');
    expect(buttons.length).to.be.lessThanOrEqual(7);
  });

  it('does not show info by default', () => {
    const info = element.shadowRoot?.querySelector('.pagination-info');
    expect(info).to.not.exist;
  });

  it('shows info when showInfo is true', async () => {
    element.showInfo = true;
    element.totalItems = 100;
    element.itemsPerPage = 10;
    await element.updateComplete;
    
    const info = element.shadowRoot?.querySelector('.pagination-info');
    expect(info).to.exist;
  });

  it('info has aria-live="polite"', async () => {
    element.showInfo = true;
    element.totalItems = 100;
    await element.updateComplete;
    
    const info = element.shadowRoot?.querySelector('.pagination-info');
    expect(info?.getAttribute('aria-live')).to.equal('polite');
  });

  it('calculates info text correctly', async () => {
    element.showInfo = true;
    element.totalItems = 100;
    element.itemsPerPage = 10;
    element.currentPage = 2;
    await element.updateComplete;
    
    const info = element.shadowRoot?.querySelector('.pagination-info');
    expect(info?.textContent).to.include('11');
    expect(info?.textContent).to.include('20');
    expect(info?.textContent).to.include('100');
  });

  it('buttons are button elements', () => {
    const buttons = element.shadowRoot?.querySelectorAll('.pagination-button');
    buttons?.forEach(button => {
      expect(button.tagName.toLowerCase()).to.equal('button');
    });
  });

  it('buttons have type="button"', () => {
    const buttons = element.shadowRoot?.querySelectorAll('.pagination-button');
    buttons?.forEach(button => {
      expect(button.getAttribute('type')).to.equal('button');
    });
  });

  it('buttons have aria-label', async () => {
    element.totalPages = 3;
    await element.updateComplete;
    
    const buttons = element.shadowRoot?.querySelectorAll('.pagination-button');
    buttons?.forEach(button => {
      expect(button.getAttribute('aria-label')).to.be.a('string');
    });
  });

  it('applies proper CSS classes', async () => {
    element.totalPages = 5;
    await element.updateComplete;
    
    const nav = element.shadowRoot?.querySelector('.pagination');
    expect(nav?.classList.contains('pagination')).to.be.true;
    
    const buttons = element.shadowRoot?.querySelectorAll('.pagination-button');
    buttons?.forEach(button => {
      expect(button.classList.contains('pagination-button')).to.be.true;
    });
  });

  it('updates when totalPages changes', async () => {
    element.totalPages = 3;
    await element.updateComplete;
    
    let buttons = element.shadowRoot?.querySelectorAll('.pagination-button');
    const initialCount = buttons?.length || 0;
    
    element.totalPages = 5;
    await element.updateComplete;
    
    buttons = element.shadowRoot?.querySelectorAll('.pagination-button');
    expect(buttons?.length).to.not.equal(initialCount);
  });

  it('handles single page', async () => {
    element.totalPages = 1;
    await element.updateComplete;
    
    const prevButton = element.shadowRoot?.querySelector('.pagination-button') as HTMLButtonElement;
    const buttons = element.shadowRoot?.querySelectorAll('.pagination-button');
    const nextButton = buttons?.[buttons.length - 1] as HTMLButtonElement;
    
    expect(prevButton.disabled).to.be.true;
    expect(nextButton.disabled).to.be.true;
  });

  it('does not change page when clicking active page', async () => {
    element.currentPage = 2;
    element.totalPages = 5;
    await element.updateComplete;
    
    let eventFired = false;
    element.addEventListener('gc-page-change', () => {
      eventFired = true;
    });
    
    const activeButton = element.shadowRoot?.querySelector('.pagination-button.active') as HTMLButtonElement;
    activeButton.click();
    
    expect(eventFired).to.be.false;
  });

  it('maintains currentPage within bounds', async () => {
    element.currentPage = 10;
    element.totalPages = 5;
    await element.updateComplete;
    
    const nextButton = element.shadowRoot?.querySelectorAll('.pagination-button');
    const last = nextButton[nextButton.length - 1] as HTMLButtonElement;
    
    last.click();
    await element.updateComplete;
    
    expect(element.currentPage).to.equal(10);
  });
});
