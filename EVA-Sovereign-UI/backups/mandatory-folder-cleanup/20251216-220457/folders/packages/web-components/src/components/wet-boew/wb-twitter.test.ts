import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-twitter.js';
import type { WBTwitter } from './wb-twitter.js';

describe('WBTwitter', () => {
  let twitter: WBTwitter;

  beforeEach(async () => {
    twitter = await fixture<WBTwitter>(html`
      <wb-twitter username="Canada"></wb-twitter>
    `);
  });

  it('renders', () => {
    expect(twitter).to.exist;
  });

  it('displays container', () => {
    const container = twitter.shadowRoot!.querySelector('.container');
    expect(container).to.exist;
  });

  it('displays timeline container', () => {
    const timeline = twitter.shadowRoot!.querySelector('.timeline');
    expect(timeline).to.exist;
  });

  it('displays loading initially', () => {
    const loading = twitter.shadowRoot!.querySelector('.loading');
    expect(loading).to.exist;
  });

  it('loading has role', () => {
    const loading = twitter.shadowRoot!.querySelector('.loading');
    expect(loading?.getAttribute('role')).to.equal('status');
  });

  it('loading has aria-live', () => {
    const loading = twitter.shadowRoot!.querySelector('.loading');
    expect(loading?.getAttribute('aria-live')).to.equal('polite');
  });

  it('default width is 400', () => {
    expect(twitter.width).to.equal(400);
  });

  it('default height is 600', () => {
    expect(twitter.height).to.equal(600);
  });

  it('default tweetLimit is 5', () => {
    expect(twitter.tweetLimit).to.equal(5);
  });

  it('default theme is light', () => {
    expect(twitter.theme).to.equal('light');
  });

  it('supports custom width', async () => {
    const custom = await fixture<WBTwitter>(html`
      <wb-twitter username="test" width="500"></wb-twitter>
    `);
    expect(custom.width).to.equal(500);
  });

  it('supports custom height', async () => {
    const custom = await fixture<WBTwitter>(html`
      <wb-twitter username="test" height="700"></wb-twitter>
    `);
    expect(custom.height).to.equal(700);
  });

  it('supports custom tweetLimit', async () => {
    const custom = await fixture<WBTwitter>(html`
      <wb-twitter username="test" tweetLimit="10"></wb-twitter>
    `);
    expect(custom.tweetLimit).to.equal(10);
  });

  it('supports dark theme', async () => {
    const dark = await fixture<WBTwitter>(html`
      <wb-twitter username="test" theme="dark"></wb-twitter>
    `);
    expect(dark.theme).to.equal('dark');
  });

  it('displays error without username', async () => {
    const noUser = await fixture<WBTwitter>(html`
      <wb-twitter></wb-twitter>
    `);
    const error = noUser.shadowRoot!.querySelector('.error');
    expect(error).to.exist;
  });

  it('error has role=alert', async () => {
    const noUser = await fixture<WBTwitter>(html`
      <wb-twitter></wb-twitter>
    `);
    const error = noUser.shadowRoot!.querySelector('.error');
    expect(error?.getAttribute('role')).to.equal('alert');
  });

  it('error displays fallback link without username', async () => {
    const noUser = await fixture<WBTwitter>(html`
      <wb-twitter></wb-twitter>
    `);
    const link = noUser.shadowRoot!.querySelector('a');
    expect(link).to.be.null;
  });

  it('username property set', () => {
    expect(twitter.username).to.equal('Canada');
  });

  it('handles different usernames', async () => {
    const custom = await fixture<WBTwitter>(html`
      <wb-twitter username="govcanada"></wb-twitter>
    `);
    expect(custom.username).to.equal('govcanada');
  });

  it('container width matches property', () => {
    const container = twitter.shadowRoot!.querySelector('.container') as HTMLElement;
    expect(container.style.width).to.equal('400px');
  });

  it('supports custom container width', async () => {
    const custom = await fixture<WBTwitter>(html`
      <wb-twitter username="test" width="300"></wb-twitter>
    `);
    const container = custom.shadowRoot!.querySelector('.container') as HTMLElement;
    expect(container.style.width).to.equal('300px');
  });

  it('renders without errors', async () => {
    const test = await fixture<WBTwitter>(html`
      <wb-twitter></wb-twitter>
    `);
    expect(test).to.exist;
  });

  it('renders with all options', async () => {
    const full = await fixture<WBTwitter>(html`
      <wb-twitter
        username="Canada"
        width="350"
        height="500"
        tweetLimit="3"
        theme="dark"
      ></wb-twitter>
    `);
    expect(full).to.exist;
    expect(full.username).to.equal('Canada');
    expect(full.width).to.equal(350);
    expect(full.height).to.equal(500);
    expect(full.tweetLimit).to.equal(3);
    expect(full.theme).to.equal('dark');
  });
});
