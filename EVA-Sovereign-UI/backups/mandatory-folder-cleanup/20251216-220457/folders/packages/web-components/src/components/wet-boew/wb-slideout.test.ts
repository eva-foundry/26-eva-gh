import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach, afterEach } from 'vitest';
import './wb-slideout.js';
import type { WBSlideout } from './wb-slideout.js';

describe('WBSlideout', () => {
  let slideout: WBSlideout;

  beforeEach(async () => {
    slideout = await fixture<WBSlideout>(html`
      <wb-slideout>
        <h2 slot="header">Panel Title</h2>
        <p>Panel content</p>
      </wb-slideout>
    `);
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders', () => {
    expect(slideout).to.exist;
  });

  it('starts closed', () => {
    expect(slideout.open).to.equal(false);
  });

  it('opens with showPanel()', async () => {
    slideout.showPanel();
    await slideout.updateComplete;
    expect(slideout.open).to.equal(true);
  });

  it('closes with close()', async () => {
    slideout.showPanel();
    await slideout.updateComplete;
    slideout.close();
    await slideout.updateComplete;
    expect(slideout.open).to.equal(false);
  });

  it('toggles with toggle()', async () => {
    slideout.toggle();
    await slideout.updateComplete;
    expect(slideout.open).to.equal(true);
    slideout.toggle();
    await slideout.updateComplete;
    expect(slideout.open).to.equal(false);
  });

  it('closes on Esc key', async () => {
    slideout.showPanel();
    await slideout.updateComplete;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await slideout.updateComplete;
    expect(slideout.open).to.equal(false);
  });

  it('closes on backdrop click', async () => {
    slideout.showPanel();
    await slideout.updateComplete;
    const backdrop = slideout.shadowRoot!.querySelector('.slideout-backdrop') as HTMLElement;
    backdrop.click();
    await slideout.updateComplete;
    expect(slideout.open).to.equal(false);
  });

  it('prevents body scroll when open', async () => {
    slideout.showPanel();
    await slideout.updateComplete;
    expect(document.body.style.overflow).to.equal('hidden');
  });

  it('restores body scroll when closed', async () => {
    slideout.showPanel();
    await slideout.updateComplete;
    slideout.close();
    await slideout.updateComplete;
    expect(document.body.style.overflow).to.equal('');
  });

  it('supports left position', async () => {
    const left = await fixture<WBSlideout>(html`<wb-slideout position="left"><p>Left</p></wb-slideout>`);
    const panel = left.shadowRoot!.querySelector('.slideout-panel');
    expect(panel?.classList.contains('left')).to.equal(true);
  });

  it('supports right position (default)', () => {
    const panel = slideout.shadowRoot!.querySelector('.slideout-panel');
    expect(panel?.classList.contains('right')).to.equal(true);
  });

  it('supports top position', async () => {
    const top = await fixture<WBSlideout>(html`<wb-slideout position="top"><p>Top</p></wb-slideout>`);
    const panel = top.shadowRoot!.querySelector('.slideout-panel');
    expect(panel?.classList.contains('top')).to.equal(true);
  });

  it('supports bottom position', async () => {
    const bottom = await fixture<WBSlideout>(html`<wb-slideout position="bottom"><p>Bottom</p></wb-slideout>`);
    const panel = bottom.shadowRoot!.querySelector('.slideout-panel');
    expect(panel?.classList.contains('bottom')).to.equal(true);
  });

  it('emits wb-slideout-open event', async () => {
    let eventFired = false;
    slideout.addEventListener('wb-slideout-open', () => { eventFired = true; });
    slideout.showPanel();
    await slideout.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('emits wb-slideout-close event', async () => {
    slideout.showPanel();
    await slideout.updateComplete;
    let eventFired = false;
    slideout.addEventListener('wb-slideout-close', () => { eventFired = true; });
    slideout.close();
    await slideout.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('has ARIA dialog attributes', () => {
    const panel = slideout.shadowRoot!.querySelector('.slideout-panel');
    expect(panel?.getAttribute('role')).to.equal('dialog');
    expect(panel?.getAttribute('aria-modal')).to.equal('true');
  });

  it('shows close button by default', () => {
    const closeBtn = slideout.shadowRoot!.querySelector('.slideout-close');
    expect(closeBtn).to.exist;
  });

  it('can hide close button', async () => {
    const noClose = await fixture<WBSlideout>(html`<wb-slideout show-close="false"><p>No close</p></wb-slideout>`);
    const closeBtn = noClose.shadowRoot!.querySelector('.slideout-close');
    expect(closeBtn).to.be.null;
  });

  it('renders header slot', () => {
    const header = slideout.querySelector('[slot="header"]');
    expect(header?.textContent).to.equal('Panel Title');
  });

  it('renders content slot', () => {
    const content = slideout.querySelector('p');
    expect(content?.textContent).to.equal('Panel content');
  });

  it('does not close on backdrop click when close-on-backdrop=false', async () => {
    const noBackdrop = await fixture<WBSlideout>(html`<wb-slideout close-on-backdrop="false"><p>Content</p></wb-slideout>`);
    noBackdrop.showPanel();
    await noBackdrop.updateComplete;
    const backdrop = noBackdrop.shadowRoot!.querySelector('.slideout-backdrop') as HTMLElement;
    backdrop.click();
    await noBackdrop.updateComplete;
    expect(noBackdrop.open).to.equal(true);
    noBackdrop.close();
  });

  it('does not close when clicking inside panel', async () => {
    slideout.showPanel();
    await slideout.updateComplete;
    const panel = slideout.shadowRoot!.querySelector('.slideout-panel') as HTMLElement;
    panel.click();
    await slideout.updateComplete;
    expect(slideout.open).to.equal(true);
  });
});
