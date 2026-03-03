import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-tooltip';

const meta: Meta = {
  title: 'GC Patterns/gc-tooltip',
  component: 'gc-tooltip',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <p>
      Hover over the icon for more information
      <gc-tooltip text="This is a helpful tooltip providing additional context."></gc-tooltip>
    </p>
  `
};

export const WithCustomText: Story = {
  render: () => html`
    <p>
      Terms and conditions apply
      <gc-tooltip text="You must be a resident of Canada to be eligible for this program."></gc-tooltip>
    </p>
  `
};

export const WithoutIcon: Story = {
  render: () => html`
    <p>
      <gc-tooltip 
        text="Additional information about this link" 
        showIcon="false"
      >
        Hover here
      </gc-tooltip>
      for more details
    </p>
  `
};

export const CustomIconLabel: Story = {
  render: () => html`
    <p>
      Important notice
      <gc-tooltip text="This feature is currently in beta testing." iconLabel="!"></gc-tooltip>
    </p>
  `
};

export const PositionTop: Story = {
  render: () => html`
    <div style="padding: 60px; text-align: center;">
      <gc-tooltip 
        text="This tooltip appears above the icon" 
        position="top"
      >
        Hover (Top)
      </gc-tooltip>
    </div>
  `
};

export const PositionBottom: Story = {
  render: () => html`
    <div style="padding: 60px; text-align: center;">
      <gc-tooltip 
        text="This tooltip appears below the icon" 
        position="bottom"
      >
        Hover (Bottom)
      </gc-tooltip>
    </div>
  `
};

export const PositionLeft: Story = {
  render: () => html`
    <div style="padding: 60px; text-align: center;">
      <gc-tooltip 
        text="This tooltip appears to the left" 
        position="left"
      >
        Hover (Left)
      </gc-tooltip>
    </div>
  `
};

export const PositionRight: Story = {
  render: () => html`
    <div style="padding: 60px; text-align: center;">
      <gc-tooltip 
        text="This tooltip appears to the right" 
        position="right"
      >
        Hover (Right)
      </gc-tooltip>
    </div>
  `
};

export const InlineWithText: Story = {
  render: () => html`
    <p>
      The Government of Canada provides a variety of services to citizens
      <gc-tooltip text="Services include healthcare, education, employment support, and more."></gc-tooltip>
      and residents across the country. These services are designed to improve quality of life
      <gc-tooltip text="Quality of life includes access to healthcare, safe communities, and economic opportunities."></gc-tooltip>
      and support communities.
    </p>
  `
};

export const FormLabel: Story = {
  render: () => html`
    <div>
      <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
        Social Insurance Number (SIN)
        <gc-tooltip text="Your 9-digit SIN is used to access government programs and benefits. Keep it secure and never share it publicly."></gc-tooltip>
      </label>
      <input 
        type="text" 
        placeholder="XXX-XXX-XXX" 
        style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; width: 200px;"
      />
    </div>
  `
};

export const MultipleTooltips: Story = {
  render: () => html`
    <div style="padding: 60px;">
      <h3>Application Requirements</h3>
      <ul>
        <li>
          Canadian citizenship or permanent residency
          <gc-tooltip text="You must provide proof of citizenship or permanent resident status." position="right"></gc-tooltip>
        </li>
        <li>
          Age 18 or older
          <gc-tooltip text="Applicants must be of legal age at the time of application." position="right"></gc-tooltip>
        </li>
        <li>
          Valid government-issued ID
          <gc-tooltip text="Acceptable forms of ID include passport, driver's license, or provincial ID card." position="right"></gc-tooltip>
        </li>
        <li>
          Proof of residence
          <gc-tooltip text="Recent utility bill, lease agreement, or property tax statement showing your current address." position="right"></gc-tooltip>
        </li>
      </ul>
    </div>
  `
};

export const LongTooltipText: Story = {
  render: () => html`
    <p>
      Privacy policy
      <gc-tooltip 
        text="The Government of Canada is committed to protecting your privacy. We collect, use, and disclose personal information in accordance with the Privacy Act. Your information will only be used for the purposes stated in this application and will be protected with appropriate security measures. For more information about our privacy practices, please visit canada.ca/privacy."
      ></gc-tooltip>
    </p>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <p>
      Survolez l'icône pour plus d'informations
      <gc-tooltip 
        locale="fr-CA"
        text="Ceci est une info-bulle utile fournissant un contexte supplémentaire."
      ></gc-tooltip>
    </p>
  `
};

export const DataTable: Story = {
  render: () => html`
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background: #f5f5f5; border-bottom: 2px solid #ddd;">
          <th style="padding: 0.75rem; text-align: left;">
            Program Name
            <gc-tooltip text="Official name of the government program" position="bottom"></gc-tooltip>
          </th>
          <th style="padding: 0.75rem; text-align: left;">
            Eligibility
            <gc-tooltip text="Minimum requirements to qualify for the program" position="bottom"></gc-tooltip>
          </th>
          <th style="padding: 0.75rem; text-align: left;">
            Benefit Amount
            <gc-tooltip text="Maximum benefit amount per fiscal year" position="bottom"></gc-tooltip>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 0.75rem;">Canada Child Benefit</td>
          <td style="padding: 0.75rem;">Has dependent children</td>
          <td style="padding: 0.75rem;">$6,997/year</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 0.75rem;">GST/HST Credit</td>
          <td style="padding: 0.75rem;">Low to moderate income</td>
          <td style="padding: 0.75rem;">$467/year</td>
        </tr>
      </tbody>
    </table>
  `
};

export const ButtonWithTooltip: Story = {
  render: () => html`
    <div style="padding: 60px;">
      <button 
        style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer; margin-right: 1rem;"
      >
        Submit Application
      </button>
      <gc-tooltip 
        text="Make sure all required fields are completed before submitting. You will receive a confirmation email within 24 hours."
        position="right"
      >
        <span style="text-decoration: underline;">Need help?</span>
      </gc-tooltip>
    </div>
  `
};

export const KeyboardAccessible: Story = {
  render: () => html`
    <div>
      <p>
        Use Tab key to navigate to the tooltip icon, then press Enter or Space to show/hide.
        Press Escape to hide the tooltip.
      </p>
      <p>
        Important information
        <gc-tooltip text="This tooltip is fully keyboard accessible for assistive technology users."></gc-tooltip>
      </p>
    </div>
  `
};
