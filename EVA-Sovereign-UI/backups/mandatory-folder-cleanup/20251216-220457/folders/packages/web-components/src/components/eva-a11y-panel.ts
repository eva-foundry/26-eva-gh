import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from './EVAElement.js';

export interface A11ySettings {
  fontSize: number; // 75-200%
  contrast: 'aa' | 'aaa';
  animations: 'on' | 'off' | 'reduced';
  lineHeight: number; // 1.0-2.0
  letterSpacing: number; // 0-0.5em
}

export interface A11yChangeEvent {
  settings: A11ySettings;
  changes: Partial<A11ySettings>;
}

/**
 * EVA Accessibility Panel Component
 * Real-time accessibility customization panel
 * WCAG 2.2 AAA compliant with live preview updates
 * 
 * @element eva-a11y-panel
 * 
 * @fires a11y-change - Fires when any accessibility setting changes
 * @fires a11y-apply - Fires when user clicks Apply button
 * @fires a11y-reset - Fires when user clicks Reset button
 * 
 * @example
 * ```html
 * <eva-a11y-panel
 *   @a11y-change="${(e) => updatePreview(e.detail)}"
 * ></eva-a11y-panel>
 * ```
 */
@customElement('eva-a11y-panel')
export class EVAA11yPanel extends EVAElement {
  protected override componentName = 'eva-a11y-panel';

  /**
   * Whether to show Apply/Reset buttons
   */
  @property({ type: Boolean })
  showActions = true;

  /**
   * Whether changes apply immediately (vs. on Apply click)
   */
  @property({ type: Boolean })
  immediate = true;

  /**
   * Storage key for localStorage persistence
   */
  @property({ type: String })
  storageKey = 'gc-a11y-settings';

  @state()
  private _fontSize = 100;

  @state()
  private _contrast: 'aa' | 'aaa' = 'aa';

  @state()
  private _animations: 'on' | 'off' | 'reduced' = 'on';

  @state()
  private _lineHeight = 1.5;

  @state()
  private _letterSpacing = 0;

  @state()
  private _hasChanges = false;

  private readonly DEFAULT_SETTINGS: A11ySettings = {
    fontSize: 100,
    contrast: 'aa',
    animations: 'on',
    lineHeight: 1.5,
    letterSpacing: 0,
  };

  static override styles = css`
    :host {
      display: block;
    }

    .a11y-panel {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .panel-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .section-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: #26374A;
      margin: 0;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e5e5e5;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .control-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
      color: #333333;
      font-size: 0.9375rem;
    }

    .control-value {
      color: #666666;
      font-size: 0.875rem;
      min-width: 60px;
      text-align: right;
    }

    /* Range slider */
    .slider {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 8px;
      border-radius: 4px;
      background: #e5e5e5;
      outline: none;
      transition: background 200ms ease-in-out;
    }

    .slider:hover {
      background: #d5d5d5;
    }

    .slider:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #284162;
      cursor: pointer;
      transition: background 200ms ease-in-out;
    }

    .slider::-moz-range-thumb {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #284162;
      cursor: pointer;
      border: none;
      transition: background 200ms ease-in-out;
    }

    .slider:hover::-webkit-slider-thumb,
    .slider:hover::-moz-range-thumb {
      background: #1c2d46;
    }

    /* Radio group */
    .radio-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .radio-option {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      cursor: pointer;
    }

    .radio-input {
      margin-top: 0.25rem;
      width: 20px;
      height: 20px;
      cursor: pointer;
      accent-color: #284162;
    }

    .radio-input:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    .radio-label {
      flex: 1;
      cursor: pointer;
    }

    .radio-label-text {
      display: block;
      font-weight: 600;
      color: #333333;
      margin-bottom: 0.25rem;
    }

    .radio-description {
      display: block;
      font-size: 0.875rem;
      color: #666666;
      line-height: 1.4;
    }

    /* Action buttons */
    .panel-actions {
      display: flex;
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e5e5e5;
    }

    .action-button {
      flex: 1;
      padding: 0.75rem 1rem;
      border-radius: 0.25rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 200ms ease-in-out;
      border: 2px solid;
      min-height: 44px;
    }

    .action-button:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    .button-primary {
      background-color: #284162;
      color: #ffffff;
      border-color: #284162;
    }

    .button-primary:hover:not(:disabled) {
      background-color: #1c2d46;
      border-color: #1c2d46;
    }

    .button-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .button-secondary {
      background-color: transparent;
      color: #284162;
      border-color: #284162;
    }

    .button-secondary:hover:not(:disabled) {
      background-color: #f0f7fb;
    }

    /* Info box */
    .info-box {
      background-color: #f0f7fb;
      border-left: 4px solid #1C578A;
      padding: 1rem;
      margin-top: 0.5rem;
      font-size: 0.875rem;
      line-height: 1.6;
      color: #284162;
    }

    .info-box strong {
      display: block;
      margin-bottom: 0.25rem;
      font-weight: 700;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    this._loadSettings();
  }

  override render() {
    return html`
      <div class="a11y-panel">
        ${this.renderFontSizeSection()}
        ${this.renderContrastSection()}
        ${this.renderAnimationsSection()}
        ${this.renderTextSpacingSection()}
        ${this.showActions ? this.renderActions() : ''}
      </div>
    `;
  }

  private renderFontSizeSection() {
    return html`
      <section class="panel-section">
        <h3 class="section-title">
          ${this.t('fontSize.title', 'Font Size')}
        </h3>
        
