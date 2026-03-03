import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-services-info';

const meta: Meta = {
  title: 'GC Patterns/gc-services-info',
  component: 'gc-services-info',
  parameters: {
    docs: {
      description: {
        component: 'Government of Canada Services and Information doormat pattern. Displays topic sections with lists of related links in a responsive grid layout. Used on Canada.ca homepages and topic pages for service discovery.'
      }
    }
  },
  argTypes: {
    columns: {
      control: { type: 'radio' },
      options: [2, 3],
      description: 'Number of columns in desktop layout'
    }
  }
};

export default meta;
type Story = StoryObj;

const canadaHomepageSections = [
  {
    heading: 'Jobs and workplace',
    links: [
      { label: 'Find a job', href: '#jobs-find' },
      { label: 'Training', href: '#jobs-training' },
      { label: 'Hiring programs', href: '#jobs-hiring' },
      { label: 'Employment Insurance', href: '#ei' },
      { label: 'Pensions', href: '#pensions' }
    ]
  },
  {
    heading: 'Immigration and citizenship',
    links: [
      { label: 'Visit Canada', href: '#visit' },
      { label: 'Immigrate', href: '#immigrate' },
      { label: 'Work permits', href: '#work-permits' },
      { label: 'Study permits', href: '#study-permits' },
      { label: 'Citizenship', href: '#citizenship' }
    ]
  },
  {
    heading: 'Travel and tourism',
    links: [
      { label: 'Travel advice', href: '#travel-advice' },
      { label: 'Passports', href: '#passports' },
      { label: 'Attractions', href: '#attractions' },
      { label: 'Events', href: '#events' },
      { label: 'Funding for events', href: '#funding' }
    ]
  }
];

export const CanadaHomepage: Story = {
  render: () => html`
    <gc-services-info
      .sections="${canadaHomepageSections}"
      columns="3">
    </gc-services-info>
  `
};

export const TwoColumns: Story = {
  render: () => html`
    <gc-services-info
      .sections="${[
        {
          heading: 'Benefits',
          links: [
            { label: 'Employment Insurance', href: '#ei' },
            { label: 'Family and caregiving benefits', href: '#family' },
            { label: 'Public pensions', href: '#pensions' },
            { label: 'Student aid', href: '#student-aid' },
            { label: 'Housing benefits', href: '#housing' }
          ]
        },
        {
          heading: 'Health',
          links: [
            { label: 'Food and nutrition', href: '#food' },
            { label: 'Diseases and conditions', href: '#diseases' },
            { label: 'Vaccines', href: '#vaccines' },
            { label: 'Drug and health products', href: '#drugs' },
            { label: 'Environmental health', href: '#environment' }
          ]
        }
      ]}"
      columns="2">
    </gc-services-info>
  `
};

export const WithIcons: Story = {
  render: () => html`
    <gc-services-info
      .sections="${[
        {
          heading: 'Digital services',
          links: [
            { label: 'Sign in', href: '#signin', icon: '🔐' },
            { label: 'My Account', href: '#account', icon: '👤' },
            { label: 'Online forms', href: '#forms', icon: '📝' },
            { label: 'Help and support', href: '#help', icon: '❓' }
          ]
        },
        {
          heading: 'Contact us',
          links: [
            { label: 'Email', href: 'mailto:info@canada.ca', icon: '✉️' },
            { label: 'Phone', href: 'tel:1-800-622-6232', icon: '📞' },
            { label: 'Live chat', href: '#chat', icon: '💬' },
            { label: 'Office locations', href: '#locations', icon: '📍' }
          ]
        },
        {
          heading: 'About us',
          links: [
            { label: 'News', href: '#news', icon: '📰' },
            { label: 'Reports', href: '#reports', icon: '📊' },
            { label: 'Transparency', href: '#transparency', icon: '🔍' },
            { label: 'Careers', href: '#careers', icon: '💼' }
          ]
        }
      ]}"
      columns="3">
    </gc-services-info>
  `
};

export const TopicPage: Story = {
  render: () => html`
    <h1>Jobs and the workplace</h1>
    <gc-services-info
      .sections="${[
        {
          heading: 'Finding a job',
          links: [
            { label: 'Job Bank', href: '#job-bank' },
            { label: 'Career planning', href: '#career-planning' },
            { label: 'Job search strategies', href: '#job-search' },
            { label: 'Employment services', href: '#employment-services' }
          ]
        },
        {
          heading: 'Training and skills development',
          links: [
            { label: 'Apprenticeships', href: '#apprenticeships' },
            { label: 'Skills and training programs', href: '#training' },
            { label: 'Foreign credentials', href: '#credentials' },
            { label: 'Youth employment programs', href: '#youth' }
          ]
        },
        {
          heading: 'Workplace rights and safety',
          links: [
            { label: 'Labour standards', href: '#labour-standards' },
            { label: 'Health and safety', href: '#safety' },
            { label: 'Workplace discrimination', href: '#discrimination' },
            { label: 'Unions', href: '#unions' }
          ]
        }
      ]}"
      columns="3">
    </gc-services-info>
  `
};

export const CustomContent: Story = {
  render: () => html`
    <gc-services-info>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
        <div>
          <h2>Custom Section 1</h2>
          <ul>
            <li><a href="#link1">Custom Link 1</a></li>
            <li><a href="#link2">Custom Link 2</a></li>
          </ul>
        </div>
        <div>
          <h2>Custom Section 2</h2>
          <ul>
            <li><a href="#link3">Custom Link 3</a></li>
            <li><a href="#link4">Custom Link 4</a></li>
          </ul>
        </div>
        <div>
          <h2>Custom Section 3</h2>
          <ul>
            <li><a href="#link5">Custom Link 5</a></li>
            <li><a href="#link6">Custom Link 6</a></li>
          </ul>
        </div>
      </div>
    </gc-services-info>
  `
};

export const WithEvents: Story = {
  render: () => html`
    <gc-services-info
      .sections="${canadaHomepageSections}"
      columns="3"
      @gc-services-link-click="${(e: CustomEvent) => {
        console.log('Link clicked:', e.detail);
        alert(`Clicked: ${e.detail.link} in ${e.detail.section}`);
      }}">
    </gc-services-info>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-services-info
      locale="fr-CA"
      .sections="${[
        {
          heading: 'Emplois et milieu de travail',
          links: [
            { label: 'Trouver un emploi', href: '#emploi' },
            { label: 'Formation', href: '#formation' },
            { label: 'Programmes d\'embauche', href: '#embauche' },
            { label: 'Assurance-emploi', href: '#ae' }
          ]
        },
        {
          heading: 'Immigration et citoyenneté',
          links: [
            { label: 'Visiter le Canada', href: '#visiter' },
            { label: 'Immigrer', href: '#immigrer' },
            { label: 'Permis de travail', href: '#travail' },
            { label: 'Citoyenneté', href: '#citoyennete' }
          ]
        },
        {
          heading: 'Voyage et tourisme',
          links: [
            { label: 'Conseils aux voyageurs', href: '#conseils' },
            { label: 'Passeports', href: '#passeports' },
            { label: 'Attractions', href: '#attractions' },
            { label: 'Événements', href: '#evenements' }
          ]
        }
      ]}"
      columns="3">
    </gc-services-info>
  `
};
