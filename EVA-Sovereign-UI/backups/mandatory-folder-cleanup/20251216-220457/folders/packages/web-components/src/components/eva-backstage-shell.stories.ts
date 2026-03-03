import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eva-backstage-shell.js';
import './eva-a11y-panel.js';

const meta: Meta = {
  title: 'Components/Navigation/BackstageShell',
  component: 'eva-backstage-shell',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Panel open state',
    },
    position: {
      control: 'select',
      options: ['right', 'left'],
      description: 'Panel slide direction',
    },
    width: {
      control: 'text',
      description: 'Panel width (CSS value)',
    },
    title: {
      control: 'text',
      description: 'Panel title',
    },
    showTrigger: {
      control: 'boolean',
      description: 'Show gear icon trigger button',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="position: relative; height: 600px; background: #f9f9f9; padding: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #ffffff; border-radius: 0.5rem; margin-bottom: 2rem;">
        <h2 style="margin: 0; color: #26374A;">EVA Application Header</h2>
        <eva-backstage-shell title="Customization">
          <div style="padding: 1.5rem;">
            <h3 style="margin: 0 0 1rem 0; color: #26374A;">Backstage Content</h3>
            <p style="color: #666666; line-height: 1.6;">
              This is where customization panels go. Click the gear icon (⚙️) in the header to open/close.
            </p>
          </div>
        </eva-backstage-shell>
      </div>
      
      <div style="background: #ffffff; padding: 2rem; border-radius: 0.5rem;">
        <h1 style="margin: 0 0 1rem 0; color: #26374A;">Main Content</h1>
        <p style="color: #666666; line-height: 1.6;">
          The backstage panel slides in from the right when the gear icon is clicked.
          It includes a focus trap, closes on Escape, and restores focus when closed.
        </p>
      </div>
    </div>
  `,
};

export const WithAccessibilityPanel: Story = {
  render: () => html`
    <div style="position: relative; height: 600px; background: #f9f9f9; padding: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #ffffff; border-radius: 0.5rem; margin-bottom: 2rem;">
        <h2 style="margin: 0; color: #26374A;">EVA Chat</h2>
        <eva-backstage-shell title="Accessibility Settings" width="500px">
          <eva-a11y-panel></eva-a11y-panel>
        </eva-backstage-shell>
      </div>
      
      <div style="background: #ffffff; padding: 2rem; border-radius: 0.5rem;">
        <h1 style="margin: 0 0 1rem 0; color: #26374A;">Chat Interface</h1>
        <p style="color: #666666; line-height: 1.6;">
          Click the gear icon to open accessibility settings. 
          Adjust font size, contrast, and animations to see changes applied in real-time.
        </p>
      </div>
    </div>
  `,
};

export const LeftPosition: Story = {
  render: () => html`
    <div style="position: relative; height: 600px; background: #f9f9f9; padding: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #ffffff; border-radius: 0.5rem; margin-bottom: 2rem;">
        <eva-backstage-shell title="Settings" position="left">
          <div style="padding: 1.5rem;">
            <h3 style="margin: 0 0 1rem 0; color: #26374A;">Left Panel</h3>
            <p style="color: #666666; line-height: 1.6;">
              This panel slides in from the left instead of the right.
            </p>
          </div>
        </eva-backstage-shell>
        <h2 style="margin: 0; color: #26374A;">Application Header</h2>
      </div>
      
      <div style="background: #ffffff; padding: 2rem; border-radius: 0.5rem;">
        <h1 style="margin: 0 0 1rem 0; color: #26374A;">Main Content</h1>
        <p style="color: #666666; line-height: 1.6;">
          The panel position can be configured to slide from left or right.
        </p>
      </div>
    </div>
  `,
};

export const CustomWidth: Story = {
  render: () => html`
    <div style="position: relative; height: 600px; background: #f9f9f9; padding: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #ffffff; border-radius: 0.5rem; margin-bottom: 2rem;">
        <h2 style="margin: 0; color: #26374A;">EVA Suite</h2>
        <eva-backstage-shell title="Wide Panel" width="700px">
          <div style="padding: 1.5rem;">
            <h3 style="margin: 0 0 1rem 0; color: #26374A;">Custom Width Panel</h3>
            <p style="color: #666666; line-height: 1.6;">
              This panel is 700px wide instead of the default 480px.
              You can set any CSS width value (px, %, vw, etc.).
            </p>
          </div>
        </eva-backstage-shell>
      </div>
      
      <div style="background: #ffffff; padding: 2rem; border-radius: 0.5rem;">
        <h1 style="margin: 0 0 1rem 0; color: #26374A;">Main Content</h1>
        <p style="color: #666666; line-height: 1.6;">
          Panel width can be customized via the <code>width</code> property.
        </p>
      </div>
    </div>
  `,
};

export const WithNavigation: Story = {
  render: () => html`
    <div style="position: relative; height: 600px; background: #f9f9f9; padding: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #ffffff; border-radius: 0.5rem; margin-bottom: 2rem;">
        <h2 style="margin: 0; color: #26374A;">EVA Platform</h2>
        <eva-backstage-shell title="Settings">
          <div slot="nav" style="display: flex; gap: 1rem; padding: 0.75rem 1.5rem; border-bottom: 1px solid #e5e5e5;">
            <button style="padding: 0.5rem 1rem; background: #284162; color: #ffffff; border: none; border-radius: 0.25rem; cursor: pointer;">
              Accessibility
            </button>
            <button style="padding: 0.5rem 1rem; background: transparent; color: #284162; border: 1px solid #284162; border-radius: 0.25rem; cursor: pointer;">
              Theme
            </button>
            <button style="padding: 0.5rem 1rem; background: transparent; color: #284162; border: 1px solid #284162; border-radius: 0.25rem; cursor: pointer;">
              i18n
            </button>
          </div>
          
          <div style="padding: 1.5rem;">
            <h3 style="margin: 0 0 1rem 0; color: #26374A;">Panel with Tabs</h3>
            <p style="color: #666666; line-height: 1.6;">
              The backstage can include navigation tabs for switching between different settings panels.
            </p>
          </div>
        </eva-backstage-shell>
      </div>
      
      <div style="background: #ffffff; padding: 2rem; border-radius: 0.5rem;">
        <h1 style="margin: 0 0 1rem 0; color: #26374A;">Multi-Panel Settings</h1>
        <p style="color: #666666; line-height: 1.6;">
          Use the <code>nav</code> slot to add tab navigation between different customization panels.
        </p>
      </div>
    </div>
  `,
};

export const CustomTrigger: Story = {
  render: () => html`
    <div style="position: relative; height: 600px; background: #f9f9f9; padding: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #ffffff; border-radius: 0.5rem; margin-bottom: 2rem;">
        <h2 style="margin: 0; color: #26374A;">EVA Chat</h2>
        <eva-backstage-shell title="Preferences" .showTrigger="${false}">
          <button slot="trigger" style="padding: 0.75rem 1.5rem; background: #284162; color: #ffffff; border: none; border-radius: 0.25rem; cursor: pointer;">
            Open Settings
          </button>
          
          <div style="padding: 1.5rem;">
            <h3 style="margin: 0 0 1rem 0; color: #26374A;">Custom Trigger Button</h3>
            <p style="color: #666666; line-height: 1.6;">
              You can provide a custom trigger button instead of the default gear icon.
            </p>
          </div>
        </eva-backstage-shell>
      </div>
      
      <div style="background: #ffffff; padding: 2rem; border-radius: 0.5rem;">
        <h1 style="margin: 0 0 1rem 0; color: #26374A;">Custom Trigger</h1>
        <p style="color: #666666; line-height: 1.6;">
          Use the <code>trigger</code> slot to provide your own button.
        </p>
      </div>
    </div>
  `,
};

export const AccessibilityFeatures: Story = {
  render: () => html`
    <div style="position: relative; height: 600px; background: #f9f9f9; padding: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #ffffff; border-radius: 0.5rem; margin-bottom: 2rem;">
        <h2 style="margin: 0; color: #26374A;">Accessible Backstage</h2>
        <eva-backstage-shell title="WCAG 2.2 AAA Compliant Panel" triggerLabel="Open customization settings">
          <div style="padding: 1.5rem;">
            <h3 style="margin: 0 0 1rem 0; color: #26374A;">Accessibility Features</h3>
            <ul style="color: #666666; line-height: 1.8;">
              <li><strong>Focus trap:</strong> Keyboard focus stays inside panel when open</li>
              <li><strong>Escape key:</strong> Closes panel and restores focus</li>
              <li><strong>ARIA dialog:</strong> role="dialog", aria-modal="true", aria-labelledby</li>
              <li><strong>Screen reader:</strong> Announces panel open/close state</li>
              <li><strong>Overlay:</strong> Closes panel when clicked (mouse users)</li>
            </ul>
          </div>
        </eva-backstage-shell>
      </div>
      
      <div style="background: #ffffff; padding: 2rem; border-radius: 0.5rem;">
        <h1 style="margin: 0 0 1rem 0; color: #26374A;">WCAG 2.2 AAA Compliance</h1>
        <p style="color: #666666; line-height: 1.6;">
          Try opening the panel with keyboard (Tab + Enter), then using Escape to close.
          Focus will be restored to the trigger button.
        </p>
      </div>
    </div>
  `,
};
