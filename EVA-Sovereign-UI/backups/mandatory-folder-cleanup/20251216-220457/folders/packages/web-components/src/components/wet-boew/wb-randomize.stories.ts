import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-randomize.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-randomize',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const RandomQuote: Story = {
  render: () => html`
    <div style="max-width: 600px; margin: 0 auto;">
      <h3>Quote of the Day</h3>
      <wb-randomize>
        <blockquote style="padding: 1rem; background: #f5f5f5; border-left: 4px solid #26374a;">
          "The only way to do great work is to love what you do." — Steve Jobs
        </blockquote>
        <blockquote style="padding: 1rem; background: #f5f5f5; border-left: 4px solid #26374a;">
          "Innovation distinguishes between a leader and a follower." — Steve Jobs
        </blockquote>
        <blockquote style="padding: 1rem; background: #f5f5f5; border-left: 4px solid #26374a;">
          "The future belongs to those who believe in the beauty of their dreams." — Eleanor Roosevelt
        </blockquote>
        <blockquote style="padding: 1rem; background: #f5f5f5; border-left: 4px solid #26374a;">
          "Success is not final, failure is not fatal: it is the courage to continue that counts." — Winston Churchill
        </blockquote>
      </wb-randomize>
    </div>
  `
};

export const RandomTip: Story = {
  render: () => html`
    <div style="max-width: 500px;">
      <div style="background: #e7f3ff; padding: 1rem; border-radius: 4px;">
        <h4 style="margin: 0 0 0.5rem 0; color: #004085;">💡 Did you know?</h4>
        <wb-randomize>
          <p style="margin: 0;">
            You can save your application progress and return to complete it later. 
            Your information is saved automatically every 5 minutes.
          </p>
          <p style="margin: 0;">
            Documents can be uploaded in PDF, JPG, or PNG format. Maximum file size is 5 MB.
          </p>
          <p style="margin: 0;">
            You can track your application status online using your reference number. 
            Updates are available 24/7.
          </p>
          <p style="margin: 0;">
            Contact our support team via live chat Monday to Friday, 8 AM to 8 PM EST. 
            Average wait time is less than 2 minutes.
          </p>
          <p style="margin: 0;">
            Subscribe to email notifications to receive updates about your application. 
            You can unsubscribe at any time.
          </p>
        </wb-randomize>
      </div>
    </div>
  `
};

export const SeededRandom: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <h3>Consistent Random Selection (Seed: 12345)</h3>
      <p>This will always select the same item because it uses a seed value:</p>
      <wb-randomize seed="12345">
        <div style="padding: 1rem; background: #d4edda; margin-bottom: 0.5rem; border-radius: 4px;">
          Option A - Green
        </div>
        <div style="padding: 1rem; background: #cce5ff; margin-bottom: 0.5rem; border-radius: 4px;">
          Option B - Blue
        </div>
        <div style="padding: 1rem; background: #fff3cd; margin-bottom: 0.5rem; border-radius: 4px;">
          Option C - Yellow
        </div>
        <div style="padding: 1rem; background: #f8d7da; margin-bottom: 0.5rem; border-radius: 4px;">
          Option D - Red
        </div>
      </wb-randomize>
    </div>
  `
};

export const ShuffleMode: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <h3>Shuffled List</h3>
      <p>All items are shown but in random order:</p>
      <wb-randomize shuffle>
        <div style="padding: 0.75rem; background: white; border: 1px solid #ddd; margin-bottom: 0.5rem;">
          <strong>Step 1:</strong> Review eligibility requirements
        </div>
        <div style="padding: 0.75rem; background: white; border: 1px solid #ddd; margin-bottom: 0.5rem;">
          <strong>Step 2:</strong> Gather required documents
        </div>
        <div style="padding: 0.75rem; background: white; border: 1px solid #ddd; margin-bottom: 0.5rem;">
          <strong>Step 3:</strong> Complete the online form
        </div>
        <div style="padding: 0.75rem; background: white; border: 1px solid #ddd; margin-bottom: 0.5rem;">
          <strong>Step 4:</strong> Submit your application
        </div>
        <div style="padding: 0.75rem; background: white; border: 1px solid #ddd; margin-bottom: 0.5rem;">
          <strong>Step 5:</strong> Track your application status
        </div>
      </wb-randomize>
    </div>
  `
};

export const WithRerandomize: Story = {
  render: () => {
    const handleClick = () => {
      const randomizer = document.getElementById('randomizer-demo') as any;
      if (randomizer) {
        randomizer.rerandomize();
      }
    };

    return html`
      <div style="max-width: 600px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="margin: 0;">Random Featured Service</h3>
          <button
            @click="${handleClick}"
            style="padding: 0.5rem 1rem; background: #26374a; color: white; border: none; border-radius: 3px; cursor: pointer;"
          >
            Get New Service
          </button>
        </div>
        <wb-randomize id="randomizer-demo">
          <div style="padding: 1.5rem; background: white; border: 2px solid #26374a; border-radius: 4px;">
            <h4 style="margin: 0 0 0.5rem 0;">Passport Services</h4>
            <p style="margin: 0;">Apply for a new passport or renew your existing one online.</p>
          </div>
          <div style="padding: 1.5rem; background: white; border: 2px solid #26374a; border-radius: 4px;">
            <h4 style="margin: 0 0 0.5rem 0;">Tax Information</h4>
            <p style="margin: 0;">File your taxes, check refund status, and access tax forms.</p>
          </div>
          <div style="padding: 1.5rem; background: white; border: 2px solid #26374a; border-radius: 4px;">
            <h4 style="margin: 0 0 0.5rem 0;">Employment Services</h4>
            <p style="margin: 0;">Search for jobs, access training programs, and career resources.</p>
          </div>
          <div style="padding: 1.5rem; background: white; border: 2px solid #26374a; border-radius: 4px;">
            <h4 style="margin: 0 0 0.5rem 0;">Health Benefits</h4>
            <p style="margin: 0;">Learn about health coverage options and apply for benefits.</p>
          </div>
        </wb-randomize>
      </div>
    `;
  }
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <wb-randomize
        @wb-randomize-selected="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = 'Selected item at index: ' + e.detail.index;
        }}"
      >
        <div style="padding: 1rem; background: #d4edda; margin-bottom: 0.5rem;">Item 1</div>
        <div style="padding: 1rem; background: #cce5ff; margin-bottom: 0.5rem;">Item 2</div>
        <div style="padding: 1rem; background: #fff3cd; margin-bottom: 0.5rem;">Item 3</div>
      </wb-randomize>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA" style="max-width: 600px;">
      <h3>Citation aléatoire</h3>
      <wb-randomize>
        <blockquote style="padding: 1rem; background: #f5f5f5; border-left: 4px solid #26374a;">
          "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte."
        </blockquote>
        <blockquote style="padding: 1rem; background: #f5f5f5; border-left: 4px solid #26374a;">
          "L'innovation distingue un leader d'un suiveur."
        </blockquote>
        <blockquote style="padding: 1rem; background: #f5f5f5; border-left: 4px solid #26374a;">
          "L'avenir appartient à ceux qui croient en la beauté de leurs rêves."
        </blockquote>
      </wb-randomize>
    </div>
  `
};
