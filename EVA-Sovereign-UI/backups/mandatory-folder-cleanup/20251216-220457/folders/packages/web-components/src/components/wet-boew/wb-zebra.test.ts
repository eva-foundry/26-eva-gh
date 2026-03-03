import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-zebra.js';
import type { WBZebra } from './wb-zebra.js';

describe('WBZebra', () => {
  let zebra: WBZebra;

  beforeEach(async () => {
    zebra = await fixture<WBZebra>(html`
      <wb-zebra>
        <table>
          <tr><td>Row 1</td></tr>
          <tr><td>Row 2</td></tr>
          <tr><td>Row 3</td></tr>
          <tr><td>Row 4</td></tr>
        </table>
      </wb-zebra>
    `);
  });

  it('renders', () => {
    expect(zebra).to.exist;
  });

  it('displays table', () => {
    const table = zebra.querySelector('table');
    expect(table).to.exist;
  });

  it('applies zebra classes to rows', () => {
    const rows = zebra.querySelectorAll('tr');
    expect(rows[0]?.classList.contains('zebra-odd')).to.equal(true);
    expect(rows[1]?.classList.contains('zebra-even')).to.equal(true);
  });

  it('alternates classes correctly', () => {
    const rows = zebra.querySelectorAll('tr');
    expect(rows[0]?.classList.contains('zebra-odd')).to.equal(true);
    expect(rows[1]?.classList.contains('zebra-even')).to.equal(true);
    expect(rows[2]?.classList.contains('zebra-odd')).to.equal(true);
    expect(rows[3]?.classList.contains('zebra-even')).to.equal(true);
  });

  it('works with lists', async () => {
    const listZebra = await fixture<WBZebra>(html`
      <wb-zebra>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </wb-zebra>
    `);
    const items = listZebra.querySelectorAll('li');
    expect(items[0]?.classList.contains('zebra-odd')).to.equal(true);
    expect(items[1]?.classList.contains('zebra-even')).to.equal(true);
  });

  it('works with ordered lists', async () => {
    const olZebra = await fixture<WBZebra>(html`
      <wb-zebra>
        <ol>
          <li>First</li>
          <li>Second</li>
        </ol>
      </wb-zebra>
    `);
    const items = olZebra.querySelectorAll('li');
    expect(items[0]?.classList.contains('zebra-odd')).to.equal(true);
    expect(items[1]?.classList.contains('zebra-even')).to.equal(true);
  });

  it('emits wb-zebra-applied event', async () => {
    let eventFired = false;
    const test = await fixture<WBZebra>(html`
      <wb-zebra>
        <table>
          <tr><td>Row</td></tr>
        </table>
      </wb-zebra>
    `);
    test.addEventListener('wb-zebra-applied', () => { eventFired = true; });
    await test.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('event includes row count', async () => {
    let rowCount = 0;
    const test = await fixture<WBZebra>(html`
      <wb-zebra>
        <table>
          <tr><td>1</td></tr>
          <tr><td>2</td></tr>
          <tr><td>3</td></tr>
        </table>
      </wb-zebra>
    `);
    test.addEventListener('wb-zebra-applied', (e: Event) => {
      rowCount = (e as CustomEvent).detail.rows;
    });
    await test.updateComplete;
    expect(rowCount).to.equal(3);
  });

  it('handles tables with tbody', async () => {
    const withTbody = await fixture<WBZebra>(html`
      <wb-zebra>
        <table>
          <tbody>
            <tr><td>Row 1</td></tr>
            <tr><td>Row 2</td></tr>
          </tbody>
        </table>
      </wb-zebra>
    `);
    const rows = withTbody.querySelectorAll('tr');
    expect(rows[0]?.classList.contains('zebra-odd')).to.equal(true);
  });

  it('handles multiple tables', async () => {
    const multi = await fixture<WBZebra>(html`
      <wb-zebra>
        <table>
          <tr><td>Table 1 Row 1</td></tr>
          <tr><td>Table 1 Row 2</td></tr>
        </table>
        <table>
          <tr><td>Table 2 Row 1</td></tr>
          <tr><td>Table 2 Row 2</td></tr>
        </table>
      </wb-zebra>
    `);
    const tables = multi.querySelectorAll('table');
    expect(tables.length).to.equal(2);
  });

  it('handles empty table', async () => {
    const empty = await fixture<WBZebra>(html`
      <wb-zebra>
        <table></table>
      </wb-zebra>
    `);
    expect(empty).to.exist;
  });

  it('handles empty list', async () => {
    const empty = await fixture<WBZebra>(html`
      <wb-zebra>
        <ul></ul>
      </wb-zebra>
    `);
    expect(empty).to.exist;
  });

  it('renders without content', async () => {
    const empty = await fixture<WBZebra>(html`
      <wb-zebra></wb-zebra>
    `);
    expect(empty).to.exist;
  });

  it('handles single row table', async () => {
    const single = await fixture<WBZebra>(html`
      <wb-zebra>
        <table>
          <tr><td>Single row</td></tr>
        </table>
      </wb-zebra>
    `);
    const row = single.querySelector('tr');
    expect(row?.classList.contains('zebra-odd')).to.equal(true);
  });

  it('handles single item list', async () => {
    const single = await fixture<WBZebra>(html`
      <wb-zebra>
        <ul>
          <li>Single item</li>
        </ul>
      </wb-zebra>
    `);
    const item = single.querySelector('li');
    expect(item?.classList.contains('zebra-odd')).to.equal(true);
  });

  it('handles mixed content', async () => {
    const mixed = await fixture<WBZebra>(html`
      <wb-zebra>
        <table>
          <tr><td>Row</td></tr>
        </table>
        <ul>
          <li>Item</li>
        </ul>
      </wb-zebra>
    `);
    expect(mixed).to.exist;
  });

  it('displays slot content', () => {
    const slot = zebra.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
  });

  it('renders with minimal markup', async () => {
    const minimal = await fixture<WBZebra>(html`
      <wb-zebra>
        <table>
          <tr><td>A</td></tr>
          <tr><td>B</td></tr>
        </table>
      </wb-zebra>
    `);
    expect(minimal).to.exist;
  });

  it('first row has odd class', () => {
    const firstRow = zebra.querySelector('tr');
    expect(firstRow?.classList.contains('zebra-odd')).to.equal(true);
  });

  it('second row has even class', () => {
    const rows = zebra.querySelectorAll('tr');
    expect(rows[1]?.classList.contains('zebra-even')).to.equal(true);
  });

  it('renders without errors', async () => {
    const test = await fixture<WBZebra>(html`
      <wb-zebra></wb-zebra>
    `);
    expect(test).to.exist;
  });
});
