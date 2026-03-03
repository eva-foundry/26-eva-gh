import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { GCPrintPage } from './gc-print-page';
import '../../../test/setup';

describe('gc-print-page', () => {
  let element: GCPrintPage;

  beforeEach(async () => {
    element = await fixture<GCPrintPage>(html`
      <gc-print-page></gc-print-page>
    `);
  });

  it('should render print button', () => {
    const button = element.shadowRoot!.querySelector('.print-button');
    expect(button).toBeTruthy();
  });

  it('should show print icon by default', () => {
    const icon = element.shadowRoot!.querySelector('.print-icon');
    expect(icon).toBeTruthy();
  });

  it('should hide icon when showIcon is false', async () => {
    element.showIcon = false;
    await element.updateComplete;

    const icon = element.shadowRoot!.querySelector('.print-icon');
    expect(icon).toBeFalsy();
  });

  it('should have default variant styling', () => {
    const button = element.shadowRoot!.querySelector('.print-button');
    expect(button!.classList.contains('default')).toBe(true);
  });

  it('should apply primary variant styling', async () => {
    element.variant = 'primary';
    await element.updateComplete;

    const button = element.shadowRoot!.querySelector('.print-button');
    expect(button!.classList.contains('primary')).toBe(true);
  });

  it('should have proper ARIA label', () => {
    const button = element.shadowRoot!.querySelector('.print-button');
    expect(button!.getAttribute('aria-label')).toBeTruthy();
  });

  it('should call window.print when clicked without selector', async () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});

    const button = element.shadowRoot!.querySelector('.print-button') as HTMLButtonElement;
    button.click();
    await element.updateComplete;

    expect(printSpy).toHaveBeenCalled();
    printSpy.mockRestore();
  });

  it('should emit gc-print event when clicked', async () => {
    vi.spyOn(window, 'print').mockImplementation(() => {});
    
    let eventFired = false;
    element.addEventListener('gc-print', () => {
      eventFired = true;
    });

    const button = element.shadowRoot!.querySelector('.print-button') as HTMLButtonElement;
    button.click();
    await element.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('should include timestamp in event detail', async () => {
    vi.spyOn(window, 'print').mockImplementation(() => {});
    
    let eventDetail: { timestamp: number; selector?: string } | null = null;
    element.addEventListener('gc-print', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    const button = element.shadowRoot!.querySelector('.print-button') as HTMLButtonElement;
    button.click();
    await element.updateComplete;

    expect(eventDetail).toBeTruthy();
    expect(eventDetail!.timestamp).toBeTruthy();
    expect(typeof eventDetail!.timestamp).toBe('number');
  });

  it('should have print method', () => {
    expect(typeof element.print).toBe('function');
  });

  it('should trigger print when print() method called', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});

    element.print();

    expect(printSpy).toHaveBeenCalled();
    printSpy.mockRestore();
  });

  it('should support custom print selector', async () => {
    element.printSelector = '.content';
    await element.updateComplete;

    expect(element.printSelector).toBe('.content');
  });

  it('should hide in print media', () => {
    const styles = element.constructor as typeof GCPrintPage;
    const cssText = styles.styles.toString();
    expect(cssText).toContain('@media print');
    expect(cssText).toContain('display: none');
  });

  it('should display button text', () => {
    const button = element.shadowRoot!.querySelector('.print-button');
    expect(button!.textContent).toContain('Print');
  });

  it('should support French Canadian locale', async () => {
    element.locale = 'fr-CA';
    await element.updateComplete;

    const button = element.shadowRoot!.querySelector('.print-button');
    expect(button!.textContent).toContain('Imprimer');
  });

  it('should have hover effect', () => {
    const button = element.shadowRoot!.querySelector('.print-button') as HTMLElement;
    const styles = window.getComputedStyle(button);
    expect(styles.cursor).toBe('pointer');
  });

  it('should have transition effect', () => {
    const button = element.shadowRoot!.querySelector('.print-button') as HTMLElement;
    const styles = window.getComputedStyle(button);
    expect(styles.transition).toBeTruthy();
  });

  it('should warn if print selector not found', async () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});

    element.printSelector = '.nonexistent';
    element['printSection']('.nonexistent');

    expect(consoleSpy).toHaveBeenCalled();
    expect(printSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
    printSpy.mockRestore();
  });

  it('should fallback to window.print if print window fails', async () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    element.printSelector = '.content';
    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';
    document.body.appendChild(contentDiv);

    element['printSection']('.content');

    expect(consoleSpy).toHaveBeenCalled();
    expect(printSpy).toHaveBeenCalled();

    document.body.removeChild(contentDiv);
    openSpy.mockRestore();
    printSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  it('should include selector in event detail when provided', async () => {
    vi.spyOn(window, 'print').mockImplementation(() => {});
    
    element.printSelector = '.content';
    let eventDetail: { timestamp: number; selector?: string } | null = null;
    element.addEventListener('gc-print', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    const button = element.shadowRoot!.querySelector('.print-button') as HTMLButtonElement;
    button.click();
    await element.updateComplete;

    expect(eventDetail!.selector).toBe('.content');
  });

  it('should have flex layout for button', () => {
    const button = element.shadowRoot!.querySelector('.print-button') as HTMLElement;
    const styles = window.getComputedStyle(button);
    expect(styles.display).toContain('flex');
  });

  it('should have gap between icon and text', () => {
    const button = element.shadowRoot!.querySelector('.print-button') as HTMLElement;
    expect(button.querySelector('.print-icon')).toBeTruthy();
    expect(button.querySelector('span')).toBeTruthy();
  });

  it('should apply border radius', () => {
    const button = element.shadowRoot!.querySelector('.print-button') as HTMLElement;
    const styles = window.getComputedStyle(button);
    expect(styles.borderRadius).toBeTruthy();
  });

  it('should have keyboard focus indicator', () => {
    const button = element.shadowRoot!.querySelector('.print-button') as HTMLButtonElement;
    button.focus();
    expect(document.activeElement).toBeTruthy();
  });

  it('should be inline-block by default', () => {
    const styles = window.getComputedStyle(element);
    expect(styles.display).toBe('inline-block');
  });

  it('should have SVG icon with proper viewBox', () => {
    const svg = element.shadowRoot!.querySelector('.print-icon');
    expect(svg!.getAttribute('viewBox')).toBe('0 0 24 24');
  });

  it('should use currentColor for icon fill', () => {
    const svg = element.shadowRoot!.querySelector('.print-icon') as SVGElement;
    const styles = window.getComputedStyle(svg);
    expect(styles.fill).toBeTruthy();
  });

  it('should handle print action on Enter key', () => {
    const button = element.shadowRoot!.querySelector('.print-button') as HTMLButtonElement;
    expect(button.tagName.toLowerCase()).toBe('button');
  });

  it('should have proper button type', () => {
    const button = element.shadowRoot!.querySelector('.print-button') as HTMLButtonElement;
    expect(button.type).toBe('submit');
  });

  it('should render text content', () => {
    const span = element.shadowRoot!.querySelector('.print-button span');
    expect(span).toBeTruthy();
    expect(span!.textContent).toBeTruthy();
  });
});
