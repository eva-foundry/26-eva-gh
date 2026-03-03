import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-lightbox.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-lightbox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# WB-Lightbox - Image/Video Galleries

Popup image galleries with thumbnail grid and modal view.

## Features
- ✅ Responsive thumbnail grid (1-4 columns)
- ✅ Click thumbnail to open modal view
- ✅ Previous/Next navigation (buttons + keyboard arrows)
- ✅ Close button and Esc key
- ✅ Image captions
- ✅ Image counter (e.g., "Image 2 of 5")
- ✅ Keyboard navigation (←/→/Home/End/Esc)
- ✅ ARIA dialog pattern
- ✅ Screen reader announcements
- ✅ Prevents body scroll when open
- ✅ Bilingual labels (EN-CA/FR-CA)
- ✅ WCAG 2.2 AAA compliant

## Events
- \`wb-lightbox-open\` - Fired when lightbox opens
- \`wb-lightbox-close\` - Fired when lightbox closes
- \`wb-lightbox-change\` - Fired when active image changes

## Methods
- \`openAt(index)\` - Open lightbox at specific index
- \`close()\` - Close lightbox
- \`next()\` - Show next image
- \`previous()\` - Show previous image

## Keyboard Navigation
- \`←\` / \`→\` - Previous/Next image
- \`Home\` / \`End\` - First/Last image
- \`Esc\` - Close lightbox

## Reference
Based on WET-BOEW Lightbox:  
https://wet-boew.github.io/wet-boew/demos/lightbox/lightbox-en.html
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

export const BasicGallery: Story = {
  render: () => html`
    <wb-lightbox>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=1"
        thumbnail="https://picsum.photos/200/150?random=1"
        caption="Parliament Hill, Ottawa"
        alt="Parliament Hill building"
      ></wb-lightbox-item>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=2"
        thumbnail="https://picsum.photos/200/150?random=2"
        caption="CN Tower, Toronto"
        alt="CN Tower"
      ></wb-lightbox-item>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=3"
        thumbnail="https://picsum.photos/200/150?random=3"
        caption="Old Quebec, Quebec City"
        alt="Historic buildings in Old Quebec"
      ></wb-lightbox-item>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=4"
        thumbnail="https://picsum.photos/200/150?random=4"
        caption="Niagara Falls"
        alt="Niagara Falls waterfall"
      ></wb-lightbox-item>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=5"
        thumbnail="https://picsum.photos/200/150?random=5"
        caption="Rocky Mountains, Alberta"
        alt="Mountain landscape"
      ></wb-lightbox-item>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=6"
        thumbnail="https://picsum.photos/200/150?random=6"
        caption="Vancouver Harbour"
        alt="Vancouver waterfront"
      ></wb-lightbox-item>
    </wb-lightbox>
  `
};

export const ThreeColumns: Story = {
  render: () => html`
    <wb-lightbox columns="3">
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=7"
        thumbnail="https://picsum.photos/200/150?random=7"
        caption="Canadian Museum of History"
      ></wb-lightbox-item>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=8"
        thumbnail="https://picsum.photos/200/150?random=8"
        caption="Royal Ontario Museum"
      ></wb-lightbox-item>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=9"
        thumbnail="https://picsum.photos/200/150?random=9"
        caption="Canadian Museum for Human Rights"
      ></wb-lightbox-item>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=10"
        thumbnail="https://picsum.photos/200/150?random=10"
        caption="Montreal Museum of Fine Arts"
      ></wb-lightbox-item>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=11"
        thumbnail="https://picsum.photos/200/150?random=11"
        caption="Art Gallery of Ontario"
      ></wb-lightbox-item>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=12"
        thumbnail="https://picsum.photos/200/150?random=12"
        caption="Canadian War Museum"
      ></wb-lightbox-item>
    </wb-lightbox>
  `
};

export const SingleColumn: Story = {
  render: () => html`
    <wb-lightbox columns="1">
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=13"
        thumbnail="https://picsum.photos/400/300?random=13"
        caption="Large Format Gallery - Image 1"
      ></wb-lightbox-item>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=14"
        thumbnail="https://picsum.photos/400/300?random=14"
        caption="Large Format Gallery - Image 2"
      ></wb-lightbox-item>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=15"
        thumbnail="https://picsum.photos/400/300?random=15"
        caption="Large Format Gallery - Image 3"
      ></wb-lightbox-item>
    </wb-lightbox>
  `
};

export const NoCaptions: Story = {
  render: () => html`
    <wb-lightbox>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=16"
        thumbnail="https://picsum.photos/200/150?random=16"
        alt="Landscape photo 1"
      ></wb-lightbox-item>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=17"
        thumbnail="https://picsum.photos/200/150?random=17"
        alt="Landscape photo 2"
      ></wb-lightbox-item>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=18"
        thumbnail="https://picsum.photos/200/150?random=18"
        alt="Landscape photo 3"
      ></wb-lightbox-item>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=19"
        thumbnail="https://picsum.photos/200/150?random=19"
        alt="Landscape photo 4"
      ></wb-lightbox-item>
    </wb-lightbox>
  `
};

export const EventHandling: Story = {
  render: () => html`
    <wb-lightbox
      @wb-lightbox-open="${(e: CustomEvent) => console.log('Lightbox opened:', e.detail)}"
      @wb-lightbox-close="${() => console.log('Lightbox closed')}"
      @wb-lightbox-change="${(e: CustomEvent) => console.log('Image changed:', e.detail)}"
    >
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=20"
        thumbnail="https://picsum.photos/200/150?random=20"
        caption="Event Demo - Image 1"
      ></wb-lightbox-item>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=21"
        thumbnail="https://picsum.photos/200/150?random=21"
        caption="Event Demo - Image 2"
      ></wb-lightbox-item>
      <wb-lightbox-item
        src="https://picsum.photos/800/600?random=22"
        thumbnail="https://picsum.photos/200/150?random=22"
        caption="Event Demo - Image 3"
      ></wb-lightbox-item>
    </wb-lightbox>

    <p style="margin-top: 1rem; color: #666;">
      Open the browser console to see events when you interact with the lightbox.
    </p>
  `
};

export const KeyboardNavigation: Story = {
  render: () => html`
    <div>
      <h2>Keyboard Accessibility</h2>
      <p>This lightbox supports full keyboard navigation:</p>
      <ul>
        <li><kbd>Tab</kbd> - Focus thumbnails</li>
        <li><kbd>Enter</kbd> - Open lightbox on focused thumbnail</li>
        <li><kbd>←</kbd> / <kbd>→</kbd> - Navigate between images</li>
        <li><kbd>Home</kbd> / <kbd>End</kbd> - Jump to first/last image</li>
        <li><kbd>Esc</kbd> - Close lightbox</li>
      </ul>

      <wb-lightbox>
        <wb-lightbox-item
          src="https://picsum.photos/800/600?random=23"
          thumbnail="https://picsum.photos/200/150?random=23"
          caption="Keyboard Demo - Image 1 of 4"
        ></wb-lightbox-item>
        <wb-lightbox-item
          src="https://picsum.photos/800/600?random=24"
          thumbnail="https://picsum.photos/200/150?random=24"
          caption="Keyboard Demo - Image 2 of 4"
        ></wb-lightbox-item>
        <wb-lightbox-item
          src="https://picsum.photos/800/600?random=25"
          thumbnail="https://picsum.photos/200/150?random=25"
          caption="Keyboard Demo - Image 3 of 4"
        ></wb-lightbox-item>
        <wb-lightbox-item
          src="https://picsum.photos/800/600?random=26"
          thumbnail="https://picsum.photos/200/150?random=26"
          caption="Keyboard Demo - Image 4 of 4"
        ></wb-lightbox-item>
      </wb-lightbox>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <h2>Galerie de photos du Canada</h2>
      <wb-lightbox>
        <wb-lightbox-item
          src="https://picsum.photos/800/600?random=27"
          thumbnail="https://picsum.photos/200/150?random=27"
          caption="Colline du Parlement, Ottawa"
        ></wb-lightbox-item>
        <wb-lightbox-item
          src="https://picsum.photos/800/600?random=28"
          thumbnail="https://picsum.photos/200/150?random=28"
          caption="Tour CN, Toronto"
        ></wb-lightbox-item>
        <wb-lightbox-item
          src="https://picsum.photos/800/600?random=29"
          thumbnail="https://picsum.photos/200/150?random=29"
          caption="Vieux-Québec, Ville de Québec"
        ></wb-lightbox-item>
        <wb-lightbox-item
          src="https://picsum.photos/800/600?random=30"
          thumbnail="https://picsum.photos/200/150?random=30"
          caption="Chutes Niagara"
        ></wb-lightbox-item>
        <wb-lightbox-item
          src="https://picsum.photos/800/600?random=31"
          thumbnail="https://picsum.photos/200/150?random=31"
          caption="Montagnes Rocheuses, Alberta"
        ></wb-lightbox-item>
        <wb-lightbox-item
          src="https://picsum.photos/800/600?random=32"
          thumbnail="https://picsum.photos/200/150?random=32"
          caption="Port de Vancouver"
        ></wb-lightbox-item>
      </wb-lightbox>
    </div>
  `
};
