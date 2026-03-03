import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-prettify.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-prettify',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

const jsCode = `function greet(name) {
  // Say hello
  const message = "Hello, " + name;
  return message;
}

const result = greet("World");`;

const tsCode = `interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Alice",
  age: 30
};`;

export const JavaScript: Story = {
  render: () => html`
    <wb-prettify
      language="javascript"
      .code="${jsCode}"
    ></wb-prettify>
  `
};

export const TypeScript: Story = {
  render: () => html`
    <wb-prettify
      language="typescript"
      .code="${tsCode}"
    ></wb-prettify>
  `
};

export const NoCopyButton: Story = {
  render: () => html`
    <wb-prettify
      language="javascript"
      .code="${'const x = 42;\nconst y = 10;'}"
      show-copy="false"
    ></wb-prettify>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <wb-prettify
        language="javascript"
        .code="${'const message = \"Hello\";'}"
        @wb-prettify-copy="${() => {
          const log = document.getElementById('log');
          if (log) log.textContent = 'Code copied to clipboard';
        }}"
      ></wb-prettify>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-prettify
        language="javascript"
        .code="${'const message = \"Bonjour\";\nconsole.log(message);'}"
      ></wb-prettify>
    </div>
  `
};
