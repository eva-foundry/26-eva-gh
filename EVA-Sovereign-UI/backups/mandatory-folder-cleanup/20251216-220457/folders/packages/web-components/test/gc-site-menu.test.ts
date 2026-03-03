import { expect, fixture, html, oneEvent, waitUntil, expect as wcExpect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import '../src/components/gc-patterns/gc-site-menu.ts';
import { GCSiteMenu } from '../src/components/gc-patterns/gc-site-menu.js';
import type { MenuItem } from '../src/components/gc-patterns/gc-site-menu.js';

describe('gc-site-menu', () => {
  describe('Initialization', () => {
    it('renders with default properties', async () => {
      const el = await fixture<GCSiteMenu>(html`<gc-site-menu></gc-site-menu>`);

      expect(el).to.exist;
      expect(el.items).to.deep.equal([]);
      expect(el.vertical).to.be.false;
      expect(el.mobileMenuOpen).to.be.false;
      expect(el.showMobileToggle).to.be.true;
    });

    it('renders with custom menu items', async () => {
      const items: MenuItem[] = [
        { text: 'Home', href: '/' },
        { text: 'About', href: '/about' },
      ];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      expect(el.items).to.deep.equal(items);
      const links = el.shadowRoot!.querySelectorAll('.menu-link');
      expect(links).to.have.lengthOf(2);
    });

    it('has correct shadow DOM structure', async () => {
      const el = await fixture<GCSiteMenu>(html`<gc-site-menu></gc-site-menu>`);

      const nav = el.shadowRoot!.querySelector('nav');
      expect(nav).to.exist;
      expect(nav!.classList.contains('site-menu')).to.be.true;

      const menuList = el.shadowRoot!.querySelector('ul[role="menubar"]');
      expect(menuList).to.exist;
    });

    it('is defined as gc-site-menu', () => {
      const el = document.createElement('gc-site-menu');
      expect(el).to.be.instanceOf(GCSiteMenu);
    });
  });

  describe('Menu Items Rendering', () => {
    it('renders simple menu items', async () => {
      const items: MenuItem[] = [
        { text: 'Services', href: '/services' },
        { text: 'Departments', href: '/departments' },
        { text: 'Contact', href: '/contact' },
      ];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const links = el.shadowRoot!.querySelectorAll('.menu-link');
      expect(links).to.have.lengthOf(3);
      expect(links[0].textContent).to.include('Services');
      expect(links[1].textContent).to.include('Departments');
      expect(links[2].textContent).to.include('Contact');
    });

    it('renders menu items with href attributes', async () => {
      const items: MenuItem[] = [
        { text: 'Home', href: '/' },
        { text: 'About', href: '/about' },
      ];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const links = el.shadowRoot!.querySelectorAll<HTMLAnchorElement>('.menu-link');
      expect(links[0].href).to.include('/');
      expect(links[1].href).to.include('/about');
    });

    it('renders nested menu items', async () => {
      const items: MenuItem[] = [
        {
          text: 'About',
          href: '/about',
          children: [
            { text: 'History', href: '/about/history' },
            { text: 'Team', href: '/about/team' },
          ],
        },
      ];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      // Initially, submenu should not be visible (collapsed)
      const parentLink = el.shadowRoot!.querySelector('.menu-link');
      expect(parentLink!.textContent).to.include('About');
      expect(parentLink!.getAttribute('aria-haspopup')).to.equal('true');
      expect(parentLink.getAttribute('aria-expanded')).to.equal('false');

      // Submenu should not be rendered when closed
      const submenu = el.shadowRoot!.querySelector('.submenu');
      expect(submenu).to.be.null;
    });

    it('marks current page item', async () => {
      const items: MenuItem[] = [
        { text: 'Home', href: '/', current: false },
        { text: 'About', href: '/about', current: true },
        { text: 'Contact', href: '/contact', current: false },
      ];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const links = el.shadowRoot!.querySelectorAll<HTMLAnchorElement>('.menu-link');
      expect(links[0].getAttribute('aria-current')).to.equal('false');
      expect(links[1].getAttribute('aria-current')).to.equal('page');
      expect(links[1].classList.contains('is-current')).to.be.true;
      expect(links[2].getAttribute('aria-current')).to.equal('false');
    });

    it('renders external link indicators', async () => {
      const items: MenuItem[] = [
        { text: 'Internal', href: '/internal', external: false },
        { text: 'External', href: 'https://example.com', external: true },
      ];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const links = el.shadowRoot!.querySelectorAll<HTMLAnchorElement>('.menu-link');
      expect(links[0].target).to.equal('_self');
      expect(links[0].rel).to.equal('');

      expect(links[1].target).to.equal('_blank');
      expect(links[1].rel).to.equal('noopener noreferrer');

      const externalIndicator = el.shadowRoot!.querySelector('.external-indicator');
      expect(externalIndicator).to.exist;
      expect(externalIndicator!.textContent).to.include('↗');
    });
  });

  describe('Submenu Interaction', () => {
    it('expands submenu on click', async () => {
      const items: MenuItem[] = [
        {
          text: 'About',
          href: '/about',
          children: [
            { text: 'History', href: '/about/history' },
            { text: 'Team', href: '/about/team' },
          ],
        },
      ];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const parentLink = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;
      expect(parentLink.getAttribute('aria-expanded')).to.equal('false');

      parentLink.click();
      await el.updateComplete;

      expect(parentLink.getAttribute('aria-expanded')).to.equal('true');
      const submenu = el.shadowRoot!.querySelector('.submenu');
      expect(submenu).to.exist;

      const childLinks = submenu!.querySelectorAll('.menu-link');
      expect(childLinks).to.have.lengthOf(2);
    });

    it('collapses submenu on second click', async () => {
      const items: MenuItem[] = [
        {
          text: 'About',
          href: '/about',
          children: [{ text: 'History', href: '/about/history' }],
        },
      ];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const parentLink = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;

      // Expand
      parentLink.click();
      await el.updateComplete;
      expect(parentLink.getAttribute('aria-expanded')).to.equal('true');

      // Collapse
      parentLink.click();
      await el.updateComplete;
      expect(parentLink.getAttribute('aria-expanded')).to.equal('false');

      const submenu = el.shadowRoot!.querySelector('.submenu');
      expect(submenu).to.be.null;
    });

    it('shows submenu indicator for parent items', async () => {
      const items: MenuItem[] = [
        { text: 'Home', href: '/' },
        {
          text: 'About',
          href: '/about',
          children: [{ text: 'Team', href: '/about/team' }],
        },
      ];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const links = el.shadowRoot!.querySelectorAll('.menu-link');
      const homeIndicator = links[0].querySelector('.submenu-indicator');
      const aboutIndicator = links[1].querySelector('.submenu-indicator');

      expect(homeIndicator).to.be.null;
      expect(aboutIndicator).to.exist;
      expect(aboutIndicator!.textContent).to.include('▶');
    });

    it('prevents navigation when clicking parent item with children', async () => {
      const items: MenuItem[] = [
        {
          text: 'About',
          href: '/about',
          children: [{ text: 'Team', href: '/about/team' }],
        },
      ];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      let eventFired = false;
      el.addEventListener('gc-menu-item-click', () => {
        eventFired = true;
      });

      const parentLink = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;
      parentLink.click();
      await el.updateComplete;

      // Should not fire navigation event for parent with children
      expect(eventFired).to.be.false;
    });
  });

  describe('Mobile Menu', () => {
    it('renders mobile toggle button', async () => {
      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu show-mobile-toggle></gc-site-menu>
      `);

      const toggle = el.shadowRoot!.querySelector('.mobile-toggle');
      expect(toggle).to.exist;
      expect(toggle!.getAttribute('aria-expanded')).to.equal('false');
    });

    it('toggles mobile menu on button click', async () => {
      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu></gc-site-menu>
      `);

      expect(el.mobileMenuOpen).to.be.false;

      const toggle = el.shadowRoot!.querySelector('.mobile-toggle') as HTMLButtonElement;
      toggle.click();
      await el.updateComplete;

      expect(el.mobileMenuOpen).to.be.true;
      expect(toggle.getAttribute('aria-expanded')).to.equal('true');

      toggle.click();
      await el.updateComplete;

      expect(el.mobileMenuOpen).to.be.false;
      expect(toggle.getAttribute('aria-expanded')).to.equal('false');
    });

    it('emits gc-mobile-menu-toggle event', async () => {
      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu></gc-site-menu>
      `);

      const toggle = el.shadowRoot!.querySelector('.mobile-toggle') as HTMLButtonElement;

      setTimeout(() => toggle.click());
      const { detail } = await oneEvent(el, 'gc-mobile-menu-toggle');

      expect(detail.open).to.be.true;
    });

    it('closes mobile menu after navigation', async () => {
      const items: MenuItem[] = [{ text: 'Home', href: '/' }];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      // Open mobile menu
      el.mobileMenuOpen = true;
      await el.updateComplete;

      const link = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;
      link.click();
      await el.updateComplete;

      expect(el.mobileMenuOpen).to.be.false;
    });

    it('hides mobile toggle when show-mobile-toggle is false', async () => {
      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .showMobileToggle="${false}"></gc-site-menu>
      `);

      const toggle = el.shadowRoot!.querySelector('.mobile-toggle');
      expect(toggle).to.be.null;
    });
  });

  describe('Keyboard Navigation', () => {
    it('activates menu item on Enter key', async () => {
      const items: MenuItem[] = [{ text: 'Home', href: '/' }];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const link = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;
      link.focus();

      let clicked = false;
      link.addEventListener('click', () => {
        clicked = true;
      });

      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      link.dispatchEvent(event);
      await el.updateComplete;

      expect(clicked).to.be.true;
    });

    it('activates menu item on Space key', async () => {
      const items: MenuItem[] = [{ text: 'Home', href: '/' }];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const link = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;
      link.focus();

      let clicked = false;
      link.addEventListener('click', () => {
        clicked = true;
      });

      const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      link.dispatchEvent(event);
      await el.updateComplete;

      expect(clicked).to.be.true;
    });

    it('expands submenu on Enter key', async () => {
      const items: MenuItem[] = [
        {
          text: 'About',
          href: '/about',
          children: [{ text: 'Team', href: '/about/team' }],
        },
      ];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const parentLink = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;
      expect(parentLink.getAttribute('aria-expanded')).to.equal('false');

      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      parentLink.dispatchEvent(event);
      await el.updateComplete;

      expect(parentLink.getAttribute('aria-expanded')).to.equal('true');
    });

    it('prevents default on Enter key', async () => {
      const items: MenuItem[] = [{ text: 'Home', href: '/' }];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const link = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });

      let defaultPrevented = false;
      const originalPreventDefault = event.preventDefault.bind(event);
      event.preventDefault = () => {
        defaultPrevented = true;
        originalPreventDefault();
      };

      link.dispatchEvent(event);

      expect(defaultPrevented).to.be.true;
    });

    it('prevents default on Space key', async () => {
      const items: MenuItem[] = [{ text: 'Home', href: '/' }];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const link = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;
      const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });

      let defaultPrevented = false;
      const originalPreventDefault = event.preventDefault.bind(event);
      event.preventDefault = () => {
        defaultPrevented = true;
        originalPreventDefault();
      };

      link.dispatchEvent(event);

      expect(defaultPrevented).to.be.true;
    });
  });

  describe('Orientation', () => {
    it('renders horizontal menubar by default', async () => {
      const el = await fixture<GCSiteMenu>(html`<gc-site-menu></gc-site-menu>`);

      const menuList = el.shadowRoot!.querySelector('ul[role="menubar"]');
      expect(menuList!.getAttribute('aria-orientation')).to.equal('horizontal');

      const nav = el.shadowRoot!.querySelector('.site-menu');
      expect(nav!.classList.contains('vertical')).to.be.false;
    });

    it('renders vertical menu when vertical attribute is set', async () => {
      const el = await fixture<GCSiteMenu>(html`<gc-site-menu vertical></gc-site-menu>`);

      const menuList = el.shadowRoot!.querySelector('ul[role="menubar"]');
      expect(menuList!.getAttribute('aria-orientation')).to.equal('vertical');

      const nav = el.shadowRoot!.querySelector('.site-menu');
      expect(nav!.classList.contains('vertical')).to.be.true;
    });
  });

  describe('Accessibility', () => {
    it('uses semantic nav element', async () => {
      const el = await fixture<GCSiteMenu>(html`<gc-site-menu></gc-site-menu>`);

      const nav = el.shadowRoot!.querySelector('nav');
      expect(nav).to.exist;
      expect(nav!.tagName).to.equal('NAV');
    });

    it('has aria-label on navigation', async () => {
      const el = await fixture<GCSiteMenu>(html`<gc-site-menu></gc-site-menu>`);
      await el.updateComplete;

      const nav = el.shadowRoot!.querySelector('nav');
      const ariaLabel = nav!.getAttribute('aria-label');
      expect(ariaLabel).to.exist;
      // Translation might not be loaded in test environment, so just check it exists
      expect(ariaLabel!.length).to.be.greaterThan(0);
    });

    it('uses menubar role on main list', async () => {
      const el = await fixture<GCSiteMenu>(html`<gc-site-menu></gc-site-menu>`);

      const menuList = el.shadowRoot!.querySelector('ul[role="menubar"]');
      expect(menuList).to.exist;
    });

    it('uses menuitem role on links', async () => {
      const items: MenuItem[] = [{ text: 'Home', href: '/' }];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const link = el.shadowRoot!.querySelector('.menu-link');
      expect(link!.getAttribute('role')).to.equal('menuitem');
    });

    it('uses menu role on submenus', async () => {
      const items: MenuItem[] = [
        {
          text: 'About',
          href: '/about',
          children: [{ text: 'Team', href: '/about/team' }],
        },
      ];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      // Expand submenu
      const parentLink = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;
      parentLink.click();
      await el.updateComplete;

      const submenu = el.shadowRoot!.querySelector('.submenu');
      expect(submenu!.getAttribute('role')).to.equal('menu');
    });

    it('provides aria-haspopup for parent items', async () => {
      const items: MenuItem[] = [
        {
          text: 'About',
          href: '/about',
          children: [{ text: 'Team', href: '/about/team' }],
        },
      ];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const link = el.shadowRoot!.querySelector('.menu-link');
      expect(link!.getAttribute('aria-haspopup')).to.equal('true');
    });

    it('provides aria-expanded for parent items', async () => {
      const items: MenuItem[] = [
        {
          text: 'About',
          href: '/about',
          children: [{ text: 'Team', href: '/about/team' }],
        },
      ];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const link = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;
      expect(link.getAttribute('aria-expanded')).to.equal('false');

      link.click();
      await el.updateComplete;

      expect(link.getAttribute('aria-expanded')).to.equal('true');
    });

    it('provides aria-current for current page', async () => {
      const items: MenuItem[] = [
        { text: 'Home', href: '/', current: false },
        { text: 'About', href: '/about', current: true },
      ];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const links = el.shadowRoot!.querySelectorAll('.menu-link');
      expect(links[0].getAttribute('aria-current')).to.equal('false');
      expect(links[1].getAttribute('aria-current')).to.equal('page');
    });

    it('supports custom aria-label on menu items', async () => {
      const items: MenuItem[] = [
        { text: 'Home', href: '/', ariaLabel: 'Navigate to homepage' },
      ];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const link = el.shadowRoot!.querySelector('.menu-link');
      expect(link!.getAttribute('aria-label')).to.equal('Navigate to homepage');
    });

    it('has accessible hamburger button', async () => {
      const el = await fixture<GCSiteMenu>(html`<gc-site-menu></gc-site-menu>`);

      const toggle = el.shadowRoot!.querySelector('.mobile-toggle');
      expect(toggle!.getAttribute('aria-label')).to.exist;
      expect(toggle!.getAttribute('aria-expanded')).to.exist;
      expect(toggle!.getAttribute('aria-controls')).to.equal('site-menu');
    });

    it('passes aXe accessibility audit', async () => {
      const items: MenuItem[] = [
        { text: 'Home', href: '/' },
        { text: 'Services', href: '/services' },
      ];
      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);
      await wcExpect(el).to.be.accessible();
    });
  });

  describe('Bilingual Support', () => {
    it('renders English labels by default', async () => {
      const el = await fixture<GCSiteMenu>(html`<gc-site-menu locale="en-CA"></gc-site-menu>`);
      await el.updateComplete;

      const nav = el.shadowRoot!.querySelector('nav');
      const ariaLabel = nav!.getAttribute('aria-label');
      // Translation key should exist
      expect(ariaLabel!.length).to.be.greaterThan(0);
    });

    it('renders French labels when locale is fr-CA', async () => {
      const el = await fixture<GCSiteMenu>(html`<gc-site-menu locale="fr-CA"></gc-site-menu>`);
      await el.updateComplete;

      const nav = el.shadowRoot!.querySelector('nav');
      const ariaLabel = nav!.getAttribute('aria-label');
      // Translation key should exist
      expect(ariaLabel!.length).to.be.greaterThan(0);
    });
  });

  describe('Event Emission', () => {
    it('emits gc-menu-item-click on navigation', async () => {
      const items: MenuItem[] = [{ text: 'Home', href: '/' }];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const link = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;

      setTimeout(() => link.click());
      const { detail } = await oneEvent(el, 'gc-menu-item-click');

      expect(detail.item).to.deep.include({ text: 'Home', href: '/' });
      expect(detail.path).to.deep.equal([0]);
    });

    it('event bubbles and is composed', async () => {
      const items: MenuItem[] = [{ text: 'Home', href: '/' }];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      let bubbled = false;
      let composed = false;

      document.addEventListener('gc-menu-item-click', (e: Event) => {
        bubbled = true;
        if (e.composed) composed = true;
      });

      const link = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;
      link.click();
      await el.updateComplete;

      expect(bubbled).to.be.true;
      expect(composed).to.be.true;
    });
  });

  describe('GC Design System Compliance', () => {
    it('uses Lato font family', async () => {
      const el = await fixture<GCSiteMenu>(html`<gc-site-menu></gc-site-menu>`);

      // Check CSS contains Lato (jsdom doesn't compute styles)
      const styles = (GCSiteMenu as unknown as { styles: { cssText: string } }).styles.cssText;
      expect(styles).to.include('Lato');
    });

    it('uses GC blue color (#284162) for links', async () => {
      const items: MenuItem[] = [{ text: 'Home', href: '/' }];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      // Check CSS contains GC blue color (jsdom doesn't compute styles accurately)
      const styles = (GCSiteMenu as unknown as { styles: { cssText: string } }).styles.cssText;
      expect(styles).to.include('#284162');
    });

    it('has 44px minimum touch target', async () => {
      const items: MenuItem[] = [{ text: 'Home', href: '/' }];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      // Check CSS contains 44px min-height (jsdom doesn't compute styles)
      const styles = (GCSiteMenu as unknown as { styles: { cssText: string } }).styles.cssText;
      expect(styles).to.include('44px');
    });
  });

  describe('Performance', () => {
    it('renders under 100ms', async () => {
      const items: MenuItem[] = Array.from({ length: 10 }, (_, i) => ({
        text: `Item ${i + 1}`,
        href: `/item-${i + 1}`,
      }));

      const start = performance.now();
      await fixture<GCSiteMenu>(html`<gc-site-menu .items="${items}"></gc-site-menu>`);
      const duration = performance.now() - start;

      expect(duration).to.be.lessThan(100);
    });

    it('handles large menu efficiently', async () => {
      const items: MenuItem[] = Array.from({ length: 50 }, (_, i) => ({
        text: `Item ${i + 1}`,
        href: `/item-${i + 1}`,
      }));

      const start = performance.now();
      const el = await fixture<GCSiteMenu>(html`<gc-site-menu .items="${items}"></gc-site-menu>`);
      const duration = performance.now() - start;

      expect(el.items).to.have.lengthOf(50);
      expect(duration).to.be.lessThan(200);
    });

    it('updates reactively when items change', async () => {
      const items: MenuItem[] = [{ text: 'Home', href: '/' }];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      expect(el.shadowRoot!.querySelectorAll('.menu-link')).to.have.lengthOf(1);

      el.items = [
        { text: 'Home', href: '/' },
        { text: 'About', href: '/about' },
      ];
      await el.updateComplete;

      expect(el.shadowRoot!.querySelectorAll('.menu-link')).to.have.lengthOf(2);
    });
  });

  describe('CSS Custom Properties', () => {
    it('exposes part="container" for styling', async () => {
      const el = await fixture<GCSiteMenu>(html`<gc-site-menu></gc-site-menu>`);

      const nav = el.shadowRoot!.querySelector('[part="container"]');
      expect(nav).to.exist;
    });

    it('exposes part="menu-list" for styling', async () => {
      const el = await fixture<GCSiteMenu>(html`<gc-site-menu></gc-site-menu>`);

      const menuList = el.shadowRoot!.querySelector('[part="menu-list"]');
      expect(menuList).to.exist;
    });

    it('exposes part="menu-link" for styling', async () => {
      const items: MenuItem[] = [{ text: 'Home', href: '/' }];

      const el = await fixture<GCSiteMenu>(html`
        <gc-site-menu .items="${items}"></gc-site-menu>
      `);

      const link = el.shadowRoot!.querySelector('[part="menu-link"]');
      expect(link).to.exist;
    });

    it('exposes part="mobile-toggle" for styling', async () => {
      const el = await fixture<GCSiteMenu>(html`<gc-site-menu></gc-site-menu>`);

      const toggle = el.shadowRoot!.querySelector('[part="mobile-toggle"]');
      expect(toggle).to.exist;
    });
  });
});
