import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-contextual-alerts';

const meta: Meta = {
  title: 'GC Patterns/gc-contextual-alerts',
  component: 'gc-contextual-alerts',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['error', 'warning', 'info', 'success']
    }
  }
};

export default meta;
type Story = StoryObj;

export const ErrorAlert: Story = {
  render: () => html`
    <gc-contextual-alerts
      variant="error"
      heading="Error"
      message="There was a problem submitting your application. Please try again.">
    </gc-contextual-alerts>
  `
};

export const WarningAlert: Story = {
  render: () => html`
    <gc-contextual-alerts
      variant="warning"
      heading="Important notice"
      message="Your session will expire in 5 minutes. Please save your work.">
    </gc-contextual-alerts>
  `
};

export const InfoAlert: Story = {
  render: () => html`
    <gc-contextual-alerts
      variant="info"
      heading="Information"
      message="New features are available. Click here to learn more.">
    </gc-contextual-alerts>
  `
};

export const SuccessAlert: Story = {
  render: () => html`
    <gc-contextual-alerts
      variant="success"
      heading="Success"
      message="Your application has been successfully submitted.">
    </gc-contextual-alerts>
  `
};

export const NotDismissible: Story = {
  render: () => html`
    <gc-contextual-alerts
      variant="warning"
      heading="Maintenance notice"
      message="This service will be unavailable on Saturday, December 14 from 8:00 AM to 12:00 PM ET."
      .dismissible="${false}">
    </gc-contextual-alerts>
  `
};

export const WithHTML: Story = {
  render: () => html`
    <gc-contextual-alerts variant="info" heading="Multiple errors found">
      <p>Please fix the following errors:</p>
      <ul>
        <li>Email address is required</li>
        <li>Phone number must be 10 digits</li>
        <li>Date of birth is invalid</li>
      </ul>
    </gc-contextual-alerts>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-contextual-alerts
      locale="fr-CA"
      variant="success"
      heading="Succès"
      message="Votre demande a été soumise avec succès.">
    </gc-contextual-alerts>
  `
};
