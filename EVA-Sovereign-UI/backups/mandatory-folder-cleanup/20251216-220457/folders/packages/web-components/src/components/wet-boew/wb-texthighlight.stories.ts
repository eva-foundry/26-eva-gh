import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-texthighlight.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-texthighlight',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const BasicHighlight: Story = {
  render: () => html`
    <wb-texthighlight query="accessibility">
      <article>
        <h3>Web Accessibility</h3>
        <p>
          Accessibility is essential for creating inclusive web experiences. 
          When we prioritize accessibility, we ensure that everyone can access 
          and use web content, regardless of their abilities. Accessibility 
          benefits all users, not just those with disabilities.
        </p>
      </article>
    </wb-texthighlight>
  `
};

export const WithControls: Story = {
  render: () => html`
    <wb-texthighlight query="the" show-controls>
      <article>
        <h3>Lorem Ipsum</h3>
        <p>
          The quick brown fox jumps over the lazy dog. The dog was not amused 
          by the fox's antics. The fox, on the other hand, was quite pleased 
          with itself for successfully jumping over the dog.
        </p>
      </article>
    </wb-texthighlight>
  `
};

export const CaseSensitive: Story = {
  render: () => html`
    <div>
      <p style="margin-bottom: 1rem; padding: 0.5rem; background: #f0f0f0;">
        Case-sensitive search: only "Test" (capitalized) will be highlighted
      </p>
      <wb-texthighlight query="Test" case-sensitive>
        <p>
          Test and test are different. This Test is highlighted, but this test is not.
          Another Test here, but not this test.
        </p>
      </wb-texthighlight>
    </div>
  `
};

export const WholeWord: Story = {
  render: () => html`
    <div>
      <p style="margin-bottom: 1rem; padding: 0.5rem; background: #f0f0f0;">
        Whole-word search: only complete "test" words are highlighted
      </p>
      <wb-texthighlight query="test" whole-word>
        <p>
          Testing, tested, and tester contain "test" but are not highlighted.
          Only the word test by itself is highlighted. Here's another test.
        </p>
      </wb-texthighlight>
    </div>
  `
};

export const SearchResults: Story = {
  render: () => html`
    <div>
      <h3>Search Results for "canada"</h3>
      <wb-texthighlight query="canada" show-controls>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <article style="padding: 1rem; border: 1px solid #ddd;">
            <h4>Government of Canada</h4>
            <p>
              Canada's government provides services to citizens across the country.
              The Government of Canada website is the primary source for official 
              information about Canada and its programs.
            </p>
          </article>
          
          <article style="padding: 1rem; border: 1px solid #ddd;">
            <h4>About Canada</h4>
            <p>
              Canada is the second-largest country in the world by land area.
              From coast to coast, Canada offers diverse landscapes and cultures.
            </p>
          </article>
          
          <article style="padding: 1rem; border: 1px solid #ddd;">
            <h4>Visit Canada</h4>
            <p>
              Millions of tourists visit Canada each year to experience its 
              natural beauty and welcoming communities.
            </p>
          </article>
        </div>
      </wb-texthighlight>
    </div>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <wb-texthighlight 
        query="example"
        show-controls
        @wb-texthighlight-highlighted="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Found ${e.detail.matchCount} matches for "${e.detail.query}"`;
        }}"
        @wb-texthighlight-navigate="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Navigated to match ${e.detail.index + 1}`;
        }}"
        @wb-texthighlight-cleared="${() => {
          const log = document.getElementById('log');
          if (log) log.textContent = 'Highlights cleared';
        }}"
      >
        <p>
          This is an example paragraph with multiple example words. 
          Each example word will be highlighted. Click the controls to 
          navigate between example matches.
        </p>
      </wb-texthighlight>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-texthighlight query="gouvernement" show-controls>
        <article>
          <h3>Le gouvernement du Canada</h3>
          <p>
            Le gouvernement fournit des services aux citoyens. Les sites Web du 
            gouvernement offrent des informations officielles sur les programmes 
            et services gouvernementaux.
          </p>
        </article>
      </wb-texthighlight>
    </div>
  `
};
