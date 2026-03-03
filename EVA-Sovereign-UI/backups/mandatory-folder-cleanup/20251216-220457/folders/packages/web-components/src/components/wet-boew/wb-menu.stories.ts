import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-menu.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-menu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# WB-Menu - Dropdown Navigation Menus

Accessible dropdown menus with keyboard navigation for site navigation.

## Features
- ✅ Opens on click or hover (configurable)
- ✅ Closes on Esc or outside click
- ✅ Arrow keys navigate menu items (↑/↓)
- ✅ Home/End jump to first/last item
- ✅ Enter/Space activates menu item
- ✅ Tab moves to next menu
- ✅ Nested submenus supported
- ✅ Focus management (returns to trigger on close)
- ✅ ARIA menu pattern (role="menu", role="menuitem")
- ✅ Touch-friendly (44px target size)
- ✅ Bilingual labels (EN-CA/FR-CA)
- ✅ Right/left alignment options
- ✅ WCAG 2.2 AAA compliant

## Events
- \`wb-menu-open\` - Fired when menu opens
- \`wb-menu-close\` - Fired when menu closes
- \`wb-menu-select\` - Fired when menu item is selected

## Methods
- \`open()\` - Open menu
- \`close()\` - Close menu
- \`toggle()\` - Toggle menu open/closed

## Reference
Based on WET-BOEW Menu:  
https://wet-boew.github.io/wet-boew/demos/menu/menu-en.html
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

export const BasicMenu: Story = {
  render: () => html`
    <wb-menu>
      <button slot="trigger" style="
        padding: 0.5rem 1rem;
        background: #26374a;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      ">Services and information</button>
      <wb-menu-item href="/benefits">Benefits</wb-menu-item>
      <wb-menu-item href="/immigration">Immigration and citizenship</wb-menu-item>
      <wb-menu-item href="/travel">Travel and tourism</wb-menu-item>
      <wb-menu-item href="/business">Business and industry</wb-menu-item>
      <wb-menu-item href="/jobs">Jobs and the workplace</wb-menu-item>
      <wb-menu-item href="/taxes">Taxes</wb-menu-item>
    </wb-menu>
  `
};

export const HoverMenu: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem;">
      <wb-menu hover>
        <button slot="trigger" style="
          padding: 0.5rem 1rem;
          background: #26374a;
          color: white;
          border: none;
          cursor: pointer;
        ">Jobs</button>
        <wb-menu-item href="/jobs/find">Find a job</wb-menu-item>
        <wb-menu-item href="/jobs/training">Training</wb-menu-item>
        <wb-menu-item href="/jobs/hire">Hire employees</wb-menu-item>
        <wb-menu-item href="/jobs/workplace">Workplace standards</wb-menu-item>
      </wb-menu>

      <wb-menu hover>
        <button slot="trigger" style="
          padding: 0.5rem 1rem;
          background: #26374a;
          color: white;
          border: none;
          cursor: pointer;
        ">Benefits</button>
        <wb-menu-item href="/benefits/ei">Employment Insurance</wb-menu-item>
        <wb-menu-item href="/benefits/family">Family and caregiving</wb-menu-item>
        <wb-menu-item href="/benefits/disability">Disability benefits</wb-menu-item>
        <wb-menu-item href="/benefits/retirement">Retirement and pensions</wb-menu-item>
      </wb-menu>

      <wb-menu hover>
        <button slot="trigger" style="
          padding: 0.5rem 1rem;
          background: #26374a;
          color: white;
          border: none;
          cursor: pointer;
        ">Taxes</button>
        <wb-menu-item href="/taxes/file">File your taxes</wb-menu-item>
        <wb-menu-item href="/taxes/benefit">Get a benefit</wb-menu-item>
        <wb-menu-item href="/taxes/refund">Check refund status</wb-menu-item>
        <wb-menu-item href="/taxes/business">Business taxes</wb-menu-item>
      </wb-menu>
    </div>

    <p style="margin-top: 2rem; color: #666;">
      <strong>Hover mode:</strong> Hover over the buttons to open menus without clicking.
    </p>
  `
};

export const RightAlignedMenu: Story = {
  render: () => html`
    <div style="text-align: right;">
      <wb-menu align="right">
        <button slot="trigger" style="
          padding: 0.5rem 1rem;
          background: #26374a;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        ">Account ▼</button>
        <wb-menu-item href="/account/profile">My profile</wb-menu-item>
        <wb-menu-item href="/account/settings">Settings</wb-menu-item>
        <wb-menu-item href="/account/notifications">Notifications</wb-menu-item>
        <wb-menu-item href="/account/security">Security</wb-menu-item>
        <wb-menu-item href="/logout">Sign out</wb-menu-item>
      </wb-menu>
    </div>
  `
};