        <div class="control-group">
          <label class="control-label">
            <span>${this.t('fontSize.label', 'Text size')}</span>
            <span class="control-value">${this._fontSize}%</span>
          </label>
          
          <input
            type="range"
            class="slider"
            min="75"
            max="200"
            step="25"
            .value="${String(this._fontSize)}"
            @input="${this._handleFontSizeChange}"
            aria-label="${this.t('fontSize.ariaLabel', 'Adjust font size')}"
            aria-valuemin="75"
            aria-valuemax="200"
            aria-valuenow="${this._fontSize}"
            aria-valuetext="${this._fontSize} percent"
          />
          
          <div class="info-box">
            <strong>${this.t('fontSize.info.title', 'Recommended sizes:')}</strong>
            ${this.t('fontSize.info.text', '75% (Compact), 100% (Standard), 125% (Large), 150% (Extra Large), 200% (Maximum)')}
          </div>
        </div>
      </section>
    `;
  }

  private renderContrastSection() {
    return html`
      <section class="panel-section">
        <h3 class="section-title">
          ${this.t('contrast.title', 'Contrast Mode')}
        </h3>
        
        <div class="radio-group" role="radiogroup" aria-label="${this.t('contrast.ariaLabel', 'Select contrast mode')}">
          <label class="radio-option">
            <input
              type="radio"
              class="radio-input"
              name="contrast"
              value="aa"
              .checked="${this._contrast === 'aa'}"
              @change="${this._handleContrastChange}"
            />
            <span class="radio-label">
              <span class="radio-label-text">${this.t('contrast.aa.title', 'Standard Contrast (AA)')}</span>
              <span class="radio-description">${this.t('contrast.aa.description', 'Minimum contrast ratio of 4.5:1 for normal text (WCAG 2.1 AA)')}</span>
            </span>
          </label>
          
          <label class="radio-option">
            <input
              type="radio"
              class="radio-input"
              name="contrast"
              value="aaa"
              .checked="${this._contrast === 'aaa'}"
              @change="${this._handleContrastChange}"
            />
            <span class="radio-label">
              <span class="radio-label-text">${this.t('contrast.aaa.title', 'High Contrast (AAA)')}</span>
              <span class="radio-description">${this.t('contrast.aaa.description', 'Enhanced contrast ratio of 7:1 for normal text (WCAG 2.1 AAA)')}</span>
            </span>
          </label>
        </div>
      </section>
    `;
  }

  private renderAnimationsSection() {
    return html`
      <section class="panel-section">
        <h3 class="section-title">
          ${this.t('animations.title', 'Motion & Animations')}
        </h3>
        
