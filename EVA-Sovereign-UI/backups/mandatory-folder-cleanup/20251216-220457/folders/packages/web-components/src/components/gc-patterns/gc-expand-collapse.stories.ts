import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-expand-collapse.js';

interface GCExpandCollapseStoryArgs {
  panels: any[];
  allowMultiple: boolean;
  locale: string;
}

const meta: Meta<GCExpandCollapseStoryArgs> = {
  title: 'GC Patterns/gc-expand-collapse',
  tags: ['autodocs'],
  render: (args) => html`
    <gc-expand-collapse
      .panels="${args.panels}"
      .allowMultiple="${args.allowMultiple}"
      .locale="${args.locale}"
    ></gc-expand-collapse>
  `,
  argTypes: {
    panels: { control: 'object' },
    allowMultiple: { control: 'boolean' },
    locale: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<GCExpandCollapseStoryArgs>;

const faqPanels = [
  {
    id: 'passport-apply',
    heading: 'How do I apply for a passport?',
    content: 'You can apply for a passport online through the Government of Canada website or in person at a Service Canada office. Make sure you have all required documents before starting your application.',
    expanded: false
  },
  {
    id: 'passport-documents',
    heading: 'What documents do I need?',
    content: 'You will need proof of Canadian citizenship (birth certificate or citizenship certificate), valid identification (driver\'s license), two identical passport photos, and a completed application form.',
    expanded: false
  },
  {
    id: 'passport-time',
    heading: 'How long does it take?',
    content: 'Standard processing time is 20 business days. Express service (10 business days) and urgent service (2-9 business days) are available for an additional fee. Processing times may vary during peak periods.',
    expanded: false
  },
  {
    id: 'passport-cost',
    heading: 'How much does it cost?',
    content: 'A 5-year passport costs $120 and a 10-year passport costs $160. Additional fees apply for express or urgent service. Children under 16 can only get a 5-year passport.',
    expanded: false
  }
];

const benefitsPanels = [
  {
    id: 'ccb',
    heading: 'Canada Child Benefit',
    content: 'The Canada Child Benefit (CCB) is a tax-free monthly payment made to eligible families to help with the cost of raising children under 18 years of age.',
    expanded: true
  },
  {
    id: 'gst',
    heading: 'GST/HST Credit',
    content: 'The goods and services tax/harmonized sales tax (GST/HST) credit is a tax-free quarterly payment that helps individuals and families with low and modest incomes offset all or part of the GST or HST that they pay.',
    expanded: false
  }
];

export const Default: Story = {
  args: {
    panels: faqPanels,
    allowMultiple: false,
    locale: 'en-CA'
  }
};

export const AllowMultiple: Story = {
  args: {
    panels: faqPanels,
    allowMultiple: true,
    locale: 'en-CA'
  }
};

export const PreExpanded: Story = {
  args: {
    panels: benefitsPanels,
    allowMultiple: false,
    locale: 'en-CA'
  }
};

export const SinglePanel: Story = {
  args: {
    panels: [
      {
        id: 'contact',
        heading: 'How can I contact Service Canada?',
        content: 'Call 1-800-O-Canada (1-800-622-6232) or TTY: 1-800-926-9105. Service is available Monday to Friday, 8 am to 8 pm (local time).',
        expanded: false
      }
    ],
    allowMultiple: false,
    locale: 'en-CA'
  }
};

export const WithEvents: Story = {
  args: {
    panels: faqPanels,
    allowMultiple: false,
    locale: 'en-CA'
  },
  render: (args) => html`
    <gc-expand-collapse
      .panels="${args.panels}"
      .allowMultiple="${args.allowMultiple}"
      @gc-panel-expand="${(e: CustomEvent) => console.log('Panel expanded:', e.detail)}"
      @gc-panel-collapse="${(e: CustomEvent) => console.log('Panel collapsed:', e.detail)}"
    ></gc-expand-collapse>
  `
};

export const FrenchCanadian: Story = {
  args: {
    panels: [
      {
        id: 'passeport-demande',
        heading: 'Comment puis-je demander un passeport?',
        content: 'Vous pouvez demander un passeport en ligne sur le site Web du gouvernement du Canada ou en personne dans un bureau de Service Canada. Assurez-vous d\'avoir tous les documents requis avant de commencer votre demande.',
        expanded: false
      },
      {
        id: 'passeport-documents',
        heading: 'Quels documents ai-je besoin?',
        content: 'Vous aurez besoin d\'une preuve de citoyenneté canadienne, d\'une pièce d\'identité valide, de deux photos de passeport identiques et d\'un formulaire de demande rempli.',
        expanded: false
      },
      {
        id: 'passeport-delai',
        heading: 'Combien de temps cela prend-il?',
        content: 'Le délai de traitement standard est de 20 jours ouvrables. Le service express (10 jours ouvrables) et le service urgent (2 à 9 jours ouvrables) sont disponibles moyennant des frais supplémentaires.',
        expanded: false
      }
    ],
    allowMultiple: false,
    locale: 'fr-CA'
  }
};
