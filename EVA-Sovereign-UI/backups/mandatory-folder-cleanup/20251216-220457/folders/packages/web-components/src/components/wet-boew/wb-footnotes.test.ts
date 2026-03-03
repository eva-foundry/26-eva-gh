import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-footnotes.js';
import type { WBFootnotes } from './wb-footnotes.js';

describe('WBFootnotes', () => {
  let footnotes: WBFootnotes;

  beforeEach(async () => {
    footnotes = await fixture<WBFootnotes>(html`
      <wb-footnotes>
        <p>
          This is some text<span data-footnote="First footnote text"></span> with footnotes.
          Here is another<span data-footnote="Second footnote text"></span> footnote.
        </p>
      </wb-footnotes>
    `);
    await footnotes.updateComplete;
  });

  it('renders', () => {
    expect(footnotes).to.exist;
  });

  it('processes footnotes', () => {
    expect(footnotes.footnotes.length).to.equal(2);
  });

  it('displays footnote references', () => {
    const refs = footnotes.querySelectorAll('.footnote-ref');
    expect(refs.length).to.equal(2);
  });

  it('footnote reference has correct number', () => {
    const ref = footnotes.querySelector('.footnote-ref');
    expect(ref?.textContent).to.equal('[1]');
  });

  it('footnote reference has role', () => {
    const ref = footnotes.querySelector('.footnote-ref');
    expect(ref?.getAttribute('role')).to.equal('doc-noteref');
  });

  it('footnote reference has aria-label', () => {
    const ref = footnotes.querySelector('.footnote-ref');
    expect(ref?.getAttribute('aria-label')).to.exist;
  });

  it('displays footnotes section', () => {
    const section = footnotes.shadowRoot!.querySelector('.footnotes-section');
    expect(section).to.exist;
  });

  it('footnotes section has role', () => {
    const section = footnotes.shadowRoot!.querySelector('.footnotes-section');
    expect(section?.getAttribute('role')).to.equal('doc-endnotes');
  });

  it('footnotes section has aria-label', () => {
    const section = footnotes.shadowRoot!.querySelector('.footnotes-section');
    expect(section?.getAttribute('aria-label')).to.exist;
  });

  it('displays footnotes title', () => {
    const title = footnotes.shadowRoot!.querySelector('.footnotes-title');
    expect(title).to.exist;
  });

  it('displays correct number of footnote items', () => {
    const items = footnotes.shadowRoot!.querySelectorAll('.footnote-item');
    expect(items.length).to.equal(2);
  });

  it('footnote item has role', () => {
    const item = footnotes.shadowRoot!.querySelector('.footnote-item');
    expect(item?.getAttribute('role')).to.equal('doc-endnote');
  });

  it('footnote item has ID', () => {
    const item = footnotes.shadowRoot!.querySelector('.footnote-item');
    expect(item?.getAttribute('id')).to.exist;
  });

  it('footnote displays correct text', () => {
    const text = footnotes.shadowRoot!.querySelector('.footnote-text');
    expect(text?.textContent).to.equal('First footnote text');
  });

  it('footnote has return link', () => {
    const returnLink = footnotes.shadowRoot!.querySelector('.footnote-return');
    expect(returnLink).to.exist;
  });

  it('return link has aria-label', () => {
    const returnLink = footnotes.shadowRoot!.querySelector('.footnote-return');
    expect(returnLink?.getAttribute('aria-label')).to.exist;
  });

  it('return link points to reference', () => {
    const returnLink = footnotes.shadowRoot!.querySelector('.footnote-return');
    expect(returnLink?.getAttribute('href')).to.include('fnref-');
  });

  it('emits wb-footnotes-processed event', async () => {
    let eventFired = false;
    const test = await fixture<WBFootnotes>(html`
      <wb-footnotes>
        <p>Text<span data-footnote="Note"></span></p>
      </wb-footnotes>
    `);
    test.addEventListener('wb-footnotes-processed', () => { eventFired = true; });
    await test.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('event includes count', async () => {
    let count = 0;
    const test = await fixture<WBFootnotes>(html`
      <wb-footnotes>
        <p>Text<span data-footnote="Note 1"></span> more<span data-footnote="Note 2"></span></p>
      </wb-footnotes>
    `);
    test.addEventListener('wb-footnotes-processed', (e: Event) => {
      count = (e as CustomEvent).detail.count;
    });
    await test.updateComplete;
    expect(count).to.equal(2);
  });

  it('handles no footnotes', async () => {
    const empty = await fixture<WBFootnotes>(html`
      <wb-footnotes>
        <p>Text without footnotes</p>
      </wb-footnotes>
    `);
    await empty.updateComplete;
    expect(empty.footnotes.length).to.equal(0);
  });

  it('no footnotes section when empty', async () => {
    const empty = await fixture<WBFootnotes>(html`
      <wb-footnotes>
        <p>Text without footnotes</p>
      </wb-footnotes>
    `);
    await empty.updateComplete;
    const section = empty.shadowRoot!.querySelector('.footnotes-section');
    expect(section).to.be.null;
  });

  it('default footnotes array is empty', async () => {
    const empty = await fixture<WBFootnotes>(html`
      <wb-footnotes></wb-footnotes>
    `);
    expect(empty.footnotes.length).to.equal(0);
  });

  it('footnote numbers are sequential', () => {
    const numbers = footnotes.shadowRoot!.querySelectorAll('.footnote-number');
    expect(numbers[0]?.textContent).to.equal('1.');
    expect(numbers[1]?.textContent).to.equal('2.');
  });

  it('supports single footnote', async () => {
    const single = await fixture<WBFootnotes>(html`
      <wb-footnotes>
        <p>Text<span data-footnote="Single note"></span></p>
      </wb-footnotes>
    `);
    await single.updateComplete;
    expect(single.footnotes.length).to.equal(1);
  });

  it('renders without errors when empty', async () => {
    const empty = await fixture<WBFootnotes>(html`
      <wb-footnotes></wb-footnotes>
    `);
    expect(empty).to.exist;
  });
});