        <div class="radio-group" role="radiogroup" aria-label="${this.t('animations.ariaLabel', 'Select animation preference')}">
          <label class="radio-option">
            <input
              type="radio"
              class="radio-input"
              name="animations"
              value="on"
              .checked="${this._animations === 'on'}"
              @change="${this._handleAnimationsChange}"
            />
            <span class="radio-label">
              <span class="radio-label-text">${this.t('animations.on.title', 'All Animations')}</span>
              <span class="radio-description">${this.t('animations.on.description', 'Show all transitions and animations (default)')}</span>
            </span>
          </label>
          
          <label class="radio-option">
            <input
              type="radio"
              class="radio-input"
              name="animations"
              value="reduced"
              .checked="${this._animations === 'reduced'}"
              @change="${this._handleAnimationsChange}"
            />
            <span class="radio-label">
              <span class="radio-label-text">${this.t('animations.reduced.title', 'Reduced Motion')}</span>
              <span class="radio-description">${this.t('animations.reduced.description', 'Minimize animations and transitions (recommended for vestibular disorders)')}</span>
            </span>
          </label>
          
          <label class="radio-option">
            <input
              type="radio"
              class="radio-input"
              name="animations"
              value="off"
              .checked="${this._animations === 'off'}"
              @change="${this._handleAnimationsChange}"
            />
            <span class="radio-label">
              <span class="radio-label-text">${this.t('animations.off.title', 'No Animations')}</span>
              <span class="radio-description">${this.t('animations.off.description', 'Disable all animations completely (instant transitions)')}</span>
            </span>
          </label>
        </div>
      </section>
    `;
  }

  private renderTextSpacingSection() {
    return html`
      <section class="panel-section">
        <h3 class="section-title">
          ${this.t('spacing.title', 'Text Spacing')}
        </h3>
        
        <div class="control-group">
          <label class="control-label">
            <span>${this.t('spacing.lineHeight.label', 'Line height')}</span>
            <span class="control-value">${this._lineHeight.toFixed(1)}</span>
          </label>
          
          <input
            type="range"
            class="slider"
            min="1.0"
            max="2.0"
            step="0.1"
            .value="${String(this._lineHeight)}"
            @input="${this._handleLineHeightChange}"
            aria-label="${this.t('spacing.lineHeight.ariaLabel', 'Adjust line height')}"
          />
        </div>
        
        <div class="control-group">
          <label class="control-label">
            <span>${this.t('spacing.letterSpacing.label', 'Letter spacing')}</span>
            <span class="control-value">${this._letterSpacing.toFixed(2)}em</span>
          </label>
          
          <input
            type="range"
            class="slider"
            min="0"
            max="0.5"
            step="0.05"
            .value="${String(this._letterSpacing)}"
            @input="${this._handleLetterSpacingChange}"
            aria-label="${this.t('spacing.letterSpacing.ariaLabel', 'Adjust letter spacing')}"
          />
        </div>
      </section>
    `;
  }

  private renderActions() {
    return html`
      <div class="panel-actions">
        <button
          class="action-button button-primary"
          @click="${this._handleApply}"
          ?disabled="${!this._hasChanges}"
        >
          ${this.t('actions.apply', 'Apply Changes')}
        </button>
        
