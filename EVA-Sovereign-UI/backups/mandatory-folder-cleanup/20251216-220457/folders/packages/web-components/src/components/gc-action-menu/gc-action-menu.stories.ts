import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-action-menu';
import type { GCActionMenu } from './gc-action-menu';

const meta: Meta<GCActionMenu> = {
  title: 'Components/GC Action Menu',
  component: 'gc-action-menu',
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of menu items with text, action, icon, etc.',
    },
    label: {
      control: 'text',
      description: 'Text label for the trigger button',
    },
    icon: {
      control: 'text',
      description: 'Icon for the trigger button (emoji or path)',
    },
    'button-variant': {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Visual style variant for the trigger button',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'right', 'center'],
      description: 'Horizontal alignment of the menu dropdown',
    },
    placement: {
      control: { type: 'select' },
      options: ['bottom', 'top'],
      description: 'Vertical placement of the menu relative to trigger',
    },
    'close-on-select': {
      control: 'boolean',
      description: 'Whether to close menu after selecting an item',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the menu trigger is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<GCActionMenu>;

/**
 * Default action menu with common actions.
 * Click the "Actions" button to see the dropdown menu.
 */
export const Default: Story = {
  render: () => html`
    <gc-action-menu
      .items="${[
        { text: 'Edit', action: () => console.log('Edit clicked') },
        { text: 'View Details', action: () => console.log('View clicked') },
        { divider: true },
        { text: 'Delete', action: () => console.log('Delete clicked'), danger: true },
      ]}"
    ></gc-action-menu>
  `,
};

/**
 * Action menu with icons for visual clarity.
 * Icons help users quickly identify action types.
 */
export const WithIcons: Story = {
  render: () => html`
    <gc-action-menu
      label="File Actions"
      .items="${[
        { text: 'Open', icon: '📂', action: () => console.log('Open') },
        { text: 'Save', icon: '💾', action: () => console.log('Save') },
        { text: 'Export', icon: '📤', action: () => console.log('Export') },
        { divider: true },
        { text: 'Print', icon: '🖨️', action: () => console.log('Print') },
      ]}"
    ></gc-action-menu>
  `,
};

/**
 * Menu with dividers to group related actions.
 * Dividers help organize actions into logical sections.
 */
export const WithDividers: Story = {
  render: () => html`
    <gc-action-menu
      icon="⚙️"
      label="Settings"
      .items="${[
        { text: 'Profile', action: () => console.log('Profile') },
        { text: 'Preferences', action: () => console.log('Preferences') },
        { divider: true },
        { text: 'Privacy', action: () => console.log('Privacy') },
        { text: 'Security', action: () => console.log('Security') },
        { divider: true },
        { text: 'Help', action: () => console.log('Help') },
        { text: 'About', action: () => console.log('About') },
      ]}"
    ></gc-action-menu>
  `,
};

/**
 * Danger actions highlighted in red for destructive operations.
 * Use for actions like Delete, Remove, or Cancel that cannot be undone.
 */
export const DangerActions: Story = {
  render: () => html`
    <gc-action-menu
      label="Document Actions"
      .items="${[
        { text: 'Edit', action: () => console.log('Edit') },
        { text: 'Duplicate', action: () => console.log('Duplicate') },
        { text: 'Archive', action: () => console.log('Archive') },
        { divider: true },
        { text: 'Delete', action: () => console.log('Delete'), danger: true },
      ]}"
    ></gc-action-menu>
  `,
};

/**
 * Menu with some items disabled.
 * Disabled items are grayed out and not clickable.
 */
export const DisabledItems: Story = {
  render: () => html`
    <gc-action-menu
      label="User Actions"
      .items="${[
        { text: 'View Profile', action: () => console.log('View Profile') },
        { text: 'Edit Profile', action: () => console.log('Edit Profile'), disabled: true },
        { divider: true },
        { text: 'Change Password', action: () => console.log('Change Password'), disabled: true },
        { text: 'Sign Out', action: () => console.log('Sign Out') },
      ]}"
    ></gc-action-menu>
  `,
};

/**
 * Menu with href links for navigation instead of actions.
 * Items with href render as anchor tags for proper navigation.
 */
export const WithLinks: Story = {
  render: () => html`
    <gc-action-menu
      label="Quick Links"
      .items="${[
        { text: 'Home', href: '/' },
        { text: 'About', href: '/about' },
        { text: 'Services', href: '/services' },
        { divider: true },
        { text: 'Contact', href: '/contact' },
      ]}"
    ></gc-action-menu>
  `,
};

/**
 * Menu positioned at the top (useful for buttons near the bottom of the page).
 * The menu opens upward instead of downward.
 */
export const TopPlacement: Story = {
  render: () => html`
    <div style="padding-top: 200px;">
      <gc-action-menu
        placement="top"
        .items="${[
          { text: 'Edit', action: () => console.log('Edit') },
          { text: 'Duplicate', action: () => console.log('Duplicate') },
          { text: 'Delete', action: () => console.log('Delete'), danger: true },
        ]}"
      ></gc-action-menu>
    </div>
  `,
};

/**
 * Menu aligned to the right (useful for right-side UI elements).
 * The menu's right edge aligns with the trigger's right edge.
 */
export const RightAlign: Story = {
  render: () => html`
    <div style="display: flex; justify-content: flex-end;">
      <gc-action-menu
        align="right"
        label="Options"
        .items="${[
          { text: 'Settings', action: () => console.log('Settings') },
          { text: 'Profile', action: () => console.log('Profile') },
          { text: 'Sign Out', action: () => console.log('Sign Out') },
        ]}"
      ></gc-action-menu>
    </div>
  `,
};

/**
 * Menu aligned to the center (useful for centered UI elements).
 * The menu centers horizontally relative to the trigger.
 */
export const CenterAlign: Story = {
  render: () => html`
    <div style="display: flex; justify-content: center;">
      <gc-action-menu
        align="center"
        label="Actions"
        .items="${[
          { text: 'Edit', action: () => console.log('Edit') },
          { text: 'Delete', action: () => console.log('Delete'), danger: true },
        ]}"
      ></gc-action-menu>
    </div>
  `,
};

/**
 * Menu that stays open after selecting an item (set close-on-select to false).
 * Useful for menus with checkboxes or multiple selections.
 */
export const StaysOpenOnSelect: Story = {
  render: () => html`
    <gc-action-menu
      close-on-select="false"
      label="Filter Options"
      .items="${[
        { text: 'All Items', action: () => console.log('All') },
        { text: 'Active Only', action: () => console.log('Active') },
        { text: 'Archived Only', action: () => console.log('Archived') },
      ]}"
    ></gc-action-menu>
  `,
};

/**
 * Icon-only trigger button (no text label).
 * Useful for compact toolbars or when space is limited.
 */
export const IconOnly: Story = {
  render: () => html`
    <gc-action-menu
      icon="⋮"
      label=""
      show-caret="false"
      .items="${[
        { text: 'Edit', action: () => console.log('Edit') },
        { text: 'Share', action: () => console.log('Share') },
        { text: 'Delete', action: () => console.log('Delete'), danger: true },
      ]}"
    ></gc-action-menu>
  `,
};

/**
 * Disabled menu trigger.
 * The button is grayed out and clicking has no effect.
 */
export const Disabled: Story = {
  render: () => html`
    <gc-action-menu
      disabled
      .items="${[
        { text: 'Edit', action: () => console.log('Edit') },
        { text: 'Delete', action: () => console.log('Delete') },
      ]}"
    ></gc-action-menu>
  `,
};

/**
 * Primary button variant with filled background.
 * Use for primary actions that need high visual prominence.
 */
export const PrimaryButton: Story = {
  render: () => html`
    <gc-action-menu
      button-variant="primary"
      label="Primary Actions"
      .items="${[
        { text: 'Save', action: () => console.log('Save') },
        { text: 'Submit', action: () => console.log('Submit') },
        { text: 'Publish', action: () => console.log('Publish') },
      ]}"
    ></gc-action-menu>
  `,
};

/**
 * Tertiary button variant with minimal styling.
 * Use for less prominent actions or when button should blend in.
 */
export const TertiaryButton: Story = {
  render: () => html`
    <gc-action-menu
      button-variant="tertiary"
      label="More Options"
      .items="${[
        { text: 'Details', action: () => console.log('Details') },
        { text: 'History', action: () => console.log('History') },
        { text: 'Export', action: () => console.log('Export') },
      ]}"
    ></gc-action-menu>
  `,
};

/**
 * French language support (fr-CA).
 * All UI text is automatically translated to French.
 */
export const French: Story = {
  render: () => html`
    <gc-action-menu
      locale="fr-CA"
      .items="${[
        { text: 'Modifier', action: () => console.log('Modifier') },
        { text: 'Afficher les détails', action: () => console.log('Afficher') },
        { divider: true },
        { text: 'Supprimer', action: () => console.log('Supprimer'), danger: true },
      ]}"
    ></gc-action-menu>
  `,
};

/**
 * Event tracking demonstration.
 * Shows all events emitted by the action menu component.
 */
export const EventTracking: Story = {
  render: () => {
    const logEvent = (eventName: string, detail: any) => {
      const log = document.getElementById('event-log');
      if (log) {
        const entry = document.createElement('div');
        entry.style.padding = '0.5rem';
        entry.style.borderBottom = '1px solid #e0e0e0';
        entry.innerHTML = `
          <strong>${eventName}</strong>: ${JSON.stringify(detail, null, 2)}
          <br><small>${new Date().toLocaleTimeString()}</small>
        `;
        log.insertBefore(entry, log.firstChild);
        // Keep only last 10 events
        while (log.children.length > 10) {
          log.removeChild(log.lastChild!);
        }
      }
    };

    setTimeout(() => {
      const menu = document.querySelector('gc-action-menu');
      if (menu) {
        menu.addEventListener('gc-action-select', (e: Event) => {
          logEvent('gc-action-select', (e as CustomEvent).detail);
        });
        menu.addEventListener('gc-action-menu-toggle', (e: Event) => {
          logEvent('gc-action-menu-toggle', (e as CustomEvent).detail);
        });
      }
    }, 100);

    return html`
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div>
          <h3>Action Menu</h3>
          <gc-action-menu
            .items="${[
              { text: 'Edit', icon: '✏️', action: () => console.log('Edit') },
              { text: 'Share', icon: '🔗', action: () => console.log('Share') },
              { divider: true },
              { text: 'Delete', icon: '🗑️', action: () => console.log('Delete'), danger: true },
            ]}"
          ></gc-action-menu>
        </div>
        <div>
          <h3>Event Log</h3>
          <div
            id="event-log"
            style="
              border: 1px solid #e0e0e0;
              border-radius: 4px;
              max-height: 400px;
              overflow-y: auto;
              font-family: monospace;
              font-size: 0.875rem;
            "
          ></div>
        </div>
      </div>
    `;
  },
};

/**
 * Keyboard navigation demonstration.
 * Shows all keyboard shortcuts and accessibility features.
 */
export const KeyboardNavigationDemo: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h3>Keyboard Navigation</h3>
      <gc-action-menu
        .items="${[
          { text: 'Edit', icon: '✏️', action: () => console.log('Edit') },
          { text: 'Duplicate', icon: '📋', action: () => console.log('Duplicate') },
          { text: 'Share', icon: '🔗', action: () => console.log('Share') },
          { divider: true },
          { text: 'Archive', icon: '📦', action: () => console.log('Archive') },
          { text: 'Delete', icon: '🗑️', action: () => console.log('Delete'), danger: true },
        ]}"
      ></gc-action-menu>

      <div style="margin-top: 2rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;">
        <h4>Keyboard Shortcuts</h4>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 0.5rem; border-bottom: 2px solid #ccc;">Key</th>
              <th style="text-align: left; padding: 0.5rem; border-bottom: 2px solid #ccc;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 0.5rem; border-bottom: 1px solid #e0e0e0;">
                <kbd>Space</kbd> / <kbd>Enter</kbd>
              </td>
              <td style="padding: 0.5rem; border-bottom: 1px solid #e0e0e0;">
                Open/close menu (when trigger focused)
              </td>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border-bottom: 1px solid #e0e0e0;">
                <kbd>↓</kbd> Arrow Down
              </td>
              <td style="padding: 0.5rem; border-bottom: 1px solid #e0e0e0;">
                Move focus to next item (wraps to first)
              </td>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border-bottom: 1px solid #e0e0e0;">
                <kbd>↑</kbd> Arrow Up
              </td>
              <td style="padding: 0.5rem; border-bottom: 1px solid #e0e0e0;">
                Move focus to previous item (wraps to last)
              </td>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border-bottom: 1px solid #e0e0e0;">
                <kbd>Home</kbd>
              </td>
              <td style="padding: 0.5rem; border-bottom: 1px solid #e0e0e0;">
                Jump to first menu item
              </td>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border-bottom: 1px solid #e0e0e0;">
                <kbd>End</kbd>
              </td>
              <td style="padding: 0.5rem; border-bottom: 1px solid #e0e0e0;">
                Jump to last menu item
              </td>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border-bottom: 1px solid #e0e0e0;">
                <kbd>Enter</kbd> / <kbd>Space</kbd>
              </td>
              <td style="padding: 0.5rem; border-bottom: 1px solid #e0e0e0;">
                Activate focused menu item
              </td>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border-bottom: 1px solid #e0e0e0;">
                <kbd>Escape</kbd> / <kbd>Tab</kbd>
              </td>
              <td style="padding: 0.5rem; border-bottom: 1px solid #e0e0e0;">
                Close menu and return focus to trigger
              </td>
            </tr>
          </tbody>
        </table>

        <h4 style="margin-top: 1.5rem;">Accessibility Features</h4>
        <ul style="margin: 0; padding-left: 1.5rem;">
          <li>ARIA menu pattern with proper roles and states</li>
          <li>Keyboard navigation with circular wrapping</li>
          <li>Focus visible states for all interactive elements</li>
          <li>Screen reader announcements for menu state changes</li>
          <li>Support for custom ARIA labels</li>
          <li>Disabled items marked with aria-disabled</li>
          <li>Dividers marked with role="separator"</li>
          <li>Click-outside to close for natural UX</li>
          <li>Focus restored to trigger when menu closes</li>
          <li>High contrast mode support</li>
          <li>Reduced motion support</li>
        </ul>
      </div>
    </div>
  `,
};
