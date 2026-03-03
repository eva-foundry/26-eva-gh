import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

// Register bilingual messages for wb-session-timeout
registerMessages('wb-session-timeout', {
  'en-CA': {
    title: 'Session Timeout Warning',
    message: 'Your session will expire in {time}. Do you want to continue your session?',
    continueButton: 'Continue Session',
    signOutButton: 'Sign Out',
    sessionExpired: 'Your session has expired.',
    redirecting: 'Redirecting to login page...',
    sessionExtended: 'Your session has been extended.'
  },
  'fr-CA': {
    title: 'Avertissement de délai d\'expiration de session',
    message: 'Votre session expirera dans {time}. Voulez-vous continuer votre session?',
    continueButton: 'Continuer la session',
    signOutButton: 'Se déconnecter',
    sessionExpired: 'Votre session a expiré.',
    redirecting: 'Redirection vers la page de connexion...',
    sessionExtended: 'Votre session a été prolongée.'
  }
});

/**
 * wb-session-timeout - Session Timeout Warnings
 *
 * WET-BOEW 4.x plugin reimplemented as modern Lit 3.x Web Component.
 * MANDATORY for GC authenticated applications.
 *
 * @element wb-session-timeout
 *
 * @fires wb-session-timeout-warning - Fired when warning modal is shown
 * @fires wb-session-timeout-end - Fired when session expires
 * @fires wb-session-timeout-continue - Fired when user continues session
 *
 * @csspart modal - Modal container
 * @csspart backdrop - Modal backdrop
 * @csspart content - Modal content
 *
 * @example
 * ```html
 * <wb-session-timeout
 *   session-duration="1800000"
 *   warning-time="600000"
 *   session-endpoint="/api/session/refresh"
 *   logout-url="/logout">
 * </wb-session-timeout>
 * ```
 *
 * @reference https://wet-boew.github.io/wet-boew/demos/session-timeout/session-timeout-en.html
 */
@customElement('wb-session-timeout')
export class WBSessionTimeout extends EVAElement {
  /** Total session duration in milliseconds (default: 30 min) */
  @property({ type: Number, attribute: 'session-duration' })
  sessionDuration = 1800000;

  /** Warning time before expiry in milliseconds (default: 10 min before end) */
  @property({ type: Number, attribute: 'warning-time' })
  warningTime = 600000;

  /** Session refresh endpoint URL */
  @property({ type: String, attribute: 'session-endpoint' })
  sessionEndpoint = '/api/session/refresh';

  /** Logout redirect URL */
  @property({ type: String, attribute: 'logout-url' })
  logoutUrl = '/logout';

  /** Internal state: Warning modal visible */
  @state()
  private showModal = false;

  /** Internal state: Remaining time (seconds) */
  @state()
  private remainingSeconds = 0;

  /** Timers */
  private warningTimer?: number;
  private countdownTimer?: number;
  private expiryTimer?: number;

  /** Session start time */
  private sessionStartTime = Date.now();

  /** Storage key for cross-tab sync */
  private readonly STORAGE_KEY = 'wb-session-timeout-state';