        <button
          class="action-button button-secondary"
          @click="${this._handleReset}"
        >
          ${this.t('actions.reset', 'Reset to Defaults')}
        </button>
      </div>
    `;
  }

  private _handleFontSizeChange(e: Event) {
    const value = (e.target as HTMLInputElement).valueAsNumber;
    this._fontSize = value;
    this._hasChanges = true;
    
    if (this.immediate) {
      this._applySettings({ fontSize: value });
    }
    
    this._emitChange({ fontSize: value });
  }

  private _handleContrastChange(e: Event) {
    const value = (e.target as HTMLInputElement).value as 'aa' | 'aaa';
    this._contrast = value;
    this._hasChanges = true;
    
    if (this.immediate) {
      this._applySettings({ contrast: value });
    }
    
    this._emitChange({ contrast: value });
  }

  private _handleAnimationsChange(e: Event) {
    const value = (e.target as HTMLInputElement).value as 'on' | 'off' | 'reduced';
    this._animations = value;
    this._hasChanges = true;
    
    if (this.immediate) {
      this._applySettings({ animations: value });
    }
    
    this._emitChange({ animations: value });
  }

  private _handleLineHeightChange(e: Event) {
    const value = (e.target as HTMLInputElement).valueAsNumber;
    this._lineHeight = value;
    this._hasChanges = true;
    
    if (this.immediate) {
      this._applySettings({ lineHeight: value });
    }
    
    this._emitChange({ lineHeight: value });
  }

  private _handleLetterSpacingChange(e: Event) {
    const value = (e.target as HTMLInputElement).valueAsNumber;
    this._letterSpacing = value;
    this._hasChanges = true;
    
    if (this.immediate) {
      this._applySettings({ letterSpacing: value });
    }
    
    this._emitChange({ letterSpacing: value });
  }

  private _handleApply() {
    const settings = this._getCurrentSettings();
    this._applySettings(settings);
    this._saveSettings(settings);
    this._hasChanges = false;
    
    this.dispatchEvent(
      new CustomEvent('a11y-apply', {
        detail: { settings },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleReset() {
    this._fontSize = this.DEFAULT_SETTINGS.fontSize;
    this._contrast = this.DEFAULT_SETTINGS.contrast;
    this._animations = this.DEFAULT_SETTINGS.animations;
    this._lineHeight = this.DEFAULT_SETTINGS.lineHeight;
    this._letterSpacing = this.DEFAULT_SETTINGS.letterSpacing;
    this._hasChanges = false;
    
    this._applySettings(this.DEFAULT_SETTINGS);
    this._clearSettings();
    
    this.dispatchEvent(
      new CustomEvent('a11y-reset', {
        detail: { settings: this.DEFAULT_SETTINGS },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _applySettings(changes: Partial<A11ySettings>) {
    const root = document.documentElement;
    
    if (changes.fontSize !== undefined) {
      root.style.setProperty('--gc-a11y-font-scale', `${changes.fontSize / 100}`);
    }
    
    if (changes.contrast !== undefined) {
      root.setAttribute('data-contrast', changes.contrast);
    }
    
    if (changes.animations !== undefined) {
      root.setAttribute('data-animations', changes.animations);
    }
    
    if (changes.lineHeight !== undefined) {
      root.style.setProperty('--gc-a11y-line-height', String(changes.lineHeight));
    }
    
    if (changes.letterSpacing !== undefined) {
      root.style.setProperty('--gc-a11y-letter-spacing', `${changes.letterSpacing}em`);
    }
  }

  private _emitChange(changes: Partial<A11ySettings>) {
    const settings = this._getCurrentSettings();
    
    this.dispatchEvent(
      new CustomEvent<A11yChangeEvent>('a11y-change', {
        detail: { settings, changes },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _getCurrentSettings(): A11ySettings {
    return {
      fontSize: this._fontSize,
      contrast: this._contrast,
      animations: this._animations,
      lineHeight: this._lineHeight,
      letterSpacing: this._letterSpacing,
    };
  }

  private _loadSettings() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const settings = JSON.parse(stored) as A11ySettings;
        this._fontSize = settings.fontSize ?? this.DEFAULT_SETTINGS.fontSize;
        this._contrast = settings.contrast ?? this.DEFAULT_SETTINGS.contrast;
        this._animations = settings.animations ?? this.DEFAULT_SETTINGS.animations;
        this._lineHeight = settings.lineHeight ?? this.DEFAULT_SETTINGS.lineHeight;
        this._letterSpacing = settings.letterSpacing ?? this.DEFAULT_SETTINGS.letterSpacing;
        
        // Apply loaded settings
        this._applySettings(settings);
      }
    } catch (error) {
      console.warn('Failed to load accessibility settings:', error);
    }
  }

  private _saveSettings(settings: A11ySettings) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(settings));
    } catch (error) {
      console.warn('Failed to save accessibility settings:', error);
    }
  }

  private _clearSettings() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.warn('Failed to clear accessibility settings:', error);
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
    'eva-a11y-panel': EVAA11yPanel;
  }
}
