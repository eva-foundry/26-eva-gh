import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-session-timeout.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-session-timeout',
  component: 'wb-session-timeout',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# wb-session-timeout - Session Timeout Warnings

WET-BOEW 4.x plugin reimplemented as modern Lit 3.x Web Component.

**MANDATORY for GC authenticated applications.**

Warns users before session expires with modal countdown timer.

**Reference**: https://wet-boew.github.io/wet-boew/demos/session-timeout/session-timeout-en.html

## Features
- ✅ Modal warning before session expires
- ✅ Countdown timer (MM:SS format)
- ✅ Continue session button (refreshes session)
- ✅ Sign out button (ends session)
- ✅ Auto sign-out on expiry
- ✅ Focus trap in modal (keyboard accessible)
- ✅ Cross-tab session sync (localStorage)
- ✅ Page visibility API (pauses when hidden)
- ✅ ARIA announcements, screen reader support
- ✅ Bilingual (EN-CA/FR-CA)
- ✅ WCAG 2.2 AAA compliant

## GC Requirements
This component is **MANDATORY** for all Government of Canada authenticated web applications.
        `
      }
    }
  },
  argTypes: {
    sessionDuration: {
      control: { type: 'number', min: 60000, max: 3600000, step: 60000 },
      description: 'Total session duration (ms)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1800000 (30 min)' }
      }
    },
    warningTime: {
      control: { type: 'number', min: 30000, max: 600000, step: 30000 },
      description: 'Warning time before expiry (ms)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '600000 (10 min)' }
      }
    }
  }
};

export default meta;
type Story = StoryObj;

export const Demo30Second: Story = {
  render: () => html`
    <wb-session-timeout
      session-duration="30000"
      warning-time="10000"
      session-endpoint="/api/session/refresh"
      logout-url="/logout"
    ></wb-session-timeout>

    <div style="padding: 2rem; max-width: 600px;">
      <h2>Session Timeout Demo (30 seconds)</h2>
      <p>This demo uses a <strong>30-second session</strong> with a <strong>10-second warning</strong>.</p>
      
      <ul style="line-height: 1.8;">
        <li>⏱️ Total session: 30 seconds</li>
        <li>⚠️ Warning shows: at 20 seconds (10 seconds before expiry)</li>
        <li>✅ Click "Continue Session" to extend</li>
        <li>🚪 Click "Sign Out" to end session</li>
        <li>⏰ Auto sign-out: at 30 seconds if no action</li>
      </ul>

      <div style="margin-top: 2rem; padding: 1rem; background: #fffbcc; border-left: 4px solid #f0ad4e; border-radius: 4px;">
        <strong>💡 Tip:</strong> Wait 20 seconds to see the warning modal appear!
      </div>

      <div style="margin-top: 1rem; padding: 1rem; background: #e7f3ff; border-left: 4px solid #2196f3; border-radius: 4px;">
        <strong>⌨️ Keyboard Shortcuts:</strong>
        <ul style="margin-top: 0.5rem; margin-bottom: 0;">
          <li><kbd>Tab</kbd> - Cycle between buttons</li>
          <li><kbd>Enter</kbd> / <kbd>Space</kbd> - Activate button</li>
          <li><kbd>Esc</kbd> - Close modal (timer continues)</li>
        </ul>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demo with 30-second session for testing (production uses 30 minutes)'
      }
    }
  }
};

