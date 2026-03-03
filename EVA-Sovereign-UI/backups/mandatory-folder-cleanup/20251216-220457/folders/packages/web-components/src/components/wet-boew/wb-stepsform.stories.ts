import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-stepsform.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-stepsform',
  component: 'wb-stepsform',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# wb-stepsform - Multi-Step Wizard Forms

WET-BOEW 4.x plugin reimplemented as modern Lit 3.x Web Component.

Breaks long forms into multiple steps with progress indicator.

**Reference**: https://wet-boew.github.io/wet-boew/demos/stepsform/stepsform-en.html

## Features
- ✅ Visual progress indicator
- ✅ Step-by-step validation
- ✅ Previous/Next navigation
- ✅ Jump to completed steps
- ✅ Save/restore progress (localStorage)
- ✅ Keyboard shortcuts (Ctrl+Left/Right)
- ✅ Accessible (ARIA, screen reader announcements)
- ✅ Bilingual (EN-CA/FR-CA)
- ✅ Mobile responsive
        `
      }
    }
  },
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Current active step (1-indexed)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' }
      }
    },
    totalSteps: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Total number of steps',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' }
      }
    },
    saveProgress: {
      control: 'boolean',
      description: 'Save progress to localStorage',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
};

export default meta;
type Story = StoryObj;

export const BasicWizard: Story = {
  render: () => html`
    <wb-stepsform
      current-step="1"
      total-steps="3"
      .stepLabels=${['Personal Info', 'Contact Details', 'Review']}
    >
      <div data-step="1">
        <h3>Step 1: Personal Information</h3>
        <div style="margin-bottom: 1rem;">
          <label for="first-name" style="display: block; margin-bottom: 0.5rem;">
            First Name <span style="color: #d3080c;">*</span>
          </label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>
        <div style="margin-bottom: 1rem;">
          <label for="last-name" style="display: block; margin-bottom: 0.5rem;">
            Last Name <span style="color: #d3080c;">*</span>
          </label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>
      </div>

      <div data-step="2">
        <h3>Step 2: Contact Details</h3>
        <div style="margin-bottom: 1rem;">
          <label for="email-step2" style="display: block; margin-bottom: 0.5rem;">
            Email Address <span style="color: #d3080c;">*</span>
          </label>
          <input
            type="email"
            id="email-step2"
            name="email"
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>
        <div style="margin-bottom: 1rem;">
          <label for="phone-step2" style="display: block; margin-bottom: 0.5rem;">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone-step2"
            name="phone"
            placeholder="613-555-0100"
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>
      </div>

      <div data-step="3">
        <h3>Step 3: Review & Submit</h3>
        <p>Please review your information before submitting.</p>
        <div style="background: #f5f5f5; padding: 1rem; border-radius: 4px; margin-top: 1rem;">
          <p><strong>First Name:</strong> <span id="review-first-name"></span></p>
          <p><strong>Last Name:</strong> <span id="review-last-name"></span></p>
          <p><strong>Email:</strong> <span id="review-email"></span></p>
          <p><strong>Phone:</strong> <span id="review-phone"></span></p>
        </div>
      </div>
    </wb-stepsform>
  `
};

export const FiveStepWizard: Story = {
  render: () => html`
    <wb-stepsform
      current-step="1"
      total-steps="5"
      .stepLabels=${['Account', 'Profile', 'Address', 'Preferences', 'Confirm']}
    >
      <div data-step="1">
        <h3>Account Information</h3>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem;">
            Username <span style="color: #d3080c;">*</span>
          </label>
          <input type="text" name="username" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem;">
            Password <span style="color: #d3080c;">*</span>
          </label>
          <input type="password" name="password" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
      </div>

      <div data-step="2">
        <h3>Profile Details</h3>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem;">
            Full Name <span style="color: #d3080c;">*</span>
          </label>
          <input type="text" name="fullName" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem;">
            Date of Birth <span style="color: #d3080c;">*</span>
          </label>
          <input type="date" name="dob" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
      </div>

      <div data-step="3">
        <h3>Address</h3>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem;">
            Street Address <span style="color: #d3080c;">*</span>
          </label>
          <input type="text" name="street" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem;">
            City <span style="color: #d3080c;">*</span>
          </label>
          <input type="text" name="city" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
      </div>

      <div data-step="4">
        <h3>Preferences</h3>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem;">
            <input type="checkbox" name="newsletter" /> Subscribe to newsletter
          </label>
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem;">
            <input type="checkbox" name="notifications" /> Enable notifications
          </label>
        </div>
      </div>

      <div data-step="5">
        <h3>Confirmation</h3>
        <p>Your account has been created successfully!</p>
        <p>Click <strong>Complete Form</strong> to finish.</p>
      </div>
    </wb-stepsform>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Example with 5 steps showing a complete user registration flow'
      }
    }
  }
};

