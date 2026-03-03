import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-formvalid.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-formvalid',
  component: 'wb-formvalid',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# wb-formvalid - Client-Side Form Validation

WET-BOEW 4.x plugin reimplemented as modern Lit 3.x Web Component.

Validates form inputs with inline error messages and error summary.

**Reference**: https://wet-boew.github.io/wet-boew/demos/formvalid/formvalid-en.html

## Features
- ✅ Required field validation
- ✅ Email format validation
- ✅ URL format validation
- ✅ Number range validation (min/max)
- ✅ Custom pattern validation (regex)
- ✅ Inline error messages
- ✅ Error summary at top
- ✅ Prevents submission on errors
- ✅ Accessible (ARIA, screen reader announcements)
- ✅ Bilingual (EN-CA/FR-CA)
- ✅ Live validation option
        `
      }
    }
  },
  argTypes: {
    liveValidation: {
      control: 'boolean',
      description: 'Enable live validation (validate as user types)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    errorSummaryHeading: {
      control: 'text',
      description: 'Custom heading for error summary',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'The form has errors' }
      }
    }
  }
};

export default meta;
type Story = StoryObj;

export const BasicValidation: Story = {
  render: () => html`
    <wb-formvalid>
      <form>
        <div style="margin-bottom: 1rem;">
          <label for="username" style="display: block; margin-bottom: 0.5rem;">
            Username <span style="color: #d3080c;">*</span>
          </label>
          <input 
            type="text" 
            id="username"
            name="username" 
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="email" style="display: block; margin-bottom: 0.5rem;">
            Email <span style="color: #d3080c;">*</span>
          </label>
          <input 
            type="email" 
            id="email"
            name="email" 
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="age" style="display: block; margin-bottom: 0.5rem;">
            Age (18-120)
          </label>
          <input 
            type="number" 
            id="age"
            name="age" 
            min="18" 
            max="120"
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="website" style="display: block; margin-bottom: 0.5rem;">
            Website URL
          </label>
          <input 
            type="url" 
            id="website"
            name="website"
            placeholder="https://example.com"
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <button 
          type="submit"
          style="background-color: #284162; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer;">
          Submit Form
        </button>
      </form>
    </wb-formvalid>
  `
};

export const CustomPatternValidation: Story = {
  render: () => html`
    <wb-formvalid>
      <form>
        <div style="margin-bottom: 1rem;">
          <label for="postal" style="display: block; margin-bottom: 0.5rem;">
            Canadian Postal Code <span style="color: #d3080c;">*</span>
          </label>
          <input 
            type="text" 
            id="postal"
            name="postal" 
            required
            pattern="[A-Z]\\d[A-Z] \\d[A-Z]\\d"
            placeholder="K1A 0B1"
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
          <small style="color: #666;">Format: K1A 0B1</small>
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="phone" style="display: block; margin-bottom: 0.5rem;">
            Phone Number <span style="color: #d3080c;">*</span>
          </label>
          <input 
            type="tel" 
            id="phone"
            name="phone" 
            required
            pattern="\\d{3}-\\d{3}-\\d{4}"
            placeholder="613-555-0100"
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
          <small style="color: #666;">Format: 613-555-0100</small>
        </div>

        <button 
          type="submit"
          style="background-color: #284162; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer;">
          Submit Form
        </button>
      </form>
    </wb-formvalid>
  `
};

export const LiveValidation: Story = {
  render: () => html`
    <wb-formvalid live-validation>
      <form>
        <div style="margin-bottom: 1rem;">
          <label for="email-live" style="display: block; margin-bottom: 0.5rem;">
            Email (validates on blur) <span style="color: #d3080c;">*</span>
          </label>
          <input 
            type="email" 
            id="email-live"
            name="email" 
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
          <small style="color: #666;">Try typing an invalid email and clicking away</small>
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="age-live" style="display: block; margin-bottom: 0.5rem;">
            Age (must be 18-120)
          </label>
          <input 
            type="number" 
            id="age-live"
            name="age" 
            min="18" 
            max="120"
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
          <small style="color: #666;">Try entering 15 or 150</small>
        </div>

        <button 
          type="submit"
          style="background-color: #284162; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer;">
          Submit Form
        </button>
      </form>
    </wb-formvalid>
  `
};

export const CustomErrorHeading: Story = {
  render: () => html`
    <wb-formvalid error-summary-heading="Please fix the following errors before submitting">
      <form>
        <div style="margin-bottom: 1rem;">
          <label for="name" style="display: block; margin-bottom: 0.5rem;">
            Full Name <span style="color: #d3080c;">*</span>
          </label>
          <input 
            type="text" 
            id="name"
            name="name" 
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="email-custom" style="display: block; margin-bottom: 0.5rem;">
            Email Address <span style="color: #d3080c;">*</span>
          </label>
          <input 
            type="email" 
            id="email-custom"
            name="email" 
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <button 
          type="submit"
          style="background-color: #284162; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer;">
          Submit Form
        </button>
      </form>
    </wb-formvalid>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <wb-formvalid locale="fr-CA">
      <form>
        <div style="margin-bottom: 1rem;">
          <label for="nom" style="display: block; margin-bottom: 0.5rem;">
            Nom complet <span style="color: #d3080c;">*</span>
          </label>
          <input 
            type="text" 
            id="nom"
            name="nom" 
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="courriel" style="display: block; margin-bottom: 0.5rem;">
            Adresse courriel <span style="color: #d3080c;">*</span>
          </label>
          <input 
            type="email" 
            id="courriel"
            name="courriel" 
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <button 
          type="submit"
          style="background-color: #284162; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer;">
          Soumettre
        </button>
      </form>
    </wb-formvalid>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Error messages displayed in French (FR-CA)'
      }
    }
  }
};
