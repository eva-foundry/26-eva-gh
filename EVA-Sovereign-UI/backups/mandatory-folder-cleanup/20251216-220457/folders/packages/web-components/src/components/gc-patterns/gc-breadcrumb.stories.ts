import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-breadcrumb';

const meta: Meta = {
  title: 'GC Patterns/gc-breadcrumb',
  component: 'gc-breadcrumb',
  tags: ['autodocs'],
  argTypes: {
    hideHomeLink: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <gc-breadcrumb
      .items="${[
        { label: 'Services', href: '/services' },
        { label: 'Immigration and citizenship', href: '/immigration' },
        { label: 'Canadian passports' }
      ]}"
    ></gc-breadcrumb>
  `
};

export const WithoutHomeLink: Story = {
  render: () => html`
    <gc-breadcrumb
      .hideHomeLink="${true}"
      .items="${[
        { label: 'Services', href: '/services' },
        { label: 'Immigration and citizenship', href: '/immigration' },
        { label: 'Canadian passports' }
      ]}"
    ></gc-breadcrumb>
  `
};

export const ShortPath: Story = {
  render: () => html`
    <gc-breadcrumb
      .items="${[
        { label: 'Services', href: '/services' },
        { label: 'Travel and tourism' }
      ]}"
    ></gc-breadcrumb>
  `
};

export const LongPath: Story = {
  render: () => html`
    <gc-breadcrumb
      .items="${[
        { label: 'Services', href: '/services' },
        { label: 'Immigration and citizenship', href: '/immigration' },
        { label: 'Visit, work or study in Canada', href: '/visit' },
        { label: 'Work in Canada', href: '/work' },
        { label: 'International Experience Canada', href: '/iec' },
        { label: 'Apply for a work permit' }
      ]}"
    ></gc-breadcrumb>
  `
};

export const WithEvents: Story = {
  render: () => html`
    <gc-breadcrumb
      .items="${[
        { label: 'Services', href: '/services' },
        { label: 'Immigration', href: '/immigration' },
        { label: 'Passports' }
      ]}"
      @gc-breadcrumb-click="${(e: CustomEvent) => {
        console.log('Breadcrumb clicked:', e.detail);
      }}"
    ></gc-breadcrumb>
    <p style="margin-top: 1rem; padding: 1rem; background: #f0f0f0; border-radius: 4px;">
      <strong>Try:</strong> Click any breadcrumb link and check the console for event details.
    </p>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-breadcrumb
      locale="fr-CA"
      .items="${[
        { label: 'Services', href: '/services' },
        { label: 'Immigration et citoyenneté', href: '/immigration' },
        { label: 'Passeports canadiens' }
      ]}"
    ></gc-breadcrumb>
  `
};

export const InPageContext: Story = {
  render: () => html`
    <div style="max-width: 1200px; margin: 0 auto;">
      <gc-breadcrumb
        .items="${[
          { label: 'Services', href: '/services' },
          { label: 'Immigration and citizenship', href: '/immigration' },
          { label: 'Visit, work or study in Canada', href: '/visit' },
          { label: 'Work in Canada' }
        ]}"
      ></gc-breadcrumb>

      <main style="padding: 2rem 0;">
        <h1 style="margin-bottom: 1rem; font-size: 2rem; color: #333;">Work in Canada</h1>
        
        <p style="margin-bottom: 1rem; color: #555; line-height: 1.6;">
          Most people need a work permit to work in Canada. A work permit lets a foreign national 
          work in Canada during a specific period of time.
        </p>

        <div style="margin-top: 2rem; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #26374a;">
          <h2 style="margin: 0 0 1rem 0; font-size: 1.25rem;">On this page</h2>
          <ul style="margin: 0; padding-left: 1.5rem;">
            <li style="margin-bottom: 0.5rem;">Who can work in Canada</li>
            <li style="margin-bottom: 0.5rem;">Types of work permits</li>
            <li style="margin-bottom: 0.5rem;">How to apply</li>
            <li>After you apply</li>
          </ul>
        </div>
      </main>
    </div>
  `
};
