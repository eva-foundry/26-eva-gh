import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-most-requested';

const meta: Meta = {
  title: 'GC Patterns/gc-most-requested',
  component: 'gc-most-requested',
  parameters: {
    docs: {
      description: {
        component: 'Government of Canada Most Requested pattern. Highlights 5-7 top services/tasks with prominent visual treatment. Used on Canada.ca homepage and high-traffic pages.'
      }
    }
  },
  argTypes: {
    heading: {
      control: 'text',
      description: 'Section heading text'
    }
  }
};

export default meta;
type Story = StoryObj;

const canadaHomepageLinks = [
  { label: 'Employment Insurance', href: '#ei', icon: '💼' },
  { label: 'Passports', href: '#passports', icon: '🛂' },
  { label: 'My Account', href: '#account', icon: '👤' },
  { label: 'Tax filing', href: '#taxes', icon: '📄' },
  { label: 'Benefits', href: '#benefits', icon: '💰' }
];

export const CanadaHomepage: Story = {
  render: () => html`
    <gc-most-requested
      .links="${canadaHomepageLinks}">
    </gc-most-requested>
  `
};

export const WithCustomHeading: Story = {
  render: () => html`
    <gc-most-requested
      heading="Popular services"
      .links="${[
        { label: 'Register for a tax number', href: '#tax-number' },
        { label: 'Check your refund status', href: '#refund' },
        { label: 'Change your address', href: '#address' },
        { label: 'Direct deposit setup', href: '#direct-deposit' },
        { label: 'View your tax account', href: '#account' }
      ]}">
    </gc-most-requested>
  `
};

export const WithIcons: Story = {
  render: () => html`
    <gc-most-requested
      .links="${[
        { label: 'Apply for Employment Insurance', href: '#ei-apply', icon: '📝' },
        { label: 'Renew your passport', href: '#passport-renew', icon: '🔄' },
        { label: 'Import personal vehicle', href: '#vehicle-import', icon: '🚗' },
        { label: 'Get a criminal record check', href: '#criminal-check', icon: '🔍' },
        { label: 'Find a job', href: '#job-search', icon: '🎯' },
        { label: 'Apply for student loans', href: '#student-loans', icon: '🎓' }
      ]}">
    </gc-most-requested>
  `
};

export const WithoutIcons: Story = {
  render: () => html`
    <gc-most-requested
      .links="${[
        { label: 'Employment Insurance', href: '#ei' },
        { label: 'Passports', href: '#passports' },
        { label: 'My Account', href: '#account' },
        { label: 'Tax filing', href: '#taxes' },
        { label: 'Benefits finder', href: '#benefits' }
      ]}">
    </gc-most-requested>
  `
};

export const InstitutionPage: Story = {
  render: () => html`
    <h1>Service Canada</h1>
    <gc-most-requested
      heading="Most requested"
      .links="${[
        { label: 'Social Insurance Number', href: '#sin', icon: '🆔' },
        { label: 'Old Age Security', href: '#oas', icon: '👵' },
        { label: 'Employment Insurance', href: '#ei', icon: '💼' },
        { label: 'Canada Pension Plan', href: '#cpp', icon: '💰' },
        { label: 'Passport services', href: '#passports', icon: '🛂' },
        { label: 'Service locations', href: '#locations', icon: '📍' }
      ]}">
    </gc-most-requested>
  `
};

export const CompactLayout: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <gc-most-requested
        .links="${[
          { label: 'File taxes', href: '#taxes' },
          { label: 'Refund status', href: '#refund' },
          { label: 'My Account', href: '#account' },
          { label: 'Benefits', href: '#benefits' }
        ]}">
      </gc-most-requested>
    </div>
  `
};

export const CustomContent: Story = {
  render: () => html`
    <gc-most-requested heading="Quick links">
      <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 1rem;">
        <li>
          <a href="#link1" style="display: inline-block; padding: 0.5rem 1rem; background: white; border: 1px solid #ddd; border-radius: 4px;">
            Custom Link 1
          </a>
        </li>
        <li>
          <a href="#link2" style="display: inline-block; padding: 0.5rem 1rem; background: white; border: 1px solid #ddd; border-radius: 4px;">
            Custom Link 2
          </a>
        </li>
      </ul>
    </gc-most-requested>
  `
};

export const WithEvents: Story = {
  render: () => html`
    <gc-most-requested
      .links="${canadaHomepageLinks}"
      @gc-most-requested-click="${(e: CustomEvent) => {
        console.log('Link clicked:', e.detail);
        alert(`Clicked: ${e.detail.label}`);
      }}">
    </gc-most-requested>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-most-requested
      locale="fr-CA"
      .links="${[
        { label: 'Assurance-emploi', href: '#ae', icon: '💼' },
        { label: 'Passeports', href: '#passeports', icon: '🛂' },
        { label: 'Mon dossier', href: '#dossier', icon: '👤' },
        { label: 'Déclaration de revenus', href: '#impots', icon: '📄' },
        { label: 'Prestations', href: '#prestations', icon: '💰' }
      ]}">
    </gc-most-requested>
  `
};
