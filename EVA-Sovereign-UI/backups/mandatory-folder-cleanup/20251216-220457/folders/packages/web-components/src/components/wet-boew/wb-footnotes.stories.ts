import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-footnotes.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-footnotes',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const BasicFootnotes: Story = {
  render: () => html`
    <wb-footnotes>
      <p>
        The Web Experience Toolkit (WET)<span data-footnote="WET is developed by the Government of Canada"></span> 
        provides reusable components for building accessible web applications. It was first released in 2010<span data-footnote="Initial release was version 1.0"></span> 
        and has been widely adopted across government websites.
      </p>
    </wb-footnotes>
  `
};

export const MultipleFootnotes: Story = {
  render: () => html`
    <wb-footnotes>
      <article>
        <h3>Climate Change Research</h3>
        <p>
          Global temperatures have risen by 1.1°C<span data-footnote="Source: IPCC Report 2021"></span> 
          since the pre-industrial era. This increase is primarily driven by human activities<span data-footnote="Including fossil fuel combustion and deforestation"></span>, 
          particularly the emission of greenhouse gases<span data-footnote="CO2, methane, and nitrous oxide are the main contributors"></span>.
        </p>
        <p>
          Scientists predict that without significant action<span data-footnote="Reducing emissions by 45% by 2030"></span>, 
          we could see temperature increases of 2-3°C<span data-footnote="Compared to pre-industrial levels"></span> 
          by the end of the century.
        </p>
      </article>
    </wb-footnotes>
  `
};

export const AcademicPaper: Story = {
  render: () => html`
    <wb-footnotes>
      <article>
        <h2>The Impact of Web Accessibility</h2>
        <p>
          Web accessibility ensures that websites are usable by everyone<span data-footnote="W3C Web Content Accessibility Guidelines (WCAG) 2.1"></span>, 
          including people with disabilities. Research shows that accessible websites have higher user satisfaction<span data-footnote="Study by Nielsen Norman Group, 2020"></span> 
          and better search engine rankings<span data-footnote="Google prioritizes accessible content in search results"></span>.
        </p>
        <p>
          The economic case for accessibility is also compelling<span data-footnote="Forrester Research: The Business Case for Accessibility, 2019"></span>. 
          Organizations that prioritize accessibility see improved brand reputation<span data-footnote="Measured by customer surveys and social media sentiment"></span> 
          and reduced legal risk<span data-footnote="ADA compliance lawsuits have increased 320% since 2018"></span>.
        </p>
      </article>
    </wb-footnotes>
  `
};

export const SingleFootnote: Story = {
  render: () => html`
    <wb-footnotes>
      <p>
        This document was last updated on January 15, 2025<span data-footnote="Next review scheduled for July 2025"></span>.
      </p>
    </wb-footnotes>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <wb-footnotes
        @wb-footnotes-processed="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Processed ${e.detail.count} footnote(s)`;
        }}"
      >
        <p>
          First reference<span data-footnote="First note"></span> and second reference<span data-footnote="Second note"></span>.
        </p>
      </wb-footnotes>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-footnotes>
        <p>
          La Trousse d'expérience Web (WET)<span data-footnote="Développé par le gouvernement du Canada"></span> 
          fournit des composants réutilisables pour créer des applications Web accessibles.
        </p>
      </wb-footnotes>
    </div>
  `
};
