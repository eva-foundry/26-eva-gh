import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-topic-menu.js';

const meta: Meta = {
  title: 'GC Design Patterns/gc-topic-menu',
  component: 'gc-topic-menu',
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: { type: 'select' },
      options: [2, 3]
    },
    locale: {
      control: { type: 'select' },
      options: ['en-CA', 'fr-CA']
    }
  }
};

export default meta;
type Story = StoryObj;

const canadaTopics = [
  {
    icon: '💼',
    heading: 'Jobs and workplace',
    description: 'Find a job, training, hiring programs, workplace standards',
    href: '/jobs'
  },
  {
    icon: '✈️',
    heading: 'Immigration and citizenship',
    description: 'Visit, work, study or immigrate to Canada, apply for citizenship',
    href: '/immigration'
  },
  {
    icon: '💰',
    heading: 'Taxes',
    description: 'File income tax, get the Canada Child Benefit, check RRSP limit',
    href: '/taxes'
  },
  {
    icon: '🏥',
    heading: 'Health',
    description: 'Food and nutrition, diseases and conditions, recalls and safety alerts',
    href: '/health'
  },
  {
    icon: '🛂',
    heading: 'Travel',
    description: 'Passports, advisories, returning to Canada, borders',
    href: '/travel'
  },
  {
    icon: '🏛️',
    heading: 'Benefits',
    description: 'Employment Insurance, family and caregiving, pensions, student aid',
    href: '/benefits'
  }
];

export const ThreeColumns: Story = {
  args: {
    topics: canadaTopics,
    columns: 3
  },
  render: (args) => html`
    <gc-topic-menu
      .topics="${args.topics}"
      .columns="${args.columns}"
      locale="${args.locale || 'en-CA'}"
    ></gc-topic-menu>
  `
};

export const TwoColumns: Story = {
  args: {
    topics: canadaTopics,
    columns: 2
  },
  render: (args) => html`
    <gc-topic-menu
      .topics="${args.topics}"
      .columns="${args.columns}"
      locale="${args.locale || 'en-CA'}"
    ></gc-topic-menu>
  `
};

export const FourTopics: Story = {
  args: {
    topics: canadaTopics.slice(0, 4),
    columns: 2
  },
  render: (args) => html`
    <gc-topic-menu
      .topics="${args.topics}"
      .columns="${args.columns}"
      locale="${args.locale || 'en-CA'}"
    ></gc-topic-menu>
  `
};

export const WithEvents: Story = {
  args: {
    topics: canadaTopics,
    columns: 3
  },
  render: (args) => html`
    <gc-topic-menu
      .topics="${args.topics}"
      .columns="${args.columns}"
      locale="${args.locale || 'en-CA'}"
      @gc-topic-click="${(e: CustomEvent) => {
        console.log('Topic clicked:', e.detail);
      }}"
    ></gc-topic-menu>
    <div style="margin-top: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;">
      <p style="margin: 0; font-size: 0.875rem; color: #666;">
        Open the browser console to see topic click events
      </p>
    </div>
  `
};

export const FrenchCanadian: Story = {
  args: {
    topics: [
      {
        icon: '💼',
        heading: 'Emplois et milieu de travail',
        description: 'Trouver un emploi, formation, programmes d\'embauche, normes du travail',
        href: '/emplois'
      },
      {
        icon: '✈️',
        heading: 'Immigration et citoyenneté',
        description: 'Visiter, travailler, étudier ou immigrer au Canada, demander la citoyenneté',
        href: '/immigration'
      },
      {
        icon: '💰',
        heading: 'Impôts',
        description: 'Produire sa déclaration de revenus, obtenir l\'Allocation canadienne pour enfants',
        href: '/impots'
      },
      {
        icon: '🏥',
        heading: 'Santé',
        description: 'Alimentation et nutrition, maladies et affections, rappels et alertes de sécurité',
        href: '/sante'
      },
      {
        icon: '🛂',
        heading: 'Voyage',
        description: 'Passeports, conseils aux voyageurs, retour au Canada, frontières',
        href: '/voyage'
      },
      {
        icon: '🏛️',
        heading: 'Prestations',
        description: 'Assurance-emploi, famille et proches aidants, pensions, aide aux étudiants',
        href: '/prestations'
      }
    ],
    columns: 3,
    locale: 'fr-CA'
  },
  render: (args) => html`
    <gc-topic-menu
      .topics="${args.topics}"
      .columns="${args.columns}"
      locale="${args.locale}"
    ></gc-topic-menu>
  `
};
