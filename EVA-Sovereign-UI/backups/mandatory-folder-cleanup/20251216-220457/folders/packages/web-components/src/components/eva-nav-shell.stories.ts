import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eva-nav-shell.js';

const meta: Meta = {
  title: 'Components/Navigation/NavShell',
  component: 'eva-nav-shell',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['sidebar', 'tabs'],
      description: 'Navigation mode',
    },
    open: {
      control: 'boolean',
      description: 'Sidebar open state (sidebar mode only)',
    },
    collapsed: {
      control: 'boolean',
      description: 'Collapsed sidebar (desktop only)',
    },
    navLabel: {
      control: 'text',
      description: 'ARIA label for navigation',
    },
  },
};

export default meta;
type Story = StoryObj;

export const SidebarMode: Story = {
  render: () => html`
    <div style="height: 600px;">
      <eva-nav-shell mode="sidebar" open>
        <div slot="header" style="padding: 0.5rem; font-weight: 700; color: #ffffff;">
          EVA Suite
        </div>
        
        <div slot="nav-items" style="display: flex; flex-direction: column; gap: 0.5rem; padding: 0.5rem;">
          <a href="#" style="padding: 0.75rem 1rem; color: #ffffff; text-decoration: none; border-radius: 0.25rem; transition: background-color 200ms;">
            🏠 Dashboard
          </a>
          <a href="#" style="padding: 0.75rem 1rem; color: #ffffff; text-decoration: none; border-radius: 0.25rem; background-color: rgba(255,255,255,0.1);">
            💬 Chat
          </a>
          <a href="#" style="padding: 0.75rem 1rem; color: #ffffff; text-decoration: none; border-radius: 0.25rem; transition: background-color 200ms;">
            📊 Analytics
          </a>
          <a href="#" style="padding: 0.75rem 1rem; color: #ffffff; text-decoration: none; border-radius: 0.25rem; transition: background-color 200ms;">
            ⚙️ Settings
          </a>
        </div>
        
        <main style="padding: 2rem;">
          <h1 style="margin: 0 0 1rem 0; color: #26374A;">Main Content Area</h1>
          <p style="color: #666666; line-height: 1.6;">
            This is the main content area. The sidebar can be toggled using the hamburger menu button.
            On mobile devices, the sidebar slides in from the left. On desktop, it's always visible.
          </p>
        </main>
      </eva-nav-shell>
    </div>
  `,
};

export const TabsMode: Story = {
  render: () => html`
    <div style="height: 600px;">
      <eva-nav-shell mode="tabs">
        <div slot="nav-items" style="display: flex; gap: 0.5rem;">
          <a href="#" style="padding: 0.75rem 1.5rem; color: #ffffff; text-decoration: none; background-color: rgba(255,255,255,0.1); border-radius: 0.25rem;">
            Dashboard
          </a>
          <a href="#" style="padding: 0.75rem 1.5rem; color: #ffffff; text-decoration: none; transition: background-color 200ms;">
            Chat
          </a>
          <a href="#" style="padding: 0.75rem 1.5rem; color: #ffffff; text-decoration: none; transition: background-color 200ms;">
            Analytics
          </a>
          <a href="#" style="padding: 0.75rem 1.5rem; color: #ffffff; text-decoration: none; transition: background-color 200ms;">
            Settings
          </a>
        </div>
        
        <main style="padding: 2rem;">
          <h1 style="margin: 0 0 1rem 0; color: #26374A;">Tab Navigation</h1>
          <p style="color: #666666; line-height: 1.6;">
            This mode shows horizontal tabs at the top of the page.
            Ideal for applications with fewer navigation items or when vertical space is limited.
          </p>
        </main>
      </eva-nav-shell>
    </div>
  `,
};