export const ProductionSettings: Story = {
  render: () => html`
    <wb-session-timeout
      session-duration="1800000"
      warning-time="600000"
      session-endpoint="/api/session/refresh"
      logout-url="/logout"
    ></wb-session-timeout>

    <div style="padding: 2rem; max-width: 600px;">
      <h2>Production Settings (30 min session)</h2>
      <p>This uses <strong>production-recommended settings</strong> for GC applications:</p>
      
      <ul style="line-height: 1.8;">
        <li>⏱️ Total session: <strong>30 minutes</strong> (1,800,000 ms)</li>
        <li>⚠️ Warning shows: at <strong>20 minutes</strong> (10 min before expiry)</li>
        <li>⏰ Auto sign-out: at <strong>30 minutes</strong> if no action</li>
      </ul>

      <div style="margin-top: 2rem; padding: 1rem; background: #ffebee; border-left: 4px solid #d3080c; border-radius: 4px;">
        <strong>⚠️ MANDATORY:</strong> This component is required for all GC authenticated applications.
      </div>

      <div style="margin-top: 1rem; padding: 1rem; background: #e8f5e9; border-left: 4px solid #278400; border-radius: 4px;">
        <strong>✅ GC Compliance:</strong>
        <ul style="margin-top: 0.5rem; margin-bottom: 0;">
          <li>WCAG 2.2 AAA compliant</li>
          <li>Keyboard accessible (focus trap)</li>
          <li>Screen reader announcements</li>
          <li>Bilingual EN-CA/FR-CA</li>
        </ul>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Production settings (30 min session, 10 min warning) - GC standard'
      }
    }
  }
};

export const CustomEndpoint: Story = {
  render: () => html`
    <wb-session-timeout
      session-duration="60000"
      warning-time="20000"
      session-endpoint="https://httpbin.org/post"
      logout-url="https://httpbin.org/redirect/1"
      @wb-session-timeout-warning=${(e: CustomEvent) => {
        console.log('Warning modal shown. Remaining seconds:', e.detail.remaining);
      }}
      @wb-session-timeout-continue=${() => {
        console.log('User continued session. Session refreshed.');
      }}
      @wb-session-timeout-end=${() => {
        console.log('Session ended. Redirecting to logout...');
      }}
    ></wb-session-timeout>

    <div style="padding: 2rem; max-width: 600px;">
      <h2>Custom Endpoint & Event Handlers</h2>
      <p>This demo uses custom session endpoint and event handlers.</p>
      
      <ul style="line-height: 1.8;">
        <li>🔗 Session endpoint: <code>https://httpbin.org/post</code></li>
        <li>🚪 Logout URL: <code>https://httpbin.org/redirect/1</code></li>
        <li>📡 Custom event handlers attached (check console)</li>
      </ul>

      <div style="margin-top: 2rem; padding: 1rem; background: #e7f3ff; border-left: 4px solid #2196f3; border-radius: 4px;">
        <strong>💡 Events:</strong>
        <ul style="margin-top: 0.5rem; margin-bottom: 0;">
          <li><code>wb-session-timeout-warning</code> - Modal shown</li>
          <li><code>wb-session-timeout-continue</code> - User continues</li>
          <li><code>wb-session-timeout-end</code> - Session ends</li>
        </ul>
      </div>

      <div style="margin-top: 1rem; padding: 1rem; background: #fffbcc; border-left: 4px solid #f0ad4e; border-radius: 4px;">
        <strong>📝 Note:</strong> Open browser console to see event logs. Wait 40 seconds for warning.
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Custom session refresh endpoint with event handlers for logging/analytics'
      }
    }
  }
};

export const BilingualFrench: Story = {
  render: () => html`
    <wb-session-timeout
      locale="fr-CA"
      session-duration="30000"
      warning-time="10000"
      session-endpoint="/api/session/refresh"
      logout-url="/logout"
    ></wb-session-timeout>

    <div style="padding: 2rem; max-width: 600px;">
      <h2>Contenu bilingue (français)</h2>
      <p>Cette démo affiche tous les messages en <strong>français (FR-CA)</strong>.</p>
      
      <ul style="line-height: 1.8;">
        <li>⏱️ Durée de la session : 30 secondes</li>
        <li>⚠️ Avertissement : à 20 secondes</li>
        <li>🚪 Déconnexion automatique : à 30 secondes</li>
      </ul>

      <div style="margin-top: 2rem; padding: 1rem; background: #fffbcc; border-left: 4px solid #f0ad4e; border-radius: 4px;">
        <strong>💡 Conseil :</strong> Attendez 20 secondes pour voir l'avertissement en français !
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All modal text (title, message, buttons) displayed in French (FR-CA)'
      }
    }
  }
};

export const MultiTabSync: Story = {
  render: () => html`
    <wb-session-timeout
      session-duration="60000"
      warning-time="20000"
      session-endpoint="/api/session/refresh"
      logout-url="/logout"
    ></wb-session-timeout>

    <div style="padding: 2rem; max-width: 600px;">
      <h2>Multi-Tab Synchronization</h2>
      <p>Session state is synchronized across all browser tabs using localStorage.</p>
      
      <ul style="line-height: 1.8;">
        <li>🔗 Open this story in multiple tabs</li>
        <li>⏱️ Wait for warning modal in one tab</li>
        <li>✅ Click "Continue Session" in any tab</li>
        <li>🔄 All tabs will sync and reset timer</li>
      </ul>

      <div style="margin-top: 2rem; padding: 1rem; background: #e7f3ff; border-left: 4px solid #2196f3; border-radius: 4px;">
        <strong>🔐 Security Feature:</strong> If one tab's session expires, all tabs are signed out simultaneously.
      </div>

      <div style="margin-top: 1rem; padding: 1rem; background: #e8f5e9; border-left: 4px solid #278400; border-radius: 4px;">
        <strong>✅ How it works:</strong>
        <ul style="margin-top: 0.5rem; margin-bottom: 0;">
          <li>Session state saved to localStorage</li>
          <li>Storage events sync across tabs</li>
          <li>Warning modal appears in all tabs</li>
          <li>Continue/Sign Out affects all tabs</li>
        </ul>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Session state synchronized across browser tabs via localStorage events'
      }
    }
  }
};
