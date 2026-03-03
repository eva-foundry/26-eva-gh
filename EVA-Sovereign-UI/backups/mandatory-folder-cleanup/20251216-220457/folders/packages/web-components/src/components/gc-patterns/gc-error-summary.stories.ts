import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-error-summary';

const meta: Meta = {
  title: 'GC Patterns/gc-error-summary',
  component: 'gc-error-summary',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <gc-error-summary
      .errors="${[
        { id: '1', field: 'name', message: 'Name is required', href: '#name' },
        { id: '2', field: 'email', message: 'Email is invalid', href: '#email' },
        { id: '3', field: 'phone', message: 'Phone number must be 10 digits', href: '#phone' }
      ]}"
    ></gc-error-summary>
  `
};

export const SingleError: Story = {
  render: () => html`
    <gc-error-summary
      .errors="${[
        { id: '1', field: 'password', message: 'Password must be at least 8 characters', href: '#password' }
      ]}"
    ></gc-error-summary>
  `
};

export const CustomHeading: Story = {
  render: () => html`
    <gc-error-summary
      heading="Form validation failed"
      .errors="${[
        { id: '1', field: 'username', message: 'Username is already taken', href: '#username' },
        { id: '2', field: 'email', message: 'Email format is invalid', href: '#email' }
      ]}"
    ></gc-error-summary>
  `
};

export const CustomDescription: Story = {
  render: () => html`
    <gc-error-summary
      description="The following fields need your attention:"
      .errors="${[
        { id: '1', field: 'firstName', message: 'First name is required', href: '#firstName' },
        { id: '2', field: 'lastName', message: 'Last name is required', href: '#lastName' }
      ]}"
    ></gc-error-summary>
  `
};

export const NoDescription: Story = {
  render: () => html`
    <gc-error-summary
      description=""
      .errors="${[
        { id: '1', field: 'city', message: 'City is required', href: '#city' },
        { id: '2', field: 'postalCode', message: 'Postal code is invalid', href: '#postalCode' }
      ]}"
    ></gc-error-summary>
  `
};

export const WithoutLinks: Story = {
  render: () => html`
    <gc-error-summary
      .errors="${[
        { id: '1', field: 'general', message: 'Server error occurred. Please try again.' },
        { id: '2', field: 'network', message: 'Network connection lost.' }
      ]}"
    ></gc-error-summary>
  `
};

export const MixedLinks: Story = {
  render: () => html`
    <gc-error-summary
      .errors="${[
        { id: '1', field: 'name', message: 'Name is required', href: '#name' },
        { id: '2', field: 'general', message: 'Please review your input' },
        { id: '3', field: 'email', message: 'Email is invalid', href: '#email' }
      ]}"
    ></gc-error-summary>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-error-summary
      locale="fr-CA"
      .errors="${[
        { id: '1', field: 'nom', message: 'Le nom est requis', href: '#nom' },
        { id: '2', field: 'courriel', message: 'Le courriel est invalide', href: '#courriel' }
      ]}"
    ></gc-error-summary>
  `
};

export const WithEvents: Story = {
  render: () => {
    const handleErrorClick = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Error clicked:', customEvent.detail);
    };

    return html`
      <gc-error-summary
        .errors="${[
          { id: '1', field: 'username', message: 'Username is required', href: '#username' },
          { id: '2', field: 'password', message: 'Password is required', href: '#password' }
        ]}"
        @gc-error-click="${handleErrorClick}"
      ></gc-error-summary>
      <p style="margin-top: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;">
        Open browser console to see event details when clicking error links.
      </p>
    `;
  }
};

export const FormExample: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <gc-error-summary
        .errors="${[
          { id: '1', field: 'name', message: 'Enter your full name', href: '#name-input' },
          { id: '2', field: 'email', message: 'Enter a valid email address', href: '#email-input' },
          { id: '3', field: 'phone', message: 'Phone number must be 10 digits', href: '#phone-input' }
        ]}"
      ></gc-error-summary>

      <form style="margin-top: 2rem;">
        <div style="margin-bottom: 1.5rem;">
          <label for="name-input" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
            Full Name <span style="color: #d3080c;">*</span>
          </label>
          <input
            id="name-input"
            type="text"
            style="width: 100%; padding: 0.5rem; border: 3px solid #d3080c; border-radius: 4px;"
            aria-invalid="true"
            aria-describedby="name-error"
          />
          <span id="name-error" style="display: block; margin-top: 0.25rem; color: #d3080c; font-size: 0.875rem;">
            Enter your full name
          </span>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <label for="email-input" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
            Email <span style="color: #d3080c;">*</span>
          </label>
          <input
            id="email-input"
            type="email"
            style="width: 100%; padding: 0.5rem; border: 3px solid #d3080c; border-radius: 4px;"
            aria-invalid="true"
            aria-describedby="email-error"
          />
          <span id="email-error" style="display: block; margin-top: 0.25rem; color: #d3080c; font-size: 0.875rem;">
            Enter a valid email address
          </span>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <label for="phone-input" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
            Phone <span style="color: #d3080c;">*</span>
          </label>
          <input
            id="phone-input"
            type="tel"
            style="width: 100%; padding: 0.5rem; border: 3px solid #d3080c; border-radius: 4px;"
            aria-invalid="true"
            aria-describedby="phone-error"
          />
          <span id="phone-error" style="display: block; margin-top: 0.25rem; color: #d3080c; font-size: 0.875rem;">
            Phone number must be 10 digits
          </span>
        </div>

        <button type="submit" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
          Submit
        </button>
      </form>
    </div>
  `
};

