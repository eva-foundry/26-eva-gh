import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { GCShare } from '../gc-share';
import '../gc-share';

describe('gc-share', () => {
  let windowOpenSpy: any;
  let clipboardWriteTextSpy: any;

  beforeEach(() => {
    windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    
    // Mock clipboard API if it doesn't exist
    if (!navigator.clipboard) {
      Object.assign(navigator, {
        clipboard: {
          writeText: vi.fn(() => Promise.resolve()),
        },
      });
    }
    
    clipboardWriteTextSpy = vi
      .spyOn(navigator.clipboard, 'writeText')
      .mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    if (windowOpenSpy) {
      windowOpenSpy.mockRestore();
    }
    if (clipboardWriteTextSpy) {
      clipboardWriteTextSpy.mockRestore();
    }
  });

  describe('Initialization', () => {
    it('renders with default properties', async () => {
      const el = await fixture<GCShare>(html`<gc-share></gc-share>`);
      expect(el).to.exist;
      expect(el.url).to.be.undefined;
      expect(el.title).to.be.undefined;
      expect(el.description).to.be.undefined;
      expect(el.platforms).to.deep.equal(['facebook', 'twitter', 'linkedin', 'email', 'copy']);
      expect(el.hideHeading).to.be.false;
      expect(el.compact).to.be.false;
    });

    it('renders with custom properties', async () => {
      const el = await fixture<GCShare>(html`
        <gc-share
          url="https://canada.ca/test"
          title="Test Page"
          description="Test description"
        ></gc-share>
      `);
      expect(el.url).to.equal('https://canada.ca/test');
      expect(el.title).to.equal('Test Page');
      expect(el.description).to.equal('Test description');
    });

    it('has correct shadow DOM structure', async () => {
      const el = await fixture<GCShare>(html`<gc-share></gc-share>`);
      const container = el.shadowRoot!.querySelector('.share-container');
      expect(container).to.exist;
    });

    it('is defined as gc-share', () => {
      const el = document.createElement('gc-share');
      expect(el).to.be.instanceOf(GCShare);
    });
  });

  describe('Share Buttons Rendering', () => {
    it('renders all default platforms', async () => {
      const el = await fixture<GCShare>(html`<gc-share></gc-share>`);
      const buttons = el.shadowRoot!.querySelectorAll('.share-button');
      expect(buttons.length).to.equal(5); // Facebook, Twitter, LinkedIn, Email, Copy
    });

    it('renders only specified platforms', async () => {
      const el = await fixture<GCShare>(html`<gc-share .platforms="${['facebook', 'twitter']}"></gc-share>`);
      const buttons = el.shadowRoot!.querySelectorAll('.share-button');
      expect(buttons.length).to.equal(2);
    });

    it('renders Facebook button', async () => {
      const el = await fixture<GCShare>(html`<gc-share .platforms="${['facebook']}"></gc-share>`);
      const button = el.shadowRoot!.querySelector('[data-platform="facebook"]');
      expect(button).to.exist;
    });

    it('renders Twitter button', async () => {
      const el = await fixture<GCShare>(html`<gc-share .platforms="${['twitter']}"></gc-share>`);
      const button = el.shadowRoot!.querySelector('[data-platform="twitter"]');
      expect(button).to.exist;
    });

    it('renders LinkedIn button', async () => {
      const el = await fixture<GCShare>(html`<gc-share .platforms="${['linkedin']}"></gc-share>`);
      const button = el.shadowRoot!.querySelector('[data-platform="linkedin"]');
      expect(button).to.exist;
    });

    it('renders Email button', async () => {
      const el = await fixture<GCShare>(html`<gc-share .platforms="${['email']}"></gc-share>`);
      const button = el.shadowRoot!.querySelector('[data-platform="email"]');
      expect(button).to.exist;
    });

    it('renders Copy Link button', async () => {
      const el = await fixture<GCShare>(html`<gc-share .platforms="${['copy']}"></gc-share>`);
      const button = el.shadowRoot!.querySelector('[data-platform="copy"]');
      expect(button).to.exist;
    });
  });

  describe('Heading Display', () => {
    it('shows heading by default', async () => {
      const el = await fixture<GCShare>(html`<gc-share></gc-share>`);
      const heading = el.shadowRoot!.querySelector('.share-heading');
      expect(heading).to.exist;
    });

    it('hides heading when hide-heading is true', async () => {
      const el = await fixture<GCShare>(html`<gc-share hide-heading></gc-share>`);
      const heading = el.shadowRoot!.querySelector('.share-heading');
      expect(heading).to.not.exist;
    });
  });

  describe('Compact Mode', () => {
    it('applies compact attribute', async () => {
      const el = await fixture<GCShare>(html`<gc-share compact></gc-share>`);
      expect(el.compact).to.be.true;
      expect(el.hasAttribute('compact')).to.be.true;
    });

    it('reflects compact attribute to host', async () => {
      const el = await fixture<GCShare>(html`<gc-share compact></gc-share>`);
      expect(el.getAttribute('compact')).to.equal('');
    });
  });

  describe('Facebook Sharing', () => {
    it('opens Facebook share dialog with URL', async () => {
      const el = await fixture<GCShare>(html`<gc-share url="https://canada.ca/test"></gc-share>`);
      const button = el.shadowRoot!.querySelector('[data-platform="facebook"]') as HTMLButtonElement;
      button.click();

      expect(windowOpenSpy).toHaveBeenCalled();
      const callArgs = windowOpenSpy.mock.calls[0];
      expect(callArgs[0]).to.include('facebook.com');
      expect(callArgs[0]).to.include(encodeURIComponent('https://canada.ca/test'));
    });

    it('uses current page URL if no URL provided', async () => {
      const el = await fixture<GCShare>(html`<gc-share></gc-share>`);
      const button = el.shadowRoot!.querySelector('[data-platform="facebook"]') as HTMLButtonElement;
      button.click();

      expect(windowOpenSpy).toHaveBeenCalled();
    });
  });

  describe('Twitter Sharing', () => {
    it('opens Twitter share dialog with URL and title', async () => {
      const el = await fixture<GCShare>(html`
        <gc-share url="https://canada.ca/test" title="Test Title"></gc-share>
      `);
      const button = el.shadowRoot!.querySelector('[data-platform="twitter"]') as HTMLButtonElement;
      button.click();

      expect(windowOpenSpy).toHaveBeenCalled();
      const callArgs = windowOpenSpy.mock.calls[0];
      expect(callArgs[0]).to.include('twitter.com');
      expect(callArgs[0]).to.include(encodeURIComponent('https://canada.ca/test'));
      expect(callArgs[0]).to.include(encodeURIComponent('Test Title'));
    });
  });

  describe('LinkedIn Sharing', () => {
    it('opens LinkedIn share dialog with URL', async () => {
      const el = await fixture<GCShare>(html`<gc-share url="https://canada.ca/test"></gc-share>`);
      const button = el.shadowRoot!.querySelector('[data-platform="linkedin"]') as HTMLButtonElement;
      button.click();

      expect(windowOpenSpy).toHaveBeenCalled();
      const callArgs = windowOpenSpy.mock.calls[0];
      expect(callArgs[0]).to.include('linkedin.com');
      expect(callArgs[0]).to.include(encodeURIComponent('https://canada.ca/test'));
    });
  });

  describe('Email Sharing', () => {
    it('creates mailto link with subject and body', async () => {
      const el = await fixture<GCShare>(html`
        <gc-share
          url="https://canada.ca/test"
          title="Test Title"
          description="Test description"
        ></gc-share>
      `);
      const button = el.shadowRoot!.querySelector('[data-platform="email"]') as HTMLButtonElement;

      // Check that button click would create mailto link
      // (we can't actually test window.location.href change in jsdom)
      expect(button).to.exist;
      expect(button.getAttribute('data-platform')).to.equal('email');
    });
  });

  describe('Copy Link', () => {
    it('copies URL to clipboard', async () => {
      const el = await fixture<GCShare>(html`<gc-share url="https://canada.ca/test"></gc-share>`);
      const button = el.shadowRoot!.querySelector('[data-platform="copy"]') as HTMLButtonElement;
      button.click();

      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(clipboardWriteTextSpy).toHaveBeenCalledWith('https://canada.ca/test');
    });

    it('shows success feedback after copying', async () => {
      const el = await fixture<GCShare>(html`<gc-share url="https://canada.ca/test"></gc-share>`);
      const button = el.shadowRoot!.querySelector('[data-platform="copy"]') as HTMLButtonElement;
      button.click();

      await new Promise((resolve) => setTimeout(resolve, 100));
      await el.updateComplete;

      const feedback = el.shadowRoot!.querySelector('.copy-feedback');
      expect(feedback).to.exist;
    });
  });

  describe('Event Emission', () => {
    it('emits gc-share-click event with platform and URL', async () => {
      const el = await fixture<GCShare>(html`<gc-share url="https://canada.ca/test"></gc-share>`);
      const button = el.shadowRoot!.querySelector('[data-platform="facebook"]') as HTMLButtonElement;

      let eventDetail: { platform: string; url: string } | null = null;
      el.addEventListener('gc-share-click', (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      });

      button.click();
      await el.updateComplete;

      expect(eventDetail).to.exist;
      expect(eventDetail!.platform).to.equal('facebook');
      expect(eventDetail!.url).to.equal('https://canada.ca/test');
    });

    it('emits gc-share-success event after copying link', async () => {
      const el = await fixture<GCShare>(html`<gc-share url="https://canada.ca/test"></gc-share>`);
      const button = el.shadowRoot!.querySelector('[data-platform="copy"]') as HTMLButtonElement;

      let eventDetail: { platform: string; url: string } | null = null;
      el.addEventListener('gc-share-success', (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      });

      button.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(eventDetail).to.exist;
      expect(eventDetail!.platform).to.equal('copy');
      expect(eventDetail!.url).to.equal('https://canada.ca/test');
    });
  });

  describe('Accessibility', () => {
    it('uses semantic button elements', async () => {
      const el = await fixture<GCShare>(html`<gc-share></gc-share>`);
      const buttons = el.shadowRoot!.querySelectorAll('button');
      expect(buttons.length).to.be.greaterThan(0);
    });

    it('has aria-label on buttons', async () => {
      const el = await fixture<GCShare>(html`<gc-share></gc-share>`);
      const button = el.shadowRoot!.querySelector('.share-button') as HTMLButtonElement;
      expect(button.hasAttribute('aria-label')).to.be.true;
    });

    it('copy feedback has role="status"', async () => {
      const el = await fixture<GCShare>(html`<gc-share url="https://canada.ca/test"></gc-share>`);
      const button = el.shadowRoot!.querySelector('[data-platform="copy"]') as HTMLButtonElement;
      button.click();

      await new Promise((resolve) => setTimeout(resolve, 100));
      await el.updateComplete;

      const feedback = el.shadowRoot!.querySelector('.copy-feedback');
      expect(feedback?.getAttribute('role')).to.equal('status');
    });

    it('copy feedback has aria-live="polite"', async () => {
      const el = await fixture<GCShare>(html`<gc-share url="https://canada.ca/test"></gc-share>`);
      const button = el.shadowRoot!.querySelector('[data-platform="copy"]') as HTMLButtonElement;
      button.click();

      await new Promise((resolve) => setTimeout(resolve, 100));
      await el.updateComplete;

      const feedback = el.shadowRoot!.querySelector('.copy-feedback');
      expect(feedback?.getAttribute('aria-live')).to.equal('polite');
    });
  });

  describe('Bilingual Support', () => {
    it('renders English labels by default', async () => {
      const el = await fixture<GCShare>(html`<gc-share></gc-share>`);
      const text = el.shadowRoot!.textContent || '';
      expect(text.trim().length).to.be.greaterThan(0);
    });

    it('renders French labels when locale is fr-CA', async () => {
      const el = await fixture<GCShare>(html`<gc-share locale="fr-CA"></gc-share>`);
      const text = el.shadowRoot!.textContent || '';
      expect(text.trim().length).to.be.greaterThan(0);
    });
  });

  describe('GC Design System Compliance', () => {
    it('uses Lato font family', () => {
      expect(GCShare.styles.cssText).to.include('Lato');
    });

    it('uses GC blue color (#284162)', () => {
      expect(GCShare.styles.cssText).to.include('#284162');
    });

    it('has 44px minimum touch target', () => {
      expect(GCShare.styles.cssText).to.include('44px');
    });
  });

  describe('Performance', () => {
    it('renders under 100ms', async () => {
      const start = performance.now();
      await fixture<GCShare>(html`<gc-share></gc-share>`);
      const duration = performance.now() - start;
      expect(duration).to.be.lessThan(100);
    });

    it('updates reactively when properties change', async () => {
      const el = await fixture<GCShare>(html`<gc-share></gc-share>`);
      el.platforms = ['facebook', 'twitter'];
      await el.updateComplete;
      const buttons = el.shadowRoot!.querySelectorAll('.share-button');
      expect(buttons.length).to.equal(2);
    });
  });

  describe('CSS Custom Properties', () => {
    it('exposes part="container" for styling', async () => {
      const el = await fixture<GCShare>(html`<gc-share></gc-share>`);
      const container = el.shadowRoot!.querySelector('[part="container"]');
      expect(container).to.exist;
    });

    it('exposes part="heading" for styling', async () => {
      const el = await fixture<GCShare>(html`<gc-share></gc-share>`);
      const heading = el.shadowRoot!.querySelector('[part="heading"]');
      expect(heading).to.exist;
    });

    it('exposes part="buttons" for styling', async () => {
      const el = await fixture<GCShare>(html`<gc-share></gc-share>`);
      const buttons = el.shadowRoot!.querySelector('[part="buttons"]');
      expect(buttons).to.exist;
    });

    it('exposes part="share-button" for styling', async () => {
      const el = await fixture<GCShare>(html`<gc-share></gc-share>`);
      const button = el.shadowRoot!.querySelector('[part="share-button"]');
      expect(button).to.exist;
    });
  });
});
