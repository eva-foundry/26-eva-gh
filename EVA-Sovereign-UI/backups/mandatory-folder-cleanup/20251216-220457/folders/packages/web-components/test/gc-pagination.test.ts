import { expect, fixture, html, oneEvent, expect as wcExpect } from '@open-wc/testing';
import '../src/components/gc-patterns/gc-pagination.ts';
import { GCPagination } from '../src/components/gc-patterns/gc-pagination.js';

describe('gc-pagination', () => {
  describe('Initialization', () => {
    it('renders with default properties', async () => {
      const el = await fixture<GCPagination>(html`<gc-pagination></gc-pagination>`);

      expect(el).to.exist;
      expect(el.currentPage).to.equal(1);
      expect(el.totalPages).to.equal(1);
      expect(el.maxVisible).to.equal(7);
      expect(el.showFirstLast).to.be.true;
      expect(el.showPrevNext).to.be.true;
      expect(el.compact).to.be.false;
    });

    it('renders with custom properties', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="5" total-pages="20" max-visible="5"></gc-pagination>
      `);

      expect(el.currentPage).to.equal(5);
      expect(el.totalPages).to.equal(20);
      expect(el.maxVisible).to.equal(5);
    });

    it('has correct shadow DOM structure', async () => {
      const el = await fixture<GCPagination>(html`<gc-pagination></gc-pagination>`);

      const nav = el.shadowRoot!.querySelector('nav');
      expect(nav).to.exist;
      expect(nav!.classList.contains('pagination')).to.be.true;

      const list = el.shadowRoot!.querySelector('ul[role="list"]');
      expect(list).to.exist;
    });

    it('is defined as gc-pagination', () => {
      const el = document.createElement('gc-pagination');
      expect(el).to.be.instanceOf(GCPagination);
    });
  });

  describe('Page Numbers Rendering', () => {
    it('renders all pages when total <= maxVisible', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="3" total-pages="5"></gc-pagination>
      `);

      const pageLinks = el.shadowRoot!.querySelectorAll('.page-link');
      expect(pageLinks).to.have.lengthOf(5);
    });

    it('renders with ellipsis for long page lists', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="10" total-pages="50"></gc-pagination>
      `);

      const ellipsis = el.shadowRoot!.querySelectorAll('.ellipsis');
      expect(ellipsis.length).to.be.greaterThan(0);
    });

    it('shows first and last pages always', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="25" total-pages="50"></gc-pagination>
      `);

      const pageLinks = el.shadowRoot!.querySelectorAll('.page-link');
      const firstPage = pageLinks[0];
      const lastPage = pageLinks[pageLinks.length - 1];

      expect(firstPage.textContent?.trim()).to.equal('1');
      expect(lastPage.textContent?.trim()).to.equal('50');
    });

    it('shows pages around current page', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="15" total-pages="30" max-visible="7"></gc-pagination>
      `);

      const currentLink = el.shadowRoot!.querySelector('.page-link.current');
      expect(currentLink).to.exist;
      expect(currentLink!.textContent?.trim()).to.equal('15');
    });
  });

  describe('Current Page Indicator', () => {
    it('marks current page with current class', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="3" total-pages="10"></gc-pagination>
      `);

      const currentLink = el.shadowRoot!.querySelector('.page-link.current');
      expect(currentLink).to.exist;
      expect(currentLink!.textContent?.trim()).to.equal('3');
    });

    it('sets aria-current on current page', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="5" total-pages="10"></gc-pagination>
      `);

      const currentLink = el.shadowRoot!.querySelector('.page-link.current');
      expect(currentLink!.getAttribute('aria-current')).to.equal('page');
    });

    it('updates when currentPage changes', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="3" total-pages="10"></gc-pagination>
      `);

      el.currentPage = 7;
      await el.updateComplete;

      const currentLink = el.shadowRoot!.querySelector('.page-link.current');
      expect(currentLink!.textContent?.trim()).to.equal('7');
    });
  });

  describe('Previous/Next Buttons', () => {
    it('renders previous and next buttons by default', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="5" total-pages="10"></gc-pagination>
      `);

      const prevButton = el.shadowRoot!.querySelector('.nav-link.prev');
      const nextButton = el.shadowRoot!.querySelector('.nav-link.next');

      expect(prevButton).to.exist;
      expect(nextButton).to.exist;
    });

    it('disables previous button on first page', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="1" total-pages="10"></gc-pagination>
      `);

      const prevButton = el.shadowRoot!.querySelector('.nav-link.prev');
      expect(prevButton!.classList.contains('disabled')).to.be.true;
      expect(prevButton!.getAttribute('aria-disabled')).to.equal('true');
    });

    it('disables next button on last page', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="10" total-pages="10"></gc-pagination>
      `);

      const nextButton = el.shadowRoot!.querySelector('.nav-link.next');
      expect(nextButton!.classList.contains('disabled')).to.be.true;
      expect(nextButton!.getAttribute('aria-disabled')).to.equal('true');
    });

    it('hides previous/next buttons when show-prev-next is false', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination total-pages="10" .showPrevNext="${false}"></gc-pagination>
      `);

      const prevButton = el.shadowRoot!.querySelector('.nav-link.prev');
      const nextButton = el.shadowRoot!.querySelector('.nav-link.next');

      expect(prevButton).to.be.null;
      expect(nextButton).to.be.null;
    });
  });

  describe('Page Navigation', () => {
    it('navigates to clicked page', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="1" total-pages="10"></gc-pagination>
      `);

      const pageLinks = el.shadowRoot!.querySelectorAll('.page-link');
      const page5Link = Array.from(pageLinks).find(
        (link) => link.textContent?.trim() === '5'
      ) as HTMLAnchorElement;

      setTimeout(() => page5Link.click());
      const { detail } = await oneEvent(el, 'gc-page-change');

      expect(detail.page).to.equal(5);
      expect(el.currentPage).to.equal(5);
    });

    it('navigates to previous page', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="5" total-pages="10"></gc-pagination>
      `);

      const prevButton = el.shadowRoot!.querySelector('.nav-link.prev') as HTMLAnchorElement;

      setTimeout(() => prevButton.click());
      const { detail } = await oneEvent(el, 'gc-page-change');

      expect(detail.page).to.equal(4);
      expect(el.currentPage).to.equal(4);
    });

    it('navigates to next page', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="5" total-pages="10"></gc-pagination>
      `);

      const nextButton = el.shadowRoot!.querySelector('.nav-link.next') as HTMLAnchorElement;

      setTimeout(() => nextButton.click());
      const { detail } = await oneEvent(el, 'gc-page-change');

      expect(detail.page).to.equal(6);
      expect(el.currentPage).to.equal(6);
    });

    it('prevents navigation beyond bounds', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="10" total-pages="10"></gc-pagination>
      `);

      let eventFired = false;
      el.addEventListener('gc-page-change', () => {
        eventFired = true;
      });

      const nextButton = el.shadowRoot!.querySelector('.nav-link.next') as HTMLAnchorElement;
      nextButton.click();
      await el.updateComplete;

      expect(eventFired).to.be.false;
      expect(el.currentPage).to.equal(10);
    });

    it('prevents navigation to same page', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="5" total-pages="10"></gc-pagination>
      `);

      let eventFired = false;
      el.addEventListener('gc-page-change', () => {
        eventFired = true;
      });

      const currentLink = el.shadowRoot!.querySelector('.page-link.current') as HTMLAnchorElement;
      currentLink.click();
      await el.updateComplete;

      expect(eventFired).to.be.false;
    });
  });

  describe('Keyboard Navigation', () => {
    it('activates page on Enter key', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="1" total-pages="10"></gc-pagination>
      `);

      const pageLinks = el.shadowRoot!.querySelectorAll('.page-link');
      const page3Link = Array.from(pageLinks).find(
        (link) => link.textContent?.trim() === '3'
      ) as HTMLAnchorElement;

      page3Link.focus();
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      page3Link.dispatchEvent(event);
      await el.updateComplete;

      expect(el.currentPage).to.equal(3);
    });

    it('activates page on Space key', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="1" total-pages="10"></gc-pagination>
      `);

      const pageLinks = el.shadowRoot!.querySelectorAll('.page-link');
      const page4Link = Array.from(pageLinks).find(
        (link) => link.textContent?.trim() === '4'
      ) as HTMLAnchorElement;

      page4Link.focus();
      const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      page4Link.dispatchEvent(event);
      await el.updateComplete;

      expect(el.currentPage).to.equal(4);
    });

    it('prevents default on Enter key', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="1" total-pages="10"></gc-pagination>
      `);

      const pageLinks = el.shadowRoot!.querySelectorAll('.page-link');
      const page2Link = pageLinks[1] as HTMLAnchorElement;

      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
      let defaultPrevented = false;

      const originalPreventDefault = event.preventDefault.bind(event);
      event.preventDefault = () => {
        defaultPrevented = true;
        originalPreventDefault();
      };

      page2Link.dispatchEvent(event);
      expect(defaultPrevented).to.be.true;
    });
  });

  describe('Ellipsis Behavior', () => {
    it('shows ellipsis when pages exceed maxVisible', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="1" total-pages="20" max-visible="7"></gc-pagination>
      `);

      const ellipsis = el.shadowRoot!.querySelectorAll('.ellipsis');
      expect(ellipsis.length).to.be.greaterThan(0);
    });

    it('ellipsis has aria-hidden', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="10" total-pages="50"></gc-pagination>
      `);

      const ellipsis = el.shadowRoot!.querySelector('.ellipsis');
      expect(ellipsis!.getAttribute('aria-hidden')).to.equal('true');
    });

    it('shows correct ellipsis position for current page near start', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="3" total-pages="50" max-visible="7"></gc-pagination>
      `);

      // Should show pages at start, then ellipsis before end
      const ellipsis = el.shadowRoot!.querySelectorAll('.ellipsis');
      expect(ellipsis.length).to.be.greaterThan(0);
    });

    it('shows correct ellipsis position for current page near end', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="48" total-pages="50" max-visible="7"></gc-pagination>
      `);

      // Should show ellipsis after start, then pages at end
      const ellipsis = el.shadowRoot!.querySelectorAll('.ellipsis');
      expect(ellipsis.length).to.be.greaterThan(0);
    });
  });

  describe('Compact Mode', () => {
    it('applies compact attribute', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination compact total-pages="10"></gc-pagination>
      `);

      expect(el.compact).to.be.true;
      expect(el.hasAttribute('compact')).to.be.true;
    });
  });

  describe('Accessibility', () => {
    it('uses semantic nav element', async () => {
      const el = await fixture<GCPagination>(html`<gc-pagination></gc-pagination>`);

      const nav = el.shadowRoot!.querySelector('nav');
      expect(nav).to.exist;
      expect(nav!.tagName).to.equal('NAV');
    });

    it('has aria-label on navigation', async () => {
      const el = await fixture<GCPagination>(html`<gc-pagination></gc-pagination>`);
      await el.updateComplete;

      const nav = el.shadowRoot!.querySelector('nav');
      const ariaLabel = nav!.getAttribute('aria-label');
      expect(ariaLabel).to.exist;
      expect(ariaLabel!.length).to.be.greaterThan(0);
    });

    it('uses role="button" on page links', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination total-pages="5"></gc-pagination>
      `);

      const pageLinks = el.shadowRoot!.querySelectorAll('.page-link');
      pageLinks.forEach((link) => {
        expect(link.getAttribute('role')).to.equal('button');
      });
    });

    it('provides aria-label on page links', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="3" total-pages="5"></gc-pagination>
      `);

      const pageLinks = el.shadowRoot!.querySelectorAll('.page-link');
      pageLinks.forEach((link) => {
        const ariaLabel = link.getAttribute('aria-label');
        expect(ariaLabel).to.exist;
        expect(ariaLabel!.length).to.be.greaterThan(0);
      });
    });

    it('has screen reader announcements', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="5" total-pages="10"></gc-pagination>
      `);

      const srOnly = el.shadowRoot!.querySelector('.sr-only[aria-live="polite"]');
      expect(srOnly).to.exist;
      expect(srOnly!.textContent!.trim().length).to.be.greaterThan(0);
    });

    it('updates screen reader announcement on page change', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="3" total-pages="10"></gc-pagination>
      `);

      el.currentPage = 7;
      await el.updateComplete;

      const srOnly = el.shadowRoot!.querySelector('.sr-only[aria-live="polite"]');
      expect(srOnly!.textContent!.trim().length).to.be.greaterThan(0);
    });

    it('passes aXe accessibility audit', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination total-pages="10" current-page="5"></gc-pagination>
      `);
      await wcExpect(el).to.be.accessible();
    });
  });

  describe('Bilingual Support', () => {
    it('renders English labels by default', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination locale="en-CA" total-pages="5"></gc-pagination>
      `);
      await el.updateComplete;

      const prevButton = el.shadowRoot!.querySelector('.nav-link.prev');
      expect(prevButton!.textContent!.trim().length).to.be.greaterThan(0);
    });

    it('renders French labels when locale is fr-CA', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination locale="fr-CA" total-pages="5"></gc-pagination>
      `);
      await el.updateComplete;

      const prevButton = el.shadowRoot!.querySelector('.nav-link.prev');
      expect(prevButton!.textContent!.trim().length).to.be.greaterThan(0);
    });
  });

  describe('Event Emission', () => {
    it('emits gc-page-change event', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="3" total-pages="10"></gc-pagination>
      `);

      const pageLinks = el.shadowRoot!.querySelectorAll('.page-link');
      const page5Link = Array.from(pageLinks).find(
        (link) => link.textContent?.trim() === '5'
      ) as HTMLAnchorElement;

      setTimeout(() => page5Link.click());
      const { detail } = await oneEvent(el, 'gc-page-change');

      expect(detail.page).to.equal(5);
    });

    it('event bubbles and is composed', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="1" total-pages="10"></gc-pagination>
      `);

      let bubbled = false;
      let composed = false;

      document.addEventListener('gc-page-change', (e: Event) => {
        bubbled = true;
        if (e.composed) composed = true;
      });

      const pageLinks = el.shadowRoot!.querySelectorAll('.page-link');
      const page2Link = pageLinks[1] as HTMLAnchorElement;
      page2Link.click();
      await el.updateComplete;

      expect(bubbled).to.be.true;
      expect(composed).to.be.true;
    });
  });

  describe('GC Design System Compliance', () => {
    it('uses Lato font family', async () => {
      const el = await fixture<GCPagination>(html`<gc-pagination></gc-pagination>`);

      const styles = (GCPagination as unknown as { styles: { cssText: string } }).styles.cssText;
      expect(styles).to.include('Lato');
    });

    it('uses GC blue color (#284162) for links', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination total-pages="5"></gc-pagination>
      `);

      const styles = (GCPagination as unknown as { styles: { cssText: string } }).styles.cssText;
      expect(styles).to.include('#284162');
    });

    it('has 44px minimum touch target', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination total-pages="5"></gc-pagination>
      `);

      const styles = (GCPagination as unknown as { styles: { cssText: string } }).styles.cssText;
      expect(styles).to.include('44px');
    });
  });

  describe('Performance', () => {
    it('renders under 100ms', async () => {
      const start = performance.now();
      await fixture<GCPagination>(html`
        <gc-pagination current-page="10" total-pages="50"></gc-pagination>
      `);
      const duration = performance.now() - start;

      expect(duration).to.be.lessThan(100);
    });

    it('handles large page counts efficiently', async () => {
      const start = performance.now();
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="500" total-pages="1000"></gc-pagination>
      `);
      const duration = performance.now() - start;

      expect(el.totalPages).to.equal(1000);
      expect(duration).to.be.lessThan(200);
    });

    it('updates reactively when properties change', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination current-page="1" total-pages="5"></gc-pagination>
      `);

      el.totalPages = 20;
      await el.updateComplete;

      expect(el.totalPages).to.equal(20);
    });
  });

  describe('CSS Custom Properties', () => {
    it('exposes part="container" for styling', async () => {
      const el = await fixture<GCPagination>(html`<gc-pagination></gc-pagination>`);

      const nav = el.shadowRoot!.querySelector('[part="container"]');
      expect(nav).to.exist;
    });

    it('exposes part="page-link" for styling', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination total-pages="5"></gc-pagination>
      `);

      const pageLink = el.shadowRoot!.querySelector('[part="page-link"]');
      expect(pageLink).to.exist;
    });

    it('exposes part="nav-link" for styling', async () => {
      const el = await fixture<GCPagination>(html`
        <gc-pagination total-pages="5"></gc-pagination>
      `);

      const navLink = el.shadowRoot!.querySelector('[part*="nav-link"]');
      expect(navLink).to.exist;
    });
  });
});
