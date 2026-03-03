import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-search-box';

const meta: Meta = {
  title: 'GC Patterns/gc-search-box',
  component: 'gc-search-box',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <gc-search-box></gc-search-box>
  `
};

export const WithPlaceholder: Story = {
  render: () => html`
    <gc-search-box placeholder="Search Canada.ca"></gc-search-box>
  `
};

export const WithButtonText: Story = {
  render: () => html`
    <gc-search-box showButtonText></gc-search-box>
  `
};

export const CustomButtonText: Story = {
  render: () => html`
    <gc-search-box 
      showButtonText 
      buttonText="Find"
    ></gc-search-box>
  `
};

export const WithInitialValue: Story = {
  render: () => html`
    <gc-search-box value="Initial search term"></gc-search-box>
  `
};

export const WithEvents: Story = {
  render: () => {
    const handleInput = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Input:', customEvent.detail.value);
    };

    const handleSubmit = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Submit:', customEvent.detail);
      alert(`Searching for: ${customEvent.detail.value}`);
    };

    return html`
      <div>
        <p>Open browser console and type in the search box to see input events.</p>
        <gc-search-box
          @gc-search-input="${handleInput}"
          @gc-search-submit="${handleSubmit}"
        ></gc-search-box>
      </div>
    `;
  }
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-search-box locale="fr-CA"></gc-search-box>
  `
};

export const InHeader: Story = {
  render: () => html`
    <header style="padding: 1.5rem 2rem; background: #26374a; color: #fff;">
      <div style="max-width: 600px;">
        <gc-search-box placeholder="Search government services"></gc-search-box>
      </div>
    </header>
  `
};

export const FullWidth: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <gc-search-box 
        placeholder="Search all Government of Canada services" 
        showButtonText
      ></gc-search-box>
    </div>
  `
};

export const Compact: Story = {
  render: () => html`
    <div style="max-width: 400px;">
      <gc-search-box></gc-search-box>
    </div>
  `
};

export const CanadaDotCaStyle: Story = {
  render: () => html`
    <div style="font-family: Lato, sans-serif;">
      <header style="background: #fff; border-bottom: 4px solid #ffb700;">
        <div style="padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem;">
          <div style="flex-shrink: 0;">
            <img 
              src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg" 
              alt="Government of Canada"
              style="height: 40px;"
            />
          </div>
          <div style="flex: 1; max-width: 600px;">
            <gc-search-box 
              placeholder="Search Canada.ca"
              showButtonText
            ></gc-search-box>
          </div>
          <div>
            <a href="#" style="color: #333; text-decoration: underline;">Français</a>
          </div>
        </div>
      </header>
      
      <main style="padding: 2rem;">
        <h1>Government of Canada</h1>
        <p>Search pattern following Canada.ca design system.</p>
      </main>
    </div>
  `
};

export const WithTopics: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <h2 style="margin-bottom: 1rem;">Find Government Services</h2>
      
      <gc-search-box 
        placeholder="What are you looking for?"
        showButtonText
      ></gc-search-box>
      
      <div style="margin-top: 2rem;">
        <h3 style="margin-bottom: 1rem;">Popular Topics</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="#" style="padding: 0.75rem 1.5rem; background: #f5f5f5; border: 1px solid #ddd; border-radius: 4px; text-decoration: none; color: #333;">Jobs</a>
          <a href="#" style="padding: 0.75rem 1.5rem; background: #f5f5f5; border: 1px solid #ddd; border-radius: 4px; text-decoration: none; color: #333;">Immigration</a>
          <a href="#" style="padding: 0.75rem 1.5rem; background: #f5f5f5; border: 1px solid #ddd; border-radius: 4px; text-decoration: none; color: #333;">Travel</a>
          <a href="#" style="padding: 0.75rem 1.5rem; background: #f5f5f5; border: 1px solid #ddd; border-radius: 4px; text-decoration: none; color: #333;">Benefits</a>
        </div>
      </div>
    </div>
  `
};

export const HeroSearch: Story = {
  render: () => html`
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 4rem 2rem; text-align: center; color: #fff;">
      <h1 style="margin: 0 0 1rem 0; font-size: 2.5rem;">Welcome to Canada.ca</h1>
      <p style="margin: 0 0 2rem 0; font-size: 1.25rem;">Search for government services and information</p>
      
      <div style="max-width: 600px; margin: 0 auto;">
        <gc-search-box 
          placeholder="e.g., apply for passport, file taxes, find a job"
          showButtonText
        ></gc-search-box>
      </div>
    </div>
  `
};

export const MobileView: Story = {
  render: () => html`
    <div style="max-width: 375px; margin: 0 auto; border: 1px solid #ddd;">
      <header style="padding: 1rem; background: #26374a;">
        <gc-search-box placeholder="Search"></gc-search-box>
      </header>
      <main style="padding: 1rem;">
        <h2 style="font-size: 1.25rem;">Mobile View</h2>
        <p style="font-size: 0.875rem;">The search box adapts to smaller screens.</p>
      </main>
    </div>
  `
};

export const SiteSearch: Story = {
  render: () => {
    const handleSubmit = (e: Event) => {
      const customEvent = e as CustomEvent;
      const query = customEvent.detail.value;
      if (query) {
        console.log(`Performing site search for: ${query}`);
        // In a real application, this would trigger a search
      }
    };

    return html`
      <div>
        <header style="padding: 1.5rem 2rem; background: #f5f5f5; border-bottom: 2px solid #ddd;">
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 2rem;">
            <div style="font-weight: 700; font-size: 1.25rem;">My Government Site</div>
            <div style="flex: 1; max-width: 400px;">
              <gc-search-box 
                placeholder="Search this site"
                @gc-search-submit="${handleSubmit}"
              ></gc-search-box>
            </div>
          </div>
        </header>
        
        <main style="padding: 2rem;">
          <h1>Site Search Integration</h1>
          <p>Try searching to see console output. In a real application, this would perform a site search.</p>
        </main>
      </div>
    `;
  }
};