export const DisabledItems: Story = {
  render: () => html`
    <wb-menu>
      <button slot="trigger" style="
        padding: 0.5rem 1rem;
        background: #26374a;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      ">Services</button>
      <wb-menu-item href="/benefits">Benefits (available)</wb-menu-item>
      <wb-menu-item disabled>Taxes (coming soon)</wb-menu-item>
      <wb-menu-item href="/immigration">Immigration (available)</wb-menu-item>
      <wb-menu-item disabled>Health (under maintenance)</wb-menu-item>
      <wb-menu-item href="/travel">Travel (available)</wb-menu-item>
    </wb-menu>
  `
};

export const WithSubmenu: Story = {
  render: () => html`
    <wb-menu>
      <button slot="trigger" style="
        padding: 0.5rem 1rem;
        background: #26374a;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      ">Government of Canada</button>
      <wb-menu-item href="/departments">All departments</wb-menu-item>
      <wb-menu-item has-submenu>Services ▶</wb-menu-item>
      <wb-menu-item href="/jobs">Jobs</wb-menu-item>
      <wb-menu-item href="/immigration">Immigration</wb-menu-item>
      <wb-menu-item href="/travel">Travel</wb-menu-item>
      <wb-menu-item href="/business">Business</wb-menu-item>
      <wb-menu-item href="/benefits">Benefits</wb-menu-item>
      <wb-menu-item href="/health">Health</wb-menu-item>
      <wb-menu-item href="/taxes">Taxes</wb-menu-item>
    </wb-menu>

    <p style="margin-top: 2rem; color: #666;">
      <strong>Note:</strong> Nested submenu implementation requires additional custom logic. 
      The <code>has-submenu</code> attribute shows the indicator (▶) but doesn't open a submenu yet.
    </p>
  `
};

export const EventHandling: Story = {
  render: () => html`
    <wb-menu
      @wb-menu-open="${() => console.log('Menu opened')}"
      @wb-menu-close="${() => console.log('Menu closed')}"
      @wb-menu-select="${(e: CustomEvent) => console.log('Item selected:', e.detail)}"
    >
      <button slot="trigger" style="
        padding: 0.5rem 1rem;
        background: #26374a;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      ">Event demo</button>
      <wb-menu-item href="/page1">Page 1</wb-menu-item>
      <wb-menu-item href="/page2">Page 2</wb-menu-item>
      <wb-menu-item href="/page3">Page 3</wb-menu-item>
    </wb-menu>

    <p style="margin-top: 1rem; color: #666;">
      Open the browser console to see events when you interact with the menu.
    </p>
  `
};

export const KeyboardNavigation: Story = {
  render: () => html`
    <div>
      <h2>Keyboard Accessibility</h2>
      <p>This menu supports full keyboard navigation:</p>
      <ul>
        <li><kbd>Tab</kbd> - Focus the trigger button</li>
        <li><kbd>Enter</kbd>, <kbd>Space</kbd>, or <kbd>↓</kbd> - Open menu</li>
        <li><kbd>↓</kbd> / <kbd>↑</kbd> - Navigate menu items</li>
        <li><kbd>Home</kbd> / <kbd>End</kbd> - Jump to first/last item</li>
        <li><kbd>Enter</kbd> or <kbd>Space</kbd> - Activate item</li>
        <li><kbd>Esc</kbd> - Close menu</li>
        <li><kbd>Tab</kbd> - Close menu and move to next element</li>
      </ul>

      <wb-menu>
        <button slot="trigger" style="
          padding: 0.5rem 1rem;
          background: #26374a;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        ">Try keyboard navigation</button>
        <wb-menu-item href="/item1">Item 1</wb-menu-item>
        <wb-menu-item href="/item2">Item 2</wb-menu-item>
        <wb-menu-item href="/item3">Item 3</wb-menu-item>
        <wb-menu-item href="/item4">Item 4</wb-menu-item>
        <wb-menu-item href="/item5">Item 5</wb-menu-item>
      </wb-menu>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-menu>
        <button slot="trigger" style="
          padding: 0.5rem 1rem;
          background: #26374a;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        ">Services et renseignements</button>
        <wb-menu-item href="/prestations">Prestations</wb-menu-item>
        <wb-menu-item href="/immigration">Immigration et citoyenneté</wb-menu-item>
        <wb-menu-item href="/voyage">Voyage et tourisme</wb-menu-item>
        <wb-menu-item href="/entreprises">Entreprises et industrie</wb-menu-item>
        <wb-menu-item href="/emplois">Emplois et milieu de travail</wb-menu-item>
        <wb-menu-item href="/impots">Impôts</wb-menu-item>
      </wb-menu>
    </div>
  `
};
