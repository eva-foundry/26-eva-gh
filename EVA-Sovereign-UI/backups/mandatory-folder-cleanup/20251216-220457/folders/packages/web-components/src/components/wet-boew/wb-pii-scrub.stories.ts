import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-pii-scrub.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-pii-scrub',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const BasicForm: Story = {
  render: () => html`
    <form onsubmit="event.preventDefault(); alert('Form submitted');">
      <wb-pii-scrub auto-detect></wb-pii-scrub>
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4">
Contact me at john.doe@example.com or call (555) 123-4567
        </textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  `
};

export const SINDetection: Story = {
  render: () => html`
    <form onsubmit="event.preventDefault(); alert('Form submitted');">
      <wb-pii-scrub auto-detect></wb-pii-scrub>
      <div>
        <label for="sin">Social Insurance Number (will be detected):</label>
        <input type="text" id="sin" name="sin" value="123-456-789" />
      </div>
      <button type="submit">Submit</button>
      <p><em>Try submitting to see PII warning</em></p>
    </form>
  `
};

export const CreditCardDetection: Story = {
  render: () => html`
    <form onsubmit="event.preventDefault(); alert('Form submitted');">
      <wb-pii-scrub auto-detect></wb-pii-scrub>
      <div>
        <label for="cc">Credit Card (will be detected):</label>
        <input type="text" id="cc" name="cc" value="4111-1111-1111-1111" />
      </div>
      <button type="submit">Submit</button>
      <p><em>Try submitting to see PII warning</em></p>
    </form>
  `
};

export const MultipleFields: Story = {
  render: () => html`
    <form onsubmit="event.preventDefault(); alert('Form submitted');">
      <wb-pii-scrub auto-detect></wb-pii-scrub>
      <div>
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" value="user@example.com" />
      </div>
      <div>
        <label for="phone">Phone:</label>
        <input type="text" id="phone" name="phone" value="(555) 123-4567" />
      </div>
      <div>
        <label for="sin2">SIN:</label>
        <input type="text" id="sin2" name="sin2" value="123-456-789" />
      </div>
      <button type="submit">Submit</button>
      <p><em>Multiple PII fields will be detected</em></p>
    </form>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <form onsubmit="event.preventDefault(); alert('Formulaire soumis');">
        <wb-pii-scrub auto-detect></wb-pii-scrub>
        <div>
          <label for="courriel">Courriel:</label>
          <input type="text" id="courriel" name="courriel" value="utilisateur@exemple.fr" />
        </div>
        <div>
          <label for="telephone">Téléphone:</label>
          <input type="text" id="telephone" name="telephone" value="(555) 123-4567" />
        </div>
        <button type="submit">Soumettre</button>
      </form>
    </div>
  `
};
