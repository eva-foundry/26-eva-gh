import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-modal';
import type { GCModal } from './gc-modal';

describe('gc-modal', () => {
  let element: GCModal;

  beforeEach(async () => {
    element = await fixture(html`<gc-modal heading="Test Modal"></gc-modal>`);
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('is hidden by default', () => {
    expect(element.open).to.be.false;
  });

  it('renders nothing when closed', () => {
    const overlay = element.shadowRoot?.querySelector('.modal-overlay');
    expect(overlay).to.not.exist;
  });

  it('renders overlay when open', async () => {
    element.open = true;
    await element.updateComplete;

    const overlay = element.shadowRoot?.querySelector('.modal-overlay');
    expect(overlay).to.exist;
  });

  it('renders dialog when open', async () => {
    element.open = true;
    await element.updateComplete;

    const dialog = element.shadowRoot?.querySelector('.modal-dialog');
    expect(dialog).to.exist;
  });

  it('renders heading', async () => {
    element.open = true;
    await element.updateComplete;

    const title = element.shadowRoot?.querySelector('.modal-title');
    expect(title?.textContent?.trim()).to.equal('Test Modal');
  });

  it('renders close button by default', async () => {
    element.open = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.modal-close');
    expect(closeButton).to.exist;
  });

  it('hides close button when not dismissible', async () => {
    element.open = true;
    element.dismissible = false;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.modal-close');
    expect(closeButton).to.not.exist;
  });

  it('closes on close button click', async () => {
    element.open = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.modal-close') as HTMLButtonElement;
    closeButton.click();

    await new Promise(resolve => setTimeout(resolve, 250));

    expect(element.open).to.be.false;
  });

  it('emits gc-modal-close event', async () => {
    element.open = true;
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('gc-modal-close', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const closeButton = element.shadowRoot?.querySelector('.modal-close') as HTMLButtonElement;
    closeButton.click();

    await new Promise(resolve => setTimeout(resolve, 250));

    expect(eventDetail).to.exist;
  });

  it('emits gc-modal-open event', async () => {
    let eventDetail: unknown = null;
    element.addEventListener('gc-modal-open', ((e: CustomEvent) => {
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
    element.addEventListener('gc-modal-close', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const closeButton = element.shadowRoot?.querySelector('.modal-close') as HTMLButtonElement;
    closeButton.click();

    await new Promise(resolve => setTimeout(resolve, 250));

    expect((eventDetail as { timestamp: string })?.timestamp).to.be.a('string');
  });

  it('has role="dialog" on overlay', async () => {
    element.open = true;
    await element.updateComplete;

    const overlay = element.shadowRoot?.querySelector('.modal-overlay');
    expect(overlay?.getAttribute('role')).to.equal('dialog');
  });

  it('has aria-modal="true" on overlay', async () => {
    element.open = true;
    await element.updateComplete;

    const overlay = element.shadowRoot?.querySelector('.modal-overlay');
    expect(overlay?.getAttribute('aria-modal')).to.equal('true');
  });

  it('has aria-labelledby on overlay', async () => {
    element.open = true;
    await element.updateComplete;

    const overlay = element.shadowRoot?.querySelector('.modal-overlay');
    expect(overlay?.getAttribute('aria-labelledby')).to.equal('modal-title');
  });

  it('title has correct id', async () => {
    element.open = true;
    await element.updateComplete;

    const title = element.shadowRoot?.querySelector('.modal-title');
    expect(title?.getAttribute('id')).to.equal('modal-title');
  });

  it('close button has aria-label', async () => {
    element.open = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.modal-close');
    expect(closeButton?.getAttribute('aria-label')).to.equal('Close modal');
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

  it('applies fullscreen size', async () => {
    element.size = 'fullscreen';
    await element.updateComplete;

    expect(element.getAttribute('size')).to.equal('fullscreen');
  });

  it('is dismissible by default', () => {
    expect(element.dismissible).to.be.true;
  });

  it('can be non-dismissible', async () => {
    element.dismissible = false;
    await element.updateComplete;

    expect(element.dismissible).to.be.false;
  });

  it('closes on overlay click by default', () => {
    expect(element.closeOnOverlayClick).to.be.true;
  });

  it('can disable close on overlay click', async () => {
    element.closeOnOverlayClick = false;
    await element.updateComplete;

    expect(element.closeOnOverlayClick).to.be.false;
  });

  it('renders modal body slot', async () => {
    element.open = true;
    await element.updateComplete;

    const body = element.shadowRoot?.querySelector('.modal-body');
    const slot = body?.querySelector('slot:not([name])');
    expect(slot).to.exist;
  });

  it('renders modal footer slot', async () => {
    element.open = true;
    await element.updateComplete;

    const footer = element.shadowRoot?.querySelector('.modal-footer');
    const slot = footer?.querySelector('slot[name="footer"]');
    expect(slot).to.exist;
  });

  it('renders close icon', async () => {
    element.open = true;
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.modal-close-icon');
    expect(icon).to.exist;
  });

  it('close icon is SVG', async () => {
    element.open = true;
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.modal-close-icon');
    expect(icon?.tagName.toLowerCase()).to.equal('svg');
  });

  it('close icon has aria-hidden', async () => {
    element.open = true;
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.modal-close-icon');
    expect(icon?.getAttribute('aria-hidden')).to.equal('true');
  });

  it('supports French Canadian locale', async () => {
    element.locale = 'fr-CA';
    element.open = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.modal-close');
    expect(closeButton?.getAttribute('aria-label')).to.equal('Fermer la fenêtre modale');
  });

  it('applies proper CSS classes', async () => {
    element.open = true;
    await element.updateComplete;

    const overlay = element.shadowRoot?.querySelector('.modal-overlay');
    expect(overlay?.classList.contains('modal-overlay')).to.be.true;

    const dialog = element.shadowRoot?.querySelector('.modal-dialog');
    expect(dialog?.classList.contains('modal-dialog')).to.be.true;

    const header = element.shadowRoot?.querySelector('.modal-header');
    expect(header?.classList.contains('modal-header')).to.be.true;

    const body = element.shadowRoot?.querySelector('.modal-body');
    expect(body?.classList.contains('modal-body')).to.be.true;

    const footer = element.shadowRoot?.querySelector('.modal-footer');
    expect(footer?.classList.contains('modal-footer')).to.be.true;
  });

  it('header is a div', async () => {
    element.open = true;
    await element.updateComplete;

    const header = element.shadowRoot?.querySelector('.modal-header');
    expect(header?.tagName.toLowerCase()).to.equal('div');
  });

  it('title is h2 element', async () => {
    element.open = true;
    await element.updateComplete;

    const title = element.shadowRoot?.querySelector('.modal-title');
    expect(title?.tagName.toLowerCase()).to.equal('h2');
  });

  it('close button is button element', async () => {
    element.open = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.modal-close');
    expect(closeButton?.tagName.toLowerCase()).to.equal('button');
  });

  it('close button has type="button"', async () => {
    element.open = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('.modal-close');
    expect(closeButton?.getAttribute('type')).to.equal('button');
  });

  it('updates heading dynamically', async () => {
    element.open = true;
    await element.updateComplete;

    element.heading = 'Updated Modal';
    await element.updateComplete;

    const title = element.shadowRoot?.querySelector('.modal-title');
    expect(title?.textContent?.trim()).to.equal('Updated Modal');
  });

  it('handles size changes', async () => {
    element.size = 'small';
    await element.updateComplete;
    expect(element.getAttribute('size')).to.equal('small');

    element.size = 'large';
    await element.updateComplete;
    expect(element.getAttribute('size')).to.equal('large');
  });

  it('handles dismissible changes', async () => {
    element.open = true;
    element.dismissible = true;
    await element.updateComplete;

    let closeButton = element.shadowRoot?.querySelector('.modal-close');
    expect(closeButton).to.exist;

    element.dismissible = false;
    await element.updateComplete;

    closeButton = element.shadowRoot?.querySelector('.modal-close');
    expect(closeButton).to.not.exist;
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

    const closeButton = element.shadowRoot?.querySelector('.modal-close') as HTMLButtonElement;
    closeButton.click();

    await element.updateComplete;

    expect(element.hasAttribute('closing')).to.be.true;
  });

  it('has proper dialog structure', async () => {
    element.open = true;
    await element.updateComplete;

    const overlay = element.shadowRoot?.querySelector('.modal-overlay');
    const dialog = overlay?.querySelector('.modal-dialog');
    const header = dialog?.querySelector('.modal-header');
    const body = dialog?.querySelector('.modal-body');
    const footer = dialog?.querySelector('.modal-footer');

    expect(overlay).to.exist;
    expect(dialog).to.exist;
    expect(header).to.exist;
    expect(body).to.exist;
    expect(footer).to.exist;
  });

  it('maintains component state', async () => {
    element.open = true;
    element.heading = 'Custom Heading';
    element.size = 'large';
    element.dismissible = true;
    await element.updateComplete;

    expect(element.open).to.be.true;
    expect(element.heading).to.equal('Custom Heading');
    expect(element.size).to.equal('large');
    expect(element.dismissible).to.be.true;
  });
});
