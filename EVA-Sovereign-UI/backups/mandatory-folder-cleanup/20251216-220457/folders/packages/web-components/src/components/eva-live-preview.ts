import { html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { EVAElement } from './EVAElement.js';
import type { A11ySettings } from './eva-a11y-panel.js';

export interface PreviewMessage {
  type: 'a11y-update' | 'theme-update' | 'i18n-update' | 'config-update';
  data: any;
}

/**
 * EVA Live Preview Component
 * Iframe-based live preview with postMessage communication
 * Updates UI in real-time without page reload (<100ms latency)
 * 
 * @element eva-live-preview
 * 
 * @fires preview-ready - Fires when iframe is loaded and ready
 * @fires preview-error - Fires when iframe fails to load
 * @fires preview-message - Fires when message is received from iframe
 * 
 * @example
 * ```html
 * <eva-live-preview
 *   src="/preview"
 *   @preview-ready="${() => console.log('Preview ready')}"
 * ></eva-live-preview>
 * ```
 */
@customElement('eva-live-preview')
export class EVALivePreview extends EVAElement {
  protected override componentName = 'eva-live-preview';

  /**
   * Preview page URL (iframe src)
   */
  @property({ type: String })
  src = '';

  /**
   * Iframe title for accessibility
   */
  @property({ type: String })
  iframeTitle = '';

  /**
   * Whether to show loading indicator
   */
  @property({ type: Boolean })
  showLoading = true;

  /**
   * Custom target origin for postMessage (default: same origin)
   */
  @property({ type: String })
  targetOrigin = window.location.origin;

  /**
   * Whether to automatically sync a11y events
   */
  @property({ type: Boolean })
  syncA11y = true;

  /**
   * Whether to automatically sync theme events
   */
  @property({ type: Boolean })
  syncTheme = true;

  /**
   * Whether to automatically sync i18n events
   */
  @property({ type: Boolean })
  syncI18n = true;

  @state()
  private _loading = true;

  @state()
  private _error = false;

  @query('iframe')
  private _iframe?: HTMLIFrameElement;

  private _messageListeners: Map<string, Set<(data: any) => void>> = new Map();

  static override styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #f9f9f9;
      border-radius: 0.5rem;
      overflow: hidden;
      border: 1px solid #e5e5e5;
    }

    .preview-container {
      width: 100%;
      height: 100%;
      position: relative;
    }

    iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
      background-color: #ffffff;
    }

    /* Loading overlay */
    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.95);
      z-index: 10;
      animation: fadeIn 200ms ease-in-out;
    }

    .loading-overlay.hidden {
      display: none;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .loading-spinner {
      width: 48px;
      height: 48px;
      border: 4px solid #e5e5e5;
      border-top-color: #284162;
      border-radius: 50%;
      animation: spin 800ms linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .loading-text {
      margin-top: 1rem;
      color: #666666;
      font-size: 0.9375rem;
    }

    /* Error state */
    .error-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      padding: 2rem;
      text-align: center;
    }

    .error-icon {
      width: 64px;
      height: 64px;
      color: #d32f2f;
      margin-bottom: 1rem;
    }

    .error-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #26374A;
      margin: 0 0 0.5rem 0;
    }

    .error-message {
      color: #666666;
      font-size: 0.9375rem;
      line-height: 1.6;
      max-width: 400px;
    }

    .error-retry {
      margin-top: 1.5rem;
      padding: 0.75rem 1.5rem;
      background-color: #284162;
      color: #ffffff;
      border: none;
      border-radius: 0.25rem;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 200ms ease-in-out;
      min-height: 44px;
    }

    .error-retry:hover {
      background-color: #1c2d46;
    }

    .error-retry:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    /* Preview header */
    .preview-header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background-color: #26374A;
      color: #ffffff;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 5;
      border-bottom: 2px solid #1C578A;
    }

    .preview-badge {
      background-color: rgba(255, 255, 255, 0.2);
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .preview-iframe-container {
      width: 100%;
      height: 100%;
    }

    :host([show-header]) .preview-iframe-container {
      padding-top: 40px;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    this._setupEventListeners();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupEventListeners();
  }

  override render() {
    const title = this.iframeTitle || this.t('iframe.title', 'Live preview');

    return html`
      <div class="preview-container">
        ${this._error ? this.renderError() : this.renderPreview(title)}
        ${this._loading && this.showLoading && !this._error ? this.renderLoading() : ''}
      </div>
    `;
  }

  private renderPreview(title: string) {
    return html`
      <div class="preview-iframe-container">
        <iframe
          src="${this.src}"
          title="${title}"
          @load="${this._handleIframeLoad}"
          @error="${this._handleIframeError}"
          sandbox="allow-scripts allow-same-origin allow-forms"
        ></iframe>
      </div>
    `;
  }

  private renderLoading() {
    return html`
      <div class="loading-overlay">
        <div class="loading-spinner" role="status"></div>
        <div class="loading-text">
          ${this.t('loading.text', 'Loading preview...')}
        </div>
      </div>
    `;
  }

  private renderError() {
    return html`
      <div class="error-overlay">
        <svg
          class="error-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        
        <h3 class="error-title">
          ${this.t('error.title', 'Preview Failed to Load')}
        </h3>
        
        <p class="error-message">
          ${this.t('error.message', 'The preview could not be loaded. Please check the preview URL and try again.')}
        </p>
        
        <button class="error-retry" @click="${this._handleRetry}">
          ${this.t('error.retry', 'Retry')}
        </button>
      </div>
    `;
  }

  private _handleIframeLoad() {
    this._loading = false;
    this._error = false;
    
    this.dispatchEvent(
      new CustomEvent('preview-ready', {
        detail: { src: this.src },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleIframeError() {
    this._loading = false;
    this._error = true;
    
    this.dispatchEvent(
      new CustomEvent('preview-error', {
        detail: { src: this.src },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleRetry() {
    this._error = false;
    this._loading = true;
    
    // Force iframe reload
    if (this._iframe) {
      this._iframe.src = this.src;
    }
  }

  private _setupEventListeners() {
    if (this.syncA11y) {
      window.addEventListener('a11y-change', this._handleA11yChange as EventListener);
    }
    
    if (this.syncTheme) {
      window.addEventListener('theme-change', this._handleThemeChange as EventListener);
    }
    
    if (this.syncI18n) {
      window.addEventListener('i18n-change', this._handleI18nChange as EventListener);
    }

    // Listen for messages from iframe
    window.addEventListener('message', this._handleMessage);
  }

  private _cleanupEventListeners() {
    window.removeEventListener('a11y-change', this._handleA11yChange as EventListener);
    window.removeEventListener('theme-change', this._handleThemeChange as EventListener);
    window.removeEventListener('i18n-change', this._handleI18nChange as EventListener);
    window.removeEventListener('message', this._handleMessage);
  }

  private _handleA11yChange = (e: CustomEvent) => {
    this.sendMessage({
      type: 'a11y-update',
      data: e.detail,
    });
  };

  private _handleThemeChange = (e: CustomEvent) => {
    this.sendMessage({
      type: 'theme-update',
      data: e.detail,
    });
  };

  private _handleI18nChange = (e: CustomEvent) => {
    this.sendMessage({
      type: 'i18n-update',
      data: e.detail,
    });
  };

  private _handleMessage = (e: MessageEvent) => {
    // Verify origin for security
    if (this.targetOrigin !== '*' && e.origin !== this.targetOrigin) {
      console.warn('Received message from untrusted origin:', e.origin);
      return;
    }

    try {
      const message = e.data as PreviewMessage;
      
      // Emit event for parent to handle
      this.dispatchEvent(
        new CustomEvent('preview-message', {
          detail: message,
          bubbles: true,
          composed: true,
        })
      );

      // Call registered listeners
      const listeners = this._messageListeners.get(message.type);
      if (listeners) {
        listeners.forEach(callback => callback(message.data));
      }
    } catch (error) {
      console.warn('Failed to process preview message:', error);
    }
  };

  /**
   * Send message to iframe
   */
  public sendMessage(message: PreviewMessage) {
    if (!this._iframe || !this._iframe.contentWindow) {
      console.warn('Iframe not ready, cannot send message');
      return;
    }

    try {
      this._iframe.contentWindow.postMessage(message, this.targetOrigin);
    } catch (error) {
      console.error('Failed to send message to preview:', error);
    }
  }

  /**
   * Register listener for specific message type
   */
  public onMessage(type: string, callback: (data: any) => void) {
    if (!this._messageListeners.has(type)) {
      this._messageListeners.set(type, new Set());
    }
    
    this._messageListeners.get(type)!.add(callback);
  }

  /**
   * Unregister listener for specific message type
   */
  public offMessage(type: string, callback: (data: any) => void) {
    const listeners = this._messageListeners.get(type);
    if (listeners) {
      listeners.delete(callback);
    }
  }

  /**
   * Update accessibility settings in preview
   */
  public updateA11y(settings: Partial<A11ySettings>) {
    this.sendMessage({
      type: 'a11y-update',
      data: settings,
    });
  }

  /**
   * Update theme in preview
   */
  public updateTheme(theme: Record<string, any>) {
    this.sendMessage({
      type: 'theme-update',
      data: theme,
    });
  }

  /**
   * Update i18n in preview
   */
  public updateI18n(translations: Record<string, any>) {
    this.sendMessage({
      type: 'i18n-update',
      data: translations,
    });
  }

  /**
   * Send full configuration update
   */
  public updateConfig(config: Record<string, any>) {
    this.sendMessage({
      type: 'config-update',
      data: config,
    });
  }

  /**
   * Reload preview iframe
   */
  public reload() {
    if (this._iframe) {
      this._loading = true;
      this._error = false;
      this._iframe.src = this.src;
    }
  }

  /**
   * Get translated message
   */
  private t(key: string, defaultValue: string): string {
    return this.getMessage(`${this.componentName}.${key}`, defaultValue);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eva-live-preview': EVALivePreview;
  }
}