  static override styles = css`
    :host {
      display: none; /* Component has no visible UI except modal */
    }

    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      z-index: 9998;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .modal-content {
      background: var(--eva-colors-white, #fff);
      border: 3px solid var(--eva-colors-gc-error-red, #d3080c);
      border-radius: var(--eva-border-radius-lg, 12px);
      padding: var(--eva-spacing-spacing-6, 2rem);
      max-width: 500px;
      width: 90%;
      box-shadow: var(--eva-shadows-xl, 0 10px 25px rgba(0, 0, 0, 0.3));
      z-index: 9999;
      animation: slideDown 0.3s ease;
    }

    @keyframes slideDown {
      from {
        transform: translateY(-50px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .modal-header {
      display: flex;
      align-items: center;
      gap: var(--eva-spacing-spacing-3, 0.75rem);
      margin-bottom: var(--eva-spacing-spacing-4, 1rem);
    }

    .warning-icon {
      font-size: 2rem;
      color: var(--eva-colors-gc-error-red, #d3080c);
    }

    .modal-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--eva-colors-gc-error-red, #d3080c);
      margin: 0;
    }

    .modal-body {
      margin-bottom: var(--eva-spacing-spacing-5, 1.5rem);
    }

    .countdown {
      font-size: 2rem;
      font-weight: 700;
      color: var(--eva-colors-gc-error-red, #d3080c);
      text-align: center;
      margin: var(--eva-spacing-spacing-4, 1rem) 0;
      font-variant-numeric: tabular-nums;
    }

    .modal-message {
      font-size: 1.125rem;
      line-height: 1.6;
      color: var(--eva-colors-neutral-800, #333);
    }

    .modal-actions {
      display: flex;
      gap: var(--eva-spacing-spacing-3, 0.75rem);
      justify-content: flex-end;
    }

    .button {
      padding: var(--eva-spacing-spacing-3, 0.75rem) var(--eva-spacing-spacing-5, 1.5rem);
      border: none;
      border-radius: var(--eva-border-radius-md, 8px);
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .button-continue {
      background: var(--eva-colors-success, #278400);
      color: var(--eva-colors-white, #fff);
    }

    .button-continue:hover {
      background: var(--eva-colors-success-dark, #1e6300);
    }

    .button-continue:focus {
      outline: 3px solid var(--eva-colors-success, #278400);
      outline-offset: 2px;
    }

    .button-signout {
      background: var(--eva-colors-neutral-200, #e0e0e0);
      color: var(--eva-colors-neutral-800, #333);
    }

    .button-signout:hover {
      background: var(--eva-colors-neutral-300, #ccc);
    }

    .button-signout:focus {
      outline: 3px solid var(--eva-colors-gc-link-blue, #284162);
      outline-offset: 2px;
    }
  `;

  override connectedCallback(): void {
    super.connectedCallback();
    this.startTimer();

    // Listen for storage events (cross-tab sync)
    window.addEventListener('storage', this.handleStorageChange);

    // Listen for page visibility changes
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    // Reset timer on user activity
    window.addEventListener('click', this.resetTimer);
    window.addEventListener('keydown', this.resetTimer);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clearAllTimers();

    window.removeEventListener('storage', this.handleStorageChange);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('click', this.resetTimer);
    window.removeEventListener('keydown', this.resetTimer);
  }

  /**
   * Start session timeout timer
   */
  startTimer(): void {
    this.clearAllTimers();
    this.sessionStartTime = Date.now();

    // Set warning timer
    this.warningTimer = window.setTimeout(() => {
      this.showWarning();
    }, this.sessionDuration - this.warningTime);

    // Set expiry timer
    this.expiryTimer = window.setTimeout(() => {
      this.endSession();
    }, this.sessionDuration);

    // Sync state to localStorage
    this.saveState();
  }

  /**
   * Reset timer (called on user activity)
   */
  resetTimer = (): void => {
    if (!this.showModal) {
      this.startTimer();
    }
  };

  /**
   * Show warning modal
   */
  showWarning(): void {
    this.showModal = true;
    this.remainingSeconds = Math.floor(this.warningTime / 1000);

    // Start countdown
    this.countdownTimer = window.setInterval(() => {
      this.remainingSeconds--;

      if (this.remainingSeconds <= 0) {
        this.endSession();
      }
    }, 1000);

    // Emit warning event
    this.emitEvent('wb-session-timeout-warning', { remaining: this.remainingSeconds });

    // Announce to screen readers
    this.announce(
      this.getMessage('wb-session-timeout', 'message').replace(
        '{time}',
        this.formatTime(this.remainingSeconds)
      ),
      'assertive'
    );

    // Focus the continue button (focus trap)
    this.updateComplete.then(() => {
      const continueButton = this.shadowRoot!.querySelector<HTMLButtonElement>('.button-continue');
      continueButton?.focus();
    });

    // Sync to other tabs
    this.saveState();
  }

  /**
   * Continue session (extend timeout)
   */
  async continueSession(): Promise<void> {
    // Close modal
    this.showModal = false;
    this.clearAllTimers();

    // Call session refresh endpoint
    try {
      await fetch(this.sessionEndpoint, {
        method: 'POST',
        credentials: 'include'
      });

      // Restart timer
      this.startTimer();

      // Emit continue event
      this.emitEvent('wb-session-timeout-continue');

      // Announce success
      this.announce(this.getMessage('wb-session-timeout', 'sessionExtended'), 'polite');

    } catch (error) {
      console.error('[wb-session-timeout] Failed to refresh session:', error);
      // Fallback: restart timer anyway (optimistic)
      this.startTimer();
    }
  }

