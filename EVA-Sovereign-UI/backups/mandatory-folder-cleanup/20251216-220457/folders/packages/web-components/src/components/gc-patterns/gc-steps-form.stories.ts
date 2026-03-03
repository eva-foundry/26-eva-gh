import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-steps-form.js';

interface GCStepsFormStoryArgs {
  steps: any[];
  locale: string;
}

const meta: Meta<GCStepsFormStoryArgs> = {
  title: 'GC Patterns/gc-steps-form',
  tags: ['autodocs'],
  render: (args) => html`
    <gc-steps-form
      .steps="${args.steps}"
      .locale="${args.locale}"
    ></gc-steps-form>
  `,
  argTypes: {
    steps: { control: 'object' },
    locale: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<GCStepsFormStoryArgs>;

const applicationSteps = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Provide your personal details',
    fields: html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label for="fullName" style="display: block; margin-bottom: 8px; font-weight: bold;">Full Name</label>
          <input id="fullName" type="text" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
        <div>
          <label for="dob" style="display: block; margin-bottom: 8px; font-weight: bold;">Date of Birth</label>
          <input id="dob" type="date" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
        <div>
          <label for="sin" style="display: block; margin-bottom: 8px; font-weight: bold;">Social Insurance Number</label>
          <input id="sin" type="text" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
      </div>
    `
  },
  {
    id: 'contact',
    title: 'Contact Information',
    description: 'How can we reach you?',
    fields: html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label for="email" style="display: block; margin-bottom: 8px; font-weight: bold;">Email Address</label>
          <input id="email" type="email" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
        <div>
          <label for="phone" style="display: block; margin-bottom: 8px; font-weight: bold;">Phone Number</label>
          <input id="phone" type="tel" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
        <div>
          <label for="address" style="display: block; margin-bottom: 8px; font-weight: bold;">Mailing Address</label>
          <textarea id="address" rows="3" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"></textarea>
        </div>
      </div>
    `
  },
  {
    id: 'documents',
    title: 'Supporting Documents',
    description: 'Upload required documents',
    fields: html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label for="id" style="display: block; margin-bottom: 8px; font-weight: bold;">Proof of Identity</label>
          <input id="id" type="file" style="width: 100%; padding: 8px;" />
        </div>
        <div>
          <label for="citizenship" style="display: block; margin-bottom: 8px; font-weight: bold;">Proof of Citizenship</label>
          <input id="citizenship" type="file" style="width: 100%; padding: 8px;" />
        </div>
      </div>
    `
  },
  {
    id: 'review',
    title: 'Review and Submit',
    description: 'Please review your information before submitting',
    fields: html`
      <div style="background: #f5f5f5; padding: 16px; border-radius: 4px;">
        <h3 style="margin-top: 0;">Application Summary</h3>
        <p>Please review all information carefully. Click the Previous button to make changes, or Submit to complete your application.</p>
        <div style="margin-top: 16px;">
          <label style="display: flex; align-items: center; gap: 8px;">
            <input type="checkbox" />
            <span>I confirm that all information provided is accurate and complete</span>
          </label>
        </div>
      </div>
    `
  }
];

const simpleSteps = [
  {
    id: 'step1',
    title: 'Step 1',
    description: 'First step description',
    fields: '<p>Step 1 content</p>'
  },
  {
    id: 'step2',
    title: 'Step 2',
    description: 'Second step description',
    fields: '<p>Step 2 content</p>'
  },
  {
    id: 'step3',
    title: 'Step 3',
    description: 'Third step description',
    fields: '<p>Step 3 content</p>'
  }
];

export const Default: Story = {
  args: {
    steps: applicationSteps,
    locale: 'en-CA'
  }
};

export const ThreeSteps: Story = {
  args: {
    steps: simpleSteps,
    locale: 'en-CA'
  }
};

export const TwoSteps: Story = {
  args: {
    steps: [
      {
        id: 'info',
        title: 'Information',
        description: 'Provide your information',
        fields: '<input type="text" placeholder="Enter information" style="width: 100%; padding: 8px;" />'
      },
      {
        id: 'confirm',
        title: 'Confirmation',
        description: 'Confirm your submission',
        fields: '<p>Click Submit to complete</p>'
      }
    ],
    locale: 'en-CA'
  }
};

export const WithValidation: Story = {
  args: {
    steps: applicationSteps,
    locale: 'en-CA'
  },
  render: (args) => {
    const handleValidate = (e: CustomEvent) => {
      const form = e.target as any;
      
      // Simulate validation errors
      if (e.detail.step === 0) {
        form.addValidationError('Full Name is required');
        form.addValidationError('Date of Birth must be in the past');
        e.preventDefault();
      }
    };

    return html`
      <gc-steps-form
        .steps="${args.steps}"
        @gc-step-validate="${handleValidate}"
      ></gc-steps-form>
    `;
  }
};

export const WithEvents: Story = {
  args: {
    steps: simpleSteps,
    locale: 'en-CA'
  },
  render: (args) => html`
    <gc-steps-form
      .steps="${args.steps}"
      @gc-step-change="${(e: CustomEvent) => console.log('Step changed:', e.detail)}"
      @gc-form-submit="${(e: CustomEvent) => console.log('Form submitted:', e.detail)}"
      @gc-step-validate="${(e: CustomEvent) => console.log('Step validate:', e.detail)}"
    ></gc-steps-form>
  `
};

export const FrenchCanadian: Story = {
  args: {
    steps: [
      {
        id: 'personnel',
        title: 'Informations personnelles',
        description: 'Fournissez vos informations personnelles',
        fields: html`
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <label for="nom" style="display: block; margin-bottom: 8px; font-weight: bold;">Nom complet</label>
              <input id="nom" type="text" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
            </div>
          </div>
        `
      },
      {
        id: 'contact',
        title: 'Coordonnées',
        description: 'Comment pouvons-nous vous joindre?',
        fields: html`
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <label for="courriel" style="display: block; margin-bottom: 8px; font-weight: bold;">Adresse courriel</label>
              <input id="courriel" type="email" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
            </div>
          </div>
        `
      },
      {
        id: 'revue',
        title: 'Révision',
        description: 'Veuillez réviser vos informations',
        fields: '<p>Cliquez sur Soumettre pour terminer</p>'
      }
    ],
    locale: 'fr-CA'
  }
};
