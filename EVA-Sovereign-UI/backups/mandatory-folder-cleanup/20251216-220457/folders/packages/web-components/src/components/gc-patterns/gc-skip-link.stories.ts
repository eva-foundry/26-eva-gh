import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-skip-link';

const meta: Meta = {
  title: 'GC Patterns/gc-skip-link',
  component: 'gc-skip-link',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div>
      <gc-skip-link></gc-skip-link>
      
      <header style="padding: 2rem; background: #f5f5f5; margin-bottom: 2rem;">
        <h1>Website Header</h1>
        <nav>
          <a href="#" style="margin-right: 1rem;">Home</a>
          <a href="#" style="margin-right: 1rem;">About</a>
          <a href="#" style="margin-right: 1rem;">Services</a>
          <a href="#">Contact</a>
        </nav>
      </header>
      
      <main id="main" tabindex="-1" style="padding: 2rem; border: 2px solid #26374a;">
        <h2>Main Content</h2>
        <p>Press Tab key to reveal the skip link at the top of the page, then press Enter to jump here.</p>
        <p>The skip link allows keyboard users to bypass repetitive navigation and jump directly to the main content.</p>
      </main>
      
      <p style="margin-top: 2rem; padding: 1rem; background: #fffbcc; border-left: 4px solid #ffb700;">
        <strong>Accessibility Note:</strong> Press Tab to see the skip link appear at the top of the page.
      </p>
    </div>
  `
};

export const CustomHref: Story = {
  render: () => html`
    <div>
      <gc-skip-link href="#content"></gc-skip-link>
      
      <header style="padding: 2rem; background: #f5f5f5; margin-bottom: 2rem;">
        <h1>Custom Target Example</h1>
      </header>
      
      <div id="content" tabindex="-1" style="padding: 2rem; border: 2px solid #26374a;">
        <h2>Custom Content Area</h2>
        <p>This skip link targets a custom element with id="content".</p>
      </div>
    </div>
  `
};

export const CustomLabel: Story = {
  render: () => html`
    <div>
      <gc-skip-link label="Jump to main content"></gc-skip-link>
      
      <header style="padding: 2rem; background: #f5f5f5; margin-bottom: 2rem;">
        <h1>Custom Label Example</h1>
      </header>
      
      <main id="main" tabindex="-1" style="padding: 2rem; border: 2px solid #26374a;">
        <h2>Main Content</h2>
        <p>The skip link has a custom label: "Jump to main content"</p>
      </main>
    </div>
  `
};

export const MultipleSkipLinks: Story = {
  render: () => html`
    <div>
      <gc-skip-link href="#main" label="Skip to main content"></gc-skip-link>
      <gc-skip-link href="#navigation" label="Skip to navigation"></gc-skip-link>
      <gc-skip-link href="#footer" label="Skip to footer"></gc-skip-link>
      
      <header style="padding: 2rem; background: #f5f5f5; margin-bottom: 2rem;">
        <h1>Multiple Skip Links Example</h1>
      </header>
      
      <nav id="navigation" tabindex="-1" style="padding: 2rem; background: #e8f4f8; margin-bottom: 2rem;">
        <h2>Navigation</h2>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
        </ul>
      </nav>
      
      <main id="main" tabindex="-1" style="padding: 2rem; border: 2px solid #26374a; margin-bottom: 2rem;">
        <h2>Main Content</h2>
        <p>Press Tab repeatedly to see all three skip links appear.</p>
      </main>
      
      <footer id="footer" tabindex="-1" style="padding: 2rem; background: #f5f5f5;">
        <h2>Footer</h2>
        <p>Copyright 2025 Government of Canada</p>
      </footer>
    </div>
  `
};

export const FrenchCanadian: Story = {
  render: () => html`
    <div>
      <gc-skip-link locale="fr-CA"></gc-skip-link>
      
      <header style="padding: 2rem; background: #f5f5f5; margin-bottom: 2rem;">
        <h1>En-tête du site Web</h1>
        <nav>
          <a href="#" style="margin-right: 1rem;">Accueil</a>
          <a href="#" style="margin-right: 1rem;">À propos</a>
          <a href="#" style="margin-right: 1rem;">Services</a>
          <a href="#">Contact</a>
        </nav>
      </header>
      
      <main id="main" tabindex="-1" style="padding: 2rem; border: 2px solid #26374a;">
        <h2>Contenu principal</h2>
        <p>Appuyez sur la touche Tab pour révéler le lien d'évitement en haut de la page.</p>
      </main>
    </div>
  `
};

export const WithComplexHeader: Story = {
  render: () => html`
    <div>
      <gc-skip-link></gc-skip-link>
      
      <header style="padding: 2rem; background: #26374a; color: #fff; margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <div style="font-size: 1.5rem; font-weight: 700;">Government of Canada</div>
          <div>
            <a href="#" style="color: #fff; margin-left: 1rem;">Français</a>
          </div>
        </div>
        
        <nav style="background: #1a2533; padding: 1rem; margin: -2rem -2rem 0 -2rem;">
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; gap: 2rem;">
            <li><a href="#" style="color: #fff; text-decoration: none;">Jobs</a></li>
            <li><a href="#" style="color: #fff; text-decoration: none;">Immigration</a></li>
            <li><a href="#" style="color: #fff; text-decoration: none;">Travel</a></li>
            <li><a href="#" style="color: #fff; text-decoration: none;">Business</a></li>
            <li><a href="#" style="color: #fff; text-decoration: none;">Benefits</a></li>
            <li><a href="#" style="color: #fff; text-decoration: none;">Health</a></li>
            <li><a href="#" style="color: #fff; text-decoration: none;">Taxes</a></li>
          </ul>
        </nav>
      </header>
      
      <main id="main" tabindex="-1" style="padding: 2rem; border: 2px solid #26374a;">
        <h1>Welcome to Canada.ca</h1>
        <p>The skip link allows users to bypass this complex navigation and jump directly here.</p>
        <p>This is especially helpful for:</p>
        <ul>
          <li>Keyboard users who navigate by pressing Tab</li>
          <li>Screen reader users who want to skip repetitive content</li>
          <li>Users with motor disabilities who find it difficult to tab through many links</li>
        </ul>
      </main>
      
      <div style="margin-top: 2rem; padding: 1rem; background: #e1f5e1; border-left: 4px solid #278400;">
        <strong>Best Practice:</strong> Skip links should be the first focusable element on every page
        and should target the main content area with id="main".
      </div>
    </div>
  `
};

export const WithEvents: Story = {
  render: () => {
    const handleSkipActivated = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Skip link activated:', customEvent.detail);
    };

    return html`
      <div>
        <gc-skip-link @gc-skip-link-activated="${handleSkipActivated}"></gc-skip-link>
        
        <header style="padding: 2rem; background: #f5f5f5; margin-bottom: 2rem;">
          <h1>Event Tracking Example</h1>
        </header>
        
        <main id="main" tabindex="-1" style="padding: 2rem; border: 2px solid #26374a;">
          <h2>Main Content</h2>
          <p>Open the browser console and use the skip link to see the event details.</p>
        </main>
      </div>
    `;
  }
};

export const AccessibilityDemo: Story = {
  render: () => html`
    <div>
      <gc-skip-link></gc-skip-link>
      
      <div style="padding: 2rem; background: #fffbcc; border-left: 4px solid #ffb700; margin-bottom: 2rem;">
        <h2 style="margin-top: 0;">Accessibility Testing Instructions</h2>
        <ol>
          <li><strong>Keyboard Navigation:</strong> Press Tab - the skip link should be the first element to receive focus</li>
          <li><strong>Visual Appearance:</strong> When focused, the skip link should appear at the top-left of the page</li>
          <li><strong>Activation:</strong> Press Enter to activate - you should jump to the main content</li>
          <li><strong>Screen Reader:</strong> The link should announce "Skip to main content" or your custom label</li>
          <li><strong>Focus Management:</strong> After activation, focus should move to the main content area</li>
        </ol>
      </div>
      
      <header style="padding: 2rem; background: #f5f5f5; margin-bottom: 2rem;">
        <h1>Accessibility Testing Page</h1>
        <nav>
          <h2>Navigation</h2>
          <ul>
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
            <li><a href="#">Link 3</a></li>
            <li><a href="#">Link 4</a></li>
            <li><a href="#">Link 5</a></li>
          </ul>
        </nav>
      </header>
      
      <main id="main" tabindex="-1" style="padding: 2rem; border: 2px solid #278400; background: #e1f5e1;">
        <h2>Main Content (Focus Target)</h2>
        <p>✓ You successfully jumped to the main content!</p>
        <p>This element has tabindex="-1" to allow programmatic focus.</p>
      </main>
    </div>
  `
};
