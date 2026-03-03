import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-feature-tiles';

const meta: Meta = {
  title: 'GC Patterns/gc-feature-tiles',
  component: 'gc-feature-tiles'
};

export default meta;
type Story = StoryObj;

const sampleFeatures = [
  {
    image: 'https://via.placeholder.com/400x200/2572b4/ffffff?text=Jobs',
    alt: 'Jobs and workplace',
    heading: 'Jobs and workplace',
    description: 'Find a job, training programs, and employment insurance information.',
    href: '#jobs',
    ctaLabel: 'Explore jobs'
  },
  {
    image: 'https://via.placeholder.com/400x200/4CAF50/ffffff?text=Immigration',
    alt: 'Immigration services',
    heading: 'Immigration and citizenship',
    description: 'Visit, study, work or immigrate to Canada. Apply for citizenship.',
    href: '#immigration',
    ctaLabel: 'Learn more'
  },
  {
    image: 'https://via.placeholder.com/400x200/ff9900/ffffff?text=Benefits',
    alt: 'Benefits and programs',
    heading: 'Benefits',
    description: 'Employment Insurance, family benefits, pensions, and student aid.',
    href: '#benefits',
    ctaLabel: 'View benefits'
  }
];

export const ThreeColumns: Story = {
  render: () => html`
    <gc-feature-tiles .features="${sampleFeatures}" columns="3"></gc-feature-tiles>
  `
};

export const TwoColumns: Story = {
  render: () => html`
    <gc-feature-tiles .features="${sampleFeatures}" columns="2"></gc-feature-tiles>
  `
};

export const FourColumns: Story = {
  render: () => html`
    <gc-feature-tiles 
      .features="${[
        ...sampleFeatures,
        {
          image: 'https://via.placeholder.com/400x200/d3080c/ffffff?text=Taxes',
          alt: 'Taxes',
          heading: 'Taxes',
          description: 'File your taxes, get tax credits and benefits.',
          href: '#taxes',
          ctaLabel: 'File taxes'
        }
      ]}" 
      columns="4">
    </gc-feature-tiles>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-feature-tiles 
      locale="fr-CA"
      .features="${[
        {
          image: 'https://via.placeholder.com/400x200/2572b4/ffffff?text=Emplois',
          alt: 'Emplois et milieu de travail',
          heading: 'Emplois et milieu de travail',
          description: 'Trouvez un emploi, des programmes de formation et des renseignements sur l\'assurance-emploi.',
          href: '#emplois',
          ctaLabel: 'Explorer les emplois'
        }
      ]}" 
      columns="3">
    </gc-feature-tiles>
  `
};
