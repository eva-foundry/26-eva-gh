import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach, vi } from 'vitest';
import './wb-menu.js';
import type { WBMenu, WBMenuItem } from './wb-menu.js';

describe('WBMenu', () => {
  let menu: WBMenu;

  beforeEach(async () => {
    menu = await fixture<WBMenu>(html`
      <wb-menu>
        <button slot="trigger">Services</button>
        <wb-menu-item>Benefits</wb-menu-item>
        <wb-menu-item>Taxes</wb-menu-item>
        <wb-menu-item>Immigration</wb-menu-item>
      </wb-menu>
    `);
  });

  it('renders', () => {
    expect(menu).toBeDefined();
  });

  it('renders trigger button', () => {
    const trigger = menu.querySelector('[slot="trigger"]');
    expect(trigger?.textContent).toBe('Services');
  });

  it('starts closed by default', () => {
    const panel = menu.shadowRoot!.querySelector('.menu-panel');
    expect(panel?.classList.contains('open')).toBe(false);
  });

  it('opens on trigger click', async () => {
    const trigger = menu.shadowRoot!.querySelector('.menu-trigger') as HTMLElement;

    trigger.click();
    await menu.updateComplete;

    const panel = menu.shadowRoot!.querySelector('.menu-panel');
    expect(panel?.classList.contains('open')).toBe(true);
  });

  it('closes on second trigger click', async () => {
    const trigger = menu.shadowRoot!.querySelector('.menu-trigger') as HTMLElement;

    trigger.click();
    await menu.updateComplete;

    trigger.click();
    await menu.updateComplete;

    const panel = menu.shadowRoot!.querySelector('.menu-panel');
    expect(panel?.classList.contains('open')).toBe(false);
  });

  it('updates aria-expanded when toggling', async () => {
    const trigger = menu.shadowRoot!.querySelector('.menu-trigger');

    expect(trigger?.getAttribute('aria-expanded')).toBe('false');

    menu.open();
    await menu.updateComplete;

    expect(trigger?.getAttribute('aria-expanded')).toBe('true');
  });

  it('has correct ARIA attributes', () => {
    const trigger = menu.shadowRoot!.querySelector('.menu-trigger');
    const panel = menu.shadowRoot!.querySelector('.menu-panel');

    expect(trigger?.getAttribute('role')).toBe('button');
    expect(trigger?.getAttribute('aria-haspopup')).toBe('true');
    expect(panel?.getAttribute('role')).toBe('menu');
  });

  it('opens on Enter key', async () => {
    const trigger = menu.shadowRoot!.querySelector('.menu-trigger') as HTMLElement;

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await menu.updateComplete;

    const panel = menu.shadowRoot!.querySelector('.menu-panel');
    expect(panel?.classList.contains('open')).toBe(true);
  });

  it('opens on Space key', async () => {
    const trigger = menu.shadowRoot!.querySelector('.menu-trigger') as HTMLElement;

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await menu.updateComplete;

    const panel = menu.shadowRoot!.querySelector('.menu-panel');
    expect(panel?.classList.contains('open')).toBe(true);
  });

  it('opens on ArrowDown key', async () => {
    const trigger = menu.shadowRoot!.querySelector('.menu-trigger') as HTMLElement;

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await menu.updateComplete;

    const panel = menu.shadowRoot!.querySelector('.menu-panel');
    expect(panel?.classList.contains('open')).toBe(true);
  });

  it('closes on Escape key', async () => {
    menu.open();
    await menu.updateComplete;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await menu.updateComplete;

    const panel = menu.shadowRoot!.querySelector('.menu-panel');
    expect(panel?.classList.contains('open')).toBe(false);
  });

  it('closes on outside click', async () => {
    menu.open();
    await menu.updateComplete;

    document.body.click();
    await menu.updateComplete;

    const panel = menu.shadowRoot!.querySelector('.menu-panel');
    expect(panel?.classList.contains('open')).toBe(false);
  });

  it('does not close on inside click', async () => {
    menu.open();
    await menu.updateComplete;

    const panel = menu.shadowRoot!.querySelector('.menu-panel') as HTMLElement;
    panel.click();
    await menu.updateComplete;

    expect(panel.classList.contains('open')).toBe(true);
  });

  it('emits wb-menu-open event', async () => {
    let eventFired = false;
    menu.addEventListener('wb-menu-open', () => {
      eventFired = true;
    });

    menu.open();
    await menu.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('emits wb-menu-close event', async () => {
    menu.open();
    await menu.updateComplete;

    let eventFired = false;
    menu.addEventListener('wb-menu-close', () => {
      eventFired = true;
    });

    menu.close();
    await menu.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('emits wb-menu-select event on item click', async () => {
    let eventFired = false;
    let eventDetail: any;

    menu.addEventListener('wb-menu-select', ((e: CustomEvent) => {
      eventFired = true;
      eventDetail = e.detail;
    }) as EventListener);

    menu.open();
    await menu.updateComplete;

    const item = menu.querySelector('wb-menu-item') as WBMenuItem;
    const button = item.shadowRoot!.querySelector('.menu-item') as HTMLElement;
    button.click();

    await menu.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('open() method opens menu', async () => {
    menu.open();
    await menu.updateComplete;

    const panel = menu.shadowRoot!.querySelector('.menu-panel');
    expect(panel?.classList.contains('open')).toBe(true);
  });

  it('close() method closes menu', async () => {
    menu.open();
    await menu.updateComplete;

    menu.close();
    await menu.updateComplete;

    const panel = menu.shadowRoot!.querySelector('.menu-panel');
    expect(panel?.classList.contains('open')).toBe(false);
  });

  it('toggle() method switches state', async () => {
    menu.toggle();
    await menu.updateComplete;

    let panel = menu.shadowRoot!.querySelector('.menu-panel');
    expect(panel?.classList.contains('open')).toBe(true);

    menu.toggle();
    await menu.updateComplete;

    panel = menu.shadowRoot!.querySelector('.menu-panel');
    expect(panel?.classList.contains('open')).toBe(false);
  });

  it('supports hover mode', async () => {
    const hoverMenu = await fixture<WBMenu>(html`
      <wb-menu hover>
        <button slot="trigger">Hover me</button>
        <wb-menu-item>Item 1</wb-menu-item>
      </wb-menu>
    `);

    const trigger = hoverMenu.shadowRoot!.querySelector('.menu-trigger') as HTMLElement;
    trigger.dispatchEvent(new Event('mouseenter'));
    await hoverMenu.updateComplete;

    const panel = hoverMenu.shadowRoot!.querySelector('.menu-panel');
    expect(panel?.classList.contains('open')).toBe(true);
  });

  it('supports right alignment', async () => {
    const rightMenu = await fixture<WBMenu>(html`
      <wb-menu align="right">
        <button slot="trigger">Menu</button>
        <wb-menu-item>Item</wb-menu-item>
      </wb-menu>
    `);

    const panel = rightMenu.shadowRoot!.querySelector('.menu-panel') as HTMLElement;
    expect(panel.style.cssText).toContain('right');
  });

  it('renders multiple menu items', () => {
    const items = menu.querySelectorAll('wb-menu-item');
    expect(items.length).toBe(3);
  });

  it('announces state changes to screen readers', async () => {
    const announceSpy = vi.spyOn(menu, 'announce');

    menu.open();
    await menu.updateComplete;

    expect(announceSpy).toHaveBeenCalled();
  });
});

describe('WBMenuItem', () => {
  let item: WBMenuItem;

  beforeEach(async () => {
    item = await fixture<WBMenuItem>(html`
      <wb-menu-item>Benefits</wb-menu-item>
    `);
  });

  it('renders', () => {
    expect(item).toBeDefined();
  });

  it('renders as button by default', () => {
    const button = item.shadowRoot!.querySelector('button');
    expect(button).toBeDefined();
  });

  it('renders as link when href provided', async () => {
    const linkItem = await fixture<WBMenuItem>(html`
      <wb-menu-item href="/services">Services</wb-menu-item>
    `);

    const link = linkItem.shadowRoot!.querySelector('a');
    expect(link).toBeDefined();
    expect(link?.getAttribute('href')).toBe('/services');
  });

  it('has role="menuitem"', () => {
    const menuitem = item.shadowRoot!.querySelector('[role="menuitem"]');
    expect(menuitem).toBeDefined();
  });

  it('has touch-friendly size (44px min-height)', () => {
    const button = item.shadowRoot!.querySelector('.menu-item') as HTMLElement;
    const styles = getComputedStyle(button);
    const minHeight = parseInt(styles.minHeight);
    expect(minHeight).toBeGreaterThanOrEqual(44);
  });

  it('shows submenu indicator when has-submenu', async () => {
    const submenuItem = await fixture<WBMenuItem>(html`
      <wb-menu-item has-submenu>More</wb-menu-item>
    `);

    const indicator = submenuItem.shadowRoot!.querySelector('.submenu-indicator');
    expect(indicator).toBeDefined();
    expect(indicator?.textContent).toContain('▶');
  });

  it('emits wb-menu-item-select on click', async () => {
    let eventFired = false;
    item.addEventListener('wb-menu-item-select', () => {
      eventFired = true;
    });

    const button = item.shadowRoot!.querySelector('.menu-item') as HTMLElement;
    button.click();

    expect(eventFired).toBe(true);
  });

  it('emits wb-menu-item-select on Enter key', async () => {
    let eventFired = false;
    item.addEventListener('wb-menu-item-select', () => {
      eventFired = true;
    });

    const button = item.shadowRoot!.querySelector('.menu-item') as HTMLElement;
    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(eventFired).toBe(true);
  });

  it('emits wb-menu-item-select on Space key', async () => {
    let eventFired = false;
    item.addEventListener('wb-menu-item-select', () => {
      eventFired = true;
    });

    const button = item.shadowRoot!.querySelector('.menu-item') as HTMLElement;
    button.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

    expect(eventFired).toBe(true);
  });

  it('supports disabled state', async () => {
    const disabledItem = await fixture<WBMenuItem>(html`
      <wb-menu-item disabled>Disabled</wb-menu-item>
    `);

    const button = disabledItem.shadowRoot!.querySelector('.menu-item');
    expect(button?.classList.contains('disabled')).toBe(true);
    expect(button?.getAttribute('aria-disabled')).toBe('true');
  });

  it('does not emit event when disabled', async () => {
    const disabledItem = await fixture<WBMenuItem>(html`
      <wb-menu-item disabled>Disabled</wb-menu-item>
    `);

    let eventFired = false;
    disabledItem.addEventListener('wb-menu-item-select', () => {
      eventFired = true;
    });

    const button = disabledItem.shadowRoot!.querySelector('.menu-item') as HTMLElement;
    button.click();

    expect(eventFired).toBe(false);
  });

  it('supports target attribute for links', async () => {
    const linkItem = await fixture<WBMenuItem>(html`
      <wb-menu-item href="https://canada.ca" target="_blank">Canada.ca</wb-menu-item>
    `);

    const link = linkItem.shadowRoot!.querySelector('a');
    expect(link?.getAttribute('target')).toBe('_blank');
  });

  it('renders slotted content', async () => {
    const content = item.textContent?.trim();
    expect(content).toBe('Benefits');
  });

  it('can be focused with focus() method', () => {
    const focusSpy = vi.spyOn(HTMLElement.prototype, 'focus');

    item.focus();

    expect(focusSpy).toHaveBeenCalled();
  });
});
