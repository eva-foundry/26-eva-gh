import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-stepper';

const meta: Meta = {
  title: 'GC Patterns/gc-stepper',
  component: 'gc-stepper',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <gc-stepper></gc-stepper>
  `
};

export const ApplicationProcess: Story = {
  render: () => html`
    <gc-stepper
      .steps="${[
        { label: 'Create Account', description: 'Register for an account', status: 'completed' },
        { label: 'Submit Application', description: 'Fill out the application form', status: 'current' },
        { label: 'Review', description: 'Application under review', status: 'pending' },
        { label: 'Approval', description: 'Final decision', status: 'pending' }
      ]}"
    ></gc-stepper>
  `
};

export const PassportRenewal: Story = {
  render: () => html`
    <gc-stepper
      .steps="${[
        { label: 'Gather Documents', description: 'Collect required identification', status: 'completed' },
        { label: 'Complete Form', description: 'Fill out renewal application', status: 'completed' },
        { label: 'Pay Fee', description: 'Submit payment', status: 'current' },
        { label: 'Submit Application', description: 'Mail or deliver in person', status: 'pending' },
        { label: 'Receive Passport', description: 'Wait for delivery', status: 'pending' }
      ]}"
    ></gc-stepper>
  `
};

export const UsingCurrentStepProp: Story = {
  render: () => html`
    <gc-stepper
      currentStep="2"
      .steps="${[
        { label: 'Eligibility Check' },
        { label: 'Application Form' },
        { label: 'Payment' },
        { label: 'Confirmation' }
      ]}"
    ></gc-stepper>
  `
};

export const WithDescriptions: Story = {
  render: () => html`
    <gc-stepper
      .steps="${[
        { 
          label: 'Determine Eligibility', 
          description: 'Check if you meet the requirements',
          status: 'completed' 
        },
        { 
          label: 'Prepare Documents', 
          description: 'Gather necessary paperwork and identification',
          status: 'current' 
        },
        { 
          label: 'Submit Application', 
          description: 'Complete and submit your application online',
          status: 'pending' 
        }
      ]}"
    ></gc-stepper>
  `
};

export const WithoutDescriptions: Story = {
  render: () => html`
    <gc-stepper
      .steps="${[
        { label: 'Start', status: 'completed' },
        { label: 'In Progress', status: 'current' },
        { label: 'Complete', status: 'pending' }
      ]}"
    ></gc-stepper>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-stepper
      locale="fr-CA"
      .steps="${[
        { label: 'Vérification', description: 'Vérifier l\'admissibilité', status: 'completed' },
        { label: 'Soumission', description: 'Soumettre la demande', status: 'current' },
        { label: 'Révision', description: 'Examen en cours', status: 'pending' }
      ]}"
    ></gc-stepper>
  `
};

export const TwoSteps: Story = {
  render: () => html`
    <gc-stepper
      .steps="${[
        { label: 'Apply', description: 'Submit your application', status: 'completed' },
        { label: 'Receive', description: 'Get your approval', status: 'current' }
      ]}"
    ></gc-stepper>
  `
};

export const ManySteps: Story = {
  render: () => html`
    <gc-stepper
      currentStep="3"
      .steps="${[
        { label: 'Step 1', description: 'First step' },
        { label: 'Step 2', description: 'Second step' },
        { label: 'Step 3', description: 'Third step' },
        { label: 'Step 4', description: 'Fourth step' },
        { label: 'Step 5', description: 'Fifth step' },
        { label: 'Step 6', description: 'Sixth step' }
      ]}"
    ></gc-stepper>
  `
};

export const AllCompleted: Story = {
  render: () => html`
    <gc-stepper
      .steps="${[
        { label: 'Step 1', status: 'completed' },
        { label: 'Step 2', status: 'completed' },
        { label: 'Step 3', status: 'completed' }
      ]}"
    ></gc-stepper>
  `
};

export const AllPending: Story = {
  render: () => html`
    <gc-stepper
      .steps="${[
        { label: 'Step 1', status: 'pending' },
        { label: 'Step 2', status: 'pending' },
        { label: 'Step 3', status: 'pending' }
      ]}"
    ></gc-stepper>
  `
};

export const MobileView: Story = {
  render: () => html`
    <div style="max-width: 375px; margin: 0 auto; border: 1px solid #ddd; padding: 1rem;">
      <gc-stepper
        .steps="${[
          { label: 'Register', description: 'Create account', status: 'completed' },
          { label: 'Apply', description: 'Submit form', status: 'current' },
          { label: 'Review', description: 'Wait for approval', status: 'pending' }
        ]}"
      ></gc-stepper>
    </div>
  `
};

export const CanadaDotCaStyle: Story = {
  render: () => html`
    <div style="font-family: Lato, sans-serif; max-width: 1200px; margin: 0 auto; padding: 2rem;">
      <h1 style="margin-bottom: 2rem;">Apply for a Work Permit</h1>
      
      <gc-stepper
        .steps="${[
          { 
            label: 'Check eligibility', 
            description: 'Make sure you meet the requirements',
            status: 'completed'
          },
          { 
            label: 'Get documents', 
            description: 'Gather your supporting documents',
            status: 'completed'
          },
          { 
            label: 'Apply online', 
            description: 'Complete and submit your application',
            status: 'current'
          },
          { 
            label: 'Pay fees', 
            description: 'Pay processing and biometric fees',
            status: 'pending'
          },
          { 
            label: 'Give biometrics', 
            description: 'Visit a collection point',
            status: 'pending'
          },
          { 
            label: 'Wait for decision', 
            description: 'We will contact you about your application',
            status: 'pending'
          }
        ]}"
      ></gc-stepper>
      
      <div style="margin-top: 3rem; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #26374a;">
        <h2 style="margin-top: 0;">Current step: Apply online</h2>
        <p>You are now ready to complete your online application. Make sure you have all your documents ready.</p>
        <button style="padding: 0.75rem 1.5rem; background: #26374a; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Start Application
        </button>
      </div>
    </div>
  `
};

export const InteractiveDemo: Story = {
  render: () => {
    let currentStep = 0;
    const maxSteps = 3;

    const updateStepper = () => {
      const stepper = document.querySelector('gc-stepper');
      if (stepper) {
        (stepper as any).currentStep = currentStep;
      }
    };

    return html`
      <div style="font-family: Lato, sans-serif;">
        <h3>Interactive Stepper</h3>
        
        <gc-stepper
          .currentStep="${currentStep}"
          .steps="${[
            { label: 'Start', description: 'Begin the process' },
            { label: 'In Progress', description: 'Working on it' },
            { label: 'Review', description: 'Check your work' },
            { label: 'Complete', description: 'All done!' }
          ]}"
        ></gc-stepper>
        
        <div style="margin-top: 2rem; display: flex; gap: 1rem;">
          <button 
            @click="${() => {
              if (currentStep > 0) {
                currentStep--;
                updateStepper();
              }
            }}"
            style="padding: 0.75rem 1.5rem; background: #26374a; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            Previous
          </button>
          <button 
            @click="${() => {
              if (currentStep < maxSteps) {
                currentStep++;
                updateStepper();
              }
            }}"
            style="padding: 0.75rem 1.5rem; background: #26374a; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            Next
          </button>
        </div>
        
        <p style="margin-top: 1rem; color: #666;">Current step: ${currentStep + 1} of ${maxSteps + 1}</p>
      </div>
    `;
  }
};
