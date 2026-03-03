import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach, vi } from 'vitest';
import './wb-share.js';
import type { WBShare } from './wb-share.js';

describe('WBShare', () => {
  let share: WBShare;

  beforeEach(async () => {
    global.window.open = vi.fn();
    share = await fixture<WBShare>(html`
      <wb-share url="https://example.com" title="Test Page"></wb-share>
    `);
  });

  it('renders', () => {
    expect(share).to.exist;
  });

  it('has url property', () => {
    expect(share.url).to.equal('https://example.com');
  });

  it('has title property', () => {
    expect(share.title).to.equal('Test Page');
  });

  it('displays share container', () => {
    const container = share.shadowRoot!.querySelector('.share-container');
    expect(container).to.exist;
  });

  it('container has role=group', () => {
    const container = share.shadowRoot!.querySelector('.share-container');
    expect(container?.getAttribute('role')).to.equal('group');
  });

  it('container has aria-label', () => {
    const container = share.shadowRoot!.querySelector('.share-container');
    expect(container?.getAttribute('aria-label')).to.exist;
  });

  it('displays default platforms', () => {
    const buttons = share.shadowRoot!.querySelectorAll('.share-button');
    expect(buttons.length).to.equal(4);
  });

  it('has facebook button', () => {
    const facebook = share.shadowRoot!.querySelector('.share-button.facebook');
    expect(facebook).to.exist;
  });

  it('has twitter button', () => {
    const twitter = share.shadowRoot!.querySelector('.share-button.twitter');
    expect(twitter).to.exist;
  });

  it('has linkedin button', () => {
    const linkedin = share.shadowRoot!.querySelector('.share-button.linkedin');
    expect(linkedin).to.exist;
  });

  it('has email button', () => {
    const email = share.shadowRoot!.querySelector('.share-button.email');
    expect(email).to.exist;
  });

  it('buttons have aria-labels', () => {
    const buttons = share.shadowRoot!.querySelectorAll('.share-button');
    buttons.forEach(button => {
      expect(button.getAttribute('aria-label')).to.exist;
    });
  });

  it('buttons have titles', () => {
    const buttons = share.shadowRoot!.querySelectorAll('.share-button');
    buttons.forEach(button => {
      expect(button.getAttribute('title')).to.exist;
    });
  });

  it('custom platforms array works', async () => {
    const custom = await fixture<WBShare>(html`
      <wb-share .platforms="${['facebook', 'twitter']}"></wb-share>
    `);
    const buttons = custom.shadowRoot!.querySelectorAll('.share-button');
    expect(buttons.length).to.equal(2);
  });

  it('emits wb-share event on click', async () => {
    let eventFired = false;
    share.addEventListener('wb-share', () => { eventFired = true; });
    const button = share.shadowRoot!.querySelector('.share-button') as HTMLAnchorElement;
    button.click();
    await share.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('event includes platform', async () => {
    let platform = '';
    share.addEventListener('wb-share', (e: Event) => {
      platform = (e as CustomEvent).detail.platform;
    });
    const button = share.shadowRoot!.querySelector('.share-button.facebook') as HTMLAnchorElement;
    button.click();
    await share.updateComplete;
    expect(platform).to.equal('facebook');
  });

  it('event includes URL', async () => {
    let url = '';
    share.addEventListener('wb-share', (e: Event) => {
      url = (e as CustomEvent).detail.url;
    });
    const button = share.shadowRoot!.querySelector('.share-button') as HTMLAnchorElement;
    button.click();
    await share.updateComplete;
    expect(url).to.equal('https://example.com');
  });

  it('uses current URL if none provided', async () => {
    const noUrl = await fixture<WBShare>(html`
      <wb-share></wb-share>
    `);
    expect(noUrl.url).to.include('http');
  });

  it('uses document title if none provided', async () => {
    const noTitle = await fixture<WBShare>(html`
      <wb-share></wb-share>
    `);
    expect(noTitle.title).to.exist;
  });

  it('facebook button has correct class', () => {
    const facebook = share.shadowRoot!.querySelector('.share-button.facebook');
    expect(facebook?.classList.contains('facebook')).to.equal(true);
  });

  it('twitter button has correct class', () => {
    const twitter = share.shadowRoot!.querySelector('.share-button.twitter');
    expect(twitter?.classList.contains('twitter')).to.equal(true);
  });

  it('linkedin button has correct class', () => {
    const linkedin = share.shadowRoot!.querySelector('.share-button.linkedin');
    expect(linkedin?.classList.contains('linkedin')).to.equal(true);
  });

  it('email button has correct class', () => {
    const email = share.shadowRoot!.querySelector('.share-button.email');
    expect(email?.classList.contains('email')).to.equal(true);
  });

  it('has description property', async () => {
    const withDesc = await fixture<WBShare>(html`
      <wb-share description="Test description"></wb-share>
    `);
    expect(withDesc.description).to.equal('Test description');
  });

  it('renders without errors when empty', async () => {
    const empty = await fixture<WBShare>(html`
      <wb-share></wb-share>
    `);
    expect(empty).to.exist;
  });

  it('buttons are anchor elements', () => {
    const buttons = share.shadowRoot!.querySelectorAll('.share-button');
    buttons.forEach(button => {
      expect(button.tagName).to.equal('A');
    });
  });

  it('buttons have href', () => {
    const buttons = share.shadowRoot!.querySelectorAll('.share-button');
    buttons.forEach(button => {
      expect(button.getAttribute('href')).to.exist;
    });
  });
});