export const SaveProgressEnabled: Story = {
  render: () => html`
    <wb-stepsform
      save-progress
      current-step="1"
      total-steps="3"
      .stepLabels=${['Step 1', 'Step 2', 'Step 3']}
    >
      <div data-step="1">
        <h3>Step 1 (Progress Auto-Saved)</h3>
        <p>Fill out the form and navigate steps. Your progress is saved to localStorage.</p>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem;">
            Field 1 <span style="color: #d3080c;">*</span>
          </label>
          <input type="text" name="field1" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
      </div>

      <div data-step="2">
        <h3>Step 2 (Progress Auto-Saved)</h3>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem;">
            Field 2 <span style="color: #d3080c;">*</span>
          </label>
          <input type="text" name="field2" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
      </div>

      <div data-step="3">
        <h3>Step 3 (Progress Auto-Saved)</h3>
        <p>When you complete the wizard, saved progress is cleared from localStorage.</p>
      </div>
    </wb-stepsform>

    <div style="margin-top: 2rem; padding: 1rem; background: #fffbcc; border-left: 4px solid #f0ad4e; border-radius: 4px;">
      <strong>💡 Tip:</strong> Try filling step 1, refreshing the page, and your data will be restored!
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Progress is saved to localStorage and restored on page reload'
      }
    }
  }
};

export const BilingualFrench: Story = {
  render: () => html`
    <wb-stepsform
      locale="fr-CA"
      current-step="1"
      total-steps="3"
      .stepLabels=${['Informations personnelles', 'Coordonnées', 'Révision']}
    >
      <div data-step="1">
        <h3>Étape 1 : Informations personnelles</h3>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem;">
            Prénom <span style="color: #d3080c;">*</span>
          </label>
          <input type="text" name="prenom" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem;">
            Nom de famille <span style="color: #d3080c;">*</span>
          </label>
          <input type="text" name="nom" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
      </div>

      <div data-step="2">
        <h3>Étape 2 : Coordonnées</h3>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem;">
            Adresse courriel <span style="color: #d3080c;">*</span>
          </label>
          <input type="email" name="courriel" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
      </div>

      <div data-step="3">
        <h3>Étape 3 : Révision</h3>
        <p>Veuillez réviser vos informations avant de soumettre.</p>
      </div>
    </wb-stepsform>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All UI elements (buttons, progress labels) displayed in French (FR-CA)'
      }
    }
  }
};

export const KeyboardNavigation: Story = {
  render: () => html`
    <wb-stepsform
      current-step="1"
      total-steps="3"
      .stepLabels=${['Start', 'Middle', 'End']}
    >
      <div data-step="1">
        <h3>Keyboard Navigation Demo</h3>
        <p>Use keyboard shortcuts to navigate:</p>
        <ul>
          <li><kbd>Ctrl + →</kbd> - Next step</li>
          <li><kbd>Ctrl + ←</kbd> - Previous step</li>
          <li>Click step indicators to jump to completed steps</li>
        </ul>
        <div style="margin-top: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem;">
            Name <span style="color: #d3080c;">*</span>
          </label>
          <input type="text" name="name" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
      </div>

      <div data-step="2">
        <h3>Step 2</h3>
        <p>Continue using <kbd>Ctrl + →</kbd> to advance.</p>
        <div style="margin-top: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem;">
            Email <span style="color: #d3080c;">*</span>
          </label>
          <input type="email" name="email" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
      </div>

      <div data-step="3">
        <h3>Final Step</h3>
        <p>You can use <kbd>Ctrl + ←</kbd> to go back, or click the step indicators above.</p>
      </div>
    </wb-stepsform>

    <div style="margin-top: 2rem; padding: 1rem; background: #e7f3ff; border-left: 4px solid #2196f3; border-radius: 4px;">
      <strong>⌨️ Keyboard Shortcuts:</strong>
      <ul style="margin-top: 0.5rem; margin-bottom: 0;">
        <li><kbd>Ctrl + Right Arrow</kbd> - Next step (validates current step)</li>
        <li><kbd>Ctrl + Left Arrow</kbd> - Previous step</li>
        <li><kbd>Tab</kbd> - Navigate through form fields</li>
        <li><kbd>Enter</kbd> / <kbd>Space</kbd> - Activate buttons</li>
      </ul>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates keyboard shortcuts for step navigation (Ctrl+Arrow keys)'
      }
    }
  }
};
