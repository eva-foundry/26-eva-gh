import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-zebra.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-zebra',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const BasicTable: Story = {
  render: () => html`
    <wb-zebra>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #26374a; color: white;">
            <th style="padding: 0.5rem; text-align: left;">Name</th>
            <th style="padding: 0.5rem; text-align: left;">Department</th>
            <th style="padding: 0.5rem; text-align: left;">Location</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 0.5rem;">Alice Johnson</td><td style="padding: 0.5rem;">Engineering</td><td style="padding: 0.5rem;">Ottawa</td></tr>
          <tr><td style="padding: 0.5rem;">Bob Smith</td><td style="padding: 0.5rem;">Design</td><td style="padding: 0.5rem;">Toronto</td></tr>
          <tr><td style="padding: 0.5rem;">Carol White</td><td style="padding: 0.5rem;">Marketing</td><td style="padding: 0.5rem;">Vancouver</td></tr>
          <tr><td style="padding: 0.5rem;">David Brown</td><td style="padding: 0.5rem;">Sales</td><td style="padding: 0.5rem;">Montreal</td></tr>
          <tr><td style="padding: 0.5rem;">Eve Davis</td><td style="padding: 0.5rem;">Engineering</td><td style="padding: 0.5rem;">Calgary</td></tr>
        </tbody>
      </table>
    </wb-zebra>
  `
};

export const UnorderedList: Story = {
  render: () => html`
    <wb-zebra>
      <ul style="list-style: none; padding: 0; margin: 0;">
        <li style="padding: 0.75rem;">Improve website accessibility</li>
        <li style="padding: 0.75rem;">Add bilingual support</li>
        <li style="padding: 0.75rem;">Update design system</li>
        <li style="padding: 0.75rem;">Conduct user testing</li>
        <li style="padding: 0.75rem;">Deploy to production</li>
      </ul>
    </wb-zebra>
  `
};

export const OrderedList: Story = {
  render: () => html`
    <wb-zebra>
      <ol style="padding-left: 2rem;">
        <li style="padding: 0.5rem;">Review project requirements</li>
        <li style="padding: 0.5rem;">Create wireframes and mockups</li>
        <li style="padding: 0.5rem;">Develop components</li>
        <li style="padding: 0.5rem;">Write tests</li>
        <li style="padding: 0.5rem;">Deploy and monitor</li>
      </ol>
    </wb-zebra>
  `
};

export const DataTable: Story = {
  render: () => html`
    <wb-zebra>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
        <thead>
          <tr style="background: #26374a; color: white;">
            <th style="padding: 0.75rem; border: 1px solid #ddd;">Province</th>
            <th style="padding: 0.75rem; border: 1px solid #ddd;">Capital</th>
            <th style="padding: 0.75rem; border: 1px solid #ddd;">Population (2021)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 0.5rem; border: 1px solid #ddd;">Ontario</td><td style="padding: 0.5rem; border: 1px solid #ddd;">Toronto</td><td style="padding: 0.5rem; border: 1px solid #ddd;">14,826,276</td></tr>
          <tr><td style="padding: 0.5rem; border: 1px solid #ddd;">Quebec</td><td style="padding: 0.5rem; border: 1px solid #ddd;">Quebec City</td><td style="padding: 0.5rem; border: 1px solid #ddd;">8,501,833</td></tr>
          <tr><td style="padding: 0.5rem; border: 1px solid #ddd;">British Columbia</td><td style="padding: 0.5rem; border: 1px solid #ddd;">Victoria</td><td style="padding: 0.5rem; border: 1px solid #ddd;">5,214,805</td></tr>
          <tr><td style="padding: 0.5rem; border: 1px solid #ddd;">Alberta</td><td style="padding: 0.5rem; border: 1px solid #ddd;">Edmonton</td><td style="padding: 0.5rem; border: 1px solid #ddd;">4,442,879</td></tr>
          <tr><td style="padding: 0.5rem; border: 1px solid #ddd;">Manitoba</td><td style="padding: 0.5rem; border: 1px solid #ddd;">Winnipeg</td><td style="padding: 0.5rem; border: 1px solid #ddd;">1,342,153</td></tr>
        </tbody>
      </table>
    </wb-zebra>
  `
};

export const MultipleTables: Story = {
  render: () => html`
    <wb-zebra>
      <h3>Team A</h3>
      <table style="width: 100%; margin-bottom: 2rem; border-collapse: collapse;">
        <tr><td style="padding: 0.5rem;">Member 1</td><td style="padding: 0.5rem;">Developer</td></tr>
        <tr><td style="padding: 0.5rem;">Member 2</td><td style="padding: 0.5rem;">Designer</td></tr>
        <tr><td style="padding: 0.5rem;">Member 3</td><td style="padding: 0.5rem;">Manager</td></tr>
      </table>
      
      <h3>Team B</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 0.5rem;">Member 4</td><td style="padding: 0.5rem;">Developer</td></tr>
        <tr><td style="padding: 0.5rem;">Member 5</td><td style="padding: 0.5rem;">QA</td></tr>
        <tr><td style="padding: 0.5rem;">Member 6</td><td style="padding: 0.5rem;">DevOps</td></tr>
      </table>
    </wb-zebra>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <wb-zebra
        @wb-zebra-applied="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Zebra striping applied to ${e.detail.rows} rows`;
        }}"
      >
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 0.5rem;">Row 1</td></tr>
          <tr><td style="padding: 0.5rem;">Row 2</td></tr>
          <tr><td style="padding: 0.5rem;">Row 3</td></tr>
          <tr><td style="padding: 0.5rem;">Row 4</td></tr>
          <tr><td style="padding: 0.5rem;">Row 5</td></tr>
        </table>
      </wb-zebra>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-zebra>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #26374a; color: white;">
              <th style="padding: 0.5rem;">Nom</th>
              <th style="padding: 0.5rem;">Département</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 0.5rem;">Alice</td><td style="padding: 0.5rem;">Ingénierie</td></tr>
            <tr><td style="padding: 0.5rem;">Bob</td><td style="padding: 0.5rem;">Design</td></tr>
            <tr><td style="padding: 0.5rem;">Carol</td><td style="padding: 0.5rem;">Marketing</td></tr>
          </tbody>
        </table>
      </wb-zebra>
    </div>
  `
};
