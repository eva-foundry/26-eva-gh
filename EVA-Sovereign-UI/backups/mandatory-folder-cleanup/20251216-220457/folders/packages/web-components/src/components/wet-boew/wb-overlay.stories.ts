import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-overlay.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-overlay',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# WB-Overlay - Modal Overlays

Accessible modal dialogs with backdrop and focus management.

## Features
- ✅ Modal backdrop (blocks background interaction)
- ✅ Focus trap (Tab/Shift+Tab cycles within modal)
- ✅ Esc key closes modal (configurable)
- ✅ Backdrop click closes modal (configurable)
- ✅ Focus management (returns to trigger on close)
- ✅ Prevent body scroll when open
- ✅ ARIA dialog pattern (role="dialog", aria-modal="true")
- ✅ Screen reader announcements
- ✅ Smooth fade-in/out animations
- ✅ 4 size options (small, medium, large, full)
- ✅ Header, content, and footer slots
- ✅ Optional close button
- ✅ Bilingual labels (EN-CA/FR-CA)
- ✅ WCAG 2.2 AAA compliant

## Events
- \`wb-overlay-open\` - Fired when overlay opens
- \`wb-overlay-close\` - Fired when overlay closes

## Methods
- \`showModal()\` - Open modal
- \`close()\` - Close modal
- \`toggle()\` - Toggle modal open/closed

## Keyboard Navigation
- \`Tab\` - Cycle through focusable elements (trapped inside modal)
- \`Shift + Tab\` - Cycle backwards
- \`Esc\` - Close modal (if \`close-on-esc\` enabled)

## Reference
Based on WET-BOEW overlay patterns and ARIA dialog best practices.
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

export const BasicModal: Story = {
  render: () => html`
    <button onclick="document.getElementById('basic-modal').showModal()">Open Modal</button>

    <wb-overlay id="basic-modal">
      <h2 slot="header">Welcome to Canada.ca</h2>
      <p>This is a basic modal dialog demonstrating the wb-overlay component.</p>
      <p>You can close this modal by:</p>
      <ul>
        <li>Clicking the × button</li>
        <li>Pressing the Escape key</li>
        <li>Clicking outside the modal (on the backdrop)</li>
      </ul>
      <div slot="footer" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
        <button onclick="document.getElementById('basic-modal').close()">Close</button>
      </div>
    </wb-overlay>
  `
};

export const ConfirmationDialog: Story = {
  render: () => html`
    <button onclick="document.getElementById('confirm-modal').showModal()">Delete Account</button>

    <wb-overlay id="confirm-modal" size="small">
      <h2 slot="header">Confirm deletion</h2>
      <p><strong>Are you sure you want to delete your account?</strong></p>
      <p>This action cannot be undone. All your data will be permanently removed.</p>
      <div slot="footer" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
        <button
          onclick="document.getElementById('confirm-modal').close()"
          style="padding: 0.5rem 1rem; background: #eee; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;"
        >
          Cancel
        </button>
        <button
          onclick="alert('Account deleted!'); document.getElementById('confirm-modal').close();"
          style="padding: 0.5rem 1rem; background: #d3080c; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Delete Account
        </button>
      </div>
    </wb-overlay>
  `
};

export const FormModal: Story = {
  render: () => html`
    <button onclick="document.getElementById('form-modal').showModal()">Contact Us</button>

    <wb-overlay id="form-modal">
      <h2 slot="header">Contact Government of Canada</h2>
      <form>
        <div style="margin-bottom: 1rem;">
          <label for="name" style="display: block; margin-bottom: 0.25rem;">Name:</label>
          <input
            type="text"
            id="name"
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
            required
          />
        </div>
        <div style="margin-bottom: 1rem;">
          <label for="email" style="display: block; margin-bottom: 0.25rem;">Email:</label>
          <input
            type="email"
            id="email"
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
            required
          />
        </div>
        <div style="margin-bottom: 1rem;">
          <label for="message" style="display: block; margin-bottom: 0.25rem;">Message:</label>
          <textarea
            id="message"
            rows="4"
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
            required
          ></textarea>
        </div>
      </form>
      <div slot="footer" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
        <button
          onclick="document.getElementById('form-modal').close()"
          style="padding: 0.5rem 1rem; background: #eee; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;"
        >
          Cancel
        </button>
        <button
          onclick="alert('Message sent!'); document.getElementById('form-modal').close();"
          style="padding: 0.5rem 1rem; background: #26374a; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Send Message
        </button>
      </div>
    </wb-overlay>
  `
};

export const LargeModal: Story = {
  render: () => html`
    <button onclick="document.getElementById('large-modal').showModal()">View Terms of Service</button>

    <wb-overlay id="large-modal" size="large">
      <h2 slot="header">Terms of Service</h2>
      <div style="max-height: 400px; overflow-y: auto;">
        <h3>1. Introduction</h3>
        <p>
          Welcome to Canada.ca. These terms and conditions outline the rules and regulations 
          for the use of Government of Canada's Website.
        </p>
        <h3>2. Intellectual Property Rights</h3>
        <p>
          Unless otherwise stated, Government of Canada and/or its licensors own the intellectual 
          property rights for all material on Canada.ca. All intellectual property rights are reserved.
        </p>
        <h3>3. Restrictions</h3>
        <p>You are specifically restricted from all of the following:</p>
        <ul>
          <li>Publishing any Website material in any other media</li>
          <li>Selling, sublicensing and/or otherwise commercializing any Website material</li>
          <li>Publicly performing and/or showing any Website material</li>
          <li>Using this Website in any way that is or may be damaging to this Website</li>
          <li>Using this Website in any way that impacts user access to this Website</li>
        </ul>
        <h3>4. Your Privacy</h3>
        <p>
          Please read our Privacy Policy carefully before using our services.
        </p>
        <h3>5. No warranties</h3>
        <p>
          This Website is provided "as is," with all faults, and Government of Canada expresses 
          no representations or warranties, of any kind related to this Website.
        </p>
      </div>
      <div slot="footer" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
        <button
          onclick="document.getElementById('large-modal').close()"
          style="padding: 0.5rem 1rem; background: #26374a; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          I Understand
        </button>
      </div>
    </wb-overlay>
  `
};

export const NoBackdropClose: Story = {
  render: () => html`
    <button onclick="document.getElementById('no-backdrop-modal').showModal()">
      Open Modal (No Backdrop Close)
    </button>

    <wb-overlay id="no-backdrop-modal" close-on-backdrop="false">
      <h2 slot="header">Important Notice</h2>
      <p><strong>Please read carefully before closing.</strong></p>
      <p>
        This modal cannot be closed by clicking outside. You must use the Close button 
        or press the Escape key.
      </p>
      <div slot="footer" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
        <button
          onclick="document.getElementById('no-backdrop-modal').close()"
          style="padding: 0.5rem 1rem; background: #26374a; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Close
        </button>
      </div>
    </wb-overlay>
  `
};

export const NoEscapeClose: Story = {
  render: () => html`
    <button onclick="document.getElementById('no-esc-modal').showModal()">
      Open Modal (No Escape Close)
    </button>

    <wb-overlay id="no-esc-modal" close-on-esc="false">
      <h2 slot="header">Mandatory Action Required</h2>
      <p><strong>You must make a selection to continue.</strong></p>
      <p>
        This modal cannot be closed with the Escape key. You must click one of the buttons below.
      </p>
      <div slot="footer" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
        <button
          onclick="alert('Option A selected'); document.getElementById('no-esc-modal').close();"
          style="padding: 0.5rem 1rem; background: #26374a; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Option A
        </button>
        <button
          onclick="alert('Option B selected'); document.getElementById('no-esc-modal').close();"
          style="padding: 0.5rem 1rem; background: #26374a; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Option B
        </button>
      </div>
    </wb-overlay>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <button onclick="document.getElementById('fr-modal').showModal()">Ouvrir la boîte de dialogue</button>

      <wb-overlay id="fr-modal">
        <h2 slot="header">Bienvenue sur Canada.ca</h2>
        <p>Ceci est un exemple de dialogue modal en français.</p>
        <p>Vous pouvez fermer cette boîte de dialogue en :</p>
        <ul>
          <li>Cliquant sur le bouton ×</li>
          <li>Appuyant sur la touche Échap</li>
          <li>Cliquant à l'extérieur de la boîte de dialogue</li>
        </ul>
        <div slot="footer" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
          <button onclick="document.getElementById('fr-modal').close()">Fermer</button>
        </div>
      </wb-overlay>
    </div>
  `
};
