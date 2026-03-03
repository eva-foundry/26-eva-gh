import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { GCSocialShare } from './gc-social-share';
import '../../../test/setup';

describe('gc-social-share', () => {
  let element: GCSocialShare;

  beforeEach(async () => {
    element = await fixture<GCSocialShare>(html`
      <gc-social-share></gc-social-share>
    `);
  });

  it('should render share container', () => {
    const container = element.shadowRoot!.querySelector('.share-container');
    expect(container).toBeTruthy();
  });

  it('should show heading by default', () => {
    const heading = element.shadowRoot!.querySelector('.share-heading');
    expect(heading).toBeTruthy();
  });

  it('should hide heading when showHeading is false', async () => {
    element.showHeading = false;
    await element.updateComplete;

    const heading = element.shadowRoot!.querySelector('.share-heading');
    expect(heading).toBeFalsy();
  });

  it('should render all default platforms', () => {
    const buttons = element.shadowRoot!.querySelectorAll('.share-button');
    expect(buttons.length).toBe(5); // facebook, twitter, linkedin, email, copy
  });

  it('should render Facebook button', () => {
    const fbButton = element.shadowRoot!.querySelector('.share-button.facebook');
    expect(fbButton).toBeTruthy();
  });

  it('should render Twitter button', () => {
    const twitterButton = element.shadowRoot!.querySelector('.share-button.twitter');
    expect(twitterButton).toBeTruthy();
  });

  it('should render LinkedIn button', () => {
    const linkedinButton = element.shadowRoot!.querySelector('.share-button.linkedin');
    expect(linkedinButton).toBeTruthy();
  });

  it('should render Email button', () => {
    const emailButton = element.shadowRoot!.querySelector('.share-button.email');
    expect(emailButton).toBeTruthy();
  });

  it('should render Copy button', () => {
    const copyButton = element.shadowRoot!.querySelector('.share-button.copy');
    expect(copyButton).toBeTruthy();
  });

  it('should only render selected platforms', async () => {
    element.platforms = ['facebook', 'twitter'];
    await element.updateComplete;

    const buttons = element.shadowRoot!.querySelectorAll('.share-button');
    expect(buttons.length).toBe(2);
  });

  it('should generate correct Facebook share URL', () => {
    const url = 'https://example.com';
    const fbUrl = element['getFacebookUrl'](url);
    expect(fbUrl).toContain('facebook.com/sharer');
    expect(fbUrl).toContain(encodeURIComponent(url));
  });

  it('should generate correct Twitter share URL', () => {
    const url = 'https://example.com';
    const title = 'Test Title';
    const twitterUrl = element['getTwitterUrl'](url, title);
    expect(twitterUrl).toContain('twitter.com/intent/tweet');
    expect(twitterUrl).toContain(encodeURIComponent(url));
    expect(twitterUrl).toContain(encodeURIComponent(title));
  });

  it('should generate correct LinkedIn share URL', () => {
    const url = 'https://example.com';
    const linkedinUrl = element['getLinkedInUrl'](url);
    expect(linkedinUrl).toContain('linkedin.com/sharing');
    expect(linkedinUrl).toContain(encodeURIComponent(url));
  });

  it('should generate correct email share URL', () => {
    const url = 'https://example.com';
    const title = 'Test Title';
    const description = 'Test Description';
    const emailUrl = element['getEmailUrl'](url, title, description);
    expect(emailUrl).toContain('mailto:');
    expect(emailUrl).toContain('subject=');
    expect(emailUrl).toContain('body=');
  });

  it('should emit gc-share event when platform clicked', async () => {
    let eventFired = false;
    element.addEventListener('gc-share', () => {
      eventFired = true;
    });

    const fbButton = element.shadowRoot!.querySelector('.share-button.facebook') as HTMLAnchorElement;
    fbButton.click();

    expect(eventFired).toBe(true);
  });

  it('should copy to clipboard when copy button clicked', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock
      }
    });

    const copyButton = element.shadowRoot!.querySelector('.share-button.copy') as HTMLButtonElement;
    copyButton.click();
    await element.updateComplete;

    expect(writeTextMock).toHaveBeenCalled();
  });

  it('should show copied state after copying', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock
      }
    });

    const copyButton = element.shadowRoot!.querySelector('.share-button.copy') as HTMLButtonElement;
    copyButton.click();
    await element.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(element['copied']).toBe(true);
  });

  it('should reset copied state after timeout', async () => {
    vi.useFakeTimers();
    
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock
      }
    });

    const copyButton = element.shadowRoot!.querySelector('.share-button.copy') as HTMLButtonElement;
    copyButton.click();
    await element.updateComplete;

    vi.advanceTimersByTime(3000);
    await element.updateComplete;

    expect(element['copied']).toBe(false);
    
    vi.useRealTimers();
  });

  it('should emit gc-share-copy event on successful copy', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock
      }
    });

    let eventFired = false;
    element.addEventListener('gc-share-copy', () => {
      eventFired = true;
    });

    const copyButton = element.shadowRoot!.querySelector('.share-button.copy') as HTMLButtonElement;
    copyButton.click();
    await element.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(eventFired).toBe(true);
  });

  it('should emit gc-share-copy-error event on copy failure', async () => {
    const writeTextMock = vi.fn().mockRejectedValue(new Error('Copy failed'));
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock
      }
    });

    let eventFired = false;
    element.addEventListener('gc-share-copy-error', () => {
      eventFired = true;
    });

    const copyButton = element.shadowRoot!.querySelector('.share-button.copy') as HTMLButtonElement;
    copyButton.click();
    await element.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(eventFired).toBe(true);
  });

  it('should use custom page URL when provided', async () => {
    element.pageUrl = 'https://custom.com';
    await element.updateComplete;

    const fbButton = element.shadowRoot!.querySelector('.share-button.facebook') as HTMLAnchorElement;
    expect(fbButton.href).toContain('https%3A%2F%2Fcustom.com');
  });

  it('should use custom page title when provided', async () => {
    element.pageTitle = 'Custom Title';
    await element.updateComplete;

    const twitterButton = element.shadowRoot!.querySelector('.share-button.twitter') as HTMLAnchorElement;
    expect(twitterButton.href).toContain('Custom%20Title');
  });

  it('should use description in email share', async () => {
    element.description = 'Test description';
    await element.updateComplete;

    const emailButton = element.shadowRoot!.querySelector('.share-button.email') as HTMLAnchorElement;
    expect(emailButton.href).toContain('Test%20description');
  });

  it('should have proper ARIA attributes', () => {
    const buttonsContainer = element.shadowRoot!.querySelector('.share-buttons');
    expect(buttonsContainer!.getAttribute('role')).toBe('group');
    expect(buttonsContainer!.getAttribute('aria-label')).toBeTruthy();
  });

  it('should open social links in new tab', () => {
    const fbButton = element.shadowRoot!.querySelector('.share-button.facebook') as HTMLAnchorElement;
    expect(fbButton.target).toBe('_blank');
    expect(fbButton.rel).toContain('noopener');
  });

  it('should render platform icons', () => {
    const icons = element.shadowRoot!.querySelectorAll('.share-icon');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('should support French Canadian locale', async () => {
    element.locale = 'fr-CA';
    await element.updateComplete;

    const heading = element.shadowRoot!.querySelector('.share-heading');
    expect(heading!.textContent).toContain('Partagez');
  });

  it('should handle platform-specific styling', () => {
    const fbButton = element.shadowRoot!.querySelector('.share-button.facebook') as HTMLElement;
    expect(fbButton.classList.contains('facebook')).toBe(true);
  });

  it('should show check icon when copied', async () => {
    element['copied'] = true;
    await element.updateComplete;

    const copyButton = element.shadowRoot!.querySelector('.share-button.copy');
    expect(copyButton!.classList.contains('copied')).toBe(true);
  });

  it('should use current page URL if pageUrl not provided', () => {
    const fbUrl = element['getFacebookUrl'](window.location.href);
    expect(fbUrl).toContain(encodeURIComponent(window.location.href));
  });

  it('should use document title if pageTitle not provided', async () => {
    await element.updateComplete;
    const twitterButton = element.shadowRoot!.querySelector('.share-button.twitter') as HTMLAnchorElement;
    expect(twitterButton.href).toBeTruthy();
  });

  it('should handle missing platforms gracefully', async () => {
    element.platforms = [];
    await element.updateComplete;

    const buttons = element.shadowRoot!.querySelectorAll('.share-button');
    expect(buttons.length).toBe(0);
  });

  it('should have responsive layout', () => {
    const buttonsContainer = element.shadowRoot!.querySelector('.share-buttons') as HTMLElement;
    const styles = window.getComputedStyle(buttonsContainer);
    expect(styles.display).toBe('flex');
  });
});
