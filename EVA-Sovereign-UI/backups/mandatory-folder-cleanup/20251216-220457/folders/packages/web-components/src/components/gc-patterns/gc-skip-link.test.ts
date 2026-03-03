import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-skip-link';
import type { GCSkipLink } from './gc-skip-link';

describe('gc-skip-link', () => {
  let element: GCSkipLink;

  beforeEach(async () => {
    element = await fixture(html`<gc-skip-link></gc-skip-link>`);
  });

  it('renders skip link', () => {
    const link = element.shadowRoot?.querySelector('.skip-link');
    expect(link).to.exist;
  });

  it('link is anchor element', () => {
    const link = element.shadowRoot?.querySelector('.skip-link');
    expect(link?.tagName.toLowerCase()).to.equal('a');
  });

  it('has default href', () => {
    const link = element.shadowRoot?.querySelector('.skip-link');
    expect(link?.getAttribute('href')).to.equal('#main');
  });

  it('uses custom href', async () => {
    element.href = '#content';
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.skip-link');
    expect(link?.getAttribute('href')).to.equal('#content');
  });

  it('displays default label', () => {
    const link = element.shadowRoot?.querySelector('.skip-link');
    expect(link?.textContent?.trim()).to.be.a('string');
  });

  it('uses custom label', async () => {
    element.label = 'Skip navigation';
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.skip-link');
    expect(link?.textContent?.trim()).to.equal('Skip navigation');
  });

  it('applies skip-link class', () => {
    const link = element.shadowRoot?.querySelector('.skip-link');
    expect(link?.classList.contains('skip-link')).to.be.true;
  });

  it('link positioned off-screen by default', () => {
    const link = element.shadowRoot?.querySelector('.skip-link') as HTMLElement;
    const styles = window.getComputedStyle(link);
    expect(styles.position).to.equal('absolute');
  });

  it('updates when href changes', async () => {
    element.href = '#footer';
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.skip-link');
    expect(link?.getAttribute('href')).to.equal('#footer');
  });

  it('updates when label changes', async () => {
    element.label = 'New label';
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.skip-link');
    expect(link?.textContent?.trim()).to.equal('New label');
  });
});
