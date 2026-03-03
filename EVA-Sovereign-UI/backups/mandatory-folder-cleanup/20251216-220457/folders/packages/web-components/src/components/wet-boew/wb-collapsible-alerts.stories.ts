import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-collapsible-alerts.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-collapsible-alerts',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const InfoAlert: Story = {
  render: () => html`
    <wb-collapsible-alerts type="info">
      <strong>Information:</strong> This is an informational alert message.
    </wb-collapsible-alerts>
  `
};

export const SuccessAlert: Story = {
  render: () => html`
    <wb-collapsible-alerts type="success">
      <strong>Success!</strong> Your changes have been saved.
    </wb-collapsible-alerts>
  `
};

export const WarningAlert: Story = {
  render: () => html`
    <wb-collapsible-alerts type="warning">
      <strong>Warning:</strong> Please review your input before continuing.
    </wb-collapsible-alerts>
  `
};

export const DangerAlert: Story = {
  render: () => html`
    <wb-collapsible-alerts type="danger">
      <strong>Error:</strong> An error occurred while processing your request.
    </wb-collapsible-alerts>
  `
};

export const DismissibleAlert: Story = {
  render: () => html`
    <wb-collapsible-alerts type="info" dismissible>
      <strong>Dismissible:</strong> Click the × button to dismiss this alert.
    </wb-collapsible-alerts>
  `
};

export const CollapsibleAlert: Story = {
  render: () => html`
    <wb-collapsible-alerts type="warning" collapsible>
      <strong>Collapsible:</strong> Click the ▲ button to collapse this alert.
      <p>Additional details are shown here when expanded.</p>
    </wb-collapsible-alerts>
  `
};

export const PersistentAlert: Story = {
  render: () => html`
    <div>
      <wb-collapsible-alerts type="success" dismissible collapsible storage-key="demo-alert">
        <strong>Persistent:</strong> Your preference (dismissed/collapsed) is saved to localStorage.
      </wb-collapsible-alerts>
      <button onclick="document.querySelector('wb-collapsible-alerts').reset()">Reset Alert</button>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-collapsible-alerts type="info" dismissible collapsible>
        <strong>Information:</strong> Ceci est un message d'alerte informatif.
      </wb-collapsible-alerts>
    </div>
  `
};
