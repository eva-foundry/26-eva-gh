import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-tooltip';
import type { GCTooltip } from './gc-tooltip';

describe('gc-tooltip', () => {
  let element: GCTooltip;

  beforeEach(async () => {
    element = await fixture(html`<gc-tooltip text="Tooltip text"></gc-tooltip>`);
  });

  it('renders tooltip trigger', () => {
    const trigger = element.shadowRoot?.querySelector('.tooltip-trigger');
    expect(trigger).to.exist;
  });

  it('renders tooltip content', () => {
    const content = element.shadowRoot?.querySelector('.tooltip-content');
    expect(content).to.exist;
  });

  it('displays tooltip text', () => {
    const content = element.shadowRoot?.querySelector('.tooltip-content');
    expect(content?.textContent?.trim()).to.include('Tooltip text');
  });

  it('tooltip hidden by default', () => {
    const content = element.shadowRoot?.querySelector('.tooltip-content');
    expect(content?.classList.contains('visible')).to.be.false;
  });

  it('shows tooltip icon by default', () => {
    const icon = element.shadowRoot?.querySelector('.tooltip-icon');
    expect(icon).to.exist;
  });

  it('icon shows ? by default', () => {
    const icon = element.shadowRoot?.querySelector('.tooltip-icon');
    expect(icon?.textContent?.trim()).to.equal('?');
  });

  it('hides icon when showIcon is false', async () => {
    element.showIcon = false;
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.tooltip-icon');
    expect(icon).to.not.exist;
  });

  it('uses custom icon label', async () => {
    element.iconLabel = 'i';
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.tooltip-icon');
    expect(icon?.textContent?.trim()).to.equal('i');
  });

  it('tooltip positioned top by default', () => {
    const content = element.shadowRoot?.querySelector('.tooltip-content');
    expect(content?.classList.contains('top')).to.be.true;
  });

  it('positions tooltip bottom', async () => {
    element.position = 'bottom';
    await element.updateComplete;

    const content = element.shadowRoot?.querySelector('.tooltip-content');
    expect(content?.classList.contains('bottom')).to.be.true;
  });

  it('positions tooltip left', async () => {
    element.position = 'left';
    await element.updateComplete;

    const content = element.shadowRoot?.querySelector('.tooltip-content');
    expect(content?.classList.contains('left')).to.be.true;
  });

  it('positions tooltip right', async () => {
    element.position = 'right';
    await element.updateComplete;

    const content = element.shadowRoot?.querySelector('.tooltip-content');
    expect(content?.classList.contains('right')).to.be.true;
  });

  it('renders tooltip arrow', () => {
    const arrow = element.shadowRoot?.querySelector('.tooltip-arrow');
    expect(arrow).to.exist;
  });

  it('trigger has role="button"', () => {
    const trigger = element.shadowRoot?.querySelector('.tooltip-trigger');
    expect(trigger?.getAttribute('role')).to.equal('button');
  });

  it('trigger has tabindex="0"', () => {
    const trigger = element.shadowRoot?.querySelector('.tooltip-trigger');
    expect(trigger?.getAttribute('tabindex')).to.equal('0');
  });

  it('content has role="tooltip"', () => {
    const content = element.shadowRoot?.querySelector('.tooltip-content');
    expect(content?.getAttribute('role')).to.equal('tooltip');
  });

  it('content has aria-hidden when not visible', () => {
    const content = element.shadowRoot?.querySelector('.tooltip-content');
    expect(content?.getAttribute('aria-hidden')).to.equal('true');
  });

  it('trigger has aria-label', () => {
    const trigger = element.shadowRoot?.querySelector('.tooltip-trigger');
    expect(trigger?.getAttribute('aria-label')).to.be.a('string');
  });

  it('trigger has aria-describedby', () => {
    const trigger = element.shadowRoot?.querySelector('.tooltip-trigger');
    expect(trigger?.getAttribute('aria-describedby')).to.equal('tooltip-content');
  });

  it('content has id="tooltip-content"', () => {
    const content = element.shadowRoot?.querySelector('.tooltip-content');
    expect(content?.getAttribute('id')).to.equal('tooltip-content');
  });

  it('icon has aria-hidden', () => {
    const icon = element.shadowRoot?.querySelector('.tooltip-icon');
    expect(icon?.getAttribute('aria-hidden')).to.equal('true');
  });

  it('applies proper CSS classes', () => {
    const trigger = element.shadowRoot?.querySelector('.tooltip-trigger');
    expect(trigger?.classList.contains('tooltip-trigger')).to.be.true;

    const content = element.shadowRoot?.querySelector('.tooltip-content');
    expect(content?.classList.contains('tooltip-content')).to.be.true;

    const icon = element.shadowRoot?.querySelector('.tooltip-icon');
    expect(icon?.classList.contains('tooltip-icon')).to.be.true;

    const arrow = element.shadowRoot?.querySelector('.tooltip-arrow');
    expect(arrow?.classList.contains('tooltip-arrow')).to.be.true;
  });

  it('renders slotted content', async () => {
    const el = await fixture(html`
      <gc-tooltip text="Tooltip">
        <span>Custom content</span>
      </gc-tooltip>
    `);

    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).to.exist;
  });

  it('updates text dynamically', async () => {
    element.text = 'New tooltip text';
    await element.updateComplete;

    const content = element.shadowRoot?.querySelector('.tooltip-content');
    expect(content?.textContent?.trim()).to.include('New tooltip text');
  });

  it('trigger is span element', () => {
    const trigger = element.shadowRoot?.querySelector('.tooltip-trigger');
    expect(trigger?.tagName.toLowerCase()).to.equal('span');
  });

  it('icon is span element', () => {
    const icon = element.shadowRoot?.querySelector('.tooltip-icon');
    expect(icon?.tagName.toLowerCase()).to.equal('span');
  });

  it('content is div element', () => {
    const content = element.shadowRoot?.querySelector('.tooltip-content');
    expect(content?.tagName.toLowerCase()).to.equal('div');
  });

  it('arrow is div element', () => {
    const arrow = element.shadowRoot?.querySelector('.tooltip-arrow');
    expect(arrow?.tagName.toLowerCase()).to.equal('div');
  });
});