  /**
   * End session (sign out)
   */
  endSession(): void {
    this.clearAllTimers();
    this.showModal = false;

    // Emit end event
    this.emitEvent('wb-session-timeout-end');

    // Announce session expired
    this.announce(this.getMessage('wb-session-timeout', 'sessionExpired'), 'assertive');

    // Redirect to logout URL
    setTimeout(() => {
      window.location.href = this.logoutUrl;
    }, 1000);
  }

  /**
   * Clear all timers
   */
  private clearAllTimers(): void {
    if (this.warningTimer) clearTimeout(this.warningTimer);
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    if (this.expiryTimer) clearTimeout(this.expiryTimer);
  }

  /**
   * Save state to localStorage (cross-tab sync)
   */
  private saveState(): void {
    const state = {
      sessionStartTime: this.sessionStartTime,
      showModal: this.showModal
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }

  /**
   * Handle storage changes (cross-tab sync)
   */
  private handleStorageChange = (e: StorageEvent): void => {
    if (e.key === this.STORAGE_KEY && e.newValue) {
      const state = JSON.parse(e.newValue);

      // Sync session start time across tabs
      if (state.sessionStartTime !== this.sessionStartTime) {
        this.sessionStartTime = state.sessionStartTime;
        this.startTimer();
      }

      // Sync modal state
      if (state.showModal && !this.showModal) {
        this.showWarning();
      }
    }
  };

  /**
   * Handle page visibility changes (pause timer when hidden)
   */
  private handleVisibilityChange = (): void => {
    if (document.hidden) {
      // Page is hidden - pause timers
      this.clearAllTimers();
    } else {
      // Page is visible - recalculate and restart timers
      const elapsed = Date.now() - this.sessionStartTime;
      const remaining = this.sessionDuration - elapsed;

      if (remaining <= 0) {
        // Session expired while page was hidden
        this.endSession();
      } else if (remaining <= this.warningTime) {
        // Should show warning
        this.showWarning();
      } else {
        // Resume normal timer
        this.startTimer();
      }
    }
  };

  /**
   * Format seconds as MM:SS
   */
  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Handle keyboard events in modal (focus trap)
   */
  private handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      // Esc closes modal but does NOT reset timer
      e.preventDefault();
      this.showModal = false;
    } else if (e.key === 'Tab') {
      // Tab cycles between buttons (focus trap)
      const focusableElements = this.shadowRoot!.querySelectorAll<HTMLButtonElement>(
        '.button-continue, .button-signout'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift+Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  override render() {
    if (!this.showModal) return html``;

    return html`
      <div
        class="modal-backdrop"
        part="backdrop"
        @click=${(e: MouseEvent) => {
          // Close on backdrop click (but timer continues)
          if (e.target === e.currentTarget) {
            this.showModal = false;
          }
        }}
        @keydown=${this.handleKeydown}
      >
        <div
          class="modal-content"
          part="modal"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="session-timeout-title"
          aria-describedby="session-timeout-message"
        >
          <div class="modal-header">
            <span class="warning-icon" aria-hidden="true">⚠️</span>
            <h2 id="session-timeout-title" class="modal-title">
              ${this.getMessage('wb-session-timeout', 'title')}
            </h2>
          </div>

          <div class="modal-body">
            <div class="countdown" aria-live="polite" aria-atomic="true">
              ${this.formatTime(this.remainingSeconds)}
            </div>

            <p id="session-timeout-message" class="modal-message">
              ${this.getMessage('wb-session-timeout', 'message').replace(
                '{time}',
                this.formatTime(this.remainingSeconds)
              )}
            </p>
          </div>

          <div class="modal-actions">
            <button
              class="button button-signout"
              @click=${this.endSession}
              aria-label="${this.getMessage('wb-session-timeout', 'signOutButton')}"
            >
              ${this.getMessage('wb-session-timeout', 'signOutButton')}
            </button>

            <button
              class="button button-continue"
              @click=${this.continueSession}
              aria-label="${this.getMessage('wb-session-timeout', 'continueButton')}"
            >
              ${this.getMessage('wb-session-timeout', 'continueButton')}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-session-timeout': WBSessionTimeout;
  }
}
