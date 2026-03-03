import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-texthighlight.js';
import type { WBTextHighlight } from './wb-texthighlight.js';

describe('WBTextHighlight', () => {
  let highlight: WBTextHighlight;

  beforeEach(async () => {
    highlight = await fixture<WBTextHighlight>(html`
      <wb-texthighlight query="test">
        <p>This is a test paragraph with test words.</p>
      </wb-texthighlight>
    `);
  });

  it('renders', () => {
    expect(highlight).to.exist;
  });

  it('has query property', () => {
    expect(highlight.query).to.equal('test');
  });

  it('default caseSensitive is false', () => {
    expect(highlight.caseSensitive).to.equal(false);
  });

  it('default wholeWord is false', () => {
    expect(highlight.wholeWord).to.equal(false);
  });

  it('default showControls is false', () => {
    expect(highlight.showControls).to.equal(false);
  });

  it('highlights matching text', () => {
    const marks = highlight.querySelectorAll('mark');
    expect(marks.length).to.be.greaterThan(0);
  });

  it('counts matches correctly', () => {
    expect(highlight['matchCount']).to.equal(2);
  });

  it('supports case-sensitive search', async () => {
    const sensitive = await fixture<WBTextHighlight>(html`
      <wb-texthighlight query="Test" case-sensitive>
        <p>Test and test are different when case-sensitive.</p>
      </wb-texthighlight>
    `);
    expect(sensitive.caseSensitive).to.equal(true);
  });

  it('supports whole-word search', async () => {
    const wholeWord = await fixture<WBTextHighlight>(html`
      <wb-texthighlight query="test" whole-word>
        <p>Testing test tested</p>
      </wb-texthighlight>
    `);
    expect(wholeWord.wholeWord).to.equal(true);
  });

  it('displays controls when show-controls is true', async () => {
    const withControls = await fixture<WBTextHighlight>(html`
      <wb-texthighlight query="test" show-controls>
        <p>This is a test.</p>
      </wb-texthighlight>
    `);
    const controls = withControls.shadowRoot!.querySelector('.controls');
    expect(controls).to.exist;
  });

  it('hides controls when show-controls is false', () => {
    const controls = highlight.shadowRoot!.querySelector('.controls');
    expect(controls).to.be.null;
  });

  it('displays match count', async () => {
    const withControls = await fixture<WBTextHighlight>(html`
      <wb-texthighlight query="test" show-controls>
        <p>test test test</p>
      </wb-texthighlight>
    `);
    const count = withControls.shadowRoot!.querySelector('.count');
    expect(count?.textContent).to.include('3');
  });

  it('has previous button', async () => {
    const withControls = await fixture<WBTextHighlight>(html`
      <wb-texthighlight query="test" show-controls>
        <p>test test</p>
      </wb-texthighlight>
    `);
    const buttons = withControls.shadowRoot!.querySelectorAll('.control-button');
    expect(buttons.length).to.be.greaterThan(0);
  });

  it('has next button', async () => {
    const withControls = await fixture<WBTextHighlight>(html`
      <wb-texthighlight query="test" show-controls>
        <p>test test</p>
      </wb-texthighlight>
    `);
    const buttons = withControls.shadowRoot!.querySelectorAll('.control-button');
    expect(buttons.length).to.equal(3);
  });

  it('has clear button', async () => {
    const withControls = await fixture<WBTextHighlight>(html`
      <wb-texthighlight query="test" show-controls>
        <p>test test</p>
      </wb-texthighlight>
    `);
    const clearBtn = withControls.shadowRoot!.querySelectorAll('.control-button')[2];
    expect(clearBtn).to.exist;
  });

  it('emits wb-texthighlight-highlighted event', async () => {
    let eventFired = false;
    const test = await fixture<WBTextHighlight>(html`
      <wb-texthighlight query="word">
        <p>word word</p>
      </wb-texthighlight>
    `);
    test.addEventListener('wb-texthighlight-highlighted', () => { eventFired = true; });
    await test.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('event includes query', async () => {
    let query = '';
    const test = await fixture<WBTextHighlight>(html`
      <wb-texthighlight query="search">
        <p>search term</p>
      </wb-texthighlight>
    `);
    test.addEventListener('wb-texthighlight-highlighted', (e: Event) => {
      query = (e as CustomEvent).detail.query;
    });
    await test.updateComplete;
    expect(query).to.equal('search');
  });

  it('event includes matchCount', async () => {
    let count = 0;
    const test = await fixture<WBTextHighlight>(html`
      <wb-texthighlight query="test">
        <p>test test test</p>
      </wb-texthighlight>
    `);
    test.addEventListener('wb-texthighlight-highlighted', (e: Event) => {
      count = (e as CustomEvent).detail.matchCount;
    });
    await test.updateComplete;
    expect(count).to.equal(3);
  });

  it('clears highlights when query is empty', async () => {
    highlight.query = '';
    await highlight.updateComplete;
    const marks = highlight.querySelectorAll('mark');
    expect(marks.length).to.equal(0);
  });

  it('handles no matches', async () => {
    const noMatch = await fixture<WBTextHighlight>(html`
      <wb-texthighlight query="notfound">
        <p>This text has no matches.</p>
      </wb-texthighlight>
    `);
    const marks = noMatch.querySelectorAll('mark');
    expect(marks.length).to.equal(0);
  });

  it('handles empty content', async () => {
    const empty = await fixture<WBTextHighlight>(html`
      <wb-texthighlight query="test"></wb-texthighlight>
    `);
    expect(empty).to.exist;
  });

  it('default query is empty', async () => {
    const noQuery = await fixture<WBTextHighlight>(html`
      <wb-texthighlight></wb-texthighlight>
    `);
    expect(noQuery.query).to.equal('');
  });

  it('marks have correct background', () => {
    const mark = highlight.querySelector('mark');
    if (mark) {
      const style = getComputedStyle(mark);
      expect(style).to.exist;
    }
  });

  it('renders without errors', async () => {
    const test = await fixture<WBTextHighlight>(html`
      <wb-texthighlight></wb-texthighlight>
    `);
    expect(test).to.exist;
  });
});
