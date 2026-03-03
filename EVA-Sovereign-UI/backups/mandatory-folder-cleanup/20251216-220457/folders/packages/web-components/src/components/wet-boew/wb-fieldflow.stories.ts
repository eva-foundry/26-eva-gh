import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-fieldflow.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-fieldflow',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const PassportWizard: Story = {
  render: () => {
    const steps = [
      {
        id: 'citizenship',
        question: 'Are you a Canadian citizen?',
        options: [
          { value: 'yes', label: 'Yes', next: 'has-passport' },
          { value: 'no', label: 'No', result: 'You must be a Canadian citizen to apply for a Canadian passport. Visit our immigration services for more information.' }
        ]
      },
      {
        id: 'has-passport',
        question: 'Do you currently have a valid Canadian passport?',
        options: [
          { value: 'yes', label: 'Yes, and it is still valid', next: 'renewal-type' },
          { value: 'expired', label: 'Yes, but it has expired', next: 'renewal-type' },
          { value: 'no', label: 'No, I have never had a passport', result: 'You need to apply for a new passport. Visit a Service Canada office with required documents: proof of citizenship, identification, and passport photos.' }
        ]
      },
      {
        id: 'renewal-type',
        question: 'How would you like to renew your passport?',
        options: [
          { value: 'online', label: 'Online (simplified renewal)', result: 'You can renew your passport online if you meet eligibility criteria. Processing time is approximately 20 business days.' },
          { value: 'mail', label: 'By mail', result: 'Complete the application form and mail it with required documents. Processing time is approximately 20 business days plus mailing time.' },
          { value: 'person', label: 'In person at Service Canada', result: 'Visit a Service Canada office with your application and documents. Processing time varies by location.' }
        ]
      }
    ];

    return html`
      <wb-fieldflow .steps="${steps}"></wb-fieldflow>
    `;
  }
};

export const EligibilityCheck: Story = {
  render: () => {
    const steps = [
      {
        id: 'age',
        question: 'What is your age?',
        options: [
          { value: 'under18', label: 'Under 18', next: 'minor-process' },
          { value: 'adult', label: '18 or older', next: 'employment' }
        ]
      },
      {
        id: 'minor-process',
        question: 'Does your parent or guardian consent?',
        options: [
          { value: 'yes', label: 'Yes', result: 'Your parent or guardian must accompany you to the application appointment and provide their consent and identification.' },
          { value: 'no', label: 'No', result: 'Parental or guardian consent is required for applicants under 18 years of age.' }
        ]
      },
      {
        id: 'employment',
        question: 'What is your employment status?',
        options: [
          { value: 'employed', label: 'Employed', next: 'income' },
          { value: 'student', label: 'Full-time student', result: 'As a student, you may qualify for special programs. Visit our student services page for more information.' },
          { value: 'unemployed', label: 'Unemployed', result: 'You may qualify for employment assistance programs. Visit our job bank and training resources.' }
        ]
      },
      {
        id: 'income',
        question: 'What is your annual income range?',
        options: [
          { value: 'low', label: 'Under $30,000', result: 'You may qualify for income-based assistance programs. Visit our financial assistance page for details.' },
          { value: 'medium', label: '$30,000 - $60,000', result: 'Standard application process applies. Processing time is 4-6 weeks.' },
          { value: 'high', label: 'Over $60,000', result: 'Standard application process applies. Processing time is 4-6 weeks.' }
        ]
      }
    ];

    return html`
      <wb-fieldflow .steps="${steps}"></wb-fieldflow>
    `;
  }
};

export const SimpleDecisionTree: Story = {
  render: () => {
    const steps = [
      {
        id: 'start',
        question: 'What type of service do you need?',
        options: [
          { value: 'passport', label: 'Passport Services', result: 'Visit our passport services page or call 1-800-567-6868.' },
          { value: 'tax', label: 'Tax Information', result: 'Visit the Canada Revenue Agency at canada.ca/taxes or call 1-800-959-8281.' },
          { value: 'employment', label: 'Employment Services', result: 'Visit the Job Bank at jobbank.gc.ca or your local Service Canada office.' },
          { value: 'other', label: 'Other Services', result: 'Call Service Canada at 1-800-622-6232 for general inquiries.' }
        ]
      }
    ];

    return html`
      <wb-fieldflow .steps="${steps}"></wb-fieldflow>
    `;
  }
};

export const EventLogging: Story = {
  render: () => {
    const steps = [
      {
        id: 'step1',
        question: 'First Question',
        options: [
          { value: 'a', label: 'Option A', next: 'step2' },
          { value: 'b', label: 'Option B', result: 'Result B' }
        ]
      },
      {
        id: 'step2',
        question: 'Second Question',
        options: [
          { value: 'c', label: 'Option C', result: 'Result C' },
          { value: 'd', label: 'Option D', result: 'Result D' }
        ]
      }
    ];

    return html`
      <div>
        <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
          Event log will appear here
        </div>
        <wb-fieldflow
          .steps="${steps}"
          @wb-fieldflow-step="${(e: CustomEvent) => {
            const log = document.getElementById('log');
            if (log) log.textContent = 'Navigated to step: ' + e.detail.stepId;
          }}"
          @wb-fieldflow-complete="${(e: CustomEvent) => {
            const log = document.getElementById('log');
            if (log) log.textContent = 'Wizard complete: ' + e.detail.result;
          }}"
          @wb-fieldflow-back="${() => {
            const log = document.getElementById('log');
            if (log) log.textContent = 'Navigated back';
          }}"
          @wb-fieldflow-reset="${() => {
            const log = document.getElementById('log');
            if (log) log.textContent = 'Wizard reset';
          }}"
        ></wb-fieldflow>
      </div>
    `;
  }
};

export const BilingualFrench: Story = {
  render: () => {
    const steps = [
      {
        id: 'citoyennete',
        question: 'Êtes-vous citoyen canadien?',
        options: [
          { value: 'oui', label: 'Oui', next: 'passeport' },
          { value: 'non', label: 'Non', result: 'Vous devez être citoyen canadien pour demander un passeport canadien.' }
        ]
      },
      {
        id: 'passeport',
        question: 'Avez-vous un passeport canadien valide?',
        options: [
          { value: 'oui', label: 'Oui', result: 'Vous pouvez renouveler votre passeport en ligne.' },
          { value: 'non', label: 'Non', result: 'Vous devez demander un nouveau passeport.' }
        ]
      }
    ];

    return html`
      <div lang="fr-CA">
        <wb-fieldflow .steps="${steps}"></wb-fieldflow>
      </div>
    `;
  }
};
