import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-carousel.js';

const meta: Meta = {
  title: 'GC Design Patterns/gc-carousel',
  component: 'gc-carousel',
  tags: ['autodocs'],
  argTypes: {
    autoPlay: { control: 'boolean' },
    interval: { control: 'number' },
    locale: {
      control: { type: 'select' },
      options: ['en-CA', 'fr-CA']
    }
  }
};

export default meta;
type Story = StoryObj;

const newsSlides = [
  {
    image: 'https://picsum.photos/800/400?random=1',
    alt: 'Government announcement',
    heading: 'New program to support small businesses',
    description: 'The Government of Canada announces $2 billion in new funding for small and medium enterprises affected by recent economic challenges.',
    href: '#announcement-1'
  },
  {
    image: 'https://picsum.photos/800/400?random=2',
    alt: 'Public health update',
    heading: 'Health Canada approves new vaccine',
    description: 'Health Canada has authorized a new vaccine that will be available to eligible Canadians starting next month.',
    href: '#health-update'
  },
  {
    image: 'https://picsum.photos/800/400?random=3',
    alt: 'Infrastructure project',
    heading: 'Major infrastructure investment announced',
    description: 'A $10 billion investment in green infrastructure will create thousands of jobs and reduce carbon emissions.',
    href: '#infrastructure'
  },
  {
    image: 'https://picsum.photos/800/400?random=4',
    alt: 'Education initiative',
    heading: 'New skills training programs launching nationwide',
    description: 'Free training programs in technology, healthcare, and skilled trades to help Canadians transition to new careers.',
    href: '#education'
  }
];

const serviceSlides = [
  {
    image: 'https://picsum.photos/800/400?random=5',
    alt: 'Employment Insurance',
    heading: 'Employment Insurance (EI)',
    description: 'Find out if you qualify for EI benefits and how to apply online.',
    href: '#ei'
  },
  {
    image: 'https://picsum.photos/800/400?random=6',
    alt: 'Passport services',
    heading: 'Apply for a passport',
    description: 'Get information on how to apply for or renew your Canadian passport.',
    href: '#passport'
  },
  {
    image: 'https://picsum.photos/800/400?random=7',
    alt: 'Tax services',
    heading: 'File your taxes online',
    description: 'Use our online services to file your tax return quickly and securely.',
    href: '#taxes'
  }
];

export const NewsHighlights: Story = {
  args: {
    slides: newsSlides,
    autoPlay: false,
    interval: 5000
  },
  render: (args) => html`
    <gc-carousel
      .slides="${args.slides}"
      ?autoPlay="${args.autoPlay}"
      .interval="${args.interval}"
      locale="${args.locale || 'en-CA'}"
    ></gc-carousel>
  `
};

export const WithAutoPlay: Story = {
  args: {
    slides: newsSlides,
    autoPlay: true,
    interval: 3000
  },
  render: (args) => html`
    <gc-carousel
      .slides="${args.slides}"
      ?autoPlay="${args.autoPlay}"
      .interval="${args.interval}"
      locale="${args.locale || 'en-CA'}"
    ></gc-carousel>
  `
};

export const ServiceHighlights: Story = {
  args: {
    slides: serviceSlides,
    autoPlay: false,
    interval: 5000
  },
  render: (args) => html`
    <gc-carousel
      .slides="${args.slides}"
      ?autoPlay="${args.autoPlay}"
      .interval="${args.interval}"
      locale="${args.locale || 'en-CA'}"
    ></gc-carousel>
  `
};

export const TwoSlides: Story = {
  args: {
    slides: newsSlides.slice(0, 2),
    autoPlay: false,
    interval: 5000
  },
  render: (args) => html`
    <gc-carousel
      .slides="${args.slides}"
      ?autoPlay="${args.autoPlay}"
      .interval="${args.interval}"
      locale="${args.locale || 'en-CA'}"
    ></gc-carousel>
  `
};

export const WithEvents: Story = {
  args: {
    slides: newsSlides,
    autoPlay: false,
    interval: 5000
  },
  render: (args) => html`
    <gc-carousel
      .slides="${args.slides}"
      ?autoPlay="${args.autoPlay}"
      .interval="${args.interval}"
      locale="${args.locale || 'en-CA'}"
      @gc-carousel-slide-change="${(e: CustomEvent) => {
        console.log('Slide changed to:', e.detail.currentSlide);
        const event = new CustomEvent('storybook-event', {
          detail: {
            eventName: 'gc-carousel-slide-change',
            data: e.detail
          },
          bubbles: true,
          composed: true
        });
        document.dispatchEvent(event);
      }}"
    ></gc-carousel>
    <div style="margin-top: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;">
      <p style="margin: 0; font-size: 0.875rem; color: #666;">
        Open the browser console to see slide change events
      </p>
    </div>
  `
};

export const FrenchCanadian: Story = {
  args: {
    slides: [
      {
        image: 'https://picsum.photos/800/400?random=8',
        alt: 'Annonce gouvernementale',
        heading: 'Nouveau programme pour soutenir les petites entreprises',
        description: 'Le gouvernement du Canada annonce un financement de 2 milliards de dollars pour les petites et moyennes entreprises touchées par les récents défis économiques.',
        href: '#annonce-1'
      },
      {
        image: 'https://picsum.photos/800/400?random=9',
        alt: 'Mise à jour santé publique',
        heading: 'Santé Canada approuve un nouveau vaccin',
        description: 'Santé Canada a autorisé un nouveau vaccin qui sera disponible pour les Canadiens admissibles le mois prochain.',
        href: '#sante'
      },
      {
        image: 'https://picsum.photos/800/400?random=10',
        alt: 'Projet d\'infrastructure',
        heading: 'Investissement majeur en infrastructure annoncé',
        description: 'Un investissement de 10 milliards de dollars dans les infrastructures vertes créera des milliers d\'emplois et réduira les émissions de carbone.',
        href: '#infrastructure'
      }
    ],
    autoPlay: false,
    interval: 5000,
    locale: 'fr-CA'
  },
  render: (args) => html`
    <gc-carousel
      .slides="${args.slides}"
      ?autoPlay="${args.autoPlay}"
      .interval="${args.interval}"
      locale="${args.locale}"
    ></gc-carousel>
  `
};
