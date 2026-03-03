import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-footer';

const meta: Meta = {
  title: 'GC Patterns/gc-footer',
  component: 'gc-footer',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <gc-footer></gc-footer>
  `
};

export const WithLogo: Story = {
  render: () => html`
    <gc-footer
      logoSrc="https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms-blk.svg"
      logoAlt="Symbol of the Government of Canada"
    ></gc-footer>
  `
};

export const CustomSections: Story = {
  render: () => html`
    <gc-footer
      .sections="${[
        {
          heading: 'Services',
          links: [
            { text: 'Jobs', href: '#jobs' },
            { text: 'Immigration', href: '#immigration' },
            { text: 'Travel', href: '#travel' },
            { text: 'Business', href: '#business' }
          ]
        },
        {
          heading: 'Government',
          links: [
            { text: 'How government works', href: '#how' },
            { text: 'Departments', href: '#departments' },
            { text: 'Prime Minister', href: '#pm' }
          ]
        },
        {
          heading: 'Resources',
          links: [
            { text: 'Publications', href: '#publications' },
            { text: 'Data', href: '#data' },
            { text: 'Research', href: '#research' }
          ]
        }
      ]}"
    ></gc-footer>
  `
};

export const CustomSubLinks: Story = {
  render: () => html`
    <gc-footer
      .subLinks="${[
        { text: 'Social media', href: '#social' },
        { text: 'Mobile apps', href: '#mobile' },
        { text: 'About Canada.ca', href: '#about' },
        { text: 'Terms and conditions', href: '#terms' },
        { text: 'Privacy', href: '#privacy' }
      ]}"
    ></gc-footer>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-footer locale="fr-CA"></gc-footer>
  `
};

export const CanadaDotCaStyle: Story = {
  render: () => html`
    <div style="font-family: Lato, sans-serif;">
      <main style="padding: 2rem; min-height: 300px;">
        <h1>Page Content</h1>
        <p>Main content goes here...</p>
      </main>
      
      <gc-footer
        logoSrc="https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms-blk.svg"
        .sections="${[
          {
            heading: 'About government',
            links: [
              { text: 'Contact us', href: '#contact' },
              { text: 'Departments and agencies', href: '#departments' },
              { text: 'Public service and military', href: '#public' },
              { text: 'News', href: '#news' },
              { text: 'Treaties, laws and regulations', href: '#laws' },
              { text: 'Government-wide reporting', href: '#reporting' }
            ]
          },
          {
            heading: 'Themes and topics',
            links: [
              { text: 'Jobs', href: '#jobs' },
              { text: 'Immigration and citizenship', href: '#immigration' },
              { text: 'Travel and tourism', href: '#travel' },
              { text: 'Business', href: '#business' },
              { text: 'Benefits', href: '#benefits' },
              { text: 'Health', href: '#health' },
              { text: 'Taxes', href: '#taxes' }
            ]
          }
        ]}"
        .subLinks="${[
          { text: 'Social media', href: '#social' },
          { text: 'Mobile applications', href: '#mobile' },
          { text: 'About Canada.ca', href: '#about' },
          { text: 'Terms and conditions', href: '#terms' },
          { text: 'Privacy', href: '#privacy' }
        ]}"
      ></gc-footer>
    </div>
  `
};

export const MinimalFooter: Story = {
  render: () => html`
    <gc-footer
      .sections="${[
        {
          heading: 'Quick Links',
          links: [
            { text: 'Contact', href: '#contact' },
            { text: 'About', href: '#about' }
          ]
        }
      ]}"
      .subLinks="${[
        { text: 'Privacy', href: '#privacy' },
        { text: 'Terms', href: '#terms' }
      ]}"
    ></gc-footer>
  `
};

export const ExtendedFooter: Story = {
  render: () => html`
    <gc-footer
      logoSrc="https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms-blk.svg"
      .sections="${[
        {
          heading: 'Services and information',
          links: [
            { text: 'Jobs', href: '#' },
            { text: 'Immigration', href: '#' },
            { text: 'Travel', href: '#' },
            { text: 'Business', href: '#' },
            { text: 'Benefits', href: '#' },
            { text: 'Health', href: '#' },
            { text: 'Taxes', href: '#' },
            { text: 'Environment', href: '#' }
          ]
        },
        {
          heading: 'Government',
          links: [
            { text: 'How government works', href: '#' },
            { text: 'Departments', href: '#' },
            { text: 'Prime Minister', href: '#' },
            { text: 'Open government', href: '#' }
          ]
        },
        {
          heading: 'Transparency',
          links: [
            { text: 'Reporting', href: '#' },
            { text: 'Budgets', href: '#' },
            { text: 'Audits', href: '#' }
          ]
        },
        {
          heading: 'Connect',
          links: [
            { text: 'Social media', href: '#' },
            { text: 'Newsletters', href: '#' },
            { text: 'Contact us', href: '#' }
          ]
        }
      ]}"
      .subLinks="${[
        { text: 'Social media', href: '#' },
        { text: 'Mobile applications', href: '#' },
        { text: 'About Canada.ca', href: '#' },
        { text: 'Terms and conditions', href: '#' },
        { text: 'Privacy', href: '#' }
      ]}"
    ></gc-footer>
  `
};

export const DarkTheme: Story = {
  render: () => html`
    <style>
      .dark-theme gc-footer {
        --eva-colors-background-dark: #1a1a1a;
        --eva-colors-background-darker: #0d0d0d;
        --eva-colors-white: #f5f5f5;
      }
    </style>
    
    <div class="dark-theme">
      <gc-footer
        .sections="${[
          {
            heading: 'Company',
            links: [
              { text: 'About us', href: '#' },
              { text: 'Careers', href: '#' },
              { text: 'Contact', href: '#' }
            ]
          },
          {
            heading: 'Legal',
            links: [
              { text: 'Privacy', href: '#' },
              { text: 'Terms', href: '#' }
            ]
          }
        ]}"
      ></gc-footer>
    </div>
  `
};

export const MobileView: Story = {
  render: () => html`
    <div style="max-width: 375px; margin: 0 auto; border: 1px solid #ddd;">
      <gc-footer
        .sections="${[
          {
            heading: 'Services',
            links: [
              { text: 'Jobs', href: '#' },
              { text: 'Immigration', href: '#' },
              { text: 'Travel', href: '#' }
            ]
          },
          {
            heading: 'About',
            links: [
              { text: 'Contact us', href: '#' },
              { text: 'Departments', href: '#' }
            ]
          }
        ]}"
        .subLinks="${[
          { text: 'Privacy', href: '#' },
          { text: 'Terms', href: '#' }
        ]}"
      ></gc-footer>
    </div>
  `
};

export const FullPageExample: Story = {
  render: () => html`
    <div style="min-height: 100vh; display: flex; flex-direction: column; font-family: Lato, sans-serif;">
      <header style="padding: 1.5rem 2rem; background: #26374a; color: #fff; border-bottom: 4px solid #ffb700;">
        <div style="font-size: 1.25rem; font-weight: 700;">Government of Canada</div>
      </header>
      
      <main style="flex: 1; padding: 2rem;">
        <h1>Page Title</h1>
        <p>Main content area...</p>
        <p>The footer will always be at the bottom of the page.</p>
      </main>
      
      <gc-footer
        logoSrc="https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms-blk.svg"
        .sections="${[
          {
            heading: 'About government',
            links: [
              { text: 'Contact us', href: '#' },
              { text: 'Departments', href: '#' }
            ]
          },
          {
            heading: 'Themes and topics',
            links: [
              { text: 'Jobs', href: '#' },
              { text: 'Immigration', href: '#' }
            ]
          }
        ]}"
      ></gc-footer>
    </div>
  `
};
