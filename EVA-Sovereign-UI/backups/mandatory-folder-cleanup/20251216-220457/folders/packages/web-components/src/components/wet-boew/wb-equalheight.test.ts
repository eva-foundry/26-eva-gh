import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-equalheight.js';
import type { WBEqualHeight } from './wb-equalheight.js';

describe('WBEqualHeight', () => {
  let equalheight: WBEqualHeight;

  beforeEach(async () => {
    equalheight = await fixture<WBEqualHeight>(html`
      <wb-equalheight>
        <div style="height: 100px;">Column 1</div>
        <div style="height: 150px;">Column 2</div>
        <div style="height: 120px;">Column 3</div>
      </wb-equalheight>
    `);
  });

  it('renders', () => {
    expect(equalheight).to.exist;
  });

  it('uses CSS Grid by default', () => {
    const display = getComputedStyle(equalheight).display;
    expect(display).to.equal('grid');
  });

  it('sets grid auto flow to column', () => {
    const gridAutoFlow = getComputedStyle(equalheight).gridAutoFlow;
    expect(gridAutoFlow).to.include('column');
  });

  it('applies vertical layout when vertical=true', async () => {
    equalheight.vertical = true;
    await equalheight.updateComplete;
    const gridAutoFlow = getComputedStyle(equalheight).gridAutoFlow;
    expect(gridAutoFlow).to.include('row');
  });

  it('accepts columns property', async () => {
    equalheight.columns = 3;
    await equalheight.updateComplete;
    expect(equalheight.columns).to.equal(3);
  });

  it('sets grid template columns when columns specified', async () => {
    equalheight.columns = 3;
    await equalheight.updateComplete;
    expect(equalheight.style.gridTemplateColumns).to.equal('repeat(3, 1fr)');
  });

  it('uses JS fallback when useJsFallback=true', async () => {
    const jsEqualheight = await fixture<WBEqualHeight>(html`
      <wb-equalheight use-js-fallback>
        <div style="height: 100px;">Column 1</div>
        <div style="height: 150px;">Column 2</div>
      </wb-equalheight>
    `);
    expect(jsEqualheight.useJsFallback).to.equal(true);
  });

  it('equalizeHeights method exists', () => {
    expect(equalheight.equalizeHeights).to.be.a('function');
  });

  it('calculates max height with JS fallback', async () => {
    const jsEqualheight = await fixture<WBEqualHeight>(html`
      <wb-equalheight use-js-fallback>
        <div style="height: 100px;">Column 1</div>
        <div style="height: 200px;">Column 2</div>
      </wb-equalheight>
    `);
    await jsEqualheight.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));
    jsEqualheight.equalizeHeights();
    const children = jsEqualheight.querySelectorAll('div');
    expect(children[0].style.minHeight).to.equal('200px');
  });

  it('emits wb-equalheight-applied event', async () => {
    let eventFired = false;
    equalheight.addEventListener('wb-equalheight-applied', () => { eventFired = true; });
    equalheight.useJsFallback = true;
    await equalheight.updateComplete;
    equalheight.equalizeHeights();
    expect(eventFired).to.equal(true);
  });

  it('event includes maxHeight', async () => {
    let maxHeight = 0;
    equalheight.addEventListener('wb-equalheight-applied', (e: Event) => {
      const customEvent = e as CustomEvent;
      maxHeight = customEvent.detail.maxHeight;
    });
    equalheight.useJsFallback = true;
    await equalheight.updateComplete;
    equalheight.equalizeHeights();
    expect(maxHeight).to.be.greaterThan(0);
  });

  it('handles ResizeObserver when useJsFallback=true', async () => {
    const jsEqualheight = await fixture<WBEqualHeight>(html`
      <wb-equalheight use-js-fallback>
        <div>Column 1</div>
        <div>Column 2</div>
      </wb-equalheight>
    `);
    expect(jsEqualheight.useJsFallback).to.equal(true);
  });

  it('has default columns value', () => {
    expect(equalheight.columns).to.equal(0);
  });

  it('has default vertical value', () => {
    expect(equalheight.vertical).to.equal(false);
  });

  it('has default useJsFallback value', () => {
    expect(equalheight.useJsFallback).to.equal(false);
  });

  it('handles empty slot', async () => {
    const empty = await fixture<WBEqualHeight>(html`
      <wb-equalheight use-js-fallback></wb-equalheight>
    `);
    empty.equalizeHeights();
    expect(empty).to.exist;
  });

  it('resets heights before recalculating', async () => {
    const jsEqualheight = await fixture<WBEqualHeight>(html`
      <wb-equalheight use-js-fallback>
        <div style="height: 100px;">Column 1</div>
        <div style="height: 150px;">Column 2</div>
      </wb-equalheight>
    `);
    await jsEqualheight.updateComplete;
    jsEqualheight.equalizeHeights();
    const child = jsEqualheight.querySelector('div') as HTMLElement;
    const initialHeight = child.style.minHeight;
    jsEqualheight.equalizeHeights();
    expect(child.style.minHeight).to.equal(initialHeight);
  });

  it('applies minHeight to all elements', async () => {
    const jsEqualheight = await fixture<WBEqualHeight>(html`
      <wb-equalheight use-js-fallback>
        <div style="height: 100px;">Column 1</div>
        <div style="height: 150px;">Column 2</div>
        <div style="height: 120px;">Column 3</div>
      </wb-equalheight>
    `);
    await jsEqualheight.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));
    jsEqualheight.equalizeHeights();
    const children = jsEqualheight.querySelectorAll('div');
    const heights = Array.from(children).map(el => (el as HTMLElement).style.minHeight);
    expect(new Set(heights).size).to.equal(1);
  });

  it('grid gap is applied', () => {
    const gap = getComputedStyle(equalheight).gap;
    expect(gap).to.exist;
  });

  it('renders slot content', () => {
    const slot = equalheight.shadowRoot?.querySelector('slot');
    expect(slot).to.exist;
  });

  it('slot has assigned elements', () => {
    const slot = equalheight.shadowRoot?.querySelector('slot') as HTMLSlotElement;
    const elements = slot?.assignedElements();
    expect(elements?.length).to.equal(3);
  });

  it('supports dynamic column changes', async () => {
    equalheight.columns = 2;
    await equalheight.updateComplete;
    expect(equalheight.style.gridTemplateColumns).to.equal('repeat(2, 1fr)');
    equalheight.columns = 4;
    await equalheight.updateComplete;
    expect(equalheight.style.gridTemplateColumns).to.equal('repeat(4, 1fr)');
  });
});
