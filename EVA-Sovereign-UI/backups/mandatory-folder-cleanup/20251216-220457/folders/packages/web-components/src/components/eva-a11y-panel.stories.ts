import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eva-a11y-panel.js';

const meta: Meta = {
  title: 'Components/Backstage/A11yPanel',
  component: 'eva-a11y-panel',
  tags: ['autodocs'],
  argTypes: {
    showActions: {
      control: 'boolean',
      description: 'Show Apply/Reset buttons',
    },
    immediate: {
      control: 'boolean',
      description: 'Apply changes immediately (vs. on Apply click)',
    },
    storageKey: {
      control: 'text',
      description: 'localStorage key for persistence',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="max-width: 600px; margin: 0 auto; padding: 2rem; background: #ffffff; border-radius: 0.5rem;">
      <eva-a11y-panel></eva-a11y-panel>
    </div>
  `,
};

export const ImmediateMode: Story = {
  render: () => html`
    <div style="max-width: 600px; margin: 0 auto; padding: 2rem; background: #ffffff; border-radius: 0.5rem;">
      <h2 style="margin: 0 0 1rem 0; color: #26374A;">Immediate Updates (Default)</h2>
      <p style="color: #666666; line-height: 1.6; margin-bottom: 1.5rem;">
        Changes apply immediately as you adjust controls. Watch the text below change in real-time.
      </p>
      
      <eva-a11y-panel immediate></eva-a11y-panel>
      
      <div style="margin-top: 2rem; padding: 1.5rem; background: #f9f9f9; border-radius: 0.5rem;">
        <h3 style="margin: 0 0 0.5rem 0; color: #26374A;">Sample Text</h3>
        <p style="color: #666666; line-height: var(--gc-a11y-line-height, 1.5); letter-spacing: var(--gc-a11y-letter-spacing, 0); font-size: calc(1rem * var(--gc-a11y-font-scale, 1));">
          This text will change as you adjust the accessibility settings above.
          Try increasing font size, changing contrast, or adjusting spacing.
        </p>
      </div>
    </div>
  `,
};

export const ManualMode: Story = {
  render: () => html`
    <div style="max-width: 600px; margin: 0 auto; padding: 2rem; background: #ffffff; border-radius: 0.5rem;">
      <h2 style="margin: 0 0 1rem 0; color: #26374A;">Manual Apply Mode</h2>
      <p style="color: #666666; line-height: 1.6; margin-bottom: 1.5rem;">
        Changes only apply when you click "Apply Changes". 
        This gives users a chance to preview settings before committing.
      </p>
      
      <eva-a11y-panel .immediate="${false}"></eva-a11y-panel>
      
      <div style="margin-top: 2rem; padding: 1.5rem; background: #f9f9f9; border-radius: 0.5rem;">
        <h3 style="margin: 0 0 0.5rem 0; color: #26374A;">Sample Text</h3>
        <p style="color: #666666; line-height: var(--gc-a11y-line-height, 1.5); letter-spacing: var(--gc-a11y-letter-spacing, 0); font-size: calc(1rem * var(--gc-a11y-font-scale, 1));">
          Adjust settings above, then click "Apply Changes" to see the effect.
        </p>
      </div>
    </div>
  `,
};

export const WithoutActions: Story = {
  render: () => html`
    <div style="max-width: 600px; margin: 0 auto; padding: 2rem; background: #ffffff; border-radius: 0.5rem;">
      <h2 style="margin: 0 0 1rem 0; color: #26374A;">No Action Buttons</h2>
      <p style="color: #666666; line-height: 1.6; margin-bottom: 1.5rem;">
        For embedded use cases, you can hide the Apply/Reset buttons and handle state externally.
      </p>
      
      <eva-a11y-panel .showActions="${false}"></eva-a11y-panel>
    </div>
  `,
};

export const FontSizeDemo: Story = {
  render: () => html`
    <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div style="background: #ffffff; padding: 1.5rem; border-radius: 0.5rem;">
          <h3 style="margin: 0 0 1rem 0; color: #26374A;">Font Size Control</h3>
          <eva-a11y-panel></eva-a11y-panel>
        </div>
        
        <div style="background: #f9f9f9; padding: 1.5rem; border-radius: 0.5rem;">
          <h3 style="margin: 0 0 1rem 0; color: #26374A; font-size: calc(1.25rem * var(--gc-a11y-font-scale, 1));">Live Preview</h3>
          <p style="color: #666666; line-height: var(--gc-a11y-line-height, 1.5); font-size: calc(1rem * var(--gc-a11y-font-scale, 1));">
            Move the font size slider to see this text change size in real-time.
          </p>
          <ul style="color: #666666; line-height: var(--gc-a11y-line-height, 1.5); font-size: calc(0.9375rem * var(--gc-a11y-font-scale, 1));">
            <li>75%: Compact (reading on large screens)</li>
            <li>100%: Standard (default)</li>
            <li>125%: Large (recommended for accessibility)</li>
            <li>150%: Extra Large</li>
            <li>200%: Maximum (low vision users)</li>
          </ul>
        </div>
      </div>
    </div>
  `,
};

export const ContrastDemo: Story = {
  render: () => html`
    <style>
      [data-contrast="aaa"] .contrast-demo {
        background-color: #000000 !important;
        color: #ffffff !important;
      }
      [data-contrast="aaa"] .contrast-demo h3 {
        color: #ffffff !important;
      }
    </style>
    
    <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div style="background: #ffffff; padding: 1.5rem; border-radius: 0.5rem;">
          <h3 style="margin: 0 0 1rem 0; color: #26374A;">Contrast Control</h3>
          <eva-a11y-panel></eva-a11y-panel>
        </div>
        
        <div class="contrast-demo" style="background: #f9f9f9; padding: 1.5rem; border-radius: 0.5rem; transition: all 300ms;">
          <h3 style="margin: 0 0 1rem 0; color: #26374A;">Contrast Preview</h3>
          <p style="color: #666666; line-height: 1.6;">
            Toggle between Standard (AA) and High Contrast (AAA) modes.
            High contrast mode uses a 7:1 ratio for better readability.
          </p>
          <div style="margin-top: 1rem; padding: 1rem; background: rgba(0,0,0,0.05); border-radius: 0.25rem;">
            <strong>Current mode:</strong> <span id="contrast-indicator">AA (4.5:1)</span>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const AnimationsDemo: Story = {
  render: () => html`
    <style>
      [data-animations="off"] .animation-demo {
        transition: none !important;
      }
      [data-animations="reduced"] .animation-demo {
        transition-duration: 100ms !important;
      }
      
      .animation-demo {
        transition: all 500ms ease-in-out;
      }
      
      .animation-demo:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
      }
    </style>
    
    <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div style="background: #ffffff; padding: 1.5rem; border-radius: 0.5rem;">
          <h3 style="margin: 0 0 1rem 0; color: #26374A;">Animation Control</h3>
          <eva-a11y-panel></eva-a11y-panel>
        </div>
        
        <div>
          <h3 style="margin: 0 0 1rem 0; color: #26374A;">Animation Test</h3>
          <p style="color: #666666; line-height: 1.6; margin-bottom: 1rem;">
            Hover over the cards below to see how animation settings affect transitions.
          </p>
          
          <div style="display: grid; gap: 1rem;">
            <div class="animation-demo" style="background: #284162; color: #ffffff; padding: 1.5rem; border-radius: 0.5rem; cursor: pointer;">
              <strong>Hover me!</strong><br>
              <small>Watch the animation change</small>
            </div>
            <div class="animation-demo" style="background: #1C578A; color: #ffffff; padding: 1.5rem; border-radius: 0.5rem; cursor: pointer;">
              <strong>And me!</strong><br>
              <small>Animations: On (500ms), Reduced (100ms), Off (0ms)</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const TextSpacingDemo: Story = {
  render: () => html`
    <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div style="background: #ffffff; padding: 1.5rem; border-radius: 0.5rem;">
          <h3 style="margin: 0 0 1rem 0; color: #26374A;">Text Spacing</h3>
          <eva-a11y-panel></eva-a11y-panel>
        </div>
        
        <div style="background: #f9f9f9; padding: 1.5rem; border-radius: 0.5rem;">
          <h3 style="margin: 0 0 1rem 0; color: #26374A; line-height: var(--gc-a11y-line-height, 1.5); letter-spacing: var(--gc-a11y-letter-spacing, 0);">
            Spacing Preview
          </h3>
          <p style="color: #666666; line-height: var(--gc-a11y-line-height, 1.5); letter-spacing: var(--gc-a11y-letter-spacing, 0);">
            Adjust line height (1.0 - 2.0) and letter spacing (0 - 0.5em) to see how it affects readability.
            WCAG 2.1 SC 1.4.12 recommends at least 1.5 line height for improved reading comprehension.
          </p>
          <p style="color: #666666; line-height: var(--gc-a11y-line-height, 1.5); letter-spacing: var(--gc-a11y-letter-spacing, 0);">
            <strong>Current settings:</strong><br>
            Line height: <code>var(--gc-a11y-line-height)</code><br>
            Letter spacing: <code>var(--gc-a11y-letter-spacing)</code>
          </p>
        </div>
      </div>
    </div>
  `,
};

export const EventsDemo: Story = {
  render: () => {
    let eventLog: string[] = [];
    
    const handleA11yChange = (e: CustomEvent) => {
      console.log('a11y-change:', e.detail);
      eventLog.push(`Changed: ${JSON.stringify(e.detail.changes)}`);
      updateLog();
    };
    
    const handleA11yApply = (e: CustomEvent) => {
      console.log('a11y-apply:', e.detail);
      eventLog.push(`Applied: ${JSON.stringify(e.detail.settings)}`);
      updateLog();
    };
    
    const handleA11yReset = (e: CustomEvent) => {
      console.log('a11y-reset:', e.detail);
      eventLog.push('Reset to defaults');
      updateLog();
    };
    
    const updateLog = () => {
      const logElement = document.getElementById('event-log');
      if (logElement) {
        logElement.innerHTML = eventLog.slice(-5).reverse().join('<br>');
      }
    };
    
    setTimeout(() => {
      const panel = document.querySelector('eva-a11y-panel');
      if (panel) {
        panel.addEventListener('a11y-change', handleA11yChange as EventListener);
        panel.addEventListener('a11y-apply', handleA11yApply as EventListener);
        panel.addEventListener('a11y-reset', handleA11yReset as EventListener);
      }
    }, 100);
    
    return html`
      <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div style="background: #ffffff; padding: 1.5rem; border-radius: 0.5rem;">
            <h3 style="margin: 0 0 1rem 0; color: #26374A;">Accessibility Panel</h3>
            <eva-a11y-panel .immediate="${false}"></eva-a11y-panel>
          </div>
          
          <div style="background: #f9f9f9; padding: 1.5rem; border-radius: 0.5rem;">
            <h3 style="margin: 0 0 1rem 0; color: #26374A;">Event Log</h3>
            <p style="color: #666666; line-height: 1.6; margin-bottom: 1rem; font-size: 0.875rem;">
              The panel fires three events:<br>
              • <code>a11y-change</code> - On each control change<br>
              • <code>a11y-apply</code> - When Apply is clicked<br>
              • <code>a11y-reset</code> - When Reset is clicked
            </p>
            <div id="event-log" style="background: #ffffff; padding: 1rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.75rem; color: #284162; min-height: 100px; max-height: 200px; overflow-y: auto;">
              (Events will appear here)
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

export const PersistenceDemo: Story = {
  render: () => html`
    <div style="max-width: 600px; margin: 0 auto; padding: 2rem; background: #ffffff; border-radius: 0.5rem;">
      <h2 style="margin: 0 0 1rem 0; color: #26374A;">localStorage Persistence</h2>
      <p style="color: #666666; line-height: 1.6; margin-bottom: 1.5rem;">
        Settings are automatically saved to <code>localStorage</code> when you click Apply.
        Reload this page to see your settings restored.
      </p>
      
      <eva-a11y-panel .immediate="${false}" storageKey="demo-a11y-settings"></eva-a11y-panel>
      
      <div style="margin-top: 2rem; padding: 1.5rem; background: #f0f7fb; border-left: 4px solid #1C578A; border-radius: 0.25rem;">
        <strong style="display: block; margin-bottom: 0.5rem; color: #284162;">Try this:</strong>
        <ol style="color: #284162; line-height: 1.6; margin: 0; padding-left: 1.25rem;">
          <li>Adjust some settings above</li>
          <li>Click "Apply Changes"</li>
          <li>Reload this page</li>
          <li>Your settings will be restored!</li>
        </ol>
      </div>
    </div>
  `,
};
