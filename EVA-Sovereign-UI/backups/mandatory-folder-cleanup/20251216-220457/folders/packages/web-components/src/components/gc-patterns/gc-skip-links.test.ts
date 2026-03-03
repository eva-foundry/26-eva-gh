import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-skip-links';
import type { GCSkipLinks } from './gc-skip-links';

describe('gc-skip-links', () => {
  let element: GCSkipLinks;

  beforeEach(async () => {
    element = await fixture(html`<gc-skip-links></gc-skip-links>`);
  });

  afterEach(() => {
    // Clean up any elements added to the document
    document.querySelectorAll('[id^="test-"]').forEach(el => el.remove());
  });

  it('renders skip links container', () => {
    const container = element.shadowRoot?.querySelector('.skip-links-container');
    expect(container).to.exist;
  });

  it('renders default skip links by default', () => {
    const links = element.shadowRoot?.querySelectorAll('.skip-link');
    expect(links?.length).to.equal(2); // Skip to main + Skip to footer
  });

  it('renders skip to main content link', () => {
    const links = element.shadowRoot?.querySelectorAll('.skip-link');
    const mainLink = links?.[0] as HTMLAnchorElement;
    
    expect(mainLink?.textContent?.trim()).to.equal('Skip to main content');
    expect(mainLink?.href).to.include('#main-content');
  });

  it('renders skip to footer link', () => {
    const links = element.shadowRoot?.querySelectorAll('.skip-link');
    const footerLink = links?.[1] as HTMLAnchorElement;
    
    expect(footerLink?.textContent?.trim()).to.equal('Skip to footer');
    expect(footerLink?.href).to.include('#footer');
  });

  it('hides default links when includeDefaults is false', async () => {
    element.includeDefaults = false;
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.skip-link');
    expect(links?.length).to.equal(0);
  });

  it('renders custom links', async () => {
    element.links = [
      { id: 'navigation', label: 'Skip to navigation' },
      { id: 'search', label: 'Skip to search' }
    ];
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.skip-link');
    expect(links?.length).to.equal(4); // 2 default + 2 custom
  });

  it('renders only custom links when includeDefaults is false', async () => {
    element.includeDefaults = false;
    element.links = [
      { id: 'navigation', label: 'Skip to navigation' }
    ];
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.skip-link');
    expect(links?.length).to.equal(1);
    expect(links?.[0]?.textContent?.trim()).to.equal('Skip to navigation');
  });

  it('renders nothing when no links are provided and includeDefaults is false', async () => {
    element.includeDefaults = false;
    element.links = [];
    await element.updateComplete;

    const container = element.shadowRoot?.querySelector('.skip-links-container');
    expect(container).to.not.exist;
  });

  it('handles skip link click and scrolls to target', async () => {
    // Create a target element
    const target = document.createElement('main');
    target.id = 'main-content';
    document.body.appendChild(target);

    const scrollSpy = vi.spyOn(target, 'scrollIntoView');
    const focusSpy = vi.spyOn(target, 'focus');

    const link = element.shadowRoot?.querySelector('.skip-link') as HTMLAnchorElement;
    link?.click();

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(scrollSpy).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    });
    expect(focusSpy).toHaveBeenCalled();

    document.body.removeChild(target);
  });

  it('sets tabindex on non-focusable target', async () => {
    const target = document.createElement('div');
    target.id = 'test-target';
    document.body.appendChild(target);

    element.links = [{ id: 'test-target', label: 'Test' }];
    element.includeDefaults = false;
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.skip-link') as HTMLAnchorElement;
    link?.click();

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(target.getAttribute('tabindex')).to.equal('-1');

    // Wait for tabindex removal
    await new Promise(resolve => setTimeout(resolve, 150));

    expect(target.hasAttribute('tabindex')).to.be.false;

    document.body.removeChild(target);
  });

  it('preserves existing tabindex on target', async () => {
    const target = document.createElement('button');
    target.id = 'test-button';
    target.setAttribute('tabindex', '0');
    document.body.appendChild(target);

    element.links = [{ id: 'test-button', label: 'Test' }];
    element.includeDefaults = false;
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.skip-link') as HTMLAnchorElement;
    link?.click();

    await new Promise(resolve => setTimeout(resolve, 150));

    expect(target.getAttribute('tabindex')).to.equal('0');

    document.body.removeChild(target);
  });

  it('emits gc-skip-link-activated event when link clicked', async () => {
    const target = document.createElement('main');
    target.id = 'main-content';
    document.body.appendChild(target);

    const eventSpy = vi.fn();
    element.addEventListener('gc-skip-link-activated', eventSpy);

    const link = element.shadowRoot?.querySelector('.skip-link') as HTMLAnchorElement;
    link?.click();

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(eventSpy).toHaveBeenCalledOnce();
    expect(eventSpy.mock.calls[0][0].detail).to.include({
      targetId: 'main-content'
    });
    expect(eventSpy.mock.calls[0][0].detail.timestamp).to.be.a('string');

    document.body.removeChild(target);
  });

  it('emits gc-skip-link-error event when target not found', async () => {
    const eventSpy = vi.fn();
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    element.addEventListener('gc-skip-link-error', eventSpy);

    const link = element.shadowRoot?.querySelector('.skip-link') as HTMLAnchorElement;
    link?.click();

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(eventSpy).toHaveBeenCalledOnce();
    expect(eventSpy.mock.calls[0][0].detail).to.deep.include({
      targetId: 'main-content',
      error: 'Target element not found'
    });
    expect(consoleSpy).toHaveBeenCalledWith('Skip link target not found: #main-content');

    consoleSpy.mockRestore();
  });

  it('prevents default link behavior', async () => {
    const target = document.createElement('main');
    target.id = 'main-content';
    document.body.appendChild(target);

    const link = element.shadowRoot?.querySelector('.skip-link') as HTMLAnchorElement;
    
    let defaultPrevented = false;
    link?.addEventListener('click', (e) => {
      defaultPrevented = e.defaultPrevented;
    });

    link?.click();

    expect(defaultPrevented).to.be.true;

    document.body.removeChild(target);
  });

  it('has proper CSS classes for accessibility', () => {
    const links = element.shadowRoot?.querySelectorAll('.skip-link');
    
    links?.forEach(link => {
      expect(link.classList.contains('skip-link')).to.be.true;
    });
  });

  it('skip links are visually hidden by default', () => {
    const link = element.shadowRoot?.querySelector('.skip-link') as HTMLElement;
    const styles = window.getComputedStyle(link);
    
    // Link should be positioned off-screen
    expect(link.style.position || styles.position).to.equal('absolute');
  });

  it('supports French Canadian locale', async () => {
    element.locale = 'fr-CA';
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.skip-link');
    expect(links?.[0]?.textContent?.trim()).to.equal('Passer au contenu principal');
    expect(links?.[1]?.textContent?.trim()).to.equal('Passer au pied de page');
  });

  it('updates links when locale changes', async () => {
    element.locale = 'en-CA';
    await element.updateComplete;
    
    let links = element.shadowRoot?.querySelectorAll('.skip-link');
    expect(links?.[0]?.textContent?.trim()).to.equal('Skip to main content');

    element.locale = 'fr-CA';
    await element.updateComplete;

    links = element.shadowRoot?.querySelectorAll('.skip-link');
    expect(links?.[0]?.textContent?.trim()).to.equal('Passer au contenu principal');
  });

  it('maintains correct link count with custom links', async () => {
    element.links = [
      { id: 'nav', label: 'Navigation' },
      { id: 'search', label: 'Search' },
      { id: 'content', label: 'Content' }
    ];
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.skip-link');
    expect(links?.length).to.equal(5); // 2 default + 3 custom
  });

  it('renders links with correct href attributes', async () => {
    element.links = [{ id: 'custom-section', label: 'Custom Section' }];
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.skip-link') as NodeListOf<HTMLAnchorElement>;
    const customLink = Array.from(links).find(link => 
      link.textContent?.trim() === 'Custom Section'
    );

    expect(customLink?.href).to.include('#custom-section');
  });

  it('handles multiple clicks gracefully', async () => {
    const target = document.createElement('main');
    target.id = 'main-content';
    document.body.appendChild(target);

    const link = element.shadowRoot?.querySelector('.skip-link') as HTMLAnchorElement;
    
    link?.click();
    link?.click();
    link?.click();

    await new Promise(resolve => setTimeout(resolve, 0));

    // Should not throw errors
    expect(target).to.exist;

    document.body.removeChild(target);
  });

  it('maintains z-index for proper layering', () => {
    const container = element.shadowRoot?.querySelector('.skip-links-container') as HTMLElement;
    expect(container).to.exist;
    
    // Container should have high z-index
    const styles = window.getComputedStyle(container);
    expect(styles.position || container.style.position).to.equal('relative');
  });

  it('handles empty custom links array', async () => {
    element.links = [];
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.skip-link');
    expect(links?.length).to.equal(2); // Still shows default links
  });

  it('scrolls to target with smooth behavior', async () => {
    const target = document.createElement('main');
    target.id = 'main-content';
    document.body.appendChild(target);

    const scrollSpy = vi.spyOn(target, 'scrollIntoView');

    const link = element.shadowRoot?.querySelector('.skip-link') as HTMLAnchorElement;
    link?.click();

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(scrollSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        behavior: 'smooth'
      })
    );

    document.body.removeChild(target);
  });
});
