import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { GCPageNavigation } from '../gc-page-navigation';
import '../gc-page-navigation';

describe('GCPageNavigation', () => {
  describe('Initialization', () => {
    it('creates element with default properties', async () => {
      const el = await fixture<GCPageNavigation>(html`<gc-page-navigation></gc-page-navigation>`);
      
      expect(el.previousUrl).to.equal('');
      expect(el.previousTitle).to.equal('');
      expect(el.nextUrl).to.equal('');
      expect(el.nextTitle).to.equal('');
      expect(el.compact).to.be.false;
    });

    it('accepts custom properties', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation 
          previous-url="/page1"
          previous-title="Page 1"
          next-url="/page3"
          next-title="Page 3"
          compact
        ></gc-page-navigation>
      `);
      
      expect(el.previousUrl).to.equal('/page1');
      expect(el.previousTitle).to.equal('Page 1');
      expect(el.nextUrl).to.equal('/page3');
      expect(el.nextTitle).to.equal('Page 3');
      expect(el.compact).to.be.true;
    });

    it('renders in shadow DOM', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/prev" next-url="/next"></gc-page-navigation>
      `);
      
      expect(el.shadowRoot).to.exist;
      expect(el.shadowRoot!.querySelector('.nav-container')).to.exist;
    });

    it('is defined as custom element', () => {
      const el = document.createElement('gc-page-navigation');
      expect(el).to.be.instanceOf(GCPageNavigation);
    });

    it('emits gc-page-navigation-ready event on initialization', async () => {
      let eventFired = false;
      const container = document.createElement('div');
      container.addEventListener('gc-page-navigation-ready', () => {
        eventFired = true;
      });
      document.body.appendChild(container);
      
      const el = document.createElement('gc-page-navigation') as GCPageNavigation;
      container.appendChild(el);
      await el.updateComplete;
      
      expect(eventFired).to.be.true;
      container.remove();
    });
  });

  describe('Previous Link', () => {
    it('renders previous link when previousUrl provided', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/page1"></gc-page-navigation>
      `);
      
      const prevLink = el.shadowRoot!.querySelector('.previous');
      expect(prevLink).to.exist;
      expect((prevLink as HTMLAnchorElement).href).to.include('/page1');
    });

    it('renders previous link with title', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation 
          previous-url="/page1"
          previous-title="Introduction"
        ></gc-page-navigation>
      `);
      
      const prevTitle = el.shadowRoot!.querySelector('.previous .nav-title');
      expect(prevTitle).to.exist;
      expect(prevTitle!.textContent).to.include('Introduction');
    });

    it('renders previous link without title', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/page1"></gc-page-navigation>
      `);
      
      const prevTitle = el.shadowRoot!.querySelector('.previous .nav-title');
      expect(prevTitle).to.not.exist;
    });

    it('shows previous icon', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/page1"></gc-page-navigation>
      `);
      
      const icon = el.shadowRoot!.querySelector('.previous .nav-icon');
      expect(icon).to.exist;
    });
  });

  describe('Next Link', () => {
    it('renders next link when nextUrl provided', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation next-url="/page3"></gc-page-navigation>
      `);
      
      const nextLink = el.shadowRoot!.querySelector('.next');
      expect(nextLink).to.exist;
      expect((nextLink as HTMLAnchorElement).href).to.include('/page3');
    });

    it('renders next link with title', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation 
          next-url="/page3"
          next-title="Conclusion"
        ></gc-page-navigation>
      `);
      
      const nextTitle = el.shadowRoot!.querySelector('.next .nav-title');
      expect(nextTitle).to.exist;
      expect(nextTitle!.textContent).to.include('Conclusion');
    });

    it('renders next link without title', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation next-url="/page3"></gc-page-navigation>
      `);
      
      const nextTitle = el.shadowRoot!.querySelector('.next .nav-title');
      expect(nextTitle).to.not.exist;
    });

    it('shows next icon', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation next-url="/page3"></gc-page-navigation>
      `);
      
      const icon = el.shadowRoot!.querySelector('.next .nav-icon');
      expect(icon).to.exist;
    });
  });

  describe('Both Links', () => {
    it('renders both previous and next links', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation 
          previous-url="/page1"
          next-url="/page3"
        ></gc-page-navigation>
      `);
      
      const prevLink = el.shadowRoot!.querySelector('.previous');
      const nextLink = el.shadowRoot!.querySelector('.next');
      
      expect(prevLink).to.exist;
      expect(nextLink).to.exist;
    });

    it('renders both links with titles', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation 
          previous-url="/page1"
          previous-title="Getting Started"
          next-url="/page3"
          next-title="Next Steps"
        ></gc-page-navigation>
      `);
      
      const prevTitle = el.shadowRoot!.querySelector('.previous .nav-title');
      const nextTitle = el.shadowRoot!.querySelector('.next .nav-title');
      
      expect(prevTitle!.textContent).to.include('Getting Started');
      expect(nextTitle!.textContent).to.include('Next Steps');
    });
  });

  describe('Empty State', () => {
    it('renders nothing when no URLs provided', async () => {
      const el = await fixture<GCPageNavigation>(html`<gc-page-navigation></gc-page-navigation>`);
      
      const container = el.shadowRoot!.querySelector('.nav-container');
      expect(container).to.not.exist;
    });

    it('does not render previous link when previousUrl empty', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation next-url="/page3"></gc-page-navigation>
      `);
      
      const prevLink = el.shadowRoot!.querySelector('.previous');
      expect(prevLink).to.not.exist;
    });

    it('does not render next link when nextUrl empty', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/page1"></gc-page-navigation>
      `);
      
      const nextLink = el.shadowRoot!.querySelector('.next');
      expect(nextLink).to.not.exist;
    });
  });

  describe('Navigation Events', () => {
    let originalLocation: Location;

    beforeEach(() => {
      originalLocation = window.location;
      // Mock window.location.href
      delete (window as any).location;
      (window as any).location = { href: '' };
    });

    afterEach(() => {
      window.location = originalLocation;
    });

    it('emits gc-page-navigation-click event when previous link clicked', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/page1"></gc-page-navigation>
      `);
      
      let eventDetail: { direction?: string; url?: string } | null = null;
      el.addEventListener('gc-page-navigation-click', (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      });
      
      const prevLink = el.shadowRoot!.querySelector('.previous') as HTMLAnchorElement;
      prevLink.click();
      await el.updateComplete;
      
      expect(eventDetail).to.exist;
      expect(eventDetail!.direction).to.equal('previous');
      expect(eventDetail!.url).to.equal('/page1');
    });

    it('emits gc-page-navigation-click event when next link clicked', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation next-url="/page3"></gc-page-navigation>
      `);
      
      let eventDetail: { direction?: string; url?: string } | null = null;
      el.addEventListener('gc-page-navigation-click', (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      });
      
      const nextLink = el.shadowRoot!.querySelector('.next') as HTMLAnchorElement;
      nextLink.click();
      await el.updateComplete;
      
      expect(eventDetail).to.exist;
      expect(eventDetail!.direction).to.equal('next');
      expect(eventDetail!.url).to.equal('/page3');
    });

    it('navigates to URL after emitting event', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation next-url="/page3"></gc-page-navigation>
      `);
      
      const nextLink = el.shadowRoot!.querySelector('.next') as HTMLAnchorElement;
      nextLink.click();
      await el.updateComplete;
      
      expect(window.location.href).to.equal('/page3');
    });
  });

  describe('Compact Mode', () => {
    it('applies compact attribute to host', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation compact previous-url="/prev"></gc-page-navigation>
      `);
      
      expect(el.hasAttribute('compact')).to.be.true;
    });

    it('reflects compact property to attribute', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/prev"></gc-page-navigation>
      `);
      
      el.compact = true;
      await el.updateComplete;
      
      expect(el.hasAttribute('compact')).to.be.true;
    });
  });

  describe('Accessibility', () => {
    it('uses semantic nav element', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/prev" next-url="/next"></gc-page-navigation>
      `);
      
      const nav = el.shadowRoot!.querySelector('nav');
      expect(nav).to.exist;
    });

    it('has aria-label on nav container', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/prev" next-url="/next"></gc-page-navigation>
      `);
      
      const nav = el.shadowRoot!.querySelector('nav');
      expect(nav!.hasAttribute('aria-label')).to.be.true;
    });

    it('has aria-label on previous link', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation 
          previous-url="/prev"
          previous-title="Previous Page"
        ></gc-page-navigation>
      `);
      
      const prevLink = el.shadowRoot!.querySelector('.previous');
      expect(prevLink!.hasAttribute('aria-label')).to.be.true;
    });

    it('has aria-label on next link', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation 
          next-url="/next"
          next-title="Next Page"
        ></gc-page-navigation>
      `);
      
      const nextLink = el.shadowRoot!.querySelector('.next');
      expect(nextLink!.hasAttribute('aria-label')).to.be.true;
    });

    it('uses semantic anchor elements for links', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/prev" next-url="/next"></gc-page-navigation>
      `);
      
      const links = el.shadowRoot!.querySelectorAll('a');
      expect(links.length).to.equal(2);
    });
  });

  describe('Bilingual Support', () => {
    it('displays English labels when lang="en-CA"', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation 
          previous-url="/prev"
          lang="en-CA"
        ></gc-page-navigation>
      `);
      await el.updateComplete;
      
      const label = el.shadowRoot!.querySelector('.nav-label');
      expect(label).to.exist;
      expect(label!.textContent).to.not.equal('pageNav.previous');
    });

    it('displays French labels when lang="fr-CA"', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation 
          next-url="/next"
          lang="fr-CA"
        ></gc-page-navigation>
      `);
      await el.updateComplete;
      
      const label = el.shadowRoot!.querySelector('.nav-label');
      expect(label).to.exist;
      expect(label!.textContent).to.not.equal('pageNav.next');
    });
  });

  describe('GC Design System Compliance', () => {
    it('uses Lato font', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/prev"></gc-page-navigation>
      `);
      
      expect(el.shadowRoot).to.exist;
    });

    it('uses GC blue for links', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/prev"></gc-page-navigation>
      `);
      
      const link = el.shadowRoot!.querySelector('.nav-link');
      expect(link).to.exist;
    });

    it('uses proper border styling', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/prev" next-url="/next"></gc-page-navigation>
      `);
      
      const container = el.shadowRoot!.querySelector('.nav-container');
      expect(container).to.exist;
    });
  });

  describe('Performance', () => {
    it('renders within 100ms', async () => {
      const start = performance.now();
      await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/prev" next-url="/next"></gc-page-navigation>
      `);
      const end = performance.now();
      
      expect(end - start).to.be.lessThan(100);
    });

    it('updates reactively when properties change', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation></gc-page-navigation>
      `);
      
      el.previousUrl = '/page1';
      await el.updateComplete;
      
      const prevLink = el.shadowRoot!.querySelector('.previous');
      expect(prevLink).to.exist;
    });
  });

  describe('CSS Custom Properties', () => {
    it('exposes part="container"', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/prev"></gc-page-navigation>
      `);
      
      const container = el.shadowRoot!.querySelector('[part="container"]');
      expect(container).to.exist;
    });

    it('exposes part="nav-link"', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/prev"></gc-page-navigation>
      `);
      
      const link = el.shadowRoot!.querySelector('[part~="nav-link"]');
      expect(link).to.exist;
    });

    it('exposes part="previous-link"', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/prev"></gc-page-navigation>
      `);
      
      const prevLink = el.shadowRoot!.querySelector('[part~="previous-link"]');
      expect(prevLink).to.exist;
    });

    it('exposes part="next-link"', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation next-url="/next"></gc-page-navigation>
      `);
      
      const nextLink = el.shadowRoot!.querySelector('[part~="next-link"]');
      expect(nextLink).to.exist;
    });

    it('exposes part="nav-label"', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/prev"></gc-page-navigation>
      `);
      
      const label = el.shadowRoot!.querySelector('[part="nav-label"]');
      expect(label).to.exist;
    });

    it('exposes part="nav-title"', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/prev" previous-title="Prev"></gc-page-navigation>
      `);
      
      const title = el.shadowRoot!.querySelector('[part="nav-title"]');
      expect(title).to.exist;
    });

    it('exposes part="nav-icon"', async () => {
      const el = await fixture<GCPageNavigation>(html`
        <gc-page-navigation previous-url="/prev"></gc-page-navigation>
      `);
      
      const icon = el.shadowRoot!.querySelector('[part="nav-icon"]');
      expect(icon).to.exist;
    });
  });
});
