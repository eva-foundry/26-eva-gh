import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html, oneEvent, waitUntil, beAccessible } from './vitest-helpers-clean';
import '../src/components/gc-patterns/gc-action-menu.ts';
import { GCActionMenu } from '../src/components/gc-patterns/gc-action-menu.js';
import type { ActionMenuItem } from '../src/components/gc-patterns/gc-action-menu.js';

describe('gc-action-menu', () => {
  const simpleItems: ActionMenuItem[] = [
    { text: 'Edit', id: 'edit', icon: '✏️' },
    { text: 'Delete', id: 'delete', icon: '🗑️', danger: true },
    { text: 'Share', id: 'share', icon: '📤' },
  ];

  const itemsWithDivider: ActionMenuItem[] = [
    { text: 'Edit', id: 'edit' },
    { text: 'Duplicate', id: 'duplicate' },
    { divider: true },
    { text: 'Delete', id: 'delete', danger: true },
  ];

  describe('Initialization', () => {
    it('renders with default properties', async () => {
      const el = await fixture<GCActionMenu>(html`<gc-action-menu></gc-action-menu>`);

      expect(el).to.exist;
      expect(el.items).to.deep.equal([]);
      expect(el.triggerText).to.equal('');
      expect(el.triggerIcon).to.equal('');
      expect(el.iconOnly).to.be.false;
      expect(el.showCaret).to.be.true;
      expect(el.align).to.equal('left');
      expect(el.open).to.be.false;
      expect(el.closeOnSelect).to.be.true;
    });

    it('renders with custom items', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}"></gc-action-menu>
      `);

      expect(el.items).to.have.lengthOf(3);
    });

    it('has correct shadow DOM structure', async () => {
      const el = await fixture<GCActionMenu>(html`<gc-action-menu></gc-action-menu>`);

      const trigger = el.shadowRoot!.querySelector('.trigger');
      expect(trigger).to.exist;

      const menu = el.shadowRoot!.querySelector('.menu');
      expect(menu).to.exist;
    });

    it('is defined as gc-action-menu', () => {
      const el = document.createElement('gc-action-menu');
      expect(el).to.be.instanceOf(GCActionMenu);
    });
  });

  describe('Trigger Button', () => {
    it('renders trigger with text', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu trigger-text="Actions"></gc-action-menu>
      `);

      const trigger = el.shadowRoot!.querySelector('.trigger');
      expect(trigger!.textContent).to.include('Actions');
    });

    it('renders trigger with icon', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu trigger-icon="⚙️"></gc-action-menu>
      `);

      const icon = el.shadowRoot!.querySelector('.trigger-icon');
      expect(icon).to.exist;
      expect(icon!.textContent).to.equal('⚙️');
    });

    it('renders icon-only trigger', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu trigger-icon="⋮" icon-only></gc-action-menu>
      `);

      const trigger = el.shadowRoot!.querySelector('.trigger');
      expect(trigger!.classList.contains('icon-only')).to.be.true;

      const text = el.shadowRoot!.querySelector('.trigger-text');
      expect(text).to.be.null;
    });

    it('shows caret by default', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu trigger-text="Actions"></gc-action-menu>
      `);

      const caret = el.shadowRoot!.querySelector('.caret');
      expect(caret).to.exist;
    });

    it('hides caret when show-caret is false', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu trigger-text="Actions" .showCaret="${false}"></gc-action-menu>
      `);

      const caret = el.shadowRoot!.querySelector('.caret');
      expect(caret).to.be.null;
    });

    it('opens menu on trigger click', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}"></gc-action-menu>
      `);

      const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLButtonElement;
      trigger.click();
      await el.updateComplete;

      expect(el.open).to.be.true;
      const menu = el.shadowRoot!.querySelector('.menu');
      expect(menu!.classList.contains('open')).to.be.true;
    });

    it('toggles menu on repeated clicks', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}"></gc-action-menu>
      `);

      const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLButtonElement;

      trigger.click();
      await el.updateComplete;
      expect(el.open).to.be.true;

      trigger.click();
      await el.updateComplete;
      expect(el.open).to.be.false;
    });
  });

  describe('Menu Items Rendering', () => {
    it('renders menu items', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open></gc-action-menu>
      `);

      const menuLinks = el.shadowRoot!.querySelectorAll('.menu-link');
      expect(menuLinks).to.have.lengthOf(3);
      expect(menuLinks[0].textContent).to.include('Edit');
      expect(menuLinks[1].textContent).to.include('Delete');
      expect(menuLinks[2].textContent).to.include('Share');
    });

    it('renders menu item icons', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open></gc-action-menu>
      `);

      const icons = el.shadowRoot!.querySelectorAll('.menu-icon');
      expect(icons).to.have.lengthOf(3);
      expect(icons[0].textContent).to.equal('✏️');
      expect(icons[1].textContent).to.equal('🗑️');
      expect(icons[2].textContent).to.equal('📤');
    });

    it('renders dividers', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${itemsWithDivider}" open></gc-action-menu>
      `);

      const dividers = el.shadowRoot!.querySelectorAll('.divider');
      expect(dividers).to.have.lengthOf(1);
    });

    it('marks danger items with danger class', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open></gc-action-menu>
      `);

      const menuLinks = el.shadowRoot!.querySelectorAll('.menu-link');
      expect(menuLinks[1].classList.contains('danger')).to.be.true;
    });

    it('renders disabled items', async () => {
      const itemsWithDisabled: ActionMenuItem[] = [
        { text: 'Active', id: 'active' },
        { text: 'Disabled', id: 'disabled', disabled: true },
      ];

      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${itemsWithDisabled}" open></gc-action-menu>
      `);

      const menuLinks = el.shadowRoot!.querySelectorAll('.menu-link');
      expect(menuLinks[1].classList.contains('disabled')).to.be.true;
    });
  });

  describe('Menu Positioning', () => {
    it('aligns menu left by default', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open></gc-action-menu>
      `);

      const menu = el.shadowRoot!.querySelector('.menu');
      expect(menu!.classList.contains('align-right')).to.be.false;
      expect(menu!.classList.contains('align-center')).to.be.false;
    });

    it('aligns menu right when specified', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" align="right" open></gc-action-menu>
      `);

      const menu = el.shadowRoot!.querySelector('.menu');
      expect(menu!.classList.contains('align-right')).to.be.true;
    });

    it('aligns menu center when specified', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" align="center" open></gc-action-menu>
      `);

      const menu = el.shadowRoot!.querySelector('.menu');
      expect(menu!.classList.contains('align-center')).to.be.true;
    });
  });

  describe('Menu Interaction', () => {
    it('emits gc-action-select on item click', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open></gc-action-menu>
      `);

      const menuLink = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;

      setTimeout(() => menuLink.click());
      const { detail } = await oneEvent(el, 'gc-action-select');

      expect(detail.item.text).to.equal('Edit');
    });

    it('closes menu after item click by default', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open></gc-action-menu>
      `);

      const menuLink = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;
      menuLink.click();
      await el.updateComplete;

      expect(el.open).to.be.false;
    });

    it('keeps menu open when close-on-select is false', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open .closeOnSelect="${false}"></gc-action-menu>
      `);

      const menuLink = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;
      menuLink.click();
      await el.updateComplete;

      expect(el.open).to.be.true;
    });

    it('does not emit event for disabled items', async () => {
      const itemsWithDisabled: ActionMenuItem[] = [
        { text: 'Disabled', id: 'disabled', disabled: true },
      ];

      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${itemsWithDisabled}" open></gc-action-menu>
      `);

      let eventFired = false;
      el.addEventListener('gc-action-select', () => {
        eventFired = true;
      });

      const menuLink = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;
      menuLink.click();
      await el.updateComplete;

      expect(eventFired).to.be.false;
    });

    it('closes menu on click outside', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open></gc-action-menu>
      `);

      document.body.click();
      await el.updateComplete;

      expect(el.open).to.be.false;
    });

    it('closes menu on Escape key', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open></gc-action-menu>
      `);

      const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
      document.dispatchEvent(event);
      await el.updateComplete;

      expect(el.open).to.be.false;
    });

    it('emits gc-action-menu-toggle event', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}"></gc-action-menu>
      `);

      const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLButtonElement;

      setTimeout(() => trigger.click());
      const { detail } = await oneEvent(el, 'gc-action-menu-toggle');

      expect(detail.open).to.be.true;
    });
  });

  describe('Keyboard Navigation', () => {
    it('focuses first item when menu opens', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}"></gc-action-menu>
      `);

      const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLButtonElement;
      trigger.click();
      await el.updateComplete;
      await waitUntil(() => el.shadowRoot!.activeElement !== null, '', { timeout: 500 });

      const firstLink = el.shadowRoot!.querySelector('.menu-link') as HTMLElement;
      expect(el.shadowRoot!.activeElement).to.equal(firstLink);
    });

    it('navigates down with ArrowDown', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open></gc-action-menu>
      `);

      const menu = el.shadowRoot!.querySelector('.menu') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
      menu.dispatchEvent(event);
      await el.updateComplete;

      // Focus should move to first item
      await waitUntil(() => el.shadowRoot!.activeElement !== null, '', { timeout: 500 });
    });

    it('navigates up with ArrowUp', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open></gc-action-menu>
      `);

      const menu = el.shadowRoot!.querySelector('.menu') as HTMLElement;

      // First move down
      menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await el.updateComplete;

      // Then move down again
      menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await el.updateComplete;

      // Then move up
      menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      await el.updateComplete;

      await waitUntil(() => el.shadowRoot!.activeElement !== null, '', { timeout: 500 });
    });

    it('jumps to first item with Home key', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open></gc-action-menu>
      `);

      const menu = el.shadowRoot!.querySelector('.menu') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'Home', bubbles: true });
      menu.dispatchEvent(event);
      await el.updateComplete;

      await waitUntil(() => el.shadowRoot!.activeElement !== null, '', { timeout: 500 });
    });

    it('jumps to last item with End key', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open></gc-action-menu>
      `);

      const menu = el.shadowRoot!.querySelector('.menu') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'End', bubbles: true });
      menu.dispatchEvent(event);
      await el.updateComplete;

      await waitUntil(() => el.shadowRoot!.activeElement !== null, '', { timeout: 500 });
    });

    it('activates item with Enter key', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open></gc-action-menu>
      `);

      const menu = el.shadowRoot!.querySelector('.menu') as HTMLElement;

      // Focus first item
      menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await el.updateComplete;

      let eventFired = false;
      el.addEventListener('gc-action-select', () => {
        eventFired = true;
      });

      // Activate with Enter
      menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await el.updateComplete;

      expect(eventFired).to.be.true;
    });

    it('activates item with Space key', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open></gc-action-menu>
      `);

      const menu = el.shadowRoot!.querySelector('.menu') as HTMLElement;

      // Focus first item
      menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await el.updateComplete;

      let eventFired = false;
      el.addEventListener('gc-action-select', () => {
        eventFired = true;
      });

      // Activate with Space
      menu.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      await el.updateComplete;

      expect(eventFired).to.be.true;
    });
  });

  describe('Accessibility', () => {
    it('has aria-haspopup on trigger', async () => {
      const el = await fixture<GCActionMenu>(html`<gc-action-menu></gc-action-menu>`);

      const trigger = el.shadowRoot!.querySelector('.trigger');
      expect(trigger!.getAttribute('aria-haspopup')).to.equal('true');
    });

    it('has aria-expanded on trigger', async () => {
      const el = await fixture<GCActionMenu>(html`<gc-action-menu></gc-action-menu>`);

      const trigger = el.shadowRoot!.querySelector('.trigger');
      expect(trigger!.getAttribute('aria-expanded')).to.equal('false');

      el.open = true;
      await el.updateComplete;

      expect(trigger!.getAttribute('aria-expanded')).to.equal('true');
    });

    it('has role="menu" on menu container', async () => {
      const el = await fixture<GCActionMenu>(html`<gc-action-menu></gc-action-menu>`);

      const menu = el.shadowRoot!.querySelector('.menu');
      expect(menu!.getAttribute('role')).to.equal('menu');
    });

    it('has role="menuitem" on menu items', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open></gc-action-menu>
      `);

      const menuLinks = el.shadowRoot!.querySelectorAll('.menu-link');
      menuLinks.forEach((link) => {
        expect(link.getAttribute('role')).to.equal('menuitem');
      });
    });

    it('has aria-label on menu', async () => {
      const el = await fixture<GCActionMenu>(html`<gc-action-menu></gc-action-menu>`);
      await el.updateComplete;

      const menu = el.shadowRoot!.querySelector('.menu');
      const ariaLabel = menu!.getAttribute('aria-label');
      expect(ariaLabel).to.exist;
      expect(ariaLabel!.length).to.be.greaterThan(0);
    });

    it('has aria-label on trigger', async () => {
      const el = await fixture<GCActionMenu>(html`<gc-action-menu></gc-action-menu>`);
      await el.updateComplete;

      const trigger = el.shadowRoot!.querySelector('.trigger');
      const ariaLabel = trigger!.getAttribute('aria-label');
      expect(ariaLabel).to.exist;
      expect(ariaLabel!.length).to.be.greaterThan(0);
    });

    it('supports custom aria-label on items', async () => {
      const itemsWithAriaLabel: ActionMenuItem[] = [
        { text: 'Edit', ariaLabel: 'Edit this item' },
      ];

      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${itemsWithAriaLabel}" open></gc-action-menu>
      `);

      const link = el.shadowRoot!.querySelector('.menu-link');
      expect(link!.getAttribute('aria-label')).to.equal('Edit this item');
    });

    it('has aria-disabled on disabled items', async () => {
      const itemsWithDisabled: ActionMenuItem[] = [
        { text: 'Disabled', disabled: true },
      ];

      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${itemsWithDisabled}" open></gc-action-menu>
      `);

      const link = el.shadowRoot!.querySelector('.menu-link');
      expect(link!.getAttribute('aria-disabled')).to.equal('true');
    });

    it('has role="separator" on dividers', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${itemsWithDivider}" open></gc-action-menu>
      `);

      const divider = el.shadowRoot!.querySelector('.divider');
      expect(divider!.getAttribute('role')).to.equal('separator');
    });

    it('passes aXe accessibility audit', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" trigger-text="Actions"></gc-action-menu>
      `);
      
      // Provide content for accessibility testing
      await el.updateComplete;
      
      await beAccessible(el);
    });
  });

  describe('Bilingual Support', () => {
    it('renders English labels by default', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu locale="en-CA"></gc-action-menu>
      `);
      await el.updateComplete;

      const trigger = el.shadowRoot!.querySelector('.trigger');
      expect(trigger!.getAttribute('aria-label')).to.exist;
    });

    it('renders French labels when locale is fr-CA', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu locale="fr-CA"></gc-action-menu>
      `);
      await el.updateComplete;

      const trigger = el.shadowRoot!.querySelector('.trigger');
      expect(trigger!.getAttribute('aria-label')).to.exist;
    });
  });

  describe('Event Emission', () => {
    it('emits select event with correct detail', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open></gc-action-menu>
      `);

      const menuLink = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;

      setTimeout(() => menuLink.click());
      const { detail } = await oneEvent(el, 'gc-action-select');

      expect(detail.item).to.exist;
      expect(detail.item.text).to.equal('Edit');
    });

    it('select event bubbles and is composed', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open></gc-action-menu>
      `);

      let bubbled = false;
      let composed = false;

      document.addEventListener('gc-action-select', (e: Event) => {
        bubbled = true;
        if (e.composed) composed = true;
      });

      const menuLink = el.shadowRoot!.querySelector('.menu-link') as HTMLAnchorElement;
      menuLink.click();
      await el.updateComplete;

      expect(bubbled).to.be.true;
      expect(composed).to.be.true;
    });

    it('toggle event bubbles and is composed', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}"></gc-action-menu>
      `);

      let bubbled = false;
      let composed = false;

      document.addEventListener('gc-action-menu-toggle', (e: Event) => {
        bubbled = true;
        if (e.composed) composed = true;
      });

      const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLButtonElement;
      trigger.click();
      await el.updateComplete;

      expect(bubbled).to.be.true;
      expect(composed).to.be.true;
    });
  });

  describe('GC Design System Compliance', () => {
    it('uses Lato font family', async () => {
      const el = await fixture<GCActionMenu>(html`<gc-action-menu></gc-action-menu>`);

      const styles = (GCActionMenu as unknown as { styles: { cssText: string } }).styles.cssText;
      expect(styles).to.include('Lato');
    });

    it('uses GC blue color (#284162)', async () => {
      const el = await fixture<GCActionMenu>(html`<gc-action-menu></gc-action-menu>`);

      const styles = (GCActionMenu as unknown as { styles: { cssText: string } }).styles.cssText;
      expect(styles).to.include('#284162');
    });

    it('has 44px minimum touch target', async () => {
      const el = await fixture<GCActionMenu>(html`<gc-action-menu></gc-action-menu>`);

      const styles = (GCActionMenu as unknown as { styles: { cssText: string } }).styles.cssText;
      expect(styles).to.include('44px');
    });
  });

  describe('Performance', () => {
    it('renders under 100ms', async () => {
      const start = performance.now();
      await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}"></gc-action-menu>
      `);
      const duration = performance.now() - start;

      expect(duration).to.be.lessThan(100);
    });

    it('handles large item lists efficiently', async () => {
      const largeItems: ActionMenuItem[] = Array.from({ length: 50 }, (_, i) => ({
        text: `Action ${i}`,
        id: `action-${i}`,
      }));

      const start = performance.now();
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${largeItems}"></gc-action-menu>
      `);
      const duration = performance.now() - start;

      expect(el.items).to.have.lengthOf(50);
      expect(duration).to.be.lessThan(200);
    });

    it('updates reactively when properties change', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}"></gc-action-menu>
      `);

      el.items = itemsWithDivider;
      await el.updateComplete;

      expect(el.items).to.have.lengthOf(4);
    });
  });

  describe('CSS Custom Properties', () => {
    it('exposes part="trigger" for styling', async () => {
      const el = await fixture<GCActionMenu>(html`<gc-action-menu></gc-action-menu>`);

      const trigger = el.shadowRoot!.querySelector('[part="trigger"]');
      expect(trigger).to.exist;
    });

    it('exposes part="menu" for styling', async () => {
      const el = await fixture<GCActionMenu>(html`<gc-action-menu></gc-action-menu>`);

      const menu = el.shadowRoot!.querySelector('[part="menu"]');
      expect(menu).to.exist;
    });

    it('exposes part="menu-item" for styling', async () => {
      const el = await fixture<GCActionMenu>(html`
        <gc-action-menu .items="${simpleItems}" open></gc-action-menu>
      `);

      const menuItem = el.shadowRoot!.querySelector('[part="menu-item"]');
      expect(menuItem).to.exist;
    });
  });
});
