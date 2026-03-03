import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-tabbed-interface.js';

interface GCTabbedInterfaceStoryArgs {
  tabs: any[];
  locale: string;
}

const meta: Meta<GCTabbedInterfaceStoryArgs> = {
  title: 'GC Patterns/gc-tabbed-interface',
  tags: ['autodocs'],
  render: (args) => html`
    <gc-tabbed-interface
      .tabs="${args.tabs}"
      .locale="${args.locale}"
    ></gc-tabbed-interface>
  `,
  argTypes: {
    tabs: { control: 'object' },
    locale: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<GCTabbedInterfaceStoryArgs>;

const benefitTabs = [
  {
    id: 'overview',
    label: 'Overview',
    content: 'The Canada Child Benefit (CCB) is a tax-free monthly payment made to eligible families to help with the cost of raising children under 18 years of age.'
  },
  {
    id: 'eligibility',
    label: 'Eligibility',
    content: 'You must live with the child, and the child must be under 18 years of age. You must be primarily responsible for the care and upbringing of the child. You must be a resident of Canada for tax purposes.'
  },
  {
    id: 'apply',
    label: 'How to apply',
    content: 'You should apply for the CCB as soon as possible after your child is born or starts living with you. You can apply online through My Account or by mail using the Canada Child Benefits Application form.'
  },
  {
    id: 'payment',
    label: 'Payment dates',
    content: 'CCB payments are made on the 20th of each month. If the 20th falls on a weekend or statutory holiday, you will receive your payment on the last business day before the 20th.'
  }
];

const serviceTabs = [
  {
    id: 'passports',
    label: 'Passports',
    content: 'Apply for or renew a passport for travel outside Canada. Standard processing time is 20 business days, with express and urgent options available.'
  },
  {
    id: 'sin',
    label: 'Social Insurance Number',
    content: 'Apply for a Social Insurance Number (SIN), which is required to work in Canada or to access government programs and benefits.'
  },
  {
    id: 'taxes',
    label: 'Taxes',
    content: 'File your income tax return, check your refund status, and access tax information. Most Canadians must file a tax return by April 30.'
  }
];

const tabsWithDisabled = [
  {
    id: 'active1',
    label: 'Active Tab 1',
    content: 'This is the first active tab content.'
  },
  {
    id: 'disabled',
    label: 'Disabled Tab',
    content: 'This content should not be accessible.',
    disabled: true
  },
  {
    id: 'active2',
    label: 'Active Tab 2',
    content: 'This is the second active tab content.'
  }
];

export const Default: Story = {
  args: {
    tabs: benefitTabs,
    locale: 'en-CA'
  }
};

export const ThreeTabs: Story = {
  args: {
    tabs: serviceTabs,
    locale: 'en-CA'
  }
};

export const WithDisabled: Story = {
  args: {
    tabs: tabsWithDisabled,
    locale: 'en-CA'
  }
};

export const TwoTabs: Story = {
  args: {
    tabs: [
      {
        id: 'individuals',
        label: 'For individuals',
        content: 'Find information and services for individuals, including taxes, immigration, health, and travel.'
      },
      {
        id: 'businesses',
        label: 'For businesses',
        content: 'Find information and services for businesses, including starting a business, taxes, hiring, and importing/exporting.'
      }
    ],
    locale: 'en-CA'
  }
};

export const WithEvents: Story = {
  args: {
    tabs: benefitTabs,
    locale: 'en-CA'
  },
  render: (args) => html`
    <gc-tabbed-interface
      .tabs="${args.tabs}"
      @gc-tab-change="${(e: CustomEvent) => console.log('Tab changed:', e.detail)}"
    ></gc-tabbed-interface>
  `
};

export const FrenchCanadian: Story = {
  args: {
    tabs: [
      {
        id: 'apercu',
        label: 'Aperçu',
        content: 'L\'Allocation canadienne pour enfants (ACE) est un paiement mensuel non imposable versé aux familles admissibles pour les aider à subvenir aux besoins de leurs enfants de moins de 18 ans.'
      },
      {
        id: 'admissibilite',
        label: 'Admissibilité',
        content: 'Vous devez vivre avec l\'enfant, et l\'enfant doit être âgé de moins de 18 ans. Vous devez être principalement responsable des soins et de l\'éducation de l\'enfant.'
      },
      {
        id: 'demande',
        label: 'Comment faire une demande',
        content: 'Vous devriez faire une demande d\'ACE dès que possible après la naissance de votre enfant ou dès qu\'il commence à vivre avec vous.'
      },
      {
        id: 'paiement',
        label: 'Dates de paiement',
        content: 'Les paiements de l\'ACE sont effectués le 20 de chaque mois. Si le 20 tombe un week-end ou un jour férié, vous recevrez votre paiement le dernier jour ouvrable avant le 20.'
      }
    ],
    locale: 'fr-CA'
  }
};
