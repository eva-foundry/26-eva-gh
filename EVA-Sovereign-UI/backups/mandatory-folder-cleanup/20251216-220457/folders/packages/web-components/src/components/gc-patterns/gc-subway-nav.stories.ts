import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-subway-nav';

const meta: Meta = {
  title: 'GC Patterns/gc-subway-nav',
  component: 'gc-subway-nav',
  parameters: {
    docs: {
      description: {
        component: 'Government of Canada Subway Navigation pattern. Multi-step process navigation with visual progress indicator. Shows completed, current, and future steps with connecting lines.'
      }
    }
  },
  argTypes: {
    allowNavigation: {
      control: 'boolean',
      description: 'Allow clicking steps to navigate'
    }
  }
};

export default meta;
type Story = StoryObj;

const passportSteps = [
  { label: 'Gather documents', status: 'completed' as const, href: '#gather' },
  { label: 'Fill out application', status: 'completed' as const, href: '#fill' },
  { label: 'Get photos taken', status: 'current' as const, href: '#photos' },
  { label: 'Pay fees', status: 'future' as const, href: '#pay' },
  { label: 'Submit application', status: 'future' as const, href: '#submit' },
  { label: 'Track your application', status: 'future' as const, href: '#track' },
  { label: 'Receive passport', status: 'future' as const, href: '#receive' }
];

export const PassportApplication: Story = {
  render: () => html`
    <h1>Apply for a passport</h1>
    <gc-subway-nav
      .steps="${passportSteps}"
      currentStep="3">
    </gc-subway-nav>
  `
};

export const WithNavigation: Story = {
  render: () => html`
    <gc-subway-nav
      .steps="${passportSteps}"
      currentStep="3"
      allowNavigation>
    </gc-subway-nav>
  `
};

export const ShortProcess: Story = {
  render: () => html`
    <gc-subway-nav
      .steps="${[
        { label: 'Start application', status: 'completed', href: '#start' },
        { label: 'Review and submit', status: 'current', href: '#review' },
        { label: 'Confirmation', status: 'future', href: '#confirm' }
      ]}"
      currentStep="2">
    </gc-subway-nav>
  `
};

export const AllCompleted: Story = {
  render: () => html`
    <gc-subway-nav
      .steps="${[
        { label: 'Register', status: 'completed' },
        { label: 'Fill form', status: 'completed' },
        { label: 'Submit', status: 'completed' },
        { label: 'Confirmation', status: 'completed' }
      ]}"
      currentStep="4">
    </gc-subway-nav>
  `
};

export const EmploymentInsurance: Story = {
  render: () => html`
    <h1>Apply for Employment Insurance</h1>
    <gc-subway-nav
      .steps="${[
        { label: 'Check your eligibility', status: 'completed', href: '#eligibility' },
        { label: 'Prepare your information', status: 'completed', href: '#prepare' },
        { label: 'Apply online', status: 'current', href: '#apply' },
        { label: 'Submit required documents', status: 'future', href: '#documents' },
        { label: 'Complete bi-weekly reports', status: 'future', href: '#reports' }
      ]}"
      currentStep="3"
      allowNavigation>
    </gc-subway-nav>
  `
};

export const TaxFiling: Story = {
  render: () => html`
    <h1>File your taxes</h1>
    <gc-subway-nav
      .steps="${[
        { label: 'Gather your documents', status: 'completed' },
        { label: 'Choose filing method', status: 'completed' },
        { label: 'Fill out return', status: 'completed' },
        { label: 'Review information', status: 'current' },
        { label: 'Submit return', status: 'future' },
        { label: 'Get your refund', status: 'future' }
      ]}"
      currentStep="4">
    </gc-subway-nav>
  `
};

export const WithEvents: Story = {
  render: () => html`
    <gc-subway-nav
      .steps="${passportSteps}"
      currentStep="3"
      allowNavigation
      @gc-subway-step-click="${(e: CustomEvent) => {
        console.log('Step clicked:', e.detail);
        alert(`Clicked: ${e.detail.label} (Step ${e.detail.step})`);
      }}">
    </gc-subway-nav>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-subway-nav
      locale="fr-CA"
      .steps="${[
        { label: 'Rassembler les documents', status: 'completed', href: '#rassembler' },
        { label: 'Remplir la demande', status: 'completed', href: '#remplir' },
        { label: 'Faire prendre des photos', status: 'current', href: '#photos' },
        { label: 'Payer les frais', status: 'future', href: '#payer' },
        { label: 'Soumettre la demande', status: 'future', href: '#soumettre' },
        { label: 'Suivre votre demande', status: 'future', href: '#suivre' },
        { label: 'Recevoir le passeport', status: 'future', href: '#recevoir' }
      ]}"
      currentStep="3"
      allowNavigation>
    </gc-subway-nav>
  `
};
