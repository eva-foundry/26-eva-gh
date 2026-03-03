import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-drawer';
import type { GCDrawer } from './gc-drawer';

describe('gc-drawer', () => {
  let element: GCDrawer;

  beforeEach(async () => {
    element = await fixture(html`<gc-drawer heading="Test Drawer"></gc-drawer>`);
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('is hidden by default', () => {
    expect(element.open).to.be.false;
  });

  it('renders nothing when closed', () => {
    const overlay = element.shadowRoot?.querySelector('.drawer-overlay');
    expect(overlay).to.not.exist;
  });

  it('renders overlay when open', async () => {
    element.open = true;
    await element.updateComplete;

    const overlay = element.shadowRoot?.querySelector('.drawer-overlay');
    expect(overlay).to.exist;
  });

  it('renders panel when open', async () => {
    element.open = true;
    await element.updateComplete;

    const panel = element.shadowRoot?.querySelector('.drawer-panel');
    expect(panel).to.exist;
  });

  it('renders heading', async () => {
    element.open = true;
    await element.updateComplete;

    const title = element.shadowRoot?.querySelector('.drawer-title');
    expect(title?.textContent?.trim()).to.equal('Test Drawer');
  });

  it('uses right position by default', () => {
    expect(element.position).to.equal('right');
  });

  it('applies left position', async () => {
    element.position = 'left';
    await element.updateComplete;

    expect(element.getAttribute('position')).to.equal('left');
  });

  it('applies top position', async () => {
    element.position = 'top';
    await element.updateComplete;

    expect(element.getAttribute('position')).to.equal('top');
  });

  it('applies bottom position', async () => {
    element.position = 'bottom';
    await element.updateComplete;

    expect(element.getAttribute('position')).to.equal('bottom');
  });

  it('uses medium size by default', () => {
    expect(element.size).to.equal('medium');
  });

  it('applies small size', async () => {
    element.size = 'small';
    await element.updateComplete;

    expect(element.getAttribute('size')).to.equal('small');
  });

  it('applies large size', async () => {
    element.size = 'large';
    await element.updateComplete;

    expect(element.getAttribute('size')).to.equal('large');
  });

  it('applies full size', async () => {
    element.size = 'full';
    await element.updateComplete;

    expect(element.getAttribute('size')).to.equal('full');
  });

  it('renders close button by default', async () => {
    element.open = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.drawer-close');
    expect(closeButton).to.exist;
  });

  it('hides close button when not dismissible', async () => {
    element.open = true;
    element.dismissible = false;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.drawer-close');
    expect(closeButton).to.not.exist;
  });

  it('closes on close button click', async () => {
    element.open = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.drawer-close') as HTMLButtonElement;
    closeButton.click();

    await new Promise(resolve => setTimeout(resolve, 350));

    expect(element.open).to.be.false;
  });

  it('emits gc-drawer-close event', async () => {
    element.open = true;
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-drawer-close', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const closeButton = element.shadowRoot?.querySelector('.drawer-close') as HTMLButtonElement;
    closeButton.click();

    await new Promise(resolve => setTimeout(resolve, 350));

    expect(eventDetail).to.exist;
  });

  it('emits gc-drawer-open event', async () => {
    let eventDetail: unknown = null;
    element.addEventListener('gc-drawer-open', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    element.open = true;
    await element.updateComplete;

    expect(eventDetail).to.exist;
  });

  it('includes timestamp in close event', async () => {
    element.open = true;
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-drawer-close', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const closeButton = element.shadowRoot?.querySelector('.drawer-close') as HTMLButtonElement;
    closeButton.click();

    await new Promise(resolve => setTimeout(resolve, 350));

    expect((eventDetail as { timestamp: string })?.timestamp).to.be.a('string');
  });

  it('has role="dialog" on panel', async () => {
    element.open = true;
    await element.updateComplete;

    const panel = element.shadowRoot?.querySelector('.drawer-panel');
    expect(panel?.getAttribute('role')).to.equal('dialog');
  });

  it('has aria-modal="true" on panel', async () => {
    element.open = true;
    await element.updateComplete;

    const panel = element.shadowRoot?.querySelector('.drawer-panel');
    expect(panel?.getAttribute('aria-modal')).to.equal('true');
  });

  it('has aria-labelledby on panel', async () => {
    element.open = true;
    await element.updateComplete;

    const panel = element.shadowRoot?.querySelector('.drawer-panel');
    expect(panel?.getAttribute('aria-labelledby')).to.equal('drawer-title');
  });

  it('title has correct id', async () => {
    element.open = true;
    await element.updateComplete;

    const title = element.shadowRoot?.querySelector('.drawer-title');
    expect(title?.getAttribute('id')).to.equal('drawer-title');
  });

  it('close button has aria-label', async () => {
    element.open = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.drawer-close');
    expect(closeButton?.getAttribute('aria-label')).to.equal('Close drawer');
  });

  it('is dismissible by default', () => {
    expect(element.dismissible).to.be.true;
  });

  it('closes on overlay click by default', () => {
    expect(element.closeOnOverlayClick).to.be.true;
  });

  it('renders drawer body slot', async () => {
    element.open = true;
    await element.updateComplete;

    const body = element.shadowRoot?.querySelector('.drawer-body');
    const slot = body?.querySelector('slot:not([name])');
    expect(slot).to.exist;
  });

  it('renders drawer footer slot', async () => {
    element.open = true;
    await element.updateComplete;

    const footer = element.shadowRoot?.querySelector('.drawer-footer');
    const slot = footer?.querySelector('slot[name="footer"]');
    expect(slot).to.exist;
  });

  it('renders close icon', async () => {
    element.open = true;
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.drawer-close-icon');
    expect(icon).to.exist;
  });

  it('close icon is SVG', async () => {
    element.open = true;
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.drawer-close-icon');
    expect(icon?.tagName.toLowerCase()).to.equal('svg');
  });

  it('close icon has aria-hidden', async () => {
    element.open = true;
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.drawer-close-icon');
    expect(icon?.getAttribute('aria-hidden')).to.equal('true');
  });

  it('supports French Canadian locale', async () => {
    element.locale = 'fr-CA';
    element.open = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.drawer-close');
    expect(closeButton?.getAttribute('aria-label')).to.equal('Fermer le panneau');
  });

  it('applies proper CSS classes', async () => {
    element.open = true;
    await element.updateComplete;

    const overlay = element.shadowRoot?.querySelector('.drawer-overlay');
    expect(overlay?.classList.contains('drawer-overlay')).to.be.true;

    const panel = element.shadowRoot?.querySelector('.drawer-panel');
    expect(panel?.classList.contains('drawer-panel')).to.be.true;

    const header = element.shadowRoot?.querySelector('.drawer-header');
    expect(header?.classList.contains('drawer-header')).to.be.true;

    const body = element.shadowRoot?.querySelector('.drawer-body');
    expect(body?.classList.contains('drawer-body')).to.be.true;

    const footer = element.shadowRoot?.querySelector('.drawer-footer');
    expect(footer?.classList.contains('drawer-footer')).to.be.true;
  });

  it('title is h2 element', async () => {
    element.open = true;
    await element.updateComplete;

    const title = element.shadowRoot?.querySelector('.drawer-title');
    expect(title?.tagName.toLowerCase()).to.equal('h2');
  });

  it('close button is button element', async () => {
    element.open = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.drawer-close');
    expect(closeButton?.tagName.toLowerCase()).to.equal('button');
  });

  it('close button has type="button"', async () => {
    element.open = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.drawer-close');
    expect(closeButton?.getAttribute('type')).to.equal('button');
  });

  it('updates heading dynamically', async () => {
    element.open = true;
    await element.updateComplete;

    element.heading = 'Updated Drawer';
    await element.updateComplete;

    const title = element.shadowRoot?.querySelector('.drawer-title');
    expect(title?.textContent?.trim()).to.equal('Updated Drawer');
  });

  it('handles position changes', async () => {
    element.position = 'left';
    await element.updateComplete;
    expect(element.getAttribute('position')).to.equal('left');

    element.position = 'top';
    await element.updateComplete;
    expect(element.getAttribute('position')).to.equal('top');
  });

  it('handles size changes', async () => {
    element.size = 'small';
    await element.updateComplete;
    expect(element.getAttribute('size')).to.equal('small');

    element.size = 'large';
    await element.updateComplete;
    expect(element.getAttribute('size')).to.equal('large');
  });

  it('reflects open attribute', async () => {
    expect(element.hasAttribute('open')).to.be.false;

    element.open = true;
    await element.updateComplete;

    expect(element.hasAttribute('open')).to.be.true;
  });

  it('reflects closing attribute', async () => {
    element.open = true;
    await element.updateComplete;

    expect(element.hasAttribute('closing')).to.be.false;

    const closeButton = element.shadowRoot?.querySelector('.drawer-close') as HTMLButtonElement;
    closeButton.click();

    await element.updateComplete;

    expect(element.hasAttribute('closing')).to.be.true;
  });

  it('has proper structure', async () => {
    element.open = true;
    await element.updateComplete;

    const overlay = element.shadowRoot?.querySelector('.drawer-overlay');
    const panel = element.shadowRoot?.querySelector('.drawer-panel');
    const header = panel?.querySelector('.drawer-header');
    const body = panel?.querySelector('.drawer-body');
    const footer = panel?.querySelector('.drawer-footer');

    expect(overlay).to.exist;
    expect(panel).to.exist;
    expect(header).to.exist;
    expect(body).to.exist;
    expect(footer).to.exist;
  });

  it('maintains component state', async () => {
    element.open = true;
    element.heading = 'Navigation';
    element.position = 'left';
    element.size = 'large';
    element.dismissible = true;
    await element.updateComplete;

    expect(element.open).to.be.true;
    expect(element.heading).to.equal('Navigation');
    expect(element.position).to.equal('left');
    expect(element.size).to.equal('large');
    expect(element.dismissible).to.be.true;
  });

  it('handles all position options', async () => {
    const positions: Array<'left' | 'right' | 'top' | 'bottom'> = ['left', 'right', 'top', 'bottom'];
    
    for (const position of positions) {
      element.position = position;
      await element.updateComplete;
      expect(element.getAttribute('position')).to.equal(position);
    }
  });

  it('handles all size options', async () => {
    const sizes: Array<'small' | 'medium' | 'large' | 'full'> = ['small', 'medium', 'large', 'full'];
    
    for (const size of sizes) {
      element.size = size;
      await element.updateComplete;
      expect(element.getAttribute('size')).to.equal(size);
    }
  });

  it('overlay is separate from panel', async () => {
    element.open = true;
    await element.updateComplete;

    const overlay = element.shadowRoot?.querySelector('.drawer-overlay');
    const panel = element.shadowRoot?.querySelector('.drawer-panel');

    expect(overlay).to.exist;
    expect(panel).to.exist;
    expect(overlay).to.not.equal(panel);
  });
});
