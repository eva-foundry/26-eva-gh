import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-breadcrumbs';

const meta: Meta = {
  title: 'GC Patterns/gc-breadcrumbs',
  component: 'gc-breadcrumbs',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <gc-breadcrumbs></gc-breadcrumbs>
  `
};

export const SimpleTrail: Story = {
  render: () => html`
    <gc-breadcrumbs
      .items="${[
        { text: 'Home', href: '/' },
        { text: 'Products', href: '/products' },
        { text: 'Electronics' }
      ]}"
    ></gc-breadcrumbs>
  `
};

export const LongTrail: Story = {
  render: () => html`
    <gc-breadcrumbs
      .items="${[
        { text: 'Home', href: '/' },
        { text: 'Canada', href: '/canada' },
        { text: 'Immigration', href: '/canada/immigration' },
        { text: 'Citizenship', href: '/canada/immigration/citizenship' },
        { text: 'Application Process' }
      ]}"
    ></gc-breadcrumbs>
  `
};

export const CustomSeparator: Story = {
  render: () => html`
    <gc-breadcrumbs
      separator="/"
      .items="${[
        { text: 'Home', href: '/' },
        { text: 'Services', href: '/services' },
        { text: 'Current Page' }
      ]}"
    ></gc-breadcrumbs>
  `
};

export const ArrowSeparator: Story = {
  render: () => html`
    <gc-breadcrumbs
      separator="→"
      .items="${[
        { text: 'Home', href: '/' },
        { text: 'About', href: '/about' },
        { text: 'Team' }
      ]}"
    ></gc-breadcrumbs>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-breadcrumbs
      locale="fr-CA"
      .items="${[
        { text: 'Accueil', href: '/' },
        { text: 'Services', href: '/services' },
        { text: 'Page actuelle' }
      ]}"
    ></gc-breadcrumbs>
  `
};

export const CanadaDotCaStyle: Story = {
  render: () => html`
    <div style="font-family: Lato, sans-serif; max-width: 1200px; margin: 0 auto; padding: 1rem;">
      <gc-breadcrumbs
        .items="${[
          { text: 'Canada.ca', href: 'https://www.canada.ca' },
          { text: 'Services', href: '#services' },
          { text: 'Benefits', href: '#benefits' },
          { text: 'Employment Insurance' }
        ]}"
      ></gc-breadcrumbs>
      
      <h1 style="margin-top: 2rem;">Employment Insurance</h1>
      <p>Main page content goes here...</p>
    </div>
  `
};

export const WithoutLinks: Story = {
  render: () => html`
    <gc-breadcrumbs
      .items="${[
        { text: 'Section 1' },
        { text: 'Section 2' },
        { text: 'Current Section' }
      ]}"
    ></gc-breadcrumbs>
  `
};

export const SingleItem: Story = {
  render: () => html`
    <gc-breadcrumbs
      .items="${[
        { text: 'Current Page' }
      ]}"
    ></gc-breadcrumbs>
  `
};

export const MixedLinks: Story = {
  render: () => html`
    <gc-breadcrumbs
      .items="${[
        { text: 'Home', href: '/' },
        { text: 'Section' },
        { text: 'Subsection', href: '/section/subsection' },
        { text: 'Current' }
      ]}"
    ></gc-breadcrumbs>
  `
};

export const MobileView: Story = {
  render: () => html`
    <div style="max-width: 375px; margin: 0 auto; border: 1px solid #ddd; padding: 1rem;">
      <gc-breadcrumbs
        .items="${[
          { text: 'Home', href: '/' },
          { text: 'Services', href: '/services' },
          { text: 'Immigration', href: '/services/immigration' },
          { text: 'Apply' }
        ]}"
      ></gc-breadcrumbs>
    </div>
  `
};

export const InteractiveDemo: Story = {
  render: () => html`
    <div style="font-family: Lato, sans-serif;">
      <h3>Navigation Trail Example</h3>
      
      <gc-breadcrumbs
        .items="${[
          { text: 'Home', href: '#home' },
          { text: 'Products', href: '#products' },
          { text: 'Electronics', href: '#electronics' },
          { text: 'Laptops' }
        ]}"
      ></gc-breadcrumbs>
      
      <div style="margin-top: 2rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;">
        <p><strong>Click on any breadcrumb link to navigate.</strong></p>
        <p>The current page is shown without a link and in bold.</p>
      </div>
    </div>
  `
};

export const GovernmentPortal: Story = {
  render: () => html`
    <div style="font-family: Lato, sans-serif; max-width: 1200px; margin: 0 auto;">
      <header style="padding: 1.5rem 0; border-bottom: 4px solid #ffb700; background: #26374a; color: #fff; margin-bottom: 1rem;">
        <div style="font-size: 1.25rem; font-weight: 700; padding: 0 1rem;">Government of Canada</div>
      </header>
      
      <div style="padding: 0 1rem;">
        <gc-breadcrumbs
          .items="${[
            { text: 'Canada.ca', href: '#' },
            { text: 'Immigration and citizenship', href: '#immigration' },
            { text: 'Visit Canada', href: '#visit' },
            { text: 'Apply for a visitor visa' }
          ]}"
        ></gc-breadcrumbs>
        
        <h1 style="margin-top: 2rem;">Apply for a visitor visa</h1>
        <p>Find out if you need a visa to visit Canada...</p>
      </div>
    </div>
  `
};

export const DeepHierarchy: Story = {
  render: () => html`
    <gc-breadcrumbs
      .items="${[
        { text: 'Root', href: '/' },
        { text: 'Level 1', href: '/l1' },
        { text: 'Level 2', href: '/l1/l2' },
        { text: 'Level 3', href: '/l1/l2/l3' },
        { text: 'Level 4', href: '/l1/l2/l3/l4' },
        { text: 'Level 5', href: '/l1/l2/l3/l4/l5' },
        { text: 'Current Page' }
      ]}"
    ></gc-breadcrumbs>
  `
};

export const CustomStyling: Story = {
  render: () => html`
    <style>
      .custom-breadcrumbs {
        --eva-colors-link: #0066cc;
        --eva-colors-link-hover: #003d7a;
        --eva-colors-text: #1a1a1a;
      }
    </style>
    
    <div class="custom-breadcrumbs">
      <gc-breadcrumbs
        .items="${[
          { text: 'Home', href: '/' },
          { text: 'Category', href: '/category' },
          { text: 'Current' }
        ]}"
      ></gc-breadcrumbs>
    </div>
  `
};
