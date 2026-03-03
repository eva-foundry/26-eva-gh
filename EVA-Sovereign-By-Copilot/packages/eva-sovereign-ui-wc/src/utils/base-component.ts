/**
 * Base Web Component class
 * Provides common functionality for all EVA components
 */

import { i18n } from '../i18n/i18n-service';

export class EVABaseComponent extends HTMLElement {
  protected shadow: ShadowRoot;
  protected unsubscribeI18n?: () => void;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Subscribe to locale changes
    this.unsubscribeI18n = i18n.subscribe(() => {
      this.render();
    });
    
    this.render();
  }

  disconnectedCallback() {
    // Clean up subscriptions
    if (this.unsubscribeI18n) {
      this.unsubscribeI18n();
    }
  }

  /**
   * Override this method to provide component rendering
   */
  protected render(): void {
    // To be overridden by subclasses
  }

  /**
   * Translate a key using the i18n service
   */
  protected t(key: string, params?: Record<string, any>): string {
    return i18n.t(key, params);
  }

  /**
   * Get attribute with type safety
   */
  protected getAttr(name: string, defaultValue: string = ''): string {
    return this.getAttribute(name) || defaultValue;
  }

  /**
   * Get boolean attribute
   */
  protected getBoolAttr(name: string): boolean {
    return this.hasAttribute(name);
  }

  /**
   * Create styles element
   */
  protected createStyles(css: string): HTMLStyleElement {
    const style = document.createElement('style');
    style.textContent = css;
    return style;
  }

  /**
   * Emit custom event
   */
  protected emit(eventName: string, detail?: any): void {
    this.dispatchEvent(new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true,
    }));
  }
}
