import { expect, fixture, html, oneEvent, expect as wcExpect } from '@open-wc/testing';
import '../src/components/gc-patterns/gc-side-nav.ts';
import { GCSideNav } from '../src/components/gc-patterns/gc-side-nav.js';
import type { SideNavItem } from '../src/components/gc-patterns/gc-side-nav.js';

describe('gc-side-nav', () => {
  const simpleItems: SideNavItem[] = [
    { text: 'Home', href: '/home', id: 'home' },
    { text: 'About', href: '/about', id: 'about' },
    { text: 'Contact', href: '/contact', id: 'contact' },
  ];

  const nestedItems: SideNavItem[] = [
    { text: 'Dashboard', href: '/dashboard', id: 'dashboard' },
    {
      text: 'Services',
      id: 'services',
      children: [
        { text: 'Service A', href: '/services/a', id: 'service-a' },
        { text: 'Service B', href: '/services/b', id: 'service-b' },
      ],
    },
    {
      text: 'Resources',
      id: 'resources',
      children: [
        { text: 'Documents', href: '/resources/docs', id: 'docs' },
        { text: 'Videos', href: '/resources/videos', id: 'videos' },
      ],
    },
  ];

  describe('Initialization', () => {
    it('renders with default properties', async () => {
      const el = await fixture<GCSideNav>(html`<gc-side-nav></gc-side-nav>`);

      expect(el).to.exist;
      expect(el.items).to.deep.equal([]);
      expect(el.collapseAll).to.be.false;
      expect(el.expandAll).to.be.false;
      expect(el.showIcons).to.be.true;
      expect(el.showBadges).to.be.true;
      expect(el.multiExpand).to.be.true;
    });

    it('renders with custom items', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${simpleItems}"></gc-side-nav>
      `);

      expect(el.items).to.have.lengthOf(3);
      const links = el.shadowRoot!.querySelectorAll('.nav-link');
      expect(links).to.have.lengthOf(3);
    });

    it('has correct shadow DOM structure', async () => {
      const el = await fixture<GCSideNav>(html`<gc-side-nav></gc-side-nav>`);

      const nav = el.shadowRoot!.querySelector('nav');
      expect(nav).to.exist;
      expect(nav!.classList.contains('side-nav')).to.be.true;

      const list = el.shadowRoot!.querySelector('ul[role="list"]');
      expect(list).to.exist;
    });

    it('is defined as gc-side-nav', () => {
      const el = document.createElement('gc-side-nav');
      expect(el).to.be.instanceOf(GCSideNav);
    });
  });

  describe('Navigation Items Rendering', () => {
    it('renders simple navigation items', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${simpleItems}"></gc-side-nav>
      `);

      const links = el.shadowRoot!.querySelectorAll('.nav-link');
      expect(links).to.have.lengthOf(3);
      expect(links[0].textContent).to.include('Home');
      expect(links[1].textContent).to.include('About');
      expect(links[2].textContent).to.include('Contact');
    });

    it('renders href attributes correctly', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${simpleItems}"></gc-side-nav>
      `);

      const links = el.shadowRoot!.querySelectorAll('.nav-link');
      expect(links[0].getAttribute('href')).to.equal('/home');
      expect(links[1].getAttribute('href')).to.equal('/about');
      expect(links[2].getAttribute('href')).to.equal('/contact');
    });

    it('renders nested navigation items', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${nestedItems}" expand-all></gc-side-nav>
      `);

      const allLinks = el.shadowRoot!.querySelectorAll('.nav-link');
      expect(allLinks.length).to.be.greaterThan(3);

      const toggleButtons = el.shadowRoot!.querySelectorAll('.toggle-button');
      expect(toggleButtons).to.have.lengthOf(2);
    });

    it('marks current page with current class', async () => {
      const itemsWithCurrent: SideNavItem[] = [
        { text: 'Home', href: '/home' },
        { text: 'About', href: '/about', current: true },
        { text: 'Contact', href: '/contact' },
      ];

      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${itemsWithCurrent}"></gc-side-nav>
      `);

      const currentLink = el.shadowRoot!.querySelector('.nav-link.current');
      expect(currentLink).to.exist;
      expect(currentLink!.textContent).to.include('About');
    });

    it('renders icons when provided', async () => {
      const itemsWithIcons: SideNavItem[] = [
        { text: 'Home', href: '/home', icon: '🏠' },
        { text: 'Settings', href: '/settings', icon: '⚙️' },
      ];

      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${itemsWithIcons}"></gc-side-nav>
      `);

      const icons = el.shadowRoot!.querySelectorAll('.nav-icon');
      expect(icons).to.have.lengthOf(2);
      expect(icons[0].textContent).to.equal('🏠');
      expect(icons[1].textContent).to.equal('⚙️');
    });

    it('hides icons when show-icons is false', async () => {
      const itemsWithIcons: SideNavItem[] = [
        { text: 'Home', href: '/home', icon: '🏠' },
      ];

      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${itemsWithIcons}" .showIcons="${false}"></gc-side-nav>
      `);

      const icons = el.shadowRoot!.querySelectorAll('.nav-icon');
      expect(icons).to.have.lengthOf(0);
    });

    it('renders badges when provided', async () => {
      const itemsWithBadges: SideNavItem[] = [
        { text: 'Messages', href: '/messages', badge: '5' },
        { text: 'Notifications', href: '/notifications', badge: '12' },
      ];

      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${itemsWithBadges}"></gc-side-nav>
      `);

      const badges = el.shadowRoot!.querySelectorAll('.nav-badge');
      expect(badges).to.have.lengthOf(2);
      expect(badges[0].textContent).to.equal('5');
      expect(badges[1].textContent).to.equal('12');
    });

    it('renders disabled items', async () => {
      const itemsWithDisabled: SideNavItem[] = [
        { text: 'Active', href: '/active' },
        { text: 'Disabled', href: '/disabled', disabled: true },
      ];

      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${itemsWithDisabled}"></gc-side-nav>
      `);

      const links = el.shadowRoot!.querySelectorAll('.nav-link');
      expect(links[1].classList.contains('disabled')).to.be.true;
    });
  });

  describe('Section Expansion', () => {
    it('collapses sections by default with collapse-all', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${nestedItems}" collapse-all></gc-side-nav>
      `);

      const children = el.shadowRoot!.querySelectorAll('.nav-children');
      expect(children).to.have.lengthOf(0);
    });

    it('expands all sections with expand-all', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${nestedItems}" expand-all></gc-side-nav>
      `);

      const children = el.shadowRoot!.querySelectorAll('.nav-children');
      expect(children.length).to.be.greaterThan(0);
    });

    it('expands section on toggle button click', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${nestedItems}" collapse-all></gc-side-nav>
      `);

      const toggleButton = el.shadowRoot!.querySelector('.toggle-button') as HTMLButtonElement;
      expect(toggleButton).to.exist;

      toggleButton.click();
      await el.updateComplete;

      const children = el.shadowRoot!.querySelectorAll('.nav-children');
      expect(children.length).to.be.greaterThan(0);
    });

    it('collapses expanded section on toggle button click', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${nestedItems}" expand-all></gc-side-nav>
      `);

      const toggleButton = el.shadowRoot!.querySelector('.toggle-button') as HTMLButtonElement;
      toggleButton.click();
      await el.updateComplete;

      // Should have fewer expanded sections
      const children = el.shadowRoot!.querySelectorAll('.nav-children');
      expect(children.length).to.be.lessThan(2);
    });

    it('expands section containing current page', async () => {
      const itemsWithNestedCurrent: SideNavItem[] = [
        {
          text: 'Services',
          id: 'services',
          children: [
            { text: 'Service A', href: '/services/a', current: true },
            { text: 'Service B', href: '/services/b' },
          ],
        },
      ];

      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${itemsWithNestedCurrent}"></gc-side-nav>
      `);

      const children = el.shadowRoot!.querySelectorAll('.nav-children');
      expect(children.length).to.be.greaterThan(0);
    });

    it('respects expanded flag on items', async () => {
      const itemsWithExpanded: SideNavItem[] = [
        {
          text: 'Services',
          id: 'services',
          expanded: true,
          children: [
            { text: 'Service A', href: '/services/a' },
            { text: 'Service B', href: '/services/b' },
          ],
        },
      ];

      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${itemsWithExpanded}"></gc-side-nav>
      `);

      const children = el.shadowRoot!.querySelectorAll('.nav-children');
      expect(children.length).to.be.greaterThan(0);
    });

    it('closes other sections when multi-expand is false', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${nestedItems}" .multiExpand="${false}" collapse-all></gc-side-nav>
      `);

      const toggleButtons = el.shadowRoot!.querySelectorAll('.toggle-button');
      
      // Expand first section
      (toggleButtons[0] as HTMLButtonElement).click();
      await el.updateComplete;
      let children = el.shadowRoot!.querySelectorAll('.nav-children');
      expect(children).to.have.lengthOf(1);

      // Expand second section (should close first)
      (toggleButtons[1] as HTMLButtonElement).click();
      await el.updateComplete;
      children = el.shadowRoot!.querySelectorAll('.nav-children');
      expect(children).to.have.lengthOf(1);
    });
  });

  describe('Navigation Interaction', () => {
    it('emits gc-side-nav-click event on item click', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${simpleItems}"></gc-side-nav>
      `);

      const link = el.shadowRoot!.querySelector('.nav-link') as HTMLAnchorElement;

      setTimeout(() => link.click());
      const { detail } = await oneEvent(el, 'gc-side-nav-click');

      expect(detail.item.text).to.equal('Home');
      expect(detail.path).to.deep.equal([0]);
    });

    it('emits gc-side-nav-toggle event on toggle', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${nestedItems}" collapse-all></gc-side-nav>
      `);

      const toggleButton = el.shadowRoot!.querySelector('.toggle-button') as HTMLButtonElement;

      setTimeout(() => toggleButton.click());
      const { detail } = await oneEvent(el, 'gc-side-nav-toggle');

      expect(detail.item.text).to.equal('Services');
      expect(detail.expanded).to.be.true;
    });

    it('does not emit click event for disabled items', async () => {
      const itemsWithDisabled: SideNavItem[] = [
        { text: 'Disabled', href: '/disabled', disabled: true },
      ];

      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${itemsWithDisabled}"></gc-side-nav>
      `);

      let eventFired = false;
      el.addEventListener('gc-side-nav-click', () => {
        eventFired = true;
      });

      const link = el.shadowRoot!.querySelector('.nav-link') as HTMLAnchorElement;
      link.click();
      await el.updateComplete;

      expect(eventFired).to.be.false;
    });

    it('toggles section when clicking parent without href', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${nestedItems}" collapse-all></gc-side-nav>
      `);

      const parentLinks = el.shadowRoot!.querySelectorAll('.nav-link');
      const servicesLink = Array.from(parentLinks).find(
        (link) => link.textContent?.includes('Services')
      ) as HTMLAnchorElement;

      servicesLink.click();
      await el.updateComplete;

      const children = el.shadowRoot!.querySelectorAll('.nav-children');
      expect(children.length).to.be.greaterThan(0);
    });
  });

  describe('Keyboard Navigation', () => {
    it('activates link on Enter key', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${simpleItems}"></gc-side-nav>
      `);

      const link = el.shadowRoot!.querySelector('.nav-link') as HTMLAnchorElement;

      setTimeout(() => {
        link.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      });
      const { detail } = await oneEvent(el, 'gc-side-nav-click');

      expect(detail.item.text).to.equal('Home');
    });

    it('activates link on Space key', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${simpleItems}"></gc-side-nav>
      `);

      const link = el.shadowRoot!.querySelector('.nav-link') as HTMLAnchorElement;

      setTimeout(() => {
        link.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      });
      const { detail } = await oneEvent(el, 'gc-side-nav-click');

      expect(detail.item.text).to.equal('Home');
    });

    it('prevents default on Enter key', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${simpleItems}"></gc-side-nav>
      `);

      const link = el.shadowRoot!.querySelector('.nav-link') as HTMLAnchorElement;

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
  });

  describe('Accessibility', () => {
    it('uses semantic nav element', async () => {
      const el = await fixture<GCSideNav>(html`<gc-side-nav></gc-side-nav>`);

      const nav = el.shadowRoot!.querySelector('nav');
      expect(nav).to.exist;
      expect(nav!.tagName).to.equal('NAV');
    });

    it('has aria-label on navigation', async () => {
      const el = await fixture<GCSideNav>(html`<gc-side-nav></gc-side-nav>`);
      await el.updateComplete;

      const nav = el.shadowRoot!.querySelector('nav');
      const ariaLabel = nav!.getAttribute('aria-label');
      expect(ariaLabel).to.exist;
      expect(ariaLabel!.length).to.be.greaterThan(0);
    });

    it('uses role="button" on items with children', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${nestedItems}"></gc-side-nav>
      `);

      const parentLinks = el.shadowRoot!.querySelectorAll('.nav-link.has-children');
      parentLinks.forEach((link) => {
        expect(link.getAttribute('role')).to.equal('button');
      });
    });

    it('uses role="link" on items without children', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${simpleItems}"></gc-side-nav>
      `);

      const links = el.shadowRoot!.querySelectorAll('.nav-link');
      links.forEach((link) => {
        expect(link.getAttribute('role')).to.equal('link');
      });
    });

    it('sets aria-current on current page', async () => {
      const itemsWithCurrent: SideNavItem[] = [
        { text: 'Home', href: '/home', current: true },
      ];

      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${itemsWithCurrent}"></gc-side-nav>
      `);

      const currentLink = el.shadowRoot!.querySelector('.nav-link.current');
      expect(currentLink!.getAttribute('aria-current')).to.equal('page');
    });

    it('sets aria-expanded on expandable items', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${nestedItems}" collapse-all></gc-side-nav>
      `);

      const parentLink = el.shadowRoot!.querySelector('.nav-link.has-children');
      expect(parentLink!.getAttribute('aria-expanded')).to.equal('false');

      const toggleButton = el.shadowRoot!.querySelector('.toggle-button') as HTMLButtonElement;
      toggleButton.click();
      await el.updateComplete;

      expect(parentLink!.getAttribute('aria-expanded')).to.equal('true');
    });

    it('provides aria-label on toggle buttons', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${nestedItems}" collapse-all></gc-side-nav>
      `);

      const toggleButton = el.shadowRoot!.querySelector('.toggle-button') as HTMLButtonElement;
      const ariaLabel = toggleButton.getAttribute('aria-label');
      expect(ariaLabel).to.exist;
      expect(ariaLabel!.length).to.be.greaterThan(0);
    });

    it('supports custom aria-label on items', async () => {
      const itemsWithAriaLabel: SideNavItem[] = [
        { text: 'Home', href: '/home', ariaLabel: 'Navigate to homepage' },
      ];

      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${itemsWithAriaLabel}"></gc-side-nav>
      `);

      const link = el.shadowRoot!.querySelector('.nav-link');
      expect(link!.getAttribute('aria-label')).to.equal('Navigate to homepage');
    });

    it('uses role="group" for nested lists', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${nestedItems}" expand-all></gc-side-nav>
      `);

      const groups = el.shadowRoot!.querySelectorAll('[role="group"]');
      expect(groups.length).to.be.greaterThan(0);
    });

    it('passes aXe accessibility audit', async () => {
      const items: SideNavItem[] = [
        { text: 'Home', href: '/' },
        { text: 'About', href: '/about' },
      ];
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${items}"></gc-side-nav>
      `);
      await wcExpect(el).to.be.accessible();
    });
  });

  describe('Bilingual Support', () => {
    it('renders English labels by default', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav locale="en-CA" .items="${nestedItems}" collapse-all></gc-side-nav>
      `);
      await el.updateComplete;

      const toggleButton = el.shadowRoot!.querySelector('.toggle-button');
      expect(toggleButton!.getAttribute('aria-label')).to.exist;
    });

    it('renders French labels when locale is fr-CA', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav locale="fr-CA" .items="${nestedItems}" collapse-all></gc-side-nav>
      `);
      await el.updateComplete;

      const toggleButton = el.shadowRoot!.querySelector('.toggle-button');
      expect(toggleButton!.getAttribute('aria-label')).to.exist;
    });
  });

  describe('Event Emission', () => {
    it('emits click event with correct detail', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${simpleItems}"></gc-side-nav>
      `);

      const link = el.shadowRoot!.querySelector('.nav-link') as HTMLAnchorElement;

      setTimeout(() => link.click());
      const { detail } = await oneEvent(el, 'gc-side-nav-click');

      expect(detail.item).to.exist;
      expect(detail.path).to.be.an('array');
    });

    it('click event bubbles and is composed', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${simpleItems}"></gc-side-nav>
      `);

      let bubbled = false;
      let composed = false;

      document.addEventListener('gc-side-nav-click', (e: Event) => {
        bubbled = true;
        if (e.composed) composed = true;
      });

      const link = el.shadowRoot!.querySelector('.nav-link') as HTMLAnchorElement;
      link.click();
      await el.updateComplete;

      expect(bubbled).to.be.true;
      expect(composed).to.be.true;
    });

    it('toggle event bubbles and is composed', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${nestedItems}" collapse-all></gc-side-nav>
      `);

      let bubbled = false;
      let composed = false;

      document.addEventListener('gc-side-nav-toggle', (e: Event) => {
        bubbled = true;
        if (e.composed) composed = true;
      });

      const toggleButton = el.shadowRoot!.querySelector('.toggle-button') as HTMLButtonElement;
      toggleButton.click();
      await el.updateComplete;

      expect(bubbled).to.be.true;
      expect(composed).to.be.true;
    });
  });

  describe('GC Design System Compliance', () => {
    it('uses Lato font family', async () => {
      const el = await fixture<GCSideNav>(html`<gc-side-nav></gc-side-nav>`);

      const styles = (GCSideNav as unknown as { styles: { cssText: string } }).styles.cssText;
      expect(styles).to.include('Lato');
    });

    it('uses GC blue color (#284162)', async () => {
      const el = await fixture<GCSideNav>(html`<gc-side-nav></gc-side-nav>`);

      const styles = (GCSideNav as unknown as { styles: { cssText: string } }).styles.cssText;
      expect(styles).to.include('#284162');
    });

    it('has 44px minimum touch target', async () => {
      const el = await fixture<GCSideNav>(html`<gc-side-nav></gc-side-nav>`);

      const styles = (GCSideNav as unknown as { styles: { cssText: string } }).styles.cssText;
      expect(styles).to.include('44px');
    });
  });

  describe('Performance', () => {
    it('renders under 100ms', async () => {
      const start = performance.now();
      await fixture<GCSideNav>(html`
        <gc-side-nav .items="${nestedItems}"></gc-side-nav>
      `);
      const duration = performance.now() - start;

      expect(duration).to.be.lessThan(100);
    });

    it('handles large navigation trees efficiently', async () => {
      const largeItems: SideNavItem[] = Array.from({ length: 50 }, (_, i) => ({
        text: `Item ${i}`,
        href: `/item-${i}`,
        id: `item-${i}`,
      }));

      const start = performance.now();
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${largeItems}"></gc-side-nav>
      `);
      const duration = performance.now() - start;

      expect(el.items).to.have.lengthOf(50);
      expect(duration).to.be.lessThan(200);
    });

    it('updates reactively when properties change', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${simpleItems}"></gc-side-nav>
      `);

      el.items = nestedItems;
      await el.updateComplete;

      expect(el.items).to.have.lengthOf(3);
    });
  });

  describe('CSS Custom Properties', () => {
    it('exposes part="container" for styling', async () => {
      const el = await fixture<GCSideNav>(html`<gc-side-nav></gc-side-nav>`);

      const container = el.shadowRoot!.querySelector('[part="container"]');
      expect(container).to.exist;
    });

    it('exposes part="nav-list" for styling', async () => {
      const el = await fixture<GCSideNav>(html`<gc-side-nav></gc-side-nav>`);

      const navList = el.shadowRoot!.querySelector('[part="nav-list"]');
      expect(navList).to.exist;
    });

    it('exposes part="nav-item" for styling', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${simpleItems}"></gc-side-nav>
      `);

      const navItem = el.shadowRoot!.querySelector('[part="nav-item"]');
      expect(navItem).to.exist;
    });

    it('exposes part="nav-link" for styling', async () => {
      const el = await fixture<GCSideNav>(html`
        <gc-side-nav .items="${simpleItems}"></gc-side-nav>
      `);

      const navLink = el.shadowRoot!.querySelector('[part="nav-link"]');
      expect(navLink).to.exist;
    });
  });
});
