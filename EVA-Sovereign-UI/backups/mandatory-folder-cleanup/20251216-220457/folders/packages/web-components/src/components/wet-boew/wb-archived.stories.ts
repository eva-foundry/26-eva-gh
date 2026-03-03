import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-archived.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-archived',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const BasicArchived: Story = {
  render: () => html`
    <wb-archived></wb-archived>
    <div style="padding: 1rem; background: white; border: 1px solid #ddd;">
      <h2 style="margin-top: 0;">Archived Policy Document</h2>
      <p>
        This document contains information about policies that were in effect
        from 2015 to 2020. The information may no longer be current.
      </p>
      <p>
        For the most up-to-date information, please visit our current policies page.
      </p>
    </div>
  `
};

export const WithDate: Story = {
  render: () => html`
    <wb-archived archivedDate="2020-03-15"></wb-archived>
    <div style="padding: 1rem; background: white; border: 1px solid #ddd;">
      <h2 style="margin-top: 0;">COVID-19 Response Guidelines (2020)</h2>
      <p>
        These guidelines were in effect during the initial response to the
        COVID-19 pandemic in 2020. They have since been updated based on
        new scientific evidence and evolving circumstances.
      </p>
    </div>
  `
};

export const CustomMessage: Story = {
  render: () => html`
    <wb-archived archivedDate="2019-11-30">
      This content is from the previous version of our website and may contain
      broken links or outdated references. We are working to migrate all content
      to the new platform.
    </wb-archived>
    <div style="padding: 1rem; background: white; border: 1px solid #ddd;">
      <h2 style="margin-top: 0;">Legacy Content</h2>
      <p>Original content goes here...</p>
    </div>
  `
};

export const Dismissible: Story = {
  render: () => html`
    <wb-archived archivedDate="2021-06-15" dismissible storageKey="demo-archived-notice">
      This is an older version of the form. A new version is available with
      additional fields and improved validation.
    </wb-archived>
    <div style="padding: 1rem; background: white; border: 1px solid #ddd;">
      <h2 style="margin-top: 0;">Application Form v1.0</h2>
      <p>
        This form can still be used for applications submitted before July 1, 2021.
      </p>
      <p style="margin-bottom: 0;">
        <strong>Note:</strong> If you are submitting a new application, please use
        the current version available on our main forms page.
      </p>
    </div>
  `
};

export const MultiplePages: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <wb-archived archivedDate="2018-09-01" dismissible storageKey="old-guide">
        This guide has been superseded by the 2023 edition. Information about
        programs, fees, and requirements may have changed.
      </wb-archived>
      
      <div style="padding: 1rem; background: white; border: 1px solid #ddd; margin-bottom: 1rem;">
        <h2 style="margin-top: 0;">Chapter 1: Introduction</h2>
        <p>Welcome to the 2018 Applicant's Guide...</p>
      </div>

      <div style="padding: 1rem; background: white; border: 1px solid #ddd; margin-bottom: 1rem;">
        <h2 style="margin-top: 0;">Chapter 2: Eligibility Requirements</h2>
        <p>To be eligible, applicants must...</p>
      </div>

      <div style="padding: 1rem; background: white; border: 1px solid #ddd;">
        <h2 style="margin-top: 0;">Chapter 3: Application Process</h2>
        <p>The application process consists of...</p>
      </div>
    </div>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <wb-archived
        archivedDate="2020-12-31"
        dismissible
        storageKey="event-demo"
        @wb-archived-dismissed="${() => {
          const log = document.getElementById('log');
          if (log) log.textContent = 'Archived notice was dismissed by user';
        }}"
      >
        Click the × button to dismiss this notice and trigger the event.
      </wb-archived>
      <div style="padding: 1rem; background: white; border: 1px solid #ddd;">
        <p>Page content appears here.</p>
      </div>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-archived archivedDate="15 mars 2020" dismissible storageKey="fr-demo">
        Cette version du document a été archivée. Une version mise à jour est disponible.
      </wb-archived>
      <div style="padding: 1rem; background: white; border: 1px solid #ddd;">
        <h2 style="margin-top: 0;">Document archivé</h2>
        <p>Le contenu de ce document date de 2020.</p>
      </div>
    </div>
  `
};
