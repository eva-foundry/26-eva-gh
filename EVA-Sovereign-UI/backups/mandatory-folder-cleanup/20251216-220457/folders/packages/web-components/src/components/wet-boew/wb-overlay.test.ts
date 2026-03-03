import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach, afterEach, vi } from 'vitest';
import './wb-overlay.js';
import type { WBOverlay } from './wb-overlay.js';

describe('WBOverlay', () => {
  let overlay: WBOverlay;

  beforeEach(async () => {
    overlay = await fixture<WBOverlay>(html`
      <wb-overlay>
        <h2 slot="header">Test Modal</h2>
        <p>Modal content here</p>
        <div slot="footer">
          <button id="cancel">Cancel</button>
          <button id="confirm">Confirm</button>
        </div>
      </wb-overlay>
    `);
  });

  afterEach(() => {
    // Cleanup: close any open modals
    if (overlay.open) {
      overlay.close();
    }
    // Restore body scroll
    document.body.style.overflow = '';
  });

  it('renders', () => {
    expect(overlay).toBeDefined();
  });

  it('starts closed by default', () => {
    expect(overlay.open).toBe(false);
    expect(overlay.hasAttribute('open')).toBe(false);
  });

  it('opens when showModal() is called', async () => {
    overlay.showModal();
    await overlay.updateComplete;

    expect(overlay.open).toBe(true);
    expect(overlay.hasAttribute('open')).toBe(true);
  });

  it('closes when close() is called', async () => {
    overlay.showModal();
    await overlay.updateComplete;

    overlay.close();
    await overlay.updateComplete;

    expect(overlay.open).toBe(false);
    expect(overlay.hasAttribute('open')).toBe(false);
  });

  it('toggles with toggle() method', async () => {
    overlay.toggle();
    await overlay.updateComplete;
    expect(overlay.open).toBe(true);

    overlay.toggle();
    await overlay.updateComplete;
    expect(overlay.open).toBe(false);
  });

  it('has correct ARIA attributes', () => {
    const dialog = overlay.shadowRoot!.querySelector('[role="dialog"]');
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
    expect(dialog?.hasAttribute('aria-labelledby')).toBe(true);
  });

  it('renders header slot', () => {
    const header = overlay.querySelector('[slot="header"]');
    expect(header?.textContent).toBe('Test Modal');
  });

  it('renders footer slot', () => {
    const footer = overlay.querySelector('[slot="footer"]');
    const buttons = footer?.querySelectorAll('button');
    expect(buttons?.length).toBe(2);
  });

  it('shows close button by default', () => {
    const closeBtn = overlay.shadowRoot!.querySelector('.overlay-close');
    expect(closeBtn).toBeDefined();
  });

  it('can hide close button with show-close=false', async () => {
    const noCloseOverlay = await fixture<WBOverlay>(html`
      <wb-overlay show-close="false">
        <p>Content</p>
      </wb-overlay>
    `);

    const closeBtn = noCloseOverlay.shadowRoot!.querySelector('.overlay-close');
    expect(closeBtn).toBeNull();
  });

  it('closes when close button is clicked', async () => {
    overlay.showModal();
    await overlay.updateComplete;

    const closeBtn = overlay.shadowRoot!.querySelector('.overlay-close') as HTMLButtonElement;
    closeBtn.click();
    await overlay.updateComplete;

    expect(overlay.open).toBe(false);
  });

  it('closes on Escape key by default', async () => {
    overlay.showModal();
    await overlay.updateComplete;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await overlay.updateComplete;

    expect(overlay.open).toBe(false);
  });

  it('does not close on Escape when close-on-esc=false', async () => {
    const noEscOverlay = await fixture<WBOverlay>(html`
      <wb-overlay close-on-esc="false">
        <p>Content</p>
      </wb-overlay>
    `);

    noEscOverlay.showModal();
    await noEscOverlay.updateComplete;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await noEscOverlay.updateComplete;

    expect(noEscOverlay.open).toBe(true);

    // Cleanup
    noEscOverlay.close();
  });

  it('closes on backdrop click by default', async () => {
    overlay.showModal();
    await overlay.updateComplete;

    const backdrop = overlay.shadowRoot!.querySelector('.overlay-backdrop') as HTMLElement;
    backdrop.click();
    await overlay.updateComplete;

    expect(overlay.open).toBe(false);
  });

  it('does not close on backdrop click when close-on-backdrop=false', async () => {
    const noBackdropCloseOverlay = await fixture<WBOverlay>(html`
      <wb-overlay close-on-backdrop="false">
        <p>Content</p>
      </wb-overlay>
    `);

    noBackdropCloseOverlay.showModal();
    await noBackdropCloseOverlay.updateComplete;

    const backdrop = noBackdropCloseOverlay.shadowRoot!.querySelector('.overlay-backdrop') as HTMLElement;
    backdrop.click();
    await noBackdropCloseOverlay.updateComplete;

    expect(noBackdropCloseOverlay.open).toBe(true);

    // Cleanup
    noBackdropCloseOverlay.close();
  });

  it('does not close when clicking inside dialog', async () => {
    overlay.showModal();
    await overlay.updateComplete;

    const dialog = overlay.shadowRoot!.querySelector('.overlay-dialog') as HTMLElement;
    dialog.click();
    await overlay.updateComplete;

    expect(overlay.open).toBe(true);
  });

  it('prevents body scroll when open', async () => {
    overlay.showModal();
    await overlay.updateComplete;

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', async () => {
    overlay.showModal();
    await overlay.updateComplete;

    overlay.close();
    await overlay.updateComplete;

    expect(document.body.style.overflow).toBe('');
  });

  it('emits wb-overlay-open event', async () => {
    let eventFired = false;
    overlay.addEventListener('wb-overlay-open', () => {
      eventFired = true;
    });

    overlay.showModal();
    await overlay.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('emits wb-overlay-close event', async () => {
    overlay.showModal();
    await overlay.updateComplete;

    let eventFired = false;
    overlay.addEventListener('wb-overlay-close', () => {
      eventFired = true;
    });

    overlay.close();
    await overlay.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('announces state changes to screen readers', async () => {
    const announceSpy = vi.spyOn(overlay, 'announce');

    overlay.showModal();
    await overlay.updateComplete;

    expect(announceSpy).toHaveBeenCalled();
  });

  it('supports small size', async () => {
    const smallOverlay = await fixture<WBOverlay>(html`
      <wb-overlay size="small">
        <p>Small modal</p>
      </wb-overlay>
    `);

    const dialog = smallOverlay.shadowRoot!.querySelector('.overlay-dialog') as HTMLElement;
    expect(dialog.style.width).toBe('400px');
  });

  it('supports medium size (default)', () => {
    const dialog = overlay.shadowRoot!.querySelector('.overlay-dialog') as HTMLElement;
    expect(dialog.style.width).toBe('600px');
  });

  it('supports large size', async () => {
    const largeOverlay = await fixture<WBOverlay>(html`
      <wb-overlay size="large">
        <p>Large modal</p>
      </wb-overlay>
    `);

    const dialog = largeOverlay.shadowRoot!.querySelector('.overlay-dialog') as HTMLElement;
    expect(dialog.style.width).toBe('900px');
  });

  it('supports full size', async () => {
    const fullOverlay = await fixture<WBOverlay>(html`
      <wb-overlay size="full">
        <p>Full modal</p>
      </wb-overlay>
    `);

    const dialog = fullOverlay.shadowRoot!.querySelector('.overlay-dialog') as HTMLElement;
    expect(dialog.style.width).toBe('100vw');
  });

  it('renders without header when no header slot', async () => {
    const noHeaderOverlay = await fixture<WBOverlay>(html`
      <wb-overlay show-close="false">
        <p>Content only</p>
      </wb-overlay>
    `);

    const header = noHeaderOverlay.shadowRoot!.querySelector('.overlay-header');
    expect(header).toBeNull();
  });

  it('renders without footer when no footer slot', async () => {
    const noFooterOverlay = await fixture<WBOverlay>(html`
      <wb-overlay>
        <h2 slot="header">Title</h2>
        <p>Content</p>
      </wb-overlay>
    `);

    const footer = noFooterOverlay.shadowRoot!.querySelector('.overlay-footer');
    expect(footer).toBeNull();
  });
});
