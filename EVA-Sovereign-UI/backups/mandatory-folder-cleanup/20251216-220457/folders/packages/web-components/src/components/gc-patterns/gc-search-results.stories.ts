import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-search-results';

const meta: Meta = {
  title: 'GC Patterns/gc-search-results',
  component: 'gc-search-results',
  tags: ['autodocs'],
  argTypes: {
    query: { control: 'text' },
    pageSize: { control: 'number' },
    currentPage: { control: 'number' }
  }
};

export default meta;
type Story = StoryObj;

const sampleResults = [
  {
    title: 'Apply for a Canadian passport',
    url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports.html',
    description: 'Learn about applying for, renewing, replacing or updating a Canadian passport. Find out what documents you need, how to apply, and how long it takes.',
    date: '2024-01-15',
    breadcrumb: ['Home', 'Travel', 'Passports']
  },
  {
    title: 'Renew your adult passport',
    url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/renew-adult-passport.html',
    description: 'How to renew your adult Canadian passport by mail or in person. Includes forms, fees, and processing times.',
    date: '2024-02-20',
    breadcrumb: ['Home', 'Travel', 'Passports', 'Renew']
  },
  {
    title: 'Get a Canadian passport for your child',
    url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/child-passport.html',
    description: 'Find out how to apply for a passport for your child, including required documents and parental consent.',
    date: '2024-01-10',
    breadcrumb: ['Home', 'Travel', 'Passports', 'Child']
  },
  {
    title: 'Replace a lost, stolen or damaged passport',
    url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/replace.html',
    description: 'What to do if your passport is lost, stolen or damaged. Report it and apply for a replacement.',
    date: '2024-03-05',
    breadcrumb: ['Home', 'Travel', 'Passports', 'Replace']
  },
  {
    title: 'Passport fees',
    url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/fees.html',
    description: 'Fees for Canadian passport services including new passports, renewals, and urgent processing.',
    date: '2024-01-01',
    breadcrumb: ['Home', 'Travel', 'Passports', 'Fees']
  }
];

export const Default: Story = {
  render: () => html`
    <gc-search-results
      query="passport"
      .results="${sampleResults}"
      .totalResults="${5}"
      .currentPage="${1}"
      .pageSize="${10}"
      .totalPages="${1}"
    ></gc-search-results>
  `
};

export const WithPagination: Story = {
  render: () => html`
    <gc-search-results
      query="Canada government services"
      .results="${sampleResults}"
      .totalResults="${50}"
      .currentPage="${1}"
      .pageSize="${5}"
      .totalPages="${10}"
    ></gc-search-results>
  `
};

export const NoResults: Story = {
  render: () => html`
    <gc-search-results
      query="xyznonexistent"
      .results="${[]}"
      .totalResults="${0}"
      .currentPage="${1}"
      .pageSize="${10}"
      .totalPages="${0}"
    ></gc-search-results>
  `
};

export const WithoutDates: Story = {
  render: () => {
    const resultsNoDates = sampleResults.map(r => ({
      title: r.title,
      url: r.url,
      description: r.description,
      breadcrumb: r.breadcrumb
    }));

    return html`
      <gc-search-results
        query="passport"
        .results="${resultsNoDates}"
        .totalResults="${5}"
        .currentPage="${1}"
        .pageSize="${10}"
        .totalPages="${1}"
      ></gc-search-results>
    `;
  }
};

export const WithoutBreadcrumbs: Story = {
  render: () => {
    const resultsNoBreadcrumbs = sampleResults.map(r => ({
      title: r.title,
      url: r.url,
      description: r.description,
      date: r.date
    }));

    return html`
      <gc-search-results
        query="passport"
        .results="${resultsNoBreadcrumbs}"
        .totalResults="${5}"
        .currentPage="${1}"
        .pageSize="${10}"
        .totalPages="${1}"
      ></gc-search-results>
    `;
  }
};

export const WithEvents: Story = {
  render: () => html`
    <gc-search-results
      query="passport"
      .results="${sampleResults}"
      .totalResults="${50}"
      .currentPage="${1}"
      .pageSize="${5}"
      .totalPages="${10}"
      @gc-result-click="${(e: CustomEvent) => console.log('Result clicked:', e.detail)}"
      @gc-page-change="${(e: CustomEvent) => console.log('Page changed to:', e.detail.page)}"
    ></gc-search-results>
    <p style="margin-top: 1rem; padding: 1rem; background: #f0f0f0; border-radius: 4px;">
      <strong>Try:</strong> Click on a result or use pagination. Check the console for events.
    </p>
  `
};

export const FrenchCanadian: Story = {
  render: () => {
    const frenchResults = [
      {
        title: 'Demander un passeport canadien',
        url: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/passeports-canadiens.html',
        description: 'Renseignez-vous sur la façon de demander, renouveler, remplacer ou mettre à jour un passeport canadien.',
        date: '2024-01-15',
        breadcrumb: ['Accueil', 'Voyage', 'Passeports']
      },
      {
        title: 'Renouveler votre passeport pour adulte',
        url: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/passeports-canadiens/renouveler-passeport-adulte.html',
        description: 'Comment renouveler votre passeport canadien pour adulte par la poste ou en personne.',
        date: '2024-02-20',
        breadcrumb: ['Accueil', 'Voyage', 'Passeports', 'Renouveler']
      },
      {
        title: 'Obtenir un passeport canadien pour votre enfant',
        url: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/passeports-canadiens/passeport-enfant.html',
        description: 'Découvrez comment demander un passeport pour votre enfant, y compris les documents requis.',
        date: '2024-01-10',
        breadcrumb: ['Accueil', 'Voyage', 'Passeports', 'Enfant']
      }
    ];

    return html`
      <gc-search-results
        locale="fr-CA"
        query="passeport"
        .results="${frenchResults}"
        .totalResults="${3}"
        .currentPage="${1}"
        .pageSize="${10}"
        .totalPages="${1}"
      ></gc-search-results>
    `;
  }
};
