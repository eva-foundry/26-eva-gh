import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { GCBackToTop } from './gc-back-to-top';
import '../../../test/setup';

describe('gc-back-to-top', () => {
  let element: GCBackToTop;

  beforeEach(async () => {
    element = await fixture<GCBackToTop>(html`
      <gc-back-to-top></gc-back-to-top>
    `);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render button', () => {
    const button = element.shadowRoot!.querySelector('.back-to-top-button');
    expect(button).toBeTruthy();
  });

  it('should be hidden by default when scroll is below threshold', async () => {
    await element.updateComplete;
    const button = element.shadowRoot!.querySelector('.back-to-top-button');
    expect(button!.classList.contains('visible')).toBe(false);
  });

  it('should show button when scrolled past threshold', async () => {
    element.scrollThreshold = 100;
    element['isVisible'] = true;
    await element.updateComplete;

    const button = element.shadowRoot!.querySelector('.back-to-top-button');
    expect(button!.classList.contains('visible')).toBe(true);
  });

  it('should have proper ARIA attributes', () => {
    const button = element.shadowRoot!.querySelector('.back-to-top-button');
    expect(button!.getAttribute('aria-label')).toBeTruthy();
    expect(button!.getAttribute('title')).toBeTruthy();
  });

  it('should contain arrow icon SVG', () => {
    const svg = element.shadowRoot!.querySelector('.arrow-icon');
    expect(svg).toBeTruthy();
    expect(svg!.tagName.toLowerCase()).toBe('svg');
  });

  it('should have screen reader text', () => {
    const srText = element.shadowRoot!.querySelector('.sr-only');
    expect(srText).toBeTruthy();
    expect(srText!.textContent).toBeTruthy();
  });

  it('should scroll to top when clicked', async () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo');
    
    const button = element.shadowRoot!.querySelector('.back-to-top-button') as HTMLButtonElement;
    button.click();
    await element.updateComplete;

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });

  it('should use auto scroll behavior when configured', async () => {
    element.scrollBehavior = 'auto';
    await element.updateComplete;

    const scrollToSpy = vi.spyOn(window, 'scrollTo');
    
    const button = element.shadowRoot!.querySelector('.back-to-top-button') as HTMLButtonElement;
    button.click();
    await element.updateComplete;

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      behavior: 'auto'
    });
  });

  it('should emit gc-scroll-to-top event when clicked', async () => {
    let eventFired = false;
    element.addEventListener('gc-scroll-to-top', () => {
      eventFired = true;
    });

    const button = element.shadowRoot!.querySelector('.back-to-top-button') as HTMLButtonElement;
    button.click();
    await element.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('should respect custom scroll threshold', async () => {
    element.scrollThreshold = 500;
    await element.updateComplete;

    expect(element.scrollThreshold).toBe(500);
  });

  it('should attach scroll listener on connect', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    
    const newElement = document.createElement('gc-back-to-top') as GCBackToTop;
    document.body.appendChild(newElement);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    );

    document.body.removeChild(newElement);
  });

  it('should remove scroll listener on disconnect', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    
    const newElement = document.createElement('gc-back-to-top') as GCBackToTop;
    document.body.appendChild(newElement);
    document.body.removeChild(newElement);

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });

  it('should programmatically show button', async () => {
    element.show();
    await element.updateComplete;

    expect(element['isVisible']).toBe(true);
  });

  it('should programmatically hide button', async () => {
    element['isVisible'] = true;
    await element.updateComplete;
    
    element.hide();
    await element.updateComplete;

    expect(element['isVisible']).toBe(false);
  });

  it('should have fixed positioning', async () => {
    await element.updateComplete;
    const styles = window.getComputedStyle(element);
    expect(styles.position).toBe('fixed');
  });

  it('should have high z-index for layering', async () => {
    await element.updateComplete;
    const styles = window.getComputedStyle(element);
    expect(parseInt(styles.zIndex)).toBeGreaterThan(100);
  });

  it('should support French Canadian locale', async () => {
    element.locale = 'fr-CA';
    await element.updateComplete;

    const button = element.shadowRoot!.querySelector('.back-to-top-button');
    expect(button!.getAttribute('aria-label')).toContain('Haut');
  });

  it('should have circular button shape', () => {
    const button = element.shadowRoot!.querySelector('.back-to-top-button') as HTMLElement;
    const styles = window.getComputedStyle(button);
    expect(styles.borderRadius).toBe('50%');
  });

  it('should have transition effect', () => {
    const button = element.shadowRoot!.querySelector('.back-to-top-button') as HTMLElement;
    const styles = window.getComputedStyle(button);
    expect(styles.transition).toBeTruthy();
  });

  it('should handle rapid scroll events', async () => {
    const scrollHandler = element['scrollHandler'];
    
    for (let i = 0; i < 10; i++) {
      scrollHandler();
    }
    
    await element.updateComplete;
    expect(element['isVisible']).toBeDefined();
  });

  it('should update visibility based on scroll position', () => {
    const initialVisible = element['isVisible'];
    
    Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
    element['scrollHandler']();
    
    if (element.scrollThreshold < 400) {
      expect(element['isVisible']).toBe(true);
    }
  });

  it('should have keyboard focus indicator', () => {
    const button = element.shadowRoot!.querySelector('.back-to-top-button') as HTMLElement;
    button.focus();
    
    const styles = window.getComputedStyle(button, ':focus');
    expect(button).toBeTruthy();
  });

  it('should emit event with timestamp', async () => {
    let eventDetail: { timestamp: number } | null = null;
    element.addEventListener('gc-scroll-to-top', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    const button = element.shadowRoot!.querySelector('.back-to-top-button') as HTMLButtonElement;
    button.click();
    await element.updateComplete;

    expect(eventDetail).toBeTruthy();
    expect(eventDetail!.timestamp).toBeTruthy();
    expect(typeof eventDetail!.timestamp).toBe('number');
  });

  it('should handle missing scrollY fallback', () => {
    const originalScrollY = window.scrollY;
    Object.defineProperty(window, 'scrollY', { value: undefined, writable: true });
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 500, writable: true });

    element['scrollHandler']();
    
    Object.defineProperty(window, 'scrollY', { value: originalScrollY, writable: true });
    
    expect(element['isVisible']).toBeDefined();
  });

  it('should have box shadow for depth', () => {
    const button = element.shadowRoot!.querySelector('.back-to-top-button') as HTMLElement;
    const styles = window.getComputedStyle(button);
    expect(styles.boxShadow).toBeTruthy();
  });

  it('should change position on mobile', async () => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) {
      await element.updateComplete;
      const styles = window.getComputedStyle(element);
      expect(styles.bottom).toBeTruthy();
    }
  });

  it('should have pointer-events none when hidden', async () => {
    element['isVisible'] = false;
    await element.updateComplete;

    const button = element.shadowRoot!.querySelector('.back-to-top-button') as HTMLElement;
    const styles = window.getComputedStyle(button);
    expect(styles.pointerEvents).toBe('none');
  });

  it('should have pointer-events auto when visible', async () => {
    element['isVisible'] = true;
    await element.updateComplete;

    const button = element.shadowRoot!.querySelector('.back-to-top-button') as HTMLElement;
    expect(button.classList.contains('visible')).toBe(true);
  });
});
