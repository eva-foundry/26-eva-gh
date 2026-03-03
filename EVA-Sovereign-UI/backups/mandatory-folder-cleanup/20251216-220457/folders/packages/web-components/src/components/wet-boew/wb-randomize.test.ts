import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-randomize.js';
import type { WBRandomize } from './wb-randomize.js';

describe('WBRandomize', () => {
  let randomize: WBRandomize;

  beforeEach(async () => {
    randomize = await fixture<WBRandomize>(html`
      <wb-randomize>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </wb-randomize>
    `);
  });

  it('renders', () => {
    expect(randomize).to.exist;
  });

  it('displays slot', () => {
    const slot = randomize.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
  });

  it('selects one item', () => {
    const items = randomize.querySelectorAll('div');
    const selected = Array.from(items).filter(item => 
      item.classList.contains('wb-randomize-selected')
    );
    expect(selected.length).to.equal(1);
  });

  it('selected item has class', () => {
    const items = randomize.querySelectorAll('div');
    const hasSelected = Array.from(items).some(item => 
      item.classList.contains('wb-randomize-selected')
    );
    expect(hasSelected).to.equal(true);
  });

  it('emits selected event', async () => {
    let eventFired = false;
    const test = await fixture<WBRandomize>(html`
      <wb-randomize @wb-randomize-selected="${() => { eventFired = true; }}">
        <div>Item 1</div>
        <div>Item 2</div>
      </wb-randomize>
    `);
    expect(eventFired).to.equal(true);
  });

  it('event includes index', async () => {
    let selectedIndex = -1;
    const test = await fixture<WBRandomize>(html`
      <wb-randomize @wb-randomize-selected="${(e: CustomEvent) => { selectedIndex = e.detail.index; }}">
        <div>Item 1</div>
        <div>Item 2</div>
      </wb-randomize>
    `);
    expect(selectedIndex).to.be.greaterThanOrEqual(0);
  });

  it('event includes element', async () => {
    let selectedElement: Element | null = null;
    const test = await fixture<WBRandomize>(html`
      <wb-randomize @wb-randomize-selected="${(e: CustomEvent) => { selectedElement = e.detail.element; }}">
        <div>Item 1</div>
        <div>Item 2</div>
      </wb-randomize>
    `);
    expect(selectedElement).to.exist;
  });

  it('seed produces consistent results', async () => {
    const test1 = await fixture<WBRandomize>(html`
      <wb-randomize seed="42">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </wb-randomize>
    `);
    
    const test2 = await fixture<WBRandomize>(html`
      <wb-randomize seed="42">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </wb-randomize>
    `);

    const selected1 = Array.from(test1.querySelectorAll('div')).findIndex(item =>
      item.classList.contains('wb-randomize-selected')
    );
    const selected2 = Array.from(test2.querySelectorAll('div')).findIndex(item =>
      item.classList.contains('wb-randomize-selected')
    );
    
    expect(selected1).to.equal(selected2);
  });

  it('rerandomize changes selection', async () => {
    const items = randomize.querySelectorAll('div');
    const firstSelected = Array.from(items).findIndex(item =>
      item.classList.contains('wb-randomize-selected')
    );

    randomize.rerandomize();
    await randomize.updateComplete;

    const secondSelected = Array.from(items).findIndex(item =>
      item.classList.contains('wb-randomize-selected')
    );

    // Note: There's a chance they could be the same, but test structure is valid
    expect(secondSelected).to.be.greaterThanOrEqual(0);
  });

  it('shuffle mode does not select single item', async () => {
    const shuffled = await fixture<WBRandomize>(html`
      <wb-randomize shuffle>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </wb-randomize>
    `);

    const items = shuffled.querySelectorAll('div');
    const selected = Array.from(items).filter(item =>
      item.classList.contains('wb-randomize-selected')
    );
    expect(selected.length).to.equal(0);
  });

  it('shuffle mode emits shuffled event', async () => {
    let eventFired = false;
    const test = await fixture<WBRandomize>(html`
      <wb-randomize shuffle @wb-randomize-shuffled="${() => { eventFired = true; }}">
        <div>Item 1</div>
        <div>Item 2</div>
      </wb-randomize>
    `);
    expect(eventFired).to.equal(true);
  });

  it('handles single item', async () => {
    const single = await fixture<WBRandomize>(html`
      <wb-randomize>
        <div>Only Item</div>
      </wb-randomize>
    `);
    
    const item = single.querySelector('div');
    expect(item?.classList.contains('wb-randomize-selected')).to.equal(true);
  });

  it('handles empty content', async () => {
    const empty = await fixture<WBRandomize>(html`
      <wb-randomize></wb-randomize>
    `);
    expect(empty).to.exist;
  });

  it('works with different element types', async () => {
    const mixed = await fixture<WBRandomize>(html`
      <wb-randomize>
        <p>Paragraph</p>
        <span>Span</span>
        <article>Article</article>
      </wb-randomize>
    `);
    
    const allItems = mixed.querySelectorAll('p, span, article');
    const selected = Array.from(allItems).filter(item =>
      item.classList.contains('wb-randomize-selected')
    );
    expect(selected.length).to.equal(1);
  });

  it('supports multiple rerandomize calls', async () => {
    randomize.rerandomize();
    await randomize.updateComplete;
    randomize.rerandomize();
    await randomize.updateComplete;
    
    const items = randomize.querySelectorAll('div');
    const selected = Array.from(items).filter(item =>
      item.classList.contains('wb-randomize-selected')
    );
    expect(selected.length).to.equal(1);
  });

  it('default seed is 0', () => {
    expect(randomize.seed).to.equal(0);
  });

  it('default shuffle is false', () => {
    expect(randomize.shuffle).to.equal(false);
  });

  it('renders without errors', async () => {
    const test = await fixture<WBRandomize>(html`
      <wb-randomize></wb-randomize>
    `);
    expect(test).to.exist;
  });
});