export const ManyErrors: Story = {
  render: () => html`
    <gc-error-summary
      .errors="${[
        { id: '1', field: 'firstName', message: 'First name is required', href: '#firstName' },
        { id: '2', field: 'lastName', message: 'Last name is required', href: '#lastName' },
        { id: '3', field: 'email', message: 'Email is required', href: '#email' },
        { id: '4', field: 'phone', message: 'Phone number is invalid', href: '#phone' },
        { id: '5', field: 'address', message: 'Address is required', href: '#address' },
        { id: '6', field: 'city', message: 'City is required', href: '#city' },
        { id: '7', field: 'province', message: 'Province must be selected', href: '#province' },
        { id: '8', field: 'postalCode', message: 'Postal code is invalid', href: '#postalCode' }
      ]}"
    ></gc-error-summary>
  `
};

export const ServerErrors: Story = {
  render: () => html`
    <gc-error-summary
      heading="Server error"
      description="The server encountered the following errors:"
      .errors="${[
        { id: '1', field: 'server', message: 'Database connection failed' },
        { id: '2', field: 'server', message: 'Session expired. Please log in again.' },
        { id: '3', field: 'server', message: 'Service temporarily unavailable' }
      ]}"
    ></gc-error-summary>
  `
};

export const DynamicErrors: Story = {
  render: () => {
    let errorSummary: HTMLElement | null = null;

    const addError = () => {
      if (!errorSummary) return;
      
      const currentErrors = (errorSummary as any).errors || [];
      const newError = {
        id: String(currentErrors.length + 1),
        field: `field${currentErrors.length + 1}`,
        message: `Error ${currentErrors.length + 1}: Field validation failed`,
        href: `#field${currentErrors.length + 1}`
      };
      
      (errorSummary as any).errors = [...currentErrors, newError];
    };

    const clearErrors = () => {
      if (!errorSummary) return;
      (errorSummary as any).errors = [];
    };

    setTimeout(() => {
      errorSummary = document.querySelector('gc-error-summary');
    }, 0);

    return html`
      <div>
        <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
          <button @click="${addError}" style="padding: 0.75rem 1.5rem; background: #d3080c; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
            Add Error
          </button>
          <button @click="${clearErrors}" style="padding: 0.75rem 1.5rem; background: #278400; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
            Clear All Errors
          </button>
        </div>

        <gc-error-summary
          .errors="${[
            { id: '1', field: 'example', message: 'Initial error message', href: '#example' }
          ]}"
        ></gc-error-summary>
      </div>
    `;
  }
};

export const AccessibilityDemo: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h2 style="margin-bottom: 1rem;">Accessibility Features</h2>
      <ul style="margin-bottom: 2rem; line-height: 1.8;">
        <li><strong>role="alert"</strong> announces errors to screen readers</li>
        <li><strong>aria-labelledby</strong> associates heading with summary</li>
        <li><strong>aria-describedby</strong> associates description with summary</li>
        <li>Error links scroll to and focus the problematic field</li>
        <li>Keyboard navigable with visible focus indicators</li>
        <li>High contrast color scheme (red on light pink)</li>
      </ul>

      <gc-error-summary
        .errors="${[
          { id: '1', field: 'username', message: 'Username must be at least 3 characters', href: '#username-field' },
          { id: '2', field: 'password', message: 'Password must contain at least one number', href: '#password-field' }
        ]}"
      ></gc-error-summary>
    </div>
  `
};