export const CollapsedSidebar: Story = {
  render: () => html`
    <div style="height: 600px;">
      <eva-nav-shell mode="sidebar" collapsed>
        <div slot="header" style="text-align: center; font-size: 1.5rem;">
          🚀
        </div>
        
        <div slot="nav-items" style="display: flex; flex-direction: column; gap: 0.5rem; padding: 0.5rem;">
          <a href="#" style="padding: 0.75rem; color: #ffffff; text-decoration: none; text-align: center; font-size: 1.25rem; border-radius: 0.25rem;">
            🏠
          </a>
          <a href="#" style="padding: 0.75rem; color: #ffffff; text-decoration: none; text-align: center; font-size: 1.25rem; background-color: rgba(255,255,255,0.1); border-radius: 0.25rem;">
            💬
          </a>
          <a href="#" style="padding: 0.75rem; color: #ffffff; text-decoration: none; text-align: center; font-size: 1.25rem; border-radius: 0.25rem;">
            📊
          </a>
          <a href="#" style="padding: 0.75rem; color: #ffffff; text-decoration: none; text-align: center; font-size: 1.25rem; border-radius: 0.25rem;">
            ⚙️
          </a>
        </div>
        
        <main style="padding: 2rem;">
          <h1 style="margin: 0 0 1rem 0; color: #26374A;">Collapsed Sidebar</h1>
          <p style="color: #666666; line-height: 1.6;">
            The sidebar can be collapsed to show only icons, saving horizontal space.
            This is useful for applications that need more space for content.
          </p>
        </main>
      </eva-nav-shell>
    </div>
  `,
};

export const InteractiveToggle: Story = {
  render: () => {
    return html`
      <div style="height: 600px;">
        <eva-nav-shell mode="sidebar">
          <div slot="header" style="padding: 0.5rem; font-weight: 700; color: #ffffff;">
            EVA Suite
          </div>
          
          <div slot="nav-items" style="display: flex; flex-direction: column; gap: 0.5rem; padding: 0.5rem;">
            <a href="#" style="padding: 0.75rem 1rem; color: #ffffff; text-decoration: none; border-radius: 0.25rem;">
              Dashboard
            </a>
            <a href="#" style="padding: 0.75rem 1rem; color: #ffffff; text-decoration: none; border-radius: 0.25rem; background-color: rgba(255,255,255,0.1);">
              Chat
            </a>
            <a href="#" style="padding: 0.75rem 1rem; color: #ffffff; text-decoration: none; border-radius: 0.25rem;">
              Settings
            </a>
          </div>
          
          <main style="padding: 2rem;">
            <h1 style="margin: 0 0 1rem 0; color: #26374A;">Interactive Demo</h1>
            <p style="color: #666666; line-height: 1.6;">
              Click the hamburger menu (≡) button in the sidebar header to toggle open/closed.
              On mobile viewports (<768px), the sidebar will slide in as an overlay.
            </p>
            <p style="color: #666666; line-height: 1.6; margin-top: 1rem;">
              <strong>Keyboard navigation:</strong> Use Tab to focus navigation items, Arrow keys to move between them, Enter to activate, and Escape to close.
            </p>
          </main>
        </eva-nav-shell>
      </div>
    `;
  },
};

export const AccessibilityDemo: Story = {
  render: () => html`
    <div style="height: 600px;">
      <eva-nav-shell mode="sidebar" navLabel="Main application navigation">
        <div slot="header" style="padding: 0.5rem; font-weight: 700; color: #ffffff;">
          Accessible Navigation
        </div>
        
        <div slot="nav-items" style="display: flex; flex-direction: column; gap: 0.5rem; padding: 0.5rem;">
          <a href="#main-content" style="padding: 0.75rem 1rem; color: #ffffff; text-decoration: none; border-radius: 0.25rem;">
            Skip to content
          </a>
          <a href="#" style="padding: 0.75rem 1rem; color: #ffffff; text-decoration: none; border-radius: 0.25rem;" aria-current="page">
            Current Page
          </a>
          <a href="#" style="padding: 0.75rem 1rem; color: #ffffff; text-decoration: none; border-radius: 0.25rem;">
            Another Page
          </a>
        </div>
        
        <main style="padding: 2rem;">
          <h1 style="margin: 0 0 1rem 0; color: #26374A;">WCAG 2.2 AAA Compliant</h1>
          <ul style="color: #666666; line-height: 1.8;">
            <li><strong>Keyboard navigation:</strong> Full keyboard support with Tab, Arrow keys, Home, End, Enter, Escape</li>
            <li><strong>ARIA landmarks:</strong> role="navigation" with descriptive aria-label</li>
            <li><strong>Skip link:</strong> "Skip to main content" visible on keyboard focus</li>
            <li><strong>Touch targets:</strong> Minimum 44x44px for all interactive elements</li>
            <li><strong>Screen reader:</strong> Announces panel state changes</li>
          </ul>
        </main>
      </eva-nav-shell>
    </div>
  `,
};
